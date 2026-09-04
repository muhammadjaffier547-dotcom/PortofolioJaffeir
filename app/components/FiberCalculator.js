"use client";

import { useMemo, useState } from "react";

export default function FiberCalculator() {
  const [distance, setDistance] = useState(5);
  const [splices, setSplices] = useState(2);
  const [connectors, setConnectors] = useState(2);
  const [wavelength, setWavelength] = useState("1310"); // 1310nm or 1550nm

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
        label: "KONDISI PRIMA",
        desc: "Kualitas link sangat jernih, transmisi optimal untuk 10G Uplink.",
        color: "#00ff9d",
      };
    } else if (val <= 26) {
      return {
        label: "KONDISI STANDAR NORMAL",
        desc: "Sesuai ambang batas penerimaan sinyal GPON/MetroLink (toleransi s/d -27 dBm).",
        color: "var(--teal)",
      };
    } else {
      return {
        label: "PERINGATAN REDAMAN TINGGI",
        desc: "Redaman mendekati batas kritis. Dianjurkan re-splicing atau pembersihan konektor.",
        color: "var(--copper)",
      };
    }
  }, [totalLoss]);

  return (
    <div className="fiber-calc panel">
      <div className="fiber-calc-head">
        <div className="fiber-calc-title">
          <span className="fiber-calc-badge">TOOL LAPANGAN</span>
          <h3>Kalkulator Redaman Fiber Optik (Optical Budget)</h3>
        </div>
        <p className="fiber-calc-sub">
          Hitung estimasi batas redaman kabel fiber optik berdasarkan standar industri ITU-T G.652 sebelum pengetesan dengan OPM / OTDR.
        </p>
      </div>

      <div className="fiber-calc-grid">
        {/* Input Controls */}
        <div className="fiber-calc-inputs">
          <div className="calc-group">
            <div className="calc-label-row">
              <label htmlFor="range-distance">Panjang Jalur Kabel (km)</label>
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
              <label htmlFor="select-splices">Titik Sambungan (Splicing)</label>
              <div className="calc-stepper">
                <button
                  type="button"
                  onClick={() => setSplices((v) => Math.max(0, v - 1))}
                  aria-label="Kurangi titik sambungan"
                >
                  -
                </button>
                <span id="select-splices">{splices} titik</span>
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
              <label htmlFor="select-connectors">Pasang Konektor (ODF/Patch)</label>
              <div className="calc-stepper">
                <button
                  type="button"
                  onClick={() => setConnectors((v) => Math.max(1, v - 1))}
                  aria-label="Kurangi pasang konektor"
                >
                  -
                </button>
                <span id="select-connectors">{connectors} pasang</span>
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
            <span className="calc-label-inline">Panjang Gelombang Laser:</span>
            <div className="calc-radio-group">
              <button
                type="button"
                className={`calc-chip-btn ${wavelength === "1310" ? "is-active" : ""}`}
                onClick={() => setWavelength("1310")}
              >
                1310 nm (0.35 dB/km)
              </button>
              <button
                type="button"
                className={`calc-chip-btn ${wavelength === "1550" ? "is-active" : ""}`}
                onClick={() => setWavelength("1550")}
              >
                1550 nm (0.22 dB/km)
              </button>
            </div>
          </div>
        </div>

        {/* Output Calculation Result Card */}
        <div className="fiber-calc-result">
          <span className="result-kicker">ESTIMASI TOTAL REDAMAN LINK</span>
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

          <p className="result-note">
            <i>*</i> Rumus: (Jarak × {attenuationRate}) + (Splicing × 0.1) + (Konektor × 0.5)
          </p>
        </div>
      </div>
    </div>
  );
}

