# Tangga Arab Adventure

Game pembelajaran Bahasa Arab untuk siswa kelas IX SMP/MTs. Proyek ini merupakan website statis berbasis React + Vite. Seluruh logika permainan berjalan di browser; tidak membutuhkan backend, database, login, atau API.

## Fitur

- Papan ular tangga 30 kotak dengan jalur berkelok.
- 2–4 pemain lokal (bergantian pada satu perangkat).
- Pilihan nama dan avatar pemain.
- Dadu digital dengan animasi.
- Ular, tangga, bom, booster, dan kotak soal.
- Bank soal Bahasa Arab dengan pilihan ganda, timer 20 detik, dan pembahasan.
- Skor, statistik jawaban, perlindungan (shield), log aktivitas, dan hasil akhir.
- Halaman materi dan panduan permainan.
- Riwayat permainan disimpan di `localStorage`.
- Responsif untuk laptop, tablet, dan ponsel.

## Teknologi

- React 18
- Vite 6
- JavaScript
- Tailwind CSS 3 (konfigurasi siap digunakan) + CSS khusus
- Lucide React
- Browser `localStorage`

## Menjalankan di komputer

1. Instal Node.js versi 18 atau lebih baru.
2. Ekstrak ZIP proyek.
3. Buka folder `tangga-arab-adventure` menggunakan VS Code.
4. Buka Terminal di VS Code, lalu jalankan:

```bash
npm install
npm run dev
```

5. Buka alamat lokal yang muncul di terminal, biasanya `http://localhost:5173`.

## Build untuk produksi

```bash
npm run build
npm run preview
```

Hasil build berada di folder `dist`.

## Upload ke GitHub

Buat repository baru di GitHub, kemudian jalankan dari terminal proyek:

```bash
git init
git add .
git commit -m "Initial Tangga Arab Adventure"
git branch -M main
git remote add origin https://github.com/USERNAME/tangga-arab-adventure.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub dan sesuaikan URL repository.

## Deploy ke Vercel

1. Masuk ke https://vercel.com dan login menggunakan GitHub.
2. Pilih **Add New → Project**.
3. Impor repository `tangga-arab-adventure`.
4. Pastikan pengaturan berikut:

| Pengaturan | Nilai |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. Klik **Deploy**. Setiap push baru ke branch `main` akan memicu deployment berikutnya.

## Struktur folder

```text
tangga-arab-adventure/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Board.jsx
│   │   └── QuestionModal.jsx
│   ├── data/
│   │   ├── board.js
│   │   └── questions.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SetupPage.jsx
│   │   ├── GamePage.jsx
│   │   ├── MaterialsPage.jsx
│   │   └── ResultPage.jsx
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

## Mengubah materi dan aturan

- Bank soal: `src/data/questions.js`
- Posisi ular, tangga, bom, booster, dan kotak soal: `src/data/board.js`
- Skor dan aturan perpindahan: `src/pages/GamePage.jsx`
- Materi ringkas: `src/pages/MaterialsPage.jsx`
- Warna dan desain: `src/index.css`

## Catatan penyimpanan

Riwayat permainan disimpan pada browser/perangkat yang digunakan melalui `localStorage`. Data tidak tersinkron ke perangkat lain dan dapat hilang jika data situs/browser dihapus. Karena itu aplikasi ini cocok untuk permainan lokal dan demonstrasi pembelajaran, bukan untuk menyimpan nilai kelas secara terpusat.
