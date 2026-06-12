# Personal Website Build — Ali Parchekani

Build a fast, polished, dual-audience personal website with a third engineering
showcase. Two equal primary audiences:
(1) academic teaching hiring committees, (2) premium private-tutoring clients/parents.
A third section showcases industry / applied-ML / agentic-AI work.

## Stack & hosting (non-negotiable)
- **Astro** (latest) + **Tailwind CSS** + TypeScript. Static output, minimal client JS.
  Use Astro components, not a SPA framework.
- Must deploy **free** to **GitHub Pages**. Configure `astro.config.mjs` with the correct
  `site` and `base`, add `@astrojs/sitemap`, and include a GitHub Actions workflow
  (`.github/workflows/deploy.yml`) that builds and deploys to Pages on push to `main`.
  Leave a one-line comment showing how to switch to Cloudflare Pages instead.
- No paid service, database, or serverless backend.

## Design direction
- Clean, academic-but-modern: "research lab meets premium service."
- Primary accent `#1F4E79` (deep blue), secondary `#2E75B6`. Generous whitespace.
  Serif headings (Lora or Source Serif via Google Fonts, `font-display: swap`) + Inter body.
- Light mode default; optional simple dark-mode toggle.
- Accessible: semantic HTML, alt text, strong contrast, keyboard nav. Mobile-first, responsive.
- Fast: optimized fonts, lazy-loaded images, Lighthouse-friendly.
- If I provide a Claude Design reference (link or screenshot), match its visual direction
  (colors, type, hero layout) while keeping the structure below.

## Site structure (routes)
- `/` — Home: name, tagline "PhD Candidate, Educator, and Engineer", one-line subhead,
  three equal cards → Teaching, Tutoring, Industry. Short bio. A "selected highlights"
  strip (key metrics). Primary CTAs ("Hire me to teach", "Book tutoring", "See my engineering work").
- `/teaching` — academic teaching profile, evaluations evidence, link to teaching philosophy + CV PDFs.
- `/tutoring` — premium tutoring services, subjects, approach, testimonials, contact CTA.
- `/industry` — applied-ML / agentic-AI work, selected projects, technical skills, industry resume PDF.
- `/research` — publications + research summary.
- `/about` — longer first-person bio.
- `/contact` — email + LinkedIn/GitHub/Scholar; simple mailto form (no backend).
- PDFs in `/public/files/` (academic CV, tutoring profile, teaching philosophy, industry resume),
  linked from relevant pages. I will drop the actual PDF files in myself — reference these names:
  `academic-teaching-cv.pdf`, `premium-tutoring-profile.pdf`, `teaching-philosophy.pdf`,
  `industry-resume.pdf`.
- Per-page SEO meta + Open Graph. JSON-LD `Person` structured data on home.

## Navigation
Home · Teaching · Tutoring · Research · Industry · About · Contact

---

## CONTENT

### Identity
- Name: Ali Parchekani
- Location: Toronto, ON, Canada (Toronto/GTA + online for tutoring)
- Email: aliparchekan@gmail.com · Phone: (647) 766-7304
- LinkedIn: https://www.linkedin.com/in/ali-parchekani-6a2978b0/
- GitHub: https://github.com/aliparchekan
- Google Scholar: https://scholar.google.com/citations?user=soH-zaAAAAAJ&hl=en

### Home
- h1: "Ali Parchekani"
- Tagline: "PhD Candidate, Educator, and Engineer"
- Subhead: "University of Toronto ECE PhD candidate. I teach technical subjects clearly,
  mentor ambitious students, and build AI and wireless systems."
- Short bio: University of Toronto Electrical & Computer Engineering PhD candidate
  specializing in wireless sensing, signal processing, optimization, and applied machine
  learning, with a recent focus on agentic AI systems. Alongside research, an experienced
  educator across 40+ distinct UofT courses and instructor of pre-university statistics,
  AI, and game-design courses — with teaching that consistently earns strong, specific
  student evaluations.
