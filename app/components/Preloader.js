"use client";

import { useEffect, useRef, useState } from "react";

// WebGL Electric Plasma Beam Background Shader (GPU Accelerated)
function PlasmaShader({ hue = 185, speed = 1.4, intensity = 1.1, size = 1.8 }) {
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
      uniform float uHue;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      #define OCTAVE_COUNT 8
      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }
      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }
      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }
      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }
      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }
      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }
      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        uv = 2.0 * uv - 1.0;
        float aspect = iResolution.x / iResolution.y;
        uv.x *= aspect;
        
        float path = sin(uv.y * 2.8 - iTime * 2.2) * 0.22 
                   + sin(uv.y * 4.6 + iTime * 1.3) * 0.12;
        
        vec2 noiseUv = uv * uSize * 1.4;
        float n = 2.0 * fbm(noiseUv + 1.1 * iTime * uSpeed) - 1.0;
        
        float scale = aspect < 1.0 ? (aspect * 1.1) : 1.0;
        float center = (path + n * 0.35) * scale;
        
        uv.y += n * 0.18 * scale;
        float dist = abs(uv.x - center);
        
        vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.75, 0.85));
        vec3 col = baseColor * pow(mix(0.0, 0.065, hash11(iTime * uSpeed)) / max(dist, 0.001), 1.0) * uIntensity;
        float alpha = clamp(max(col.r, max(col.g, col.b)) * 1.2, 0.0, 1.0);
        fragColor = vec4(col, alpha);
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
    const hueLoc = gl.getUniformLocation(program, "uHue");
    const speedLoc = gl.getUniformLocation(program, "uSpeed");
    const intLoc = gl.getUniformLocation(program, "uIntensity");
    const sizeLoc = gl.getUniformLocation(program, "uSize");

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
          gl.uniform1f(hueLoc, hue);
          gl.uniform1f(speedLoc, speed);
          gl.uniform1f(intLoc, intensity);
          gl.uniform1f(sizeLoc, size);
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
  }, [hue, speed, intensity, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        opacity: 0.85,
      }}
    />
  );
}

// Particle Class for Dynamic Steering & Text Assembly
class TextParticle {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.closeEnoughTarget = 90;
    this.maxSpeed = 12;
    this.maxForce = 0.9;
    this.particleSize = 2.8;
    this.isKilled = false;
    this.startColor = { r: 15, g: 23, b: 42 };
    this.targetColor = { r: 255, g: 255, b: 255 };
    this.colorWeight = 0;
    this.colorBlendRate = 0.025;
  }

  move() {
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
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Particle Text Assembly Canvas Component
function ParticleText() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const offscreenCanvasRef = useRef(null);
  const frameCountRef = useRef(0);

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

    const scale = Math.min(1, w / 760);
    const fontTop = Math.max(26, Math.round(48 * scale));
    const fontBottom = Math.max(34, Math.round(62 * scale));

    // Top text: "Welcome To My" with clean white-to-teal gradient
    octx.font = `bold ${fontTop}px 'Space Grotesk', system-ui, sans-serif`;
    const gradTop = octx.createLinearGradient(w / 2 - 200, 0, w / 2 + 200, 0);
    gradTop.addColorStop(0, "#FFFFFF");
    gradTop.addColorStop(0.5, "#E2E8F0");
    gradTop.addColorStop(1, "#A7F3D0");
    octx.fillStyle = gradTop;
    octx.fillText("Welcome To My", w / 2, h / 2 - fontTop * 0.72);

    // Bottom text: "Portofolio Website" with vibrant glowing cyan/teal
    octx.font = `800 ${fontBottom}px 'Space Grotesk', system-ui, sans-serif`;
    const gradBottom = octx.createLinearGradient(w / 2 - 240, 0, w / 2 + 240, 0);
    gradBottom.addColorStop(0, "#38BDF8");
    gradBottom.addColorStop(0.5, "#4FD1C5");
    gradBottom.addColorStop(1, "#2DD4BF");
    octx.fillStyle = gradBottom;
    octx.fillText("Portofolio Website", w / 2, h / 2 + fontBottom * 0.72);

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

      const p = new TextParticle();
      const origin = spawnRandomPos(w / 2, h / 2, radius, w, h);
      p.pos.x = origin.x;
      p.pos.y = origin.y;
      p.target.x = tx;
      p.target.y = ty;
      p.maxSpeed = Math.random() * 8 + 9;
      p.maxForce = p.maxSpeed * 0.12;
      p.particleSize = Math.random() * 1.5 + 2.2;
      p.colorBlendRate = Math.random() * 0.03 + 0.015;

      p.startColor = {
        r: Math.floor(Math.random() * 40 + 20),
        g: Math.floor(Math.random() * 80 + 40),
        b: Math.floor(Math.random() * 100 + 80),
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      setupParticles(canvas, w, h);
    };

    handleResize();

    const loop = () => {
      if (!canvas) return;
      if (document.hidden) {
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      const ctx = canvas.getContext("2d");
      const w = window.innerWidth;
      const h = window.innerHeight;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, w, h);
      frameCountRef.current++;

      // After frame 70, gradually fade into crisp typography
      let crispBlend = 0;
      if (frameCountRef.current > 70) {
        crispBlend = Math.min(1, (frameCountRef.current - 70) / 45);
      }

      // Draw assembling particles
      ctx.globalAlpha = 1 - crispBlend * 0.35;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.move();
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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        willChange: "transform",
      }}
    />
  );
}

