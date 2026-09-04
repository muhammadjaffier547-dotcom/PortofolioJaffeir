"use client";

import { useEffect, useState } from "react";

// NOC uptime — dihitung sejak mulai kerja di Sunvone Solusindo (1 Sep 2025).
// Ini sentuhan tematik/dekoratif, bukan klaim presisi.
const START = new Date(2025, 8, 1, 0, 0, 0);

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatUptime(now) {
  const diff = now - START.getTime();
  if (diff < 0) return "sejak Sep 2025";
  const totalSeconds = Math.floor(diff / 1000);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${d}d ${pad(h)}:${pad(m)}:${pad(s)}`;
}

function formatWIB(now) {
  const wib = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 3600000);
  return `${pad(wib.getHours())}:${pad(wib.getMinutes())} WIB`;
}

export default function StatusBar() {
  const [uptime, setUptime] = useState("sejak Sep 2025");
  const [clock, setClock] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      const now = new Date();
      setUptime(formatUptime(now));
      setClock(formatWIB(now));
    };

    tick();
    if (reduceMotion) return;

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="statusbar">
      <div className="wrap">
        <div className="status-left">
          <span className="dot" />
          <span>
            STATUS_SISTEM: <b>OPERASIONAL</b>
          </span>
        </div>
        <div className="status-right">
          UPTIME_NOC <span>{uptime}</span> · <span>{clock}</span>
        </div>
      </div>
    </div>
  );
}
