export const profile = {
  name: 'Farizi',
  username: 'tsfarizi',
  displayName: 'CASH tsfarizi',
  title: 'Software & AI Engineer',
  bio: 'Passionate about building robust systems and intelligent applications with Rust, Go, Python, and TypeScript.',
  longBio: 'Software & AI Engineer with a passion for building robust systems and intelligent applications. Experienced in systems programming (C++, Rust), AI/ML (PyTorch, TensorFlow), and full-stack development. Currently exploring API design, medical GIS, and machine learning research.',
  location: 'UTC +07:00',
  email: 'teukusalmanfarizi2003@gmail.com',
  avatar: 'https://avatars.githubusercontent.com/u/110450774?v=4',
  social: {
    github: 'https://github.com/tsfarizi',
    linkedin: 'https://www.linkedin.com/in/teuku-salman-farizi-86155b249/',
    instagram: 'https://www.instagram.com/ts_farizi/',
  },
  stats: {
    followers: 2,
    following: 2,
    repositories: 22,
    stars: 3,
  },
};

export const about = {
  title: 'About Me',
  paragraphs: [
    'I am a Software & AI Engineer driven by the belief that elegant code can solve complex problems. My work spans from low-level systems programming in C++ and Rust to building intelligent applications with PyTorch and TensorFlow.',
    'As a campus research core developer, I engineered multi-platform applications with modular architecture and structured data workflows. As a laboratory assistant, I mentored 150+ students in OOP, data structures, and systematic problem-solving.',
    'When I am not coding, you will find me experimenting with ML architectures, building APIs in Go and Rust, or contributing to open-source projects.',
  ],
  focusAreas: [
    { label: 'Systems Programming', icon: '⚙️', description: 'C++, Rust, memory management, concurrency' },
    { label: 'AI & Machine Learning', icon: '🧠', description: 'PyTorch, TensorFlow, computer vision, NLP' },
    { label: 'API & Backend', icon: '🔌', description: 'Go, Java, REST APIs, database design' },
    { label: 'Full-Stack Web', icon: '🌐', description: 'React, Django, Node.js, cloud deployment' },
  ],
};

export const education = [
  {
    id: 1,
    degree: 'Bachelor of Informatics',
    field: 'Computer Science',
    institution: 'Gunadarma University',
    period: '2022 — 2026',
    description: 'Focused on software engineering, artificial intelligence, and systems programming. Active member of campus research team.',
    highlights: ['GPA: 3.29/4.0', 'Research Team Core Developer', 'Lab Assistant for 2 Years'],
    icon: '🎓',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Research Team',
    role: 'Research Team Lead',
    relationship: 'Campus Research Team',
    text: 'Farizi has a remarkable learning curiosity and adapts quickly to new technologies and complex problem domains. He picks up unfamiliar concepts with impressive speed and applies them with precision, making him a reliable contributor to any technical challenge.',
    avatar: '👨‍💻',
  },
  {
    id: 2,
    name: 'A Mentee',
    role: 'Laboratory Mentee',
    relationship: 'Informatics Laboratory',
    text: 'Farizi explains things in a way that just clicks. His mentoring style is approachable and clear — he makes complex topics feel manageable, and his sessions always feel engaging and alive. Learning from him has been a genuinely enjoyable experience.',
    avatar: '🧑‍🎓',
  },
];

export const blogPosts = [
  {
    id: 1,
    title: 'Building MCP Frameworks in Rust: A Practical Guide',
    excerpt: 'Deep dive into implementing the Model Context Protocol in Rust, covering memory safety, async patterns, and protocol handling.',
    date: '2025-06-15',
    readTime: '8 min read',
    tags: ['Rust', 'MCP', 'Systems Programming'],
    url: 'https://github.com/tsfarizi/antikythera-mcp-framework',
    category: 'technical',
  },
  {
    id: 2,
    title: 'CT Scan Analysis with Self-Supervised Learning',
    excerpt: 'Applying self-supervised learning techniques to medical imaging for improved CT scan classification with limited labeled data.',
    date: '2025-07-03',
    readTime: '10 min read',
    tags: ['ML', 'Medical Imaging', 'PyTorch'],
    url: 'https://github.com/tsfarizi/ct_scan_merged_SSL',
    category: 'research',
  },
  {
    id: 3,
    title: 'Discussion API in Go: Building Clean REST Services',
    excerpt: 'Designing and implementing a clean discussion API service using Go, focusing on project structure and RESTful conventions.',
    date: '2025-07-27',
    readTime: '6 min read',
    tags: ['Go', 'REST API', 'Backend'],
    url: 'https://github.com/tsfarizi/discussion-api',
    category: 'technical',
  },
];

