"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const CATEGORIES_DATA = {
  id: [
    { id: "semua", label: "Semua", count: 9 },
    { id: "datacenter", label: "Data Center & Rak", count: 3 },
    { id: "monitoring", label: "Winbox & Monitoring", count: 3 },
    { id: "fiber", label: "Fiber Optik & Splicing", count: 2 },
    { id: "otdr", label: "Pengujian OTDR", count: 1 },
  ],
  en: [
    { id: "semua", label: "All Items", count: 9 },
    { id: "datacenter", label: "Data Center & Racks", count: 3 },
    { id: "monitoring", label: "Winbox & Telemetry", count: 3 },
    { id: "fiber", label: "Fiber & Splicing", count: 2 },
    { id: "otdr", label: "OTDR Testing", count: 1 },
  ],
};

const GALLERY_ITEMS = [
  {
    id: 1,
    filter: "datacenter",
    titleId: "Data Center APJII & Server Rack",
    titleEn: "APJII Data Center & Server Rack",
    categoryId: "Infrastruktur Server & Backbone",
    categoryEn: "Server Infrastructure & Backbone",
    src: "/gallery/datacenter-rack.jpg",
    objectPosition: "center 18%",
    descId: "Inspeksi berkala, penataan kabel, dan manajemen jalur interkoneksi perangkat rack di ruang Data Center APJII.",
    descEn: "Routine inspections, cable dressing, and rack interconnect management inside APJII Data Center Jakarta.",
    tags: ["Data Center", "Server Rack", "MetroLink", "Patching"],
  },
  {
    id: 2,
    filter: "datacenter",
    titleId: "Instalasi Switch Sunvone di Hotel Mangkuluhur",
    titleEn: "Sunvone Switch Deployment at Mangkuluhur Hotel",
    categoryId: "Enterprise Switching & ODF",
    categoryEn: "Enterprise Switching & ODF",
    src: "/gallery/switch-mangkuluhur.jpg",
    descId: "Pemasangan dan konfigurasi Cisco Catalyst Switch Sunvone, modul SFP transceiver, dan kabel patch cord pada rak server Hotel Mangkuluhur Jakarta.",
    descEn: "Hardware rack mounting, Cisco Catalyst switch config, SFP transceivers, and fiber patching at Hotel Mangkuluhur Jakarta.",
    tags: ["Sunvone", "Cisco Switch", "Hotel Mangkuluhur", "SFP Fiber"],
  },
  {
    id: 3,
    filter: "datacenter",
    titleId: "Distribusi Fiber High-Density Gedung UOB",
    titleEn: "High-Density Fiber Distribution at UOB Plaza",
    categoryId: "Infrastruktur Server & Backbone",
    categoryEn: "Server Infrastructure & Backbone",
    src: "/gallery/rack-cergis-uob.jpg",
    descId: "Penataan kabel fiber optik kepadatan tinggi (high-density ODF), routing kabel patch cord, dan pemeliharaan rack di Gedung UOB Plaza.",
    descEn: "High-density optical distribution frame (ODF) routing, patch cord cable management, and rack maintenance at UOB Plaza.",
    tags: ["UOB Plaza", "High-Density ODF", "Backbone Fiber", "Rack Cabling"],
  },
  {
    id: 4,
    filter: "otdr",
    titleId: "Deteksi Redaman Kritis & Bad Core (Yokogawa AQ1000)",
    titleEn: "Critical Optical Loss & Bad Core Fault (Yokogawa AQ1000)",
    categoryId: "Troubleshooting Redaman Fiber Optik",
    categoryEn: "Fiber Optical Loss Troubleshooting",
    src: "/gallery/yokogawa-otdr.jpg",
    objectPosition: "center 30%",
    descId: "Hasil pengukuran daya optik menunjukkan level redaman kritis -25.9 dBm (melewati batas wajar dan mendekati limit -28.00 dBm). Mengindikasikan adanya bad core, bending loss ekstrem, atau partial fiber cut yang memerlukan penanganan recovery core.",
    descEn: "Power checker telemetry displaying critical attenuation of -25.9 dBm (nearing tolerance floor -28.00 dBm). Indicates high bending loss, bad core, or partial fiber cut requiring splicing recovery.",
    tags: ["Yokogawa AQ1000", "Redaman Kritis (-25.9 dBm)", "Bad Core", "Fiber Cut Indication", "Recovery Core"],
  },
  {
    id: 5,
    filter: "fiber",
    titleId: "Penyambungan Core Fiber Lapangan",
    titleEn: "On-Site Fiber Core Fusion Splicing",
    categoryId: "Emergency Recovery & Splicing",
    categoryEn: "Emergency Recovery & Splicing",
    src: "/gallery/fiber-splicing.jpg",
    descId: "Penanganan jalur kabel optik putus dan penyambungan core kaca di dalam optical joint closure menggunakan fusion splicer di lapangan.",
    descEn: "Field recovery of severed fiber lines, precision glass core cleaving, and joint closure fusion splicing.",
    tags: ["Fusion Splicer", "Fiber Cleaver", "Joint Closure", "Field Recovery"],
  },
  {
    id: 6,
    filter: "fiber",
    titleId: "Manajemen ODF & Patch Cord Sunvone",
    titleEn: "Sunvone ODF & Telco Patch Cord Management",
    categoryId: "Interkoneksi Fiber Telco",
    categoryEn: "Telco Fiber Cross-Connect",
    src: "/gallery/fiber-patchcord.jpg",
    descId: "Pengorganisasian, penandaan (labeling), dan penataan kabel patch cord fiber optic interkoneksi Telkom & Indosat pada ODF Sunvone.",
    descEn: "Color-coded labeling, grooming, and cross-connect patching between Telkom & Indosat feeds on Sunvone ODF panels.",
    tags: ["Sunvone", "Telkom", "Indosat", "ODF Management"],
  },
  {
    id: 7,
    filter: "monitoring",
    titleId: "Monitoring Throughput VLAN 204 Sunvone",
    titleEn: "Throughput Monitoring for Sunvone VLAN 204",
    categoryId: "Network Operations & QoS",
    categoryEn: "Network Operations & QoS",
    src: "/gallery/winbox-vlan204.png",
    descId: "Pemantauan grafik traffic bandwidth rate Tx/Rx 10.2 Mbps, volume transfer 1097 GiB, dan verifikasi zero drop/error pada interface vlan204-sunvone.",
    descEn: "Telemetry graph verifying 10.2 Mbps live throughput, 1097 GiB transfer volume, and zero packet drops on interface vlan204.",
    tags: ["MikroTik Winbox", "VLAN 204", "Throughput Graph", "0 Drops"],
  },
  {
    id: 8,
    filter: "monitoring",
    titleId: "Inspeksi Log DHCP & Status Link 1Gbps",
    titleEn: "DHCP Lease Audit & 1Gbps Link Verification",
    categoryId: "Network Diagnostics & Log Audit",
    categoryEn: "Network Diagnostics & Log Audit",
    src: "/gallery/winbox-logs.png",
    descId: "Pengecekan riwayat log sewa DHCP client, verifikasi koneksi 1Gbps Full Duplex interface ether1, dan audit session login admin Winbox.",
    descEn: "Auditing client DHCP lease telemetry, confirming 1Gbps Full Duplex physical negotiation on ether1, and admin login audit.",
    tags: ["MikroTik Log", "DHCP Server", "1Gbps Full Duplex", "Audit Access"],
  },
  {
    id: 9,
    filter: "monitoring",
    titleId: "Pengujian Ping Real-Time 0% Packet Loss",
    titleEn: "Real-Time Ping Testing: 0% Packet Loss",
    categoryId: "Network Operations & QoS",
    categoryEn: "Network Operations & QoS",
    src: "/gallery/winbox-monitoring.png",
    descId: "Validasi transmisi paket ICMP konsisten rata-rata 1ms dan pemantauan throughput stabil via MikroTik Winbox.",
    descEn: "Validating consistent 1ms ICMP latency, 0% packet loss ratio, and jitter stability via MikroTik Winbox.",
    tags: ["MikroTik Winbox", "Ping Test", "0% Loss", "Latency 1ms"],
  },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState("semua");
  const { lang, t } = useLanguage();
  const isId = lang === "id";

  const categories = CATEGORIES_DATA[lang] || CATEGORIES_DATA.id;

  const filteredItems = useMemo(() => {
    if (activeFilter === "semua") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.filter === activeFilter);
  }, [activeFilter]);

  return (
    <section id="dokumentasi" className="gallery-section">
      <div className="wrap">
        <p className="eyebrow">{t("gallery_eyebrow")}</p>
        <div className="gallery-heading">
          <div>
            <h2 className="sectitle">{t("gallery_title")}</h2>
            <p className="section-note">{t("gallery_note")}</p>
          </div>
          <div className="gallery-stat">
            <span>FIELD LOG</span>
            <strong>09</strong>
            <small>{isId ? "foto fisik terverifikasi" : "verified field photos"}</small>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="gallery-filter-bar">
          {categories.map((cat) => (
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
          {filteredItems.map((item, idx) => {
            const title = isId ? item.titleId : item.titleEn;
            const category = isId ? item.categoryId : item.categoryEn;
            const desc = isId ? item.descId : item.descEn;

            return (
              <div
                key={item.id}
                className={`gallery-card ${
                  activeFilter === "semua" && idx === 0 ? "gallery-card-lg" : ""
                }`}
                onClick={() => setSelectedPhoto(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedPhoto(item)}
                aria-label={`Buka foto ${title}`}
              >
                <div className="gallery-img-wrap">
                  <Image
                    src={item.src}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: item.objectPosition || "center",
                    }}
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-zoom-icon">
                      🔍 {isId ? "KLIK UNTUK DETAIL" : "CLICK TO INSPECT"}
                    </span>
                  </div>
                </div>
                <div className="gallery-info">
                  <span className="gallery-category">{category}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="gallery-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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
                  alt={isId ? selectedPhoto.titleId : selectedPhoto.titleEn}
                  width={900}
                  height={600}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    maxHeight: "68vh",
                  }}
                />
              </div>
              <div className="gallery-modal-body">
                <span className="gallery-category">
                  {isId ? selectedPhoto.categoryId : selectedPhoto.categoryEn}
                </span>
                <h3>{isId ? selectedPhoto.titleId : selectedPhoto.titleEn}</h3>
                <p>{isId ? selectedPhoto.descId : selectedPhoto.descEn}</p>
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
