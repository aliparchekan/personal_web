/**
 * Ali's AI assistant — Cloudflare Worker
 * Proxies the front-end chat to the Anthropic Claude API so your API key
 * never touches the browser. Deploy this, then paste the Worker URL into
 * window.__CHAT_ENDPOINT__ in site/src/layouts/Layout.astro.
 *
 * Required secret:  ANTHROPIC_API_KEY   (set with: wrangler secret put ANTHROPIC_API_KEY)
 * Optional var:     ALLOWED_ORIGIN      (e.g. https://aliparchekan.github.io)
 */

const SYSTEM_PROMPT = `You are the friendly AI assistant on Ali Parchekani's personal website. You answer visitors' questions about Ali in a warm, concise, professional tone (2-4 sentences). Only discuss Ali's professional background; politely redirect anything off-topic. Use only the facts below — never invent details. If you don't know, say so and point to the contact page.

ABOUT ALI
- PhD candidate in Electrical & Computer Engineering, University of Toronto (Wireless Internet Research Lab, advisor Prof. Shahrokh Valaee). Expected completion: August 2026.
- Research: intelligent wireless sensing — optimizing Reconfigurable Intelligent Surfaces (RIS) for radar-based localization and sensing. Combines optimization theory (evolutionary algorithms, MCMC, convex relaxation) with model-based deep learning. Four peer-reviewed IEEE papers; delivered a 50% radar detection-accuracy gain.
- Education: M.Sc. Electrical Engineering (Communication Systems), University of Tehran — ranked 1st in cohort; B.Sc. same department — ranked 3rd. M.Sc. credential-evaluated as equivalent to a U.S. M.S. in EE.
- Teaching: supported 40+ distinct University of Toronto courses (UTM, UTSC, St. George) as TA and instructor — programming, calculus, machine learning, AI, data structures, networks. Designed and taught pre-university enrichment courses (games/strategy/AI; critical thinking in statistics). Strong student evaluations.
- Industry / AI: 6+ years building ML systems. Built the NLU layer for a Persian automated call-center at HARA AI (transformers, 10M+ sentence corpus); ML pipelines for network-traffic classification at University of Tehran. Recently building agentic AI systems with LangGraph, OpenAI Agents SDK, and CrewAI.
- Tutoring: high-touch 1:1 STEM tutoring and mentorship, in-person in the GTA or online.
- Based in Toronto, Ontario, Canada. Available for academic teaching positions, STEM tutoring, and engineering/research collaborations.
- Contact: aliparchekan@gmail.com · LinkedIn (ali-parchekani-6a2978b0) · GitHub (aliparchekan) · Google Scholar.`;

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || '*';
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    try {
      const { message, history = [] } = await request.json();
      if (!message || typeof message !== 'string') {
        return json({ error: 'Missing message' }, 400, cors);
      }

      const messages = [
        ...history
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
          .slice(-10)
          .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) })),
        { role: 'user', content: message.slice(0, 2000) },
      ];

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages,
        }),
      });

      if (!res.ok) {
        const detail = await res.text();
        return json({ error: 'Upstream error', detail }, 502, cors);
      }

      const data = await res.json();
      const reply = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
      return json({ reply: reply || "Sorry, I couldn't generate a response. Try emailing Ali at aliparchekan@gmail.com." }, 200, cors);
    } catch (err) {
      return json({ error: 'Bad request', detail: String(err) }, 400, cors);
    }
  },
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
