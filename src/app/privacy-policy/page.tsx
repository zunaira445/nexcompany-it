import SectionHeading from "@/components/ui/SectionHeading";

const sections = [
  {
    title: "1. Introduction",
    content: `NexGen IT Solutions ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully. By using our website, you agree to the terms described here.`,
  },
  {
    title: "2. Information We Collect",
    content: `We may collect the following types of information:`,
    list: [
      "Personal Information: name, email address, phone number, and company details you provide through our contact form, registration, or inquiries.",
      "Account Information: username, password (encrypted), and profile details when you create an account.",
      "Usage Data: pages visited, time spent on the site, browser type, device information, and IP address.",
      "Communication Data: messages, emails, and inquiries you send to us.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the collected information for the following purposes:`,
    list: [
      "To provide, operate, and maintain our website and services",
      "To respond to your inquiries and provide customer support",
      "To process registrations and manage user accounts",
      "To send you updates, marketing communications, and service-related notices (with an option to opt out)",
      "To improve our website, services, and user experience",
      "To detect, prevent, and address technical issues or fraudulent activity",
    ],
  },
  {
    title: "4. Cookies & Tracking Technologies",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control or disable cookies through your browser settings; however, doing so may affect certain features of our website.`,
  },
  {
    title: "5. Data Security",
    content: `We implement industry-standard security measures — including encryption, secure servers, and access controls — to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "6. Third-Party Services",
    content: `We may use trusted third-party services (such as hosting providers, analytics tools, email service providers, and payment processors) to operate our website and services. These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.`,
  },
  {
    title: "8. Your Rights",
    content: `Depending on your location, you may have the right to:`,
    list: [
      "Access the personal information we hold about you",
      "Request correction of inaccurate or incomplete data",
      "Request deletion of your personal information",
      "Opt out of marketing communications at any time",
      "Withdraw consent where processing is based on consent",
    ],
  },
  {
    title: "9. Children's Privacy",
    content: `Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us so we can remove it.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify users of significant changes by updating the "Last Updated" date on this page.`,
  },
  {
    title: "11. Contact Information",
    content: `If you have any questions or concerns about this Privacy Policy or how we handle your information, please contact us:`,
    list: [
      "Email: info@nexgenit.com",
      "Phone: +92 300 1234567",
      "Address: 123 Tech Avenue, Suite 400, Business District, Karachi, Pakistan",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="section-padding max-w-4xl mx-auto mb-12">
        <SectionHeading title="Privacy Policy" subtitle="Legal" className="mb-6" />
        <p className="text-gray-500 text-sm text-center">Last Updated: July 22, 2026</p>
      </section>

      <section className="section-padding max-w-4xl mx-auto">
        <div className="glass-card p-8 sm:p-12 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-display font-bold text-white mb-3">{section.title}</h2>
              {section.content && (
                <p className="text-gray-400 leading-relaxed mb-3">{section.content}</p>
              )}
              {section.list && (
                <ul className="space-y-2 list-disc list-inside">
                  {section.list.map((item) => (
                    <li key={item} className="text-gray-400 text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}