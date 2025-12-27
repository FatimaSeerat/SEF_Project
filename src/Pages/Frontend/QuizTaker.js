// import { useState } from "react";
// import { Button } from "../../components/UI/button";
// import { CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";

// export default function QuizTaker({ questions, quizType, onComplete }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
//   const [showResults, setShowResults] = useState(false);
//   const [openEndedMarks, setOpenEndedMarks] = useState(new Array(questions.length).fill(false));

//   const currentQuestion = questions[currentIndex];
//   const isLastQuestion = currentIndex === questions.length - 1;

//   const selectAnswer = (answerIndex) => {
//     const newAnswers = [...answers];
//     newAnswers[currentIndex] = answerIndex;
//     setAnswers(newAnswers);
//   };

//   const setOpenEndedAnswer = (text) => {
//     const newAnswers = [...answers];
//     newAnswers[currentIndex] = text;
//     setAnswers(newAnswers);
//   };

//   const goNext = () => {
//     if (isLastQuestion) {
//       if (quizType === "mcq") {
//         let score = 0;
//         for (let i = 0; i < answers.length; i++) {
//           if (typeof answers[i] === "number" && answers[i] === questions[i].correctIndex) {
//             score++;
//           }
//         }
//         onComplete(answers.map((a, i) => ({ questionId: questions[i].id, answer: a })), score);
//       } else {
//         setShowResults(true);
//       }
//     } else {
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   const goPrev = () => {
//     if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
//   };

//   const toggleMark = (index) => {
//     const newMarks = [...openEndedMarks];
//     newMarks[index] = !newMarks[index];
//     setOpenEndedMarks(newMarks);
//   };

//   const submitOpenEnded = () => {
//     const score = openEndedMarks.filter(Boolean).length;
//     onComplete(
//       answers.map((a, i) => ({
//         questionId: questions[i].id,
//         answer: a,
//         marked: openEndedMarks[i],
//       })),
//       score
//     );
//   };

//   // --- Results view for open-ended quiz ---
//   if (showResults && quizType === "open-ended") {
//     return (
//       <div className="space-y-6">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-[#161721] mb-2">Review Your Answers</h2>
//           <p className="text-[#68369B]">Mark each answer as correct or incorrect</p>
//         </div>

//         <div className="space-y-4">
//           {questions.map((q, idx) => (
//             <div key={q.id} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow border border-[#68369B]/10">
//               <p className="font-medium text-[#161721] mb-3">{idx + 1}. {q.prompt}</p>

//               <div className="bg-[#CCB3E5]/30 rounded-lg p-4 mb-3">
//                 <p className="text-sm text-[#68369B] mb-1">Your answer:</p>
//                 <p className="text-[#161721]">{answers[idx] || "No answer provided"}</p>
//               </div>

//               {q.sampleAnswer && (
//                 <div className="bg-[#68369B]/10 rounded-lg p-4 mb-3">
//                   <p className="text-sm text-[#68369B] mb-1 font-semibold">Sample answer:</p>
//                   <p className="text-[#161721] text-sm">{q.sampleAnswer}</p>
//                 </div>
//               )}

//               <button
//                 onClick={() => toggleMark(idx)}
//                 className={`w-full py-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${
//                   openEndedMarks[idx]
//                     ? "bg-green-500/20 border-green-500 text-green-600 font-semibold"
//                     : "bg-white/50 border-[#9D64CF]/30 text-[#68369B] hover:border-green-500/50"
//                 }`}
//               >
//                 {openEndedMarks[idx] ? (
//                   <>
//                     <CheckCircle className="w-4 h-4" />
//                     Marked Correct
//                   </>
//                 ) : (
//                   "Mark as Correct"
//                 )}
//               </button>
//             </div>
//           ))}
//         </div>

//         <Button 
//           onClick={submitOpenEnded} 
//           className="w-full h-12 bg-gradient-to-r from-[#68369B] to-[#9D64CF] hover:from-[#68369B] hover:to-[#68369B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
//         >
//           Submit Results ({openEndedMarks.filter(Boolean).length}/{questions.length} correct)
//         </Button>
//       </div>
//     );
//   }

//   // --- Question view ---
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between mb-4">
//         <span className="text-sm text-[#68369B] font-medium">
//           Question {currentIndex + 1} of {questions.length}
//         </span>
//         <div className="flex-1 mx-4 h-2 bg-white/40 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-[#68369B] to-[#9D64CF] transition-all duration-300"
//             style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
//           />
//         </div>
//       </div>

//       <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow border border-[#68369B]/10">
//         <h2 className="text-xl font-bold text-[#161721] mb-6">{currentQuestion.prompt}</h2>

//         {quizType === "mcq" && currentQuestion.options ? (
//           <div className="space-y-3">
//             {currentQuestion.options.map((option, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => selectAnswer(idx)}
//                 className={`w-full text-left p-4 rounded-xl border transition-all ${
//                   answers[currentIndex] === idx
//                     ? "bg-[#68369B]/20 border-[#68369B] text-[#161721] shadow-md"
//                     : "bg-white/50 border-[#9D64CF]/20 text-[#161721] hover:border-[#68369B]/50 hover:bg-[#CCB3E5]/20"
//                 }`}
//               >
//                 <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#CCB3E5]/50 mr-3 text-sm font-semibold text-[#68369B]">
//                   {String.fromCharCode(65 + idx)}
//                 </span>
//                 {option}
//               </button>
//             ))}
//           </div>
//         ) : (
//           <textarea
//             value={answers[currentIndex] || ""}
//             onChange={(e) => setOpenEndedAnswer(e.target.value)}
//             placeholder="Type your answer here..."
//             className="w-full h-40 bg-white/50 border border-[#9D64CF]/30 rounded-xl p-4 text-[#161721] placeholder:text-[#9D64CF]/50 resize-none focus:outline-none focus:border-[#68369B] focus:ring-2 focus:ring-[#68369B]/20"
//           />
//         )}
//       </div>

//       <div className="flex gap-3">
//         <Button 
//           onClick={goPrev} 
//           disabled={currentIndex === 0} 
//           className="flex-1 h-11 bg-white/80 hover:bg-white text-[#68369B] border border-[#9D64CF]/30 hover:border-[#68369B] font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <ChevronLeft className="w-4 h-4 mr-2" />
//           Previous
//         </Button>
//         <Button
//           onClick={goNext}
//           disabled={answers[currentIndex] === null || (quizType === "open-ended" && !answers[currentIndex]?.trim())}
//           className="flex-1 h-11 bg-gradient-to-r from-[#68369B] to-[#9D64CF] hover:from-[#68369B] hover:to-[#68369B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLastQuestion ? "Finish" : "Next"}
//           {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
//         </Button>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Button } from "../../components/UI/button";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function QuizTaker({ questions, quizType, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Debug: Log questions to see what we're receiving
  console.log("QuizTaker received questions:", questions);
  console.log("QuizTaker quizType:", quizType);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // Debug: Log current question
  console.log("Current question:", currentQuestion);

  const handleAnswer = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    let score = 0;
    
    if (quizType === "mcq") {
      questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctIndex) {
          score++;
        }
      });
    }
    
    setShowResults(true);
    onComplete(userAnswers, score);
  };

  if (!currentQuestion) {
    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center">
        <p className="text-[#68369B] text-lg">No questions available</p>
      </div>
    );
  }

  if (showResults) {
    const score = quizType === "mcq" 
      ? questions.filter((q, idx) => userAnswers[idx] === q.correctIndex).length 
      : 0;

    return (
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#68369B] to-[#9D64CF] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[#161721]">Quiz Complete!</h2>
        {quizType === "mcq" && (
          <div className="space-y-2">
            <p className="text-5xl font-bold text-[#68369B]">
              {score}/{questions.length}
            </p>
            <p className="text-[#68369B]">
              {Math.round((score / questions.length) * 100)}% Correct
            </p>
          </div>
        )}
        <p className="text-[#68369B]">
          {quizType === "mcq" 
            ? "Great job! Check your answers above."
            : "Your answers have been recorded."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow border border-[#68369B]/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[#161721]">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-[#68369B]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-[#CCB3E5]/30 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#68369B] to-[#9D64CF] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow border border-[#68369B]/10 min-h-[400px]">
        <h3 className="text-2xl font-bold text-[#161721] mb-6">
          {currentQuestion.prompt || currentQuestion.question || "Question not available"}
        </h3>

        {/* Multiple Choice Options */}
        {quizType === "mcq" && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${
                  userAnswers[currentIndex] === idx
                    ? 'border-[#68369B] bg-gradient-to-br from-[#68369B]/10 to-[#9D64CF]/10 text-[#161721]'
                    : 'border-[#9D64CF]/30 bg-white hover:border-[#68369B] text-[#68369B]'
                }`}
              >
                <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-[#68369B] to-[#9D64CF] text-white text-center leading-8 mr-3">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Open-Ended Answer */}
        {quizType === "open-ended" && (
          <div className="space-y-4">
            <textarea
              value={userAnswers[currentIndex] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full min-h-[200px] bg-white border-2 border-[#9D64CF]/30 text-[#161721] placeholder:text-[#9D64CF]/50 focus:border-[#68369B] focus:ring-1 focus:ring-[#68369B]/20 rounded-xl resize-none p-4 focus:outline-none"
            />
            {currentQuestion.sampleAnswer && (
              <details className="bg-[#CCB3E5]/20 rounded-lg p-4 border border-[#9D64CF]/30">
                <summary className="cursor-pointer font-semibold text-[#68369B] hover:text-[#68369B]">
                  View Sample Answer
                </summary>
                <p className="mt-3 text-[#161721] text-sm leading-relaxed">
                  {currentQuestion.sampleAnswer}
                </p>
              </details>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          variant="outline"
          className="h-11 px-6 border-2 border-[#9D64CF]/30 text-[#68369B] hover:border-[#68369B] hover:bg-[#CCB3E5]/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Previous
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button
            onClick={handleFinish}
            className="h-11 px-8 bg-gradient-to-r from-[#68369B] to-[#9D64CF] hover:from-[#68369B] hover:to-[#68369B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Finish
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="h-11 px-8 bg-gradient-to-r from-[#68369B] to-[#9D64CF] hover:from-[#68369B] hover:to-[#68369B] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        )}
      </div>

      {/* Question Counter */}
      <div className="flex justify-center gap-2 flex-wrap">
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
              idx === currentIndex
                ? 'bg-gradient-to-br from-[#68369B] to-[#9D64CF] text-white shadow'
                : userAnswers[idx] !== undefined
                ? 'bg-[#CCB3E5]/40 text-[#68369B] border border-[#68369B]/30'
                : 'bg-white border border-[#9D64CF]/30 text-[#9D64CF] hover:border-[#68369B]'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}