export const experience = [
  {
    id: 1,
    role: 'Core Developer',
    organization: 'Campus Research Team',
    period: 'Feb 2025 — Aug 2025',
    duration: '6 Months',
    description: 'Developed a comprehensive multi-platform desktop and web application for institutional research. Engineered structured data routing workflows, cross-platform UI states, and modular engine components.',
    tags: ['Multi-Platform', 'Data Routing', 'UI States', 'Modular Architecture'],
    icon: '🔬',
  },
  {
    id: 2,
    role: 'Technical Mentorship & Code Review',
    organization: 'Informatics Laboratory Assistant',
    period: '2024 — 2026',
    duration: '2 Years',
    description: 'Mentored 150+ students on OOP, data structures, and logic. Fostered collaborative learning environments and reduced cognitive load by developing structured architectural blueprints. Conducted peer reviews to reinforce code efficiency and systematic root-cause analysis.',
    tags: ['Mentorship', 'OOP', 'Data Structures', 'Code Review', '150+ Students'],
    icon: '🎓',
  },
];

export interface SkillItem {
  name: string;
  level: number;
}

export const skills = {
  languages: [
    { name: 'C', level: 4 },
    { name: 'C++', level: 5 },
    { name: 'Rust', level: 4 },
    { name: 'Go', level: 3 },
    { name: 'Dart', level: 4 },
    { name: 'JavaScript', level: 4 },
    { name: 'TypeScript', level: 4 },
    { name: 'Python', level: 5 },
    { name: 'Java', level: 3 },
    { name: 'C#', level: 3 },
  ] as SkillItem[],
  frontend: [
    { name: 'HTML5', level: 5 },
    { name: 'CSS3', level: 5 },
    { name: 'React', level: 4 },
    { name: 'Tailwind CSS', level: 5 },
    { name: 'Flutter', level: 4 },
    { name: 'Vue', level: 3 },
    { name: 'Svelte', level: 3 },
    { name: 'Next.js', level: 4 },
  ] as SkillItem[],
  backend: [
    { name: 'Django', level: 4 },
    { name: 'Node.js', level: 4 },
    { name: 'MongoDB', level: 3 },
    { name: 'SQLite', level: 4 },
    { name: 'PostgreSQL', level: 3 },
  ] as SkillItem[],
  devops: [
    { name: 'Git', level: 5 },
    { name: 'Docker', level: 3 },
    { name: 'Firebase', level: 4 },
    { name: 'GCP', level: 3 },
  ] as SkillItem[],
  ml: [
    { name: 'PyTorch', level: 4 },
    { name: 'TensorFlow', level: 3 },
    { name: 'OpenCV', level: 4 },
    { name: 'Scikit-learn', level: 4 },
    { name: 'Pandas', level: 4 },
  ] as SkillItem[],
  patterns: [
    { name: 'SOLID', level: 5 },
    { name: 'OOP', level: 5 },
    { name: 'Functional', level: 4 },
    { name: 'Event-Driven', level: 4 },
    { name: 'MVC', level: 4 },
    { name: 'MVVM', level: 3 },
    { name: 'Repository', level: 4 },
    { name: 'Observer', level: 4 },
  ] as SkillItem[],
};

