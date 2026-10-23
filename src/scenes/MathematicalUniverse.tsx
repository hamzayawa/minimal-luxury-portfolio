import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Point3 = [number, number, number];

const CUBE_CORNERS: Point3[] = [
  [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
  [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1],
];
const TETRAHEDRA = [[0, 5, 1, 6], [0, 1, 2, 6], [0, 2, 3, 6], [0, 3, 7, 6], [0, 7, 4, 6], [0, 4, 5, 6]];
const TETRA_EDGES = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];

function gyroid(x: number, y: number, z: number) {
  return Math.sin(x) * Math.cos(y) + Math.sin(y) * Math.cos(z) + Math.sin(z) * Math.cos(x);
}

function buildGyroidGeometry(resolution = 25) {
  const values = new Float32Array((resolution + 1) ** 3);
  const size = resolution + 1;
  const domain = Math.PI * 2.15;
  const start = -domain / 2;
  const step = domain / resolution;
  const index = (x: number, y: number, z: number) => x + size * (y + size * z);

  for (let z = 0; z <= resolution; z++) {
    for (let y = 0; y <= resolution; y++) {
      for (let x = 0; x <= resolution; x++) {
        values[index(x, y, z)] = gyroid(start + x * step, start + y * step, start + z * step);
      }
    }
  }

  const positions: number[] = [];
  const interpolate = (a: THREE.Vector3, b: THREE.Vector3, va: number, vb: number) => {
    const t = va / (va - vb);
    return new THREE.Vector3().lerpVectors(a, b, THREE.MathUtils.clamp(t, 0, 1));
  };
  const emitTriangle = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) => {
    positions.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
  };

  for (let z = 0; z < resolution; z++) {
    for (let y = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++) {
        const points = CUBE_CORNERS.map(([cx, cy, cz]) => new THREE.Vector3(
          start + (x + cx) * step,
          start + (y + cy) * step,
          start + (z + cz) * step,
        ));
        const cornerValues = CUBE_CORNERS.map(([cx, cy, cz]) => values[index(x + cx, y + cy, z + cz)]);

        for (const tetra of TETRAHEDRA) {
          const intersections: THREE.Vector3[] = [];
          for (const [ea, eb] of TETRA_EDGES) {
            const ia = tetra[ea];
            const ib = tetra[eb];
            const va = cornerValues[ia];
            const vb = cornerValues[ib];
            if ((va < 0 && vb >= 0) || (va >= 0 && vb < 0)) {
              intersections.push(interpolate(points[ia], points[ib], va, vb));
            }
          }
          if (intersections.length === 3) {
            emitTriangle(intersections[0], intersections[1], intersections[2]);
          } else if (intersections.length === 4) {
            emitTriangle(intersections[0], intersections[1], intersections[2]);
            emitTriangle(intersections[0], intersections[2], intersections[3]);
          }
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

export default function MathematicalUniverse() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      setFallback(true);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 9.4);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.className = 'universe-canvas';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const geometry = buildGyroidGeometry();
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x00e59b,
      emissive: 0x003d29,
      emissiveIntensity: 0.72,
      metalness: 0.35,
      roughness: 0.29,
      clearcoat: 0.85,
      clearcoatRoughness: 0.25,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });
    const surface = new THREE.Mesh(geometry, material);
    surface.scale.setScalar(1.02);
    group.add(surface);

    const wire = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: 0x9fffd9, wireframe: true, transparent: true, opacity: 0.11, side: THREE.DoubleSide }),
    );
    wire.scale.setScalar(1.006);
    group.add(wire);

    const ambient = new THREE.AmbientLight(0x9fffd9, 1.2);
    scene.add(ambient);
    const keyLight = new THREE.PointLight(0x00e59b, 65, 20);
    keyLight.position.set(3.5, 3.2, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xc8fff0, 38, 18);
    rimLight.position.set(-4, -1, -3);
    scene.add(rimLight);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => { pointer.x = 0; pointer.y = 0; };
    mount.addEventListener('pointermove', onPointerMove, { passive: true });
    mount.addEventListener('pointerleave', onPointerLeave);

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      camera.aspect = width / height;
      camera.position.z = width < 500 ? 10.6 : 9.4;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let frame = 0;
    const clock = new THREE.Clock();
    const render = () => {
      frame = window.requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();
      target.x += (pointer.y * 0.25 - target.x) * 0.035;
      target.y += (pointer.x * 0.35 - target.y) * 0.035;
      if (!reducedMotion) {
        group.rotation.x = elapsed * 0.075 + target.x;
        group.rotation.y = elapsed * 0.12 + target.y;
      } else {
        group.rotation.x = target.x * 0.35;
        group.rotation.y = target.y * 0.35;
      }
      renderer.render(scene, camera);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerleave', onPointerLeave);
      geometry.dispose();
      material.dispose();
      wire.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`universe-stage${fallback ? ' universe-stage-fallback' : ''}`} ref={mountRef}>
      {fallback && <div className="universe-fallback-shape" aria-hidden="true" />}
      <span className="universe-accessible-label">Interactive mathematical gyroid surface</span>
    </div>
  );
}
