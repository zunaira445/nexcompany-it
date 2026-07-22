export interface TeamMemberData {
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  experience: string;
  socials: { linkedin?: string; twitter?: string; github?: string };
}

export const teamMembers: TeamMemberData[] = [
  {
    name: "Ahmed Raza",
    role: "Founder & CEO",
    bio: "Leads the company vision and client strategy with 10+ years in the software industry.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    skills: ["Business Strategy", "Product Management", "Client Relations"],
    experience: "10+ Years",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sara Khan",
    role: "Lead Full-Stack Developer",
    bio: "Architects and builds scalable web applications using modern JavaScript frameworks.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    skills: ["React", "Next.js", "Node.js", "MongoDB"],
    experience: "7 Years",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Bilal Ahmed",
    role: "Mobile App Developer",
    bio: "Specializes in building smooth, performant cross-platform mobile experiences.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    skills: ["React Native", "Flutter", "Firebase"],
    experience: "5 Years",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Ayesha Malik",
    role: "Lead UI/UX Designer",
    bio: "Designs user-centered interfaces backed by research and usability testing.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    skills: ["Figma", "User Research", "Design Systems"],
    experience: "6 Years",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Hamza Sheikh",
    role: "Backend Engineer",
    bio: "Builds secure, high-performance APIs and database architecture for enterprise apps.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
    experience: "6 Years",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Fatima Noor",
    role: "Digital Marketing Strategist",
    bio: "Drives growth through data-backed SEO, content, and paid advertising strategies.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    skills: ["SEO", "Google Ads", "Content Strategy"],
    experience: "5 Years",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Usman Tariq",
    role: "Graphic Designer",
    bio: "Creates compelling brand identities and visual assets that make businesses stand out.",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop",
    skills: ["Illustrator", "Photoshop", "Brand Identity"],
    experience: "4 Years",
    socials: { linkedin: "#" },
  },
  {
    name: "Zainab Iqbal",
    role: "QA Engineer",
    bio: "Ensures every release is thoroughly tested, stable, and bug-free before launch.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    skills: ["Manual Testing", "Automation", "Cypress"],
    experience: "4 Years",
    socials: { linkedin: "#" },
  },
];