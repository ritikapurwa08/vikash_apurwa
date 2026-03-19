import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, Phone, Briefcase, GraduationCap, Award, Globe2,
  BookOpen, CalendarDays, Heart, Flag, Scale, Target, Send,
  ChevronRight, UserCircle, Menu, X, MapPin, Star, TrendingUp,
  Users, Zap, Check
} from 'lucide-react';
import profilePhoto from './assets/photo.png';
import signaturePhoto from './assets/sign.png';

// ─── Types ─────────────────────────────────────────────────────────────────

interface ExperienceItem {
  company: string;
  role: string;
  responsibilities: string[];
  period?: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  year: string;
}

interface DetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

interface ExperienceCardProps extends ExperienceItem { }
interface EducationCardProps extends EducationItem { }
interface NavItemProps {
  section: string;
  label: string;
  activeSection: string;
  onClick: () => void;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const experienceData: ExperienceItem[] = [
  {
    company: "Aakash Universal Limited",
    role: "Supervisor",
    period: "Aakash Italian Marble",
    responsibilities: [
      "Supervised daily operations and workflow efficiency",
      "Managed team coordination and productivity targets",
      "Ensured smooth and compliant business operations",
    ],
  },
  {
    company: "Jai Shree Balaji",
    role: "Sales Executive",
    period: "Kishangarh",
    responsibilities: [
      "Handled customer interactions and end-to-end sales",
      "Worked in a high-performance team environment",
      "Built lasting positive customer relationships",
    ],
  },
  {
    company: "EBT Marmo",
    role: "Senior Sales Executive",
    period: "Agra",
    responsibilities: [
      "Managed high-level sales and key client accounts",
      "Built and maintained strong customer relationships",
      "Contributed significantly to business revenue growth",
    ],
  },
  {
    company: "Millennium Marble",
    role: "Sales Executive",
    period: "Silvassa",
    responsibilities: [
      "Managed customer dealing and premium product sales",
      "Handled diverse client requirements professionally",
      "Strengthened sales performance through experience",
    ],
  },
];

const educationData: EducationItem[] = [
  { institution: "SK College, Sikar", degree: "Bachelor of Arts (B.A)", year: "2011" },
  { institution: "Govt. Higher Secondary School, Danta", degree: "12th Standard", year: "2008" },
  { institution: "Govt. Senior Secondary School, Danta", degree: "10th Standard", year: "2006" },
];

const skills: string[] = [
  "Sales & Negotiation",
  "Team Building",
  "Customer Relationship Management",
  "Innovative Thinking",
  "Hard Work & Dedication",
  "Business Development",
];

const languages: string[] = ["Hindi", "English", "Nagamis"];
const interests: string[] = ["Farming", "Sports", "Cricket", "Dancing", "Reading"];

const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

// ─── Sub-Components ────────────────────────────────────────────────────────

const NavItem: React.FC<NavItemProps> = ({ section, label, activeSection, onClick }) => (
  <a
    href={`#${section}`}
    onClick={onClick}
    className={`block px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeSection === section
        ? 'bg-amber-500 text-stone-900 shadow-md'
        : 'text-stone-300 hover:text-white hover:bg-stone-700'
      }`}
  >
    {label}
  </a>
);

const ExperienceCard: React.FC<ExperienceCardProps> = ({ role, company, period, responsibilities }) => (
  <div className="group relative bg-stone-800/60 border border-stone-700/50 rounded-2xl p-5 hover:border-amber-500/40 hover:bg-stone-800/90 transition-all duration-300 shadow-lg hover:shadow-amber-900/20 hover:shadow-xl">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
        <Briefcase className="w-5 h-5 text-amber-400" />
      </div>
      <div className="min-w-0">
        <h4 className="text-white font-bold text-base leading-tight">{role}</h4>
        <p className="text-amber-400 text-sm font-medium truncate">{company}</p>
        {period && <p className="text-stone-400 text-xs mt-0.5">{period}</p>}
      </div>
    </div>
    <ul className="space-y-2">
      {responsibilities.map((resp, index) => (
        <li key={index} className="flex items-start gap-2 text-stone-300 text-sm leading-relaxed">
          <Check className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
          <span>{resp}</span>
        </li>
      ))}
    </ul>
  </div>
);

const EducationCard: React.FC<EducationCardProps> = ({ institution, degree, year }) => (
  <div className="bg-stone-800/60 border border-stone-700/50 rounded-2xl p-5 hover:border-amber-500/30 transition-all duration-300">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-4 h-4 text-amber-400 flex-shrink-0" />
      <span className="text-amber-400 text-xs font-mono font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full">{year}</span>
    </div>
    <h4 className="text-white font-bold text-base mb-1">{degree}</h4>
    <p className="text-stone-400 text-sm">{institution}</p>
  </div>
);

const DetailItem: React.FC<DetailItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-3 border-b border-stone-700/50 last:border-none">
    <div className="w-8 h-8 rounded-lg bg-stone-700/50 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-amber-400" />
    </div>
    <div>
      <p className="text-stone-400 text-xs">{label}</p>
      <p className="text-white text-sm font-semibold">{value}</p>
    </div>
  </div>
);

