"use client";

import { useEffect, useRef, useState } from "react";
import {
  about,
  experience,
  skillGroups,
  certification,
  education,
  contact,
} from "../data/content";

const FILES = {
  "tentang.txt": ["about", "tentang"],
  "pengalaman.txt": ["pengalaman", "experience", "kerja"],
  "keahlian.txt": ["keahlian", "skills", "skill"],
  "proyek.txt": ["proyek", "projects", "project"],
  "dokumentasi.txt": ["dokumentasi", "gallery", "galeri", "foto"],
  "sertifikasi.txt": ["sertifikasi", "certification", "certifications", "cert"],
  "pendidikan.txt": ["pendidikan", "education"],
  "kontak.txt": ["kontak", "contact"],
};

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function careerUptime() {
  const start = new Date(2025, 8, 1).getTime();
  const diff = Date.now() - start;
  if (diff < 0) return "sejak Sep 2025";
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${d}d ${pad(h)}h ${pad(m)}m`;
}

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [booting, setBooting] = useState(true);
  const [path, setPath] = useState([]); // [] = ~ , ["jaffier"] = ~/jaffier
  const [value, setValue] = useState("");
  const [histIdx, setHistIdx] = useState(null);
  const cmdHistory = useRef([]);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const boot = [
      { type: "sys", text: "portfolio-sh v1.0 — initializing network profile..." },
      { type: "in", text: "guest@jaffier:~$ cd jaffier" },
      { type: "in", text: "guest@jaffier:~/jaffier$ tentang" },
      { type: "out", text: "Network Engineer & NOC Operator — ISP / IPTV / Fiber Infrastructure" },
      { type: "in", text: "guest@jaffier:~/jaffier$ neofetch" },
      { type: "out", text: "OS: Human (Network Engineer Edition)  ·  Shell: portfolio-sh 1.0" },
      { type: "out", text: "Stack: MikroTik · Linux · Fiber/OTDR · IPTV · Monitoring" },
      { type: "sys", text: "session ready — ketik 'help' untuk mulai menjelajah." },
    ];
    const timers = boot.map((entry, i) => setTimeout(() => {
      setLines((prev) => [...prev, entry]);
      if (i === boot.length - 1) setBooting(false);
    }, 280 + i * 210));
    return () => timers.forEach(clearTimeout);
  }, []);

  const prompt = `guest@jaffier:~${path.length ? "/" + path.join("/") : ""}$`;

  function push(entries) {
    setLines((prev) => [...prev, ...entries]);
  }

  function printFile(filename) {
    const id = Object.keys(FILES).find((k) => k === filename)?.replace(".txt", "");
    switch (id) {
      case "tentang":
        push(about.map((p) => ({ type: "out", text: p })));
        scrollToId("tentang");
        break;
      case "pengalaman":
        experience.forEach((e) => {
          push([
            { type: "out", text: `[${e.date}] ${e.role} — ${e.org}` },
            ...e.bullets.map((b) => ({ type: "out", text: `  • ${b}` })),
          ]);
        });
        scrollToId("pengalaman");
        break;
      case "keahlian":
        skillGroups.forEach((g) => {
          push([{ type: "out", text: `${g.title}: ${g.chips.join(", ")}` }]);
        });
        scrollToId("keahlian");
        break;
      case "proyek":
        push([
          { type: "out", text: "Proyek Lapangan:" },
          { type: "out", text: "1. MetroLink NOC Monitoring (ISP & IPTV Infrastructure)" },
          { type: "out", text: "2. Fiber Optic Troubleshooting (Field Measurement & OTDR)" },
          { type: "out", text: "3. MikroTik Network Infrastructure (VLAN & Routing)" },
          { type: "out", text: "4. IPTV Service Operations (Multicast Video Stream)" },
        ]);
        scrollToId("projects");
        break;
      case "dokumentasi":
        push([
          { type: "out", text: "Dokumentasi & Bukti Fisik Lapangan:" },
          { type: "out", text: "• Data Center APJII & Server Rack" },
          { type: "out", text: "• Pengukuran Redaman Yokogawa AQ1000 (-25.9 dBm)" },
          { type: "out", text: "• Penyambungan Core Fiber Lapangan (Fusion Splicer)" },
          { type: "out", text: "• Manajemen ODF & Patch Cord Sunvone" },
          { type: "out", text: "• Monitoring Trafik VLAN MikroTik Winbox (0% loss)" },
        ]);
        scrollToId("dokumentasi");
        break;
      case "sertifikasi":
        push([
          { type: "out", text: certification.name },
          { type: "out", text: `${certification.description} ID: ${certification.id}` },
        ]);
        scrollToId("sertifikasi");
        break;
      case "pendidikan":
        push([
          { type: "out", text: `${education.school} (${education.date})` },
          { type: "out", text: education.major },
          ...education.bullets.map((b) => ({ type: "out", text: `  • ${b}` })),
        ]);
        scrollToId("pendidikan");
        break;
      case "kontak":
        push([
          { type: "out", text: `Email : ${contact.email}` },
          { type: "out", text: `WA    : ${contact.phone}` },
          { type: "out", text: `Lokasi: ${contact.location}` },
          { type: "out", text: `Status: Terbuka untuk peluang baru` },
        ]);
        scrollToId("kontak");
        break;
      default:
        push([{ type: "err", text: `cat: ${filename}: No such file or directory` }]);
    }
  }

  function resolveAlias(word) {
    const w = word.toLowerCase();
    for (const [file, aliases] of Object.entries(FILES)) {
      if (aliases.includes(w) || file === w || file.replace(".txt", "") === w) return file;
    }
    return null;
  }

  function help() {
    push([
      { type: "out", text: "Perintah Umum:" },
      { type: "out", text: "  ls              — lihat isi direktori" },
      { type: "out", text: "  cd <nama>       — pindah direktori (cd jaffier / cd .. / cd ~)" },
      { type: "out", text: "  cat <file>      — tampilkan isi file" },
      { type: "out", text: "  neofetch        — ringkasan profil sistem" },
      { type: "out", text: "  whoami          — info pengguna" },
      { type: "out", text: "  clear           — bersihkan layar" },
      { type: "out", text: "  help            — tampilkan daftar perintah" },
      { type: "out", text: " " },
      { type: "out", text: "Perintah Jaringan (NOC & Network Tools):" },
      { type: "out", text: "  ping <host>     — uji transmisi paket ICMP (contoh: ping 8.8.8.8)" },
      { type: "out", text: "  traceroute <ip> — lacak hop rute jaringan ke tujuan" },
      { type: "out", text: "  route           — cetak tabel routing MikroTik (ip route print)" },
      { type: "out", text: "  otdr            — baca log redaman optik Yokogawa AQ1000" },
      { type: "out", text: " " },
      { type: "out", text: "Shortcut Halaman:" },
      { type: "out", text: "  tentang, pengalaman, proyek, dokumentasi, keahlian, sertifikasi, kontak" },
    ]);
  }

  function ls() {
    if (path.length === 0) {
      push([{ type: "out", text: "jaffier/" }]);
    } else {
      push([{ type: "out", text: Object.keys(FILES).join("  ") }]);
    }
  }

  function neofetch() {
    push([
      { type: "out", text: "guest@jaffier" },
      { type: "out", text: "-------------" },
      { type: "out", text: "OS: Human (Network Engineer Edition)" },
      { type: "out", text: "Host: Sunvone Solusindo — NOC" },
      { type: "out", text: `Uptime: ${careerUptime()}` },
      { type: "out", text: "Shell: portfolio-sh 1.0" },
      { type: "out", text: "Stack: MikroTik, Linux, Fiber/OTDR, IPTV, SolarWinds" },
      { type: "out", text: "Status: Online — terbuka untuk peluang baru" },
    ]);
  }

  function simPing(target) {
    const host = target || "8.8.8.8";
    push([
      { type: "sys", text: `PING ${host} (56 data bytes):` },
      { type: "out", text: `64 bytes from ${host}: icmp_seq=1 ttl=118 time=1.2ms` },
      { type: "out", text: `64 bytes from ${host}: icmp_seq=2 ttl=118 time=0.9ms` },
      { type: "out", text: `64 bytes from ${host}: icmp_seq=3 ttl=118 time=1.4ms` },
      { type: "out", text: `64 bytes from ${host}: icmp_seq=4 ttl=118 time=1.1ms` },
      { type: "sys", text: `--- ${host} ping statistics ---` },
      { type: "out", text: "4 packets transmitted, 4 received, 0.0% packet loss, rtt avg = 1.15ms" },
    ]);
  }

  function simTraceroute(target) {
    const host = target || "apjii.or.id";
    push([
      { type: "sys", text: `traceroute to ${host} (30 hops max, 60 byte packets):` },
      { type: "out", text: " 1  192.168.88.1 (gateway-mikrotik.lan)  0.421 ms" },
      { type: "out", text: " 2  10.240.0.1 (core-metrolink-ring.sunvone.net)  0.892 ms" },
      { type: "out", text: " 3  202.152.0.1 (apjii-peering-openixp.jkt)  3.418 ms" },
      { type: "out", text: ` 4  ${host} (target-destination)  5.112 ms` },
      { type: "sys", text: "Trace complete: 0 loss along backbone route." },
    ]);
  }

  function simRoute() {
    push([
      { type: "sys", text: "# FLAGS: D - dynamic, A - active, C - connect, S - static" },
      { type: "out", text: " #   DST-ADDRESS        PREF-SRC        GATEWAY            DISTANCE" },
      { type: "out", text: " 0 DAS 0.0.0.0/0                          10.240.0.1                1" },
      { type: "out", text: " 1 DAC 10.240.0.0/24      10.240.0.250    vlan204-sunvone           0" },
      { type: "out", text: " 2 DAC 192.168.88.0/24    192.168.88.1    bridge-lan                0" },
      { type: "out", text: " 3 DAC 239.255.0.0/16     10.240.0.250    iptv-headend              0" },
    ]);
  }

  function simOtdr() {
    push([
      { type: "sys", text: "YOKOGAWA AQ1000 — OPTICAL POWER & LOSS REPORT" },
      { type: "out", text: "Mode: Power Checker  ·  Wavelength: SM 1310nm" },
      { type: "out", text: "Measured Level: -25.90 dBm  [NORMAL]" },
      { type: "out", text: "Lower Threshold: -28.00 dBm  |  Upper Threshold: -10.00 dBm" },
      { type: "out", text: "Status: Optical Link PASS · Siap untuk terminasi ODF/ONU" },
    ]);
  }

  function run(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    push([{ type: "in", text: `${prompt} ${trimmed}` }]);
    cmdHistory.current.push(trimmed);
    setHistIdx(null);

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");
    const c = cmd.toLowerCase();

    if (c === "help") return help();
    if (c === "clear") return setLines([]);
    if (c === "ls") return ls();
    if (c === "pwd") return push([{ type: "out", text: `~${path.length ? "/" + path.join("/") : ""}` }]);
    if (c === "whoami")
      return push([
        { type: "out", text: "guest — sedang menjelajahi portofolio Muhammad Jaffier Al Zufri." },
      ]);
    if (c === "neofetch") return neofetch();

    // Network Simulation Commands
    if (c === "ping") return simPing(arg);
    if (c === "traceroute" || c === "tracert") return simTraceroute(arg);
    if (c === "route" || trimmed.toLowerCase() === "ip route print") return simRoute();
    if (c === "otdr") return simOtdr();

    if (c === "cd") {
      if (!arg || arg === "~" || arg === "/") {
        setPath([]);
        return;
      }
      if (arg === "..") {
        setPath((p) => p.slice(0, -1));
        return;
      }
      if (arg === "jaffier" && path.length === 0) {
        setPath(["jaffier"]);
        return;
      }
      return push([{ type: "err", text: `cd: ${arg}: No such file or directory` }]);
    }

    if (c === "cat") {
      const file = resolveAlias(arg);
      if (file) return printFile(file);
      return push([{ type: "err", text: `cat: ${arg || "(kosong)"}: No such file or directory` }]);
    }

    // bare shortcut words: tentang / pengalaman / keahlian / dokumentasi / dst
    const aliasFile = resolveAlias(c);
    if (aliasFile) return printFile(aliasFile);

    push([{ type: "err", text: `command not found: ${cmd} — ketik 'help' untuk daftar perintah.` }]);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.current.length) return;
      const nextIdx =
        histIdx === null ? cmdHistory.current.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(nextIdx);
      setValue(cmdHistory.current[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const nextIdx = histIdx + 1;
      if (nextIdx >= cmdHistory.current.length) {
        setHistIdx(null);
        setValue("");
      } else {
        setHistIdx(nextIdx);
        setValue(cmdHistory.current[nextIdx]);
      }
    }
  }

  return (
    <section id="terminal">
      <div className="wrap">
        <p className="eyebrow">00 · Coba Sendiri</p>
        <h2 className="sectitle">Jelajahi via Terminal</h2>
        <div
          className="panel term"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="term-bar">
            <span className="term-dot d1" />
            <span className="term-dot d2" />
            <span className="term-dot d3" />
            <span className="term-title">guest@jaffier — portfolio-sh</span>
          </div>
          <div className="term-body" ref={bodyRef} aria-live="polite">
            {lines.map((l, i) => (
              <div
                className={`term-line term-${l.type}`}
                key={i}
                style={{ "--term-delay": `${Math.min(i * 55, 440)}ms` }}
              >
                {l.text}
              </div>
            ))}
            {booting && <div className="term-boot-caret"><span /> initializing...</div>}
            <div className="term-line term-inputrow">
              <span className="term-prompt">{prompt}</span>
              <input
                ref={inputRef}
                className="term-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Input perintah terminal"
              />
            </div>
          </div>
        </div>
        <p className="term-hint">
          coba ketik: <code>ping 8.8.8.8</code> , <code>traceroute</code> , <code>route</code> , atau <code>help</code>
        </p>
      </div>
    </section>
  );
}
