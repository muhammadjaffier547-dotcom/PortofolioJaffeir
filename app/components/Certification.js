"use client";

import { useState, useRef } from "react";
import { certifications, certification } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

function HolographicCard({ cert, isId, onSelect }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    rotX: 0,
    rotY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransformStyle({
      rotX,
      rotY,
      glareX,
      glareY,
      glareOpacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      rotX: 0,
      rotY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
    });
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransformStyle({
      rotX,
      rotY,
      glareX,
      glareY,
      glareOpacity: 0.85,
    });
  };

  const handleTouchEnd = () => {
    setTransformStyle({
      rotX: 0,
      rotY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
    });
  };

  return (
    <div
      ref={cardRef}
      className="holo-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => onSelect(cert)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(cert)}
      aria-label={`Buka detail sertifikasi ${cert.name}`}
    >
      <div
        className="holo-card"
        style={{
          transform: `perspective(900px) rotateX(${transformStyle.rotX.toFixed(2)}deg) rotateY(${transformStyle.rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
          borderColor: transformStyle.glareOpacity ? cert.badgeColor : "var(--line)",
        }}
      >
        {/* Hologram Iridescent Foil Overlay */}
        <div
          className="holo-foil-layer"
          style={{
            opacity: transformStyle.glareOpacity,
            background: `radial-gradient(circle at ${transformStyle.glareX}% ${transformStyle.glareY}%, rgba(255,255,255,0.32) 0%, rgba(79,209,197,0.24) 22%, rgba(236,72,153,0.2) 45%, rgba(245,158,11,0.18) 68%, transparent 85%), linear-gradient(${transformStyle.rotY * 18}deg, rgba(255,255,255,0.1) 0%, transparent 65%)`,
          }}
          aria-hidden="true"
        />

        {/* Security Micro-line Watermark Pattern */}
        <div className="holo-guilloche" aria-hidden="true" />

        {/* Top Header Row */}
        <div className="holo-header">
          <div className="holo-chip-stamp">
            <span className="holo-chip-gold" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span className="holo-category">{cert.category}</span>
          </div>
          <span
            className="holo-code-badge"
            style={{
              color: cert.badgeColor,
              borderColor: `${cert.badgeColor}55`,
              backgroundColor: `${cert.badgeColor}15`,
            }}
          >
            {cert.code}
          </span>
        </div>

        {/* Body Info */}
        <div className="holo-body">
          <div className="holo-icon-wrap" style={{ color: cert.badgeColor }}>
            {cert.badgeImage ? (
              <img
                src={cert.badgeImage}
                alt={cert.name}
                className="holo-badge-img"
                loading="lazy"
              />
            ) : (
              <span className="holo-cert-emoji">{cert.icon}</span>
            )}
          </div>
          <h3 className="holo-title">{cert.name}</h3>
          <p className="holo-issuer">
            <span>{cert.issuer}</span> &middot; {cert.issuerLocation}
          </p>
          {cert.recipient && (
            <p className="holo-recipient">
              {isId ? "Penerima:" : "Earner:"} <strong>{cert.recipient}</strong>
            </p>
          )}
        </div>

        {/* Credential ID Bar */}
        <div className="holo-id-bar">
          <span className="holo-id-lbl">{isId ? "ID KREDENSIAL" : "CREDENTIAL ID"}</span>
          <code className="holo-id-val">{cert.id.length > 20 ? `${cert.id.slice(0, 16)}...` : cert.id}</code>
        </div>

        {/* Footer Actions */}
        <div className="holo-footer">
          <span className="holo-status">
            <span className="holo-live-dot" style={{ background: cert.badgeColor }} />
            {cert.expiry}
          </span>
          <span className="holo-btn-view">
            {isId ? "VERIFIKASI" : "VERIFY"} ↗
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Certification() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [copied, setCopied] = useState(false);
  const { lang, t } = useLanguage();
  const isId = lang === "id";

  const certList = certifications || [certification];

  const handleCopyId = (id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="sertifikasi">
      <div className="wrap">
        <div className="cert-section-head">
          <div>
            <p className="eyebrow">{t("cert_eyebrow")}</p>
            <h2 className="sectitle">{t("cert_title")}</h2>
            <p className="section-note">
              {isId
                ? "Kredensial resmi terverifikasi mencakup routing MikroTik RouterOS dan arsitektur komputasi awan AWS (Amazon Web Services)."
                : "Verified official credentials covering MikroTik RouterOS network routing and Amazon Web Services (AWS) cloud architecture."}
            </p>
          </div>
          <div className="cert-meta-tag">
            <span className="cert-meta-num">{String(certList.length).padStart(2, "0")}</span>
            <span className="cert-meta-lbl">{isId ? "SERTIFIKASI TERVALIDASI" : "VERIFIED CERTS"}</span>
          </div>
        </div>

        {/* 3D Holographic Card Grid */}
        <div className="holo-cards-grid">
          {certList.map((c) => (
            <HolographicCard
              key={c.key}
              cert={c}
              isId={isId}
              onSelect={(cert) => {
                setSelectedCert(cert);
                setCopied(false);
              }}
            />
          ))}
        </div>

        {/* Credential Verification Modal */}
        {selectedCert && (
          <div
            className="cert-modal-backdrop"
            role="presentation"
            onMouseDown={(e) => e.target === e.currentTarget && setSelectedCert(null)}
          >
            <div
              className="cert-modal panel holo-modal-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="holo-modal-title"
            >
              <div className="cert-modal-top">
                <span>~/credentials/{selectedCert.key}.json</span>
                <button
                  onClick={() => setSelectedCert(null)}
                  aria-label="Tutup sertifikat"
                  className="holo-close-btn"
                >
                  ×
                </button>
              </div>

              <div className="cert-modal-content-wrap">
                <div className="holo-modal-banner">
                  <div
                    className="cert-modal-icon"
                    style={{ borderColor: `${selectedCert.badgeColor}66`, background: `${selectedCert.badgeColor}15` }}
                  >
                    {selectedCert.badgeImage ? (
                      <img
                        src={selectedCert.badgeImage}
                        alt={selectedCert.name}
                        className="holo-modal-badge-img"
                      />
                    ) : (
                      <span style={{ fontSize: "28px" }}>{selectedCert.icon}</span>
                    )}
                  </div>
                  <div>
                    <span
                      className="modal-kicker"
                      style={{ color: selectedCert.badgeColor }}
                    >
                      {isId
                        ? "SERTIFIKASI PROFESIONAL TERVERIFIKASI"
                        : "VERIFIED PROFESSIONAL CERTIFICATION"}
                    </span>
                    <h3 id="holo-modal-title">{selectedCert.name}</h3>
                    <p className="modal-issuer">
                      {isId ? "Lembaga Penerbit:" : "Issuing Body:"}{" "}
                      <strong>{selectedCert.issuer}</strong> ({selectedCert.issuerLocation})
                    </p>
                    {selectedCert.recipient && (
                      <p className="modal-recipient-tag">
                        {isId ? "Penerima Kredensial:" : "Issued to:"}{" "}
                        <strong style={{ color: selectedCert.badgeColor }}>{selectedCert.recipient}</strong>
                      </p>
                    )}
                  </div>
                </div>

                <p className="holo-modal-desc">{selectedCert.description}</p>

                {/* ID with Copy Button */}
                <div className="modal-id holo-modal-id-bar">
                  <div>
                    <span>{isId ? "ID KREDENSIAL SERTIFIKAT" : "CREDENTIAL ID"}</span>
                    <strong>{selectedCert.id}</strong>
                  </div>
                  <button
                    onClick={() => handleCopyId(selectedCert.id)}
                    className="holo-copy-btn"
                    title="Salin ID Kredensial"
                  >
                    {copied ? (isId ? "✓ Tersalin!" : "✓ Copied!") : (isId ? "📋 Salin ID" : "📋 Copy ID")}
                  </button>
                </div>

                {/* Modules Checklist */}
                <div className="cert-modules-section">
                  <span className="cert-modules-title">
                    {isId
                      ? "Kompetensi yang Diuji & Dikuasai:"
                      : "Assessed & Verified Core Competencies:"}
                  </span>
                  <div className="cert-modules-grid">
                    {(isId ? selectedCert.modules : selectedCert.modulesEn).map((mod) => (
                      <div key={mod} className="cert-module-item">
                        <span className="mod-check" style={{ color: selectedCert.badgeColor }}>✔</span>
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="cert-modal-actions">
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost cert-verify-btn"
                    style={{ borderColor: `${selectedCert.badgeColor}55`, color: selectedCert.badgeColor }}
                  >
                    🔍 {selectedCert.verifyUrl.includes("credly")
                      ? (isId ? "Verifikasi di Portal Credly ↗" : "Verify on Credly Official Portal ↗")
                      : (isId ? `Verifikasi di Portal ${selectedCert.issuer.split(" ")[0]} ↗` : `Verify on ${selectedCert.issuer.split(" ")[0]} Portal ↗`)}
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedCert(null)}
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

