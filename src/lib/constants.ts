/* ═══════════════════════════════════════════════════════════════
   THAZIO LABS — Site Constants & Content Data
   AI-First Engineering & Autonomous Systems
   ═══════════════════════════════════════════════════════════════ */

export const SITE_NAME = 'THAZIO';
export const SITE_TAGLINE = 'Intelligent Systems For Modern Enterprises';
export const SITE_DESCRIPTION =
  'Thazio Labs is a premier AI-first engineering firm architecting intelligent software, autonomous systems, and data-driven solutions for global enterprises, institutions, and governments.';

/* ─── Navigation ─────────────────────────────────────────────── */

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Industries', href: '#industries' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
] as const;

/* ─── Services ───────────────────────────────────────────────── */

export const SERVICES = [
  {
    slug: 'digital-software',
    icon: 'code',
    title: 'Enterprise Software Engineering',
    description: 'Architecting scalable, high-performance digital platforms and custom applications designed to accelerate operational scale and secure competitive dominance.',
    image: '/images/services/digital_software.png',
    detail: { heroSubtitle: '', capabilities: [], technologies: [], process: [], faq: [] },
  },
  {
    slug: 'ai-data-analytics',
    icon: 'brain',
    title: 'Artificial Intelligence & Analytics',
    description: 'Deploying generative AI models, proprietary machine learning pipelines, and predictive analytics to transform unstructured data into actionable foresight.',
    image: '/images/services/ai_data.png',
    detail: { heroSubtitle: '', capabilities: [], technologies: [], process: [], faq: [] },
  },
  {
    slug: 'cloud',
    icon: 'cloud',
    title: 'Cloud Infrastructure & Security',
    description: 'Migrating and optimizing legacy systems into elastic, zero-trust cloud environments with automated DevOps and 24/7 telemetry monitoring.',
    image: '/images/services/cloud.png',
    detail: { heroSubtitle: '', capabilities: [], technologies: [], process: [], faq: [] },
  },
  {
    slug: 'consulting',
    icon: 'chart',
    title: 'Strategic Technology Consulting',
    description: 'Providing executive-level transformation roadmaps, enterprise architecture design, and process optimization to future-proof core operations.',
    image: '/images/services/consulting.png',
    detail: { heroSubtitle: '', capabilities: [], technologies: [], process: [], faq: [] },
  },
  {
    slug: 'global-capability-centers',
    icon: 'automation',
    title: 'Global Capability Centers',
    description: 'Establishing dedicated, high-performance global delivery teams to scale engineering bandwidth, operational resilience, and specialized talent.',
    image: '/images/services/gcc.png',
    detail: { heroSubtitle: '', capabilities: [], technologies: [], process: [], faq: [] },
  },
] as const;

/* ─── Why Choose Us ──────────────────────────────────────────── */

export const WHY_CHOOSE_US = [
  {
    icon: 'excellence',
    title: 'A Legacy of Engineering Excellence',
    description: 'We partner with global organizations to navigate complex digital transformations. Our stability and strategic foresight ensure that every solution is innovative, secure, and perfectly tailored for long-term growth.',
  },
  {
    icon: 'execution',
    title: 'Precision in Execution',
    description: 'We fuse deep technical expertise in AI and cloud architectures with meticulous deployment strategies. Our relentless focus on quality guarantees high-performance systems and top-tier data security.',
  },
  {
    icon: 'teams',
    title: 'High-Performance Autonomous Teams',
    description: 'Our foundation is built on elite, autonomous engineering squads. We integrate seamlessly with your internal operations, providing the technical depth required for your most mission-critical initiatives.',
  },
] as const;

/* ─── Industries ─────────────────────────────────────────────── */

