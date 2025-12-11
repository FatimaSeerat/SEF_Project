import { Upload, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Materials",
    description: "Drag and drop your study documents, PDFs, or images. Our system supports multiple formats for maximum flexibility.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Does the Magic",
    description: "Our advanced AI analyzes your content and generates comprehensive quizzes or optimized timetables in seconds.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Study & Track Progress",
    description: "Take quizzes, review answers, and track your learning progress. Download results anytime for offline review.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border mb-6">
            <ArrowRight className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">How It Works</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-6">
            Three Steps to{" "}
            <span className="text-gradient">Smarter Learning</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started with QuizHub AI is incredibly simple. 
            Follow these three steps and transform how you study.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Step Card */}
                <div className="bg-gradient-card rounded-2xl border border-border p-1 hover:border-primary/50 transition-all duration-500">
                  <div className="relative bg-card rounded-xl p-8 text-center h-full">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground font-display font-bold text-sm px-4 py-1 rounded-full shadow-button">
                      Step {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Visual - Process Animation */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-3xl border border-border p-1">
            <div className="relative bg-card rounded-2xl p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Input */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-4 bg-muted/50 rounded-xl p-4 border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground">Your Document</div>
                      <div className="text-sm text-muted-foreground">PDF, DOCX, Images</div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-primary/50 to-primary" />
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center pulse-glow">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-primary/50" />
                </div>

                {/* Output */}
                <div className="flex-1 text-center md:text-right">
                  <div className="inline-flex items-center gap-4 bg-muted/50 rounded-xl p-4 border border-primary/30">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground">Ready Quiz</div>
                      <div className="text-sm text-muted-foreground">MCQ + Open-ended</div>
                    </div>
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
