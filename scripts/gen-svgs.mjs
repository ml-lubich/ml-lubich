#!/usr/bin/env node
// Generates every animated SVG in assets/ (dark + light variants).
// Zero deps. Run: node scripts/gen-svgs.mjs
// SVGs are embedded on GitHub as <img>, so only SMIL + CSS animations are used
// (no JS, no external fonts). Everything is deterministic (seeded PRNG).

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");
mkdirSync(OUT, { recursive: true });

const SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

// ─── theme ────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: ["#071428", "#0A1F44", "#10306A"],
    card: "#081A36",
    cardStroke: "#1E5FD9",
    text: "#E6EDF3",
    muted: "#9FB3C8",
    accent: "#39A7FF",
    accent2: "#1E5FD9",
    hot: "#7DD3FC",
    line: "#39A7FF",
    lineOp: 0.28,
  },
  light: {
    bg: ["#FFFFFF", "#F3F7FF", "#E4EDFF"],
    card: "#FFFFFF",
    cardStroke: "#1E5FD9",
    text: "#0A1F44",
    muted: "#4B5C75",
    accent: "#1E5FD9",
    accent2: "#39A7FF",
    hot: "#0B63E5",
    line: "#1E5FD9",
    lineOp: 0.32,
  },
};

// Seeded PRNG (mulberry32) so every run emits identical bytes.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const r1 = (n) => Math.round(n * 10) / 10;

function frame(t, w, h, title, body, extraDefs = "", extraCss = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${t.bg[0]}"/><stop offset="50%" stop-color="${t.bg[1]}"/><stop offset="100%" stop-color="${t.bg[2]}"/>
  </linearGradient>
  <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${t.accent2}"/><stop offset="100%" stop-color="${t.accent}"/>
  </linearGradient>
  <radialGradient id="glow"><stop offset="0%" stop-color="${t.accent}" stop-opacity="0.45"/><stop offset="100%" stop-color="${t.accent}" stop-opacity="0"/></radialGradient>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
  ${extraDefs}
  <style>
    text { font-family: ${SANS}; }
    .mono { font-family: ${MONO}; }
    .in { opacity: 0; animation: fadeUp .9s cubic-bezier(.2,.7,.2,1) forwards; }
    @keyframes fadeUp { from { opacity: 0 } to { opacity: 1 } } /* opacity only: a CSS transform would override the SVG transform attr */
    @keyframes pulse { 0%,100% { opacity: .35 } 50% { opacity: 1 } }
    @keyframes breathe { 0%,100% { transform: scale(1) } 50% { transform: scale(1.08) } }
    @keyframes dash { to { stroke-dashoffset: 0 } }
    ${extraCss}
  </style>
</defs>
<rect width="${w}" height="${h}" rx="24" fill="url(#bg)"/>
<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="23" fill="none" stroke="url(#accent)" stroke-opacity="0.55"/>
${body}
</svg>
`;
}

function write(name, svg) {
  const p = join(OUT, name);
  writeFileSync(p, svg);
  console.log(`${name.padEnd(22)} ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}

