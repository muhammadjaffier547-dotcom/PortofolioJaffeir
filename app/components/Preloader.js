"use client";

import { useEffect, useRef, useState } from "react";

// WebGL Fiber Optic Laser Waveguide & Quantum Lightwave Conduit (GPU-Accelerated)
function FiberOpticShader({ speed = 1.3, intensity = 1.15 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const fpsInterval = 1000 / (isMobile ? 30 : 50);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    const vsSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uSpeed;
      uniform float uIntensity;

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

        // Dual Fiber Optic Laser Waveguides
        float path1 = sin(uv.x * 2.2 + iTime * uSpeed * 1.4) * 0.16 
                    + sin(uv.x * 4.6 - iTime * uSpeed * 1.8) * 0.08
                    + cos(uv.x * 1.3 + iTime * 0.8) * 0.05;
        float d1 = abs(uv.y - path1);

        float path2 = -sin(uv.x * 2.5 - iTime * uSpeed * 1.6) * 0.18 
                    + cos(uv.x * 5.0 + iTime * uSpeed * 1.9) * 0.07;
        float d2 = abs(uv.y - path2);

        // High-speed photon energy bursts traveling down fiber conduits
        float packet1 = pow(clamp(1.0 - abs(mod(uv.x * 2.6 - iTime * uSpeed * 3.2, 4.0) - 2.0), 0.0, 1.0), 4.5);
        float packet2 = pow(clamp(1.0 - abs(mod(uv.x * 3.0 + iTime * uSpeed * 3.6, 4.5) - 2.25), 0.0, 1.0), 4.5);

        // Optical Laser Color Palette: Electric Teal (#4FD1C5), Optical Cyan (#38BDF8), White Photon Core
        vec3 colTeal = vec3(0.31, 0.82, 0.77);
        vec3 colBlue = vec3(0.22, 0.74, 0.97);
        vec3 whiteCore = vec3(0.95, 1.0, 1.0);

        vec3 finalCol = vec3(0.0);
        finalCol += colTeal * (0.019 / max(d1, 0.003)) * uIntensity;
        finalCol += colBlue * (0.017 / max(d2, 0.003)) * uIntensity;

        // High-energy packet ignition
        finalCol += mix(colTeal, whiteCore, 0.85) * packet1 * (0.038 / max(d1, 0.004));
        finalCol += mix(colBlue, whiteCore, 0.85) * packet2 * (0.038 / max(d2, 0.004));

        // Subtle Optical Background Telemetry Grid
        vec2 gridUv = fract(fragCoord / 42.0) - 0.5;
        float gridDot = smoothstep(0.07, 0.02, length(gridUv)) * 0.055;
        finalCol += vec3(0.2, 0.6, 0.7) * gridDot;

        float alpha = clamp(max(finalCol.r, max(finalCol.g, finalCol.b)), 0.0, 1.0);
        fragColor = vec4(finalCol, alpha * 0.88);
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (src, type) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "iResolution");
    const timeLoc = gl.getUniformLocation(program, "iTime");
    const speedLoc = gl.getUniformLocation(program, "uSpeed");
    const intLoc = gl.getUniformLocation(program, "uIntensity");

    let animId = 0;
    let lastTime = 0;
    let isVisible = document.visibilityState !== "hidden";
    const startTime = performance.now();

    const render = (now) => {
      animId = 0;
      if (isVisible) {
        if (now - lastTime >= fpsInterval) {
          lastTime = now;
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.uniform2f(resLoc, canvas.width, canvas.height);
          gl.uniform1f(timeLoc, (now - startTime) / 1000);
          gl.uniform1f(speedLoc, speed);
          gl.uniform1f(intLoc, intensity);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        animId = requestAnimationFrame(render);
      }
    };

    const handleVisibility = () => {
      isVisible = document.visibilityState !== "hidden";
      if (isVisible && !animId) {
        animId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    animId = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [speed, intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        opacity: 0.88,
      }}
    />
  );
}

// Particle Class for Network Constellation Node Physics & Dynamic Typography
class NetworkNodeParticle {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.closeEnoughTarget = 85;
    this.maxSpeed = 11;
    this.maxForce = 0.85;
    this.particleSize = 2.4;
    this.startColor = { r: 15, g: 23, b: 42 };
    this.targetColor = { r: 255, g: 255, b: 255 };
    this.colorWeight = 0;
    this.colorBlendRate = 0.025;
  }

  move(pointer) {
    let proximityFactor = 1;
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < this.closeEnoughTarget) {
      proximityFactor = dist / this.closeEnoughTarget;
    }

    let desiredX = 0;
    let desiredY = 0;
    if (dist > 0) {
      desiredX = (dx / dist) * this.maxSpeed * proximityFactor;
      desiredY = (dy / dist) * this.maxSpeed * proximityFactor;
    }

    let steerX = desiredX - this.vel.x;
    let steerY = desiredY - this.vel.y;
    const steerMag = Math.sqrt(steerX * steerX + steerY * steerY);
    if (steerMag > 0) {
      steerX = (steerX / steerMag) * this.maxForce;
      steerY = (steerY / steerMag) * this.maxForce;
    }

    this.acc.x += steerX;
    this.acc.y += steerY;

    // Interactive pointer repulsion wave
    if (pointer && pointer.x > 0 && pointer.y > 0) {
      const pdx = this.pos.x - pointer.x;
      const pdy = this.pos.y - pointer.y;
      const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
      const repelRadius = 80;
      if (pdist < repelRadius && pdist > 0) {
        const repelForce = ((repelRadius - pdist) / repelRadius) * 4.5;
        this.acc.x += (pdx / pdist) * repelForce;
        this.acc.y += (pdy / pdist) * repelForce;
      }
    }

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx) {
    if (this.colorWeight < 1) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1);
    }
    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight);
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight);
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight);

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(this.pos.x, this.pos.y, this.particleSize, this.particleSize);
  }
}