- Selected highlights strip (metrics): "6+ years applied ML & research" · "4 peer-reviewed
  IEEE papers" · "40+ distinct UofT courses taught/TA'd" · "50% radar detection-accuracy gain".

### TEACHING PAGE

Profile: PhD candidate in ECE at the University of Toronto with extensive teaching
experience across mathematics, statistics, computer science, programming, physics, AI,
machine learning, data science, networks, and engineering fundamentals. Supported
instruction across 40+ distinct UofT courses (100+ TA/course-staff appointments) and
independently designed and taught pre-university enrichment courses. Teaching style:
intuition-first explanation, structured problem solving, activity-based learning,
exam-focused support.

Teaching effectiveness (highlighted "evidence" block):
- Game Studies / Games, Strategy & AI (instructor of record; 16 students aged 15–18):
  all responding students rated the course "Excellent" or "Very good"; none Fair/Poor;
  all would recommend it.
- Selected anonymized student comments:
  - "Explained the concepts clearly and helped students during activities."
  - "You always help and guide us through the game-developing process."
  - "If he doesn't know the answer, he will research it and tell us."
  - "I felt I learned more from asking you questions than from following the projector
    screen — I'm glad I had you as the instructor."
- MAT A29 – Calculus I for the Life Sciences (Teaching Assistant, Winter 2025):
  - "My TA went over specific homework questions that relate to the quizzes; his way of
    explaining is straightforward and helpful."
  - "The steps were broken down and explained thoroughly — there was reasoning behind each step."
  - "Very understanding and kind, with great communication skills."

Instructor experience:
- ISA Instructor — Game Studies / Games, Strategy & AI (PRU037H1S), UofT Pre-University
  Programs / New College, April–May 2026. Designed & independently taught a 15-session,
  45-hour course; students built playable AI-enabled game prototypes in GDevelop.
- ISA Instructor — Critical Thinking in Statistics, July–August 2024 (two offerings).
- ISA Instructor — Applied Mathematics in Statistics; Science Across the Spectrum, June–July 2025.

TA experience: 40+ distinct UofT courses across UTM, UTSC, and St. George. Flagship:
CSC108/148 (intro CS), CSCB63/CSCC63 (data structures/theory), CSC311/384 (ML/AI),
STA256/260/457 (probability, stats, time series), MAT223/224 (linear algebra),
ECE361 (communication networks).

Awards & funding: Doctoral Completion Award (two years), UofT doctoral fellowship/funding
package, University of Tehran undergraduate scholarship (three years).

Also: peer reviewer for IEEE GLOBECOM, ICC, PIMRC, and VTC (5 reviews, 2021–2025).

Link to: academic CV PDF + teaching philosophy PDF.

### TUTORING PAGE

Positioning: PhD-level STEM tutoring & academic mentorship. High-touch, for ambitious
high-school, pre-university, undergraduate, graduate, and professional learners.
(Use "premium" / "high-touch", NOT "luxury".)

Best-fit students: high-school/IB/AP/pre-university; first-year university/college in
calculus, physics, statistics, programming, engineering; undergrads needing course
rescue or exam prep; grad students/professionals learning Python, MATLAB, AI, ML, data science.

Core subjects:
- Foundations: calculus, advanced functions, linear algebra, probability, statistics,
  physics, mechanics, programming fundamentals, Python, MATLAB.
- University STEM: data structures, algorithms, data science, AI foundations, ML,
  signals & systems, engineering math, computer networks.
- Advanced mentorship: AI/ML & data-science projects, research prep, technical writing.

Approach (numbered): diagnostic first session → step-by-step concept repair → guided
practice → exam strategy → project support → progress communication.

Testimonials: reuse the anonymized teaching quotes above, labeled by level/subject. Add
"Full anonymized evaluations available on request."