// ─── 1. hero ──────────────────────────────────────────────────────────
function hero(t) {
  const W = 1200, H = 340;
  const rand = rng(7);
  // constellation lives on the right ~55% of the banner
  const nodes = [];
  for (let i = 0; i < 46; i++) {
    nodes.push({ x: 560 + rand() * 610, y: 24 + rand() * (H - 48), r: 1.6 + rand() * 2.4, d: r1(rand() * 6), p: 3 + r1(rand() * 4) });
  }
  const edges = [];
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 118) edges.push([a, b, d]);
    }
  const rand2 = rng(11);
  const packets = edges.filter(() => rand2() < 0.22).slice(0, 18);

  const body = `
<ellipse cx="900" cy="170" rx="360" ry="200" fill="url(#glow)" style="animation:pulse 7s ease-in-out infinite"/>
<ellipse cx="80" cy="340" rx="260" ry="120" fill="url(#glow)" opacity=".6" style="animation:pulse 9s ease-in-out 2s infinite"/>
<g stroke="${t.line}" stroke-opacity="${t.lineOp}" stroke-width="1">
${edges.map(([a, b]) => `<line x1="${r1(a.x)}" y1="${r1(a.y)}" x2="${r1(b.x)}" y2="${r1(b.y)}"/>`).join("\n")}
</g>
<g fill="${t.accent}">
${nodes.map((n) => `<circle cx="${r1(n.x)}" cy="${r1(n.y)}" r="${r1(n.r)}"><animate attributeName="opacity" values=".25;1;.25" dur="${n.p}s" begin="${n.d}s" repeatCount="indefinite"/></circle>`).join("\n")}
</g>
<g fill="${t.hot}">
${packets.map(([a, b], i) => `<circle r="2.6"><animate attributeName="cx" values="${r1(a.x)};${r1(b.x)}" dur="${2.2 + (i % 5) * 0.5}s" begin="${r1(i * 0.37)}s" repeatCount="indefinite"/><animate attributeName="cy" values="${r1(a.y)};${r1(b.y)}" dur="${2.2 + (i % 5) * 0.5}s" begin="${r1(i * 0.37)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="${2.2 + (i % 5) * 0.5}s" begin="${r1(i * 0.37)}s" repeatCount="indefinite"/></circle>`).join("\n")}
</g>
<!-- left: identity -->
<g transform="translate(56,0)">
  <text class="in" y="76" fill="${t.accent}" font-size="13" font-weight="700" letter-spacing="3.5">STAFF AI ENGINEER @ ECHOSTAR</text>
  <text class="in" style="animation-delay:.15s" y="150" fill="${t.text}" font-size="66" font-weight="800" letter-spacing="-1.5">Misha Lubich</text>
  <text class="in" style="animation-delay:.3s" y="188" fill="${t.muted}" font-size="19" font-weight="500">Agentic Engineer · production LLM systems, MCP tool servers &amp; multi-agent orchestration</text>
  <g class="in" style="animation-delay:.45s" transform="translate(0,216)" font-size="13" font-weight="700" letter-spacing=".6">
    ${["ex-Apple CoreOS", "UC Berkeley CS '23", "6 papers", "100M+ users", "SF Bay Area"]
      .reduce((acc, label) => {
        const w = label.length * 7.6 + 30;
        acc.out += `<g transform="translate(${acc.x},0)"><rect width="${w}" height="30" rx="15" fill="${t.card}" stroke="${t.cardStroke}" stroke-opacity=".45"/><text x="${w / 2}" y="20" text-anchor="middle" fill="${t.accent}">${esc(label)}</text></g>`;
        acc.x += w + 10;
        return acc;
      }, { x: 0, out: "" }).out}
  </g>
  <g class="in" style="animation-delay:.6s" transform="translate(0,284)" font-size="14" fill="${t.muted}">
    <text class="mono">$ brew install ml-lubich/tap/imsg<tspan fill="${t.accent}"><animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>▍</tspan></text>
  </g>
</g>`;
  return frame(t, W, H, "Misha Lubich — Staff AI Engineer at EchoStar. Agentic engineer: production LLM systems, MCP tool servers, multi-agent orchestration, RAG, evals and guardrails. ex-Apple CoreOS, UC Berkeley CS, 6 published papers, 100M+ users.", body);
}

// ─── 2. impact strip ──────────────────────────────────────────────────
function impact(t) {
  const W = 1200, H = 176;
  const stats = [
    ["100M+", "users reached", "production AI at consumer scale"],
    ["6", "published papers", "ML & hydrology · Google Scholar"],
    ["10", "open-source tools", "CLI + MCP · brew ml-lubich/tap"],
    ["5+", "years shipping", "Apple · Walmart · LBNL · Polaris"],
    ["ex-Apple", "CoreOS · File Systems", "APFS test automation"],
  ];
  const gap = 16, x0 = 28, cw = (W - x0 * 2 - gap * 4) / 5;
  const C = 2 * Math.PI * 18;
  const body = `
