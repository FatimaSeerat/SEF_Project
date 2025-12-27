import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path if needed

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: '#9D7BC4' }}>
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ backgroundColor: '#9D7BC4' }}>
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#68369B', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#8B5FC7', stopOpacity: 0.6 }} />
              </linearGradient>
              <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#5A2D82', stopOpacity: 0.7 }} />
                <stop offset="100%" style={{ stopColor: '#7B4FA8', stopOpacity: 0.5 }} />
              </linearGradient>
            </defs>
            <polygon points="0,0 400,0 200,300" fill="url(#grad1)" opacity="0.7" />
            <polygon points="400,0 800,0 600,400" fill="url(#grad2)" opacity="0.6" />
            <polygon points="0,300 300,600 0,600" fill="url(#grad1)" opacity="0.65" />
            <polygon points="500,400 800,600 800,400" fill="url(#grad2)" opacity="0.7" />
            <polygon points="200,200 500,300 300,500" fill="#7B4FA8" opacity="0.5" />
            <polygon points="100,100 350,150 250,350" fill="#68369B" opacity="0.4" />
            <polygon points="550,200 750,250 650,450" fill="#5A2D82" opacity="0.45" />
          </svg>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-28 h-28 rounded-2xl transform rotate-12 animate-pulse shadow-lg" style={{ backgroundColor: 'rgba(90, 45, 130, 0.35)' }}></div>
        <div className="absolute bottom-28 right-28 w-36 h-36 rounded-2xl transform -rotate-12 animate-pulse shadow-lg" style={{ backgroundColor: 'rgba(107, 79, 168, 0.35)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-2xl transform rotate-45 animate-pulse shadow-md" style={{ backgroundColor: 'rgba(123, 79, 168, 0.25)', animationDelay: '0.5s' }}></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-14 text-white">
          <div className="mb-6">
            <div className="flex items-center gap-2.5 mb-10">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#68369B' }}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-xl font-bold">QuizHub AI</span>
            </div>

            <h1 className="text-5xl font-bold mb-5 leading-tight">
              Study Smarter.<br />
              Generate Faster.<br />
              Learn Anywhere.
            </h1>

            <p className="text-base max-w-md text-white/90 leading-relaxed">
              From AI-generated quizzes to personalized study timetables,
              QuizHub AI helps you learn<br /> smarter — anytime, anywhere.
            </p>
          </div>

          <div className="flex gap-2.5 mt-8">
            <div className="w-12 h-1.5 rounded-full bg-white shadow-sm"></div>
            <div className="w-12 h-1.5 rounded-full bg-white/30"></div>
            <div className="w-12 h-1.5 rounded-full bg-white/30"></div>
          </div>
        </div>

        {/* Back to Website Link */}
        <Link to="/"
          className="absolute top-6 left-6 z-20 text-white/80 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Website
        </Link>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-10 my-4">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Welcome back!</h2>
            <p className="text-sm text-gray-600">Sign in to continue your learning journey.</p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {/* Email Input */}
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute -top-2 left-4 px-2 text-xs font-medium text-gray-700 bg-white z-10"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Input your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl outline-none transition-all text-sm placeholder-gray-400"
                onFocus={(e) => {
                  e.target.style.borderColor = '#9D7BC4';
                  e.target.style.boxShadow = '0 0 0 3px rgba(157, 123, 196, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-2 left-4 px-2 text-xs font-medium text-gray-700 bg-white z-10"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Input your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-2xl outline-none transition-all text-sm placeholder-gray-400"
                onFocus={(e) => {
                  e.target.style.borderColor = '#9D7BC4';
                  e.target.style.boxShadow = '0 0 0 3px rgba(157, 123, 196, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                  style={{ accentColor: '#9D7BC4' }}
                />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Remember Me</span>
              </label>
              <button
                type="button"
                className="font-medium hover:underline transition-all"
                style={{ color: '#68369B' }}
              >
                Forgot Password?
              </button>
            </div>


            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full text-white py-3 sm:py-3.5 rounded-2xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#68369B' }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#7B4FA8')}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#68369B'}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold hover:underline transition-all"
                style={{ color: '#9D7BC4' }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}