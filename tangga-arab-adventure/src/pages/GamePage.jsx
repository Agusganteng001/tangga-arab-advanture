import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, AudioLines, Bomb, BookOpen, Dices, Gift, Heart, History, Shield, Trophy, Volume2 } from "lucide-react";
import Board from "../components/Board.jsx";
import QuestionModal from "../components/QuestionModal.jsx";
import { getCellMeta } from "../data/board.js";
import { pickQuestion } from "../data/questions.js";

const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function GamePage({ initialPlayers, onFinish, onExit }) {
  const [players, setPlayers] = useState(() => initialPlayers.map((player) => ({
    ...player, position: 1, score: 0, correct: 0, wrong: 0, shield: 0,
  })));
  const [currentTurn, setCurrentTurn] = useState(0);
  const [dice, setDice] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionResult, setQuestionResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [logs, setLogs] = useState(["Permainan dimulai. Semoga beruntung!"]);
  const [lastAction, setLastAction] = useState("Tekan tombol dadu untuk memulai giliran.");
  const [gameOver, setGameOver] = useState(false);

  const currentPlayer = players[currentTurn];

  const finish = (winner, finalPlayers, finalLogs) => {
    setGameOver(true);
    window.setTimeout(() => onFinish({
      winner: { ...winner },
      players: finalPlayers.map((player) => ({ ...player })),
      logs: finalLogs,
      totalQuestions: finalPlayers.reduce((sum, player) => sum + player.correct + player.wrong, 0),
    }), 650);
  };

  const handleRoll = () => {
    if (isRolling || activeQuestion || gameOver || !currentPlayer) return;
    setIsRolling(true);
    setLastAction(`${currentPlayer.name} sedang melempar dadu...`);

    window.setTimeout(() => {
      const rolled = Math.floor(Math.random() * 6) + 1;
      setDice(rolled);
      setIsRolling(false);

      const nextPlayers = players.map((player) => ({ ...player }));
      const actor = nextPlayers[currentTurn];
      const previousPosition = actor.position;
      const target = previousPosition + rolled;
      let message = `${actor.name} mendapat angka ${rolled}.`;
      let questionTile = false;

      if (target > 30) {
        message += " Angka melebihi FINISH, posisi tetap.";
      } else {
        actor.position = target;
        const tile = getCellMeta(target);

        if (tile.type === "ladder") {
          actor.position = tile.to;
          message += ` Naik tangga dari ${target} ke ${tile.to}!`;
        } else if (tile.type === "snake") {
          if (actor.shield > 0) {
            actor.shield -= 1;
            message += " Perisai melindungi dari ular!";
          } else {
            actor.position = tile.to;
            message += ` Terkena ular, turun ke kotak ${tile.to}.`;
          }
        } else if (tile.type === "bomb") {
          if (actor.shield > 0) {
            actor.shield -= 1;
            message += " Perisai melindungi dari bom!";
          } else {
            actor.position = Math.max(1, actor.position - 3);
            actor.score = Math.max(0, actor.score - 5);
            message += " Terkena bom: mundur 3 kotak dan kehilangan 5 poin.";
          }
        } else if (tile.type === "booster") {
          actor.score += 10;
          actor.shield += 1;
          message += " Booster aktif: +10 poin dan mendapat 1 perisai.";
        } else if (tile.type === "question") {
          questionTile = true;
          message += " Berhenti di kotak soal!";
        }
      }

      const nextLogs = [message, ...logs].slice(0, 6);
      setPlayers(nextPlayers);
      setLogs(nextLogs);
      setLastAction(message);

      if (actor.position === 30) {
        message += " FINISH! Pemenang ditemukan.";
        const finalLogs = [message, ...logs].slice(0, 6);
        setLogs(finalLogs);
        setLastAction(message);
        finish(actor, nextPlayers, finalLogs);
        return;
      }

      if (questionTile) {
        const question = pickQuestion(usedQuestionIds);
        setUsedQuestionIds((current) => [...current, question.id]);
        setActiveQuestion(question);
        setSelectedAnswer(null);
        setQuestionResult(null);
        setTimeLeft(20);
      } else {
        setCurrentTurn((turn) => (turn + 1) % players.length);
      }
    }, 650);
  };

  const handleAnswer = useCallback((answerIndex) => {
    if (!activeQuestion || questionResult) return;
    const isCorrect = answerIndex === activeQuestion.answer;
    const nextPlayers = players.map((player) => ({ ...player }));
    const actor = nextPlayers[currentTurn];

    if (isCorrect) {
      actor.score += 10;
      actor.correct += 1;
    } else {
      actor.wrong += 1;
    }

    setPlayers(nextPlayers);
    setSelectedAnswer(answerIndex);
    setQuestionResult({
      correct: isCorrect,
      explanation: activeQuestion.explanation,
    });
    const text = isCorrect
      ? `${actor.name} menjawab benar dan mendapat 10 poin.`
      : `${actor.name} belum tepat menjawab soal.`;
    setLastAction(text);
    setLogs((current) => [text, ...current].slice(0, 6));
  }, [activeQuestion, questionResult, players, currentTurn]);

  useEffect(() => {
    if (!activeQuestion || questionResult) return undefined;
    setTimeLeft(20);
    const timer = window.setInterval(() => {
      setTimeLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeQuestion, questionResult]);

  useEffect(() => {
    if (activeQuestion && timeLeft === 0 && !questionResult) {
      handleAnswer(-1);
    }
  }, [timeLeft, activeQuestion, questionResult, handleAnswer]);

  const continueAfterQuestion = () => {
    setActiveQuestion(null);
    setSelectedAnswer(null);
    setQuestionResult(null);
    setCurrentTurn((turn) => (turn + 1) % players.length);
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score || b.position - a.position);

  return (
    <main className="page-container game-page">
      <div className="game-heading">
        <button className="back-link" onClick={onExit}><ArrowLeft size={17} /> Keluar permainan</button>
        <div className="game-heading-center"><span className="live-dot" /> PERMAINAN BERLANGSUNG</div>
        <div className="turn-count">{players.length} pemain</div>
      </div>

      <div className="game-layout">
        <section className="board-section">
          <div className="board-title-row">
            <div><span className="section-kicker">PAPAN PETUALANGAN</span><h1>Kejar kotak <span>FINISH!</span></h1></div>
            <div className="board-mini-tag"><Dices size={15} /> 30 kotak</div>
          </div>
          <Board players={players} currentTurn={currentTurn} />
          <div className="board-instruction"><span className="instruction-icon">i</span> Berhenti di kotak soal untuk menjawab tantangan. Capai kotak 30 dengan angka dadu yang tepat untuk menang.</div>
        </section>

        <aside className="game-sidebar">
          <section className="turn-card">
            <div className="sidebar-label">GILIRAN SEKARANG</div>
            <div className="active-player">
              <span className="active-avatar" style={{ backgroundColor: currentPlayer?.color }}>{currentPlayer?.avatar}</span>
              <div><strong>{currentPlayer?.name}</strong><span>Kotak {currentPlayer?.position} dari 30</span></div>
              <span className="turn-indicator">AKTIF</span>
            </div>
            <div className="progress-track"><span style={{ width: `${((currentPlayer?.position || 1) / 30) * 100}%` }} /></div>
            <div className="turn-stats">
              <div><Trophy size={15} /><strong>{currentPlayer?.score || 0}</strong><span>poin</span></div>
              <div><Shield size={15} /><strong>{currentPlayer?.shield || 0}</strong><span>perisai</span></div>
              <div><Heart size={15} /><strong>{currentPlayer?.correct || 0}</strong><span>benar</span></div>
            </div>
            <div className="dice-area">
              <div className={`dice-face ${isRolling ? "dice-rolling" : ""}`}>{DICE_FACES[dice - 1]}</div>
              <button className="btn btn-primary roll-button" onClick={handleRoll} disabled={isRolling || Boolean(activeQuestion) || gameOver}>
                <Dices size={18} /> {isRolling ? "Melempar..." : "Lempar dadu"}
              </button>
              <small>Angka dadu menentukan langkahmu</small>
            </div>
          </section>

          <section className="score-card">
            <div className="sidebar-section-title"><span><Trophy size={16} /> Papan skor</span><span className="small-muted">TERKINI</span></div>
            <div className="score-list">
              {sortedPlayers.map((player, index) => (
                <div className={`score-row ${player.id === currentPlayer?.id ? "score-row-active" : ""}`} key={player.id}>
                  <span className="rank-number">{index + 1}</span>
                  <span className="score-avatar" style={{ backgroundColor: player.color }}>{player.avatar}</span>
                  <div className="score-player-name"><strong>{player.name}</strong><small>Kotak {player.position}</small></div>
                  <strong className="score-value">{player.score}<small>pt</small></strong>
                </div>
              ))}
            </div>
          </section>

          <section className="activity-card">
            <div className="sidebar-section-title"><span><History size={16} /> Aktivitas</span><AudioLines size={15} className="muted-icon" /></div>
            <p className="last-action">{lastAction}</p>
            <div className="activity-list">
              {logs.slice(0, 4).map((log, index) => <div className="activity-item" key={`${log}-${index}`}><span className="activity-bullet" />{log}</div>)}
            </div>
          </section>
        </aside>
      </div>
      <QuestionModal
        question={activeQuestion}
        timeLeft={timeLeft}
        selectedAnswer={selectedAnswer}
        result={questionResult}
        onAnswer={handleAnswer}
        onContinue={continueAfterQuestion}
      />
      {gameOver && <div className="finishing-toast"><Trophy size={18} /> Permainan selesai! Menyiapkan hasil...</div>}
    </main>
  );
}
