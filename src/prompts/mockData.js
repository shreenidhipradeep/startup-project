// Mock data templates for Foodtech, Fintech, Edtech, and generic B2B SaaS

export const mockFoodtech = {
  scores: { ideaScore: 88, painScore: 9, timingScore: 8 },
  names: `1. **KitchenLink**
- Why it works: Straightforward, highly professional name linking home cooks with corporate workers.
- Domains: kitchenlink.co, kitchenlink.in
2. **HomelyBites**
- Why it works: Warm, friendly, emphasizes healthy home-cooked meals.
- Domains: homelybites.in, homelybites.net
3. **OfficeOven**
- Why it works: Emphasizes corporate focus and hot, fresh delivery.
- Domains: officeoven.co, officeoven.in`,
  taglines: `1. Home food, office delivered.
2. Verified home cooks, desktop delivery.
3. Skip the cafeteria. Taste the home.
4. Hot, healthy lunches for busy teams.
5. Your neighborhood kitchen, at your desk.`,
  bmc: {
    keyPartners: "Local certified home cooks, neighborhood delivery executives, local grocery suppliers.",
    keyActivities: "Quality auditing and chef onboarding, daily route optimization, mobile application maintenance.",
    keyResources: "Chef onboarding guidelines, delivery tracking algorithm, customer feedback database.",
    valuePropositions: "Access to fresh, preservative-free, home-style lunch delivered directly to corporate workstations.",
    customerRelationships: "Trust-based relationship through food hygiene ratings, customer care chatbot, subscription loyalty programs.",
    channels: "StartupGPT mobile app, company Slack integrations, local office building pamphlets.",
    customerSegments: "Corporate office workers, health-conscious employees, teams looking for collective food ordering.",
    costStructure: "Cook payouts (50% per plate), delivery logistics (20%), platform maintenance and marketing (15%).",
    revenueStreams: "Monthly meal subscriptions, group office delivery delivery fees, premium chef featured placement."
  },
  pitchDeck: `Slide 1: Title — HomelyBites: Office Lunch, Redefined.
- Visual: A high-quality photo of a warm home-cooked meal next to a corporate laptop.
- Bullets: Connecting corporate teams with local home cooks for daily, hot healthy lunches.

Slide 2: The Problem — The Daily Office Lunch Crisis
- Visual: Image of unhealthy, greasy restaurant food or packed cafeterias.
- Bullets: Corporate employees face limited healthy options, high restaurant costs, and packed office cafeterias.

Slide 3: The Solution — Fresh Neighborhood Kitchens
- Visual: Screenshot of the HomelyBites subscription interface showing daily menus.
- Bullets: Verified local home cooks prepare fresh, preservative-free home-style meals delivered directly to office desks.`,
  results: {
    idea: `1. **IDEA SCORE** — **88/100**. Very high validation due to recurring daily need, high customer lifetime value, and clear pain point.
2. **INNOVATION LEVEL** — **Competitive**. While food delivery is common, the chef-verification and subscription focus is unique.
3. **MARKET CATEGORY** — **Foodtech / Subscription Logistics**.
4. **DIFFICULTY LEVEL** — **Medium** due to food hygiene quality control and local delivery routing logistics.
5. **IS THIS ALREADY BUILT?** — Zomato/Swiggy deliver food but lack customized home-cook subscription meal plans.
6. **TREND MATCHER** — **Corporate Wellness**. Indian health-food market is growing at a **34% CAGR**.
7. **IDEA IMPROVER** — Add a "Corporate Wallet" where HR subsidizes lunch, or introduce regional weekly themes.
8. **PROBLEM-SOLUTION FIT** — **9/10**. Corporate workers desperately need healthy, recurring home meals.
9. **INDIA MARKET READINESS** — High. Smartphone usage and UPI-based subscription auto-debit are widely accepted.`,
    customer: `1. **3 CUSTOMER PERSONAS**
- **Suresh (29, Software Dev)**: Earns ₹12L/year. Daily Problem: Cafeteria queue is too long, eats greasy restaurant food. Wants hot home food. Willingness to Pay: ₹150 per meal.
- **Priya (34, HR Manager)**: Earns ₹18L/year. Daily Problem: Wants healthy, low-oil food for weight control. Willingness to Pay: ₹180 per meal.
- **Rohan (23, Analyst)**: Earns ₹6L/year. Daily Problem: Living alone, hates cooking after long hours. Willingness to Pay: ₹120 per meal.
2. **EARLY ADOPTER FINDER**
- First 50 customers: Employees in DLF CyberCity or OMR office parks. Find them on LinkedIn or local Slack groups. Send hook: *"Tired of greasy office food? Get hot home-cooked meals by local moms delivered directly to your desk."*
3. **CUSTOMER PAIN SCORE** — **9/10**. Eating unhealthy food daily causes physical fatigue and high expense.
4. **CUSTOMER INTERVIEW QUESTIONS**
- What do you currently eat for office lunch? How much do you spend? How do you feel after eating it?
5. **WILLINGNESS TO PAY** — High for recurring subscriptions. Estimated **85% free-to-paid** conversion on trial users.
6. **CUSTOMER JOURNEY** — Discovery (LinkedIn/Colleagues) → Try (3-day trial subscription) → Pay (Monthly plan) → Stay (Menu customization).`,
    market: `1. **COMPETITOR INTELLIGENCE**
- **Zomato / Swiggy**: High variety, but high cost, non-standardized portions, and no daily meal planning.
- **Local tiffin services**: Low cost, but lacks quality assurance, hygiene tracking, and digital scheduling.
2. **MARKET SIZE** — TAM in India's top 7 cities is **$4.2B**. Target Serviceable Market in Year 1 is **$12M**.
3. **SWOT ANALYSIS**
- **Strengths**: Home-cooked appeal, subscription predictability.
- **Weaknesses**: Delivery logistics scaling, chef cooking consistency.
- **Opportunities**: Corporate partnerships, customized calorie mapping.
- **Threats**: Food safety regulations, price competition.
4. **BLUE OCEAN FINDER** — Positioning solely as the "Corporate Wellness Food Partner," offering calorie-tracked meals certified by nutritionists.`,
    business: `1. **REVENUE MODELS** — 10-meal / 20-meal monthly subscriptions. Upfront payment maximizes cash flow.
2. **UNIT ECONOMICS** — Target Plate Cost: ₹70. Payout to cook: ₹45. Logistics: ₹20. Gross margin: ₹35%. CAC: ₹450, LTV: ₹6,400. LTV:CAC is **14.2x** (extremely healthy).
3. **BREAK-EVEN** — 420 active monthly subscribers cover delivery salaries and coordinator costs.`,
    build: `1. **MVP ROADMAP**
- **Phase 1 (Week 1)**: Simple WhatsApp Business catalog with 3 selected home chefs, delivering to 1 office building.
- **Phase 2 (Month 1)**: Mobile web application with subscription scheduler and payment integration.
- **Phase 3 (Month 3)**: Custom routing app for delivery executives and automated chef ingredient sourcing.
2. **TECH STACK** — React + Tailwind (Frontend), Node.js/Express (Backend), MongoDB (Database), hosted on Vercel/Render.
3. **NO-CODE vs CODE** — Start with **Glide** or **Softr** connected to Google Sheets. Launch in 3 days with zero code!`,
    risk: `1. **RISK RADAR**
- **Risk**: Food poisoning / hygiene. Severity: High. Mitigation: Compulsory FSSAI license and monthly surprise kitchen audits.
- **Risk**: Delivery delays. Severity: Medium. Mitigation: Batch deliveries per building instead of individual orders.
2. **STARTUP GRAVEYARD** — *TinyOwl* failed due to high cash burn. We mitigate this by keeping logistics pre-batched and subscription-only.`,
    validation: `1. **LANDING PAGE COPY**
- **Headline**: The Best Lunch of the Day, Straight from a Home Kitchen.
- **Subheadline**: Subscribe to hot, healthy, mom-cooked lunches delivered directly to your office desk in Chennai.
- **CTA**: Start Your 3-Day Trial
2. **WAITLIST STRATEGY** — Collect emails in office groups. Offer "Refer 3 coworkers, get 2 free meals."`,
    traction: `1. **TRACTION ROADMAP**
- Week 1: Onboard 3 home chefs. Deliver 10 trial meals.
- Week 4: Scale to 120 subscribers in 2 building parks.
- Week 12: Reach 500+ subscribers and break even.
2. **PARTNERSHIPS** — Partner with corporate HR departments to list as an employee benefit.`
  }
};

