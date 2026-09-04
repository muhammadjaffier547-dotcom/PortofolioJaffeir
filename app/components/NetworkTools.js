"use client";

import { useState } from "react";
import SubnetCalculator from "./SubnetCalculator";
import FiberCalculator from "./FiberCalculator";
import { useLanguage } from "../context/LanguageContext";

export default function NetworkTools() {
  const [activeTab, setActiveTab] = useState("subnet");
  const { t } = useLanguage();

  return (
    <section id="tools" className="network-tools-section">
      <div className="wrap">
        <p className="eyebrow">{t("tools_eyebrow")}</p>
        <div className="tools-heading">
          <div>
            <h2 className="sectitle">{t("tools_title")}</h2>
            <p className="section-note">{t("tools_note")}</p>
          </div>
          <div className="tools-tabs">
            <button
              type="button"
              className={`tool-tab-btn ${activeTab === "subnet" ? "is-active" : ""}`}
              onClick={() => setActiveTab("subnet")}
            >
              {t("tools_tab_subnet")}
            </button>
            <button
              type="button"
              className={`tool-tab-btn ${activeTab === "fiber" ? "is-active" : ""}`}
              onClick={() => setActiveTab("fiber")}
            >
              {t("tools_tab_fiber")}
            </button>
          </div>
        </div>

        <div className="tool-content-wrap">
          {activeTab === "subnet" ? <SubnetCalculator /> : <FiberCalculator />}
        </div>
      </div>
    </section>
  );
}
