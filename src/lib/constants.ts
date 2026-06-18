/* ═══════════════════════════════════════════════════════════════
   THAZIO LABS — Site Constants & Content Data
   AI-First Engineering & Autonomous Systems
   ═══════════════════════════════════════════════════════════════ */

export const SITE_NAME = 'THAZIO';
export const SITE_TAGLINE = 'AI-First Engineering & Autonomous Systems';
export const SITE_DESCRIPTION =
  'Thazio Labs is an AI-first engineering company building intelligent software, autonomous systems, and data-driven solutions for businesses, institutions, and governments worldwide.';

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
    title: 'Digital & Software',
    description:
      'We design, build, and modernize custom applications and digital platforms. This includes enterprise product deployments, full-lifecycle software development, and quality engineering to ensure your product is scalable and secure leading to competitive advantage.',
    image: '/images/services/digital_software.png',
    detail: {
      heroSubtitle:
        'Building scalable, production-ready software platforms and digital applications that power modern organizations.',
      capabilities: [
        { title: 'Enterprise Product Deployments', description: 'Deploying full-stack digital products built for scale, performance, and long-term utility.' },
        { title: 'Software Development', description: 'Full-lifecycle software development using modern front-end and back-end frameworks.' },
        { title: 'Quality Engineering', description: 'Rigorous automated testing, security checks, and continuous optimization loops.' },
        { title: 'Web Applications', description: 'Dynamic web platforms built with Next.js, React, Node.js, and TypeScript.' },
        { title: 'Mobile Solutions', description: 'Cross-platform native applications optimized for high-performance iOS and Android deployments.' },
        { title: 'API Integrations', description: 'Secure, reliable RESTful and GraphQL APIs built for maximum interoperability.' },
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'REST APIs'],
      process: [
        { step: 'Discovery', description: 'Mapping technical specifications, user personas, and commercial objectives.' },
        { step: 'Architecture', description: 'Designing modular, highly available database schemas and system topographies.' },
        { step: 'Development', description: 'Iterative development sprints with automated CI/CD code verification pipelines.' },
        { step: 'Deployment', description: 'Deploying production builds with automated logging, monitoring, and staging.' },
      ],
      faq: [
        { question: 'What is your software development methodology?', answer: 'We follow an agile development lifecycle with continuous deployment loops, keeping stakeholders involved in weekly sprint reviews.' },
        { question: 'Do you help migrate legacy software platforms?', answer: 'Yes, we specialize in refactoring and containerizing legacy applications, converting them into modern microservice architectures.' },
      ],
    },
  },
  {
    slug: 'ai-data-analytics',
    icon: 'brain',
    title: 'AI, Data and Analytics',
    description:
      'Deploying generative AI solutions, customized machine learning pipelines, and predictive dashboards. Turn unstructured data into operational intelligence.',
    image: '/images/services/ai_data.png',
    detail: {
      heroSubtitle:
        'Intelligent systems that learn, reason, and parse unstructured data — transforming business telemetry into actionable foresight.',
      capabilities: [
        { title: 'Generative AI Integrations', description: 'Custom Large Language Model (LLM) workflows, semantic search engines, and RAG architectures.' },
        { title: 'Machine Learning Pipelines', description: 'Designing, training, fine-tuning, and evaluating specialized models for specific commercial datasets.' },
        { title: 'Predictive Analytics', description: 'Leveraging historical indicators to forecast market demand, customer churn, and anomalies.' },
        { title: 'Data Lakehouse Setup', description: 'Consolidating operational silos into unified, high-speed analytical storage.' },
        { title: 'Business Intelligence Dashboards', description: 'Designing clean, interactive data telemetry in Metabase, PowerBI, and custom interfaces.' },
      ],
      technologies: ['Python', 'PyTorch', 'LangChain', 'OpenAI', 'Hugging Face', 'Snowflake', 'BigQuery', 'dbt', 'Vector Databases'],
      process: [
        { step: 'Data Audit', description: 'Evaluating existing data sources, schemas, latencies, and data quality.' },
        { step: 'Model Pipeline Design', description: 'Structuring RAG database routing, prompt templates, and evaluation guardrails.' },
        { step: 'Model Fine-Tuning', description: 'Training models on specific domains to ensure contextual accuracy and limit hallucinations.' },
        { step: 'Dashboard Integration', description: 'Exposing parsed data models via clean analytical dashboards for department heads.' },
      ],
      faq: [
        { question: 'How do you guarantee model accuracy and prevent hallucinations?', answer: 'We build strict Retrieval-Augmented Generation (RAG) vector lookup pipelines that route requests only to verified documents.' },
        { question: 'Can we build custom AI models with limited datasets?', answer: 'Yes, we employ transfer learning and few-shot classification techniques to fine-tune foundation models with small amounts of clean data.' },
      ],
    },
  },
  {
    slug: 'cloud',
    icon: 'cloud',
    title: 'Cloud',
    description:
      'Transitioning infrastructures to secure, elastic cloud environments with automated DevOps, zero-trust configurations, and 24/7 telemetry monitoring.',
    image: '/images/services/cloud.png',
    detail: {
      heroSubtitle:
        'Reliable cloud architecture, automated CI/CD deployments, and zero-trust configuration setups.',
      capabilities: [
        { title: 'Cloud Infrastructure Migration', description: 'Seamless migration of legacy system workloads to AWS, Google Cloud, or Microsoft Azure.' },
        { title: 'Infrastructure as Code (IaC)', description: 'Representing, scaling, and managing environments cleanly using Terraform scripts.' },
        { title: 'CI/CD Pipeline Automation', description: 'Building automated testing, building, and deployment cycles with GitHub Actions.' },
        { title: 'Container Orchestration', description: 'Deploying highly portable applications using Docker containers and Kubernetes clusters.' },
        { title: 'Telemetry Observability', description: 'Setting up centralized logging, alerting, and metrics with Prometheus and Grafana.' },
      ],
      technologies: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana'],
      process: [
        { step: 'Assessment', description: 'Evaluating current compute workloads, memory allocations, and monthly costs.' },
        { step: 'Architecture Blueprint', description: 'Designing secure VPC networks, autoscaling groups, and failovers.' },
        { step: 'Automation Setup', description: 'Coding IaC scripts and continuous integration deployment templates.' },
        { step: 'Migration & Monitoring', description: 'Deploying workloads with zero downtime and configuration telemetry alerts.' },
      ],
      faq: [
        { question: 'Which cloud providers do you support?', answer: 'We manage and optimize cloud architectures across AWS, Google Cloud Platform (GCP), and Microsoft Azure.' },
        { question: 'How do you handle container scaling?', answer: 'We set up auto-scaling Kubernetes nodes that scale compute power dynamically based on requests or traffic peaks.' },
      ],
    },
  },
  {
    slug: 'consulting',
    icon: 'chart',
    title: 'Consulting',
    description:
      'Providing strategic technology consulting, transformation mapping, architecture design, and workflow assessments to future-proof operations.',
    image: '/images/services/consulting.png',
    detail: {
      heroSubtitle:
        'Future-proofing your technology strategy and digital frameworks through comprehensive consulting assessments.',
      capabilities: [
        { title: 'Digital Transformation Mapping', description: 'Formulating step-by-step roadmaps to guide organizations from manual workflows to digitized scale.' },
        { title: 'Technology Audits', description: 'Evaluating database configurations, security policies, frameworks, and logic models.' },
        { title: 'Architecture Design', description: 'Designing modular, highly interoperable system architectures designed to handle growing scale.' },
        { title: 'Process Optimization', description: 'Analyzing operational bottlenecks to identify manual steps ready for automation.' },
      ],
      technologies: ['System Architecture Design', 'Workflow Mapping Tools', 'Agile Frameworks', 'ROI Modeling', 'Security Assessments'],
      process: [
        { step: 'Information Gathering', description: 'Conducting stakeholder interviews and reviewing technical documentation.' },
        { step: 'System Audit', description: 'Analyzing performance metrics, code structures, dependencies, and database speeds.' },
        { step: 'Strategy Mapping', description: 'Drafting concrete recommendations, cost estimates, and execution roadmaps.' },
        { step: 'Handover & Support', description: 'Reviewing blueprints with engineering leads and providing kickoff consulting.' },
      ],
      faq: [
        { question: 'What deliverables are included in a technology consulting engagement?', answer: 'We provide detailed architecture diagrams, software stack recommendations, cost models, and execution blueprints.' },
        { question: 'Do you help execute the blueprints you design?', answer: 'Yes, our software engineering and AI specialist teams can execute the recommended transformation plans as part of a long-term partnership.' },
      ],
    },
  },
  {
    slug: 'global-capability-centers',
    icon: 'automation',
    title: 'Global Capability Centers',
    description:
      'Setting up dedicated global delivery and competency centers to optimize distributed workflows, operational scale, and specialized talent pools.',
    image: '/images/services/gcc.png',
    detail: {
      heroSubtitle:
        'Establishing highly specialized global delivery and delivery centers that expand your technical scale.',
      capabilities: [
        { title: 'Distributed Workflow Setup', description: 'Structuring communication, coordination, and code protocols across remote time zones.' },
        { title: 'Dedicated Competency Centers', description: 'Assembling specialized engineer teams focused on core operational modules (AI, Cloud, Security).' },
        { title: 'Operational Standardisation', description: 'Enforcing consistent coding, security, and integration practices globally.' },
        { title: 'Strategic Scale', description: 'Expanding system bandwidth, support coverage, and engineering speed.' },
      ],
      technologies: ['Global Collaboration tools', 'Centralized IAM Policy', 'Global delivery models', 'Unified Git Orchestrations'],
      process: [
        { step: 'Resource Scoping', description: 'Mapping required skillsets, engineering numbers, and operational modules.' },
        { step: 'Workflow Design', description: 'Establishing security scopes, communication loops, and handoff protocols.' },
        { step: 'Team Assembly', description: 'Onboarding and training specialized engineers on your platform codebase.' },
        { step: 'Operations Scaling', description: 'Managing daily engineering output, sprint reviews, and deployment cycles.' },
      ],
      faq: [
        { question: 'What is a Global Capability Center (GCC)?', answer: 'A GCC is a dedicated team of specialized engineers operating from a cost-efficient talent pool, functioning as a direct extension of your core technology team.' },
        { question: 'How do you ensure IP protection and security in a GCC?', answer: 'We set up secure remote desktops, enforce strict multi-factor authentication, and operate within secure private cloud nodes.' },
      ],
    },
  },
] as const;

