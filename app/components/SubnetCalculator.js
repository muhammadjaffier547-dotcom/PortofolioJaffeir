"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const PRESETS = [
  { label: "MetroLink P2P (/30)", ip: "10.240.0.1", cidr: 30, descId: "Uplink Router ke Router", descEn: "Point-to-Point Router Uplink" },
  { label: "Small POP Cluster (/29)", ip: "103.152.88.1", cidr: 29, descId: "Blok IP Publik Klien ISP", descEn: "Public IP Block for ISP Clients" },
  { label: "Server Farm DMZ (/28)", ip: "172.16.50.1", cidr: 28, descId: "Segmen DMZ Server & Firewall", descEn: "Server Farm DMZ & Firewall" },
  { label: "Corporate LAN (/24)", ip: "192.168.88.1", cidr: 24, descId: "Standar VLAN Klien Kantor", descEn: "Standard Corporate Office VLAN" },
  { label: "Campus / Hotel (/22)", ip: "10.100.0.1", cidr: 22, descId: "Jaringan Tamu Hotel Kepadatan Tinggi", descEn: "High-Density Hospitality Guest Network" },
];

function ipToInt(ip) {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) return null;
  return ((parts[0] << 24) >>> 0) + ((parts[1] << 16) >>> 0) + ((parts[2] << 8) >>> 0) + (parts[3] >>> 0);
}

function intToIp(intVal) {
  return [
    (intVal >>> 24) & 255,
    (intVal >>> 16) & 255,
    (intVal >>> 8) & 255,
    intVal & 255,
  ].join(".");
}

function getMask(cidr) {
  if (cidr === 0) return 0;
  return ((0xffffffff << (32 - cidr)) >>> 0);
}

