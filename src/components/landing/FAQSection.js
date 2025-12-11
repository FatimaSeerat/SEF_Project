import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the AI quiz generation work?",
    answer: "Simply upload your study materials (PDFs, documents, or images), and our advanced AI analyzes the content to generate relevant questions. You can choose between multiple-choice or open-ended formats, and adjust the difficulty level to match your learning needs."
  },
  {
    question: "Is there a limit to how many quizzes I can create?",
    answer: "Free users can create up to 5 quizzes per month. Pro subscribers enjoy unlimited quiz generation, along with advanced features like progress tracking and detailed analytics."
  },
  {
    question: "How does the AI timetable generator optimize my schedule?",
    answer: "Our AI considers your availability, course preferences, and study patterns to create an optimized schedule. It balances study sessions, includes breaks, and adapts to your learning style for maximum efficiency."
  },
  {
    question: "Can I export my quizzes and timetables?",
    answer: "Yes! You can download your quizzes and timetables as PDF files for offline study or sharing. Pro users can also export raw data in JSON format for integration with other tools."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption for all data storage and transmission. Your study materials are processed securely and never shared with third parties. You can delete your data at any time."
  },
  {
    question: "Can I use QuizHub AI for my entire class or institution?",
    answer: "Yes! Our Enterprise plan is designed for educational institutions. It includes custom AI training, admin dashboards, SSO integration, and dedicated support. Contact our sales team for a tailored solution."
  },
];

const FAQSection = () => {

  const [openIndex, setOpenIndex] = useState(0);


  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border backdrop-blur-sm mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">FAQ</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-6">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about QuizHub AI. Can't find what you're 
              looking for? Contact our support team.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group bg-gradient-card rounded-2xl border p-1 transition-all duration-300 ${
                  openIndex === index
                    ? "border-primary/50 shadow-glow"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="bg-card rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-display font-semibold text-lg text-foreground pr-8">
                      {faq.question}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        openIndex === index
                          ? "bg-primary text-primary-foreground rotate-180"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px bg-border mb-4" />
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Contact our support team
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
