import { BookOpen, Home, Info, Sparkles } from "lucide-react";

export default function Header({ page, onNavigate }) {
  const items = [
    { id: "home", label: "Beranda", icon: Home },
    { id: "materials", label: "Materi", icon: BookOpen },
    { id: "guide", label: "Cara Bermain", icon: Info },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => onNavigate("home")} aria-label="Kembali ke beranda">
          <span className="brand-mark"><Sparkles size={21} /></span>
          <span>
            <strong>Tangga Arab</strong>
            <small>ADVENTURE</small>
          </span>
        </button>
        <nav className="main-nav" aria-label="Navigasi utama">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-link ${page === id ? "active" : ""}`}
              onClick={() => onNavigate(id)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
        <div className="header-chip"><span className="status-dot" /> Game edukasi kelas IX</div>
      </div>
    </header>
  );
}