Availability & rates: Toronto/GTA in-person and online (Canadian & international students).
Rates by consultation. CTA "Book a consultation" → mailto with prefilled subject
"Tutoring inquiry — [subject / level]".

### RESEARCH PAGE

Summary: PhD researcher in wireless sensing, radar signal processing, reconfigurable
intelligent surfaces (RIS), optimization, and applied ML, with peer-reviewed IEEE publications.

Peer-reviewed conference papers:
1. A. Parchekani, S. Valaee, "Reconfigurable Intelligent Surface Assisted Sensing and
   Localization using the Swendsen–Wang and Evolutionary Algorithms," IEEE VTC 2023-Fall.
2. A. Parchekani, S. Valaee, "Sensing and Localization using Reconfigurable Intelligent
   Surfaces and the Swendsen–Wang Algorithm," IEEE ICC Workshops 2022.
3. A. Parchekani, S. Valaee, "Sensing via Orthogonal Time Frequency Space Signalling and
   Reconfigurable Intelligent Surface," IEEE PIMRC 2022.
4. A. Parchekani, M. Johnny, S. Valaee, "Model-Based Deep Learning Tuning of Reconfigurable
   Intelligent Surface for OFDM Radar Interference Mitigation," IEEE PIMRC 2025.

Preprints:
- A. Parchekani, S. Nouri, V. Shah-Mansouri, S. P. Shariatpanahi, "Classification of Traffic
  using Neural Networks by Rejecting: A Novel Approach in Classifying VPN Traffic," arXiv:2001.03665.
- A. Parchekani, M. Johnny, S. Valaee, "Reconfigurable Intelligent Surface for OFDM Radar
  Interference Mitigation," arXiv:2502.14730.

### INDUSTRY PAGE

Intro / positioning (summary):
Applied ML engineer and PhD researcher with 6+ years across ML pipelines, optimization
algorithms, and data-driven decision frameworks, with a recent focus on agentic AI systems.
Deep research background in statistical evaluation, experimentation, signal processing, and
high-dimensional optimization, with hands-on engineering across LangGraph, OpenAI Agents SDK,
FastAPI, Next.js, PyTorch, and MLOps tooling. Translates complex research and product
requirements into reproducible, evaluation-driven, deployable systems.

Experience (cards or timeline):
- **Research Assistant — Applied ML & Wireless Sensing**, University of Toronto, Wireless
  Internet Research Lab (Jan 2021 – Present). Designed optimization suites (evolutionary
  search, Swendsen–Wang MCMC, coordinate descent, gradient + convex-relaxation baselines)
  for high-dimensional discrete phase-control in wireless sensing; built end-to-end automotive
  radar simulation pipelines (NumPy/SciPy/Matplotlib + MATLAB Engine); config-driven
  experiments (YAML/JSON); receiver-aware radar deception simulator; two-slot RIS interference
  suppression. Raised radar object-detection accuracy 50%; cut training-data needs 20% and
  improved localization accuracy 10% with model-based deep learning. Delivered system-design
  reports/presentations to Huawei. 4 peer-reviewed IEEE papers + manuscripts under review.
- **Data Scientist**, HARA AI, Tehran (Jan 2020 – Jan 2021). Built the NLU layer for a Persian
  automated call-center: 10M+ sentence corpus, transformer intent classification (BERT/ALBERT/
  DistilBERT in PyTorch), offline eval workflows (>85% intent accuracy), deployed behind FastAPI
  (>70% end-to-end production accuracy).
- **Research Assistant — Network Traffic Analysis & ML**, University of Tehran, Wireless
  Multimedia Communications Lab (Sep 2018 – Jan 2021). ML pipelines for traffic/VPN classification
  and user-behavior modeling; processed 500K+ packet records (PySpark/pandas/NumPy); CNN/RNN/MLP
  classifiers (PyTorch/TF/Keras/scikit-learn, >85% accuracy); inverse reinforcement learning for
  latent user behavior; arXiv manuscript on VPN traffic classification with rejection.

