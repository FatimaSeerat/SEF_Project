import { Button } from "../ui/button";
import { ArrowRight, Brain, Calendar } from "lucide-react";

const HeroSection = () => {
  return (
    <section
  id="register-section"   // <-- Ye add kar do
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero noise"
>
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-display  font-bold text-4xl md:text-4xl lg:text-5xl leading-tight mb-6 mt-24 animate-fade-in-up opacity-0 delay-100">
            Learn Smarter with{" "}
            <span className="relative">
              <span className="text-gradient inline-block my-4">AI-Powered</span>
            </span>
            <br />
            Quizzes & Timetables
          </h1>

          {/* Subheading */}
          <p className="text-sm md:text-[18px] text-muted-foreground max-w-3xl mb-8 mt-2 animate-fade-in-up opacity-0 delay-200">
            Transform your study materials into interactive quizzes and generate 
            personalized timetables in seconds. Study efficiently, learn effectively.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 animate-fade-in-up opacity-0 delay-400">
            <Button variant="hero" size="xl" className="group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 shimmer" />
            </Button>
          
          </div>

          {/* Floating Cards Preview */}
          <div className="relative w-full max-w-4xl mt-20 animate-fade-in-up opacity-0 delay-600">
            {/* Main Dashboard Preview */}
            <div className="relative border-glow rounded-2xl">
              <div className="relative bg-gradient-card rounded-2xl border border-border p-1 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="relative bg-card rounded-xl p-6 md:p-8">
                  {/* Mock Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-destructive" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-muted-foreground">AI Ready</span>
                    </div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Quiz Card */}
                    <div className="bg-muted/50 rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-button group-hover:scale-110 transition-transform">
                          <Brain className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="font-display font-semibold text-foreground">Quiz Generator</div>
                          <div className="text-xs text-muted-foreground">Upload & Generate</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-4/5" />
                        <div className="h-3 bg-muted rounded w-3/5" />
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-6 px-3 bg-primary/20 rounded-full flex items-center">
                          <span className="text-xs text-primary font-medium">20 Questions</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Timetable Card */}
                    <div className="bg-muted/50 rounded-xl p-5 border border-border/50 hover:border-secondary/30 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Calendar className="w-6 h-6 text-secondary-foreground" />
                        </div>
                        <div>
                          <div className="font-display font-semibold text-foreground">Timetable AI</div>
                          <div className="text-xs text-muted-foreground">Smart Scheduling</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-5 rounded-md transition-all ${
                              [2, 5, 7, 11, 13].includes(i)
                                ? "bg-primary/40 group-hover:bg-primary/60"
                                : [3, 8, 12].includes(i)
                                ? "bg-secondary/40 group-hover:bg-secondary/60"
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-6 px-3 bg-secondary/20 rounded-full flex items-center">
                          <span className="text-xs text-secondary font-medium">Optimized</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