<ellipse cx="1000" cy="0" rx="300" ry="120" fill="url(#glow)" style="animation:pulse 6s ease-in-out infinite"/>
${stats.map(([big, label, sub], i) => `
<g class="in" style="animation-delay:${i * 0.12}s" transform="translate(${r1(x0 + i * (cw + gap))},24)">
  <rect width="${r1(cw)}" height="128" rx="18" fill="${t.card}" stroke="${t.cardStroke}" stroke-opacity=".4"/>
  <g transform="translate(${r1(cw - 42)},40)">
    <circle r="18" fill="none" stroke="${t.cardStroke}" stroke-opacity=".25" stroke-width="3"/>
    <circle r="18" fill="none" stroke="url(#accent)" stroke-width="3" stroke-linecap="round" transform="rotate(-90)" stroke-dasharray="${r1(C)}" stroke-dashoffset="${r1(C)}" style="animation:dash 1.6s ${0.2 + i * 0.15}s cubic-bezier(.2,.7,.2,1) forwards"/>
    <circle r="4" fill="${t.accent}" style="animation:pulse 2.4s ${i * 0.3}s ease-in-out infinite"/>
  </g>
  <text x="22" y="58" fill="${t.accent}" font-size="${big.length > 4 ? 30 : 38}" font-weight="800" letter-spacing="-1">${esc(big)}</text>
  <text x="22" y="84" fill="${t.text}" font-size="14" font-weight="700">${esc(label)}</text>
  <text x="22" y="106" fill="${t.muted}" font-size="12">${esc(sub)}</text>
</g>`).join("")}`;
  return frame(t, W, H, "Impact at a glance: 100M+ users reached, 6 published papers, 10 open-source agent tools, 5+ years shipping, ex-Apple CoreOS.", body);
}

// ─── 3. career timeline ───────────────────────────────────────────────
function timeline(t) {
  const W = 1200, H = 330;
  // months since Jan 2021 → x
  const m = (y, mo) => (y - 2021) * 12 + (mo - 1);
  const X0 = 70, X1 = 1130, SPAN = m(2027, 4);
  const px = (mm) => r1(X0 + (mm / SPAN) * (X1 - X0));
  const roles = [
    { name: "Honda Innovations", role: "SWE Intern · ML route optimization", s: m(2021, 1), e: m(2021, 5), up: true },
    { name: "LBNL", role: "Software Engineer · ML on environmental data", s: m(2021, 5), e: m(2021, 8), up: false },
    { name: "Walmart", role: "Software Engineer · ad-targeting ML", s: m(2022, 5), e: m(2022, 8), up: true },
    { name: "Apple", role: "SDET · CoreOS / File Systems (APFS)", s: m(2023, 1), e: m(2024, 7), up: false },
    { name: "Polaris Wireless", role: "Platform & AI Engineer · MCP, vLLM, ClickHouse", s: m(2024, 9), e: m(2026, 9), up: true },
    { name: "EchoStar", role: "Staff AI Engineer · agents, RAG, evals at consumer scale", s: m(2026, 9), e: SPAN, up: false, now: true },
  ];
  const Y = 170;
  const years = [2021, 2022, 2023, 2024, 2025, 2026];
  const body = `