/* ─── Why Choose Us ──────────────────────────────────────────── */

export const WHY_CHOOSE_US = [
  {
    icon: 'excellence',
    title: 'Proven Legacy of Engineering Excellence and Customer Commitment',
    description: 'For years, Thazio Labs has been a dedicated partner guiding complex digital transformation. Our stability and insights are backed by an unwavering commitment to our clients\' success. This ensures that every solution we deliver is innovative, reliable, and perfectly tailored to drive your long-term growth.',
  },
  {
    icon: 'execution',
    title: 'Expertise, Execution, and Excellence',
    description: 'We blend deep technical expertise in AI, cloud architectures, and digital systems with meticulous planning and seamless execution in every project. This focus is sustained by a culture of continuous improvement, maintaining high standards for unmatched quality and top-tier data security.',
  },
  {
    icon: 'teams',
    title: 'High-Performance Autonomous Teams',
    description: 'Our success is built on the strength and dedication of our people. We live by our core value of Teamwork, ensuring tight collaboration both internally and externally with your organization. With mutual dedication and high standards, we guarantee the technical depth and cohesive delivery needed for your most critical projects.',
  },
] as const;

/* ─── Industries ─────────────────────────────────────────────── */

export const INDUSTRIES = [
  {
    slug: 'retail',
    title: 'Retail',
    description: 'Customer engagement platforms, intelligent inventory systems, and shopping analytics.',
    gradient: 'linear-gradient(135deg, #0066FF20, #7B2FBE30, #00D4FF20)',
    detail: {
      overview: 'Empowering retail brands with unified data dashboards and automated inventory forecasting engines.',
      challenges: ['Inventory data synchronization gaps', 'Manual customer segmentation', 'High supply chain friction'],
      solutions: ['AI-powered stock predictions', 'Real-time inventory mapping', 'Personalized shopping analytics'],
      benefits: ['Reduced stockouts by up to 45%', 'Higher retail operational bandwidth'],
      faq: [
        { question: 'Do you support multi-store inventory synchronization?', answer: 'Yes, we integrate with major POS systems and update inventories in real-time across physical and digital storefronts.' }
      ]
    },
  },
  {
    slug: 'advertising-media',
    title: 'Advertising & Media',
    description: 'Automated ad placement engines, audience analytic dashboards, and content platforms.',
    gradient: 'linear-gradient(135deg, #7B2FBE20, #00D4FF30, #0066FF20)',
    detail: {
      overview: 'Transforming content delivery pipelines and optimizing audience targeting telemetry systems.',
      challenges: ['Audience fragmentation', 'Complex manual ad schedules', 'Data transparency bottlenecks'],
      solutions: ['Automated ad rendering logic', 'Audience engagement databases', 'Real-time streaming portals'],
      benefits: ['Increased ad conversions by over 30%', 'Frictionless content publishing loops'],
      faq: [
        { question: 'Can the content platforms handle high-bandwidth video streams?', answer: 'Yes, we utilize globally distributed CDN edge routing to ensure low-latency media delivery.' }
      ]
    },
  },
  {
    slug: 'education',
    title: 'Education',
    description: 'Digital classrooms, academic management platforms, and assessment automations.',
    gradient: 'linear-gradient(135deg, #00D4FF20, #0066FF30, #7B2FBE20)',
    detail: {
      overview: 'Equipping academic institutions with clean digital portals to simplify scheduling, evaluation, and operations.',
      challenges: ['Manual exam seating logistics', 'Fragmented student file registries', 'High administrative overhead'],
      solutions: ['Automated invigilation schedulers', 'Student records databases', 'Interactive learning portals'],
      benefits: ['Administrative labor reduced by over 60%', 'Accurate digital examination scheduling'],
      faq: [
        { question: 'How does the AI grading system ensure accuracy?', answer: 'We implement model validation loops alongside human verification gates to ensure grading matches institutional standards.' }
      ]
    },
  },
  {
    slug: 'telecommunication',
    title: 'Telecommunication',
    description: 'Network telemetry monitoring, customer portals, and signal optimization models.',
    gradient: 'linear-gradient(135deg, #0066FF25, #00D4FF30, #7B2FBE15)',
    detail: {
      overview: 'Building secure, high-availability customer dashboards and network performance logging systems.',
      challenges: ['Real-time signal fluctuations', 'Legacy billing integration gaps', 'High customer churn indicators'],
      solutions: ['Network status monitoring dashboards', 'Automated customer billing pipelines', 'Churn predictor data models'],
      benefits: ['Uptime monitoring accuracy increased to 99.9%', 'Reduced client friction points'],
      faq: [
        { question: 'Can you integrate with legacy billing systems?', answer: 'Yes, we specialize in building custom API connectors that synchronize billing databases securely.' }
      ]
    },
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    description: 'Patient records platforms, diagnostic support models, and inventory logs.',
    gradient: 'linear-gradient(135deg, #7B2FBE25, #0066FF30, #00D4FF15)',
    detail: {
      overview: 'Modernizing hospital database operations with HIPAA-compliant logging architectures and user panels.',
      challenges: ['HIPAA compliance recording gaps', 'Fragmented EHR data transfer', 'Critical equipment downtime'],
      solutions: ['Secure Patient Portal systems', 'Unified patient data pipelines', 'Medical equipment monitoring models'],
      benefits: ['Fast patient records indexing', 'HIPAA-grade data safety standards'],
      faq: [
        { question: 'How do you guarantee patient data security?', answer: 'All data is encrypted in transit and at rest, utilizing strict role-based access control policies.' }
      ]
    },
  },
  {
    slug: 'e-commerce',
    title: 'E-commerce',
    description: 'Bespoke web storefronts, recommendation engines, and logistics tracking solutions.',
    gradient: 'linear-gradient(135deg, #00D4FF25, #7B2FBE30, #0066FF15)',
    detail: {
      overview: 'Building robust, fast storefront applications with personalized recommendation engines to maximize conversions.',
      challenges: ['Slow storefront loading latencies', 'Cart abandonment peaks', 'Inventory mismatching across channels'],
      solutions: ['Next.js server-side rendered storefronts', 'Product recommender models', 'Integrated supply chain updates'],
      benefits: ['Storefront speeds improved by 400%', 'Instant cart recovery workflows'],
      faq: [
        { question: 'Do you support multi-channel integrations?', answer: 'Yes, we sync inventory databases across Shopify, Amazon, and custom back-ends.' }
      ]
    },
  },
  {
    slug: 'finance',
    title: 'Finance',
    description: 'Secure transaction platforms, risk analytics dashboards, and compliance logs.',
    gradient: 'linear-gradient(135deg, #0066FF20, #00D4FF25, #7B2FBE30)',
    detail: {
      overview: 'Constructing robust fintech databases, real-time fraud dashboards, and audit-ready reporting frameworks.',
      challenges: ['Fraud risk events', 'Regulatory compliance recording', 'Manual ledger audits'],
      solutions: ['Real-time fraud alerts', 'Automated regulatory reporting', 'Secure database audits'],
      benefits: ['Compliance audit timelines cut in half', 'Real-time alert indicators'],
      faq: [
        { question: 'How do you ensure audit transparency?', answer: 'We build read-only immutable system logs that capture every transaction state change.' }
      ]
    },
  },
  {
    slug: 'utilities',
    title: 'Utilities',
    description: 'Grid performance models, customer billing portals, and maintenance tracking.',
    gradient: 'linear-gradient(135deg, #7B2FBE20, #0066FF25, #00D4FF30)',
    detail: {
      overview: 'Optimizing resource allocation and managing grids through real-time telemetry pipelines.',
      challenges: ['Grid overload peaks', 'Manual scheduling of maintenance crews', 'Slow customer billing reconciliations'],
      solutions: ['Load-prediction algorithms', 'Field technician dispatch systems', 'Automated meter reading databases'],
      benefits: ['Reduced technician dispatch delays by 35%', 'Improved load forecast accuracies'],
      faq: [
        { question: 'Do you support real-time smart meter syncing?', answer: 'Yes, we write high-throughput ingestion pipelines using Apache Kafka to sync smart meters.' }
      ]
    },
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
  { number: '10+', label: 'Projects' },
  { number: '1+', label: 'Years Building' },
  { number: '5+', label: 'Technology Domains' },
  { number: '100%', label: 'Custom Solutions' },
  { number: '24/7', label: 'Continuous Innovation' },
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
    name: 'India',
    description: 'Remote Global Delivery',
    active: true,
  },
  remote: {
    name: 'Global Collaboration',
    description: 'Distributed team working across time zones',
    active: true,
  },
  expansion: [
    { name: 'Middle East', status: 'Future Presence' },
    { name: 'Europe', status: 'Future Presence' },
    { name: 'North America', status: 'Future Presence' },
  ],
} as const;