export const projects = [
  {
    name: 'antikythera-mcp-framework',
    description: 'MCP framework built in Rust for advanced computation and protocol handling',
    language: 'Rust',
    license: 'MIT',
    url: 'https://github.com/tsfarizi/antikythera-mcp-framework',
    category: 'framework',
    featured: true,
    techStack: ['Rust', 'MCP', 'Async', 'Protocol Buffers'],
    stars: 0,
    forks: 0,
  },
  {
    name: 'ct_scan_merged_SSL',
    description: 'CT scan image processing and analysis using self-supervised machine learning',
    language: 'Jupyter Notebook',
    url: 'https://github.com/tsfarizi/ct_scan_merged_SSL',
    category: 'ml',
    featured: true,
    techStack: ['Python', 'PyTorch', 'OpenCV', 'Self-Supervised Learning'],
    stars: 0,
    forks: 0,
  },
  {
    name: 'discussion-api',
    description: 'Discussion API service built with Go, featuring clean REST architecture',
    language: 'Go',
    url: 'https://github.com/tsfarizi/discussion-api',
    category: 'backend',
    featured: true,
    techStack: ['Go', 'REST API', 'Backend Architecture'],
    stars: 0,
    forks: 0,
  },
  {
    name: 'sepatu-market-api',
    description: 'Marketplace API for shoe retail management system',
    language: 'Java',
    url: 'https://github.com/tsfarizi/sepatu-market-api',
    category: 'backend',
    featured: true,
    techStack: ['Java', 'REST API', 'Database Design', 'CRUD'],
    stars: 0,
    forks: 0,
  },
  {
    name: 'sistem_sekolah_flutter',
    description: 'School management system built with Flutter for cross-platform deployment',
    language: 'Dart',
    url: 'https://github.com/tsfarizi/sistem_sekolah_flutter',
    category: 'mobile',
    featured: true,
    techStack: ['Dart', 'Flutter', 'Firebase', 'Cross-Platform'],
    stars: 0,
    forks: 0,
  },
  {
    name: 'sistem_sekolah_py',
    description: 'School management system backend built with Python',
    language: 'Python',
    url: 'https://github.com/tsfarizi/sistem_sekolah_py',
    category: 'backend',
    featured: false,
    techStack: ['Python', 'Backend', 'Database'],
    stars: 0,
    forks: 0,
  },
  {
    name: 'MedGIS-api',
    description: 'Medical Geographic Information System API for healthcare data',
    language: 'JavaScript',
    url: 'https://github.com/tsfarizi/MedGIS-api',
    category: 'healthcare',
    featured: true,
    techStack: ['JavaScript', 'GIS', 'Healthcare', 'REST API'],
    stars: 0,
    forks: 0,
  },
];

export const projectCategories = [
  { key: 'all', label: 'All Projects' },
  { key: 'framework', label: 'Frameworks' },
  { key: 'backend', label: 'Backend' },
  { key: 'ml', label: 'ML/AI' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'healthcare', label: 'Healthcare' },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]['key'];

export const categoryColors: Record<string, string> = {
  framework: 'bg-burgundy/10 text-burgundy border-burgundy/20',
  backend: 'bg-sage/10 text-sage border-sage/20',
  education: 'bg-gold/10 text-gold-dark border-gold/20',
  tool: 'bg-terracotta/10 text-terracotta border-terracotta/20',
  mobile: 'bg-burgundy-light/10 text-burgundy-light border-burgundy-light/20',
  healthcare: 'bg-sage-light/10 text-sage border-sage-light/20',
  ml: 'bg-navy-light/10 text-navy-light border-navy-light/20',
  algorithm: 'bg-gold-dark/10 text-gold-dark border-gold-dark/20',
  visualization: 'bg-terracotta/10 text-terracotta border-terracotta/20',
};

export const languageIcons: Record<string, string> = {
  Rust: '🦀',
  ['C++']: '⚙️',
  Java: '☕',
  TypeScript: '📘',
  Dart: '🎯',
  JavaScript: '🟨',
  Python: '🐍',
  ['Jupyter Notebook']: '📓',
  Go: '🐹',
  ['C#']: '🔷',
};