export const INDUSTRIES = [
  {
    slug: 'retail',
    title: 'Retail',
    description: 'Intelligent inventory forecasting, unified data dashboards, and automated supply chain telemetry.',
    gradient: 'linear-gradient(135deg, #0066FF20, #7B2FBE30, #00D4FF20)',
    detail: { overview: '', challenges: [], solutions: [], benefits: [], faq: [] },
  },
  {
    slug: 'advertising-media',
    title: 'Advertising & Media',
    description: 'Automated placement engines, audience analytics, and high-bandwidth media delivery platforms.',
    gradient: 'linear-gradient(135deg, #7B2FBE20, #00D4FF30, #0066FF20)',
    detail: { overview: '', challenges: [], solutions: [], benefits: [], faq: [] },
  },
  {
    slug: 'education',
    title: 'Education',
    description: 'Scalable academic management platforms, automated assessment tools, and digital campus infrastructure.',
    gradient: 'linear-gradient(135deg, #00D4FF20, #0066FF30, #7B2FBE20)',
    detail: { overview: '', challenges: [], solutions: [], benefits: [], faq: [] },
  },
  {
    slug: 'telecommunication',
    title: 'Telecommunication',
    description: 'High-availability network monitoring, automated billing pipelines, and predictive churn models.',
    gradient: 'linear-gradient(135deg, #0066FF25, #00D4FF30, #7B2FBE15)',
    detail: { overview: '', challenges: [], solutions: [], benefits: [], faq: [] },
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    description: 'HIPAA-compliant data architectures, unified patient records, and predictive diagnostic models.',
    gradient: 'linear-gradient(135deg, #7B2FBE25, #0066FF30, #00D4FF15)',
    detail: { overview: '', challenges: [], solutions: [], benefits: [], faq: [] },
  },
  {
    slug: 'e-commerce',
    title: 'E-commerce',
    description: 'High-conversion web storefronts, real-time supply chain updates, and dynamic recommendation engines.',
    gradient: 'linear-gradient(135deg, #00D4FF25, #7B2FBE30, #0066FF15)',
    detail: { overview: '', challenges: [], solutions: [], benefits: [], faq: [] },
  },
  {
    slug: 'finance',
    title: 'Finance',
    description: 'Immutable ledger audits, real-time fraud detection, and secure regulatory compliance reporting.',
    gradient: 'linear-gradient(135deg, #0066FF20, #00D4FF25, #7B2FBE30)',
    detail: { overview: '', challenges: [], solutions: [], benefits: [], faq: [] },
  },
  {
    slug: 'utilities',
    title: 'Utilities',
    description: 'Grid telemetry pipelines, load-prediction algorithms, and automated resource allocation models.',
    gradient: 'linear-gradient(135deg, #7B2FBE20, #0066FF25, #00D4FF30)',
    detail: { overview: '', challenges: [], solutions: [], benefits: [], faq: [] },
  },
] as const;

/* ─── Case Studies (Maintained internally but hidden on front) ─── */

export const CASE_STUDIES = [
  {
    slug: 'seatsync',
    title: 'SeatSync',
    tagline: 'Smart Exam Seating & Invigilation System',
    description:
      'An intelligent platform that automates exam seating arrangements and invigilation scheduling for educational institutions, eliminating manual planning and ensuring fair, efficient examination processes.',
    tags: ['Education', 'Automation', 'AI'],
    detail: {
      challenge:
        'Educational institutions face enormous logistical challenges in manually planning exam seating for hundreds of students across multiple venues, while ensuring fair distribution and appropriate invigilation coverage.',
      approach:
        'We built an intelligent system that uses constraint-satisfaction algorithms and optimization techniques to automatically generate optimal seating arrangements and invigilation schedules, considering room capacities, student conflicts, and invigilator availability.',
      technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Optimization Algorithms'],
      results: [
        'Reduced planning time from days to minutes',
        'Eliminated seating conflicts and scheduling errors',
        'Automated invigilation assignment across venues',
        'Scalable to thousands of students and multiple examination sessions',
      ],
    },
  },
] as const;

/* ─── Stats ──────────────────────────────────────────────────── */