export const mockFintech = {
  scores: { ideaScore: 92, painScore: 8, timingScore: 9 },
  names: `1. **GoldChip**
- Why it works: Blends the concept of tech micro-investments with digital gold.
- Domains: goldchip.in, goldchip.app
2. **PenniesToGold**
- Why it works: Highlights the core round-up value proposition directly.
- Domains: penniestogold.co, penniestogold.in
3. **Gullak.AI**
- Why it works: Uses the nostalgic Indian word for piggy bank, updated with tech.
- Domains: gullak.co.in, gullakapi.io`,
  taglines: `1. Save change. Build gold.
2. Every UPI payment, backed by gold.
3. Turn spare change into 24K gold.
4. Auto-save. Auto-invest. Auto-grow.
5. Your digital gold piggy bank.`,
  bmc: {
    keyPartners: "Regulated Gold Refineries (MMTC-PAMP), UPI Payment Gateways (Razorpay/NPCI), Brokerage License Providers.",
    keyActivities: "UPI transaction aggregation, automated micro-purchases, secure digital vault management.",
    keyResources: "Proprietary round-up algorithm, direct vault APIs, financial compliance framework.",
    valuePropositions: "Automated micro-investments in digital gold, converting daily transaction spare change with zero effort.",
    customerRelationships: "Trust through asset-backed security, daily gold rate trackers, gamified savings milestones.",
    channels: "iOS/Android apps, student referral codes, Instagram fintech influencer integrations.",
    customerSegments: "Indian college students, Gen-Z digital natives, first-time retail investors.",
    costStructure: "Payment gateway fees (1.2% per round-up), vault storage insurance, customer acquisition incentives.",
    revenueStreams: "Spread fee on gold purchase/sell (1.5%), premium gold delivery commission, affiliate financial products."
  },
  pitchDeck: `Slide 1: Title — Gullak: Micro-Gold Savings for Gen-Z
- Visual: A smartphone mockup showing a coffee transaction rounding up to buy gold.
- Bullets: Automatically invest daily UPI spare change into 24K digital gold.

Slide 2: The Problem — The Young Savings Crisis
- Visual: Pie chart showing college students spending 90% of allowance on food and travel.
- Bullets: High inflation, lack of saving habits, and high entry barriers for stock/gold investments.

Slide 3: The Solution — The Automated Round-up
- Visual: Clean animation showing a ₹45 UPI coffee payment rounding up to ₹50, and ₹5 buying gold.
- Bullets: Zero-friction gold savings. Set it, forget it, and build wealth with spare change.`,
  results: {
    idea: `1. **IDEA SCORE** — **92/100**. Excellent fit due to India's massive UPI penetration and cultural affinity for gold investments.
2. **INNOVATION LEVEL** — **Competitive** but highly brand-differentiable for college students.
3. **MARKET CATEGORY** — **Fintech / Micro-Wealth Management**.
4. **DIFFICULTY LEVEL** — **Medium** due to banking APIs integrations and regulatory KYC compliances.
5. **IS THIS ALREADY BUILT?** — Jar app exists, but targeting college students with specialized rewards and vernacular UX offers a massive blue ocean.
6. **TREND MATCHER** — UPI transaction volume grew by **56% YoY** in India. Digital gold savings are trending.
7. **IDEA IMPROVER** — Add a "Gold Peer-to-Peer Group Challenge" where friends race to reach 1 gram of gold.
8. **PROBLEM-SOLUTION FIT** — **8/10**. Solves the lack of savings discipline among Gen-Z digital natives.
9. **INDIA MARKET READINESS** — Extremely High. The UPI framework makes micro-deductions fast and free.`,
    customer: `1. **3 CUSTOMER PERSONAS**
- **Aryan (20, College Student)**: Monthly Allowance: ₹6,000. Problem: Spends everything on outings. Wants to save but doesn't know how to start. Willingness to Pay: ₹20-50/week.
- **Rhea (22, MBA Student)**: Allowance: ₹10,000. Problem: Wants to buy gold for future jewelry but cannot buy physical coins. Willingness to Pay: ₹100/week.
- **Karan (24, Intern)**: Income: ₹25,000/month. Problem: Wants simple wealth tools. Willingness to Pay: ₹200/week.
2. **EARLY ADOPTER FINDER**
- Focus: Undergrad college students in Tier 1/2 cities. Find them in college WhatsApp groups or hostel clubs. Outreach hook: *"How to buy 24K gold with just the spare change from your chai orders."*
3. **CUSTOMER PAIN SCORE** — **8/10**. Gen-Z wants to build wealth but hates complex banking apps.
4. **CUSTOMER INTERVIEW QUESTIONS**
- How much money do you spend via UPI daily? How much did you save last month? Why is it hard to save?
5. **WILLINGNESS TO PAY** — High. Users don't pay "fees" — they invest. Spread model yields 1.5% margin.
6. **CUSTOMER JOURNEY** — Install app → Link UPI → Auto-roundup on daily chai/snacks → Watch gold grow in vault.`,
    market: `1. **COMPETITOR INTELLIGENCE**
- **Jar App**: Large player, generic positioning.
- **Paytm Gold**: Cluttered interface, lack of auto-savings triggers.
- **Physical Gold Shops**: High entry cost (minimum 1 gram), risk of theft.
2. **MARKET SIZE** — Digital gold investments in India estimated to reach **$800M** by 2028.
3. **SWOT ANALYSIS**
- **Strengths**: Low entry barrier, asset-backed savings.
- **Weaknesses**: Dependency on third-party vaults, payment gateway fees.
- **Opportunities**: Student discount partnerships, micro-investment integrations.
- **Threats**: Changes in RBI guidelines, gold rate fluctuations.
4. **BLUE OCEAN FINDER** — Target students directly with a "Save to Spend" feature where they save gold to buy laptops or college gear.`,
    business: `1. **REVENUE MODELS** — Gold spread margin (1.5% commission on buying/selling gold), premium brand referrals.
2. **UNIT ECONOMICS** — CAC: ₹150 (referral loops). LTV: ₹1,800. Net margin per user: ₹120/year. LTV:CAC is **12.0x**.
3. **BREAK-EVEN** — Reach ₹5Cr monthly transacted gold volume to cover gateway licenses and server hosting.`,
    build: `1. **MVP ROADMAP**
- **Phase 1 (Week 1)**: Simple landing page with SMS waitlist showing UPI simulation.
- **Phase 2 (Month 1)**: Android app with manual UPI gold purchases and secure wallet display.
- **Phase 3 (Month 3)**: Auto-payment gateway link for automated round-up withdrawals.
2. **TECH STACK** — React Native (Mobile), Node.js, PostgreSQL for ledgers, integrated with MMTC-PAMP API.
3. **NO-CODE vs CODE** — Build with **Flutterflow** for fast deployment on App Stores.`,
    risk: `1. **RISK RADAR**
- **Risk**: RBI regulations on UPI auto-debit limits. Severity: High. Mitigation: Set up mandate permissions under NPCI rules.
- **Risk**: Gold price volatility. Severity: Low. Mitigation: Highlight that gold is for long-term compounding.
2. **STARTUP GRAVEYARD** — *Wint Wealth* succeeded by targeting secure yields; we avoid failure by partnering with licensed MMTC trust vaults.`,
    validation: `1. **LANDING PAGE COPY**
- **Headline**: Turn Your Daily Chai Into Gold.
- **Subheadline**: Automatically save your UPI spare change into 24K digital gold. Zero effort. Starting at ₹1.
- **CTA**: Download Gullak App
2. **WAITLIST STRATEGY** — Gamify registration: "Invite 3 friends, get ₹50 free gold credited to your vault."`,
    traction: `1. **TRACTION ROADMAP**
- Week 1: Launch alpha to 100 college testers.
- Week 4: Get 2,000 signups via campus ambassador program.
- Week 12: Reach ₹15L total invested gold volume.
2. **PARTNERSHIPS** — Partner with student fintech hubs and local campus cafes.`
  }
};

