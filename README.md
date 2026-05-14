<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=220&section=header&text=Misha%20Lubich&fontSize=70&fontColor=ffffff&fontAlignY=38&desc=Senior%20AI%20Engineer%20%E2%80%A2%20ex-Apple%20%E2%80%A2%20UC%20Berkeley&descAlignY=58&descSize=18&animation=fadeIn" alt="header" />
</p>

<h1 align="center">Hi, I'm Misha Lubich 👋</h1>

<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=4F8CFF&center=true&vCenter=true&width=720&lines=Senior+AI+Engineer+%26+Technical+Leader;Building+Scalable+AI+Systems;Multi-Agent+Orchestration+%7C+RAG+%7C+MLOps;Shipping+production+ML+at+100M%2B+user+scale" alt="Typing SVG" />
  </a>
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=ml-lubich&label=Profile%20views&color=4F8CFF&style=flat" alt="Profile views" />
  <a href="https://github.com/ml-lubich?tab=followers"><img src="https://img.shields.io/github/followers/ml-lubich?label=Followers&style=flat&color=4F8CFF" alt="GitHub followers" /></a>
  <a href="https://github.com/ml-lubich"><img src="https://img.shields.io/github/stars/ml-lubich?label=Stars&style=flat&color=4F8CFF" alt="GitHub stars" /></a>
</p>

<p align="center">
  <a href="https://mishalubich.com"><strong>mishalubich.com</strong></a> ·
  <a href="https://www.linkedin.com/in/misha-lubich/"><strong>LinkedIn</strong></a> ·
  <a href="https://scholar.google.com/citations?hl=en&user=Be6ZA78AAAAJ"><strong>Google Scholar</strong></a> ·
  <a href="mailto:Michaelle.lubich@gmail.com"><strong>Email</strong></a>
</p>

---

### 📚 Table of Contents

