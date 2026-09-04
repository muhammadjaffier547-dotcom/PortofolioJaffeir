# Muhammad Jaffier Al Zufri — Network Engineer & NOC Operator Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Ready-blue?style=flat-square)](https://turbo.build/)
[![MikroTik](https://img.shields.io/badge/Certified-MTCNA-teal?style=flat-square)](https://mikrotik.com)
[![Status](https://img.shields.io/badge/Status-Operational-00ff9d?style=flat-square)]()
[![Language](https://img.shields.io/badge/Bilingual-ID%20%7C%20EN-orange?style=flat-square)]()

Portofolio profesional interaktif berorientasi industri **Network Engineering & NOC (Network Operations Center)** milik Muhammad Jaffier Al Zufri. Dibangun dengan estetika dark cyber 2026, performa tinggi tanpa lag, dan sarat dengan bukti kerja fisik lapangan nyata.

---

## ⚡ Fitur Utama (2026 Trend Highlights)

1. **Topologi Jaringan NOC Interaktif (`TopologyMap.js`)**
   - Visualisasi diagram arsitektur interkoneksi MetroLink Sunvone: Peering APJII OpenIXP, Core Router MikroTik CCR2004, High-Density ODF, Cisco Catalyst Switch, VLAN 204, dan IPTV Headend.
   - Dilengkapi animasi denyut pulsa transmisi paket data SVG dan Inspector Drawer untuk membedah konfigurasi IP, interface, dan protokol setiap node.

2. **Visual Subnetting & CIDR Calculator (`SubnetCalculator.js`)**
   - Menghitung otomatis Network ID, Broadcast, Usable Host Range, Subnet Mask, dan Wildcard Mask dari prefix `/1` hingga `/32`.
   - **Peta 32-Bit Biner Visual:** Membedakan bit network (Teal) dan bit host (Copper) untuk pemahaman visual subnetting.
   - Tombol preset cepat skenario nyata ISP: `/30 MetroLink P2P`, `/29 POP Client`, `/28 Server DMZ`, `/24 Corporate LAN`.

3. **Kalkulator Redaman Fiber Optik Interaktif (`FiberCalculator.js`)**
   - Menghitung estimasi link budget transmisi fiber optik berdasarkan standar **ITU-T G.652**.
   - Input interaktif untuk panjang kabel (km), titik sambungan (splicing), pasang konektor, dan panjang gelombang (1310nm / 1550nm).
   - Penilaian status otomatis (*Kondisi Prima*, *Standar Normal GPON/Metro*, atau *Peringatan Redaman Tinggi*).

4. **Multi-Language Switcher (Bilingual ID / EN) (`LanguageContext.js`)**
   - Toggle instan `[ID | EN]` di navbar dan spotlight `Ctrl+K`.
   - Seluruh teks (Hero, Profil, Pengalaman Kerja, Studi Kasus, Galeri, Sertifikasi MTCNA, Tools, dan Kontak) diterjemahkan secara fasih untuk rekruter nasional maupun internasional/MNC.
   - Preferensi bahasa tersimpan otomatis di `localStorage`.

5. **Real-Time Latency Telemetry Badge (`LatencyMeter.js`)**
   - Pengukuran live RTT (Round Trip Time) koneksi pengunjung dengan indikator status stabil khas dashboard monitoring NOC.

6. **Terminal Jaringan Interaktif (`Terminal.js`)**
   - Mendukung perintah CLI jaringan sungguhan:
     - `ping <host>` — Simulasi transmisi paket ICMP real-time dengan latensi ms & 0% packet loss.
     - `traceroute <ip>` — Pelacakan hop rute jaringan dari router lokal ke APJII OpenIXP.
     - `route` / `ip route print` — Pencetakan tabel routing dinamis khas MikroTik RouterOS.
     - `otdr` — Log pengujian redaman daya optik & diagnosa bad core Yokogawa AQ1000.
     - `neofetch`, `help`, `clear`, dan shortcut navigasi langsung.

7. **Galeri Bukti Fisik Lapangan (`Gallery.js`)**
   - 9 foto dokumentasi asli terverifikasi:
     - *Data Center APJII & Server Rack*
     - *Instalasi Switch Cisco Sunvone di Hotel Mangkuluhur*
     - *Distribusi Kabel Fiber High-Density Gedung UOB Plaza*
     - *Deteksi Redaman Kritis & Bad Core Yokogawa AQ1000 (-25.9 dBm)*
     - *Penyambungan Core Fiber Lapangan (Fusion Splicing)*
     - *Manajemen Patch Cord ODF Sunvone Telkom/Indosat*
     - *Monitoring Throughput & Bandwidth VLAN 204 Winbox*
     - *Inspeksi Log DHCP & Status Link 1Gbps*
     - *Pengujian Ping Real-Time 0% Packet Loss*
   - Dilengkapi filter kategori dinamis dan modal pratinjau Lightbox beresolusi tinggi.

8. **Command Palette Spotlight `Ctrl + K` / `Cmd + K` (`CommandPalette.js`)**
   - Navigasi instan ke setiap section portofolio, ganti bahasa satu klik, atau salin kontak.

9. **Quick WhatsApp Message Builder (`Contact.js`)**
   - 4 template pesan siap kirim sekali klik (Tawaran Kerja Full-Time, Proyek Jaringan, Splicing Fiber, dan Diskusi Santai).

10. **Synthesizer Suara Ruang Server NOC (`MusicPlayer.js`)**
    - Generator suara ambient atmosferik ruang server (drone frekuensi rendah 55Hz) murni menggunakan **Web Audio API bawaan browser**.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.3.0 (App Router, Turbopack)
- **UI & Styling:** Modern Vanilla CSS dengan CSS Custom Properties & Glassmorphism
- **State Management:** React Context API (Language & UI state)
- **Typography:** JetBrains Mono & Inter
- **Audio Engine:** Web Audio API Native Synthesizer
- **Visual:** Pure SVG Animated Paths & Next.js Image Optimization
- **Repository:** [GitHub muhammadjaffier547-dotcom/portfolio-jaffier](https://github.com/muhammadjaffier547-dotcom/portfolio-jaffier)