// ─── Animated Section Wrapper ──────────────────────────────────────────────

const FadeSection: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({
  id, children, className = ''
}) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        } ${className}`}
    >
      {children}
    </section>
  );
};

// ─── Section Heading ───────────────────────────────────────────────────────

const SectionHeading: React.FC<{ icon: React.ElementType; title: string; subtitle?: string }> = ({
  icon: Icon, title, subtitle
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-amber-400" />
      </div>
      <h3 className="text-2xl font-extrabold text-white tracking-tight">{title}</h3>
    </div>
    {subtitle && <p className="text-stone-400 text-sm ml-13 pl-[52px]">{subtitle}</p>}
    <div className="mt-4 h-px bg-gradient-to-r from-amber-500/40 via-amber-500/10 to-transparent" />
  </div>
);

// ─── Main App ──────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navSections.map(s => s.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-stone-900 text-white antialiased" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1c1917; }
        ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 2px; }
        .grain::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.3;
        }
        .glow-amber { box-shadow: 0 0 40px rgba(245,158,11,0.12); }
      `}</style>

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-amber-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      {/* ── Navigation ───────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-stone-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-stone-800' : 'bg-transparent'
        }`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="text-stone-900 font-black text-sm">V</span>
            </div>
            <span className="font-bold text-white text-sm hidden sm:block">Vikash K. Apurwa</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 bg-stone-800/80 border border-stone-700/50 rounded-full px-2 py-1">
            {navSections.map(s => (
              <NavItem key={s.id} section={s.id} label={s.label} activeSection={activeSection} onClick={() => { }} />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href="#contact" className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-sm px-4 py-2 rounded-full transition-all duration-200 shadow-lg shadow-amber-900/30 hidden sm:block">
              Hire Me
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-900/98 backdrop-blur-xl border-b border-stone-800 px-4 pb-4">
            <div className="grid grid-cols-3 gap-2 pt-2">
              {navSections.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === s.id
                      ? 'bg-amber-500 text-stone-900'
                      : 'bg-stone-800 text-stone-300 hover:text-white'
                    }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <FadeSection id="home" className="relative pt-24 pb-12 px-4 min-h-screen flex items-center z-10">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col items-center text-center gap-6">

            {/* Photo */}
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-amber-500/40 shadow-2xl shadow-amber-900/30 glow-amber">
                <img src={profilePhoto} alt="Vikash Kumar Apurwa" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-stone-900" title="Available for work" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium">
              <Zap className="w-3.5 h-3.5" />
              Ready for Leadership Roles
            </div>

            {/* Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Vikash Kumar
                <span className="block text-amber-400">Apurwa</span>
              </h1>
              <p className="mt-3 text-stone-400 text-base sm:text-lg font-medium">
                Sales Professional · Supervisor · Aspiring Sales Manager
              </p>
            </div>

            {/* Short bio */}
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Experienced in the marble industry across India, specializing in customer handling, team coordination, and business development. Driven by results and leadership.
            </p>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-stone-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>India · Marble Industry</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs mt-2">
              {[
                { value: '4+', label: 'Companies' },
                { value: '10+', label: 'Yrs Exp.' },
                { value: '100%', label: 'Dedicated' },
              ].map(stat => (
                <div key={stat.label} className="bg-stone-800/70 border border-stone-700/50 rounded-2xl py-3 px-2 text-center">
                  <p className="text-amber-400 font-black text-lg">{stat.value}</p>
                  <p className="text-stone-500 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 mt-2 w-full max-w-xs">
              <a
                href="#experience"
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-amber-900/30"
              >
                View Work <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="flex-1 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4" /> Contact
              </a>
            </div>

          </div>
        </div>
      </FadeSection>

      {/* ── Main Content ─────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-20 space-y-16">

        {/* ── About ────── */}
        <FadeSection id="about">
          <SectionHeading icon={UserCircle} title="About Me" subtitle="Background & strengths" />
          <div className="space-y-4">
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              I am a dedicated and result-oriented sales professional with strong experience in India's marble industry. Working across multiple organizations, I have managed customer relationships, handled sales operations, and supported team coordination at scale.
            </p>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              I believe in hard work, discipline, and continuous growth. I am now actively seeking leadership and managerial opportunities where I can apply my experience to drive significant business impact.
            </p>

            {/* Strengths grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { icon: TrendingUp, title: 'Sales Growth', desc: 'Proven revenue driver' },
                { icon: Users, title: 'Team Leader', desc: 'Coordination & management' },
                { icon: Star, title: 'Client Focus', desc: 'Lasting relationships' },
                { icon: Target, title: 'Goal Oriented', desc: 'Results that matter' },
              ].map(strength => (
                <div key={strength.title} className="bg-stone-800/60 border border-stone-700/50 rounded-2xl p-4 hover:border-amber-500/30 transition-all">
                  <strength.icon className="w-5 h-5 text-amber-400 mb-2" />
                  <p className="text-white font-bold text-sm">{strength.title}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{strength.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ── Experience ────── */}
        <FadeSection id="experience">
          <SectionHeading icon={Briefcase} title="Experience" subtitle="Professional career journey" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {experienceData.map((exp, i) => (
              <ExperienceCard key={i} {...exp} />
            ))}
          </div>
        </FadeSection>

        {/* ── Education ────── */}
        <FadeSection id="education">
          <SectionHeading icon={GraduationCap} title="Education" subtitle="Academic qualifications" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {educationData.map((edu, i) => (
              <EducationCard key={i} {...edu} />
            ))}
          </div>
        </FadeSection>

        {/* ── Skills & Languages ────── */}
        <FadeSection id="skills">
          <SectionHeading icon={Award} title="Skills & More" subtitle="What I bring to the table" />

          <div className="space-y-6">
            {/* Skills */}
            <div>
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-3">Core Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="bg-stone-800/80 border border-stone-600/50 text-stone-200 text-sm font-medium px-3.5 py-1.5 rounded-full hover:border-amber-500/40 hover:text-amber-300 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages & Interests side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-800/60 border border-stone-700/50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Globe2 className="w-4 h-4 text-amber-400" />
                  <p className="text-white font-bold text-sm">Languages</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map(l => (
                    <span key={l} className="bg-stone-700/60 text-stone-300 text-xs px-2.5 py-1 rounded-full">{l}</span>
                  ))}
                </div>
              </div>

              <div className="bg-stone-800/60 border border-stone-700/50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <p className="text-white font-bold text-sm">Interests</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {interests.map(i => (
                    <span key={i} className="bg-stone-700/60 text-stone-300 text-xs px-2.5 py-1 rounded-full">{i}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-stone-800/60 border border-stone-700/50 rounded-2xl p-5">
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-1">Personal Profile</p>
              <div className="divide-y divide-stone-700/40">
                <DetailItem icon={CalendarDays} label="Date of Birth" value="02 March 1993" />
                <DetailItem icon={Heart} label="Marital Status" value="Unmarried" />
                <DetailItem icon={Flag} label="Nationality" value="Indian" />
                <DetailItem icon={Target} label="Religion" value="Hindu" />
                <DetailItem icon={Scale} label="Gender" value="Male" />
                <DetailItem icon={Briefcase} label="Driving License" value="Yes" />
              </div>
            </div>

            {/* Salary expectation */}
            <div className="bg-gradient-to-r from-amber-500/10 to-stone-800/60 border border-amber-500/20 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-stone-400 text-xs font-medium">Expected Salary</p>
                <p className="text-amber-400 text-xs mt-0.5">+ Allowances & Bonus</p>
              </div>
              <div className="text-right">
                <p className="text-white font-black text-2xl">₹65,000</p>
                <p className="text-stone-400 text-xs">per month</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ── Contact ────── */}
        <FadeSection id="contact">
          <SectionHeading icon={Mail} title="Let's Connect" subtitle="Reach out for opportunities" />

          <div className="space-y-4">
            {/* Direct contact cards */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:9079875155"
                className="group bg-stone-800/60 border border-stone-700/50 rounded-2xl p-4 hover:border-amber-500/40 transition-all text-center"
              >
                <Phone className="w-6 h-6 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-stone-400 text-xs mb-1">Phone</p>
                <p className="text-white font-bold text-sm">9079875155</p>
              </a>
              <a
                href="mailto:vikashapurwa@gmail.com"
                className="group bg-stone-800/60 border border-stone-700/50 rounded-2xl p-4 hover:border-amber-500/40 transition-all text-center"
              >
                <Mail className="w-6 h-6 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-stone-400 text-xs mb-1">Email</p>
                <p className="text-white font-bold text-xs break-all">vikashapurwa@gmail.com</p>
              </a>
            </div>

            {/* Contact form */}
            <div className="bg-stone-800/60 border border-stone-700/50 rounded-2xl p-5">
              <p className="text-white font-bold text-base mb-4">Send a Message</p>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  required
                  className="w-full bg-stone-900/60 border border-stone-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  required
                  className="w-full bg-stone-900/60 border border-stone-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  required
                  className="w-full bg-stone-900/60 border border-stone-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
                />
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${formSent
                      ? 'bg-green-500 text-white shadow-green-900/30'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-900 shadow-amber-900/30'
                    }`}
                >
                  {formSent ? (
                    <><Check className="w-4 h-4" /> Sent!</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            </div>

            {/* Signature */}
            <div className="flex justify-center pt-2">
              <img
                src={signaturePhoto}
                alt="Signature"
                className="h-14 opacity-60 invert"
              />
            </div>
          </div>
        </FadeSection>
      </div>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="relative z-10 border-t border-stone-800 py-8 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="text-stone-900 font-black text-xs">V</span>
            </div>
            <span className="text-stone-400 text-sm font-medium">Vikash Kumar Apurwa</span>
          </div>
          <p className="text-stone-600 text-xs">&copy; {new Date().getFullYear()} · Sales Professional · Built for Growth</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="mailto:vikashapurwa@gmail.com" className="text-stone-500 hover:text-amber-400 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
            <a href="tel:9079875155" className="text-stone-500 hover:text-amber-400 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;