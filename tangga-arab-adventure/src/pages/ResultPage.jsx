import { ArrowLeft, Award, CheckCircle2, RotateCcw, Sparkles, Trophy } from "lucide-react";

export default function ResultPage({ result, onPlayAgain, onHome }) {
  if (!result) return null;
  const ranking = [...(result.players || [])].sort((a, b) => (a.id === result.winner?.id ? -1 : b.id === result.winner?.id ? 1 : b.score - a.score || b.position - a.position));
  const winner = result.winner || ranking[0];
  const playedAt = result.playedAt ? new Date(result.playedAt).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" }) : "";

  return (
    <main className="page-container result-page">
      <div className="result-confetti confetti-one">✦</div><div className="result-confetti confetti-two">✧</div><div className="result-confetti confetti-three">✦</div>
      <section className="winner-panel">
        <div className="winner-cup"><Trophy size={38} /></div>
        <span className="section-kicker">PETUALANGAN SELESAI</span>
        <h1>Selamat, <span>{winner?.name || "Pemenang"}!</span></h1>
        <p>Kamu berhasil mencapai kotak FINISH dan memenangkan permainan.</p>
        <div className="winner-avatar" style={{ backgroundColor: winner?.color || "#18a999" }}>{winner?.avatar || "🏆"}</div>
        <div className="winner-score"><strong>{winner?.score ?? 0}</strong><span>POIN TERKUMPUL</span></div>
        {playedAt && <small className="played-at">Diselesaikan pada {playedAt}</small>}
      </section>

      <div className="result-content-grid">
        <section className="result-card ranking-card">
          <div className="result-card-heading"><div><span className="section-kicker">HASIL PERTANDINGAN</span><h2>Peringkat pemain</h2></div><Award size={22} /></div>
          <div className="ranking-list">
            {ranking.map((player, index) => (
              <div className={`ranking-row ${index === 0 ? "ranking-first" : ""}`} key={player.id}>
                <span className={`ranking-medal medal-${index}`}>{index === 0 ? "🏆" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}</span>
                <span className="ranking-avatar" style={{ backgroundColor: player.color }}>{player.avatar}</span>
                <div className="ranking-name"><strong>{player.name}</strong><small>Posisi akhir: kotak {player.position}</small></div>
                <strong className="ranking-points">{player.score} <small>pt</small></strong>
              </div>
            ))}
          </div>
        </section>

        <section className="result-card learning-card">
          <div className="result-card-heading"><div><span className="section-kicker">PROGRES BELAJAR</span><h2>Statistik jawaban</h2></div><CheckCircle2 size={22} /></div>
          {ranking.map((player) => (
            <div className="learning-player" key={player.id}>
              <div className="learning-player-title"><span>{player.avatar} {player.name}</span><strong>{player.correct + player.wrong} soal</strong></div>
              <div className="learning-bar"><span style={{ width: `${player.correct + player.wrong ? (player.correct / (player.correct + player.wrong)) * 100 : 0}%` }} /></div>
              <div className="learning-stats"><span className="correct-stat">✓ {player.correct} benar</span><span className="wrong-stat">× {player.wrong} salah</span></div>
            </div>
          ))}
          <div className="learning-tip"><Sparkles size={16} /><span>Terus berlatih agar kosakata dan pemahaman tata bahasa Arab semakin kuat.</span></div>
        </section>
      </div>

      <div className="result-actions">
        <button className="btn btn-ghost btn-large" onClick={onHome}><ArrowLeft size={17} /> Ke beranda</button>
        <button className="btn btn-primary btn-large" onClick={onPlayAgain}><RotateCcw size={17} /> Main lagi</button>
      </div>
    </main>
  );
}
