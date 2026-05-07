export const profile = {
  name: 'Nikhil Vijay Khot',
  title: 'Principal Software Engineer',
  tagline:
    'Principal Software Engineer based in Pune. I build web applications and lead the teams that maintain them.',
  location: 'Pune, Maharashtra, India',
  email: 'nikhilkhot46@gmail.com',
  phone: '+91 9890422071',
  whatsapp: '919890422071',
  linkedin: 'https://linkedin.com/in/nikhilkhot46',
  github: 'https://github.com/nikhilkhot46',
  resumeUrl: '/Nikhil_Khot_Principal_Software_Engineer.pdf',
  years: '10+',
  availability: {
    status: 'Open to new roles',
    type: 'Full-time',
    remote: 'Remote OK',
    notice: '2 months notice (negotiable)',
  },
  summary:
    "I've been writing web applications for over 10 years. Right now I'm a Principal Engineer at Spring Computing Technologies, where I lead a team of 5 on a telehealth product. Most of my day is split between writing backend code, reviewing PRs, and making calls on architecture. I work mostly with PHP, Node.js, Angular, and MySQL, but I've also used Python and Java when a project needed them. The work I'm proudest of recently was cutting our API response times by about 40%, which came out of rewriting a lot of slow MySQL queries and cleaning up the service layer.",
  heroStats: [
    { label: 'Years of experience', value: '10+' },
    { label: 'On my team', value: '5+' },
    { label: 'API speed gain', value: '40%' },
    { label: 'Projects built', value: '15+' },
  ],
}

