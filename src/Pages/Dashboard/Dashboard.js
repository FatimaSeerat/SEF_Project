import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Button } from "../../components/UI/button";
import { toast } from "sonner";
import {
  Sparkles,
  LogOut,
  FileQuestion,
  Clock,
  Trophy,
  Plus,
  ChevronRight,
  BarChart3,
  Calendar,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/auth");
      } else {
        setUser(currentUser);
        setAuthLoading(false);
      }
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchQuizzes = async () => {
      try {
        const q = query(
          collection(db, "quizzes"),
          orderBy("created_at", "desc"),
          limit(10)
        );

        const snapshot = await getDocs(q);
        setQuizzes(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchQuizzes();
  }, [user]);

  const handleSignOut = async () => {
    await signOut(auth);
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D4C0E9] via-[#C3A6E0] to-[#CCB3E5] flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-[#68369B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const completedQuizzes = quizzes.filter(q => q.status === "completed");
  const totalScore = completedQuizzes.reduce((a, q) => a + (q.score || 0), 0);
  const totalQuestions = completedQuizzes.reduce(
    (a, q) => a + (q.total_questions || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4C0E9] via-[#C3A6E0] to-[#CCB3E5]">
      {/* Header */}
      <header className="bg-white/40 backdrop-blur-md border-b border-[#68369B]/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#68369B] to-[#9D64CF] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#68369B] to-[#9D64CF] opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold text-[#161721]">
              Quiz<span className="text-[#68369B]">Hub</span> AI
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSignOut}
              className="bg-white/60 hover:bg-white/80 text-[#68369B] border border-[#9D64CF]/30 rounded-lg px-4 py-2 font-medium text-sm transition-all"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#161721] mb-2">
            Welcome back, {user?.displayName || 'Student'}!
          </h1>
          <p className="text-lg text-[#68369B]">
            Ready to test your knowledge? Create a new quiz or review your progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <StatCard
            icon={<FileQuestion className="w-6 h-6" />}
            label="Total Quizzes"
            value={quizzes.length}
            gradient="from-[#68369B] to-[#9D64CF]"
            iconBg="bg-[#68369B]/20"
          />
          <StatCard
            icon={<Trophy className="w-6 h-6" />}
            label="Completed"
            value={completedQuizzes.length}
            gradient="from-[#9D64CF] to-[#CCB3E5]"
            iconBg="bg-[#9D64CF]/20"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Avg Score"
            value={`${totalQuestions ? Math.round((totalScore / totalQuestions) * 100) : 0}%`}
            gradient="from-[#CCB3E5] to-[#D4C0E9]"
            iconBg="bg-[#CCB3E5]/20"
          />
          <StatCard
            icon={<BarChart3 className="w-6 h-6" />}
            label="Total Points"
            value={`${totalScore}/${totalQuestions}`}
            gradient="from-[#68369B] to-[#CCB3E5]"
            iconBg="bg-[#68369B]/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-4">
            {/* Create Quiz Card */}
            <Link to="/quiz">
              <div className="bg-gradient-to-br from-[#68369B] to-[#9D64CF] rounded-2xl p-6 m-1 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">Create New Quiz</h2>
                      <p className="text-sm text-white/80">
                        Upload documents and generate AI-powered questions
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-7 h-7 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </Link>

            {/* Create TimeTable Card */}
            <Link to="/timetable">
              <div className="bg-gradient-to-br from-[#9D64CF] to-[#CCB3E5] rounded-2xl p-6 m-1 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">Create TimeTable</h2>
                      <p className="text-sm text-white/80">
                        Organize your study schedule with AI assistance
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-7 h-7 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </Link>

            {/* Recent Quizzes */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#68369B]/10">
              <h2 className="text-xl font-bold text-[#161721] mb-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#68369B]" />
                Recent Activity
              </h2>

              {dataLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-[#68369B] border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : quizzes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-[#CCB3E5]/30 flex items-center justify-center mx-auto mb-4">
                    <FileQuestion className="w-8 h-8 text-[#68369B]" />
                  </div>
                  <p className="text-[#68369B] mb-4">
                    No quizzes yet. Create your first one!
                  </p>
                  <Link to="/quiz">
                    <Button className="bg-gradient-to-r from-[#68369B] to-[#9D64CF] text-white rounded-lg px-6 py-2 font-semibold hover:shadow-lg transition-all">
                      Create Quiz
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="bg-white/80 rounded-xl p-4 border border-[#9D64CF]/20 hover:border-[#68369B]/40 transition-all flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            quiz.status === "completed"
                              ? "bg-gradient-to-br from-green-400 to-green-500"
                              : "bg-gradient-to-br from-yellow-400 to-orange-400"
                          }`}
                        >
                          {quiz.status === "completed" ? (
                            <Trophy className="w-6 h-6 text-white" />
                          ) : (
                            <Clock className="w-6 h-6 text-white" />
                          )}
                        </div>

                        <div>
                          <h3 className="font-semibold text-[#161721]">{quiz.title}</h3>
                          <p className="text-sm text-[#68369B]">
                            {quiz.quiz_type?.toUpperCase()} •{" "}
                            {new Date(quiz.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {quiz.status === "completed" && (
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#161721]">
                            {quiz.score}/{quiz.total_questions}
                          </p>
                          <p className="text-sm text-[#68369B]">
                            {Math.round(
                              (quiz.score / (quiz.total_questions || 1)) * 100
                            )}%
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Profile & Quick Stats */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#68369B]/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#68369B] to-[#9D64CF] flex items-center justify-center text-white text-2xl font-bold">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-[#161721]">{user?.displayName || 'Student'}</h3>
                  <p className="text-sm text-[#68369B]">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#68369B]">Member since</span>
                  <span className="text-sm font-semibold text-[#161721]">
                    {new Date(user?.metadata?.creationTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#68369B]">Status</span>
                  <span className="text-sm font-semibold text-green-600">Active</span>
                </div>
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#68369B]/10">
              <h3 className="font-bold text-[#161721] mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#68369B]" />
                Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#68369B]">Completion Rate</span>
                    <span className="font-semibold text-[#161721]">
                      {quizzes.length > 0 ? Math.round((completedQuizzes.length / quizzes.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#D4C0E9] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#68369B] to-[#9D64CF] rounded-full transition-all"
                      style={{ width: `${quizzes.length > 0 ? (completedQuizzes.length / quizzes.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#68369B]">Average Score</span>
                    <span className="font-semibold text-[#161721]">
                      {totalQuestions ? Math.round((totalScore / totalQuestions) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#D4C0E9] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#9D64CF] to-[#CCB3E5] rounded-full transition-all"
                      style={{ width: `${totalQuestions ? (totalScore / totalQuestions) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#68369B]/10">
              <h3 className="font-bold text-[#161721] mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#68369B]" />
                Achievements
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🏆", label: "First Quiz", unlocked: quizzes.length >= 1 },
                  { icon: "🎯", label: "5 Quizzes", unlocked: quizzes.length >= 5 },
                  { icon: "⭐", label: "Perfect Score", unlocked: completedQuizzes.some(q => q.score === q.total_questions) },
                ].map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-[#68369B] to-[#9D64CF] text-white shadow-lg'
                        : 'bg-white/50 text-[#9D64CF]/30'
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <span className="text-xs font-medium text-center px-1">{achievement.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const StatCard = ({ icon, label, value, gradient, iconBg }) => (
  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-[#68369B]/10 hover:shadow-xl transition-all">
    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-3 text-[#68369B]`}>
      {icon}
    </div>
    <p className="text-sm text-[#68369B] mb-1">{label}</p>
    <p className="text-2xl font-bold text-[#161721]">{value}</p>
  </div>
);