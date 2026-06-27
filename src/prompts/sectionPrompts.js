export const systemPrompt = `You are StartupGPT, an expert AI co-founder, product manager, and startup analyst. 
Give sharp, specific, extremely practical analysis tailored EXACTLY to the idea. 
Never give generic advice. Reference the specific idea, market, and context in India and globally. 
Be direct, honest, and actionable. Format using short, clear paragraphs and bold key terms with **. 
Avoid corporate fluff and buzzwords. Keep a professional yet energetic and encouraging tone.`;

export const sectionPrompts = {
  idea: (idea) => `Analyze this startup idea: "${idea}"

1. **IDEA SCORE** — Provide a score out of 100 with a clear explanation of its rating.
2. **INNOVATION LEVEL** — Classify as (Unique / Competitive / Saturated) and explain why.
3. **MARKET CATEGORY** — Detect the primary market category (e.g., Foodtech, Edtech, Fintech, B2B SaaS).
4. **DIFFICULTY LEVEL** — Rate as (Easy / Medium / Hard) and outline the core complexity.
5. **"IS THIS ALREADY BUILT?" CHECKER** — Scan the landscape. Does this exist? What is different about this version, and what is your unique angle to stand out?
6. **TREND MATCHER** — Is this idea riding any current market trends? Provide a specific stat or trend name.
7. **IDEA IMPROVER** — Suggest 3 improved or expanded versions of the core idea to increase loyalty and revenue.
8. **PROBLEM-SOLUTION FIT CHECKER** — Rate the fit from 1-10. Does this solution actually solve the pain point?
9. **INDIA MARKET READINESS SCORE** — Is India ready for this right now? (Checks internet, payment systems, behavior).

Keep each point punchy, direct, and highly specific to this exact idea.`,

  customer: (idea) => `For this startup idea: "${idea}"

1. **3 CUSTOMER PERSONAS** — Create 3 detailed profiles, each including: Name, Age, Job, Income, Daily Problem, Why they need this product, and Willingness to Pay.
2. **EARLY ADOPTER FINDER** — Exactly WHO will be your first 50 customers? Where can you find them (Instagram/LinkedIn/Reddit/college/communities) and what exact hook message should you send them?
3. **CUSTOMER PAIN SCORE** — Rate the intensity of their problem from 1-10 and explain the score.
4. **CUSTOMER INTERVIEW QUESTIONS GENERATOR** — Write 10 exact questions to ask real people to validate demand before building.
5. **WILLINGNESS TO PAY ESTIMATOR** — Will people pay? How much realistically? Give a predicted ratio of free vs paid users.
6. **CUSTOMER JOURNEY MAPPER** — Map the user path: Discover → Try → Pay → Stay. Identify where they are most likely to drop off and why.`,

  market: (idea) => `For this startup idea: "${idea}"

1. **COMPETITOR INTELLIGENCE** — List 4-5 real or likely competitors (direct or indirect). For each, specify their Strengths, Weaknesses, and what they are missing.
2. **MARKET SIZE ESTIMATOR** — Provide estimates for TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market) in India or globally. Is it growing? State a realistic market share for Year 1.
3. **SWOT ANALYSIS** — Provide 2 Strengths, 2 Weaknesses, 2 Opportunities, and 2 Threats specific to this startup.
4. **BLUE OCEAN FINDER** — Find a market space with zero or low competition. Suggest a unique positioning angle.
5. **COMPETITOR WEAKNESS EXPLOITER** — Identify the #1 weakness of your biggest competitor and write a specific attack plan to exploit it.
6. **TIMING ANALYZER** — Is now the right time? Too early, perfect, or too late? Explain based on tech readiness and market trends.`,

  business: (idea) => `For this startup idea: "${idea}"

1. **REVENUE MODEL SUGGESTER** — Suggest the best 2-3 monetization methods (e.g., Subscription, Transaction Fee, Freemium) and explain why they fit.
2. **PRICING STRATEGY** — Suggest exact pricing points, free vs paid feature breakdown, and tier structures.
3. **BREAK-EVEN ESTIMATOR** — Give a simple estimate of how many customers or monthly sales are required to cover operation costs.
4. **UNIT ECONOMICS CALCULATOR** — Estimate the CAC (Customer Acquisition Cost), LTV (Lifetime Value), and the LTV:CAC ratio. Explain how to optimize it.
5. **FUNDING REQUIREMENTS ESTIMATOR** — Estimate how much money is needed to launch. Provide a breakdown: Tech, Marketing, Hiring, Operations. Recommend Bootstrapping vs. Seed Funding.
6. **MONETIZATION TIMELINE** — Provide a realistic month-by-month revenue roadmap for Year 1 (Months 1-3, 4-6, 7-12).`,

  build: (idea) => `For this startup idea: "${idea}"

1. **MVP ROADMAP (3 PHASES)** — Outline: Phase 1 (Week 1 launch features), Phase 2 (Month 1 expansion), and Phase 3 (Month 3 full initial product).
2. **TECH STACK RECOMMENDER** — Recommend the optimal frontend, backend, database, and hosting solutions. Explain why in simple language.
3. **NO-CODE vs CODE RECOMMENDER** — Compare building with custom code vs no-code tools. Recommend specific tools (Bubble, Flutterflow, Webflow) if applicable.
4. **LAUNCH CHECKLIST** — Provide a 15-point checklist covering tech, marketing, legal, and support before going live.
5. **GROWTH HACKING STRATEGIES** — Suggest 5 specific, low-cost or free growth tactics tailored to this category to get organic users.
6. **HIRING ROADMAP** — Who should be the first 2-3 hires? When should you hire them, and what skills should they have?`,

  risk: (idea) => `For this startup idea: "${idea}"

1. **RISK RADAR** — Identify top 5 risks (e.g., Regulatory, Adoption, Tech, Competitor, Financial). Rate severity (High/Medium/Low) and provide a mitigation plan for each.
2. **"WILL IT FAIL?" HONEST CHECK** — A brutal, honest assessment of the top 3 reasons this startup could fail and what you must fix immediately.
3. **LEGAL & COMPLIANCE HEADS-UP** — List licenses, regulations (GDPR/DPDP Act in India), tax structure, and terms necessary for this business type.
4. **STARTUP GRAVEYARD LESSONS** — Detail 2 similar startups that failed in this space, why they failed, and how you will avoid the same mistakes.
5. **PIVOT SUGGESTIONS** — If the initial idea fails to gain traction, outline 3 logical pivot directions based on the core assets.`,

  validation: (idea) => `For this startup idea: "${idea}"

1. **LANDING PAGE COPY GENERATOR** — Write copy for the landing page hero section: Headline, Subheadline, 3 Key Features, Call-to-Action (CTA) text, and footer tagline.
2. **WAITLIST STRATEGY** — Detail a step-by-step strategy to collect 1,000 emails before launch, listing tools and outreach templates.
3. **SURVEY GENERATOR** — Generate 10 validation questions to put in a Google Form to interview prospective customers.
4. **PRESS RELEASE WRITER** — Write a launch press release ready for YourStory, TechCrunch, or social media.`,

  traction: (idea) => `For this startup idea: "${idea}"

1. **TRACTION ROADMAP** — Provide a week-by-week growth roadmap for the first 3 months with specific measurable goals (KPIs).
2. **PARTNERSHIP FINDER** — Identify 3 types of strategic partnerships (influencers, communities, companies) and include a cold outreach template.
3. **PRODUCT HUNT LAUNCH GUIDE** — Provide a checklist for a successful launch on Product Hunt: Hunter strategy, assets needed, and launch-day timeline.`
};

