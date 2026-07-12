'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Menu, X, Phone, MessageCircle, MapPin, Clock, Star, ChevronDown,
  Volume2, PenTool, CheckCircle2, Sparkles, RotateCcw,
} from 'lucide-react';
import { Baloo_2, Inter } from 'next/font/google';

const baloo = Baloo_2({ subsets: ['latin'], weight: ['600', '700', '800'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

/* ------------------------------------------------------------------ */
/* Replace these with the real clinic details before going live       */
/* ------------------------------------------------------------------ */
const PHONE_DISPLAY = '+91 90000 00000';
const PHONE_TEL = '+919000000000';
const WHATSAPP = 'https://wa.me/919000000000?text=Hi%2C%20I%20want%20to%20book%20a%20consultation%20at%20Samarth%20Clinic';
const ADDRESS = 'Near Civil Lines, Dehri-on-Sone, Rohtas, Bihar - 821307';
const MAP_EMBED = 'https://www.google.com/maps?q=Dehri-on-Sone,Bihar&output=embed';
const GBP_LINK = '#'; // paste your Google Business Profile link here

/* ------------------------------------------------------------------ */
/* Content data                                                        */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  ['Home', '#home'], ['Services', '#services'], ['Doctors', '#doctors'],
  ['Conditions', '#conditions'], ['Games', '#games'], ['Reviews', '#reviews'], ['FAQ', '#faq'],
];

const SPEECH_SERVICES = [
  ['Late Talkers & Speech Delay', 'For toddlers and kids who are not speaking as per their age.'],
  ['Stammering / Stuttering', 'Simple, proven exercises to speak smoothly and with confidence.'],
  ['Clarity & Pronunciation', 'Fixing sounds that come out unclear, like "th", "s" or "r".'],
  ['Language & Vocabulary', 'Building words, sentences and understanding step by step.'],
  ['Autism Communication Support', 'Speech and interaction skills for children and adults on the spectrum.'],
  ['Voice Problems', 'Help for a hoarse, weak or unusual sounding voice.'],
];

const OT_SERVICES = [
  ['Sensory Issues', 'For kids who are overly sensitive to sound, touch or crowds.'],
  ['Fine Motor Skills', 'Better grip and control for writing, buttons, and small tasks.'],
  ['Handwriting Readiness', 'Getting little hands school-ready and confident on paper.'],
  ['Autism & ADHD Support', 'Focus, routine and daily-living skills, taught patiently.'],
  ['Balance & Coordination', 'Improving how the body moves, sits and stays steady.'],
  ['Daily Living Skills', 'Eating, dressing and self-care, made independent.'],
];

const CONDITIONS = {
  'We help with (Speech)': ['Speech Delay', 'Stammering', 'Unclear Speech', 'Autism', 'Down Syndrome', 'Cleft Lip/Palate', 'Hearing-loss Speech Support', 'Adult Speech Loss (Stroke)'],
  'We help with (Occupational)': ['Sensory Processing', 'Poor Handwriting', 'Clumsy Movement', 'Cerebral Palsy', 'ADHD', 'Low Attention Span', 'Delayed Milestones', 'School Readiness'],
};

const TESTIMONIALS = [
  ['Ritu Devi', 'Mother of a 4-year-old, Dehri', 'My son was not speaking full words at 3. After a few months with Akansha Ma\'am, he now talks in full sentences. Very patient with kids.'],
  ['Manoj Kumar', 'Adult patient, Dehri-on-Sone', 'After my stroke, my speech was very unclear. A few months of therapy here and I can talk to my family and shopkeepers without hesitation now.'],
  ['Sunita Kumari', 'Parent, Sasaram', 'Doctor explains everything in simple Hindi-English. My daughter\'s handwriting has improved a lot in 3 months.'],
];

const FAQS = [
  ['At what age should I bring my child for speech therapy?', 'The earlier the better. If your child is not saying simple words by age 2, or sentences by age 3, it is a good time for a free check-up. But we treat all ages, including adults.'],
  ['Is stammering completely curable?', 'Many children outgrow it fully with early, correct therapy. Even for older kids and adults, we can teach techniques that make speech much smoother and reduce stress while talking.'],
  ['Do you only treat children, or adults too?', 'Both. We treat children with speech and developmental delays, and also adults recovering from stroke, accidents, or voice problems.'],
  ['How many sessions will be needed?', 'It depends on the condition. After the first assessment, Akansha Ma\'am will explain a clear plan and rough timeline, whether it\'s for you or your child.'],
  ['Do you provide home visits or online sessions?', 'Yes, home visits and online follow-up sessions are available in select cases. Please call us to check.'],
  ['Where exactly is the clinic located in Dehri-on-Sone?', 'We are located near Civil Lines, Dehri-on-Sone, Rohtas. Full directions are in the map below, or just call us and we will guide you.'],
];

const SOUND_GROUPS = {
  S: ['Sun', 'Star', 'Snake', 'Sock', 'Soap'],
  R: ['Rat', 'Rain', 'Ring', 'Rose', 'Rabbit'],
  L: ['Lion', 'Leaf', 'Lamp', 'Log', 'Lock'],
  Ch: ['Chair', 'Cheese', 'Chick', 'Chalk', 'Church'],
};

const SHAPES = ['Circle', 'Wave', 'Zigzag'];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */
function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-[#146C6B] bg-[#EAF6F4] px-3 py-1 rounded-full">
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14 px-4">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`${baloo.className} text-3xl md:text-4xl font-bold text-[#0F3B3A] mt-4`}>{title}</h2>
      {sub && <p className="text-[#3F5453] mt-3 leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero waveform - the signature visual                                */
/* ------------------------------------------------------------------ */
function Waveform() {
  const reduce = useReducedMotion();
  const bars = [18, 34, 50, 30, 60, 40, 55, 24, 44, 20, 36, 52, 28, 46, 20];
  return (
    <div className="flex items-end justify-center gap-[5px] h-40 md:h-56" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[7px] md:w-[9px] rounded-full bg-gradient-to-t from-[#146C6B] to-[#3FB6AE]"
          style={{ height: h }}
          animate={reduce ? {} : { height: [h, h * 1.7, h * 0.6, h] }}
          transition={{ duration: 1.6 + (i % 5) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.06 }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                  */
/* ------------------------------------------------------------------ */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F4]/90 backdrop-blur border-b border-[#146C6B]/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 h-16">
        <a href="#home" className={`${baloo.className} text-lg md:text-xl font-bold text-[#0F3B3A]`}>
          Samarth <span className="text-[#146C6B]">Clinic</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#28403E]">
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-[#146C6B] transition-colors">{label}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 bg-[#146C6B] text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-[#0F3B3A] transition-colors">
            <Phone size={16} /> Call Now
          </a>
        </div>
        <button aria-label="Toggle menu" onClick={() => setOpen((o) => !o)} className="md:hidden text-[#0F3B3A]">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#FBF9F4] border-t border-[#146C6B]/10"
          >
            <div className="flex flex-col px-4 py-3">
              {NAV_LINKS.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="py-2.5 text-[#28403E] font-medium border-b border-[#146C6B]/10 last:border-none">
                  {label}
                </a>
              ))}
              <a href={`tel:${PHONE_TEL}`} className="mt-3 inline-flex items-center justify-center gap-2 bg-[#146C6B] text-white font-semibold px-4 py-3 rounded-full">
                <Phone size={16} /> Call Now
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Eyebrow>Speech &amp; Occupational Therapy Center • Dehri-on-Sone</Eyebrow>
          <h1 className={`${baloo.className} text-4xl md:text-5xl font-extrabold text-[#0F3B3A] mt-5 leading-tight`}>
            Helping every patient find clear <span className="text-[#146C6B]">speech</span> and everyday confidence.
          </h1>
          <p className="text-[#3F5453] mt-5 text-base md:text-lg leading-relaxed max-w-lg">
            Samarth Clinic is Dehri-on-Sone's dedicated speech and occupational therapy center — for children and
            adults alike. From speech delay and stammering to sensory issues, handwriting, and speech recovery
            after a stroke, we treat it with care, patience, and a plan that actually works.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0F3B3A] font-bold px-6 py-3.5 rounded-full hover:brightness-95 transition">
              <Phone size={18} /> Call Now
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-[#146C6B]/25 text-[#0F3B3A] font-semibold px-6 py-3.5 rounded-full hover:bg-[#EAF6F4] transition">
              <MessageCircle size={18} /> Book Free Consultation
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-[#3F5453]">
            {['Welcoming for all ages', 'Qualified therapists', 'Personal 1-on-1 attention'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[#146C6B]" />{t}</span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#146C6B]/10 shadow-[0_20px_60px_-25px_rgba(15,59,58,0.35)] overflow-hidden">
          <div className="relative w-full aspect-[6/5] bg-[#EAF6F4]">
            <Image
              src="/images/hero-session.jpg"
              alt="Speech therapist working with a patient at Samarth Clinic, Dehri-on-Sone"
              fill priority sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
            />
          </div>
          <div className="p-6 flex flex-col items-center">
            <Waveform />
            <p className="text-center text-[#0F3B3A] font-semibold mt-2">Every word starts with a sound.</p>
            <p className="text-center text-[#3F5453] text-sm mt-1">We help every patient build theirs, one session at a time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Doctors                                                              */
/* ------------------------------------------------------------------ */
function DoctorCard({ name, role, tag, img, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl border border-[#146C6B]/10 p-6 flex-1">
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#EAF6F4] mb-4">
        <Image src={img} alt={`${name}, ${tag} at Samarth Clinic, Dehri-on-Sone`} fill sizes="64px" className="object-cover" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wide text-[#F5A623]">{tag}</span>
      <h3 className={`${baloo.className} text-xl font-bold text-[#0F3B3A] mt-1`}>{name}</h3>
      <p className="text-[#3F5453] mt-1 text-sm">{role}</p>
    </motion.div>
  );
}

function Doctors() {
  return (
    <section id="doctors" className="bg-[#EAF6F4] py-16 md:py-20">
      <SectionHeading eyebrow="Meet the team" title="The people behind every patient's progress" sub="Two experienced therapists, one clear goal — real, lasting improvement." />
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-5 gap-5 items-stretch">
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[200px] bg-white">
          <Image
            src="/images/clinic-interior.jpg"
            alt="Inside Samarth Clinic therapy room, Dehri-on-Sone"
            fill sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        </div>
        <div className="md:col-span-3 flex flex-col sm:flex-row gap-5">
          <DoctorCard name="Akansha Singh" role="Speech-Language & Occupational Therapist — heads the Speech &amp; OT department at Samarth Clinic." tag="Lead Therapist" img="/images/doctor-akansha.jpg" delay={0} />
          <DoctorCard name="Dr. Prem Prakash" role="BPT, Physiotherapist — Founder &amp; Clinic Head of Samarth Clinic, Dehri-on-Sone." tag="Clinic Head" img="/images/doctor-prem.jpg" delay={0.1} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                             */
/* ------------------------------------------------------------------ */
function Services() {
  const [tab, setTab] = useState('speech');
  const list = tab === 'speech' ? SPEECH_SERVICES : OT_SERVICES;
  return (
    <section id="services" className="py-16 md:py-20">
      <SectionHeading eyebrow="What we treat" title="Speech &amp; Occupational Therapy Services" sub="Focused programs for children and adults, built around each patient's needs." />
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-center gap-2 mb-9">
          {[['speech', 'Speech Therapy'], ['ot', 'Occupational Therapy']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${tab === key ? 'bg-[#146C6B] text-white' : 'bg-[#EAF6F4] text-[#0F3B3A]'}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map(([title, desc], i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="bg-white border border-[#146C6B]/10 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition">
              <h3 className="font-bold text-[#0F3B3A] mb-1.5">{title}</h3>
              <p className="text-sm text-[#3F5453] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Conditions chip cloud                                               */
/* ------------------------------------------------------------------ */
function Conditions() {
  return (
    <section id="conditions" className="bg-[#0F3B3A] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <Eyebrow>Common concerns</Eyebrow>
          <h2 className={`${baloo.className} text-3xl md:text-4xl font-bold text-white mt-4`}>Do any of these sound familiar?</h2>
          <p className="text-[#B9D6D3] mt-3 max-w-xl mx-auto">Whether it's your child or yourself, noticing these early makes a real difference.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(CONDITIONS).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-[#F5A623] font-semibold text-sm uppercase tracking-wide mb-3">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((c) => (
                  <span key={c} className="text-sm text-white bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Game 1: Pop the Sound (speech practice)                            */
/* ------------------------------------------------------------------ */
function PopSoundGame() {
  const [sound, setSound] = useState('S');
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setBubbles([]);
    const id = setInterval(() => {
      setBubbles((prev) => {
        const now = Date.now();
        const alive = prev.filter((b) => now - b.created < 8000);
        if (alive.length < 5) {
          const words = SOUND_GROUPS[sound];
          const word = words[Math.floor(Math.random() * words.length)];
          alive.push({ id: now + Math.random(), word, left: 8 + Math.random() * 78, created: now, dur: 6 + Math.random() * 3 });
        }
        return alive;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [sound]);

  const pop = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#146C6B]/10 p-5 md:p-6">
      <div className="flex items-center gap-2 mb-1">
        <Volume2 size={20} className="text-[#146C6B]" />
        <h3 className={`${baloo.className} font-bold text-lg text-[#0F3B3A]`}>Pop the Sound</h3>
      </div>
      <p className="text-sm text-[#3F5453] mb-3">Say the word out loud, then tap the bubble to pop it. Practice the {sound} sound!</p>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {Object.keys(SOUND_GROUPS).map((s) => (
          <button key={s} onClick={() => setSound(s)}
            className={`w-9 h-9 rounded-full text-sm font-bold transition-colors ${sound === s ? 'bg-[#146C6B] text-white' : 'bg-[#EAF6F4] text-[#0F3B3A]'}`}>
            {s}
          </button>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-[#F5A623]"><Sparkles size={16} /> Score: {score}</span>
      </div>
      <div className="relative h-72 rounded-xl bg-gradient-to-b from-[#EAF6F4] to-white overflow-hidden">
        <AnimatePresence>
          {bubbles.map((b) => (
            <motion.button
              key={b.id}
              onClick={() => pop(b.id)}
              initial={{ bottom: -40, opacity: 0, scale: 0.7 }}
              animate={{ bottom: 300, opacity: [0, 1, 1, 0], scale: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: b.dur, ease: 'linear' }}
              style={{ left: `${b.left}%` }}
              className="absolute -translate-x-1/2 bg-[#3FB6AE]/90 text-white text-xs md:text-sm font-bold px-4 py-3 rounded-full shadow-md whitespace-nowrap"
            >
              {b.word}
            </motion.button>
          ))}
        </AnimatePresence>
        {bubbles.length === 0 && <p className="absolute inset-0 flex items-center justify-center text-sm text-[#3F5453]">Bubbles loading…</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Game 2: Trace & Grow (fine motor practice)                          */
/* ------------------------------------------------------------------ */
function TraceGame() {
  const [shape, setShape] = useState('Circle');
  const [points, setPoints] = useState([]);
  const [progress, setProgress] = useState(0);
  const svgRef = useRef(null);
  const guideRef = useRef(null);
  const drawing = useRef(false);
  const moveCount = useRef(0);

  const reset = () => { setPoints([]); setProgress(0); };
  useEffect(reset, [shape]);

  const toSvgPoint = (e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    const t = e.touches ? e.touches[0] : e;
    pt.x = t.clientX; pt.y = t.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  const computeProgress = (pts) => {
    const guide = guideRef.current;
    if (!guide || pts.length === 0) return;
    const total = guide.getTotalLength();
    const samples = 36;
    let hits = 0;
    for (let i = 0; i <= samples; i++) {
      const gp = guide.getPointAtLength((i / samples) * total);
      if (pts.some((p) => Math.hypot(p.x - gp.x, p.y - gp.y) < 16)) hits++;
    }
    setProgress(Math.min(100, Math.round((hits / (samples + 1)) * 100)));
  };

  const start = (e) => { drawing.current = true; addPoint(e); };
  const move = (e) => { if (drawing.current) addPoint(e); };
  const end = () => { drawing.current = false; };
  const addPoint = (e) => {
    e.preventDefault();
    const p = toSvgPoint(e);
    setPoints((prev) => {
      const next = [...prev, { x: p.x, y: p.y }];
      moveCount.current += 1;
      if (moveCount.current % 3 === 0) computeProgress(next);
      return next;
    });
  };

  const guide = () => {
    if (shape === 'Circle') return <circle ref={guideRef} cx="150" cy="100" r="65" />;
    if (shape === 'Wave') return <path ref={guideRef} d="M20,100 C70,30 100,170 150,100 C200,30 230,170 280,100" />;
    return <polyline ref={guideRef} points="30,150 90,50 150,150 210,50 270,150" />;
  };

  const celebrate = progress >= 80;

  return (
    <div className="bg-white rounded-2xl border border-[#146C6B]/10 p-5 md:p-6">
      <div className="flex items-center gap-2 mb-1">
        <PenTool size={20} className="text-[#146C6B]" />
        <h3 className={`${baloo.className} font-bold text-lg text-[#0F3B3A]`}>Trace &amp; Grow</h3>
      </div>
      <p className="text-sm text-[#3F5453] mb-3">Trace over the dotted shape with your finger or mouse to build hand control.</p>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {SHAPES.map((s) => (
          <button key={s} onClick={() => setShape(s)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${shape === s ? 'bg-[#146C6B] text-white' : 'bg-[#EAF6F4] text-[#0F3B3A]'}`}>
            {s}
          </button>
        ))}
        <button onClick={reset} className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-[#3F5453] hover:text-[#146C6B]">
          <RotateCcw size={15} /> Clear
        </button>
      </div>
      <div className="relative rounded-xl bg-gradient-to-b from-[#EAF6F4] to-white overflow-hidden touch-none">
        <svg
          ref={svgRef} viewBox="0 0 300 200" className="w-full h-64 touch-none"
          onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerLeave={end}
        >
          <g fill="none" stroke="#C7DFDC" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 14">
            {guide()}
          </g>
          <polyline
            points={points.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none" stroke={celebrate ? '#F5A623' : '#146C6B'} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        <AnimatePresence>
          {celebrate && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="absolute top-3 right-3 bg-[#F5A623] text-[#0F3B3A] text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1">
              <Sparkles size={14} /> Great job!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 h-2 rounded-full bg-[#EAF6F4] overflow-hidden">
        <motion.div className="h-full bg-[#146C6B]" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
      </div>
      <p className="text-xs text-[#3F5453] mt-1.5">{progress}% traced</p>
    </div>
  );
}

function Games() {
  return (
    <section id="games" className="bg-[#EAF6F4] py-16 md:py-20">
      <SectionHeading eyebrow="Practice at home" title="Fun games our patients love" sub="Two simple games we use to make speech and motor-skill practice feel like play, not homework." />
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-5">
        <PopSoundGame />
        <TraceGame />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */
function Testimonials() {
  return (
    <section id="reviews" className="py-16 md:py-20">
      <SectionHeading eyebrow="Parents &amp; patients" title="What families in Dehri-on-Sone say" />
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-4">
        {TESTIMONIALS.map(([name, tag, quote], i) => (
          <motion.div key={name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-white border border-[#146C6B]/10 rounded-2xl p-6">
            <div className="flex gap-0.5 text-[#F5A623] mb-3">
              {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={15} fill="currentColor" strokeWidth={0} />)}
            </div>
            <p className="text-sm text-[#3F5453] leading-relaxed">"{quote}"</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#EAF6F4] shrink-0">
                <Image src={`/images/parent-${i + 1}.jpg`} alt={`${name}, parent`} fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F3B3A]">{name}</p>
                <p className="text-xs text-[#3F5453]">{tag}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-[#3F5453] mt-6">Sample reviews — replace with real Google reviews once collected.</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-[#EAF6F4] py-16 md:py-20">
      <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
      <div className="max-w-2xl mx-auto px-4 space-y-3">
        {FAQS.map(([q, a], i) => (
          <div key={q} className="bg-white rounded-xl border border-[#146C6B]/10 overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-3 text-left px-5 py-4">
              <span className="font-semibold text-[#0F3B3A] text-sm md:text-base">{q}</span>
              <ChevronDown size={18} className={`shrink-0 text-[#146C6B] transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="px-5 pb-4 text-sm text-[#3F5453] leading-relaxed">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact / Location                                                  */
/* ------------------------------------------------------------------ */
function Contact() {
  return (
    <section id="contact" className="py-16 md:py-20">
      <SectionHeading eyebrow="Visit us" title="Find Samarth Clinic in Dehri-on-Sone" />
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white border border-[#146C6B]/10 rounded-2xl p-6 space-y-4">
          <div className="flex gap-3"><MapPin className="text-[#146C6B] shrink-0" size={20} /><p className="text-sm text-[#3F5453]">{ADDRESS}</p></div>
          <div className="flex gap-3"><Clock className="text-[#146C6B] shrink-0" size={20} /><p className="text-sm text-[#3F5453]">Mon–Sat, 10:00 AM – 7:00 PM</p></div>
          <div className="flex gap-3"><Phone className="text-[#146C6B] shrink-0" size={20} /><a href={`tel:${PHONE_TEL}`} className="text-sm text-[#146C6B] font-semibold">{PHONE_DISPLAY}</a></div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 bg-[#146C6B] text-white text-sm font-semibold px-5 py-3 rounded-full"><Phone size={16} /> Call Now</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-5 py-3 rounded-full"><MessageCircle size={16} /> WhatsApp</a>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-[#146C6B]/10 h-72 md:h-full">
          <iframe title="Samarth Clinic location map" src={MAP_EMBED} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer + sticky mobile CTA                                          */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="bg-[#0F3B3A] text-[#B9D6D3] pt-12 pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <p className={`${baloo.className} text-lg font-bold text-white`}>Samarth Clinic</p>
          <p className="text-sm mt-2 leading-relaxed">Speech &amp; Occupational Therapy Center, Dehri-on-Sone, Rohtas, Bihar.</p>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-2">Quick Links</p>
          <div className="flex flex-col gap-1.5 text-sm">
            {NAV_LINKS.map(([l, h]) => <a key={h} href={h} className="hover:text-white">{l}</a>)}
          </div>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-2">Contact</p>
          <p className="text-sm">{ADDRESS}</p>
          <p className="text-sm mt-1">{PHONE_DISPLAY}</p>
          <a href={GBP_LINK} className="text-sm underline mt-1 inline-block">Google Business Profile</a>
        </div>
      </div>
      <p className="text-center text-xs mt-10 text-[#7FA4A1] px-4">
        © {new Date().getFullYear()} Samarth Clinic, Dehri-on-Sone. For a personalised assessment, please consult our therapists directly — this website is for information only.
      </p>
      {/* mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-white border-t border-[#146C6B]/15 px-4 py-3 flex gap-3 z-40">
        <a href={`tel:${PHONE_TEL}`} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#146C6B] text-white font-semibold py-3 rounded-full text-sm"><Phone size={16} /> Call</a>
        <a href={WHATSAPP} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 rounded-full text-sm"><MessageCircle size={16} /> WhatsApp</a>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
export default function ClinicHome() {
  return (
    <div className={`${inter.className} bg-[#FBF9F4] text-[#16302E]`}>
      <Nav />
      <Hero />
      <Doctors />
      <Services />
      <Conditions />
      <Games />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}