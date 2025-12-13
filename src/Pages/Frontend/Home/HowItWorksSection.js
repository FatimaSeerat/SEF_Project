import { Upload, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Materials",
    description:
      "Drag and drop your study documents, PDFs, or images. Our system supports multiple formats for maximum flexibility.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Does the Magic",
    description:
      "Our advanced AI analyzes your content and generates comprehensive quizzes or optimized timetables in seconds.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Study & Track Progress",
    description:
      "Take quizzes, review answers, and track your learning progress. Download results anytime for offline review.",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-12 md:py-18 relative overflow-hidden bg-gradient-to-br from-[#D4C0E9] via-[#C3A6E0] to-[#CCB3E5]"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Top & Bottom blends */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-[#D4C0E9]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#D4C0E9]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 mb-4">
            <ArrowRight className="w-4 h-4 text-[#68369B]" />
            <span className="text-sm font-medium text-[#3A2F4F]">How It Works</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl mb-4 md:mb-6 text-[#161721]">
            Three Steps to{" "}
            <span className="bg-gradient-to-r from-[#68369B] to-[#9D64CF] bg-clip-text text-transparent">
              Smarter Learning
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#3A2F4F]">
            Getting started with QuizHub AI is incredibly simple. Follow these three steps and transform how you study.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="group flex flex-col h-full">
                <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#9D64CF]/30 to-[#68369B]/20 flex-1">
                  <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col items-center text-center h-full">
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2
                      bg-gradient-to-r from-[#68369B] to-[#9D64CF]
                      text-white font-display font-bold text-sm px-4 py-1 rounded-full shadow-md"
                    >
                      Step {step.number}
                    </div>

                    <div
                      className="w-20 h-20 mx-auto rounded-2xl bg-[#68369B]/15
                      flex items-center justify-center mb-4 mt-6
                      group-hover:scale-105 transition-transform duration-300"
                    >
                      <step.icon className="w-10 h-10 text-[#68369B]" />
                    </div>

                    <h3 className="font-display font-semibold text-lg sm:text-xl text-[#161721] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#3A2F4F] text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow between steps on large screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-white/70 border border-white/40 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-[#68369B]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Visual */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="rounded-3xl p-[1px] bg-gradient-to-br from-[#9D64CF]/30 to-[#68369B]/30">
            <div className="relative bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-10 overflow-hidden flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-3 bg-white/60 rounded-xl p-3 border border-white/40">
                  <div className="w-12 h-12 rounded-lg bg-[#68369B]/20 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-[#68369B]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#161721]">Your Document</div>
                    <div className="text-sm text-[#3A2F4F]">PDF, DOCX, Images</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 w-full md:w-auto">
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#68369B]/50 to-[#68369B]" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#68369B] to-[#9D64CF] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#68369B] to-[#68369B]/50" />
              </div>

              <div className="flex-1 text-center md:text-right">
                <div className="inline-flex items-center gap-3 bg-white/60 rounded-xl p-3 border border-white/40">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-[#161721]">Ready Quiz</div>
                    <div className="text-sm text-[#3A2F4F]">MCQ + Open-ended</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
