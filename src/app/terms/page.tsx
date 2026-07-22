import SectionHeading from "@/components/ui/SectionHeading";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the NexGen IT Solutions website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services.`,
  },
  {
    title: "2. Services",
    content: `NexGen IT Solutions provides web development, mobile app development, UI/UX design, graphic design, and digital marketing services. The specific scope, deliverables, and timeline for each project will be outlined in a separate service agreement or proposal signed by both parties.`,
  },
  {
    title: "3. Payments",
    content: `Project pricing, payment schedules, and milestones will be agreed upon before work begins.`,
    list: [
      "Projects typically require an upfront deposit before work commences",
      "Remaining payments are due according to agreed milestones or upon project completion",
      "Late payments may result in a pause of ongoing work until payment is received",
      "All prices are exclusive of applicable taxes unless stated otherwise",
    ],
  },
  {
    title: "4. User Responsibilities",
    content: `When using our website or services, you agree to:`,
    list: [
      "Provide accurate and complete information when registering or submitting inquiries",
      "Use our website and services only for lawful purposes",
      "Not attempt to gain unauthorized access to our systems or other users' accounts",
      "Not upload or transmit any harmful, offensive, or illegal content through our platforms",
      "Keep your account credentials confidential and secure",
    ],
  },
  {
    title: "5. Intellectual Property",
    content: `Unless otherwise agreed in writing, all designs, code, and content created by NexGen IT Solutions remain our intellectual property until full payment is received, at which point ownership transfers to the client as specified in the service agreement. NexGen IT Solutions retains the right to showcase completed projects in its portfolio unless the client requests otherwise in writing.`,
  },
  {
    title: "6. Limitation of Liability",
    content: `NexGen IT Solutions strives to deliver high-quality services, but we do not guarantee that our website or services will be uninterrupted or error-free. To the fullest extent permitted by law, NexGen IT Solutions shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services.`,
  },
  {
    title: "7. Termination",
    content: `Either party may terminate a service agreement with written notice as specified in the individual project contract. In the event of termination, the client is responsible for payment of all work completed up to the termination date. NexGen IT Solutions reserves the right to suspend or terminate access to our website for users who violate these Terms & Conditions.`,
  },
  {
    title: "8. Governing Law",
    content: `These Terms & Conditions shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in Karachi, Pakistan.`,
  },
  {
    title: "9. Changes to These Terms",
    content: `We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to this page. Continued use of our website or services after changes constitutes acceptance of the revised terms.`,
  },
  {
    title: "10. Contact Information",
    content: `For questions regarding these Terms & Conditions, please contact us:`,
    list: [
      "Email: info@nexgenit.com",
      "Phone: +92 300 1234567",
      "Address: 123 Tech Avenue, Suite 400, Business District, Karachi, Pakistan",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="section-padding max-w-4xl mx-auto mb-12">
        <SectionHeading title="Terms & Conditions" subtitle="Legal" className="mb-6" />
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