"use client";

import SubnetCalculator from "./SubnetCalculator";
import FiberCalculator from "./FiberCalculator";
import { useLanguage } from "../context/LanguageContext";

export default function NetworkTools() {
  const { t, lang } = useLanguage();
  const isId = lang === "id";

  return (
    <section id="tools" className="network-tools-section">
      <div className="wrap">
        <p className="eyebrow">{t("tools_eyebrow")}</p>
        <div className="tools-heading">
          <div>
            <h2 className="sectitle">{t("tools_title")}</h2>
            <p className="section-note">
              {isId
                ? "Dua utilitas interaktif lapangan: perhitungan estimasi redaman link kabel fiber optic (ITU-T G.652) dan kalkulator subnetting IPv4 / CIDR."
                : "Two field-proven interactive utilities: optical fiber loss budget estimations (ITU-T G.652) and IPv4 CIDR subnet calculations."}
            </p>
          </div>
        </div>

        <div className="tools-stack">
          {/* Tool 1: Kalkulator Redaman Kabel Fiber Optik */}
          <div className="tool-block">
            <FiberCalculator />
          </div>

          {/* Tool 2: Visual Subnetting & CIDR Calculator */}
          <div className="tool-block">
            <SubnetCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