- [About Me](#-about-me)
- [What I'm Building](#-what-im-building)- [Career timeline](#-career-timeline)
- [Skill graph](#-skill-graph)- [Tech Stack](#️-tech-stack)
- [Featured Projects](#-featured-projects)
- [GitHub Stats](#-github-stats)
- [Profile Summary](#-profile-summary)
- [Trophies](#-trophies)
- [Contribution Graph](#-contribution-graph)
- [3D Contribution Calendar](#-3d-contribution-calendar)
- [Contribution Snake](#-contribution-snake)
- [Top Repos](#-top-repos)

---

### 👨‍💻 About Me

Senior AI Engineer specializing in **AI-driven, cloud-native applications** that scale to millions of users. Led the design and deployment of production AI platforms with multi-agent orchestration at **Braintrust Data**, **Apple**, and **Walmart**. UC Berkeley CS grad with 6 published research papers and 100M+ users impacted.

- 🔭 **Currently:** Building AI-powered SaaS products & leading ML platform development at **Braintrust Data**
- 🌱 **Exploring:** Multi-agent systems, RAG pipelines, production ML at scale
- 💬 **Ask me about:** AI/ML systems, system design, clean code, shipping fast
- 📫 **Email:** [Michaelle.lubich@gmail.com](mailto:Michaelle.lubich@gmail.com)

---

### 🏗️ What I'm Building

```mermaid
flowchart LR
    ME(("👨‍💻<br/>Misha"))
    AI{{"🤖 AI Platforms<br/>multi-agent · RAG · MLOps"}}
    SAAS["🚀 Vertical SaaS<br/>Reviewly · LeadPipe · ScrapeChat"]
    WEB["🌐 Web · TypeScript<br/>Next.js · Tailwind · Bun"]
    PY["🐍 Python · ML<br/>PyTorch · LangChain · OpenAI"]
    INFRA["☁️ Cloud / Infra<br/>AWS · GCP · K8s · Terraform"]
    USERS[/"📈 100M+ users<br/>shipped"/]

    ME --> AI
    ME --> SAAS
    AI --> PY
    SAAS --> WEB
    AI --> INFRA
    SAAS --> INFRA
    AI --> USERS
    SAAS --> USERS

    classDef io fill:#0e1116,stroke:#2f81f7,stroke-width:1.5px,color:#e6edf3;
    classDef brain fill:#161b22,stroke:#d29922,stroke-width:1.5px,color:#e6edf3;
    classDef tool fill:#161b22,stroke:#3fb950,stroke-width:1.5px,color:#e6edf3;
    classDef out fill:#0e1116,stroke:#a371f7,stroke-width:1.5px,color:#e6edf3;
    class ME io;
    class AI brain;
    class SAAS,WEB,PY,INFRA tool;
    class USERS out;
```

---

### 🧭 Career timeline

```mermaid
timeline
    title Career trajectory
    2019 : UC Berkeley — CS undergrad
    2021 : Honda Innovations — SWE intern (ML route optimization)
         : LBNL — ML research intern (env. data)
    2022 : Walmart Global Tech — SWE intern (ad-targeting ML, Spring Boot)
    2023 : Apple — SDET, CoreOS / File Systems (APFS, LLM-assisted automation)
    2024 : Independent consulting — lupfr.com · w3sourcing.com
    2025 : Indie SaaS — Reviewly · LeadPipe · ScrapeChat
```

---

### 🧠 Skill graph

```mermaid
flowchart LR
    AI(("AI / ML"))
    SYS(("Systems"))
    PROD(("Product"))

    LLM["LLMs · RAG · agents"]
    DL["PyTorch · fine-tuning"]
    MLOPS["MLOps · evals · obs"]
    DIST["distributed compute"]
    CLOUD["AWS · GCP · k8s"]
    DB["Postgres · Supabase · Redis"]
    WEB["Next.js · React · Tailwind"]
    UX["product · UX · pricing"]
    SHIP["ship fast · iterate"]

    AI --> LLM
    AI --> DL
    AI --> MLOPS
    SYS --> DIST
    SYS --> CLOUD
    SYS --> DB
    PROD --> WEB
    PROD --> UX
    PROD --> SHIP
    MLOPS -.-> CLOUD
    LLM   -.-> WEB
    DB    -.-> WEB
```

---

### �🛠️ Tech Stack

<p>
  <img src="https://skillicons.dev/icons?i=python,typescript,go,java,cpp,rust,postgres&perline=8" alt="Languages" /><br/>
  <img src="https://skillicons.dev/icons?i=pytorch,tensorflow,openai,react,nextjs,tailwind,nodejs,fastapi&perline=8" alt="Frameworks" /><br/>
  <img src="https://skillicons.dev/icons?i=aws,gcp,azure,vercel,docker,kubernetes,terraform,redis&perline=8" alt="Cloud" />
</p>

**Languages:** Python · TypeScript · Go · Java · C++ · Rust · SQL  
**AI/ML:** PyTorch · TensorFlow · LangChain · OpenAI · RAG · Fine-Tuning · Multi-Agent Systems  
**Frontend:** React · Next.js · Tailwind CSS · Framer Motion  
**Backend:** Node.js · FastAPI · PostgreSQL · Supabase · Redis  
**Cloud:** AWS · GCP · Azure · Vercel · Docker · Kubernetes · Terraform  
**Tools:** Git · CI/CD · MLOps · Prompt Engineering

---

### 🚀 Featured Projects

| Project | Description | Link |
|---------|-------------|------|
| **Lupfr** | SF music events & talent curation platform | [lupfr.com](https://lupfr.com) |
| **Reviewly** | AI-powered Google Review automation for businesses | [reviewly-self.vercel.app](https://reviewly-self.vercel.app) |
| **ScrapeChatAI** | Chat-based web scraper with AI-generated Playwright scripts | [scrapechat.vercel.app](https://scrapechat.vercel.app) |
| **LeadPipe AI** | AI-powered lead generation for local trade businesses | [leadpipe-two.vercel.app](https://leadpipe-two.vercel.app) |
| **W3Sourcing** | Premium recruitment website for Tech, Legal & Finance | [w3sourcing.com](https://w3sourcing.com) |
| **EnrichData** | AI-driven CRM enhancement platform | [enrichdata.net](https://enrichdata.net) |
| **Portfolio** | Personal portfolio with 2026 animations & glassmorphism | [mishalubich.com](https://mishalubich.com) |

---

### 📊 GitHub Stats

<p align="center">
  <a href="https://github.com/ml-lubich">
    <img height="170" src="https://github-readme-stats-eight-theta.vercel.app/api?username=ml-lubich&hide=issues&show_icons=true&theme=gotham&locale=en&cache_seconds=86400" alt="Misha's GitHub Stats" />
  </a>
  <a href="https://github.com/ml-lubich">
    <img height="170" src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=ml-lubich&layout=compact&theme=gotham&cache_seconds=86400" alt="Top Languages" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/ml-lubich">
    <img src="https://streak-stats.demolab.com?user=ml-lubich&theme=gotham&hide_border=false" alt="GitHub Streak" />
  </a>
</p>

---

### 📈 Contribution Graph

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=ml-lubich&bg_color=0d1117&color=4f8cff&line=4f8cff&point=ffffff&area=true&hide_border=true" alt="Activity Graph" />
</p>

---

### 🐍 Contribution Snake

<p align="center">
  <img src="https://raw.githubusercontent.com/ml-lubich/ml-lubich/output/github-contribution-grid-snake-dark.svg" alt="Snake animation" />
</p>

---

### 💡 Random Dev Quote

<p align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=gotham" alt="Readme Quotes" />
</p>

---

### 🪪 Profile Summary

<p align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=ml-lubich&theme=github_dark" alt="Profile Details" />
</p>

<p align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=ml-lubich&theme=github_dark" alt="Repos per language" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=ml-lubich&theme=github_dark" alt="Most commit language" />
</p>

<p align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=ml-lubich&theme=github_dark" alt="Stats" />
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=ml-lubich&theme=github_dark&utcOffset=-7" alt="Productive time" />
</p>

---

### 🏆 Trophies

<p align="center">
  <a href="https://github.com/ryo-ma/github-profile-trophy">
    <img src="https://github-profile-trophy.vercel.app/?username=ml-lubich&theme=gruvbox&no-frame=true&no-bg=true&margin-w=6&row=2&column=4" alt="Trophies" />
  </a>
</p>

---

### 🧊 3D Contribution Calendar

<p align="center">
  <img src="https://raw.githubusercontent.com/ml-lubich/ml-lubich/main/profile-3d-contrib/profile-night-rainbow.svg" alt="3D contributions" />
</p>

---

### 📌 Top Repos

<p align="center">
  <a href="https://github.com/ml-lubich?tab=repositories&sort=stargazers">
    <img src="https://github-contributor-stats.vercel.app/api?username=ml-lubich&limit=5&theme=gotham&combine_all_yearly_contributions=true" alt="Top contributed repos" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/ml-lubich/ai-video-generator"><img src="https://img.shields.io/badge/-ai--video--generator-1f2937?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://github.com/ml-lubich/website-scraper"><img src="https://img.shields.io/badge/-website--scraper-1f2937?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://github.com/ml-lubich/music-sentimental-analysis"><img src="https://img.shields.io/badge/-music--sentimental--analysis-1f2937?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://github.com/ml-lubich/cute-svgs"><img src="https://img.shields.io/badge/-cute--svgs-1f2937?style=for-the-badge&logo=github&logoColor=white" /></a>
</p>

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=120&section=footer&text=Ship%20fast.%20Ship%20clean.%20Then%20ship%20faster.&fontSize=20&fontColor=ffffff&fontAlignY=70&animation=twinkling" alt="footer" />
</p>


## 🗺️ Repository map

Top-level layout of `ml-lubich` rendered as a Mermaid mindmap (auto-generated from the on-disk tree).

```mermaid
mindmap
  root((ml-lubich))
    profile-3d-contrib/
      profile-gitblock.svg
      profile-green-animate.svg
      profile-green.svg
      profile-night-green.svg
      profile-night-rainbow.svg
      profile-night-view.svg
    files
      README.md
```


## 📊 Code composition

File-type breakdown of source under this repo (skips `.git`, `node_modules`, build caches, lockfiles).

```mermaid
pie showData title File-type composition of ml-lubich (11 files)
    "SVG image" : 10
    "Markdown" : 1
```