export const skills = [
  {
    category: 'Languages',
    icon: 'Code2',
    items: ['PHP', 'Node.js', 'Python', 'Java', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Frontend',
    icon: 'Layout',
    items: ['Angular', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    category: 'Frameworks',
    icon: 'Boxes',
    items: ['Express.js', 'Laravel', 'CodeIgniter', 'Zend', 'Yii', 'Smarty'],
  },
  {
    category: 'Databases',
    icon: 'Database',
    items: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    category: 'Cloud & DevOps',
    icon: 'Cloud',
    items: ['AWS (EC2, S3)', 'GCP (GCS)', 'Azure Storage', 'Docker', 'CI/CD', 'Git'],
  },
  {
    category: 'Integrations',
    icon: 'Plug',
    items: ['Razorpay', 'Stripe', 'CCAvenue', 'Google Maps API', 'SendGrid', 'WebRTC'],
  },
  {
    category: 'Tools',
    icon: 'Wrench',
    items: ['JIRA', 'Bitbucket', 'VS Code', 'Monday.com', 'Trello', 'Slack'],
  },
  {
    category: 'Other',
    icon: 'Users',
    items: [
      'Team leadership',
      'Architecture',
      'Code reviews',
      'Mentoring',
      'Stakeholder communication',
    ],
  },
]

export const experience = [
  {
    company: 'Spring Computing Technologies Pvt. Ltd.',
    role: 'Principal Software Engineer',
    period: 'Dec 2021 — Present',
    location: 'Pune, India',
    current: true,
    highlights: [
      'Lead a team of 5+ engineers. I own the architecture decisions, run the sprint ceremonies, and set the coding standards we follow.',
      'Got API response times down by around 40% after fixing slow MySQL queries, adding the right indexes, and cleaning up the service layer.',
      'Moved our production workloads to AWS EC2 and S3, with CI/CD pipelines handling releases across environments.',
      'Added JWT authentication and RBAC across every module of the platform.',
      'Work directly with product and stakeholders on roadmap calls, priorities, and release timing.',
    ],
  },
  {
    company: 'Nadsoft IT Solutions',
    role: 'Senior Software Engineer',
    period: 'Jul 2019 — Dec 2021',
    location: 'Pune, India',
    highlights: [
      'Shipped 5+ full-stack PHP apps. I spent a lot of time on page speed, API tuning, and frontend cleanup.',
      'Ran a 4-person dev team. Handled sprints, reviewed PRs, and kept projects on schedule.',
      'Integrated Razorpay and Stripe on multiple client projects for payments.',
      'Set up AWS EC2 and S3 for production workloads.',
    ],
  },
  {
    company: 'Vertscend Automation Pvt. Ltd.',
    role: 'PHP Developer / Team Lead',
    period: 'Feb 2018 — Jun 2019',
    location: 'Pune, India',
    highlights: [
      'Owned enterprise app development in PHP and MySQL. Refactored a lot of legacy code and rewrote the queries that were slowing things down.',
      'Mentored 2 junior developers on Git, clean code, and basic design patterns.',
    ],
  },
  {
    company: 'Nice Designs Pvt. Ltd.',
    role: 'PHP Developer',
    period: 'Mar 2017 — Jan 2018',
    location: 'India',
    highlights: [
      'Wrote custom PHP solutions and tuned MySQL queries. Added indexes, restructured joins, and introduced caching where it made sense.',
    ],
  },
  {
    company: 'Belgave Group of Companies',
    role: 'Web Developer',
    period: 'Feb 2016 — Feb 2017',
    location: 'India',
    highlights: [
      'Maintained a handful of web apps. Improved frontend load times and cleaned up backend API endpoints.',
    ],
  },
]

export const projects = [
  {
    slug: 'telehealth-application',
    name: 'Telehealth Application',
    tagline: 'Video consultation platform, HIPAA compliant',
    description:
      "A video consultation product I've been working on at Spring. It uses WebRTC for the calls, and media is stored on S3, Azure Storage, or GCS depending on the client. I rewrote the API layer and tuned the queries behind it, which brought response times down by about 40%. For HIPAA we handle encryption at rest, access controls, and audit logging.",
    impact: [
      { label: 'Faster API', value: '-40%' },
      { label: 'Compliance', value: 'HIPAA' },
      { label: 'Media options', value: '3' },
    ],
    stack: ['Angular', 'PHP', 'Node.js', 'MySQL', 'AWS EC2', 'S3', 'WebRTC'],
    accent: 'from-cyan-400/20 via-violet-500/20 to-rose-400/10',
    featured: true,
  },
  {
    slug: 'health-diagnostic-tests',
    name: 'Health Diagnostic Tests Platform',
    tagline: 'Diagnostic tests, patient and ops portals',
    description:
      'A platform for managing diagnostic test bookings. I built the REST API middleware and rewrote a lot of the SQL behind it to get better throughput. There are two portals, one for patients booking tests and an internal one for the team managing them.',
    impact: [
      { label: 'Portals', value: 'Patient + ops' },
      { label: 'Area', value: 'Throughput' },
      { label: 'Stack', value: 'Angular · PHP' },
    ],
    stack: ['Angular', 'PHP', 'MySQL', 'AWS EC2'],
    accent: 'from-emerald-400/20 via-cyan-500/15 to-violet-400/10',
  },
  {
    slug: 'entre-institute',
    name: 'ENTRE Institute',
    tagline: 'Education platform with affiliate tracking',
    description:
      'An education platform with affiliate tracking, lead management, and self-serve enrollment. I wired up Stripe for recurring subscriptions and invoice generation.',
    impact: [
      { label: 'Billing', value: 'Stripe' },
      { label: 'Flows', value: 'Affiliate, enroll' },
      { label: 'Hosting', value: 'AWS' },
    ],
    stack: ['PHP', 'MySQL', 'AWS', 'Stripe'],
    accent: 'from-violet-500/20 via-rose-400/15 to-cyan-400/10',
  },
  {
    slug: 'rtrbo-vehicle-rental',
    name: 'RTRBO — Vehicle Rental Platform',
    tagline: 'Vehicle rental marketplace',
    description:
      'Built end-to-end on the Zend framework over a LAMP stack. Search, booking, inventory, and payment — the whole thing.',
    impact: [
      { label: 'Scope', value: 'End-to-end' },
      { label: 'Framework', value: 'Zend' },
      { label: 'Modules', value: 'Search, pay' },
    ],
    stack: ['Zend', 'MySQL', 'LAMP'],
    accent: 'from-rose-400/20 via-violet-500/15 to-emerald-400/10',
  },
  {
    slug: 'hospital-management-system',
    name: 'Hospital Management System',
    tagline: 'Clinical operations system',
    description:
      'A multi-module system with role-based access for doctors, nurses, and admin staff. I set up SMS triggers for appointment reminders, which helped bring patient no-shows down.',
    impact: [
      { label: 'Roles', value: 'Doctor, nurse, admin' },
      { label: 'Reminders', value: 'SMS' },
      { label: 'Outcome', value: 'Fewer no-shows' },
    ],
    stack: ['PHP', 'MySQL', 'Bootstrap'],
    accent: 'from-cyan-400/20 via-emerald-400/15 to-violet-400/10',
  },
]

export const achievements = [
  {
    metric: '40%',
    label: 'Faster API responses',
    detail:
      'Came out of the telehealth API work at Spring. Mostly about fixing slow MySQL queries and putting the right indexes in place.',
  },
  {
    metric: '5+',
    label: 'Engineers on my team',
    detail:
      "I'm currently leading 5+ engineers at Spring. Before that I ran a 4-person team at Nadsoft.",
  },
  {
    metric: '10+',
    label: 'Years writing web apps',
    detail:
      "I've been doing this since 2016. Most of that time in PHP, Node.js, Angular, and MySQL.",
  },
  {
    metric: 'HIPAA',
    label: 'Compliance work',
    detail:
      'Set up encryption at rest, access controls, and audit logging on the telehealth product.',
  },
  {
    metric: '15+',
    label: "Projects I've worked on",
    detail:
      'Across healthtech, ed-tech, rentals, and some enterprise tools. A mix of new builds and legacy rescue work.',
  },
  {
    metric: 'JWT + RBAC',
    label: 'Auth rollout',
    detail:
      'Added authentication and role-based access across every module of the current product.',
  },
]

export const education = {
  degree: 'Bachelor of Engineering, Computer Science',
  school: 'Shivaji University, Kolhapur, Maharashtra',
  year: '2015',
}

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]
