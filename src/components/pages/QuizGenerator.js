import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase"; // Firebase auth only
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, Upload, FileText, X, Loader2, BookOpen } from "lucide-react";
import QuizTaker from "../pages/QuizTaker";

// ---- ADD YOUR GEMINI API KEY HERE ----

export default function QuizGenerator() {
    const [user, setUser] = useState(null);
    const [step, setStep] = useState("upload");
    const [files, setFiles] = useState([]);
    const [documentContent, setDocumentContent] = useState("");
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState(5);
    const [quizType, setQuizType] = useState("mcq");
    const [difficulty, setDifficulty] = useState("medium");
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    // --- Auth check ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) setUser(currentUser);
            else navigate("/auth");
        });
        return unsubscribe;
    }, [navigate]);

    // --- File upload ---
    const handleFileUpload = async (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (!selectedFiles.length) return;

        for (const file of selectedFiles) {
            if (file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
                const text = await file.text();
                setDocumentContent((prev) => prev + "\n" + text);
            }
        }

        setFiles((prev) => [...prev, ...selectedFiles]);
        toast.success(`${selectedFiles.length} file(s) added`);
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // --- Generate Quiz using Gemini API directly from frontend ---
    const generateQuiz = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/generate-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ documentContent, quantity, quizType, difficulty })
});

            const data = await response.json(); // now always safe
            if (data.error) {
                toast.error(data.error);
                setLoading(false);
                return;
            }


            if (!data?.candidates?.[0]?.content) {
                toast.error("Failed to generate quiz");
                setLoading(false);
                return;
            }

            const generatedQuestions = data.candidates[0].content
                .split("\n")
                .filter(q => q.trim() !== "")
                .map((q, idx) => ({ id: idx.toString(), prompt: q }));

            setQuestions(generatedQuestions);
            toast.success("Quiz generated successfully!");
            setStep("quiz");
        } catch (err) {
            console.error(err);
            toast.error("Failed to generate quiz");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-muted-foreground">
                            Quiz Generator
                        </span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-2xl text-left">
                {/* Step: Upload */}
                {step === "upload" && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Create Your Quiz</h1>
                            <p className="text-muted-foreground">Upload documents or paste content to generate AI-powered questions</p>
                        </div>

                        <div className="glass rounded-2xl p-6 border border-white/10">
                            <Label className="text-foreground mb-4 block">Upload Documents (Optional)</Label>
                            <label className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                                <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                                <span className="text-foreground font-medium">Drop files here or click to upload</span>
                                <span className="text-sm text-muted-foreground mt-1">Supports TXT, MD files</span>
                                <input type="file" multiple accept=".txt,.md,.text" onChange={handleFileUpload} className="hidden" />
                            </label>
                            {files.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-primary" />
                                                <span className="text-sm text-foreground">{file.name}</span>
                                            </div>
                                            <button onClick={() => removeFile(idx)} className="text-muted-foreground hover:text-destructive">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="glass rounded-2xl p-6 border border-white/10">
                            <Label htmlFor="content" className="text-foreground mb-4 block">Or Paste Content Directly</Label>
                            <textarea
                                id="content"
                                value={documentContent}
                                onChange={(e) => setDocumentContent(e.target.value)}
                                placeholder="Paste your study material..."
                                className="w-full h-40 bg-secondary/50 border border-white/10 rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary"
                            />
                        </div>

                        <Button onClick={() => setStep("options")} className="w-full" variant="hero" size="lg">
                            Continue <BookOpen className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}

                {/* Step: Options */}
                {step === "options" && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Quiz Options</h1>
                            <p className="text-muted-foreground">Customize your quiz settings</p>
                        </div>

                        <div className="glass rounded-2xl p-6 border border-white/10 space-y-6 text-left">
                            <div >
                                <Label htmlFor="title" className="text-foreground">Quiz Title</Label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter quiz title" className="mt-2 bg-secondary/50 border-white/10" />
                            </div>

                            <div>
                                <Label className="text-foreground">Number of Questions</Label>
                                <div className="flex gap-2 mt-2">
                                    {[5, 10, 15, 20].map(num => (
                                        <button key={num} onClick={() => setQuantity(num)} className={`flex-1 py-3 rounded-lg border transition-colors ${quantity === num ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/50 border-white/10 text-foreground hover:border-primary/50'}`}>{num}</button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-foreground">Question Type</Label>
                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => setQuizType('mcq')} className={`flex-1 py-3 rounded-lg border transition-colors ${quizType === 'mcq' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/50 border-white/10 text-foreground hover:border-primary/50'}`}>Multiple Choice</button>
                                    <button onClick={() => setQuizType('open-ended')} className={`flex-1 py-3 rounded-lg border transition-colors ${quizType === 'open-ended' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/50 border-white/10 text-foreground hover:border-primary/50'}`}>Open Ended</button>
                                </div>
                            </div>

                            <div>
                                <Label className="text-foreground">Difficulty</Label>
                                <div className="flex gap-2 mt-2">
                                    {['easy', 'medium', 'hard'].map(level => (
                                        <button key={level} onClick={() => setDifficulty(level)} className={`flex-1 py-3 rounded-lg border transition-colors capitalize ${difficulty === level ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary/50 border-white/10 text-foreground hover:border-primary/50'}`}>{level}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button onClick={() => setStep("upload")} variant="outline" className="flex-1">Back</Button>
                            <Button onClick={generateQuiz} variant="hero" className="flex-1" disabled={loading}>
                                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4 mr-2" />Generate Quiz</>}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step: Quiz */}
                {step === "quiz" && questions.length > 0 && (
                    <QuizTaker questions={questions} quizType={quizType} onComplete={() => { }} />
                )}
            </main>
        </div>
    );
}
