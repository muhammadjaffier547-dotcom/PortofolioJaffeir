"use client";

import { useState } from "react";
import { certification } from "../data/content";

const MTCNA_MODULES = [
  "Routing Dinamis & Statis",
  "Bridging & Segmentasi VLAN",
  "Firewall Filter, NAT & Mangle",
  "Manajemen Bandwidth & QoS",
  "Tunneling & VPN (PPPoE, SSTP)",
  "Network Diagnostics (Torch, Traceroute)",
];

export default function Certification() {
  const [open, setOpen] = useState(false);

  return (
    <section id="sertifikasi">
      <div className="wrap">
        <p className="eyebrow">06 · Kredensial</p>
        <h2 className="sectitle">Sertifikasi Resmi</h2>

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
            <div className="cert-badge-row">
              <span className="cert-label">KREDENSIAL TERVERIFIKASI</span>
              <span className="cert-status-dot">● RESMI</span>
            </div>
            <h3>{certification.name}</h3>
            <p className="cert-subtext">
              {certification.description} · ID: <strong>{certification.id}</strong>
            </p>
            <div className="cert-preview-chips">
              <span>MikroTik RouterOS</span>
              <span>Routing &amp; Switching</span>
              <span>Firewall NAT</span>
            </div>
          </div>

          <div className="cert-arrow-wrap">
            <span className="cert-arrow-btn">LIHAT KREDENSIAL ↗</span>
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

                <p className="modal-kicker">SERTIFIKASI INTERNASIONAL TERVERIFIKASI</p>
                <h3 id="cert-title">{certification.name}</h3>
                <p className="modal-issuer">
                  Lembaga Penerbit: <strong>MikroTikls SIA (Riga, Latvia)</strong>
                </p>

                <div className="modal-id">
                  <span>ID KREDENSIAL SERTIFIKAT</span>
                  <strong>{certification.id}</strong>
                </div>

                <div className="cert-modules-section">
                  <span className="cert-modules-title">Kompetensi yang Diuji &amp; Dikuasai:</span>
                  <div className="cert-modules-grid">
                    {MTCNA_MODULES.map((mod) => (
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
                    🔍 Verifikasi di Portal MikroTik ↗
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={() => setOpen(false)}
                  >
                    Tutup
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