export const scorePrompt = (idea) => 
  `For startup idea: "${idea}" analyze and respond ONLY with a valid JSON object. Do not include any markdown wrappers or other text.
  {"ideaScore": <1-100>, "painScore": <1-10>, "timingScore": <1-10>}`;

export const namesPrompt = (idea) =>
  `For startup idea: "${idea}" — generate 5 creative, brandable, easy-to-pronounce startup names. 
  For each name, provide:
  - The name
  - What it means and why it works
  - 2 domain name ideas (.com, .in, .co, or .io)
  Format as a numbered list.`;

export const taglinesPrompt = (idea) =>
  `For startup idea: "${idea}" — write 5 catchy, punchy taglines under 8 words each. 
  Make them memorable and tailored to this idea. Format as a numbered list.`;

export const bmcPrompt = (idea) =>
  `For startup idea: "${idea}" — generate the Business Model Canvas. Respond ONLY with a valid JSON object. Do not include any markdown wrappers or other text. The JSON structure must be:
  {
    "keyPartners": "...",
    "keyActivities": "...",
    "keyResources": "...",
    "valuePropositions": "...",
    "customerRelationships": "...",
    "channels": "...",
    "customerSegments": "...",
    "costStructure": "...",
    "revenueStreams": "..."
  }`;

export const pitchDeckPrompt = (idea) =>
  `For startup idea: "${idea}" — generate a comprehensive 10-slide Pitch Deck Outline. 
  For each slide (Slide 1: Title, Slide 2: Problem, Slide 3: Solution, Slide 4: Market Size, Slide 5: Product, Slide 6: Business Model, Slide 7: Competitors, Slide 8: Go-To-Market, Slide 9: Team, Slide 10: The Ask), provide:
  - Slide Title
  - Key Visual Recommendation
  - Bulleted Content points to write on the slide`;
