export interface ProjectShowcaseItem {
  index: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  summary: string;
  architectureNote: string;
  tags: readonly string[];
  highlighted?: boolean;
}

export interface SkillGroup {
  index: string;
  label: string;
  items: readonly string[];
}

export const homeData = {
  hero: {
    eyebrow: "Backend Developer · AI/ML Enthusiast · Islamabad, Pakistan",
    headlineLead: "Asad Bilal —",
    headlineItalic: "Engineering Resilient",
    headlineEnd: "Backends & Applied AI.",
    intro:
      "Computer Science undergraduate at NUML Islamabad (2023–2027) building structured backend architectures, relational data systems, and applied natural language processing pipelines.",
    scrollPrompt: "Scroll to inspect selected work",
    portraitAlt:
      "Studio portrait of Asad Bilal, Backend Developer and AI/ML Enthusiast",
    portraitLabel: "ASAD BILAL // 33.68°N 73.05°E",
    portraitSpecs: ["PYTHON", "FASTAPI", "POSTGRESQL", "BIOBERT"],
    specs: [
      {
        label: "Primary Focus",
        value: "Backend Systems & Applied NLP",
      },
      {
        label: "Education",
        value: "BS Computer Science, NUML (2023–2027)",
      },
      {
        label: "Academic Standing",
        value: "CGPA 3.41 / 4.00",
      },
    ],
  },
  selectedWork: {
    index: "01 // SELECTED WORK",
    heading: "Selected Work",
    subheading:
      "Navigate through core engineering and web systems across clinical NLP, trade analytics, and commerce.",
    projects: [
      {
        index: "01",
        slug: "automated-medical-coding-system",
        title: "Automated Medical Coding System",
        subtitle: "Clinical NLP & Backend Pipeline",
        category: "AI / ML & Backend",
        status: "In Development",
        summary:
          "Automated pipeline processing clinical text and mapping medical documentation toward standardized ICD-10 and CPT coding workflows.",
        architectureNote:
          "FastAPI service layer paired with BioBERT transformer inference for structured clinical entity extraction and code candidate ranking.",
        tags: ["BioBERT", "NLP", "FastAPI", "ICD-10 / CPT"],
        highlighted: true,
      },
      {
        index: "02",
        slug: "quotex-trading-journal",
        title: "Quotex Trading Journal",
        subtitle: "Structured Trade Logging & Review",
        category: "Web Application",
        status: "Project",
        summary:
          "Dedicated trading journal interface built to log positions systematically, review execution decisions, and maintain disciplined trade records.",
        architectureNote:
          "Organized entry workflows and structured history views focused on clarity, consistency, and fast session review.",
        tags: ["Trade Logging", "Analytics Workflow"],
      },
      {
        index: "03",
        slug: "nexivo-electronics",
        title: "Nexivo Electronics",
        subtitle: "Electronics Catalog & Storefront",
        category: "Web Platform",
        status: "Project",
        summary:
          "Product-centered electronics storefront designed for clean hardware discovery, organized category browsing, and responsive presentation.",
        architectureNote:
          "Clean catalog hierarchy and responsive component layout emphasizing product specifications and effortless navigation.",
        tags: ["Storefront", "Product Catalog"],
      },
    ] satisfies readonly ProjectShowcaseItem[],
  },
  foundation: {
    index: "02 // FOUNDATION & STACK",
    title: "Grounded in Systems & Applied Machine Learning.",
    summary:
      "From relational database modeling and REST APIs in Python and FastAPI to transformer-based NLP experiments with PyTorch and BioBERT.",
    education: {
      eyebrow: "Academic Record",
      degree: "Bachelor of Science in Computer Science",
      institution: "National University of Modern Languages (NUML), Islamabad",
      period: "2023 – 2027",
      cgpa: "3.41 / 4.00",
      location: "Islamabad, Pakistan",
    },
    skillGroups: [
      {
        index: "01",
        label: "Backend & Databases",
        items: ["Python", "Java", "FastAPI", "PostgreSQL", "SQL"],
      },
      {
        index: "02",
        label: "AI / ML & NLP",
        items: ["PyTorch", "Transformers", "BioBERT"],
      },
      {
        index: "03",
        label: "Frontend & Tooling",
        items: ["TypeScript", "React", "Next.js", "Git", "GitHub"],
      },
    ] satisfies readonly SkillGroup[],
  },
} as const;
