import { ArrowLeft, BookOpen, CheckCircle2, GraduationCap } from "lucide-react";

const TOPICS = [
  {
    arabic: "رَأْسُ السَّنَةِ الْهِجْرِيَّةِ",
    title: "Tahun Baru Hijriah",
    description: "Mengenal kosakata waktu, peristiwa, dan ungkapan tentang tahun baru Islam.",
    vocab: ["سَنَةٌ — tahun", "شَهْرٌ — bulan", "يَوْمٌ — hari", "هِجْرَةٌ — hijrah"],
    grammar: "تَصْرِيفُ الْفِعْلِ الْمَاضِي — perubahan bentuk kata kerja lampau.",
  },
  {
    arabic: "الْحَفْلُ بِمَوْلِدِ الرَّسُولِ",
    title: "Peringatan Maulid Nabi",
    description: "Membahas kegiatan peringatan, keteladanan, dan ungkapan sederhana.",
    vocab: ["حَفْلٌ — acara", "مَوْلِدٌ — kelahiran", "رَسُولٌ — rasul", "سِيرَةٌ — riwayat"],
    grammar: "كَانَ وَاسْمُهَا وَخَبَرُهَا — penggunaan kāna dan isim serta khabarnya.",
  },
  {
    arabic: "نُزُولُ الْقُرْآنِ وَالْعِيدَانِ",
    title: "Turunnya Al-Qur'an dan Dua Hari Raya",
    description: "Mengenal kosakata ibadah, hari raya, dan kegiatan keagamaan.",
    vocab: ["الْقُرْآنُ — Al-Qur'an", "عِيدٌ — hari raya", "صَوْمٌ — puasa", "صَلَاةٌ — salat"],
    grammar: "لَمْ، لَنْ، لَا النَّاهِيَةُ — kata penafian dan larangan.",
  },
  {
    arabic: "جَمَالُ الطَّبِيعَةِ",
    title: "Keindahan Alam",
    description: "Menggambarkan alam, pemandangan, serta lingkungan sekitar.",
    vocab: ["جَبَلٌ — gunung", "بَحْرٌ — laut", "نَهْرٌ — sungai", "شَجَرَةٌ — pohon"],
    grammar: "فِعْلُ الْأَمْرِ — kata kerja perintah dan perubahannya.",
  },
  {
    arabic: "خَالِقُ الْعَالَمِ",
    title: "Pencipta Alam Semesta",
    description: "Membaca dan memahami ungkapan tentang alam semesta dan ciptaan Allah.",
    vocab: ["عَالَمٌ — alam", "سَمَاءٌ — langit", "أَرْضٌ — bumi", "نَجْمٌ — bintang"],
    grammar: "الِاسْمُ الْمَوْصُولُ — kata penghubung seperti الَّذِي dan الَّتِي.",
  },
  {
    arabic: "الْحِفَاظُ عَلَى الْبِيئَةِ",
    title: "Menjaga Lingkungan",
    description: "Mempelajari kosakata kebersihan dan tindakan menjaga kelestarian lingkungan.",
    vocab: ["بِيئَةٌ — lingkungan", "نَظَافَةٌ — kebersihan", "نُفَايَاتٌ — sampah", "مَاءٌ — air"],
    grammar: "اسْمُ التَّفْضِيلِ — bentuk perbandingan seperti أَكْبَرُ dan أَجْمَلُ.",
  },
];

export default function MaterialsPage({ onBack }) {
  return (
    <main className="page-container materials-page">
      <button className="back-link" onClick={onBack}><ArrowLeft size={17} /> Kembali</button>
      <div className="materials-heading">
        <div className="materials-icon"><GraduationCap size={27} /></div>
        <span className="section-kicker">PUSAT BELAJAR</span>
        <h1>Materi Bahasa Arab <span>kelas IX</span></h1>
        <p>Enam tema ringkas sebagai pendamping permainan. Pelajari kosakata dan kaidah sebelum menantang temanmu.</p>
      </div>
      <div className="topic-grid">
        {TOPICS.map((topic, index) => (
          <article className="topic-card" key={topic.title}>
            <div className="topic-card-top"><span className="topic-number">0{index + 1}</span><span className="topic-label">TEMA {index + 1}</span></div>
            <div className="topic-arabic" dir="rtl" lang="ar">{topic.arabic}</div>
            <h2>{topic.title}</h2>
            <p className="topic-description">{topic.description}</p>
            <div className="topic-subtitle"><BookOpen size={15} /> Kosakata inti</div>
            <ul className="vocab-list">{topic.vocab.map((word) => <li key={word}>{word}</li>)}</ul>
            <div className="grammar-note"><CheckCircle2 size={16} /><span><b>Kaidah:</b> {topic.grammar}</span></div>
          </article>
        ))}
      </div>
      <div className="materials-footnote">
        <BookOpen size={18} />
        <p>Materi ini merupakan ringkasan pengantar. Guru dapat menyesuaikan kosakata, contoh kalimat, dan kaidah dengan buku ajar serta kurikulum yang digunakan di sekolah.</p>
      </div>
    </main>
  );
}
