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
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
  
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
    
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Excel</span>
          </h2>
          <p className="text-[18px] text-muted-foreground">
            From intelligent quiz generation to optimized scheduling, QuizHub AI provides 
            all the tools you need to study smarter, not harder.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-gradient-card rounded-2xl border border-border p-1 hover:border-primary/50 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
              
              <div className="relative bg-card rounded-xl p-6 md:p-8 h-full">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    feature.color === "primary"
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary/20 text-secondary"
                  }`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-tr-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Feature Highlight */}
        <div className="mt-16 md:mt-24 relative">
          <div className="bg-gradient-card rounded-3xl border border-border p-1">
            <div className="relative bg-card rounded-2xl p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              
              <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                    <FileText className="w-4 h-4" />
                    New Feature
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-4xl text-foreground mb-4">
                    Instant Quiz from{" "}
                    <span className="text-gradient">Any Document</span>
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6">
                    Simply drag and drop your study materials. Our advanced AI analyzes the content 
                    and generates tailored questions that test your understanding at multiple levels.
                  </p>
                  <ul className="space-y-3">
                    {["MCQ & Open-ended questions", "Adjustable difficulty levels", "Instant auto-grading", "Detailed explanations"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary text-xs">✓</span>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Preview */}
                <div className="relative">
                  <div className="bg-muted/50 rounded-xl border border-border p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 pb-4 border-b border-border">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Biology_Chapter5.pdf</div>
                          <div className="text-xs text-muted-foreground">Uploaded just now</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-foreground">Generated Questions:</div>
                        {[1, 2, 3].map((q) => (
                          <div key={q} className="bg-background rounded-lg p-3 border border-border">
                            <div className="h-3 bg-muted rounded w-full mb-2" />
                            <div className="h-3 bg-muted rounded w-3/4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium shadow-button">
                    20 Questions Ready!
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

export default FeaturesSection;