// Particle Canvas: Network Constellation Topology Assembling into Personal Typography
function ParticleText() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const frameCountRef = useRef(0);
  const offscreenCanvasRef = useRef(null);
  const pointerRef = useRef({ x: -9999, y: -9999 });

  const spawnRandomPos = (cx, cy, radius, w, h) => {
    const rx = Math.random() * w;
    const ry = Math.random() * h;
    const p = { x: rx - cx, y: ry - cy };
    const len = Math.sqrt(p.x * p.x + p.y * p.y);
    if (len > 0) {
      p.x = (p.x / len) * radius;
      p.y = (p.y / len) * radius;
    }
    return { x: cx + p.x, y: cy + p.y };
  };

  const setupParticles = (canvas, w, h) => {
    frameCountRef.current = 0;
    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const octx = offscreen.getContext("2d", { willReadFrequently: true });
    offscreenCanvasRef.current = offscreen;

    octx.textAlign = "center";
    octx.textBaseline = "middle";

    // Text center placed comfortably in upper-middle area (around 38% from top)
    const textCenterY = Math.round(h * 0.38);

    // Responsive font calculation tailored to "MUHAMMAD JAFFIER" & "NETWORK SYSTEMS & NOC"
    // "NETWORK SYSTEMS & NOC" (21 chars * ~0.55 = 11.5 * fontSize) guaranteed inside 82% width
    const maxFontForWidth = Math.floor((w * 0.82) / 11.5);
    const maxFontForHeight = Math.floor(h * 0.072);
    const fontBottom = Math.max(16, Math.min(42, Math.min(maxFontForWidth, maxFontForHeight)));
    const fontTop = Math.max(18, Math.min(52, Math.round(fontBottom * 1.18)));
    const fontBadge = Math.max(9, Math.min(12, Math.round(fontBottom * 0.28)));

    const topY = textCenterY - Math.round(fontTop * 0.65);
    const bottomY = textCenterY + Math.round(fontBottom * 0.65);
    const badgeY = bottomY + Math.round(fontBottom * 0.72) + 12;

    // Line 1: "MUHAMMAD JAFFIER" (Titanium White with soft Ice-Teal gradient)
    octx.font = `bold ${fontTop}px 'Space Grotesk', system-ui, -apple-system, sans-serif`;
    const gradTop = octx.createLinearGradient(w / 2 - 200, 0, w / 2 + 200, 0);
    gradTop.addColorStop(0, "#FFFFFF");
    gradTop.addColorStop(0.5, "#F0FDFA");
    gradTop.addColorStop(1, "#A7F3D0");
    octx.fillStyle = gradTop;
    octx.fillText("MUHAMMAD JAFFIER", Math.round(w / 2), topY);

    // Line 2: "NETWORK SYSTEMS & NOC" (Vibrant Optical Cyan/Teal Laser Gradient)
    octx.font = `800 ${fontBottom}px 'Space Grotesk', system-ui, -apple-system, sans-serif`;
    const gradBottom = octx.createLinearGradient(w / 2 - 220, 0, w / 2 + 220, 0);
    gradBottom.addColorStop(0, "#38BDF8");
    gradBottom.addColorStop(0.5, "#4FD1C5");
    gradBottom.addColorStop(1, "#2DD4BF");
    octx.fillStyle = gradBottom;
    octx.fillText("NETWORK SYSTEMS & NOC", Math.round(w / 2), bottomY);

    // Line 3: Professional Technical Sub-badge
    octx.font = `600 ${fontBadge}px 'JetBrains Mono', monospace`;
    octx.fillStyle = "rgba(148, 163, 184, 0.85)";
    octx.fillText("[ AS23700 · MIKROTIK CCR2004 · 10G OPTICAL FIBER ]", Math.round(w / 2), badgeY);

    const imgData = octx.getImageData(0, 0, w, h).data;
    const particles = particlesRef.current;
    particles.length = 0;

    const sampleStep = w < 500 ? 5 : 4;
    const coords = [];
    for (let c = 0; c < imgData.length; c += sampleStep * 4) {
      if (imgData[c + 3] > 60) {
        coords.push(c);
      }
    }

    // Shuffle coords for natural swarm convergence
    for (let i = coords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coords[i], coords[j]] = [coords[j], coords[i]];
    }

    const radius = (w + h) / 1.8;
    for (const c of coords) {
      const tx = (c / 4) % w;
      const ty = Math.floor(c / 4 / w);

      const p = new NetworkNodeParticle();
      const origin = spawnRandomPos(w / 2, textCenterY, radius, w, h);
      p.pos.x = origin.x;
      p.pos.y = origin.y;
      p.target.x = tx;
      p.target.y = ty;
      p.maxSpeed = Math.random() * 7 + 8;
      p.maxForce = p.maxSpeed * 0.11;
      p.particleSize = Math.random() * 1.4 + 2.0;
      p.colorBlendRate = Math.random() * 0.025 + 0.015;

      p.startColor = {
        r: Math.floor(Math.random() * 30 + 15),
        g: Math.floor(Math.random() * 70 + 35),
        b: Math.floor(Math.random() * 95 + 75),
      };
      p.targetColor = {
        r: imgData[c],
        g: imgData[c + 1],
        b: imgData[c + 2],
      };
      particles.push(p);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width || window.innerWidth || 800);
      const h = Math.round(rect.height || window.innerHeight || 600);
      if (w === 0 || h === 0) return;

      canvas.width = w;
      canvas.height = h;
      setupParticles(canvas, w, h);
    };

    handleResize();

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    const loop = () => {
      if (!canvas) return;
      if (document.hidden) {
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, w, h);
      frameCountRef.current++;

      // After frame 75, gradually fade into crisp typography
      let crispBlend = 0;
      if (frameCountRef.current > 75) {
        crispBlend = Math.min(1, (frameCountRef.current - 75) / 45);
      }

      // Live Constellation Mesh: Draw faint fiber interconnect lines during swarm convergence
      if (frameCountRef.current < 60 && particles.length > 0) {
        ctx.strokeStyle = "rgba(79, 209, 197, 0.12)";
        ctx.lineWidth = 0.8;
        const checkStep = 12;
        ctx.beginPath();
        for (let i = 0; i < particles.length; i += checkStep) {
          const pA = particles[i];
          let links = 0;
          for (let j = i + checkStep; j < particles.length && links < 3; j += checkStep) {
            const pB = particles[j];
            const dsq = (pA.pos.x - pB.pos.x) ** 2 + (pA.pos.y - pB.pos.y) ** 2;
            if (dsq < 2500) { // < 50px
              ctx.moveTo(pA.pos.x, pA.pos.y);
              ctx.lineTo(pB.pos.x, pB.pos.y);
              links++;
            }
          }
        }
        ctx.stroke();
      }

      // Draw assembling node particles with mouse physics
      ctx.globalAlpha = 1 - crispBlend * 0.35;
      const pointer = pointerRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.move(pointer);
        p.draw(ctx);
      }
      ctx.globalAlpha = 1;

      // Draw crisp rendered typography overlay
      if (offscreenCanvasRef.current && crispBlend > 0) {
        ctx.globalAlpha = crispBlend;
        ctx.drawImage(offscreenCanvasRef.current, 0, 0);
        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(loop);
    };

    loop();
    window.addEventListener("resize", handleResize);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        willChange: "transform",
      }}
    />
  );
}