/* ─── FAQ ────────────────────────────────────────────────────── */

export const FAQ_ITEMS = [
  {
    question: 'What services does Thazio provide?',
    answer:
      'Thazio provides end-to-end technology services including digital & software development, AI, data & analytics, cloud infrastructure, technology consulting, and global capability centers.',
  },
  {
    question: 'Do you build custom software?',
    answer:
      'Yes. Every solution we build is custom-designed for your specific requirements. We don\'t use templates or one-size-fits-all approaches — each project is architected from the ground up to match your unique needs and goals.',
  },
  {
    question: 'Can AI solutions integrate with existing systems?',
    answer:
      'Absolutely. Our AI solutions are designed to integrate seamlessly with your existing infrastructure through APIs, webhooks, and custom connectors. We ensure compatibility with your current technology stack.',
  },
  {
    question: 'Do you support educational institutions?',
    answer:
      'Yes. Education is one of our core domains. We build digital learning platforms, examination systems, academic analytics tools, and institutional management solutions for schools, colleges, and universities.',
  },
  {
    question: 'Can organizations automate workflows?',
    answer:
      'Definitely. We specialize in workflow automation, AI agents, robotic process automation, and intelligent orchestration that eliminates manual bottlenecks and streamlines operations across your organization.',
  },
  {
    question: 'Do you offer cloud solutions?',
    answer:
      'Yes. We offer comprehensive cloud services including architecture design, migration, DevOps automation, container orchestration, monitoring, security, and managed infrastructure across AWS, Google Cloud, and Azure.',
  },
  {
    question: 'Which industries do you serve?',
    answer:
      'We serve retail, advertising & media, education, telecommunications, healthcare, e-commerce, finance, and utilities. Our solutions are adaptable across any industry with complex operational needs.',
  },
  {
    question: 'How can we get started?',
    answer:
      'Getting started is simple. Contact us through our form or email us at info@thazio.com to schedule a consultation. We will discuss your goals, evaluate technical feasibility, and propose a tailored execution roadmap.',
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
