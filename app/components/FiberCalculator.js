"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function FiberCalculator() {
  const [distance, setDistance] = useState(5);
  const [splices, setSplices] = useState(2);
  const [connectors, setConnectors] = useState(2);
  const [wavelength, setWavelength] = useState("1310"); // 1310nm or 1550nm
  const { lang } = useLanguage();
  const isId = lang === "id";

  // ITU-T G.652 standard attenuation constants
  const attenuationRate = wavelength === "1310" ? 0.35 : 0.22; // dB/km
  const spliceLoss = 0.1; // dB per fusion splice
  const connectorLoss = 0.5; // dB per connector pair

  const totalLoss = useMemo(() => {
    const fiberAttenuation = distance * attenuationRate;
    const totalSpliceLoss = splices * spliceLoss;
    const totalConnectorLoss = connectors * connectorLoss;
    return (fiberAttenuation + totalSpliceLoss + totalConnectorLoss).toFixed(2);
  }, [distance, attenuationRate, splices, connectors]);

  const status = useMemo(() => {
    const val = parseFloat(totalLoss);
    if (val < 15) {
      return {
        label: isId ? "KONDISI PRIMA" : "PRISTINE LINK QUALITY",
        desc: isId
          ? "Kualitas link sangat jernih, transmisi optimal untuk 10G Uplink."
          : "Ultra-low attenuation, fully optimal for 10G SFP+ MetroLink.",
        color: "#00ff9d",
      };
    } else if (val <= 26) {
      return {
        label: isId ? "KONDISI STANDAR NORMAL" : "STANDARD ACCEPTABLE",
        desc: isId
          ? "Sesuai ambang batas penerimaan sinyal GPON/MetroLink (toleransi s/d -27 dBm)."
          : "Meets standard receiver sensitivity thresholds (tolerance up to -27 dBm).",
        color: "var(--teal)",
      };
    } else {
      return {
        label: isId ? "PERINGATAN REDAMAN TINGGI" : "CRITICAL ATTENUATION WARNING",
        desc: isId
          ? "Redaman mendekati batas kritis. Dianjurkan re-splicing atau pembersihan konektor."
          : "Attenuation approaching link failure limit. Re-splicing or ferrule cleaning recommended.",
        color: "var(--copper)",
      };
    }
  }, [totalLoss, isId]);

  return (
    <div className="fiber-calc panel">
      <div className="fiber-calc-head">
        <div className="fiber-calc-title">
          <span className="fiber-calc-badge">ITU-T G.652</span>
          <h3>
            {isId
              ? "Kalkulator Redaman Fiber Optik (Optical Loss Budget)"
              : "Optical Fiber Loss Budget Calculator"}
          </h3>
        </div>
        <p className="fiber-calc-sub">
          {isId
            ? "Hitung estimasi batas redaman kabel fiber optik berdasarkan standar industri ITU-T G.652 sebelum pengetesan dengan OPM / OTDR."
            : "Estimate total end-to-end optical link loss budget per ITU-T G.652 standards before field verification with OPM / OTDR."}
        </p>
      </div>

      <div className="fiber-calc-grid">
        {/* Input Controls */}
        <div className="fiber-calc-inputs">
          <div className="calc-group">
            <div className="calc-label-row">
              <label htmlFor="range-distance">
                {isId ? "Panjang Jalur Kabel (km):" : "Cable Span Distance (km):"}
              </label>
              <strong>{distance} km</strong>
            </div>
            <input
              id="range-distance"
              type="range"
              min="1"
              max="40"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="calc-range"
            />
          </div>

          <div className="calc-row-2col">
            <div className="calc-group">
              <label htmlFor="select-splices">
                {isId ? "Titik Sambungan (Splicing):" : "Fusion Splice Points:"}
              </label>
              <div className="calc-stepper">
                <button
                  type="button"
                  onClick={() => setSplices((v) => Math.max(0, v - 1))}
                  aria-label="Kurangi titik sambungan"
                >
                  -
                </button>
                <span id="select-splices">
                  {splices} {isId ? "titik" : "splices"}
                </span>
                <button
                  type="button"
                  onClick={() => setSplices((v) => Math.min(20, v + 1))}
                  aria-label="Tambah titik sambungan"
                >
                  +
                </button>
              </div>
            </div>

            <div className="calc-group">
              <label htmlFor="select-connectors">
                {isId ? "Pasang Konektor (ODF/Patch):" : "Connector Pairs (ODF):"}
              </label>
              <div className="calc-stepper">
                <button
                  type="button"
                  onClick={() => setConnectors((v) => Math.max(1, v - 1))}
                  aria-label="Kurangi pasang konektor"
                >
                  -
                </button>
                <span id="select-connectors">
                  {connectors} {isId ? "pasang" : "pairs"}
                </span>
                <button
                  type="button"
                  onClick={() => setConnectors((v) => Math.min(10, v + 1))}
                  aria-label="Tambah pasang konektor"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="calc-group">
            <span className="calc-label-inline">
              {isId ? "Panjang Gelombang Laser:" : "Optical Laser Wavelength:"}
            </span>
            <div className="calc-radio-group">
              <button
                type="button"
                className={`calc-chip-btn ${
                  wavelength === "1310" ? "is-active" : ""
                }`}
                onClick={() => setWavelength("1310")}
              >
                1310 nm (0.35 dB/km)
              </button>
              <button
                type="button"
                className={`calc-chip-btn ${
                  wavelength === "1550" ? "is-active" : ""
                }`}
                onClick={() => setWavelength("1550")}
              >
                1550 nm (0.22 dB/km)
              </button>
            </div>
          </div>
        </div>

        {/* Output Calculation Result Card */}
        <div className="fiber-calc-result">
          <span className="result-kicker">
            {isId ? "ESTIMASI TOTAL REDAMAN LINK" : "ESTIMATED TOTAL LINK LOSS"}
          </span>
          <div className="result-number-wrap">
            <span className="result-number">{totalLoss}</span>
            <span className="result-unit">dB</span>
          </div>

          <div
            className="result-status-box"
            style={{ borderColor: status.color }}
          >
            <span className="status-dot" style={{ background: status.color }} />
            <div>
              <strong style={{ color: status.color }}>{status.label}</strong>
              <p>{status.desc}</p>
            </div>
          </div>

          <div className="fiber-formula-box">
            <span className="formula-tag">
              📐 {isId ? "RUMUS PERHITUNGAN KABEL (ITU-T G.652):" : "CABLE LOSS FORMULA (ITU-T G.652):"}
            </span>
            <code className="fiber-formula-code">
              Total Loss = (Jarak × {attenuationRate} dB/km) + (Sambungan × 0.1 dB) + (Konektor × 0.5 dB)
            </code>
            <p className="fiber-formula-eval">
              = ({distance}km × {attenuationRate}) + ({splices} × 0.1) + ({connectors} × 0.5) = <strong className="text-teal">{totalLoss} dB</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
