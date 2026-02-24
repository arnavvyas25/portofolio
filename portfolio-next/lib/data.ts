/**
 * Site Data Configuration
 *
 * Central data store positioning Arnav Vyas as an Applied AI Engineer
 * building scalable ML systems across healthcare, life sciences, and enterprise.
 */

import type {
  NavItem,
  Project,
  Publication,
  Experience,
  SkillCategory,
  Education,
} from './types';

// Site-wide metadata
export const siteMetadata = {
  title: 'Arnav Vyas',
  description:
    'Applied AI Engineer building scalable machine learning systems across healthcare, life sciences, and enterprise environments. Bridging research-grade modeling with real-world decision systems.',
  author: 'Arnav Vyas',
  siteUrl: 'https://www.arnavvyas.com',
  email: 'vyas31@purdue.edu',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/arnavvyas', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/arnavvyas', icon: 'linkedin' },
    { name: 'Email', url: 'mailto:vyas31@purdue.edu', icon: 'email' },
  ],
};

// Navigation
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/projects' },
  { label: 'Research', href: '/research' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// Hero content
export const heroContent = {
  headline: 'Applied AI Engineer',
  subheadline:
    'Building scalable machine learning systems across healthcare, life sciences, and enterprise environments.',
  description:
    'Bridging research-grade modeling with real-world decision systems through rigorous analytics, cross-functional leadership, and production-focused engineering.',
};

// Narrative summary for homepage
export const narrativeSummary = `Three years of highly selective, client-facing data science experience through Purdue's Data Mine, partnering with Fortune 500 companies including Viasat, Merck, and Elevance Health. From pharmaceutical R&D innovation—redesigning HPV vaccine assay workflows—to healthcare cost-of-care modeling and patient segmentation at scale.

Applied self-supervised learning to satellite imagery during my first year as an undergraduate. Built automated ML-to-Dash integration pipelines that transformed fragmented research codebases into interactive decision tools. Analyzed Medicare and Medicaid datasets to identify underrepresented patient populations for targeted GLP-1 therapy outreach.

I operate at the intersection of rigorous research and production-ready systems.`;

// Impact statements
export const impactStatements = [
  {
    metric: '10x',
    title: 'Throughput Increase',
    description: 'Reduced assay processing from ~1 day to ~3 hours',
    detail:
      'Replaced linear regression with statistically rigorous hypothesis testing for HPV vaccine optimization at Merck.',
  },
  {
    metric: '15+',
    title: 'Data Scientists Managed',
    description: 'Led cost-of-care prediction initiatives',
    detail:
      'Directed technical strategy and sprint planning for healthcare analytics at Elevance Health.',
  },
  {
    metric: 'PhD→Prod',
    title: 'Research to Production',
    description: 'Built automated ML-to-Dash pipelines',
    detail:
      'Transformed PhD-built ML artifacts into scalable, stakeholder-ready applications at Merck.',
  },
  {
    metric: 'Year 1',
    title: 'Graduate-Level Research',
    description: 'Self-supervised learning for satellite segmentation',
    detail:
      'Applied advanced computer vision during first year of undergraduate study at Viasat.',
  },
];

// Engineering philosophy
export const engineeringPhilosophy = {
  title: 'Engineering Philosophy',
  summary:
    'I specialize in translating ambiguous business and scientific problems into tractable modeling frameworks—simplifying overengineered systems and focusing on decision-driven analytics rather than model complexity for its own sake.',
  principles: [
    {
      title: 'Decision-Driven Modeling',
      description:
        'Every model should answer a business question. I start with the decision that needs to be made, then work backward to the minimum viable model that enables it.',
    },
    {
      title: 'Simplify Before Scaling',
      description:
        'The HPV assay redesign proved this: replacing a complex regression workflow with simple hypothesis testing delivered 10x throughput gains. Complexity should be earned, not assumed.',
    },
    {
      title: 'Research to Production',
      description:
        'Bridging the gap between PhD-built research artifacts and stakeholder-ready tools. I build systems that make ML accessible without sacrificing rigor.',
    },
    {
      title: 'Data-Backed Dissent',
      description:
        'Willing to challenge legacy processes when data supports a better approach. Senior leadership buy-in comes from evidence, not authority.',
    },
  ],
};

// Leadership highlights
export const leadershipHighlights = [
  {
    title: 'Agile Team Management',
    description:
      'Directed ~15 student data scientists through sprint planning, stakeholder communication, and technical mentorship at Elevance Health.',
  },
  {
    title: 'Executive Presentation',
    description:
      'Presented assay optimization findings to senior scientific leadership at Merck, advocating for process redesign with data-backed reasoning.',
  },
  {
    title: 'Cross-Functional Collaboration',
    description:
      'Navigated resistance to process change by translating technical insights into business impact for non-technical stakeholders.',
  },
  {
    title: 'Research-to-Operations Bridge',
    description:
      'Consistently operate at the intersection of research teams and operational execution, ensuring models deliver real-world value.',
  },
];

// Future direction
export const futureDirection = {
  title: "Where I'm Headed",
  summary:
    'Transitioning from research-heavy ML roles into production-ready ML engineering with a focus on full lifecycle ownership.',
  areas: [
    'Cloud deployment and scalable API development',
    'End-to-end ML pipelines: data ingestion → training → validation → deployment → monitoring',
    'Production-grade model serving and observability',
    'Healthcare AI systems that meet clinical and regulatory requirements',
  ],
};

// Experiences (structured by engagement)
export const experiences: Experience[] = [
  {
    id: 'datamine-elevance',
    title: 'Project Manager & Technical Lead',
    company: 'The Data Mine – Elevance Health',
    location: 'West Lafayette, IN',
    startDate: 'Aug 2023',
    endDate: 'May 2024',
    description:
      'Led a team of ~15 student data scientists in an Agile environment, owning technical strategy and model direction for healthcare cost prediction and patient segmentation initiatives.',
    responsibilities: [
      'Directed sprint planning, stakeholder communication, and technical mentorship across multiple workstreams',
      'Built cost-of-care prediction models translating outputs into actionable financial and operational insights',
      'Developed patient clustering and segmentation analyses for targeted healthcare interventions',
      'Owned model direction and strategic guidance, presenting findings to senior healthcare leadership',
    ],
    techStack: ['Python', 'SQL', 'Scikit-learn', 'Clustering', 'Cost Modeling', 'Agile'],
  },
  {
    id: 'merck-pharma',
    title: 'Data Science Intern – Pharmaceutical R&D',
    company: 'Merck & Co.',
    location: 'West Point, PA',
    startDate: 'May 2023',
    endDate: 'Aug 2023',
    description:
      'Redesigned HPV vaccine assay optimization workflow, replacing legacy linear regression with statistically rigorous hypothesis testing to dramatically improve throughput and processing time.',
    responsibilities: [
      'Identified that the 64-well spectroscopic assay decision problem was threshold-based classification, not regression',
      'Designed and implemented two-sided t-test framework replacing computationally expensive regression workflow',
      'Reduced assay processing time from ~1 day to ~3 hours while increasing throughput 10x',
      'Presented findings to senior scientific staff, successfully advocating for adoption of new methodology',
      'Demonstrated willingness to challenge legacy processes with data-backed reasoning',
    ],
    techStack: ['Python', 'Statistical Testing', 'Hypothesis Testing', 'Spectroscopic Analysis'],
  },
  {
    id: 'datamine-merck',
    title: 'ML Systems Integration Engineer',
    company: 'The Data Mine – Merck',
    location: 'West Lafayette, IN',
    startDate: 'Aug 2022',
    endDate: 'May 2023',
    description:
      'Transformed complex Python-based ML research artifacts built by PhD researchers into automated, scalable Dash web applications accessible to non-technical stakeholders.',
    responsibilities: [
      'Parsed complex ML research codebases using advanced regex and pipeline automation techniques',
      'Built automated ML-to-Dash integration pipelines converting fragmented research into interactive tools',
      'Developed user interfaces that made sophisticated models accessible to business stakeholders',
      'Collaborated with PhD researchers to understand model architectures and preserve scientific rigor',
    ],
    techStack: ['Python', 'Dash', 'Plotly', 'Regex', 'Pipeline Automation', 'API Development'],
  },
  {
    id: 'datamine-viasat',
    title: 'Computer Vision Research Associate',
    company: 'The Data Mine – Viasat',
    location: 'West Lafayette, IN',
    startDate: 'Aug 2021',
    endDate: 'May 2022',
    description:
      'Applied self-supervised learning techniques to satellite image segmentation during first year of undergraduate study, working alongside advanced researchers in a graduate-level computer vision engagement.',
    responsibilities: [
      'Implemented self-supervised learning methods for representation learning on satellite imagery',
      'Collaborated with senior researchers on experimental design and iterative model development',
      'Rapidly upskilled in computer vision fundamentals and deep learning frameworks',
      'Participated in Agile workflows with weekly sprints and technical reviews',
    ],
    techStack: ['Python', 'PyTorch', 'Self-Supervised Learning', 'Computer Vision'],
  },
  {
    id: 'healthcare-marketing',
    title: 'Healthcare Marketing Analytics',
    company: 'Enterprise Healthcare Client',
    location: 'Remote',
    startDate: 'Jan 2024',
    endDate: 'Present',
    description:
      'Analyzed Medicare and Medicaid datasets to identify underrepresented but reachable patient populations for GLP-1 therapies (Wegovy, Ozempic), translating analytics into targeted outreach recommendations.',
    responsibilities: [
      'Processed large-scale Medicare and Medicaid datasets to identify patient population segments',
      'Developed segmentation logic balancing reach, equity, and therapeutic appropriateness',
      'Translated analytical findings into actionable marketing and outreach recommendations',
      'Considered equity implications in targeting strategies for underrepresented populations',
    ],
    techStack: ['Python', 'SQL', 'Healthcare Data', 'Segmentation', 'Marketing Analytics'],
  },
];

// Skill categories
export const skillCategories: SkillCategory[] = [
  {
    name: 'Core Programming',
    skills: ['Python (Advanced)', 'SQL', 'TypeScript', 'Data Parsing', 'Automation Scripting', 'Regex'],
  },
  {
    name: 'ML & Statistical Modeling',
    skills: [
      'Supervised Learning',
      'Classification & Regression',
      'Clustering & Segmentation',
      'Hypothesis Testing',
      'Model Evaluation',
      'SHAP & Interpretability',
      'Cost Prediction Modeling',
      'Healthcare Analytics',
      'Computer Vision',
      'Self-Supervised Learning',
    ],
  },
  {
    name: 'Data Systems & Visualization',
    skills: [
      'Dash & Plotly',
      'Pipeline Automation',
      'Regex Parsing',
      'Exploratory Data Analysis',
      'Stakeholder Dashboards',
      'Pandas & NumPy',
    ],
  },
  {
    name: 'Cloud & Deployment',
    skills: ['AWS', 'GCP', 'Docker', 'API Development', 'Model Serving', 'CI/CD Fundamentals'],
  },
];

// Projects (case-study focused)
export const projects: Project[] = [
  {
    id: 'hpv-assay-optimization',
    title: 'HPV Vaccine Assay Optimization',
    description:
      'Redesigned pharmaceutical R&D workflow, replacing linear regression with hypothesis testing to achieve 10x throughput improvement.',
    longDescription:
      'Identified that the legacy 64-well spectroscopic assay relied on linear regression when the actual decision problem was threshold-based classification. Designed a statistically rigorous two-sided t-test framework that reduced processing time from ~1 day to ~3 hours while increasing throughput 10x. Presented findings to senior scientific leadership and successfully advocated for adoption.',
    techStack: ['Python', 'Statistical Testing', 'Scientific Computing', 'Spectroscopic Analysis'],
    category: 'data-science',
    featured: true,
    slug: 'hpv-assay-optimization',
  },
  {
    id: 'cost-of-care-modeling',
    title: 'Healthcare Cost-of-Care Prediction',
    description:
      'Led patient clustering and cost prediction modeling for a major healthcare organization, translating outputs into financial insights.',
    longDescription:
      'Directed ~15 data scientists in building cost-of-care prediction models and patient segmentation analyses. Translated model outputs into actionable financial and operational insights for healthcare leadership. Owned technical strategy, sprint planning, and stakeholder communication throughout.',
    techStack: ['Python', 'Scikit-learn', 'SQL', 'Clustering', 'Healthcare Analytics'],
    category: 'machine-learning',
    featured: true,
    slug: 'cost-of-care-modeling',
  },
  {
    id: 'ml-dash-integration',
    title: 'ML-to-Dash Pipeline Automation',
    description:
      'Built automated pipelines transforming PhD research codebases into interactive, stakeholder-ready Dash applications.',
    longDescription:
      'Parsed complex Python ML artifacts built by PhD researchers using advanced regex and pipeline automation. Developed user interfaces making sophisticated models accessible to non-technical stakeholders. Preserved scientific rigor while enabling broad organizational adoption.',
    techStack: ['Python', 'Dash', 'Plotly', 'Regex', 'Pipeline Automation'],
    category: 'web-development',
    featured: true,
    slug: 'ml-dash-integration',
  },
  {
    id: 'satellite-segmentation',
    title: 'Self-Supervised Satellite Segmentation',
    description:
      'Applied self-supervised learning to satellite image segmentation during first-year undergraduate research.',
    longDescription:
      'Implemented self-supervised learning methods for representation learning on satellite imagery. Collaborated with senior researchers on experimental design and iterative model development. Demonstrated ability to rapidly upskill in advanced technical domains.',
    techStack: ['PyTorch', 'Self-Supervised Learning', 'Computer Vision', 'Satellite Imagery'],
    category: 'research',
    featured: true,
    slug: 'satellite-segmentation',
  },
  {
    id: 'glp1-patient-targeting',
    title: 'GLP-1 Therapy Patient Targeting',
    description:
      'Analyzed Medicare/Medicaid data to identify underrepresented patient populations for Wegovy and Ozempic outreach.',
    longDescription:
      'Processed large-scale healthcare datasets to identify patient population segments for GLP-1 therapy marketing. Developed segmentation logic balancing reach, equity, and therapeutic appropriateness. Translated analytical findings into actionable outreach recommendations.',
    techStack: ['Python', 'SQL', 'Healthcare Data', 'Segmentation Analytics'],
    category: 'data-science',
    featured: false,
    slug: 'glp1-patient-targeting',
  },
];

// Publications
export const publications: Publication[] = [
  {
    id: 'neonatal-aki-journal',
    title: 'Machine Learning Approaches for Neonatal AKI Mortality Prediction',
    authors: ['Arnav Vyas', 'Research Collaborators'],
    conference: 'Journal of Maternal-Fetal & Neonatal Medicine',
    year: 2026,
    abstract:
      'Developed ensemble ML models for neonatal acute kidney injury mortality risk prediction using clinical indicators. Addressed severe class imbalance through specialized evaluation frameworks and feature engineering. Prioritized model interpretability for clinical adoption.',
    link: 'https://www.tandfonline.com/doi/full/10.1080/14767058.2026.2623378',
    type: 'journal',
  },
];

// Conference Presentations
export const conferencePresentations = [
  {
    id: 'asn-kidney-week-2024',
    title: 'Predicting Mortality Risk in Neonatal Patients',
    conference: 'ASN Kidney Week 2024',
    location: 'San Diego, CA',
    year: 2024,
    role: 'Second Author',
    presentationType: 'Poster Presentation',
    link: 'https://journals.lww.com/jasn/fulltext/2024/10001/predicting_mortality_risk_in_neonatal_patients.2234.aspx',
  },
  {
    id: 'shine-2025',
    title: 'Machine Learning for Neonatal AKI Mortality Prediction',
    conference: 'SHINE (Symposium on Health Innovation and Neonatal Excellence)',
    location: 'Orlando, FL',
    year: 2025,
    role: 'First Author',
    presentationType: 'Poster Presentation',
  },
  {
    id: 'ipna-2025',
    title: 'Neonatal AKI Outcomes Analysis',
    conference: 'IPNA Congress 2025',
    location: 'South Africa',
    year: 2025,
    role: 'Second Author',
    presentationType: 'Oral Presentation',
    link: 'https://link.springer.com/article/10.1007/s00467-024-06607-y',
  },
];

// Education
export const education: Education[] = [
  {
    id: 'purdue',
    institution: 'Purdue University',
    degree: 'Bachelor of Science in Computer Science',
    field: 'Machine Learning Concentration',
    startDate: '2021',
    endDate: '2025',
    location: 'West Lafayette, IN',
    gpa: '3.8/4.0',
    highlights: [
      'Three years of Data Mine corporate partnership experience (Viasat, Merck, Elevance Health)',
      'Published research in healthcare machine learning',
      'Coursework: ML, Computer Vision, Statistical Learning, Distributed Systems',
    ],
  },
];

// Research interests
export const researchInterests = [
  {
    title: 'Healthcare AI Systems',
    description:
      'Building ML systems that meet clinical workflow requirements, regulatory constraints, and interpretability needs.',
  },
  {
    title: 'Production ML Engineering',
    description:
      'End-to-end pipeline ownership from data ingestion through deployment, monitoring, and model lifecycle management.',
  },
  {
    title: 'Decision-Driven Analytics',
    description:
      'Translating ambiguous problems into tractable modeling frameworks focused on actionable business outcomes.',
  },
];

// Helper functions
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category);
}
