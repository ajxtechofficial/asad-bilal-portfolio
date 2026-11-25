export interface NavItem {
  label: string;
  href: "/" | "/about" | "/projects" | "/contact";
}

export interface SocialLink {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
  external: boolean;
  displayValue: string;
}

export const siteConfig = {
  name: "Asad Bilal",
  wordmark: "ASAD BILAL",
  title: "Backend Developer | AI/ML Enthusiast",
  location: "Islamabad, Pakistan",
  availability: {
    active: true,
    label: "OPEN TO OPPORTUNITIES",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ] satisfies readonly NavItem[],
  socialLinks: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/ajxtechofficial",
      external: true,
      displayValue: "github.com/ajxtechofficial",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/asadbilal-ai/",
      external: true,
      displayValue: "linkedin.com/in/asadbilal-ai",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:asadbilal7047@gmail.com",
      external: false,
      displayValue: "asadbilal7047@gmail.com",
    },
  ] satisfies readonly SocialLink[],
  email: "asadbilal7047@gmail.com",
  copyrightStatement: "Designed & Developed by Asad Bilal.",
} as const;
