import { ArrowLeft, ArrowRight, Users, UserRound, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { loadSettings, saveSettings } from "../utils/storage.js";

const AVATARS = ["🦊", "🐼", "🦁", "🐯", "🐸", "🐧", "🐨", "🐙"];
const COLORS = ["#18a999", "#f59e0b", "#7c6cf2", "#ed6a8a"];

const DEFAULTS = [
  { name: "Pemain 1", avatar: "🦊" },
  { name: "Pemain 2", avatar: "🐼" },
  { name: "Pemain 3", avatar: "🦁" },
  { name: "Pemain 4", avatar: "🐯" },
];

export default function SetupPage({ initialPlayers = [], onBack, onStart }) {
  const saved = loadSettings();
  const [count, setCount] = useState(initialPlayers.length || saved.playerCount || 2);
  const [forms, setForms] = useState(() => {
    const base = initialPlayers.length ? initialPlayers : (saved.players || DEFAULTS);
    return Array.from({ length: 4 }, (_, i) => ({
      ...DEFAULTS[i],
      ...(base[i] || {}),
      name: base[i]?.name || DEFAULTS[i].name,
      avatar: base[i]?.avatar || DEFAULTS[i].avatar,
    }));
  });

  useEffect(() => {
    saveSettings({ playerCount: count, players: forms });
  }, [count, forms]);

  const updateForm = (index, key, value) => {
    setForms((current) => current.map((item, i) => i === index ? { ...item, [key]: value } : item));
  };

  const startGame = () => {
    const players = forms.slice(0, count).map((player, index) => ({
      id: `player-${index + 1}`,
      name: player.name.trim() || `Pemain ${index + 1}`,
      avatar: player.avatar,
      color: COLORS[index],
      position: 1,
      score: 0,
      correct: 0,
      wrong: 0,
      shield: 0,
    }));
    onStart(players);
  };

  return (
    <main className="page-container setup-page">
      <button className="back-link" onClick={onBack}><ArrowLeft size={17} /> Kembali ke beranda</button>
      <div className="setup-heading">
        <span className="section-kicker">PERSIAPAN PERMAINAN</span>
        <h1>Siapa yang akan <span>berpetualang?</span></h1>
        <p>Atur jumlah pemain, tulis nama, lalu pilih avatar favorit.</p>
      </div>

      <section className="setup-card">
        <div className="setup-step-title"><span className="step-number">1</span><div><h2>Jumlah pemain</h2><p>Pilih 2 sampai 4 pemain lokal.</p></div></div>
        <div className="player-count-options">
          {[2, 3, 4].map((number) => (
            <button key={number} className={`count-option ${count === number ? "selected" : ""}`} onClick={() => setCount(number)}>
              <Users size={19} /><strong>{number}</strong><span>pemain</span>
            </button>
          ))}
        </div>

        <div className="setup-divider" />
        <div className="setup-step-title"><span className="step-number">2</span><div><h2>Profil pemain</h2><p>Nama dan avatar akan tampil di papan permainan.</p></div></div>
        <div className="player-form-grid">
          {forms.slice(0, count).map((player, index) => (
            <div className="player-form-card" key={index}>
              <div className="player-form-top">
                <span className="player-color-dot" style={{ backgroundColor: COLORS[index] }} />
                <strong>Pemain {index + 1}</strong>
                <span className="player-order">0{index + 1}</span>
              </div>
              <label className="field-label" htmlFor={`player-name-${index}`}>Nama pemain</label>
              <input
                id={`player-name-${index}`}
                className="text-input"
                value={player.name}
                maxLength={18}
                onChange={(event) => updateForm(index, "name", event.target.value)}
                placeholder={`Nama pemain ${index + 1}`}
              />
              <span className="field-label avatar-label">Pilih avatar</span>
              <div className="avatar-options">
                {AVATARS.map((avatar) => (
                  <button
                    type="button"
                    key={avatar}
                    className={`avatar-choice ${player.avatar === avatar ? "chosen" : ""}`}
                    onClick={() => updateForm(index, "avatar", avatar)}
                    aria-label={`Pilih avatar ${avatar}`}
                  >{avatar}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="setup-note"><Sparkles size={17} /><span>Permainan berlangsung bergantian pada satu perangkat. Pastikan semua pemain siap sebelum mulai.</span></div>
        <button className="btn btn-primary btn-large setup-start" onClick={startGame}>Mulai petualangan <ArrowRight size={18} /></button>
      </section>
    </main>
  );
}