// Sleek Futuristik Loading Bar
function LoadingProgressBar({ progress }) {
  return (
    <div
      style={{
        width: "min(320px, 86vw)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0 2px",
          fontFamily: "var(--mono, monospace)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: "rgba(255, 255, 255, 0.9)",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--teal, #4FD1C5)",
              boxShadow: "0 0 10px #4FD1C5",
              animation: "pulse 1.5s infinite",
            }}
          />
          LOADING
        </span>
        <span style={{ color: "var(--teal, #4FD1C5)", textShadow: "0 0 12px rgba(79, 209, 197, 0.5)" }}>
          {progress}%
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "3px",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: "9999px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(79, 209, 197, 0.4)",
            filter: "blur(3px)",
            transform: `translateX(${progress - 100}%)`,
            transition: "transform 0.08s linear",
          }}
        />
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #38BDF8 0%, #4FD1C5 50%, #2DD4BF 100%)",
            boxShadow: "0 0 18px rgba(79, 209, 197, 0.9)",
            width: `${progress}%`,
            transition: "width 0.08s linear",
            borderRadius: "9999px",
          }}
        />
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
    const duration = 2200; // Smooth 2.2s loading timing

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Natural cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 2.8);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsHidden(true);
          }, 800); // Allow scale & blur fade out to complete
        }, 300);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => setIsHidden(true), 400);
  };

  if (isHidden) return null;

  return (
    <div
      className={`welcome-screen-root ${isExiting ? "is-exiting" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#030712",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.06)" : "scale(1)",
        filter: isExiting ? "blur(12px)" : "blur(0px)",
        pointerEvents: isExiting ? "none" : "auto",
      }}
    >
      {/* Layer 1: WebGL Electric Plasma Beam Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <PlasmaShader hue={185} speed={1.3} intensity={1.15} size={1.8} />
      </div>

      {/* Layer 2: Particle Text Assembly Canvas */}
      <ParticleText />

      {/* Layer 3: Foreground UI (Loading Bar & Network Engineer Subtitle) */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "clamp(220px, 32vh, 320px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <LoadingProgressBar progress={count} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--mono, monospace)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            color: "rgba(148, 163, 184, 0.75)",
            textTransform: "uppercase",
          }}
        >
          <span>Muhammad Jaffier Al Zufri</span>
          <span style={{ color: "rgba(79, 209, 197, 0.5)" }}>•</span>
          <span>NOC & Network Engineer</span>
        </div>

        {/* Skip button for rapid navigation */}
        <button
          type="button"
          onClick={handleSkip}
          style={{
            marginTop: "10px",
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            padding: "4px 12px",
            fontFamily: "var(--mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.16em",
            color: "rgba(255, 255, 255, 0.4)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--teal, #4FD1C5)";
            e.currentTarget.style.color = "var(--teal, #4FD1C5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)";
          }}
        >
          [ LEWATI / SKIP ]
        </button>
      </div>
    </div>
  );
}