<ellipse cx="1050" cy="${Y}" rx="260" ry="120" fill="url(#glow)" style="animation:pulse 6s ease-in-out infinite"/>
<text x="40" y="44" fill="${t.accent}" font-size="12" font-weight="700" letter-spacing="3">CAREER TIMELINE</text>
<text x="40" y="66" fill="${t.muted}" font-size="13">Six years, six teams — from research intern to Staff AI Engineer.</text>
<!-- year ticks -->
<g font-size="11" fill="${t.muted}" text-anchor="middle">
${years.map((y) => `<line x1="${px(m(y, 1))}" y1="${Y - 6}" x2="${px(m(y, 1))}" y2="${Y + 6}" stroke="${t.muted}" stroke-opacity=".5"/><text x="${px(m(y, 1))}" y="${Y + 24}" opacity=".8">${y}</text>`).join("")}
</g>
<line x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}" stroke="${t.line}" stroke-opacity=".3" stroke-width="2"/>
<line x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}" stroke="url(#accent)" stroke-width="2" stroke-dasharray="${X1 - X0}" stroke-dashoffset="${X1 - X0}" style="animation:dash 2.4s cubic-bezier(.4,0,.2,1) forwards"/>
<!-- role bars -->
${roles.map((r, i) => {
    const x = px(r.s), w = Math.max(10, px(r.e) - px(r.s));
    const ly = r.up ? Y - 52 : Y + 58; // label baseline
    const dates = r.now ? "Sep 2026 – now" : `${["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][(r.s % 12) + 1]} ${2021 + Math.floor(r.s / 12)} – ${["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][(r.e % 12) + 1]} ${2021 + Math.floor(r.e / 12)}`;
    return `
<g class="in" style="animation-delay:${0.5 + i * 0.28}s">
  <rect x="${x}" y="${Y - 5}" width="${r1(w)}" height="10" rx="5" fill="${r.now ? "url(#accent)" : t.accent2}" opacity="${r.now ? 1 : 0.85}"/>
  <line x1="${x}" y1="${Y}" x2="${x}" y2="${r.up ? ly + 8 : ly - 26}" stroke="${t.line}" stroke-opacity=".45" stroke-dasharray="2 3"/>
  <circle cx="${x}" cy="${Y}" r="6" fill="${t.card}" stroke="${t.accent}" stroke-width="2.5"/>
  ${r.now ? `<circle cx="${x}" cy="${Y}" r="6" fill="none" stroke="${t.accent}" stroke-width="2"><animate attributeName="r" values="6;22" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="2s" repeatCount="indefinite"/></circle>` : ""}
  <g text-anchor="${r.now ? "end" : "start"}" transform="translate(${r.now ? X1 : x},0)">
  <text y="${ly}" fill="${t.text}" font-size="${r.now ? 17 : 15}" font-weight="800">${esc(r.name)}</text>
  <text y="${ly + 17}" fill="${t.muted}" font-size="11.5">${esc(r.role)}</text>
  <text y="${ly - 18}" fill="${t.accent}" font-size="10.5" font-weight="700" letter-spacing=".8">${esc(dates.toUpperCase())}</text>
  </g>
</g>`;
  }).join("")}
<!-- Berkeley graduation flag -->
<g class="in" style="animation-delay:1.6s" transform="translate(${px(m(2023, 5))},${Y})">
  <line y1="0" y2="-32" stroke="${t.hot}" stroke-width="1.5"/>
  <path d="M0,-32 h130 l-8,9 8,9 h-130 z" fill="${t.hot}" opacity=".9"/>
  <text x="6" y="-19" fill="${t === THEMES.dark ? "#06182F" : "#FFFFFF"}" font-size="9.5" font-weight="800" letter-spacing=".5">UC BERKELEY CS '23</text>
</g>
<!-- honest side-note -->
<g class="in" style="animation-delay:2.4s" transform="translate(40,${H - 32})">
  <circle cx="5" cy="-4" r="3" fill="${t.accent}"/>
  <text x="16" fill="${t.muted}" font-size="11.5">2026: offers &amp; final rounds at <tspan fill="${t.text}" font-weight="700">Anduril</tspan> and <tspan fill="${t.text}" font-weight="700">Mach Industries</tspan> — chose EchoStar for consumer-scale impact.</text>
</g>`;
  return frame(t, W, H, "Career timeline: Honda Innovations (2021), Lawrence Berkeley National Laboratory (2021), Walmart (2022), Apple CoreOS / File Systems (2023–2024), UC Berkeley B.A. CS 2023, Polaris Wireless (2024–2026), EchoStar Staff AI Engineer (Sep 2026–present). Offers and final rounds at Anduril and Mach Industries in 2026.", body);
}

// ─── 4. skill constellation ───────────────────────────────────────────
function skills(t) {
  const W = 1200, H = 440;
  const cx = 600, cy = 224;
  const domains = [
    { name: "Agents & MCP", tags: ["Claude API", "MCP servers", "sub-agents", "agent skills"] },
    { name: "Multi-Agent", tags: ["LangGraph", "CrewAI", "orchestration", "loop-detection"] },
    { name: "RAG", tags: ["pgvector", "FAISS", "re-ranking", "adaptive chunking"] },
    { name: "Evals & Guardrails", tags: ["RAGAS", "DeepEval", "LangSmith", "prompt-injection defense"] },
    { name: "MLOps & Cloud", tags: ["AWS · GCP", "Kubernetes", "vLLM", "Terraform"] },
    { name: "PyTorch / TF", tags: ["fine-tuning", "LoRA · QLoRA", "SageMaker", "MLflow"] },
  ];
  const RX = 440, RY = 150;
  const pos = domains.map((d, i) => {
    const a = -Math.PI / 2 + (i / domains.length) * Math.PI * 2;
    return { ...d, x: r1(cx + Math.cos(a) * RX), y: r1(cy + Math.sin(a) * RY) };
  });
  // hub spokes + ring edges + a few cross edges
  const edges = [];
  pos.forEach((p, i) => {
    edges.push([{ x: cx, y: cy }, p, 3 + i * 0.4]);
    edges.push([p, pos[(i + 1) % pos.length], 4 + i * 0.3]);
  });
  edges.push([pos[0], pos[3], 5.5], [pos[1], pos[4], 6], [pos[2], pos[5], 6.5]);
  const NW = 172, NH = 112;
  const body = `
<ellipse cx="${cx}" cy="${cy}" rx="420" ry="220" fill="url(#glow)" style="animation:pulse 8s ease-in-out infinite"/>
<text x="40" y="44" fill="${t.accent}" font-size="12" font-weight="700" letter-spacing="3">SKILL CONSTELLATION</text>
<g stroke="${t.line}" stroke-opacity=".35" stroke-width="1.5" fill="none">
${edges.map(([a, b]) => `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke-dasharray="${r1(Math.hypot(a.x - b.x, a.y - b.y))}" stroke-dashoffset="${r1(Math.hypot(a.x - b.x, a.y - b.y))}" style="animation:dash 1.8s .3s ease-out forwards"/>`).join("\n")}
</g>
<g fill="${t.hot}">
${edges.map(([a, b, dur], i) => `<circle r="3"><animate attributeName="cx" values="${a.x};${b.x};${a.x}" dur="${dur}s" begin="${r1(i * 0.21)}s" repeatCount="indefinite"/><animate attributeName="cy" values="${a.y};${b.y};${a.y}" dur="${dur}s" begin="${r1(i * 0.21)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0;1;0" dur="${dur}s" begin="${r1(i * 0.21)}s" repeatCount="indefinite"/></circle>`).join("\n")}
</g>
<!-- hub -->
<g class="in" transform="translate(${cx},${cy})">
  <circle r="66" fill="${t.card}" stroke="url(#accent)" stroke-width="2.5"/>
  <circle r="66" fill="none" stroke="${t.accent}" stroke-opacity=".5"><animate attributeName="r" values="66;92" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0" dur="3s" repeatCount="indefinite"/></circle>
  <text y="-6" text-anchor="middle" fill="${t.text}" font-size="16" font-weight="800">Agentic</text>
  <text y="14" text-anchor="middle" fill="${t.text}" font-size="16" font-weight="800">Engineer</text>
  <text y="34" text-anchor="middle" fill="${t.muted}" font-size="9.5">Py · TS · Rust · Go</text>
</g>
<!-- domain nodes -->
${pos.map((p, i) => `
<g class="in" style="animation-delay:${0.3 + i * 0.12}s" transform="translate(${p.x - NW / 2},${p.y - NH / 2})">
  <rect width="${NW}" height="${NH}" rx="16" fill="${t.card}" stroke="${t.cardStroke}" stroke-opacity=".5"/>
  <rect x="0" y="0" width="${NW}" height="4" rx="2" fill="url(#accent)"/>
  <text x="14" y="30" fill="${t.text}" font-size="14" font-weight="800">${esc(p.name)}</text>
  ${p.tags.map((tag, j) => `<text x="14" y="${52 + j * 17}" fill="${t.muted}" font-size="11.5"><tspan fill="${t.accent}">›</tspan> ${esc(tag)}</text>`).join("")}
</g>`).join("")}`;
  return frame(t, W, H, "Skill constellation: Agents & MCP (Claude API, MCP servers, sub-agents, agent skills), Multi-Agent (LangGraph, CrewAI), RAG (pgvector, FAISS, re-ranking), Evals & Guardrails (RAGAS, DeepEval, LangSmith, prompt-injection defense), MLOps & Cloud (AWS, GCP, Kubernetes, vLLM, Terraform), PyTorch / TensorFlow (LoRA, QLoRA fine-tuning). Python, TypeScript, Rust, Go.", body);
}

// ─── 5. OSS tool family ───────────────────────────────────────────────
export const TOOLS = [
  ["imsg", "iMessage CLI + MCP · Rust-accelerated", "brew install ml-lubich/tap/imsg", "macOS"],
  ["imail", "Apple Mail CLI + MCP · Mail.app, no IMAP", "brew install ml-lubich/tap/imail", "macOS"],
  ["inotes", "Apple Notes CLI + MCP", "brew install ml-lubich/tap/inotes", "macOS"],
  ["wa", "WhatsApp CLI + MCP · imsg pattern", "brew install ml-lubich/tap/wa", "Go · Py"],
  ["bb", "gh-style Bitbucket CLI + read-only MCP", "brew install ml-lubich/tap/bitbucket-client", "Cloud · DC"],
  ["confluence-cli", "Confluence bulk ops, agent-safe", "brew install ml-lubich/tap/confluence-cli", "Node"],
  ["pdfify-md", "Markdown / Mermaid → clean PDF", "brew install ml-lubich/tap/pdfify-md", "x-platform"],
  ["jenkins-mcp", "Jenkins CLI + MCP server", "pip install jenkins-mcp-cli", "Py"],
  ["twig", "git worktrees for humans & agent swarms", "pip install twig-cli", "Py · Rust"],
  ["like-fable", "portable prompt library for any AI", "gh repo clone ml-lubich/like-fable", "prompts"],
];
function tools(t) {
  const W = 1200, H = 600;
  const cols = 2, gap = 12, x0 = 28, y0 = 64;
  const cw = (W - x0 * 2 - gap) / cols, ch = 92;
  const body = `
<ellipse cx="200" cy="0" rx="320" ry="110" fill="url(#glow)" style="animation:pulse 7s ease-in-out infinite"/>
<text x="40" y="40" fill="${t.accent}" font-size="12" font-weight="700" letter-spacing="3">OPEN-SOURCE AGENT TOOLS</text>
<text x="1160" y="40" text-anchor="end" fill="${t.muted}" font-size="12">every tool = human CLI <tspan fill="${t.accent}" font-weight="700">+</tspan> MCP / agent surface</text>
${TOOLS.map(([name, desc, install, tag], i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const x = r1(x0 + c * (cw + gap)), y = y0 + r * (ch + gap);
    const tw = tag.length * 6.6 + 14;
    return `
<g class="in" style="animation-delay:${i * 0.08}s" transform="translate(${x},${y})">
  <rect width="${r1(cw)}" height="${ch}" rx="16" fill="${t.card}" stroke="${t.cardStroke}" stroke-opacity=".45"/>
  <rect width="${r1(cw)}" height="${ch}" rx="16" fill="none" stroke="${t.accent}" stroke-opacity=".9"><animate attributeName="stroke-opacity" values="0;.9;0" dur="${TOOLS.length * 0.6}s" begin="${i * 0.6}s" repeatCount="indefinite"/></rect>
  <text class="mono" x="20" y="34" fill="${t.accent}" font-size="19" font-weight="800">${esc(name)}</text>
  <g transform="translate(${r1(cw - tw - 16)},16)"><rect width="${r1(tw)}" height="20" rx="10" fill="${t.accent2}" fill-opacity=".18"/><text x="${r1(tw / 2)}" y="14" text-anchor="middle" fill="${t.accent}" font-size="10" font-weight="700">${esc(tag)}</text></g>
  <text x="${r1(cw - tw - 28)}" y="34" text-anchor="end" fill="${t.text}" font-size="13" font-weight="600">${esc(desc)}</text>
  <rect x="20" y="50" width="${r1(cw - 40)}" height="30" rx="8" fill="${t.bg[0]}" stroke="${t.cardStroke}" stroke-opacity=".3"/>
  <text class="mono" x="32" y="69" fill="${t.muted}" font-size="12"><tspan fill="${t.accent}">$</tspan> ${esc(install)}</text>
</g>`;
  }).join("")}`;
  return frame(t, W, H, "Open-source agent tool family by Misha Lubich: imsg, imail, inotes, wa (WhatsApp), bb (bitbucket-cli), confluence-cli, pdfify-md, jenkins-mcp, twig, like-fable — each a CLI plus an MCP server. Homebrew tap ml-lubich/tap.", body);
}

// ─── emit ─────────────────────────────────────────────────────────────
for (const [name, gen] of Object.entries({ hero, impact, timeline, skills, tools })) {
  for (const [mode, t] of Object.entries(THEMES)) write(`${name}-${mode}.svg`, gen(t));
}
