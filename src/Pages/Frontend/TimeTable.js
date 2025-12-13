import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "../../components/UI/button";
import { Input } from "../../components/UI/input";
import { Label } from "../../components/UI/label";
import { toast } from "sonner";
import { Calendar, ArrowLeft, Plus, X, Loader2, Clock } from "lucide-react";

export default function TimeTable() {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [preference, setPreference] = useState("medium");
    const [availableHours, setAvailableHours] = useState(4);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) setUser(currentUser);
            else navigate("/auth");
        });
        return unsubscribe;
    }, [navigate]);

    const addCourse = () => {
        if (!courseName.trim()) {
            toast.error("Please enter a course name");
            return;
        }

        const newCourse = {
            id: Date.now().toString(),
            name: courseName,
            preference: preference
        };

        setCourses([...courses, newCourse]);
        setCourseName("");
        toast.success("Course added!");
    };

    const removeCourse = (id) => {
        setCourses(courses.filter(course => course.id !== id));
        toast.success("Course removed");
    };

    const generateTimeTable = async () => {
        if (courses.length === 0) {
            toast.error("Please add at least one course");
            return;
        }

        setLoading(true);
        
        // TODO: Implement timetable generation
        setTimeout(() => {
            toast.info("Timetable generation - Coming soon!");
            setLoading(false);
        }, 1500);
    };

    if (!user) return null;

    const getPreferenceColor = (pref) => {
        switch(pref) {
            case 'high': return 'from-[#68369B] to-[#9D64CF]';
            case 'medium': return 'from-[#9D64CF] to-[#CCB3E5]';
            case 'low': return 'from-[#CCB3E5] to-[#D4C0E9]';
            default: return 'from-[#9D64CF] to-[#CCB3E5]';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#D4C0E9] via-[#C3A6E0] to-[#CCB3E5]">
            {/* Header */}
            <header className="bg-white/40 backdrop-blur-md border-b border-[#68369B]/10 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 text-[#68369B] hover:text-[#9D64CF] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-semibold text-sm">Back</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#68369B] to-[#9D64CF] flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-[#161721]">
                            TimeTable Generator
                        </span>
                    </div>
                    <div className="w-16"></div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-6xl">
                <div className="space-y-5">
                    {/* Hero */}
                    <div className="text-center space-y-2 py-3">
                        <h1 className="text-3xl font-bold text-[#161721]">
                            Create Your TimeTable
                        </h1>
                        <p className="text-sm text-[#68369B]">
                            Add your courses and set preferences to generate an optimal study schedule
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Left Column - Course Management */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Add Course Card */}
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow border border-[#68369B]/10">
                                <Label className="text-[#161721] text-sm font-semibold mb-3 block">
                                    Add Course
                                </Label>
                                <div className="space-y-3">
                                    <Input
                                        value={courseName}
                                        onChange={(e) => setCourseName(e.target.value)}
                                        placeholder="e.g., Data Structures"
                                        className="bg-white border-[#9D64CF]/30 text-[#161721] placeholder:text-[#9D64CF]/50 h-10 focus:border-[#68369B] focus:ring-1 focus:ring-[#68369B]/20 rounded-lg"
                                        onKeyPress={(e) => e.key === 'Enter' && addCourse()}
                                    />
                                    
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <Label className="text-[#161721] text-xs font-semibold mb-2 block">
                                                Priority
                                            </Label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['low', 'medium', 'high'].map(pref => (
                                                    <button
                                                        key={pref}
                                                        onClick={() => setPreference(pref)}
                                                        className={`py-2 rounded-lg font-medium text-xs capitalize transition-all ${
                                                            preference === pref
                                                                ? 'bg-gradient-to-br from-[#68369B] to-[#9D64CF] text-white shadow'
                                                                : 'bg-white border border-[#9D64CF]/30 text-[#68369B] hover:border-[#68369B]'
                                                        }`}
                                                    >
                                                        {pref}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-end">
                                            <Button
                                                onClick={addCourse}
                                                className="h-10 px-6 bg-gradient-to-r from-[#68369B] to-[#9D64CF] hover:from-[#68369B] hover:to-[#68369B] text-white font-semibold rounded-lg"
                                            >
                                                <Plus className="w-4 h-4 mr-1" />
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Courses List */}
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow border border-[#68369B]/10">
                                <Label className="text-[#161721] text-sm font-semibold mb-3 block">
                                    Your Courses ({courses.length})
                                </Label>
                                
                                {courses.length === 0 ? (
                                    <div className="text-center py-8 text-[#9D64CF]">
                                        <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No courses added yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        {courses.map((course) => (
                                            <div
                                                key={course.id}
                                                className="flex items-center justify-between bg-white/80 rounded-lg p-3 border border-[#9D64CF]/20 group hover:border-[#68369B]/40 transition-all"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getPreferenceColor(course.preference)} flex items-center justify-center`}>
                                                        <Calendar className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[#161721] font-semibold text-sm">{course.name}</span>
                                                        <span className="text-[#9D64CF] text-xs capitalize">{course.preference} priority</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeCourse(course.id)}
                                                    className="text-[#9D64CF] hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Generate Button */}
                            <Button
                                onClick={generateTimeTable}
                                disabled={loading || courses.length === 0}
                                className="w-full h-11 bg-gradient-to-r from-[#68369B] to-[#9D64CF] hover:from-[#68369B] hover:to-[#68369B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Generating TimeTable...
                                    </>
                                ) : (
                                    <>
                                        <Calendar className="w-5 h-5 mr-2" />
                                        Generate TimeTable
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Right Column - Settings */}
                        <div className="space-y-4">
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow border border-[#68369B]/10">
                                <h3 className="text-[#161721] font-bold text-base mb-4">
                                    Schedule Settings
                                </h3>

                                <div className="space-y-4">
                                    {/* Available Hours */}
                                    <div>
                                        <Label className="text-[#161721] text-xs font-semibold mb-2 block">
                                            Daily Study Hours
                                        </Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[2, 4, 6, 8].map(hours => (
                                                <button
                                                    key={hours}
                                                    onClick={() => setAvailableHours(hours)}
                                                    className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                                                        availableHours === hours
                                                            ? 'bg-gradient-to-br from-[#68369B] to-[#9D64CF] text-white shadow'
                                                            : 'bg-white border border-[#9D64CF]/30 text-[#68369B] hover:border-[#68369B]'
                                                    }`}
                                                >
                                                    {hours}h
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Start Time */}
                                    <div>
                                        <Label htmlFor="startTime" className="text-[#161721] text-xs font-semibold mb-2 block">
                                            Start Time
                                        </Label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9D64CF]" />
                                            <Input
                                                id="startTime"
                                                type="time"
                                                value={startTime}
                                                onChange={(e) => setStartTime(e.target.value)}
                                                className="bg-white border-[#9D64CF]/30 text-[#161721] h-10 focus:border-[#68369B] focus:ring-1 focus:ring-[#68369B]/20 rounded-lg pl-10"
                                            />
                                        </div>
                                    </div>

                                    {/* End Time */}
                                    <div>
                                        <Label htmlFor="endTime" className="text-[#161721] text-xs font-semibold mb-2 block">
                                            End Time
                                        </Label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9D64CF]" />
                                            <Input
                                                id="endTime"
                                                type="time"
                                                value={endTime}
                                                onChange={(e) => setEndTime(e.target.value)}
                                                className="bg-white border-[#9D64CF]/30 text-[#161721] h-10 focus:border-[#68369B] focus:ring-1 focus:ring-[#68369B]/20 rounded-lg pl-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Study Days */}
                                    <div>
                                        <Label className="text-[#161721] text-xs font-semibold mb-2 block">
                                            Study Days
                                        </Label>
                                        <div className="space-y-2">
                                            <button className="w-full py-2 rounded-lg font-medium text-sm transition-all bg-gradient-to-br from-[#68369B] to-[#9D64CF] text-white shadow">
                                                Weekdays Only
                                            </button>
                                            <button className="w-full py-2 rounded-lg font-medium text-sm transition-all bg-white border border-[#9D64CF]/30 text-[#68369B] hover:border-[#68369B]">
                                                All Week
                                            </button>
                                            <button className="w-full py-2 rounded-lg font-medium text-sm transition-all bg-white border border-[#9D64CF]/30 text-[#68369B] hover:border-[#68369B]">
                                                Custom
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}