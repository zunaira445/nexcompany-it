import {
  Globe,
  Smartphone,
  Palette,
  PenTool,
  TrendingUp,
} from "lucide-react";

export interface ServiceData {
  slug: string;
  icon: any;
  title: string;
  shortTitle: string;
  tagline: string;
  heroDescription: string;
  description: string[];
  features: { title: string; description: string }[];
  technologies: string[];
  process: { step: string; title: string; description: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  color: string;
  iconColor: string;
}

export const servicesData: ServiceData[] = [
  {
    slug: "web-development",
    icon: Globe,
    title: "Web Development",
    shortTitle: "Website Development",
    tagline: "Custom Websites That Convert",
    heroDescription:
      "We design and build fast, secure, and scalable websites — from marketing landing pages to complex web applications — engineered to grow your business.",
    description: [
      "Our web development team specializes in building custom, high-performance websites and web applications using modern frameworks like React and Next.js. Whether you need a simple business website or a complex enterprise platform, we deliver solutions that are fast, secure, and built to scale.",
      "Every website we build is fully responsive, SEO-optimized, and designed with conversion in mind. We work closely with you throughout the process to ensure the final product matches your vision and business goals.",
    ],
    features: [
      { title: "Responsive Design", description: "Websites that look and work perfectly on every device and screen size." },
      { title: "SEO Optimization", description: "Built-in best practices to help your site rank higher on search engines." },
      { title: "CMS Integration", description: "Easy-to-manage content through headless CMS or custom admin panels." },
      { title: "E-Commerce Ready", description: "Secure payment integration and inventory management for online stores." },
      { title: "Fast Load Speeds", description: "Optimized performance with sub-2-second load times." },
      { title: "Scalable Architecture", description: "Built to handle growth from day one to millions of users." },
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB", "PostgreSQL", "REST/GraphQL APIs"],
    process: [
      { step: "01", title: "Discovery", description: "We analyze your requirements, audience, and competitors." },
      { step: "02", title: "Design", description: "Wireframes and UI mockups tailored to your brand." },
      { step: "03", title: "Development", description: "Clean, scalable code built with modern frameworks." },
      { step: "04", title: "Testing", description: "Cross-browser and device testing for flawless performance." },
      { step: "05", title: "Launch", description: "Smooth deployment with zero downtime." },
      { step: "06", title: "Support", description: "Ongoing maintenance and feature updates." },
    ],
    benefits: [
      "Increased online visibility and credibility",
      "Higher conversion rates through optimized UX",
      "Faster load times improving user retention",
      "Easy content management for your team",
      "Scalable foundation for future growth",
      "Ongoing technical support included",
    ],
    faqs: [
      { question: "How long does it take to build a website?", answer: "Most business websites take 3-6 weeks depending on complexity. Larger web applications can take 8-16 weeks." },
      { question: "Will my website be mobile-friendly?", answer: "Yes, every website we build is fully responsive and tested across all major devices and browsers." },
      { question: "Do you provide website maintenance after launch?", answer: "Yes, we offer ongoing maintenance packages including updates, security patches, and feature enhancements." },
      { question: "Can you redesign my existing website?", answer: "Absolutely. We offer complete redesigns as well as incremental improvements to existing sites." },
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    slug: "mobile-app",
    icon: Smartphone,
    title: "Mobile App Development",
    shortTitle: "Mobile App Development",
    tagline: "Apps Your Users Will Love",
    heroDescription:
      "We build native and cross-platform mobile applications for iOS and Android that deliver smooth, engaging experiences your users will love.",
    description: [
      "Our mobile development team creates high-quality applications using React Native and Flutter for cross-platform projects, as well as native Swift and Kotlin development for platform-specific needs.",
      "From concept to App Store launch, we handle the entire mobile development lifecycle — UI/UX design, development, testing, and post-launch support — ensuring your app performs flawlessly on every device.",
    ],
    features: [
      { title: "Cross-Platform Development", description: "One codebase for both iOS and Android, reducing cost and time." },
      { title: "Native Performance", description: "Smooth animations and fast load times that feel truly native." },
      { title: "Push Notifications", description: "Real-time engagement with your users through smart notifications." },
      { title: "Offline Functionality", description: "Apps that work reliably even without an internet connection." },
      { title: "App Store Deployment", description: "Full support getting your app approved and published." },
      { title: "Third-Party Integrations", description: "Payment gateways, maps, social login, and more." },
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js", "REST APIs", "GraphQL"],
    process: [
      { step: "01", title: "Strategy", description: "Defining app goals, target platforms, and feature set." },
      { step: "02", title: "UI/UX Design", description: "Intuitive interfaces designed for mobile-first experiences." },
      { step: "03", title: "Development", description: "Agile sprints building your app feature by feature." },
      { step: "04", title: "QA Testing", description: "Rigorous testing across devices, OS versions, and networks." },
      { step: "05", title: "Store Launch", description: "Submission and approval on Apple App Store & Google Play." },
      { step: "06", title: "Support", description: "Bug fixes, updates, and new feature rollouts." },
    ],
    benefits: [
      "Reach customers on both iOS and Android",
      "Improved customer engagement and retention",
      "Faster development with cross-platform code",
      "Seamless integration with existing systems",
      "Regular updates to match OS changes",
      "Dedicated post-launch support",
    ],
    faqs: [
      { question: "Should I choose native or cross-platform development?", answer: "Cross-platform (React Native/Flutter) is cost-effective and fast for most apps. We recommend native development only for highly performance-intensive apps." },
      { question: "How long does app development take?", answer: "A typical MVP takes 8-12 weeks; more complex apps with custom backends can take 4-6 months." },
      { question: "Do you help publish the app to app stores?", answer: "Yes, we handle the complete submission and approval process for both Apple App Store and Google Play Store." },
      { question: "Can you add new features after launch?", answer: "Yes, we offer ongoing development packages to add features and scale your app over time." },
    ],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    slug: "ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    shortTitle: "UI/UX Design",
    tagline: "Design That Feels Effortless",
    heroDescription:
      "We craft user-centered interfaces that combine beautiful design with intuitive functionality — turning complex problems into simple, delightful experiences.",
    description: [
      "Great design is invisible — it just works. Our UI/UX team follows a research-driven design process, starting with understanding your users, mapping their journeys, and crafting interfaces that feel natural and effortless.",
      "From wireframes to fully interactive prototypes and complete design systems, we ensure every screen serves a purpose and every interaction feels intentional.",
    ],
    features: [
      { title: "User Research", description: "Understanding your audience through interviews, surveys, and analytics." },
      { title: "Wireframing", description: "Low-fidelity layouts to map structure before visual design begins." },
      { title: "Interactive Prototyping", description: "Clickable prototypes to test flows before development starts." },
      { title: "Design Systems", description: "Reusable component libraries for consistency across your product." },
      { title: "Usability Testing", description: "Real user feedback to validate and refine designs." },
      { title: "Accessibility First", description: "Designs that meet WCAG standards for all users." },
    ],
    technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Framer", "Principle"],
    process: [
      { step: "01", title: "Research", description: "Understanding users, competitors, and business goals." },
      { step: "02", title: "Wireframes", description: "Structuring layouts and user flows." },
      { step: "03", title: "Visual Design", description: "Applying brand identity, color, and typography." },
      { step: "04", title: "Prototyping", description: "Building interactive, clickable prototypes." },
      { step: "05", title: "Testing", description: "Validating designs with real user feedback." },
      { step: "06", title: "Handoff", description: "Delivering developer-ready design assets and specs." },
    ],
    benefits: [
      "Higher user satisfaction and engagement",
      "Reduced development rework through clear specs",
      "Consistent brand experience across platforms",
      "Improved conversion rates through better UX",
      "Accessible design reaching a wider audience",
      "Design systems that scale with your product",
    ],
    faqs: [
      { question: "What's the difference between UI and UX design?", answer: "UX design focuses on the overall user experience and flow, while UI design focuses on the visual elements — colors, typography, and layout." },
      { question: "Do you design for both web and mobile?", answer: "Yes, we design responsive interfaces for websites, web apps, and native mobile applications." },
      { question: "Will I receive design files I can use with developers?", answer: "Yes, we deliver complete Figma files with specs, assets, and a full design system ready for development." },
      { question: "Can you redesign our existing product?", answer: "Yes, we offer full UX audits and redesigns based on usability research and modern design standards." },
    ],
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
  },
  {
    slug: "graphic-design",
    icon: PenTool,
    title: "Graphic Designing",
    shortTitle: "Graphic Design",
    tagline: "Visuals That Tell Your Story",
    heroDescription:
      "From brand identity to marketing collateral, we create stunning visual designs that communicate your message and make your brand unforgettable.",
    description: [
      "Our graphic design team helps businesses build a strong, consistent visual identity — from logo design and brand guidelines to social media graphics and print materials.",
      "We combine creativity with strategic thinking to ensure every design decision supports your brand's positioning and business goals.",
    ],
    features: [
      { title: "Logo & Brand Identity", description: "Distinctive logos and complete brand guideline documents." },
      { title: "Marketing Collateral", description: "Brochures, flyers, business cards, and print materials." },
      { title: "Social Media Graphics", description: "Consistent, engaging visuals for all your social platforms." },
      { title: "Packaging Design", description: "Eye-catching packaging that stands out on the shelf." },
      { title: "Presentation Design", description: "Professional pitch decks and corporate presentations." },
      { title: "Illustration", description: "Custom illustrations tailored to your brand style." },
    ],
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Adobe InDesign", "Canva Pro"],
    process: [
      { step: "01", title: "Brief", description: "Understanding your brand, audience, and goals." },
      { step: "02", title: "Concepts", description: "Multiple creative directions to choose from." },
      { step: "03", title: "Refinement", description: "Iterating based on your feedback." },
      { step: "04", title: "Finalization", description: "Polishing the chosen design to perfection." },
      { step: "05", title: "Delivery", description: "All files delivered in required formats." },
      { step: "06", title: "Guidelines", description: "Brand guideline document for consistent usage." },
    ],
    benefits: [
      "Stronger, more memorable brand identity",
      "Consistent visuals across all channels",
      "Professional materials that build trust",
      "Faster turnaround on design requests",
      "Print-ready and web-ready file formats",
      "Ongoing design support available",
    ],
    faqs: [
      { question: "What's included in a brand identity package?", answer: "Logo design, color palette, typography, and a complete brand guideline document." },
      { question: "How many logo concepts will I receive?", answer: "Typically 3-5 initial concepts, with revisions until you're fully satisfied." },
      { question: "Do you provide source files?", answer: "Yes, you'll receive all source files (AI, PSD, Figma) along with exported formats." },
      { question: "Can you design for both print and digital?", answer: "Yes, we design for both mediums and deliver print-ready and web-optimized files." },
    ],
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    slug: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    shortTitle: "Digital Marketing",
    tagline: "Data-Driven Growth Strategies",
    heroDescription:
      "We build data-driven marketing strategies that increase visibility, drive engagement, and generate measurable conversions for your business.",
    description: [
      "Our digital marketing team combines SEO, paid advertising, content marketing, and social media strategy to help your business reach the right audience at the right time.",
      "We focus on measurable results — every campaign is tracked, analyzed, and optimized to maximize your return on investment.",
    ],
    features: [
      { title: "SEO Optimization", description: "Improve organic rankings and drive sustainable traffic." },
      { title: "Paid Advertising", description: "Targeted campaigns across Google Ads and social platforms." },
      { title: "Content Marketing", description: "Strategic content that attracts and converts your audience." },
      { title: "Social Media Management", description: "Consistent, engaging presence across all platforms." },
      { title: "Email Marketing", description: "Automated campaigns that nurture leads into customers." },
      { title: "Analytics & Reporting", description: "Transparent monthly reports tracking real results." },
    ],
    technologies: ["Google Analytics", "Google Ads", "Meta Ads Manager", "SEMrush", "Mailchimp", "HubSpot"],
    process: [
      { step: "01", title: "Audit", description: "Analyzing your current digital presence and competitors." },
      { step: "02", title: "Strategy", description: "Building a custom marketing roadmap." },
      { step: "03", title: "Execution", description: "Launching campaigns across chosen channels." },
      { step: "04", title: "Optimization", description: "Continuous A/B testing and refinement." },
      { step: "05", title: "Reporting", description: "Transparent, data-backed monthly reports." },
      { step: "06", title: "Scaling", description: "Doubling down on what's working best." },
    ],
    benefits: [
      "Increased website traffic and visibility",
      "Higher quality leads and conversions",
      "Better ROI through continuous optimization",
      "Stronger brand awareness and engagement",
      "Transparent reporting and analytics",
      "Dedicated marketing strategist",
    ],
    faqs: [
      { question: "How long until I see results from SEO?", answer: "SEO typically shows meaningful results within 3-6 months, while paid ads can drive traffic immediately." },
      { question: "Do you manage social media accounts?", answer: "Yes, we offer full social media management including content creation, scheduling, and community engagement." },
      { question: "What's included in monthly reporting?", answer: "Traffic, conversions, ad performance, keyword rankings, and actionable insights for the next month." },
      { question: "Can you work with our existing marketing team?", answer: "Absolutely, we can work as an extension of your in-house team or manage everything independently." },
    ],
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
];

export function getServiceBySlug(slug: string) {
  return servicesData.find((s) => s.slug === slug);
}