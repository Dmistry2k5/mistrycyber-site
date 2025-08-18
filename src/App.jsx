import React, { useEffect, useMemo, useState } from "react";
import { Shield, Wifi, Smartphone, Router, Lock, UserCheck, AlertTriangle, Phone, Mail, ArrowRight, CheckCircle2, Sun, Moon, ChevronDown, Award, Building2, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CONFIG = {
  brand: "MistryCyber",
  founder: "Dharmesh Mistry",
  founderTitle: "CISSP, Security Operations Leader",
  years: 10,
  email: "mistrytech88@gmail.com", // change to your real inbox
  phone: "+44 7930 980525", // change to your real number
  calendly: "https://calendly.com/mistrytech88/30min", // replace or leave as mailto fallback
};

const PLANS = [
  {
    name: "Home Essentials",
    tagline: "Baseline protection for one person",
    monthly: 29,
    annual: 299,
    features: [
      "Personal cyber audit (devices, Wi‑Fi, accounts)",
      "Password manager setup + MFA across key accounts",
      "Phishing & scam coaching (30 mins)",
      "Quarterly security checklist",
      "Priority advice via email"
    ],
    badge: "Popular",
  },
  {
    name: "Family Protect",
    tagline: "Cover the whole household (up to 5)",
    monthly: 59,
    annual: 599,
    features: [
      "Home network & router hardening",
      "IoT & smart-home security setup",
      "Parental controls & privacy tuning",
      "Identity protection checklist",
      "Monthly check‑in + on‑call guidance"
    ],
    highlight: true,
    badge: "Best value",
  },
  {
    name: "SME Starter",
    tagline: "Micro & small business essentials",
    monthly: 149,
    annual: 1499,
    features: [
      "Risk & posture review (cloud + endpoints)",
      "Policies & awareness mini‑pack",
      "Cyber Essentials prep guidance",
      "Backup & recovery playbook",
      "Incident response on retainer (hours included)"
    ],
    badge: "For teams",
  },
  {
    name: "VIP Concierge",
    tagline: "High‑profile personal security",
    monthly: 249,
    annual: 2499,
    features: [
      "Executive device hardening & travel kit",
      "Data broker removal & privacy tuning",
      "Dark web & impersonation monitoring",
      "Secure comms and footprint reduction",
      "Discreet 24/7 on‑call response"
    ],
    badge: "Private",
  }
];

export default function MistryCyberSite() {
  const [dark, setDark] = useState(true);
  const [billing, setBilling] = useState('monthly');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cookieAck, setCookieAck] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const price = (plan) => billing === 'monthly' ? plan.monthly : plan.annual;
  const priceSuffix = billing === 'monthly' ? "/mo" : "/yr";

  const contactHref = CONFIG.calendly && CONFIG.calendly.startsWith('http')
    ? CONFIG.calendly
    : `mailto:${CONFIG.email}?subject=Free%20Cyber%20Health%20Check`;

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-indigo-200 selection:text-indigo-900">
      <SkipLink />
      <SiteHeader dark={dark} setDark={setDark} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} contactHref={contactHref} />
      <main id="content" className="relative">
        <Hero contactHref={contactHref} />
        <TrustBar />
        <Services />
        <HowItWorks />
        <Pricing billing={billing} setBilling={setBilling} />
        <Testimonials />
        <About />
        <FAQ />
        <CTA contactHref={contactHref} />
      </main>
      <SiteFooter />
      {!cookieAck && <CookieBar onAccept={() => setCookieAck(true)} />}
      <ChatBubble />
      <BackToTop />
    </div>
  );
}

function SkipLink() {
  return (
    <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 bg-indigo-600 text-white px-3 py-2 rounded-md shadow">
      Skip to content
    </a>
  );
}