Selected projects (cards):
- **Career Digital Twin — Serverless Conversational AI Agent.** Personalized agent answering
  questions about background/research/projects using OpenAI models + grounded knowledge files.
  Serverless AWS (Lambda, API Gateway, CloudFront, S3) + FastAPI + Next.js; IaC via Terraform;
  prompt architecture with grounding + hallucination-reduction.
- **LangGraph Sidekick — Stateful Browser-Integrated AI Assistant.** Multi-node LangGraph agent
  with persistent memory, conditional routing, tool-use approval gates, self-correction, and
  separate planning/execution/evaluation/response nodes; browser automation, file handling, code
  execution; human-in-the-loop guardrails.
- **Deep Research Multi-Agent System.** OpenAI Agents SDK + Gradio pipeline with planner/search/
  writer/email agents, typed outputs, rate-limited parallel search, synthesis, structured reports.
- **Multi-Agent Engineering Team — CrewAI Software Builder.** Four-agent (manager/developer/
  reviewer/tester) workflow; Docker-isolated build/run/test/debug cycles; iterative feedback.
- **Short-Term Rental Price Prediction — Production-Style ML Pipeline.** Reproducible end-to-end
  pipeline with scikit-learn, MLflow, Weights & Biases, DVC, Hydra; data validation, feature
  engineering, random-forest training, hyperparameter tuning, experiment tracking.

Technical skills (grouped, render as labeled chips/badges):
- Languages: Python, SQL, TypeScript, JavaScript, C, C++, MATLAB, LaTeX
- Agentic AI & LLM Frameworks: LangGraph, OpenAI Agents SDK, CrewAI, MCP, Microsoft AutoGen,
  OpenAI API, Anthropic API, Gradio, RAG, embeddings, tool calling, structured outputs
- ML & Deep Learning: PyTorch, scikit-learn, TensorFlow, Keras, Transformers
- Scientific Computing & Data: NumPy, SciPy, Matplotlib, pandas, PySpark
- Backend, APIs & Web: FastAPI, Next.js, REST APIs, Pydantic, PostgreSQL, Redis, MongoDB
- MLOps & Experiment Tracking: MLflow, Weights & Biases, DVC, Hydra, Docker, GitHub Actions,
  Git, Linux, Bash
- AWS & Infrastructure: AWS Lambda, API Gateway, CloudFront, S3, EC2, VPC, IAM, RDS, Terraform
- Signal Processing & Wireless: OFDM radar processing, DoA estimation, range-Doppler analysis,
  target detection & tracking, vehicular channel modeling, intelligent-surface phase optimization
- Methods & Practices: optimization, gradient/coordinate descent, convex relaxation, evolutionary
  algorithms, MCMC, statistical inference, experimental design, ablation studies, reproducible
  ML pipelines, CI/CD

Link to: industry resume PDF (`industry-resume.pdf`).

### ABOUT PAGE
Longer first-person bio weaving research + teaching + industry. Warm but professional.
Based in Ontario; expected PhD completion August 2026. M.Sc. ranked 1st, B.Sc. ranked 3rd at
University of Tehran; M.Sc. credential-evaluated as equivalent to a U.S. M.S. in EE
(Communication Systems emphasis).

---

## Build process
1. Scaffold Astro + Tailwind + TS; confirm `npm run build` succeeds.
2. Build shared layout, header, footer, theme tokens.
3. Pages in order: Home, Teaching, Tutoring, Industry, Research, About, Contact.
4. SEO/OG meta, sitemap, JSON-LD Person on home.
5. GitHub Actions deploy workflow + README (how to add PDFs, set repo name in
   `astro.config.mjs`, enable Pages).
6. Final `npm run build`; report warnings.
7. **Ask me before running `git push` or deploying.**

## Constraints
- No invented facts beyond this file. Don't fabricate testimonials or rates.
- Keep all student feedback anonymized.
- All content above is approved and accurate — use it verbatim where it reads as copy.
