"use client";

import { useState } from "react";
import { certification } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

const MTCNA_MODULES = {
  id: [
    "Routing Dinamis & Statis (OSPF, Default Route)",
    "Bridging & Segmentasi 802.1Q VLAN",
    "Firewall Filter, NAT & Mangle",
    "Manajemen Bandwidth & Simple QoS Queue",
    "Tunneling & VPN (PPPoE, SSTP, WireGuard)",
    "Network Diagnostics (Torch, Packet Sniffer, Traceroute)",
  ],
  en: [
    "Dynamic & Static Routing (OSPF, Default Gateways)",
    "Bridging & 802.1Q VLAN Segmentation",
    "Firewall Filter, Source/Dest NAT & Mangle",
    "Bandwidth Management & Simple QoS Queues",
    "Tunneling & VPN Architectures (PPPoE, WireGuard)",
    "Network Telemetry (Torch, Packet Sniffer, Traceroute)",
  ],
};

export default function Certification() {
  const [open, setOpen] = useState(false);
  const { lang, t } = useLanguage();
  const isId = lang === "id";

  const modules = MTCNA_MODULES[lang] || MTCNA_MODULES.id;

  return (
    <section id="sertifikasi">
      <div className="wrap">
        <p className="eyebrow">{t("cert_eyebrow")}</p>
        <h2 className="sectitle">{t("cert_title")}</h2>

        <div
          className="panel cert-card cert-trigger"
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
          aria-label="Buka detail sertifikasi MikroTik MTCNA"
        >
          <div className="cert-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z"
                stroke="var(--copper)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 12.2 11 14.7l4.8-5.4"
                stroke="var(--copper)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="cert-body">
            <span className="cert-label">
              {isId ? "KREDENSIAL TERVERIFIKASI" : "VERIFIED CREDENTIAL"}
            </span>
            <h3>{certification.name}</h3>
            <p>
              {isId ? "Lembaga Penerbit:" : "Issuer:"}{" "}
              <span>MikroTikls SIA (Riga, Latvia)</span> &middot; ID:{" "}
              <span>{certification.id}</span>
            </p>
          </div>
          <div className="cert-arrow">
            <span className="cert-arrow-btn">
              {isId ? "LIHAT KREDENSIAL" : "VIEW CREDENTIAL"} ↗
            </span>
          </div>
        </div>

        {/* Certificate Detail Modal */}
        {open && (
          <div
            className="cert-modal-backdrop"
            role="presentation"
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <div
              className="cert-modal panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-title"
            >
              <div className="cert-modal-top">
                <span>~/credentials/mikrotik-mtcna.json</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Tutup sertifikat"
                >
                  ×
                </button>
              </div>

              <div className="cert-modal-content-wrap">
                <div className="cert-modal-icon">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z"
                      stroke="var(--teal)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 12.2 11 14.7l4.8-5.4"
                      stroke="var(--teal)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <p className="modal-kicker">
                  {isId
                    ? "SERTIFIKASI INTERNASIONAL TERVERIFIKASI"
                    : "VERIFIED INTERNATIONAL CERTIFICATION"}
                </p>
                <h3 id="cert-title">{certification.name}</h3>
                <p className="modal-issuer">
                  {isId ? "Lembaga Penerbit:" : "Issuing Body:"}{" "}
                  <strong>MikroTikls SIA (Riga, Latvia)</strong>
                </p>

                <div className="modal-id">
                  <span>
                    {isId ? "ID KREDENSIAL SERTIFIKAT" : "CERTIFICATE CREDENTIAL ID"}
                  </span>
                  <strong>{certification.id}</strong>
                </div>

                <div className="cert-modules-section">
                  <span className="cert-modules-title">
                    {isId
                      ? "Kompetensi yang Diuji & Dikuasai:"
                      : "Assessed & Verified Core Competencies:"}
                  </span>
                  <div className="cert-modules-grid">
                    {modules.map((mod) => (
                      <div key={mod} className="cert-module-item">
                        <span className="mod-check">✔</span>
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cert-modal-actions">
                  <a
                    href="https://mikrotik.com/certificate/search"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost cert-verify-btn"
                  >
                    🔍 {isId ? "Verifikasi di Portal MikroTik ↗" : "Verify on MikroTik Portal ↗"}
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={() => setOpen(false)}
                  >
                    {isId ? "Tutup" : "Close"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