export default function SubnetCalculator() {
  const [ipInput, setIpInput] = useState("192.168.88.1");
  const [cidr, setCidr] = useState(24);
  const { lang } = useLanguage();

  const isId = lang === "id";

  const calc = useMemo(() => {
    const ipNum = ipToInt(ipInput.trim());
    if (ipNum === null) return null;

    const maskNum = getMask(cidr);
    const wildcardNum = (~maskNum) >>> 0;
    const netNum = (ipNum & maskNum) >>> 0;
    const bcastNum = (netNum | wildcardNum) >>> 0;

    let firstUsable = "N/A";
    let lastUsable = "N/A";
    let usableCount = 0;

    const totalAddresses = Math.pow(2, 32 - cidr);

    if (cidr === 32) {
      firstUsable = intToIp(ipNum);
      lastUsable = intToIp(ipNum);
      usableCount = 1;
    } else if (cidr === 31) {
      firstUsable = intToIp(netNum);
      lastUsable = intToIp(bcastNum);
      usableCount = 2;
    } else {
      firstUsable = intToIp(netNum + 1);
      lastUsable = intToIp(bcastNum - 1);
      usableCount = Math.max(0, totalAddresses - 2);
    }

    // Binary representation
    const ipBin = ipNum.toString(2).padStart(32, "0");
    const maskBin = maskNum.toString(2).padStart(32, "0");

    // Network Class
    const firstOctet = (ipNum >>> 24) & 255;
    let netType = "Public IPv4";
    if (firstOctet === 10) netType = "Private (Class A / RFC 1918)";
    else if (firstOctet === 172 && ((ipNum >>> 16) & 255) >= 16 && ((ipNum >>> 16) & 255) <= 31) netType = "Private (Class B / RFC 1918)";
    else if (firstOctet === 192 && ((ipNum >>> 16) & 255) === 168) netType = "Private (Class C / RFC 1918)";
    else if (firstOctet === 127) netType = "Loopback (127.0.0.0/8)";
    else if (firstOctet >= 224 && firstOctet <= 239) netType = "Multicast (Class D)";

    return {
      network: intToIp(netNum),
      broadcast: intToIp(bcastNum),
      netmask: intToIp(maskNum),
      wildcard: intToIp(wildcardNum),
      firstUsable,
      lastUsable,
      totalAddresses,
      usableCount,
      ipBin,
      maskBin,
      netType,
    };
  }, [ipInput, cidr]);

  return (
    <div className="subnet-calc panel">
      <div className="subnet-calc-head">
        <div>
          <span className="subnet-badge">NOC TOOLKIT</span>
          <h3 className="subnet-title">
            {isId ? "Visual Subnet & CIDR Calculator" : "Visual Subnet & CIDR Calculator"}
          </h3>
          <p className="subnet-subtitle">
            {isId
              ? "Perhitungan parameter subnetting, alokasi host, wildcard mask, dan pemetaan bit biner."
              : "Compute IPv4 subnet boundaries, usable host pools, wildcard masks, and binary bit maps."}
          </p>
        </div>

        {/* Quick Presets */}
        <div className="subnet-presets">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className="subnet-preset-btn"
              onClick={() => {
                setIpInput(p.ip);
                setCidr(p.cidr);
              }}
              title={isId ? p.descId : p.descEn}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="subnet-inputs-grid">
        <div className="subnet-input-group">
          <label htmlFor="ip-input">
            {isId ? "IP Address (IPv4):" : "IP Address (IPv4):"}
          </label>
          <input
            id="ip-input"
            type="text"
            className="subnet-text-input"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            placeholder="Contoh: 192.168.1.1"
          />
        </div>

        <div className="subnet-input-group">
          <div className="subnet-slider-header">
            <label htmlFor="cidr-slider">
              {isId ? "Prefix Mask / CIDR:" : "Prefix Mask / CIDR:"}
            </label>
            <strong className="subnet-cidr-tag">/{cidr}</strong>
          </div>
          <input
            id="cidr-slider"
            type="range"
            min="1"
            max="32"
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="subnet-slider"
          />
        </div>
      </div>

      {/* Results */}
      {calc ? (
        <div className="subnet-results-wrap">
          {/* Main 4 Metric Cards */}
          <div className="subnet-cards-grid">
            <div className="subnet-metric-card">
              <span className="metric-label">{isId ? "NETWORK ID" : "NETWORK ID"}</span>
              <strong className="metric-val text-teal">{calc.network}</strong>
              <small>{isId ? "Alamat Jaringan" : "Subnet Base ID"}</small>
            </div>
            <div className="subnet-metric-card">
              <span className="metric-label">{isId ? "BROADCAST" : "BROADCAST"}</span>
              <strong className="metric-val text-copper">{calc.broadcast}</strong>
              <small>{isId ? "Alamat Broadcast" : "Broadcast Address"}</small>
            </div>
            <div className="subnet-metric-card">
              <span className="metric-label">{isId ? "SUBNET MASK" : "SUBNET MASK"}</span>
              <strong className="metric-val">{calc.netmask}</strong>
              <small>Wildcard: {calc.wildcard}</small>
            </div>
            <div className="subnet-metric-card">
              <span className="metric-label">{isId ? "USABLE HOSTS" : "USABLE HOSTS"}</span>
              <strong className="metric-val text-teal">{calc.usableCount.toLocaleString()}</strong>
              <small>{isId ? `Total ${calc.totalAddresses.toLocaleString()} IP` : `Out of ${calc.totalAddresses.toLocaleString()} IPs`}</small>
            </div>
          </div>

          {/* Usable Range & Classification */}
          <div className="subnet-info-row">
            <div className="subnet-info-box">
              <span className="info-label">{isId ? "RENTANG HOST YANG VALID (USABLE IP RANGE):" : "USABLE HOST IP RANGE:"}</span>
              <div className="info-range">
                <span className="range-ip">{calc.firstUsable}</span>
                <span className="range-arrow">➔</span>
                <span className="range-ip">{calc.lastUsable}</span>
              </div>
            </div>
            <div className="subnet-info-box">
              <span className="info-label">{isId ? "KLASIFIKASI JARINGAN:" : "NETWORK CLASSIFICATION:"}</span>
              <div className="info-badge-text">{calc.netType}</div>
            </div>
          </div>

          {/* 32-Bit Binary Visual Matrix */}
          <div className="subnet-binary-section">
            <div className="subnet-binary-head">
              <span>{isId ? "PETA 32-BIT BINER (NETWORK VS HOST BITS)" : "32-BIT BINARY MAP (NETWORK VS HOST BITS)"}</span>
              <div className="binary-legend">
                <span className="legend-item"><i className="legend-dot dot-teal" /> Network Bits (/{cidr})</span>
                <span className="legend-item"><i className="legend-dot dot-copper" /> Host Bits ({32 - cidr})</span>
              </div>
            </div>

            <div className="subnet-binary-grid">
              {[0, 1, 2, 3].map((octIdx) => {
                const octet = calc.ipBin.slice(octIdx * 8, octIdx * 8 + 8);
                return (
                  <div key={octIdx} className="binary-octet-card">
                    <span className="octet-num">Octet {octIdx + 1} ({calc.network.split(".")[octIdx]})</span>
                    <div className="octet-bits">
                      {octet.split("").map((bit, bitIdx) => {
                        const globalBitIdx = octIdx * 8 + bitIdx;
                        const isNetBit = globalBitIdx < cidr;
                        return (
                          <span
                            key={bitIdx}
                            className={`binary-bit ${isNetBit ? "bit-net" : "bit-host"}`}
                            title={`Bit #${globalBitIdx + 1}: ${isNetBit ? "Network" : "Host"}`}
                          >
                            {bit}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="subnet-error-box">
          ⚠️ {isId ? "Format IP tidak valid. Harap masukkan 4 oktet angka 0–255 (contoh: 192.168.1.1)." : "Invalid IPv4 format. Please input 4 octets between 0–255 (e.g., 192.168.1.1)."}
        </div>
      )}
    </div>
  );
}
