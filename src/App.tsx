import { projects } from './data/projects';
import MathematicalUniverse from './scenes/MathematicalUniverse';
import { useGsapMotion } from './hooks/useGsapMotion';

function ArrowUpRight() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

function App() {
  useGsapMotion();

  return (
    <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <main id="main-content">
      <header className="site-header shell">
        <a className="wordmark" href="#top" aria-label="Hamza Abdullahi, home">
          <span className="wordmark-mark">H<span>.</span></span>
          <span className="wordmark-label">HAMZA ABDULLAHI</span>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          <a href="#about">About</a>
          <a href="#work">Selected work</a>
          <a href="#research">Interests</a>
        </nav>
        <a className="header-contact" href="https://github.com/hamzayawa" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight />
        </a>
      </header>

      <section className="hero shell" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> MATHEMATICS · DATA · SOFTWARE</p>
          <h1 id="hero-title">Engineering<br />the <span className="accent-word">invisible.</span></h1>
          <p className="hero-description">
            I connect mathematical thinking, data, and software engineering to build systems that make complex things clearer and more useful.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <ArrowUpRight /></a>
            <a className="text-link" href="https://github.com/hamzayawa" target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight /></a>
          </div>
          <div className="hero-meta">
            <span>BASED IN NIGERIA</span>
            <span className="meta-divider" />
            <span>BUILT WITH CURIOSITY</span>
          </div>
        </div>

        <div className="hero-art" aria-label="Interactive mathematical gyroid visualization">
          <div className="art-index">FIG. 001 <span>FORM / FIELD</span></div>
          <MathematicalUniverse />
          <div className="art-crosshair crosshair-one" aria-hidden="true" />
          <div className="art-crosshair crosshair-two" aria-hidden="true" />
          <div className="art-coordinate coordinate-one" aria-hidden="true">x 0.618</div>
          <div className="art-coordinate coordinate-two" aria-hidden="true">y 1.414</div>
          <div className="art-caption"><span className="caption-line" /> A STUDY IN FORM & MOTION</div>
        </div>
        <div className="hero-bottom-line"><span>PORTFOLIO / 2026</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="intro-section section shell" id="about">
        <div className="section-label"><span>01</span> / A LITTLE CONTEXT</div>
        <div className="intro-content">
          <h2>Curiosity is the<br />beginning of <span className="muted-word">structure.</span></h2>
          <div className="intro-copy">
            <p>I’m Hamza Abdullahi — a mathematics lecturer and builder exploring the space between quantitative ideas and practical software.</p>
            <p>My work spans academic systems, applied data science, and financial engineering. I’m interested in tools that are thoughtful in their design, rigorous in their foundations, and useful in the real world.</p>
          </div>
        </div>
      </section>

      <section className="work-section section shell" id="work">
        <div className="section-heading">
          <div className="section-label"><span>02</span> / SELECTED WORK</div>
          <p>Fewer projects. More intention.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-topline"><span>{project.number} — {project.category}</span><span className="project-status"><i /> IN DEVELOPMENT</span></div>
              <div className="project-main">
                <div className="project-title-wrap"><h3>{project.name}</h3><p>{project.description}</p></div>
                <div className="project-symbol" aria-hidden="true"><span className="symbol-ring ring-a" /><span className="symbol-ring ring-b" /><span className="symbol-center">A</span></div>
              </div>
              <div className="project-bottom"><div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><span className="project-note">CASE STUDY IN PROGRESS</span></div>
            </article>
          ))}
        </div>
        <p className="work-footnote">More work will appear here as each project is ready to tell a useful story.</p>
      </section>

      <section className="interests-section section shell" id="research">
        <div className="section-label"><span>03</span> / AREAS OF INTEREST</div>
        <div className="interest-grid">
          <article><span className="interest-number">01</span><h3>Mathematical thinking</h3><p>Modeling, abstraction, and the search for structure.</p></article>
          <article><span className="interest-number">02</span><h3>Applied data science</h3><p>Turning data into explanations, decisions, and useful tools.</p></article>
          <article><span className="interest-number">03</span><h3>Software systems</h3><p>Reliable architecture, clear interfaces, and accountable workflows.</p></article>
          <article><span className="interest-number">04</span><h3>Financial engineering</h3><p>Computational approaches to risk, markets, and quantitative problems.</p></article>
        </div>
      </section>

      <footer className="site-footer shell" id="contact">
        <div className="footer-top"><p className="eyebrow">HAVE A GOOD PROBLEM?</p><h2>Let’s make<br />something <span className="accent-word">meaningful.</span></h2><a className="button button-primary" href="https://github.com/hamzayawa" target="_blank" rel="noreferrer">Connect on GitHub <ArrowUpRight /></a></div>
        <div className="footer-bottom"><a className="wordmark" href="#top"><span className="wordmark-mark">H<span>.</span></span><span className="wordmark-label">HAMZA ABDULLAHI</span></a><span>DESIGNED WITH INTENTION · 2026</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
    </>
  );
}

export default App;