export const mockEdtech = {
  scores: { ideaScore: 85, painScore: 8, timingScore: 7 },
  names: `1. **CodeVernac**
- Why it works: Highlights coding in vernacular native languages.
- Domains: codevernac.co, codevernac.in
2. **DesiCode**
- Why it works: Casual, highly brandable, appeals to Tier 2/3 students.
- Domains: desicode.in, desicode.cc
3. **KhelCode**
- Why it works: Emphasizes the gamified block-coding "play" learning style.
- Domains: khelcode.org, khelcode.in`,
  taglines: `1. Coding in your mother tongue.
2. Learn programming, play games.
3. No English required. Just logic.
4. Future developers, coding in Hindi.
5. Gamified coding for Tier-2 kids.`,
  bmc: {
    keyPartners: "Local school boards in Tier 2/3 cities, community centers, regional vernacular educators.",
    keyActivities: "Curriculum localization, block-coding engine development, low-bandwidth video delivery.",
    keyResources: "Proprietary interactive code canvas, local language content creators, cloud hosting.",
    valuePropositions: "Vernacular coding courses (Hindi, Tamil, Telugu) with gamified block interfaces, playable on cheap smartphones.",
    customerRelationships: "Gamified achievement badges, localized community support forums, parent dashboard progress trackers.",
    channels: "Local schools, YouTube vernacular tutorial channels, regional Facebook groups.",
    customerSegments: "Parents of kids (ages 8-15) in Tier 2/3 Indian cities, students seeking vocational skills.",
    costStructure: "Content production (30%), application platform development (30%), local ads and marketing (20%).",
    revenueStreams: "Monthly subscription for course tracks, group live coding classrooms, regional school licensing fees."
  },
  pitchDeck: `Slide 1: Title — DesiCode: Vernacular Coding for Kids
- Visual: An Indian child in a Tier 2 home playing coding games on a mobile screen.
- Bullets: Gamified programming school in native languages (Hindi, Tamil, Telugu) for Tier 2/3 India.

Slide 2: The Problem — The English Coding Wall
- Visual: Graphs showing 90% of coding schools are in English, leaving behind 100M+ kids.
- Bullets: Kids in Tier 2/3 cities want to code, but language barriers and lack of computers stop them.

Slide 3: The Solution — Mobile, Local, Gamified
- Visual: UI of DesiCode block coding interface showing Hindi translation keys.
- Bullets: Learn complex logic via drag-and-drop vernacular puzzles. Runs smoothly on basic Android phones.`,
  results: {
    idea: `1. **IDEA SCORE** — **85/100**. Strong score due to the massive underserved population in Tier 2/3 India and lack of localized tech tools.
2. **INNOVATION LEVEL** — **Unique**. While Edtech is competitive, local language block-coding is virtually untouched.
3. **MARKET CATEGORY** — **Vernacular Edtech / K-12 Gamified Learning**.
4. **DIFFICULTY LEVEL** — **Medium** due to translation logic and building a smooth drag-drop interface for mobile web.
5. **IS THIS ALREADY BUILT?** — WhiteHat Jr/Code.org are built for desktop and English-literate kids. DesiCode targets mobile-first vernacular kids.
6. **TREND MATCHER** — **NEP 2020** mandates coding in Indian schools. Vernacular content consumption is growing at a **47% rate**.
7. **IDEA IMPROVER** — Allow offline loading of lessons via SD cards, or add voice-guided learning in regional dialects.
8. **PROBLEM-SOLUTION FIT** — **8/10**. Demolishes the language barrier, giving equal opportunities to non-English students.
9. **INDIA MARKET READINESS** — High. Mobile internet is cheap, and families prioritizes education budgets.`,
    customer: `1. **3 CUSTOMER PERSONAS**
- **Ramesh (42, Shopkeeper in Indore)**: Earns ₹25,000/month. Problem: Wants his child (10) to learn computers but local schools teach basic MS Paint. Willingness to Pay: ₹300/month.
- **Sunita (38, Housewife in Trichy)**: Earns ₹30,000/month. Problem: Wants her daughter (12) to code but daughter goes to Tamil-medium school. Willingness to Pay: ₹250/month.
- **Aarav (13, Student)**: Problem: Loves video games, wants to build them but has no computer. Willingness to Pay: Free (Parent pays).
2. **EARLY ADOPTER FINDER**
- Parents in Tier 2/3 towns in UP, Tamil Nadu, and AP. Reach them via regional Facebook parenting groups or local school partnerships. Outreach message: *"Learn coding in Hindi/Tamil. Turn screen time into coding time. Runs on any mobile."*
3. **CUSTOMER PAIN SCORE** — **8/10**. Parents know tech is the future but can't afford expensive English schools.
4. **CUSTOMER INTERVIEW QUESTIONS**
- Does your child use a phone? What apps? Do they study online? Would you pay for them to learn computer coding?
5. **WILLINGNESS TO PAY** — Medium. Price sensitivity is high. Subscription must be kept under ₹300/month.
6. **CUSTOMER JOURNEY** – Free trial on app → Play first 3 games → Earn certificate → Parent pays for advanced tracks.`,
    market: `1. **COMPETITOR INTELLIGENCE**
- **WhiteHat Jr**: English only, high pricing (₹50k/year), requires laptops.
- **Code.org**: Free, but English interface and poor mobile usability.
- **Local coaching centers**: Offline, basic syllabus, outdated content.
2. **MARKET SIZE** — K-12 student base in Tier 2/3 cities is **75 Million**. Target SAM: **$380M**.
3. **SWOT ANALYSIS**
- **Strengths**: Local language content, low-bandwidth compatible.
- **Weaknesses**: High customer churn, lower pricing caps.
- **Opportunities**: Government school pilot integrations.
- **Threats**: Retaining regional teacher talents.
4. **BLUE OCEAN FINDER** — Drag-and-drop block coding that runs fully in-browser on ₹8,000 Android phones without downloading heavy apps.`,
    business: `1. **REVENUE MODELS** — Freemium tier (first 5 lessons free), monthly subscription (₹199/month), or school curriculum license.
2. **UNIT ECONOMICS** — CAC: ₹80. LTV: ₹900. LTV:CAC is **11.2x**. Gross profit margin: 70%.
3. **BREAK-EVEN** — Onboard 1,500 active subscribers to cover servers, translation updates, and regional marketing.`,
    build: `1. **MVP ROADMAP**
- **Phase 1 (Week 1)**: Mobile-optimized website with 3 text coding puzzles in Hindi.
- **Phase 2 (Month 1)**: Web app with block drag-and-drop modules in 3 languages.
- **Phase 3 (Month 3)**: Android app with leaderboards, certificate templates, and offline downloads.
2. **TECH STACK** — React + Tailwind (Frontend), Node.js, Firebase (Auth/DB), hosted on Vercel.
3. **NO-CODE vs CODE** — Build with custom React (specifically using ` + '`react-dnd`' + ` or ` + '`Blockly`' + ` wrappers) to support drag-drop puzzles.`,
    risk: `1. **RISK RADAR**
- **Risk**: Low smartphone engagement/retention. Severity: Medium. Mitigation: Send weekly SMS/WhatsApp progress reports to parents.
- **Risk**: Content piracy. Severity: Low. Mitigation: Store interactive logic on the server, not in video files.
2. **STARTUP GRAVEYARD** — *Lido Learning* failed due to high sales call costs; we avoid failure by focusing on cheap online self-paced trials.`,
    validation: `1. **LANDING PAGE COPY**
- **Headline**: Coding in Your Mother Tongue.
- **Subheadline**: Turn your child\'s screen time into coding time. Play programming games in Hindi, Tamil, and Telugu.
- **CTA**: Try First Coding Game Free
2. **WAITLIST STRATEGY** — Run local WhatsApp campaigns: "First 500 signups get free coding certificate."`,
    traction: `1. **TRACTION ROADMAP**
- Week 1: 50 local student signups.
- Week 4: Partner with 2 local schools in Bhopal.
- Week 12: Reach 2,500 monthly active coding players.
2. **PARTNERSHIPS** — Partner with regional NGOs promoting digital literacy.`
  }
};

