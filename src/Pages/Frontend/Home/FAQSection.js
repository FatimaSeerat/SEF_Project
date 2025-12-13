import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the AI quiz generation work?",
    answer:
      "Simply upload your study materials (PDFs, documents, or images), and our advanced AI analyzes the content to generate relevant questions.",
  },
  {
    question: "Is there a limit to how many quizzes I can create?",
    answer:
      "Free users can create up to 5 quizzes per month. Pro subscribers enjoy unlimited quiz generation and advanced analytics.",
  },
  {
    question: "How does the AI timetable generator optimize my schedule?",
    answer:
      "Our AI considers your availability, course preferences, and study patterns to create an optimized schedule.",
  },
  {
    question: "Can I export my quizzes and timetables?",
    answer:
      "Yes! You can download your quizzes and timetables as PDFs. Pro users can also export JSON data.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="relative py-12 md:py-18 overflow-hidden
      bg-gradient-to-br from-[#D4C0E9] via-[#C3A6E0] to-[#CCB3E5]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />

      {/* Top blend */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24
      bg-gradient-to-t from-transparent to-[#D4C0E9]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 mb-6">
              <HelpCircle className="w-4 h-4 text-[#68369B]" />
              <span className="text-sm font-medium text-[#3A2F4F]">FAQ</span>
            </div>

            <h2 className="font-display font-bold text-3xl md:text-5xl mb-6 text-[#161721]">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#68369B] to-[#9D64CF] bg-clip-text text-transparent">
                Questions
              </span>
            </h2>

            <p className="text-lg text-[#3A2F4F] max-w-2xl mx-auto">
              Everything you need to know about QuizHub AI.
              Can’t find what you’re looking for? Contact support.
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl p-[1px]
                bg-gradient-to-br from-[#9D64CF]/40 to-[#68369B]/40"
              >
                <div className="bg-white/65 backdrop-blur-xl rounded-xl overflow-hidden">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-display font-semibold text-lg text-[#161721] pr-8">
                      {faq.question}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        openIndex === index
                          ? "bg-[#68369B] text-white rotate-180"
                          : "bg-white/60 text-[#68369B]"
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
                      <div className="h-px bg-white/40 mb-4" />
                      <p className="text-[#3A2F4F] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#3A2F4F] mb-4">Still have questions?</p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#68369B] font-medium hover:opacity-80"
            >
              Contact our support team →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