function SiteHeader({ dark, setDark, mobileOpen, setMobileOpen, contactHref }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-semibold tracking-tight">
            <Shield className="h-6 w-6 text-indigo-600"/>
            <span className="text-slate-900 dark:text-white">{CONFIG.brand}</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-indigo-600">Services</a>
            <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#faq" className="hover:text-indigo-600">FAQ</a>
            <a href={contactHref} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 transition">
              Book free call <ArrowRight className="h-4 w-4"/>
            </a>
            <button aria-label="Toggle theme" onClick={() => setDark(v=>!v)} className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
            </button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <button aria-label="Toggle theme" onClick={() => setDark(v=>!v)} className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              {dark ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
            </button>
            <button className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={()=>setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="mobile-menu">
              <ChevronDown className={`h-5 w-5 transition ${mobileOpen ? 'rotate-180' : ''}`}/>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div id="mobile-menu" initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="md:hidden overflow-hidden">
              <div className="grid gap-2 pb-4 text-sm">
                <a href="#services" onClick={()=>setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Services</a>
                <a href="#pricing" onClick={()=>setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Pricing</a>
                <a href="#about" onClick={()=>setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">About</a>
                <a href="#faq" onClick={()=>setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">FAQ</a>
                <a href={contactHref} onClick={()=>setMobileOpen(false)} className="rounded-xl px-3 py-2 bg-indigo-600 text-white text-center">Book free call</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function Hero({ contactHref }) {
  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-white dark:from-indigo-950 dark:via-slate-950 dark:to-slate-950"/>
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-60">
        <AnimatedShield />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{y:20, opacity:0}} whileInView={{y:0, opacity:1}} viewport={{once:true}} transition={{duration:0.5}} className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Cybersecurity for everyday people — across the UK
            </motion.h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Remote-first protection for you, your family, and your small business. Expert help setting up secure Wi‑Fi, hardening devices & IoT, training against scams, and rapid response when things go wrong.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={contactHref} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700">
                Get protected <ArrowRight className="h-4 w-4"/>
              </a>
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-900">
                See pricing
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1"><Award className="h-4 w-4 text-emerald-500"/> CISSP‑led ({CONFIG.years}+ yrs)</span>
              <span className="inline-flex items-center gap-1"><Globe2 className="h-4 w-4 text-indigo-500"/> Remote UK‑wide</span>
              <span className="inline-flex items-center gap-1"><UserCheck className="h-4 w-4 text-sky-500"/> Friendly, plain‑English guidance</span>
            </div>
          </div>
          <div className="relative">
            <DeviceCluster />
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedShield() {
  return (
    <svg className="w-[900px] max-w-[90vw] h-auto" viewBox="0 0 900 900" aria-hidden>
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity=".35"/>
          <stop offset="70%" stopColor="#818cf8" stopOpacity=".15"/>
          <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="450" cy="450" r="300" fill="url(#g)">
        <animate attributeName="r" values="260;310;260" dur="10s" repeatCount="indefinite"/>
      </circle>
      <ShieldPath />
      <ThreatIcon x={160} y={290} delay={0} label="phish" />
      <ThreatIcon x={750} y={330} delay={1.2} label="ransom" />
      <ThreatIcon x={520} y={160} delay={0.6} label="bug" />
      <ThreatIcon x={290} y={680} delay={1.0} label="spy" />
    </svg>
  );
}

function ShieldPath() {
  return (
    <g fill="none" stroke="#6366f1" strokeOpacity="0.5" strokeWidth="2">
      <path d="M450 120 C 580 160, 700 160, 700 290 C 700 430, 590 600, 450 720 C 310 600, 200 430, 200 290 C 200 160, 320 160, 450 120 Z">
        <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="6s" repeatCount="indefinite"/>
      </path>
    </g>
  );
}

function ThreatIcon({x, y, delay, label}) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.85">
      <circle r="14" fill="#ef4444" fillOpacity="0.9">
        <animate attributeName="r" values="12;16;12" dur="4s" begin={`${delay}s`} repeatCount="indefinite"/>
      </circle>
      <text y="5" textAnchor="middle" fontSize="9" fill="white">{label}</text>
      <animateTransform attributeName="transform" type="translate" values={`${x} ${y}; ${x+20} ${y-12}; ${x} ${y}`} dur="5s" begin={`${delay}s`} repeatCount="indefinite"/>
    </g>
  );
}

function DeviceCluster() {
  return (
    <div className="relative aspect-[4/3] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 shadow-xl">
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-emerald-500/10 blur-2xl"/>
      <div className="relative grid grid-cols-3 gap-4 h-full">
        <DeviceCard title="Laptop" Icon={Lock} note="All checks OK"/>
        <DeviceCard title="Smartphone" Icon={Smartphone} note="MFA enabled"/>
        <DeviceCard title="Router" Icon={Router} note="WPA3, strong key"/>
        <DeviceCard title="Smart TV" Icon={Wifi} note="IoT VLAN"/>
        <DeviceCard title="Tablet" Icon={Smartphone} note="Screen lock"/>
        <DeviceCard title="Camera" Icon={Lock} note="Firmware updated"/>
      </div>
      <div className="absolute right-4 top-4 text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-2 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800">
        <CheckCircle2 className="h-4 w-4"/> All devices secure · Last threat blocked: 2 mins ago
      </div>
    </div>
  );
}

function DeviceCard({title, Icon, note}) {
  return (
    <motion.div whileHover={{y:-4}} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow">
      <Icon className="h-6 w-6 text-indigo-600"/>
      <div className="mt-2 font-semibold">{title}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{note}</div>
    </motion.div>
  );
}

function TrustBar() {
  const items = [
    { icon: <Award className="h-4 w-4"/>, text: "Led by CISSP‑certified consultant" },
    { icon: <Shield className="h-4 w-4"/>, text: "Privacy‑first. Plain‑English help." },
    { icon: <Building2 className="h-4 w-4"/>, text: "SME & VIP options available" },
  ];
  return (
    <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 py-4 text-sm text-slate-600 dark:text-slate-300">
          {items.map((it, i)=> (
            <div key={i} className="inline-flex items-center gap-2">
              <span className="text-indigo-600">{it.icon}</span>
              <span>{it.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services() {
  const services = [
    { title: "Personal Cyber Audit", desc: "End‑to‑end review of devices, Wi‑Fi and accounts. Fix misconfigurations, remove malware, and deploy best practice.", Icon: Shield },
    { title: "IoT & Home Network", desc: "Secure routers, smart TVs, cameras & more. VLANs, guest networks, safe defaults, firmware, and monitoring.", Icon: Wifi },
    { title: "Identity & Fraud Guard", desc: "Password manager + MFA rollout, breach checks, recovery plans, and guidance on scams & identity theft.", Icon: Lock },
    { title: "Training & Family Safety", desc: "Friendly, plain‑English coaching on phishing, privacy, parental controls and safe social media use.", Icon: UserCheck },
    { title: "Ongoing Monitoring", desc: "Lightweight checks and alerts for suspicious activity, device health, and configuration drift.", Icon: AlertTriangle },
    { title: "SME Essentials", desc: "For growing teams: risk review, policies, Cyber Essentials prep, backup & incident readiness.", Icon: Building2 },
  ];
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What we do</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Remote‑first, UK‑wide. Tailored to you.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i)=> (
            <motion.div key={s.title} whileHover={{y:-6}} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow">
              <s.Icon className="h-7 w-7 text-indigo-600"/>
              <h3 className="mt-3 font-semibold text-lg">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Free 20‑min call", desc: "We listen. You share goals & concerns. We outline a simple plan." },
    { title: "Secure setup", desc: "We harden devices, fix weak points, add MFA, and configure safe defaults." },
    { title: "Ongoing peace of mind", desc: "Choose a plan for check‑ups & rapid response when you need it." },
  ];
  return (
    <section className="py-20 bg-slate-50/60 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">How it works</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i)=> (
            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <div className="text-sm text-slate-500 dark:text-slate-400">Step {i+1}</div>
              <div className="mt-1 font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ billing, setBilling }) {
  const PLANS_LOCAL = PLANS;
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Transparent pricing</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Simple plans. Cancel anytime. Annual saves ~2 months.</p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className={`text-sm ${billing==='monthly'?'font-semibold':''}`}>Monthly</span>
          <button onClick={()=>setBilling(billing==='monthly'?'annual':'monthly')} className="relative inline-flex h-7 w-14 items-center rounded-full bg-slate-200 dark:bg-slate-700">
            <span className={`inline-block h-6 w-6 transform rounded-full bg-white dark:bg-slate-950 shadow transition ${billing==='annual'?'translate-x-7':'translate-x-1'}`}/>
          </button>
          <span className={`text-sm ${billing==='annual'?'font-semibold':''}`}>Annual</span>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {PLANS_LOCAL.map((p)=> (
            <motion.div key={p.name} whileHover={{y:-8}} className={`rounded-3xl border p-6 shadow bg-white dark:bg-slate-900 ${p.highlight? 'border-indigo-400/60 dark:border-indigo-500/60 ring-1 ring-indigo-300/40' : 'border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                {p.badge && <span className="text-xs rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1">{p.badge}</span>}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{p.tagline}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold">£{billing==='monthly'?p.monthly:p.annual}</span>
                <span className="text-slate-500 dark:text-slate-400">/{billing==='monthly'?'mo':'yr'}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f)=> (
                  <li key={f} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500"/> <span>{f}</span></li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex w-full justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700">Choose {p.name}</a>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 text-center">All services delivered remotely across the UK. Pricing excludes any third‑party licence fees you opt into (e.g. password manager subscriptions).</p>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { quote: "We finally understand what ‘being secure’ means at home. Clear, friendly, and zero jargon.", name: "S. Patel", detail: "Family of 4, Manchester" },
    { quote: "Set up MFA and secured our cloud docs. Exactly what our small team needed.", name: "R. Hughes", detail: "Accounting practice, Bristol" },
    { quote: "Travel security brief saved me from a hotel Wi‑Fi mishap. Brilliant support.", name: "A. Khan", detail: "Consultant, London" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=> setIdx(i => (i+1)%items.length), 5000);
    return ()=> clearInterval(id);
  },[]);
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-slate-50/60 dark:to-slate-900/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">What clients say</h2>
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.figure key={idx} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:0.4}} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow">
              <blockquote className="text-lg">“{items[idx].quote}”</blockquote>
              <figcaption className="mt-3 text-sm text-slate-500">— {items[idx].name} · {items[idx].detail}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold tracking-tight">About {CONFIG.founder}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              I’m {CONFIG.founder}, a {CONFIG.founderTitle} with {CONFIG.years}+ years of hands‑on experience helping people and organisations stay secure. I’ve led incident response, built security operations capabilities, and coached hundreds of users to be safer online. Now I bring the same enterprise‑grade protection to individuals, families, and small businesses — in plain English and at fair prices.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500"/> CISSP‑certified; UK‑based; remote‑first</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500"/> Proven track record in threat detection & response</li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500"/> Friendly, judgement‑free guidance for all skill levels</li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 shadow">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white grid place-content-center text-2xl font-bold">DM</div>
                <div>
                  <div className="font-semibold">{CONFIG.founder}</div>
                  <div className="text-sm text-slate-500">CISSP · {CONFIG.years}+ years</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                "Security shouldn’t be scary or exclusive. I’ll meet you where you are and make it simple, effective and sustainable."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Do you work fully remotely?", a: "Yes — consultations, hardening and training are delivered remotely across the UK. On‑site can be arranged via partners if ever required." },
    { q: "Is this for non‑technical people?", a: "Absolutely. We use plain English and guide you step‑by‑step. No jargon. No judgement." },
    { q: "What do you need from me?", a: "A video call, device access (with your permission), and an open chat about your goals and concerns." },
    { q: "Are you insured?", a: "Yes — professional indemnity coverage is in place. We also operate with strict confidentiality and minimal data collection." },
    { q: "Can you help my small business with Cyber Essentials?", a: "Yes. We provide readiness guidance, controls implementation coaching, and documentation support." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-20 bg-slate-50/60 dark:bg-slate-900/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">FAQs</h2>
        <div className="mt-8 divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {faqs.map((f, i)=> (
            <div key={i}>
              <button className="w-full text-left px-5 py-4 flex items-center justify-between" onClick={()=> setOpen(open===i ? -1 : i)}>
                <span className="font-medium">{f.q}</span>
                <ChevronDown className={`h-5 w-5 transition ${open===i ? 'rotate-180' : ''}`}/>
              </button>
              <AnimatePresence initial={false}>
                {open===i && (
                  <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-300">
                    {f.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ contactHref }) {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-tr from-indigo-600 to-purple-600 p-8 sm:p-12 text-white shadow-xl">
          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-3xl font-bold">Book your free 20‑minute cyber health check</h3>
              <p className="mt-2 text-white/90">No pressure, no jargon — just practical advice you can use today. If we’re a fit, we’ll map the next steps together.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <a href={contactHref} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-indigo-700 font-medium hover:bg-white/90">
                <CalendarIcon className="h-5 w-5"/> Book a call
              </a>
              <a href={`mailto:${CONFIG.email}`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-white ring-1 ring-white/40 hover:bg-white/20">
                <Mail className="h-5 w-5"/> Email us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 font-semibold"><Shield className="h-5 w-5 text-indigo-600"/> {CONFIG.brand}</div>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Cybersecurity for individuals, families and growing SMEs — UK‑wide, remote‑first.</p>
          </div>
          <div>
            <div className="font-semibold">Services</div>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
              <li><a href="#services">Personal cyber audit</a></li>
              <li><a href="#services">IoT & home network</a></li>
              <li><a href="#services">Identity & fraud guard</a></li>
              <li><a href="#services">SME essentials</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Company</div>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
              <li><a href="#about">About Dharmesh</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
              <li className="inline-flex items-center gap-2"><Phone className="h-4 w-4"/> <a href={`tel:${CONFIG.phone}`}>{CONFIG.phone}</a></li>
              <li className="inline-flex items-center gap-2"><Mail className="h-4 w-4"/> <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} {CONFIG.brand}. All rights reserved.</p>
          <p>Information provided is general guidance — not legal advice. We operate privacy‑first and under strict confidentiality.</p>
        </div>
      </div>
    </footer>
  );
}

function CookieBar({ onAccept }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[95%] sm:w-[600px]">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur p-4 shadow-lg">
        <div className="text-sm text-slate-700 dark:text-slate-300">
          We use minimal cookies to run this site and measure what content helps visitors most. By using it, you agree to our cookie policy.
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={onAccept} className="rounded-xl px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700">OK</button>
        </div>
      </div>
    </div>
  );
}

function ChatBubble() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="mb-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl w-72">
            <div className="text-sm font-medium">Talk to a security expert</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Typically replies within a few hours.</div>
            <div className="mt-3 grid gap-2">
              <a href={`mailto:${CONFIG.email}`} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"><Mail className="h-4 w-4"/> Email</a>
              <a href={`tel:${CONFIG.phone}`} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"><Phone className="h-4 w-4"/> Call</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={()=>setOpen(!open)} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-white shadow-lg hover:bg-indigo-700">
        <Shield className="h-5 w-5"/> Chat
      </button>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);
  if(!show) return null;
  return (
    <button onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-6 left-6 z-[60] rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-2 shadow">
      ↑ Top
    </button>
  );
}

function CalendarIcon(props){
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}
