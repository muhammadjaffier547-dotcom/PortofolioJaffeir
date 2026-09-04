"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const CATEGORIES = [
  { id: "semua", label: "Semua", count: 9 },
  { id: "datacenter", label: "Data Center & Rak", count: 3 },
  { id: "monitoring", label: "Winbox & Monitoring", count: 3 },
  { id: "fiber", label: "Fiber Optik & Splicing", count: 2 },
  { id: "otdr", label: "Pengujian OTDR", count: 1 },
];

const GALLERY_ITEMS = [
  {
    id: 1,
    filter: "datacenter",
    title: "Data Center APJII & Server Rack",
    category: "Infrastruktur Server & Backbone",
    src: "/gallery/datacenter-rack.jpg",
    objectPosition: "center 18%",
    desc: "Inspeksi berkala, penataan kabel, dan manajemen jalur interkoneksi perangkat rack di ruang Data Center.",
    tags: ["Data Center", "Server Rack", "MetroLink", "Patching"],
  },
  {
    id: 2,
    filter: "datacenter",
    title: "Instalasi Switch Sunvone di Hotel Mangkuluhur",
    category: "Enterprise Switching & ODF",
    src: "/gallery/switch-mangkuluhur.jpg",
    desc: "Pemasangan dan konfigurasi Cisco Catalyst Switch Sunvone, modul SFP transceiver, dan kabel patch cord pada rak server Hotel Mangkuluhur Jakarta.",
    tags: ["Sunvone", "Cisco Switch", "Hotel Mangkuluhur", "SFP Fiber"],
  },
  {
    id: 3,
    filter: "datacenter",
    title: "Distribusi Fiber High-Density Gedung UOB",
    category: "Infrastruktur Server & Backbone",
    src: "/gallery/rack-cergis-uob.jpg",
    desc: "Penataan kabel fiber optik kepadatan tinggi (high-density ODF), routing kabel patch cord, dan pemeliharaan rack di Gedung UOB Plaza.",
    tags: ["UOB Plaza", "High-Density ODF", "Backbone Fiber", "Rack Cabling"],
  },
  {
    id: 4,
    filter: "otdr",
    title: "Deteksi Redaman Kritis & Bad Core (Yokogawa AQ1000)",
    category: "Troubleshooting Redaman Fiber Optik",
    src: "/gallery/yokogawa-otdr.jpg",
    objectPosition: "center 30%",
    desc: "Hasil pengukuran daya optik menunjukkan level redaman kritis -25.9 dBm (melewati batas wajar dan mendekati limit -28.00 dBm). Kondisi abnormal ini mengindikasikan adanya bad core, bending loss ekstrem, atau partial fiber cut yang memerlukan penanganan recovery core.",
    tags: ["Yokogawa AQ1000", "Redaman Kritis (-25.9 dBm)", "Bad Core", "Fiber Cut Indication", "Recovery Core"],
  },
  {
    id: 5,
    filter: "fiber",
    title: "Penyambungan Core Fiber Lapangan",
    category: "Emergency Recovery & Splicing",
    src: "/gallery/fiber-splicing.jpg",
    desc: "Penanganan jalur kabel optik putus dan penyambungan core kaca di dalam optical joint closure menggunakan fusion splicer di lapangan.",
    tags: ["Fusion Splicer", "Fiber Cleaver", "Joint Closure", "Field Recovery"],
  },
  {
    id: 6,
    filter: "fiber",
    title: "Manajemen ODF & Patch Cord Sunvone",
    category: "Interkoneksi Fiber Telco",
    src: "/gallery/fiber-patchcord.jpg",
    desc: "Pengorganisasian, penandaan (labeling), dan penataan kabel patch cord fiber optic interkoneksi Telkom & Indosat pada ODF Sunvone.",
    tags: ["Sunvone", "Telkom", "Indosat", "ODF Management"],
  },
  {
    id: 7,
    filter: "monitoring",
    title: "Monitoring Throughput VLAN 204 Sunvone",
    category: "Network Operations & QoS",
    src: "/gallery/winbox-vlan204.png",
    desc: "Pemantauan grafik traffic bandwidth rate Tx/Rx 10.2 Mbps, volume transfer 1097 GiB, dan verifikasi zero drop/error pada interface vlan204-sunvone.",
    tags: ["MikroTik Winbox", "VLAN 204", "Throughput Graph", "0 Drops"],
  },
  {
    id: 8,
    filter: "monitoring",
    title: "Inspeksi Log DHCP & Status Link 1Gbps",
    category: "Network Diagnostics & Log Audit",
    src: "/gallery/winbox-logs.png",
    desc: "Pengecekan riwayat log sewa DHCP client, verifikasi koneksi 1Gbps Full Duplex interface ether1, dan audit session login admin Winbox.",
    tags: ["MikroTik Log", "DHCP Server", "1Gbps Full Duplex", "Audit Access"],
  },
  {
    id: 9,
    filter: "monitoring",
    title: "Pengujian Ping Real-Time 0% Packet Loss",
    category: "Network Operations & QoS",
    src: "/gallery/winbox-monitoring.png",
    desc: "Validasi transmisi paket ICMP konsisten rata-rata 1ms dan pemantauan throughput stabil via MikroTik Winbox.",
    tags: ["MikroTik Winbox", "Ping Test", "0% Loss", "Latency 1ms"],
  },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState("semua");

  const filteredItems = useMemo(() => {
    if (activeFilter === "semua") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.filter === activeFilter);
  }, [activeFilter]);

  return (
    <section id="dokumentasi" className="gallery-section">
      <div className="wrap">
        <p className="eyebrow">04 · Bukti Lapangan</p>
        <div className="gallery-heading">
          <div>
            <h2 className="sectitle">Dokumentasi &amp; Log Lapangan</h2>
            <p className="section-note">
              Rekam jejak fisik pekerjaan nyata: instalasi switch korporat hotel, rack data center, penyambungan fusion splicer, pengukuran redaman OTDR, dan audit Winbox.
            </p>
          </div>
          <div className="gallery-stat">
            <span>DOKUMENTASI</span>
            <strong>09</strong>
            <small>foto fisik terverifikasi</small>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="gallery-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`gallery-filter-btn ${
                activeFilter === cat.id ? "is-active" : ""
              }`}
              onClick={() => setActiveFilter(cat.id)}
            >
              <span>{cat.label}</span>
              <small>({cat.count})</small>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className={`gallery-card ${
                activeFilter === "semua" && idx === 0 ? "gallery-card-lg" : ""
              }`}
              onClick={() => setSelectedPhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedPhoto(item)}
              aria-label={`Buka foto ${item.title}`}
            >
              <div className="gallery-img-wrap">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: item.objectPosition || "center" }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-zoom-icon">🔍 KLIK UNTUK DETAIL</span>
                </div>
              </div>
              <div className="gallery-info">
                <span className="gallery-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="gallery-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="gallery-modal-backdrop"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="gallery-modal-content panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="gallery-modal-top">
                <span>~/dokumentasi/{selectedPhoto.src.split("/").pop()}</span>
                <button
                  className="gallery-modal-close"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Tutup foto"
                >
                  ×
                </button>
              </div>
              <div className="gallery-modal-img">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  width={900}
                  height={600}
                  style={{ width: "100%", height: "auto", objectFit: "contain", maxHeight: "68vh" }}
                />
              </div>
              <div className="gallery-modal-body">
                <span className="gallery-category">{selectedPhoto.category}</span>
                <h3>{selectedPhoto.title}</h3>
                <p>{selectedPhoto.desc}</p>
                <div className="gallery-tags">
                  {selectedPhoto.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
