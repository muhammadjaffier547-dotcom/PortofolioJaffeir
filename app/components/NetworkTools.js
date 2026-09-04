"use client";

import { useState } from "react";
import SubnetCalculator from "./SubnetCalculator";
import FiberCalculator from "./FiberCalculator";
import TracerouteSimulator from "./TracerouteSimulator";
import { useLanguage } from "../context/LanguageContext";

export default function NetworkTools() {
  const { t, lang } = useLanguage();
  const isId = lang === "id";
  const [activeTab, setActiveTab] = useState("fiber"); // 'fiber', 'subnet', 'traceroute', 'all'

  return (
    <section id="tools" className="network-tools-section">
      <div className="wrap">
        <p className="eyebrow">{t("tools_eyebrow")}</p>
        <div className="tools-heading">
          <div>
            <h2 className="sectitle">{t("tools_title")}</h2>
            <p className="section-note">
              {isId
                ? "Tiga perangkat interaktif rekayasa jaringan: kalkulator redaman fiber & trace OTDR (ITU-T G.652), visual subnetting IPv4 / CIDR, dan simulator traceroute rute BGP."
                : "Three interactive network engineering tools: optical fiber loss budget & OTDR trace (ITU-T G.652), visual IPv4 CIDR subnetting, and hop-by-hop BGP traceroute simulator."}
            </p>
          </div>

          {/* Tool Navigation Tabs */}
          <div className="tools-tabs">
            <button
              type="button"
              className={`tool-tab-btn ${activeTab === "fiber" ? "is-active" : ""}`}
              onClick={() => setActiveTab("fiber")}
            >
              ⚡ {isId ? "Redaman Fiber & OTDR" : "Fiber & OTDR"}
            </button>
            <button
              type="button"
              className={`tool-tab-btn ${activeTab === "subnet" ? "is-active" : ""}`}
              onClick={() => setActiveTab("subnet")}
            >
              🧮 {isId ? "Kalkulator Subnet IPv4" : "IPv4 Subnetting"}
            </button>
            <button
              type="button"
              className={`tool-tab-btn ${activeTab === "traceroute" ? "is-active" : ""}`}
              onClick={() => setActiveTab("traceroute")}
            >
              📡 {isId ? "Visual Traceroute" : "Traceroute Probe"}
            </button>
            <button
              type="button"
              className={`tool-tab-btn ${activeTab === "all" ? "is-active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              📋 {isId ? "Semua Tool" : "View All"}
            </button>
          </div>
        </div>

        <div className="tools-stack">
          {/* Tool 1: Kalkulator Redaman Kabel Fiber Optik & OTDR Waveform */}
          {(activeTab === "fiber" || activeTab === "all") && (
            <div className="tool-block">
              <FiberCalculator />
            </div>
          )}

          {/* Tool 2: Visual Subnetting & CIDR Calculator */}
          {(activeTab === "subnet" || activeTab === "all") && (
            <div className="tool-block">
              <SubnetCalculator />
            </div>
          )}

          {/* Tool 3: Hop-by-Hop Traceroute & BGP Simulator */}
          {(activeTab === "traceroute" || activeTab === "all") && (
            <div className="tool-block">
              <TracerouteSimulator />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
