import { CheckCircle2, Clock3, Lightbulb, XCircle } from "lucide-react";

export default function QuestionModal({
  question,
  timeLeft,
  selectedAnswer,
  result,
  onAnswer,
  onContinue,
}) {
  if (!question) return null;

  const letters = ["A", "B", "C", "D"];

  return (
    <div className="modal-backdrop">
      <section className="question-modal" role="dialog" aria-modal="true" aria-labelledby="question-title">
        <div className="question-modal-top">
          <span className="eyebrow"><Lightbulb size={14} /> TANTANGAN BAHASA ARAB</span>
          {!result && (
            <span className={`timer-pill ${timeLeft <= 5 ? "timer-warning" : ""}`}>
              <Clock3 size={15} /> {timeLeft} detik
            </span>
          )}
        </div>
        <div className="question-meta">
          <span>{question.category}</span>
          <span className="meta-separator">•</span>
          <span>{question.theme}</span>
          <span className="difficulty-tag">{question.difficulty}</span>
        </div>
        {question.arabic && (
          <div className="arabic-prompt" dir="rtl" lang="ar">{question.arabic}</div>
        )}
        <h2 id="question-title" className="question-title">{question.question}</h2>
        <div className="answer-list">
          {question.options.map((option, index) => {
            const isCorrect = result && index === question.answer;
            const isWrongSelected = result && selectedAnswer === index && !result.correct;
            return (
              <button
                key={index}
                className={`answer-option ${selectedAnswer === index ? "selected" : ""} ${isCorrect ? "answer-correct" : ""} ${isWrongSelected ? "answer-wrong" : ""}`}
                onClick={() => onAnswer(index)}
                disabled={Boolean(result)}
              >
                <span className="answer-letter">{letters[index]}</span>
                <span className="answer-text">{option}</span>
                {isCorrect && <CheckCircle2 size={19} />}
                {isWrongSelected && <XCircle size={19} />}
              </button>
            );
          })}
        </div>
        {result && (
          <div className={`answer-feedback ${result.correct ? "feedback-correct" : "feedback-wrong"}`}>
            <strong>{result.correct ? "Tepat sekali! +10 poin" : "Belum tepat, tetap semangat!"}</strong>
            <p>{result.explanation}</p>
            {!result.correct && <small>Jawaban benar: {question.options[question.answer]}</small>}
          </div>
        )}
        <div className="question-modal-bottom">
          <span className="question-points">Jawaban benar <b>+10 poin</b></span>
          {result ? (
            <button className="btn btn-primary" onClick={onContinue}>Lanjutkan permainan</button>
          ) : (
            <span className="question-hint">Pilih satu jawaban terbaik</span>
          )}
        </div>
      </section>
    </div>
  );
}
