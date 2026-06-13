/* ════════════════════════════════════════════════════════════════
   Ali's AI assistant — front-end chat engine
   ----------------------------------------------------------------
   Two modes:
   1. If window.__CHAT_ENDPOINT__ is set (a Cloudflare Worker proxying
      the Claude API), real Claude answers are streamed in.
   2. Otherwise, a built-in knowledge-base responder answers locally.
      No backend, no API key — works on static GitHub Pages.
   ════════════════════════════════════════════════════════════════ */
(function () {
  const BASE = window.__ALI_BASE__ || '';
  const ENDPOINT = window.__CHAT_ENDPOINT__ || null;

  const fab = document.getElementById('chat-fab');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close');
  const log = document.getElementById('chat-log');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const chips = document.getElementById('chat-chips');
  if (!fab || !panel || !log || !form || !input) return;

  /* ── Knowledge base (used by the local responder) ──────────────── */
  const KB = [
    {
      keys: ['research', 'phd', 'ris', 'radar', 'wireless', 'sensing', 'localization', 'optimization', 'valaee', 'signal', 'doctoral', 'thesis'],
      a: `Ali is a PhD candidate in Electrical & Computer Engineering at the University of Toronto, in the Wireless Internet Research Lab under Prof. Shahrokh Valaee. His research is on intelligent wireless sensing — optimizing Reconfigurable Intelligent Surfaces (RIS) for precise radar-based localization and sensing. It blends optimization theory (evolutionary algorithms, MCMC, convex relaxation) with model-based deep learning, and has produced four peer-reviewed IEEE papers. He expects to finish in August 2026. <a href="${BASE}/research/">See the research page →</a>`,
    },
    {
      keys: ['teach', 'teaching', 'instructor', 'ta', 'course', 'courses', 'lecture', 'student', 'university', 'uoft', 'professor', 'hire'],
      a: `Ali has supported instruction across 40+ distinct University of Toronto courses (UTM, UTSC, and St. George) as a TA and course instructor — from intro programming and calculus to machine learning, AI, data structures, and networks. He's also designed and taught pre-university enrichment courses (a games/strategy/AI course and two iterations of a critical-thinking-in-statistics course). Evaluations consistently praise his clear explanations and patience. <a href="${BASE}/teaching/">See the teaching page →</a>`,
    },
    {
      keys: ['industry', 'engineer', 'engineering', 'ml', 'ai', 'agentic', 'agent', 'langgraph', 'crewai', 'production', 'pipeline', 'nlu', 'hara', 'job', 'work', 'machine learning'],
      a: `On the industry side, Ali has 6+ years building ML systems in production and research. At HARA AI he built the NLU layer for a Persian automated call-center using transformers on a 10M+ sentence corpus; at the University of Tehran he built ML pipelines for network-traffic classification. Recently he's been building agentic AI systems with LangGraph, the OpenAI Agents SDK, and CrewAI. He delivered a 50% radar detection-accuracy gain in his research work. <a href="${BASE}/industry/">See the industry page →</a>`,
    },
    {
      keys: ['tutor', 'tutoring', 'book', 'booking', 'lessons', 'mentor', 'stem', 'high school', 'family', 'families', 'rate', 'price', 'cost'],
      a: `Ali offers high-touch 1:1 STEM tutoring and mentorship for ambitious students — clarity, structure, and expert guidance, in-person in the GTA or online. <a href="${BASE}/tutoring/">Book tutoring or see details →</a>`,
    },
    {
      keys: ['contact', 'email', 'reach', 'linkedin', 'github', 'scholar', 'hire', 'available', 'get in touch'],
      a: `You can reach Ali by email at <a href="mailto:aliparchekan@gmail.com">aliparchekan@gmail.com</a>, or find him on <a href="https://www.linkedin.com/in/ali-parchekani-6a2978b0/" target="_blank" rel="noopener">LinkedIn</a>, <a href="https://github.com/aliparchekan" target="_blank" rel="noopener">GitHub</a>, and <a href="https://scholar.google.com/citations?user=soH-zaAAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a>. <a href="${BASE}/contact/">Contact page →</a>`,
    },
    {
      keys: ['education', 'degree', 'masters', 'msc', 'bsc', 'tehran', 'rank', 'background', 'study'],
      a: `Ali completed his M.Sc. in Electrical Engineering (Communication Systems) at the University of Tehran, graduating ranked 1st in his cohort, and his B.Sc. in the same department, ranked 3rd. His M.Sc. is credential-evaluated as equivalent to a U.S. M.S. in Electrical Engineering. He's now finishing his PhD at the University of Toronto (expected August 2026). <a href="${BASE}/about/">Full bio →</a>`,
    },
    {
      keys: ['who', 'about', 'yourself', 'ali', 'parchekani', 'summary', 'overview', 'do you do'],
      a: `Ali Parchekani is a University of Toronto ECE PhD candidate working at the intersection of wireless sensing, applied AI, and technical education. He helps universities, students, and engineering teams turn difficult technical ideas into clear, working systems — through research, teaching, and high-touch tutoring. <a href="${BASE}/about/">Read the full bio →</a>`,
    },
    {
      keys: ['location', 'where', 'toronto', 'based', 'city', 'remote', 'gta'],
      a: `Ali is based in Toronto, Ontario, Canada. He's available for academic teaching positions, STEM tutoring (in-person in the GTA or online), and engineering/research collaborations.`,
    },
  ];

  const GREETING = `Hi! I'm Ali's AI assistant 👋 I can tell you about his research, teaching, industry & AI work, tutoring, or how to get in touch. What would you like to know?`;

  const FALLBACK = `I'm not sure I have a great answer for that one. Try asking about Ali's research, teaching, industry/AI work, tutoring, or contact details — or tap a suggestion above. You can also email him directly at <a href="mailto:aliparchekan@gmail.com">aliparchekan@gmail.com</a>.`;

  function localAnswer(qRaw) {
    const q = qRaw.toLowerCase();
    if (/^(hi|hey|hello|yo|sup|hiya|good (morning|afternoon|evening))\b/.test(q)) return GREETING;
    if (/(thank|thanks|cheers|appreciate)/.test(q)) return `You're welcome! Anything else you'd like to know about Ali?`;
    let best = null, bestScore = 0;
    for (const item of KB) {
      let score = 0;
      for (const k of item.keys) if (q.includes(k)) score += k.length > 4 ? 2 : 1;
      if (score > bestScore) { bestScore = score; best = item; }
    }
    return bestScore > 0 ? best.a : FALLBACK;
  }

  /* ── UI plumbing ───────────────────────────────────────────────── */
  let opened = false;
  function addMsg(html, who) {
    const el = document.createElement('div');
    el.className = 'chat-msg ' + who;
    el.innerHTML = html;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }
  function showTyping() {
    const el = document.createElement('div');
    el.className = 'chat-msg bot';
    el.innerHTML = '<span class="chat-typing"><span></span><span></span><span></span></span>';
    el.dataset.typing = '1';
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function openChat() {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    fab.classList.add('is-hidden');
    if (!opened) { opened = true; setTimeout(() => addMsg(GREETING, 'bot'), 250); }
    setTimeout(() => input.focus(), 320);
  }
  function closeChat() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    fab.classList.remove('is-hidden');
  }

  fab.addEventListener('click', openChat);
  closeBtn && closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('is-open')) closeChat(); });

  const history = [];

  async function respond(q) {
    const typing = showTyping();
    let answer;
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: q, history }),
        });
        if (!res.ok) throw new Error('bad status');
        const data = await res.json();
        answer = data.reply || localAnswer(q);
      } else {
        await new Promise((r) => setTimeout(r, 450 + Math.random() * 400));
        answer = localAnswer(q);
      }
    } catch (_) {
      answer = localAnswer(q);
    }
    typing.remove();
    addMsg(answer, 'bot');
    history.push({ role: 'user', content: q });
    history.push({ role: 'assistant', content: answer.replace(/<[^>]+>/g, '') });
    if (history.length > 12) history.splice(0, history.length - 12);
  }

  function send(q) {
    const text = (q || '').trim();
    if (!text) return;
    addMsg(text.replace(/</g, '&lt;'), 'user');
    if (chips) chips.style.display = 'none';
    respond(text);
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value; input.value = ''; send(v); });
  chips && chips.addEventListener('click', (e) => {
    const t = e.target.closest('.chat-chip');
    if (t) send(t.dataset.q);
  });
})();
