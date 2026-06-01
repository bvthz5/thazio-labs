/* ═══════════════════════════════════════════════════════════════
   THAZIO — Site Constants & Content Data
   The World's First Fully Automated Company
   ═══════════════════════════════════════════════════════════════ */

export const SITE_NAME = 'THAZIO';
export const SITE_TAGLINE = "The World's First Fully Automated Company";
export const SITE_DESCRIPTION = 'THAZIO is the world\'s first fully automated company — replacing manual operations with intelligent agent networks that run workflows, manage data, and scale infrastructure without human intervention.';

/* ─── Navigation ─────────────────────────────────────────────── */

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Insights', href: '#insights' },
  { label: 'Company', href: '#company' },
  { label: 'Contact', href: '#contact' },
] as const;

/* ─── Hero Capabilities (3 core pillars) ─────────────────────── */

export const CAPABILITIES = [
  {
    icon: '🤖',
    title: 'Autonomous Agents',
    description: 'Self-governing AI modules that handle discrete business functions from marketing to data pipelines.',
  },
  {
    icon: '🔗',
    title: 'Workflow Fusion',
    description: 'Agents communicate and collaborate seamlessly, passing context and tasks without bottlenecks.',
  },
  {
    icon: '⚡',
    title: 'Self-Optimizing Logic',
    description: 'Machine learning models that analyze outcomes and rewrite their own execution paths for maximum efficiency.',
  },
] as const;

/* ─── Services ───────────────────────────────────────────────── */

export const SERVICES = [
  {
    icon: '💻',
    title: 'Digital & Software',
    description: 'End-to-end digital product engineering, custom software platforms, and scalable application development that transforms business ideas into production-ready solutions.',
  },
  {
    icon: '🧠',
    title: 'Artificial Intelligence',
    description: 'Enterprise-grade machine learning models, natural language processing, computer vision, and agentic AI systems that automate decision-making at scale.',
  },
  {
    icon: '📊',
    title: 'Data & Analytics',
    description: 'Data engineering, business intelligence dashboards, predictive analytics, and real-time data pipelines that turn raw information into strategic advantage.',
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions',
    description: 'Cloud architecture design, seamless migration, DevOps automation, and managed infrastructure engineered for global scale and maximum uptime.',
  },
  {
    icon: '🎯',
    title: 'Consulting',
    description: 'Strategic technology advisory, digital transformation roadmaps, and AI readiness assessments that align technology investments with business outcomes.',
  },
  {
    icon: '⚙️',
    title: 'Automation',
    description: 'Intelligent process automation, robotic process automation, workflow orchestration, and autonomous operations that eliminate manual bottlenecks.',
  },
] as const;

/* ─── Industries ─────────────────────────────────────────────── */

export const INDUSTRIES = [
  {
    title: 'Retail',
    description: 'AI-powered demand forecasting, personalized shopping experiences, and autonomous supply chain optimization that maximize revenue per customer.',
    gradient: 'linear-gradient(135deg, #0066FF20, #7B2FBE30, #00D4FF20)',
  },
  {
    title: 'Advertising & Media',
    description: 'Intelligent campaign orchestration, programmatic ad placement, and real-time audience analytics that deliver measurable ROI at scale.',
    gradient: 'linear-gradient(135deg, #7B2FBE20, #00D4FF30, #0066FF20)',
  },
  {
    title: 'Education',
    description: 'Adaptive learning platforms, automated curriculum delivery, and student performance analytics that personalize education for every learner.',
    gradient: 'linear-gradient(135deg, #00D4FF20, #0066FF30, #7B2FBE20)',
  },
  {
    title: 'Telecommunication',
    description: 'Network optimization, intelligent customer service automation, and predictive maintenance systems that reduce downtime and churn.',
    gradient: 'linear-gradient(135deg, #0066FF25, #00D4FF30, #7B2FBE15)',
  },
  {
    title: 'Healthcare',
    description: 'AI-assisted diagnostics, automated patient workflow management, and clinical data analytics that improve outcomes while reducing operational costs.',
    gradient: 'linear-gradient(135deg, #7B2FBE25, #0066FF30, #00D4FF15)',
  },
  {
    title: 'E-Commerce',
    description: 'Autonomous inventory management, dynamic pricing engines, and conversational AI shopping assistants that drive conversion and loyalty.',
    gradient: 'linear-gradient(135deg, #00D4FF25, #7B2FBE30, #0066FF15)',
  },
  {
    title: 'Finance',
    description: 'Algorithmic trading systems, automated compliance monitoring, fraud detection, and risk assessment platforms powered by real-time intelligence.',
    gradient: 'linear-gradient(135deg, #0066FF20, #00D4FF25, #7B2FBE30)',
  },
  {
    title: 'Utilities',
    description: 'Smart grid optimization, predictive infrastructure maintenance, and automated resource distribution that maximize efficiency across networks.',
    gradient: 'linear-gradient(135deg, #7B2FBE20, #0066FF25, #00D4FF30)',
  },
] as const;

/* ─── Stats ──────────────────────────────────────────────────── */

export const STATS = [
  { number: '200+', label: 'Enterprise Clients' },
  { number: '30+', label: 'Countries Served' },
  { number: '99.9%', label: 'Platform Uptime' },
  { number: '1M+', label: 'Automated Tasks/Day' },
] as const;

/* ─── Insights ───────────────────────────────────────────────── */

export const INSIGHT_CATEGORIES = ['All', 'Newsroom', 'Blog', 'Case Study', 'E-Book'] as const;

