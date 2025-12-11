import { useState } from "react";
import { Button } from "../ui/button";
import { CheckCircle, XCircle, ChevronRight, ChevronLeft } from "lucide-react";

export default function QuizTaker({ questions, quizType, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [openEndedMarks, setOpenEndedMarks] = useState(new Array(questions.length).fill(false));

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const setOpenEndedAnswer = (text) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = text;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (isLastQuestion) {
      if (quizType === "mcq") {
        let score = 0;
        for (let i = 0; i < answers.length; i++) {
          if (typeof answers[i] === "number" && answers[i] === questions[i].correctIndex) {
            score++;
          }
        }
        onComplete(answers.map((a, i) => ({ questionId: questions[i].id, answer: a })), score);
      } else {
        setShowResults(true);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const toggleMark = (index) => {
    const newMarks = [...openEndedMarks];
    newMarks[index] = !newMarks[index];
    setOpenEndedMarks(newMarks);
  };

  const submitOpenEnded = () => {
    const score = openEndedMarks.filter(Boolean).length;
    onComplete(
      answers.map((a, i) => ({
        questionId: questions[i].id,
        answer: a,
        marked: openEndedMarks[i],
      })),
      score
    );
  };

  // --- Results view for open-ended quiz ---
  if (showResults && quizType === "open-ended") {
    return (
      <div className="space-y-6 ">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Review Your Answers</h2>
          <p className="text-muted-foreground">Mark each answer as correct or incorrect</p>
        </div>

        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="glass rounded-xl p-6 border border-white/10">
              <p className="font-medium text-foreground mb-3">{idx + 1}. {q.prompt}</p>

              <div className="bg-secondary/50 rounded-lg p-4 mb-3">
                <p className="text-sm text-muted-foreground mb-1">Your answer:</p>
                <p className="text-foreground">{answers[idx] || "No answer provided"}</p>
              </div>

              {q.sampleAnswer && (
                <div className="bg-primary/10 rounded-lg p-4 mb-3">
                  <p className="text-sm text-primary mb-1">Sample answer:</p>
                  <p className="text-foreground text-sm">{q.sampleAnswer}</p>
                </div>
              )}

              <button
                onClick={() => toggleMark(idx)}
                className={`w-full py-3 rounded-lg border flex items-center justify-center gap-2 transition-colors ${
                  openEndedMarks[idx]
                    ? "bg-green-500/20 border-green-500 text-green-500"
                    : "bg-secondary/50 border-white/10 text-muted-foreground hover:border-green-500/50"
                }`}
              >
                {openEndedMarks[idx] ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Marked Correct
                  </>
                ) : (
                  "Mark as Correct"
                )}
              </button>
            </div>
          ))}
        </div>

        <Button onClick={submitOpenEnded} className="w-full" variant="hero" size="lg">
          Submit Results ({openEndedMarks.filter(Boolean).length}/{questions.length} correct)
        </Button>
      </div>
    );
  }

  // --- Question view ---
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex-1 mx-4 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass rounded-2xl p-8 border border-white/10">
        <h2 className="text-xl font-bold text-foreground mb-6">{currentQuestion.prompt}</h2>

        {quizType === "mcq" && currentQuestion.options ? (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  answers[currentIndex] === idx
                    ? "bg-primary/20 border-primary text-foreground"
                    : "bg-secondary/50 border-white/10 text-foreground hover:border-primary/50"
                }`}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary mr-3 text-sm font-medium">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>
        ) : (
          <textarea
            value={answers[currentIndex] || ""}
            onChange={(e) => setOpenEndedAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-40 bg-secondary/50 border border-white/10 rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary"
          />
        )}
      </div>

      <div className="flex gap-3">
        <Button onClick={goPrev} variant="outline" disabled={currentIndex === 0} className="flex-1">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={goNext}
          variant="hero"
          disabled={answers[currentIndex] === null}
          className="flex-1"
        >
          {isLastQuestion ? "Finish" : "Next"}
          {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
