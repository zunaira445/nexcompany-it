export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export const faqData: FaqCategory[] = [
  {
    category: "General",
    items: [
      {
        question: "What services does NexGen IT Solutions offer?",
        answer:
          "We offer web development, mobile app development, UI/UX design, graphic design, and digital marketing services — everything a business needs to build and grow its digital presence.",
      },
      {
        question: "Which industries do you work with?",
        answer:
          "We've worked with clients across e-commerce, healthcare, fintech, education, real estate, and many other industries. Our process adapts to the unique needs of each sector.",
      },
      {
        question: "Do you work with startups as well as established businesses?",
        answer:
          "Yes, we work with businesses of all sizes — from early-stage startups building their first MVP to established enterprises scaling existing platforms.",
      },
    ],
  },
  {
    category: "Web Development",
    items: [
      {
        question: "What technologies do you use for web development?",
        answer:
          "We primarily build with React, Next.js, and Node.js, along with MongoDB or PostgreSQL for databases. We choose the best stack based on your project's specific requirements.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "Absolutely. We offer full redesigns as well as incremental improvements to existing websites, preserving your SEO rankings and content wherever possible.",
      },
      {
        question: "Will my website be optimized for search engines?",
        answer:
          "Yes, every website we build follows SEO best practices including semantic HTML, fast load times, and mobile optimization.",
      },
    ],
  },
  {
    category: "Mobile Apps",
    items: [
      {
        question: "Do you build apps for both iOS and Android?",
        answer:
          "Yes, we build cross-platform apps using React Native and Flutter that work seamlessly on both platforms, as well as native apps when required.",
      },
      {
        question: "Do you help publish apps to the App Store and Play Store?",
        answer:
          "Yes, we handle the complete submission and approval process for both Apple App Store and Google Play Store.",
      },
    ],
  },
  {
    category: "UI/UX Design",
    items: [
      {
        question: "What's included in your UI/UX design process?",
        answer:
          "Our process includes user research, wireframing, visual design, interactive prototyping, and usability testing — resulting in a complete, developer-ready design system.",
      },
      {
        question: "Can you redesign our existing product's user experience?",
        answer:
          "Yes, we offer full UX audits and redesigns based on usability research and modern design standards.",
      },
    ],
  },
  {
    category: "Pricing & Payments",
    items: [
      {
        question: "How is pricing determined for a project?",
        answer:
          "Pricing depends on project scope, features, and timeline. We provide a detailed, transparent quote after understanding your requirements during a free consultation.",
      },
      {
        question: "Do you require upfront payment?",
        answer:
          "We typically work with milestone-based payments — an initial deposit to begin, followed by payments tied to project milestones and final delivery.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Refund terms are outlined in our service agreement and vary based on project stage. Please refer to our Terms & Conditions or contact us for details specific to your project.",
      },
    ],
  },
  {
    category: "Support & Timelines",
    items: [
      {
        question: "How long does a typical project take?",
        answer:
          "Timelines vary by project complexity. A basic website may take 3-6 weeks, while a custom web or mobile application can take 2-4 months. We provide a detailed timeline during planning.",
      },
      {
        question: "Do you provide post-launch support?",
        answer:
          "Yes, every project includes a free support period after launch, and we offer ongoing maintenance packages for continued updates and improvements.",
      },
      {
        question: "How can I reach support if I have an issue?",
        answer:
          "You can reach our support team through the Contact page, email, or phone. Premium plan clients also get access to priority 24/7 support.",
      },
    ],
  },
];