export const INSIGHTS = [
  {
    title: 'Thazio Raises Series B to Accelerate Autonomous Enterprise Platform',
    description: 'Thazio announces a major funding milestone to scale its autonomous agent infrastructure across global markets and expand its engineering team.',
    tag: 'Newsroom',
    date: 'May 28, 2026',
    readTime: '4 min read',
    featured: true,
  },
  {
    title: 'How Autonomous Agents Are Replacing Traditional SaaS Workflows',
    description: 'A deep dive into why self-governing AI modules are outperforming legacy software stacks in enterprise automation scenarios.',
    tag: 'Blog',
    date: 'May 20, 2026',
    readTime: '8 min read',
    featured: false,
  },
  {
    title: 'Fortune 500 Retailer Cuts Operational Costs by 40% with Thazio',
    description: 'How a leading retail enterprise replaced 12 manual workflow systems with Thazio\'s autonomous agent network in under 90 days.',
    tag: 'Case Study',
    date: 'May 12, 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    title: 'The Complete Guide to Enterprise AI Automation in 2026',
    description: 'Everything executives need to know about deploying intelligent automation — from strategy to implementation to measuring ROI.',
    tag: 'E-Book',
    date: 'Apr 30, 2026',
    readTime: '25 min read',
    featured: false,
  },
  {
    title: 'Thazio Partners with Leading Cloud Providers for Global Expansion',
    description: 'Strategic partnerships with major cloud hyperscalers enable Thazio to deliver autonomous operations across 30+ countries.',
    tag: 'Newsroom',
    date: 'Apr 22, 2026',
    readTime: '3 min read',
    featured: false,
  },
  {
    title: 'Building Self-Optimizing ML Pipelines: Lessons from Production',
    description: 'Our engineering team shares hard-won insights from deploying machine learning models that rewrite their own execution paths.',
    tag: 'Blog',
    date: 'Apr 15, 2026',
    readTime: '10 min read',
    featured: false,
  },
] as const;

/* ─── Leadership ─────────────────────────────────────────────── */

export const LEADERSHIP = [
  {
    name: 'Alexander Reeves',
    role: 'Founder & CEO',
    bio: 'Visionary technologist with 15+ years building enterprise AI systems. Previously led AI research at a Fortune 100 tech company. Holds a PhD in Machine Learning from Stanford.',
    image: '/images/leadership/ceo.png',
  },
  {
    name: 'Sophia Chen',
    role: 'Co-founder & CTO',
    bio: 'Full-stack architect and distributed systems expert. Built scalable platforms serving 500M+ users. Former engineering lead at a top-tier cloud infrastructure company.',
    image: '/images/leadership/cto.png',
  },
  {
    name: 'Marcus Wright',
    role: 'Co-founder & CIO',
    bio: 'Data strategist and enterprise transformation specialist. Led digital overhauls for global banks and healthcare networks. MBA from Wharton, MS in Data Science from MIT.',
    image: '/images/leadership/cio.png',
  },
] as const;

/* ─── FAQ ────────────────────────────────────────────────────── */

export const FAQ_ITEMS = [
  {
    question: 'What does "fully automated company" mean?',
    answer: 'Thazio deploys autonomous AI agents that handle business operations end-to-end — from data processing and workflow management to customer interactions and infrastructure scaling — without requiring human intervention for routine tasks.',
  },
  {
    question: 'How do autonomous agents work?',
    answer: 'Our agents are self-governing AI modules trained on specific business functions. They receive objectives, execute multi-step workflows, communicate with other agents, learn from outcomes, and continuously optimize their own execution paths.',
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve retail, advertising & media, education, telecommunication, healthcare, e-commerce, finance, and utilities — essentially any industry with complex operational workflows that benefit from intelligent automation.',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Typical deployments range from 4-12 weeks depending on complexity. Our consulting team conducts an AI readiness assessment, designs a transformation roadmap, and our agents begin handling workflows incrementally.',
  },
  {
    question: 'Is my data secure with Thazio?',
    answer: 'Absolutely. We maintain SOC 2 Type II compliance, end-to-end encryption, and deploy within your cloud environment. Our agents process data in isolated containers with full audit trails and zero data retention policies.',
  },
  {
    question: 'Can Thazio integrate with our existing systems?',
    answer: 'Yes. Our platform connects with 200+ enterprise tools via pre-built connectors — including Salesforce, SAP, Workday, AWS, Azure, GCP, and custom APIs. Our agents bridge legacy and modern systems seamlessly.',
  },
  {
    question: 'What makes Thazio different from traditional automation?',
    answer: 'Traditional RPA follows rigid scripts. Thazio agents understand context, make decisions, collaborate with other agents, and rewrite their own logic when they find more efficient paths. They adapt — scripts don\'t.',
  },
  {
    question: 'Do you offer consulting services?',
    answer: 'Yes. Our consulting practice helps enterprises assess AI readiness, design transformation strategies, and build internal capabilities. We provide ongoing advisory to ensure your automation initiatives deliver measurable ROI.',
  },
] as const;

/* ─── Company Info ───────────────────────────────────────────── */

export const COMPANY_INFO = {
  mission: 'To eliminate operational friction by building autonomous systems that run, optimize, and scale every business process — so humans can focus on what matters most.',
  vision: 'A world where every enterprise operates at peak efficiency through intelligent automation, freeing human potential for creativity, strategy, and innovation.',
  values: [
    { title: 'Autonomy First', description: 'We build systems that run themselves, not systems that need babysitting.' },
    { title: 'Radical Efficiency', description: 'Every process should be faster, cheaper, and better than the manual alternative.' },
    { title: 'Trust Through Transparency', description: 'Our agents explain their decisions. Every action has an audit trail.' },
    { title: 'Continuous Evolution', description: 'Our systems learn and improve. Yesterday\'s best is today\'s baseline.' },
  ],
} as const;
