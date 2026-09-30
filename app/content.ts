/**
 * All site copy lives in this object. Edit it here and the page updates.
 */
export const portfolio = {
  name: "Samadhan Shelke",
  title: "Full Stack Developer | React, Next.js, NestJS & React Native",
  tagline: "I build web and mobile products end to end, from Figma to database.",
  location: "Pune, India",
  resume: "/Samadhan_Shelke_Resume_Improved.pdf",
  email: "samadhanshelke2145@gmail.com",
  phone: "+91 7507534973",
  phoneHref: "tel:+917507534973",
  footer: "© 2026 Samadhan Shelke",
  github: "https://github.com/Samadhanshelke",
  linkedin: "https://www.linkedin.com/in/samadhan-shelke-2864441b1",
  about:
    "Full Stack Developer with 2 years of experience shipping web and mobile products end to end, from Figma handoff and React/React Native interfaces to NestJS APIs and PostgreSQL schemas. Strong in TypeScript across the stack, with a focus on reusable component systems, secure APIs, and fast, maintainable code.",
  languages: ["English", "Hindi", "Marathi"],
  education: {
    degree: "Bachelor of Computer Science",
    school: "Rajmata Jijau Science College, Jalna",
    date: "May 2026",
  },
  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
  skills: [
    {
      group: "Frontend",
      items: ["React.js", "Next.js", "TypeScript", "React Native", "Tailwind CSS"],
    },
    {
      group: "Backend",
      items: ["Node.js", "NestJS", "Express.js", "FastAPI (Python)", "REST APIs", "JWT auth"],
    },
    {
      group: "Databases",
      items: ["PostgreSQL", "MongoDB", "Supabase", "MySQL", "Firebase"],
    },
    {
      group: "Tools",
      items: ["Prisma", "Git", "GitHub", "Figma handoff", "code review"],
    },
  ],
  experience: [
    {
      role: "Full Stack Developer",
      company: "Cereble Robotics Private Limited",
      dates: "Aug 2024 – Aug 2026",
      points: [
        "Built a shared component library for React and React Native for a consistent design system across web and mobile.",
        "Converted Figma designs into pixel-accurate, responsive, accessible interfaces.",
        "Developed NestJS/Node.js REST APIs with JWT authentication, role-based authorization, and validation.",
        "Designed PostgreSQL schemas with Prisma and optimized slow queries.",
        "Delivered features end to end across frontend and backend teams.",
      ],
    },
    {
      role: "MERN Stack Developer",
      company: "Swasti DataMatrix Private Limited",
      dates: "Feb 2024 – Apr 2024",
      points: [
        "Built a market research platform with Next.js, Node.js, Express.js, MongoDB.",
        "Implemented SSR and SEO optimizations, JWT auth with role-based access, and a custom CMS module.",
      ],
    },
  ],
  projects: [
    {
      title: "Artberry Platform",
      role: "Full Stack",
      description:
        "Web app, mobile app, and backend API that share components and types across the product.",
      stack: ["React.js", "Next.js", "React Native", "NestJS", "PostgreSQL", "Prisma", "TypeScript"],

      live: "https://artberry.in",
    },
    {
      title: "BookHomestay",
      role: "Full Stack",
      description: "Homestay booking app with listings, search, and reservations.",
      stack: ["Next.js", "React.js", "Supabase", "TypeScript"],
      live: "https://bookhomestay.co",
    },
    {
      title: "Lucres.com",
      role: "Frontend",
      description: "Responsive production pages and a set of reusable UI components.",
      stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
      live: "https://lucres.com",
    },
    {
      title: "AI Watermark Remover",
      role: "Personal",
      description:
        "Removes watermarks from images using the LaMa inpainting model through a FastAPI backend.",
      stack: ["FastAPI", "Python", "LaMa", "Next.js", "React.js"],
      github: "https://github.com/Samadhanshelke/watermark-remover",
    },
  ],
};