export const STATS = [
  { number: '50+', label: 'Enterprise Deployments' },
  { number: '10+', label: 'Years of Expertise' },
  { number: '6', label: 'Core Technology Domains' },
  { number: '100%', label: 'Proprietary Architectures' },
  { number: '24/7', label: 'Operational Telemetry' },
] as const;

/* ─── Insights ───────────────────────────────────────────────── */

export const INSIGHT_CATEGORIES = ['All', 'Newsroom', 'Blogs', 'Case Studies', 'E-books'] as const;

export const INSIGHTS = [
  {
    slug: 'building-the-autonomous-enterprise',
    title: 'Building The Autonomous Enterprise',
    description:
      'How AI-first engineering and multi-agent systems are reshaping the way organizations operate — from automated workflows to intelligent decision-making.',
    tag: 'Blogs' as const,
    date: 'Jun 2026',
    readTime: '8 min read',
    featured: true,
    detail: {
      heroSubtitle: 'How AI-first engineering and multi-agent systems are reshaping the way organizations operate.',
      introduction: 'The transition from human-operated systems to autonomous enterprise processes is the next major frontier in business technology. In this article, we explore the core pillars of the autonomous enterprise and how intelligent workflows are enabling self-correcting business logic.',
      mainContent: [
        'In the past decade, enterprise software focused heavily on record-keeping and workflow visualization. While platforms like ERPs and CRMs organized data, they still required manual intervention for almost every decision.',
        'Today, we are witnessing the convergence of large language models, structured memory vectors, and multi-agent orchestrations. This intersection is giving birth to the Autonomous Enterprise — organizations where core operational workflows are executed, monitored, and optimized by collaborating networks of AI agents.',
        'An autonomous enterprise is not one devoid of human intelligence. Rather, it is one where humans define objectives, set guardrails, and validate outcomes, while the execution layer runs autonomously. This model shifts the human role from manual execution to strategic oversight.'
      ],
      highlights: [
        'Transition from manual validation to automated exception handling.',
        'Combining LLMs with deterministic code bases for safe execution.',
        'AI agents functioning as autonomous operations specialists.'
      ],
      relatedArticles: ['the-rise-of-agentic-ai', 'designing-intelligent-workflows']
    }
  },
  {
    slug: 'human-ai-collaboration-in-modern-organizations',
    title: 'Human-AI Collaboration In Modern Organizations',
    description:
      'Why the most effective AI systems augment human capabilities rather than replace them — and how to design for collaboration.',
    tag: 'Blogs' as const,
    date: 'Jun 2026',
    readTime: '6 min read',
    featured: false,
    detail: {
      heroSubtitle: 'Augmenting human capability rather than replacing it: designing systems for collaboration.',
      introduction: 'As AI systems gain autonomy, the design of human-in-the-loop interfaces becomes critical. We explore how modern organizations are structuring workspaces where humans and AI agents collaborate side-by-side.',
      mainContent: [
        'The fear of AI replacing human labor often overshadows the more productive reality: the most successful systems are collaborative.',
        'By offloading cognitive drudgery—such as data aggregation, initial synthesis, and repetitive writing—to AI systems, humans are freed to focus on intuition, empathy, and creative problem-solving.',
        'Designing these interfaces requires deep attention to trust, explainability, and context-sharing. It is not enough for an AI to present a conclusion; it must explain its reasoning path, cite its sources, and gracefully handle human corrections.'
      ],
      highlights: [
        'Cognitive offloading increases creative efficiency by over 300%.',
        'Explainability as the foundation of trust in autonomous systems.',
        'Iterative feedback loops where agents learn from human oversight.'
      ],
      relatedArticles: ['building-the-autonomous-enterprise', 'the-rise-of-agentic-ai']
    }
  },
  {
    slug: 'future-of-multi-agent-systems',
    title: 'Future Of Multi-Agent Systems',
    description:
      'How collaborative AI agents are achieving emergent intelligence through specialization, communication, and coordinated problem-solving.',
    tag: 'Case Studies' as const,
    date: 'May 2026',
    readTime: '10 min read',
    featured: false,
    detail: {
      heroSubtitle: 'Emergent intelligence through coordination, specialization, and agentic communication.',
      introduction: 'Single large language models have limits. By networking specialized agents together, we can achieve complex problem-solving capabilities that mirror human departmental operations.',
      mainContent: [
        'When an AI system is asked to build a software feature, write a legal contract, or manage a logistics chain, a single prompt-response model often falls short. These complex tasks require iteration, planning, review, and corrections.',
        'Multi-agent systems divide the problem. One agent gathers data, another drafts a plan, a third executes the code, and a fourth runs safety checks. Because each agent has a narrow persona and clear boundary, they perform with higher reliability.',
        'Our research at Thazio Labs focuses on optimal protocols for inter-agent communication, conflict resolution, and shared state memory, ensuring that agent network dynamics don\'t loop or diverge.'
      ],
      highlights: [
        'Specialized personas improve LLM reliability by narrowing context focus.',
        'Shared state protocols allow agents to collaborate without loss of history.',
        'Conflict resolution mechanisms prevent logic loops in autonomous systems.'
      ],
      relatedArticles: ['the-rise-of-agentic-ai', 'building-the-autonomous-enterprise']
    }
  },
  {
    slug: 'designing-intelligent-workflows',
    title: 'Designing Intelligent Workflows',
    description:
      'Practical strategies for identifying automation opportunities and building intelligent workflow systems that evolve over time.',
    tag: 'Blogs' as const,
    date: 'May 2026',
    readTime: '7 min read',
    featured: false,
    detail: {
      heroSubtitle: 'Practical frameworks for mapping manual processes to automated agentic systems.',
      introduction: 'How do you identify which business processes are ready for automation? This article provides a step-by-step framework for mapping workflows and introducing autonomous agents.',
      mainContent: [
        'Every organization is composed of workflows: repeating sequences of tasks that move data from one state to another.',
        'To automate these with AI, we must categorize tasks into deterministic (rules-based) and probabilistic (requires judgment). Rule-based tasks are best handled by traditional code, while judgment tasks are handled by AI.',
        'Intelligent workflows orchestrate both. They pass structured data between legacy APIs, vector stores, and LLM processing units, keeping a human in the loop for final approvals or exception handling.'
      ],
      highlights: [
        'Differentiating between deterministic rules and probabilistic judgment.',
        'Creating hybrid systems combining standard software and LLM agents.',
        'Best practices for designing human approval gates.'
      ],
      relatedArticles: ['building-the-autonomous-enterprise', 'understanding-modern-automation']
    }
  },
  {
    slug: 'the-rise-of-agentic-ai',
    title: 'The Rise Of Agentic AI',
    description:
      'Exploring autonomous AI agents that plan, reason, and execute complex tasks — and what this means for the future of software engineering.',
    tag: 'Case Studies' as const,
    date: 'Jun 2026',
    readTime: '12 min read',
    featured: false,
    detail: {
      heroSubtitle: 'From text predictors to active planners: how autonomous agents are changing the software landscape.',
      introduction: 'AI is transitioning from a passive answering tool to an active agent that takes action. We analyze the theoretical and practical mechanics behind agentic planning and tool usage.',
      mainContent: [
        'The early waves of generative AI focused on text prediction—generating emails, summaries, and code snippets. Agentic AI represents a paradigm shift.',
        'An agentic system can use external tools: it can search the web, execute code in a sandbox, write to a database, and send API calls. More importantly, it can plan. Given a complex goal, it breaks it down into subtasks, monitors progress, and adjusts its plan when errors occur.',
        'This active loop of planning, tool use, observation, and reflection moves AI closer to acting as a true copilot in enterprise environments.'
      ],
      highlights: [
        'Active loops of planning, tool use, observation, and reflection.',
        'Tool integrations: APIs, sandboxed code environments, and vector search.',
        'Self-reflection loops that correct errors during task execution.'
      ],
      relatedArticles: ['future-of-multi-agent-systems', 'building-the-autonomous-enterprise']
    }
  },
  {
    slug: 'ai-infrastructure-for-enterprises',
    title: 'AI Infrastructure For Enterprises',
    description:
      'A guide to building the technical foundation for AI adoption — from data engineering to model deployment and monitoring.',
    tag: 'Newsroom' as const,
    date: 'Apr 2026',
    readTime: '9 min read',
    featured: false,
    detail: {
      heroSubtitle: 'Building the data, vector, and orchestration layers required for production-grade AI.',
      introduction: 'Deploying AI models in production requires robust infrastructure. We outline our architecture for enterprise LLM hosting, vector databases, and real-time monitoring.',
      mainContent: [
        'Having a good model is only 10% of the battle. The other 90% is the infrastructure that feeds the model, secures the data, and monitors the outputs.',
        'Enterprise-grade AI requires high-speed vector search for Retrieval-Augmented Generation (RAG), secure caching to reduce API costs, and guardrail layers to filter inputs and outputs for compliance.',
        'At Thazio Labs, we build scalable architectures using Kubernetes, vector databases (like pgvector, Pinecone), and open-source orchestration libraries to guarantee uptime and privacy.'
      ],
      highlights: [
        'Focusing on pgvector configurations and semantic routing.',
        'Implementing guardrail systems to filter out prompt injection attacks.',
        'Autoscaling pipelines that optimize query latency under load spikes.'
      ],
      relatedArticles: ['building-the-autonomous-enterprise', 'designing-intelligent-workflows']
    }
  },
  {
    slug: 'understanding-modern-automation',
    title: 'Understanding Modern Automation',
    description: 'semantic parsing and LLMs are making automation resilient to layout changes and unstructured inputs.',
    tag: 'E-books' as const,
    date: 'Mar 2026',
    readTime: '7 min read',
    featured: false,
    detail: {
      heroSubtitle: 'Beyond standard scripting: how modern automation adapts to fluid data.',
      introduction: 'Traditional automation breaks when data formats change. We explore how semantic parsing and LLMs are making automation resilient to layout changes and unstructured inputs.',
      mainContent: [
        'Traditional Robotic Process Automation (RPA) relies on rigid selectors. If a button moves 10 pixels, or a PDF format changes, the script crashes.',
        'Modern automation uses cognitive vision and semantic understanding. Instead of clicking \'coordinate (x: 100, y: 150)\', the automation locates the button semantically. Instead of parsing a regex, it extracts text contextually.',
        'This makes automation robust, drastically reducing maintenance overhead and extending the lifespan of automated workflows across legacy applications.'
      ],
      highlights: [
        'Semantic parsing vs. rigid regular expressions.',
        'Visual layouts analyzed dynamically via computer vision.',
        'Dramatic reduction in automation maintenance and downtime.'
      ],
      relatedArticles: ['designing-intelligent-workflows', 'building-the-autonomous-enterprise']
    }
  },
  {
    slug: 'research-driven-innovation',
    title: 'Research-Driven Innovation',
    description: 'exploring our R&D model for bridging frontier science with production systems.',
    tag: 'Case Studies' as const,
    date: 'Feb 2026',
    readTime: '11 min read',
    featured: false,
    detail: {
      heroSubtitle: 'Connecting theoretical breakthroughs with practical engineering solutions.',
      introduction: 'At Thazio Labs, we believe that the gap between academic research and commercial products is too wide. We outline our R&D model for bridging frontier science with production systems.',
      mainContent: [
        'The velocity of AI advancement means that yesterday\'s research paper is today\'s commercial advantage. Companies that rely only on boxed SaaS tools are constantly behind.',
        'Our R&D team continuously tracks developments in model training, agent collaboration, neuromorphic hardware, and human-computer interaction.',
        'We rapidly prototype these papers into internal toolsets, which are then integrated into our enterprise client systems, giving them first-mover advantages.'
      ],
      highlights: [
        'Continuous translation of scientific preprints into functional prototypes.',
        'Specialized focus on graph neural networks and federated learning.',
        'First-mover commercial advantage for sponsored research partners.'
      ],
      relatedArticles: ['the-rise-of-agentic-ai', 'future-of-multi-agent-systems']
    }
  }
] as const;

