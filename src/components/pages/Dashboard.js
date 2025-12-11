import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Sparkles, LogOut, FileQuestion, Clock, Trophy,
  Plus, ChevronRight, BarChart3
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Authentication Check (Firebase)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        navigate("/auth");
      } else {
        fetchQuizzes();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch quizzes from Firestore
  const fetchQuizzes = async () => {
    try {
      const q = query(
        collection(db, "quizzes"),
        orderBy("created_at", "desc"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      const quizData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setQuizzes(quizData);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleSignOut = async () => {
    await signOut(auth);
    toast.success("Signed out successfully");
    navigate("/");
  };

  const completedQuizzes = quizzes.filter(q => q.status === "completed");
  const totalScore = completedQuizzes.reduce((acc, q) => acc + (q.score || 0), 0);
  const totalQuestions = completedQuizzes.reduce((acc, q) => acc + (q.total_questions || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-muted-foreground">
              QuizHub AI
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Ready to test your knowledge? Create a new quiz or review your history.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <FileQuestion className="w-5 h-5 text-primary" />
              </div>
              <span className="text-muted-foreground text-sm">Total Quizzes</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{quizzes.length}</p>
          </div>

          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <span className="text-muted-foreground text-sm">Total Score</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {totalScore}/{totalQuestions}
            </p>
          </div>

          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-muted-foreground text-sm">Avg Score</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Create Quiz CTA */}
        <Link to="/quiz">
          <div className="glass rounded-2xl p-8 border border-white/10 mb-8 group hover:border-primary/50 transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Plus className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1 text-left">Create New Quiz</h2>
                  <p className="text-muted-foreground">Upload a document and generate AI-powered questions</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </Link>

        {/* Recent Quizzes */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 text-left">Recent Quizzes</h2>

          {quizzes.length === 0 ? (
            <div className="glass rounded-xl p-12 border border-white/10 text-center">
              <FileQuestion className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No quizzes yet. Create your first one!</p>
              <Link to="/quiz">
                <Button variant="hero">Create Quiz</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="glass rounded-xl p-4 border border-white/10 flex items-center justify-between hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      quiz.status === "completed" ? "bg-green-500/20" : "bg-yellow-500/20"
                    }`}>
                      {quiz.status === "completed" ? (
                        <Trophy className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium text-foreground">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {quiz.quiz_type?.toUpperCase()} • {new Date(quiz.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {quiz.status === "completed" && quiz.score !== null && (
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        {quiz.score}/{quiz.total_questions}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((quiz.score / (quiz.total_questions || 1)) * 100)}%
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
