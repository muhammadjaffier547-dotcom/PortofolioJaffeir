# Muhammad Jaffier Al Zufri — Network Engineer & NOC Operator Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Ready-blue?style=flat-square)](https://turbo.build/)
[![MikroTik](https://img.shields.io/badge/Certified-MTCNA-teal?style=flat-square)](https://mikrotik.com)
[![Status](https://img.shields.io/badge/Status-Operational-00ff9d?style=flat-square)]()

Portofolio profesional interaktif berorientasi industri **Network Engineering & NOC (Network Operations Center)** milik Muhammad Jaffier Al Zufri. Dibangun dengan estetika dark cyber 2026, performa tinggi tanpa lag, dan sarat dengan bukti kerja fisik lapangan nyata.

---

## ⚡ Fitur Utama (2026 Trend Highlights)

1. **Peta Operasional Infrastruktur // Live NOC Radar (`NetworkHUD.js`)**
   - Radar topologi interaktif menghubungkan router MikroTik, ring fiber MetroLink 10G, APJII Peering, ODF Trunk, IPTV Headend, dan monitoring SolarWinds.
   - Dilengkapi animasi laser data SVG dan simulasi pengujian status rute.
   - Tab switcher responsif ramah layar sentuh mobile.

2. **Terminal Jaringan Interaktif (`Terminal.js`)**
   - Mendukung perintah CLI jaringan sungguhan:
     - `ping <host>` — Simulasi transmisi paket ICMP real-time dengan latensi ms & 0% packet loss.
     - `traceroute <ip>` — Pelacakan hop rute jaringan dari router lokal ke APJII OpenIXP.
     - `route` / `ip route print` — Pencetakan tabel routing dinamis khas MikroTik RouterOS.
     - `otdr` — Log pengujian redaman daya optik Yokogawa AQ1000.
     - `neofetch`, `help`, `clear`, dan shortcut navigasi langsung.
   - Bebas auto-scroll bug, berjalan murni dengan scrollbar internal.

3. **Galeri Bukti Fisik Lapangan (`Gallery.js`)**
   - 9 foto dokumentasi asli terverifikasi:
     - *Data Center APJII & Server Rack*
     - *Instalasi Switch Cisco Sunvone di Hotel Mangkuluhur*
     - *Distribusi Kabel Fiber High-Density Gedung UOB Plaza*
     - *Pengukuran Redaman Yokogawa AQ1000 (-25.9 dBm)*
     - *Penyambungan Core Fiber Lapangan (Fusion Splicing)*
     - *Manajemen Patch Cord ODF Sunvone Telkom/Indosat*
     - *Monitoring Throughput & Bandwidth VLAN 204 Winbox*
     - *Inspeksi Log DHCP & Status Link 1Gbps*
     - *Pengujian Ping Real-Time 0% Packet Loss*
   - Dilengkapi filter kategori dinamis dan modal pratinjau Lightbox beresolusi tinggi.

4. **Kalkulator Redaman Fiber Optik Interaktif (`FiberCalculator.js`)**
   - Menghitung estimasi link budget transmisi fiber optik berdasarkan standar **ITU-T G.652**.
   - Input interaktif untuk panjang kabel (km), titik sambungan (splicing), pasang konektor, dan panjang gelombang (1310nm / 1550nm).
   - Penilaian status otomatis (*Prima*, *Standar Normal GPON/Metro*, atau *Peringatan Redaman Tinggi*).

5. **Command Palette Spotlight `Ctrl + K` / `Cmd + K` (`CommandPalette.js`)**
   - Navigasi cepat ala spotlight macOS ke setiap section portofolio.
   - Aksi cepat: Buka unduhan CV PDF, salin email instan ke clipboard, atau langsung chat WhatsApp.

6. **Quick WhatsApp Message Builder (`Contact.js`)**
   - 4 template pesan siap kirim sekali klik (Tawaran Kerja Full-Time, Proyek Jaringan, Splicing Fiber, dan Diskusi Santai).

7. **Synthesizer Suara Ruang Server NOC (`MusicPlayer.js`)**
   - Generator suara ambient atmosferik ruang server (drone frekuensi rendah 55Hz) murni menggunakan **Web Audio API bawaan browser**. Bebas dependensi MP3 eksternal dan nol bandwidth.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.3.0 (App Router, Turbopack)
- **UI & Styling:** Modern Vanilla CSS dengan CSS Custom Properties & Glassmorphism
- **Typography:** JetBrains Mono & Inter
- **Audio Engine:** Web Audio API Native Synthesizer
- **Visual:** Pure SVG Animated Paths & Next.js Image Optimization

---

## 🚀 Menjalankan Project

### 1. Clone Repositori
```bash
git clone https://github.com/muhammad-jaffier/portofolio-jaffier.git
cd portofolio-jaffier
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### 4. Build Production
```bash
npm run build
```
Compile super cepat via Turbopack (~1 detik).

---

## 📄 Lisensi
Dikembangkan secara personal oleh **Muhammad Jaffier Al Zufri** © 2026.
Tangerang Selatan, Indonesia.