/* ─── Locations ──────────────────────────────────────────────── */

export const LOCATIONS = {
  headquarters: {
    name: 'Global Operations Center',
    description: 'Architecting scalable systems from India',
    active: true,
  },
  remote: {
    name: 'Distributed Enterprise Teams',
    description: 'Coordinated delivery across global time zones',
    active: true,
  },
  expansion: [
    { name: 'Middle East', status: 'Strategic Expansion' },
    { name: 'Europe', status: 'Strategic Expansion' },
    { name: 'North America', status: 'Strategic Expansion' },
  ],
} as const;

/* ─── FAQ ────────────────────────────────────────────────────── */

export const FAQ_ITEMS = [
  {
    question: 'What services does Thazio provide?',
    answer:
      'We deliver end-to-end technology solutions, including enterprise software engineering, AI integration, cloud infrastructure, technology consulting, and the establishment of Global Capability Centers.',
  },
  {
    question: 'Do you build custom software?',
    answer:
      'Yes. Every architecture is proprietary and custom-engineered. We bypass templates in favor of scalable, secure systems designed specifically for your operational requirements.',
  },
  {
    question: 'Can AI solutions integrate with existing systems?',
    answer:
      'Absolutely. Our AI deployments integrate securely with legacy infrastructure via custom APIs and webhooks, ensuring interoperability without disrupting existing workflows.',
  },
  {
    question: 'Do you support educational institutions?',
    answer:
      'Yes. Education is one of our core domains. We build digital learning platforms, examination systems, academic analytics tools, and institutional management solutions for scaling education providers.',
  },
  {
    question: 'Can organizations automate workflows?',
    answer:
      'Definitely. We specialize in workflow automation, AI agents, and intelligent orchestration that eliminates manual bottlenecks and streamlines operations across your enterprise.',
  },
  {
    question: 'Do you offer cloud solutions?',
    answer:
      'Yes. We offer comprehensive cloud services including architecture design, migration, DevOps automation, container orchestration, and zero-trust security across AWS, Google Cloud, and Azure.',
  },
  {
    question: 'Which industries do you serve?',
    answer:
      'We serve retail, advertising & media, education, telecommunications, healthcare, e-commerce, finance, and utilities. Our solutions are adaptable across any enterprise with complex operational scale.',
  },
  {
    question: 'How can we get started?',
    answer:
      'Contact us through our portal or email us at info@thazio.com to schedule a consultation. We will discuss your strategic goals, evaluate technical feasibility, and propose an executive execution roadmap.',
  },
] as const;

/* ─── Footer Links ───────────────────────────────────────────── */

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/#why-us' },
    { label: 'Leadership', href: '/#why-us' },
    { label: 'Partnership', href: '/#why-us' },
    { label: 'Life At Thazio', href: '/#contact' },
    { label: 'Contact', href: '/#contact' },
  ],
  services: [
    { label: 'Digital & Software', href: '/services/digital-software/' },
    { label: 'AI, Data and Analytics', href: '/services/ai-data-analytics/' },
    { label: 'Cloud', href: '/services/cloud/' },
    { label: 'Consulting', href: '/services/consulting/' },
    { label: 'Global Capability Centers', href: '/services/global-capability-centers/' },
  ],
  resources: [
    { label: 'Newsroom', href: '#insights' },
    { label: 'Blogs', href: '#insights' },
    { label: 'Case Studies', href: '#insights' },
    { label: 'E-books', href: '#insights' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
  ],
} as const;