// Sleek NOC Bootloader Sequence & Live Telemetry Readout
function NOCBootloaderBar({ progress }) {
  // Dynamic NOC Boot Milestones
  let bootStatus = "[SYS] PROBING SFP+ OPTICAL TRANSCEIVERS...";
  if (progress >= 25 && progress < 55) {
    bootStatus = "[NET] PEERING APJII OPENIXP 10G... ESTABLISHED";
  } else if (progress >= 55 && progress < 80) {
    bootStatus = "[NOC] SYNCING MIKROTIK CCR2004 ROUTER... OK";
  } else if (progress >= 80 && progress < 99) {
    bootStatus = "[LINK] 10G METROLINK TRUNK TO CYBER DC... UP";
  } else if (progress >= 99) {
    bootStatus = "[READY] INFRASTRUCTURE ONLINE · WELCOME";
  }

  return (
    <div
      style={{
        width: "min(340px, 86vw)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Live NOC Terminal Milestone */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--mono, monospace)",
          fontSize: "10px",
          color: "var(--teal, #4FD1C5)",
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            boxShadow: "0 0 8px #22c55e",
            animation: "pulse 1.8s infinite",
          }}
        />
        <span>{bootStatus}</span>
      </div>

      {/* Progress Bar Track with Neon Glow */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "3px",
          backgroundColor: "rgba(35, 43, 51, 0.7)",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #38BDF8, #4FD1C5)",
            boxShadow: "0 0 12px rgba(79, 209, 197, 0.9), 0 0 24px rgba(56, 189, 248, 0.5)",
            borderRadius: "9999px",
            transition: "width 0.12s linear",
          }}
        />
      </div>

      {/* Counter and Telemetry Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--mono, monospace)",
          fontSize: "11px",
          color: "rgba(148, 163, 184, 0.9)",
          letterSpacing: "0.08em",
        }}
      >
        <span style={{ fontSize: "10px", color: "rgba(148, 163, 184, 0.65)" }}>
          NOC CORE v2.6
        </span>
        <span style={{ fontWeight: 700, color: "var(--teal, #4FD1C5)" }}>
          {progress}%
        </span>
      </div>
    </div>
  );
}

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let frame;
    let start = null;
    const duration = 2300; // 2.3 seconds smooth boot sequence

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => setIsHidden(true), 650);
        }, 220);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => setIsHidden(true), 350);
  };

  if (isHidden) return null;

  return (
    <div
      className={`welcome-screen-root ${isExiting ? "is-exiting" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        maxWidth: "100vw",
        height: "100%",
        zIndex: 99999,
        backgroundColor: "#04060A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.05)" : "scale(1)",
        filter: isExiting ? "blur(10px)" : "blur(0px)",
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      {/* Layer 1: WebGL Fiber Optic Laser Waveguides Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <FiberOpticShader speed={1.3} intensity={1.2} />
      </div>

      {/* Layer 2: Network Constellation Topology Assembling into Typography */}
      <ParticleText />

      {/* Layer 3: Foreground UI (NOC Diagnostic Bootloader & Quick Skip) */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(24px, 7vh, 60px)",
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          width: "100%",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <NOCBootloaderBar progress={count} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--mono, monospace)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "rgba(148, 163, 184, 0.7)",
            textTransform: "uppercase",
          }}
        >
          <span>NOC Operator & Network Engineer</span>
          <span style={{ color: "rgba(79, 209, 197, 0.5)" }}>•</span>
          <span>Jakarta, ID</span>
        </div>

        {/* Skip button for rapid navigation */}
        <button
          type="button"
          onClick={handleSkip}
          style={{
            marginTop: "6px",
            background: "transparent",
            border: "1px solid rgba(79, 209, 197, 0.25)",
            borderRadius: "6px",
            padding: "5px 14px",
            fontFamily: "var(--mono, monospace)",
            fontSize: "10.5px",
            letterSpacing: "0.14em",
            color: "rgba(79, 209, 197, 0.75)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--teal, #4FD1C5)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.background = "rgba(79, 209, 197, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(79, 209, 197, 0.25)";
            e.currentTarget.style.color = "rgba(79, 209, 197, 0.75)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          [ LEWATI / SKIP ]
        </button>
      </div>
    </div>
  );
}
