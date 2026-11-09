import { useState } from "react";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import SetupPage from "./pages/SetupPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import MaterialsPage from "./pages/MaterialsPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import { loadHistory, saveHistory } from "./utils/storage.js";

function GuidePage({ onBack, onStart }) {
  const rules = [
    ["Mulai dari kotak 1", "Setiap pemain menempati kotak START. Pemain bergiliran melempar dadu."],
    ["Ikuti angka dadu", "Karakter bergerak sesuai angka dadu. Jika langkah melewati kotak 30, pemain tetap di tempat."],
    ["Manfaatkan kotak khusus", "Tangga membuat pemain naik, ular membuat pemain turun, bom memberi penalti, dan booster memberi bonus serta perisai."],
    ["Jawab kartu soal", "Jika berhenti di kotak soal, pemain menjawab satu soal Bahasa Arab. Jawaban benar mendapat 10 poin."],
    ["Jadilah yang pertama FINISH", "Pemain yang mencapai kotak 30 dengan angka tepat menjadi pemenang. Skor digunakan untuk melihat hasil belajar."],
  ];
  return (
    <main className="page-container guide-page">
      <button className="back-link" onClick={onBack}>← Kembali</button>
      <div className="materials-heading">
        <div className="materials-icon">📘</div>
        <span className="section-kicker">PANDUAN PERMAINAN</span>
        <h1>Kenali aturan <span>petualangan</span></h1>
        <p>Baca aturan singkat berikut sebelum memulai permainan bersama teman.</p>
      </div>
      <div className="rules-list">
        {rules.map(([title, text], index) => (
          <article className="rule-row" key={title}>
            <span className="rule-number">0{index + 1}</span>
            <div><h2>{title}</h2><p>{text}</p></div>
          </article>
        ))}
      </div>
      <div className="rules-score-grid">
        <div><strong>+10</strong><span>Jawaban benar</span></div>
        <div><strong>+10</strong><span>Booster</span></div>
        <div><strong>-5</strong><span>Terkena bom</span></div>
        <div><strong>20 dtk</strong><span>Waktu menjawab</span></div>
      </div>
      <button className="btn btn-primary btn-large guide-start" onClick={onStart}>Saya siap bermain →</button>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => loadHistory());
  const [gameKey, setGameKey] = useState(0);

  const handleFinish = (payload) => {
    const record = { ...payload, id: Date.now(), playedAt: new Date().toISOString() };
    saveHistory(record);
    setHistory(loadHistory());
    setResult(record);
    setPage("result");
  };

  const startGame = (selectedPlayers) => {
    setPlayers(selectedPlayers);
    setGameKey((key) => key + 1);
    setPage("game");
  };

  const navigate = (destination) => {
    if (destination === "guide") setPage("guide");
    else setPage(destination);
  };

  return (
    <div className="app-shell">
      <Header page={page === "guide" ? "guide" : page} onNavigate={navigate} />
      {page === "home" && (
        <HomePage
          onStart={() => setPage("setup")}
          onMaterials={() => setPage("materials")}
          onGuide={() => setPage("guide")}
          history={history}
        />
      )}
      {page === "setup" && (
        <SetupPage initialPlayers={players} onBack={() => setPage("home")} onStart={startGame} />
      )}
      {page === "game" && (
        <GamePage key={gameKey} initialPlayers={players} onFinish={handleFinish} onExit={() => {
          if (window.confirm("Keluar dari permainan sekarang? Progres permainan ini tidak akan masuk riwayat.")) setPage("home");
        }} />
      )}
      {page === "materials" && <MaterialsPage onBack={() => setPage("home")} />}
      {page === "guide" && <GuidePage onBack={() => setPage("home")} onStart={() => setPage("setup")} />}
      {page === "result" && (
        <ResultPage
          result={result}
          onHome={() => setPage("home")}
          onPlayAgain={() => setPage("setup")}
        />
      )}
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Tangga Arab Adventure</span>
        <span>Belajar Bahasa Arab dengan cara yang menyenangkan.</span>
      </footer>
    </div>
  );
}