// Generic fallback data
export const mockGeneric = {
  scores: { ideaScore: 78, painScore: 7, timingScore: 8 },
  names: `1. **LaunchPad.AI**
- Why it works: Highlights speed, tech, and building platforms.
- Domains: launchpadai.co, launchpad.io
2. **ScaleVenture**
- Why it works: Direct, highly professional startup builder naming.
- Domains: scaleventure.in, scaleventure.app
3. **FoundersDesk**
- Why it works: Friendly, emphasizes co-founder operational desks.
- Domains: foundersdesk.in, foundersdesk.co`,
  taglines: `1. Scale faster. Build smarter.
2. The operational desk for young founders.
3. Launch in days, scale in weeks.
4. AI-driven startup intelligence.
5. Your startup journey, mapped.`,
  bmc: {
    keyPartners: "Cloud providers, payment gateways, startup incubators.",
    keyActivities: "Platform development, data analytics, Customer support.",
    keyResources: "Core proprietary validation algorithm, expert founder database.",
    valuePropositions: "Automated business modeling and market validation tools for pre-seed founders.",
    customerRelationships: "Community forums, automated dashboard updates, personalized recommendations.",
    channels: "Direct website, Product Hunt launches, startup communities (IndieHackers, Reddit).",
    customerSegments: "Pre-seed startup founders, indie hackers, product builders.",
    costStructure: "Development salaries, cloud hosting, payment API fees, customer acquisition ads.",
    revenueStreams: "Tiered subscription plans, premium pitch deck exports, developer API access."
  },
  pitchDeck: `Slide 1: Title — ScaleVenture: Pre-Seed Validation Platform
- Visual: A clean graph showing ideas turning into validated business models.
- Bullets: Automated venture modeling tools for pre-seed startup founders.

Slide 2: The Problem — Startup Failure Rates
- Visual: Infographic showing 90% of startups fail, primarily due to lack of market validation.
- Bullets: Founders spend months building products nobody wants, wasting capital and time.

Slide 3: The Solution — The Automated Co-Founder
- Visual: Dashboard showing step-by-step validations across sections.
- Bullets: Get competitor reports, customer interview sheets, and roadmaps in seconds.`,
  results: {
    idea: `1. **IDEA SCORE** — **78/100**. Moderate validation due to high competition in AI-generation tooling, but strong need.
2. **INNOVATION LEVEL** — **Competitive**. Many AI writing tools exist, but specialized business validation is a growing niche.
3. **MARKET CATEGORY** — **B2B SaaS / Product Productivity**.
4. **DIFFICULTY LEVEL** — **Medium** due to fine-tuning context accuracy and domain expert prompts.
5. **IS THIS ALREADY BUILT?** — General AI chatbots exist, but structured multi-feature venture Blueprints are uncommon.
6. **TREND MATCHER** — **Solopreneurship / Creator Economy**. Over **50M solopreneurs** globally looking for validation tools.
7. **IDEA IMPROVER** — Add a "pitch-deck template exporter" or connect to local business registry databases.
8. **PROBLEM-SOLUTION FIT** — **8/10**. Dramatically reduces the time needed to build initial drafts.
9. **INDIA MARKET READINESS** — High. Solopreneurs and tech builders are highly active and UPI subscription-ready.`,
    customer: `1. **3 CUSTOMER PERSONAS**
- **Amit (26, Side Hustler)**: Income: ₹10L/year. Daily Problem: Wants to launch an app but lacks business strategy know-how. Willingness to Pay: ₹500/month.
- **Sara (31, Indie Hacker)**: Income: ₹24L/year. Daily Problem: Builds products quickly, hates manual market research. Willingness to Pay: ₹800/month.
- **Vikram (45, Consultant)**: Income: ₹36L/year. Daily Problem: Mentors startups, needs template blueprints quickly. Willingness to Pay: ₹1,500/month.
2. **EARLY ADOPTER FINDER**
- First 50 customers: Builders on Twitter (#buildinpublic), IndieHackers, or startup subreddits. Connect on Twitter and DM: *"Hey! Built a tool that drafts competitor reports and canvases in 5 seconds. Try it free here."*
3. **CUSTOMER PAIN SCORE** — **7/10**. Validating ideas is tedious and often skipped, leading to failure.
4. **CUSTOMER INTERVIEW QUESTIONS**
- How do you validate your ideas? How long does it take? What tools do you use?
5. **WILLINGNESS TO PAY** — High for active builders. Estimated **70% free-to-paid** conversion on monthly plans.
6. **CUSTOMER JOURNEY** — Discovery (Twitter/Product Hunt) → Try (1 free blueprint) → Pay (Unlimited plan) → Stay (Weekly tasks tracking).`,
    market: `1. **COMPETITOR INTELLIGENCE**
- **ChatGPT / Claude**: High versatility, but requires manually writing complex prompts.
- **Traditional Consultants**: High accuracy, but extremely expensive (₹50k+) and takes weeks.
- **CoFounder.AI**: Standard templates, but lacks interactive context-aware chatbot rooms.
2. **MARKET SIZE** — Pre-seed startup tooling TAM is **$1.8B** globally. Target Serviceable SOM in Year 1 is **$1.2M**.
3. **SWOT ANALYSIS**
- **Strengths**: Speed, comprehensive metrics, low operational cost.
- **Weaknesses**: Relies on API availability, data accuracy limits.
- **Opportunities**: Incubator partnerships, developer APIs.
- **Threats**: Rapid feature integration by OpenAI/Anthropic.
4. **BLUE OCEAN FINDER** — Positioning as the "Product Hunt Prep Assistant," focusing specifically on launch optimization.`,
    business: `1. **REVENUE MODELS** — Pay-per-report (₹499) or unlimited monthly subscription (₹1,499/month).
2. **UNIT ECONOMICS** — Cost per report (API fee): ₹5. Selling Price: ₹499. Gross margin: 99%. CAC: ₹150, LTV: ₹3,500. LTV:CAC is **23x**.
3. **BREAK-EVEN** — 180 active monthly subscribers cover server hosting and maintenance.`,
    build: `1. **MVP ROADMAP**
- **Phase 1 (Week 1)**: Form interface that queries Claude API and sends email reports.
- **Phase 2 (Month 1)**: Dynamic dashboard with interactive score rings and canvas display.
- **Phase 3 (Month 3)**: Integrations with domain checkers and Stripe/Razorpay payments.
2. **TECH STACK** — React + Tailwind, Node.js, Supabase, hosted on Vercel.
3. **NO-CODE vs CODE** — Build with code (Vite React) for smooth API integration and custom responsive card grids.`,
    risk: `1. **RISK RADAR**
- **Risk**: API cost inflation. Severity: Medium. Mitigation: Cache responses to prevent duplicate queries for similar ideas.
- **Risk**: Inaccurate metrics. Severity: Medium. Mitigation: Add clear disclaimers that reports are for planning assistance.
2. **STARTUP GRAVEYARD** — *LaunchRock* succeeded by keeping collection simple; we avoid failure by offering deep value instead of simple landing pages.`,
    validation: `1. **LANDING PAGE COPY**
- **Headline**: Write Your Pitch Deck in 5 Seconds.
- **Subheadline**: Turn your raw ideas into investor-ready blueprints, canvases, and marketing roadmaps automatically.
- **CTA**: Generate Your Free Blueprint
2. **WAITLIST STRATEGY** — List on Product Hunt and BetaList: "Free unlimited reports for first 200 builders."`,
    traction: `1. **TRACTION ROADMAP**
- Week 1: Launch on IndieHackers. Get 100 free reports run.
- Week 4: Launch on Product Hunt. Target top 5 product of the day.
- Week 12: Reach 400 paying subscribers.
2. **PARTNERSHIPS** — Partner with accelerator programs and tech hubs.`
  }
};

