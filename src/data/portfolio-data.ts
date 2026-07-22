export interface PortfolioProject {
  id: number;
  title: string;
  category: "Web Development" | "Mobile Apps" | "UI/UX Design" | "Graphic Design" | "Digital Marketing";
  image: string;
  description: string;
  technologies: string[];
  client: string;
  result: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Urban Cart – E-Commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description: "A full-stack e-commerce platform with real-time inventory, secure checkout, and an admin dashboard.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    client: "Urban Cart Retail",
    result: "42% increase in online sales within 3 months of launch.",
  },
  {
    id: 2,
    title: "MediConnect – Healthcare Portal",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    description: "A patient management web portal with appointment booking and secure records access.",
    technologies: ["React", "Express", "PostgreSQL"],
    client: "MediConnect Clinics",
    result: "Reduced appointment scheduling time by 60%.",
  },
  {
    id: 3,
    title: "PayWave – FinTech Mobile App",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    description: "A secure banking application with biometric login, instant transfers, and spend analytics.",
    technologies: ["React Native", "Firebase", "Plaid API"],
    client: "PayWave Financial",
    result: "100K+ downloads in the first quarter after launch.",
  },
  {
    id: 4,
    title: "FitTrack – Fitness Tracking App",
    category: "Mobile Apps",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    description: "Cross-platform fitness app with workout plans, progress tracking, and social challenges.",
    technologies: ["Flutter", "Firebase", "HealthKit"],
    client: "FitTrack Inc.",
    result: "4.8★ App Store rating with 50K+ active users.",
  },
  {
    id: 5,
    title: "Nova Analytics – SaaS Dashboard",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    description: "An intuitive analytics dashboard design with real-time data visualization for enterprise clients.",
    technologies: ["Figma", "Design System", "Prototyping"],
    client: "Nova Analytics",
    result: "35% reduction in user onboarding time.",
  },
  {
    id: 6,
    title: "Bloom – Wellness App UX",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop",
    description: "Complete UX overhaul for a meditation and wellness app, focused on calm, accessible design.",
    technologies: ["Figma", "User Research", "Usability Testing"],
    client: "Bloom Wellness",
    result: "User retention improved by 28% post-redesign.",
  },
  {
    id: 7,
    title: "Solstice Coffee – Brand Identity",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop",
    description: "Complete brand identity design for a specialty coffee roaster, including logo and packaging.",
    technologies: ["Illustrator", "Photoshop", "Brand Guidelines"],
    client: "Solstice Coffee Co.",
    result: "Rebrand led to a 20% boost in retail shelf visibility.",
  },
  {
    id: 8,
    title: "Verve Fashion – Marketing Collateral",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop",
    description: "Seasonal marketing campaign visuals, lookbooks, and social media graphic templates.",
    technologies: ["Photoshop", "InDesign", "Canva Pro"],
    client: "Verve Fashion House",
    result: "Campaign visuals drove a 3x increase in social engagement.",
  },
  {
    id: 9,
    title: "GreenLeaf Organics – SEO & Growth",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description: "Full SEO overhaul and content marketing strategy for an organic food e-commerce brand.",
    technologies: ["SEO", "Content Strategy", "Google Analytics"],
    client: "GreenLeaf Organics",
    result: "Organic traffic grew 3.2x in 6 months.",
  },
  {
    id: 10,
    title: "SkyStay – Paid Ads Campaign",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    description: "Multi-platform paid advertising campaign for a vacation rental startup.",
    technologies: ["Google Ads", "Meta Ads", "Conversion Tracking"],
    client: "SkyStay Rentals",
    result: "Achieved 4.5x return on ad spend (ROAS).",
  },
];

export const portfolioCategories = [
  "All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
] as const;

export const portfolioStats = [
  { value: "150+", label: "Projects Completed" },
  { value: "80+", label: "Happy Clients" },
  { value: "15+", label: "Industries Served" },
  { value: "98%", label: "Client Satisfaction" },
];