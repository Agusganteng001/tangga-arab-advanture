import { ArrowRight, BookOpen, Brain, Dices, History, ShieldCheck, Sparkles, Trophy, Users, Zap } from "lucide-react";

const features = [
  { icon: Dices, title: "30 kotak petualangan", text: "Jelajahi papan dengan ular, tangga, bom, dan booster." },
  { icon: Brain, title: "Tantangan Bahasa Arab", text: "Latih kosakata, terjemahan, tata bahasa, dan pemahaman bacaan." },
  { icon: Users, title: "Main bersama teman", text: "Ajak 2–4 pemain bergantian dalam satu perangkat." },
  { icon: Trophy, title: "Kumpulkan poin", text: "Jawab soal dengan tepat, raih skor, dan jadilah pemenang." },
];

export default function HomePage({ onStart, onMaterials, onGuide, history = [] }) {
  const latest = history[0];

  return (
    <main className="page-container home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-dot" /> LEARN • PLAY • LEVEL UP</div>
          <h1>Petualangan seru,<br /><span>Bahasa Arab</span> makin lancar.</h1>
          <p className="hero-description">
            Lempar dadu, taklukkan papan ular tangga, dan buktikan kemampuan Bahasa Arabmu lewat tantangan yang seru.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-large" onClick={onStart}>
              Mulai bermain <ArrowRight size={18} />
            </button>
            <button className="btn btn-ghost btn-large" onClick={onMaterials}>
              <BookOpen size={18} /> Lihat materi
            </button>
          </div>
          <div className="hero-trust">
            <span><Users size={15} /> 2–4 pemain</span>
            <span><Dices size={15} /> 30 kotak</span>
            <span><ShieldCheck size={15} /> Tanpa login</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Ilustrasi permainan ular tangga">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="floating-badge badge-star"><Sparkles size={18} /> +10 XP</div>
          <div className="floating-badge badge-book"><BookOpen size={18} /> تحدّي اللغة</div>
          <div className="game-board-illustration">
            <div className="illustration-grid">
              {["1","2","3","4","5","10","9","8","7","6","11","12","13","14","15","20","19","18","17","16","21","22","23","24","25","30","29","28","27","26"].map((n, i) => (
                <span key={n} className={`illustration-tile tile-${i % 5}`}>{n}</span>
              ))}
            </div>
            <span className="illustration-ladder">🪜</span>
            <span className="illustration-snake">🐍</span>
            <span className="illustration-dice">🎲</span>
            <span className="illustration-character">🦊</span>
          </div>
          <div className="hero-art-caption"><Zap size={15} /> Satu langkah, satu ilmu baru!</div>
        </div>
      </section>

      <section className="stats-strip">
        <div><strong>30</strong><span>Kotak permainan</span></div>
        <div><strong>36</strong><span>Soal Bahasa Arab</span></div>
        <div><strong>6</strong><span>Tema pembelajaran</span></div>
        <div><strong>4</strong><span>Pemain maksimal</span></div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="section-kicker">KENAPA SERU?</span><h2>Belajar jadi bagian dari petualangan</h2></div>
          <p>Setiap giliran memberimu kesempatan untuk bergerak, berpikir, dan menambah kosakata.</p>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }, index) => (
            <article className="feature-card" key={title}>
              <div className={`feature-icon feature-icon-${index}`}><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bottom-cta">
        <div className="cta-icon"><Trophy size={25} /></div>
        <div><span className="section-kicker">SIAP MEMULAI?</span><h2>Tantang temanmu dan raih kotak FINISH!</h2><p>Permainan bisa langsung dimulai tanpa membuat akun.</p></div>
        <button className="btn btn-primary" onClick={onStart}>Atur pemain <ArrowRight size={17} /></button>
      </section>

      {latest && (
        <section className="recent-card">
          <div className="recent-icon"><History size={18} /></div>
          <div className="recent-copy">
            <strong>Permainan terakhir</strong>
            <span>{latest.winner?.name || "Pemenang"} memenangkan permainan dengan {latest.winner?.score ?? 0} poin.</span>
          </div>
          <span className="recent-date">{new Date(latest.playedAt).toLocaleDateString("id-ID")}</span>
        </section>
      )}
      <div className="home-secondary-links">
        <button onClick={onGuide}>Pelajari aturan permainan</button>
        <button onClick={onMaterials}>Jelajahi materi Bahasa Arab</button>
      </div>
    </main>
  );
}
