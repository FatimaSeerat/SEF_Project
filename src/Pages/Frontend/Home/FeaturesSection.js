import { Brain, Calendar, Upload, Download, Shield, FileText, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Quiz Generation",
    description: "Upload any document or image and our AI instantly creates comprehensive quizzes with multiple choice or open-ended questions.",
    color: "primary",
  },
  {
    icon: Calendar,
    title: "Smart Timetables",
    description: "Input your availability and preferred courses. Our AI generates optimized schedules that maximize your study efficiency.",
    color: "secondary",
  },
  {
    icon: Upload,
    title: "Multi-Format Support",
    description: "Upload PDFs, Word documents, images, and more. Our system extracts content intelligently for quiz generation.",
    color: "primary",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Track your quiz scores, identify weak areas, and monitor your learning progress over time with detailed analytics.",
    color: "secondary",
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description: "Download your quizzes and timetables as PDF or JSON. Share with classmates or print for offline study.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and stored securely. We never share your study materials or personal information.",
    color: "secondary",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-br from-[#D4C0E9] via-[#C3A6E0] to-[#CCB3E5]"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl mb-4 md:mb-6 text-[#161721]">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-[#68369B] to-[#9D64CF] bg-clip-text text-transparent">
              Excel
            </span>
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#3A2F4F]">
            From intelligent quiz generation to optimized scheduling, QuizHub AI provides
            all the tools you need to study smarter, not harder.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-xl p-[1px]
              bg-gradient-to-br from-[#9D64CF]/30 to-[#68369B]/20
              hover:from-[#9D64CF]/50 hover:to-[#68369B]/40
              transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-xl bg-[#9D64CF]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

              <div className="relative bg-white/60 backdrop-blur-md rounded-lg p-5 sm:p-6 md:p-6 h-full">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${feature.color === "primary"
                    ? "bg-[#68369B]/15 text-[#68369B]"
                    : "bg-[#9D64CF]/15 text-[#9D64CF]"
                    }`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg sm:text-xl text-[#161721] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#3A2F4F] text-sm sm:text-[15px] leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#9D64CF]/15 to-transparent rounded-tr-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Feature Highlight */}
        <div className="mt-12 md:mt-16 relative">
          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#9D64CF]/30 to-[#68369B]/30">
            <div className="relative bg-white/60 backdrop-blur-md rounded-xl p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(157,100,207,0.2),transparent_40%)]" />

              <div className="relative grid lg:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-[#68369B]/20 text-[#68369B] text-xs font-medium mb-3">
                    <FileText className="w-3 h-3" />
                    New Feature
                  </div>

                  <h3 className="font-display font-bold text-xl md:text-3xl text-[#161721] mb-3">
                    Instant Quiz from{" "}
                    <span className="bg-gradient-to-r from-[#68369B] to-[#9D64CF] bg-clip-text text-transparent">
                      Any Document
                    </span>
                  </h3>

                  <p className="text-[#3A2F4F] text-sm md:text-base mb-4">
                    Simply drag and drop your study materials. Our advanced AI analyzes the content
                    and generates tailored questions that test your understanding.
                  </p>

                  <ul className="space-y-2 text-sm md:text-[15px]">
                    {[
                      "MCQ & Open-ended questions",
                      "Adjustable difficulty levels",
                      "Instant auto-grading",
                      "Detailed explanations",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[#3A2F4F]">
                        <div className="w-4 h-4 rounded-full bg-[#68369B]/20 flex items-center justify-center">
                          <span className="text-[#68369B] text-[10px] font-medium">✓</span>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preview Card */}
                <div className="relative mt-4 lg:mt-0">
                  <div className="bg-white/60 rounded-lg border border-[#9D64CF]/20 p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 pb-3 border-b border-[#9D64CF]/20">
                        <div className="w-8 h-8 rounded-lg bg-[#68369B]/20 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#68369B]" />
                        </div>
                        <div>
                          <div className="font-medium text-[#161721] text-sm">
                            Biology_Chapter5.pdf
                          </div>
                          <div className="text-xs text-[#3A2F4F]">Uploaded just now</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          "What is the function of mitochondria?",
                          "Explain the process of cellular respiration",
                          "Define photosynthesis and its stages"
                        ].map((question, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-lg p-2 border border-[#9D64CF]/20"
                          >
                            <div className="h-2 bg-[#9D64CF]/20 rounded w-full mb-1 flex items-center px-2">
                              <span className="text-[8px] text-[#161721]/70 font-medium">{question}</span>
                            </div>
                            <div className="h-2 bg-[#9D64CF]/20 rounded w-3/4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-3 -right-3 bg-[#68369B] text-white rounded-full px-3 py-1 text-xs font-medium shadow-md">
                    20 Questions Ready!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Smooth transition to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#D4C0E9]" />
    </section>
  );
};

export default FeaturesSection;
