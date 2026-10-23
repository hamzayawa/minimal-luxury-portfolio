export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  status: 'in-development' | 'planned';
  href?: string;
};

export const projects: Project[] = [
  {
    number: '01',
    name: 'University LMS',
    category: 'EDUCATION SYSTEMS',
    description:
      'A university-focused learning and academic management platform designed around structured academic workflows, granular access control, and accountable results management.',
    stack: ['Laravel', 'PHP', 'PostgreSQL', 'RBAC / ReBAC'],
    status: 'in-development',
    // Add the public repository URL when it is ready to be featured.
  },
];
