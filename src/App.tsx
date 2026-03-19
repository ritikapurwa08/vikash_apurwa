import React, { useState } from 'react';
import { Mail, Phone, Briefcase, GraduationCap, Award, Globe2, BookOpen, Signature, CalendarDays, Heart, Flag, Scale, Target, Send, ChevronRight, UserCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import profilePhoto from './assets/photo.png'; // Update path as needed
import signaturePhoto from './assets/sign.png'; // Update path as needed

// Theme Configuration
const theme = {
  primary: 'bg-white',
  primaryText: 'text-gray-900',
  secondary: 'bg-zinc-50',
  accent: 'text-blue-700', // Professional, growth-oriented corporate color
  accentBg: 'bg-blue-700',
  border: 'border-zinc-200',
  mutedText: 'text-gray-600',
};

// --- Sub-Components ---

const NavItem = ({ section, activeSection }: { section: string, activeSection: string }) => (
  <a
    href={`#${section}`}
    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${activeSection === section
      ? `${theme.accentBg} text-white shadow-sm`
      : `${theme.mutedText} hover:text-gray-900 hover:${theme.secondary}`
      }`}
  >
    {section}
  </a>
);

const Section = ({ id, children, className }: { id: string, children: React.ReactNode, className: string }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section
      ref={ref}
      id={id}
      className={`${theme.primary} transition-opacity duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${className}`}
    >
      {children}
    </section>
  );
};

const ExperienceCard = ({ role, company, responsibilities }: { role: string, company: string, responsibilities: string[] }) => (
  <div className={`p-6 border ${theme.border} rounded-3xl ${theme.secondary} flex flex-col gap-4 shadow-inner`}>
    <div>
      <h4 className="text-xl font-semibold">{role}</h4>
      <p className={`text-sm ${theme.accent} font-medium`}>{company}</p>
    </div>
    <ul className="space-y-2 list-disc list-inside">
      {responsibilities.map((resp: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
        <li key={index} className={`text-base ${theme.mutedText}`}>{resp}</li>
      ))}
    </ul>
  </div>
);

const EducationCard = ({ institution, degree, year }: { institution: string, degree: string, year: string }) => (
  <div className={`p-5 border ${theme.border} rounded-2xl flex flex-col gap-1.5`}>
    <h4 className="text-lg font-semibold">{degree}</h4>
    <p className={`text-base ${theme.mutedText}`}>{institution}</p>
    <p className={`text-sm ${theme.mutedText} font-mono bg-zinc-100 self-start px-2 py-0.5 rounded`}>{year}</p>
  </div>
);

const DetailItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start gap-3.5 border-b border-zinc-100 pb-3 last:border-none last:pb-0">
    <div className={`${theme.secondary} p-2.5 rounded-full border ${theme.border}`}>
      <Icon className={`w-5 h-5 ${theme.accent}`} />
    </div>
    <div>
      <p className={`text-sm ${theme.mutedText}`}>{label}</p>
      <p className="text-base font-medium">{value}</p>
    </div>
  </div>
);

// --- Data ---

const experienceData = [
  {
    company: "Aakash Universal Limited (Aakash Italian Marble)",
    role: "Supervisor",
    responsibilities: ["Supervised daily operations and workflow", "Managed team coordination and productivity", "Ensured smooth business operations"]
  },
  {
    company: "Jai Shree Balaji, Kishangarh",
    role: "Sales Executive",
    responsibilities: ["Handled customer interactions and sales", "Worked in a team-driven environment", "Built positive customer relationships"]
  },
  {
    company: "EBT Marmo, Agra",
    role: "Senior Sales Executive",
    responsibilities: ["Managed high-level sales and client handling", "Built strong customer relationships", "Contributed significantly to business growth"]
  },
  {
    company: "Millennium Marble, Silvassa",
    role: "Sales Executive / Senior Sales Role",
    responsibilities: ["Managed customer dealing and product sales", "Handled client requirements professionally", "Strengthened sales performance through experience"]
  }
];

const educationData = [
  { institution: "SK College, Sikar", degree: "B.A", year: "2011" },
  { institution: "Govt. Higher Secondary School, Danta", degree: "12th", year: "2008" },
  { institution: "Govt. Senior Secondary School, Danta", degree: "10th", year: "2006" }
];

const skills = ["Sales & Negotiation", "Team Building & Coordination", "Customer Relationship Management", "Innovative Thinking", "Hard Work & Dedication"];
const languages = ["Hindi", "English", "Nagamis"];
const interests = ["Farming Activities", "Watching Sports", "Cricket", "Dancing", "Reading Books"];

const sections = ['home', 'about', 'experience', 'education', 'skills', 'contact'];

// --- Main App Component ---

function App() {
  const [activeSection,] = useState('home');

  return (
    <div className={`min-h-screen ${theme.primary} ${theme.primaryText} antialiased font-sans`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${theme.primary}/90 backdrop-blur-md border-b ${theme.border}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserCircle className={`w-7 h-7 ${theme.accent}`} />
            <h1 className="text-xl font-bold tracking-tight">Vikash Kumar Apurwa</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 p-1 border ${theme.border} rounded-full ${theme.secondary}">
            {sections.map(section => (
              <NavItem key={section} section={section} activeSection={activeSection} />
            ))}
          </div>
          <a href="#contact" className={`${theme.accentBg} text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-800 transition shadow-sm`}>
            Request CV
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <Section id="home" className="pt-36 pb-24 border-b ${theme.border}">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center ${theme.secondary} ${theme.accent} px-3 py-1 rounded-full text-sm font-medium border ${theme.border}`}>
                <Briefcase className="w-4 h-4 mr-1.5" /> Ready for Leadership
              </span>
              <span className={`text-base ${theme.mutedText}`}>Based in India</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-tight max-w-4xl">
              Hi, I'm <span className={theme.accent}>Vikash Kumar Apurwa</span>
            </h2>
            <p className={`text-2xl ${theme.mutedText} max-w-3xl leading-relaxed`}>
              Experienced Sales Professional with strong expertise in customer handling, team coordination, and business development in the marble industry. Aspiring Sales Manager.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#experience" className={`${theme.accentBg} text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2 shadow-lg`}>
                View Experience <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#contact" className={`${theme.secondary} ${theme.primaryText} px-8 py-3.5 rounded-full text-lg font-semibold border ${theme.border} hover:${theme.primary} transition`}>
                Contact Me
              </a>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col items-center gap-6 p-6 border ${theme.border} rounded-[3rem] ${theme.secondary} shadow-xl">
            <img src={profilePhoto} alt="Vikash Kumar Apurwa" className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-2xl" />
            <div className="text-center">
              <p className="text-lg font-medium">Vikash Kumar Apurwa</p>
              <p className={`text-sm ${theme.accent}`}>Sales Professional / Supervisor</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Main Column */}
        <div className="lg:col-span-2 space-y-16">
          {/* About Section */}
          <Section id="about" className="space-y-10">
            <div className="flex items-center gap-3">
              <div className={`${theme.secondary} p-3 rounded-2xl border ${theme.border}`}>
                <UserCircle className={`w-8 h-8 ${theme.accent}`} />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight">About Me</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className={`text-lg ${theme.mutedText} leading-relaxed col-span-2`}>
                I am a dedicated and result-oriented sales professional with strong experience in the marble industry. I have worked across multiple organizations where I managed customer relationships, handled sales operations, and supported team coordination. I believe in hard work, discipline, and continuous growth, and I am now looking forward to opportunities in leadership and managerial roles.
              </p>
              <div className={`p-6 border ${theme.border} rounded-3xl ${theme.secondary} space-y-4 shadow-inner`}>
                <h4 className="text-xl font-semibold flex items-center gap-2"><Target className={`w-6 h-6 ${theme.accent}`} /> Core Strengths</h4>
                <ul className="space-y-2.5 text-base list-disc list-inside ${theme.mutedText}">
                  <li>Strong communication & negotiation skills</li>
                  <li>Team coordination & leadership ability</li>
                  <li>Customer relationship management</li>
                  <li>Business growth mindset</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* Experience Section */}
          <Section id="experience" className="space-y-10">
            <div className="flex items-center gap-3">
              <div className={`${theme.secondary} p-3 rounded-2xl border ${theme.border}`}>
                <Briefcase className={`w-8 h-8 ${theme.accent}`} />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight">Professional Experience</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experienceData.map((exp, index) => (
                <ExperienceCard key={index} {...exp} />
              ))}
            </div>
          </Section>

          {/* Education Section */}
          <Section id="education" className="space-y-10">
            <div className="flex items-center gap-3">
              <div className={`${theme.secondary} p-3 rounded-2xl border ${theme.border}`}>
                <GraduationCap className={`w-8 h-8 ${theme.accent}`} />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight">Education</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationData.map((edu, index) => (
                <EducationCard key={index} {...edu} />
              ))}
            </div>
          </Section>

          {/* Contact Section */}
          <Section id="contact" className={`p-10 border ${theme.border} rounded-[2rem] ${theme.secondary} space-y-10 shadow-lg`}>
            <div className="flex items-center gap-3">
              <div className={`${theme.primary} p-3 rounded-2xl border ${theme.border}`}>
                <Mail className={`w-8 h-8 ${theme.accent}`} />
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight">Let's Connect</h3>
            </div>
            <p className={`text-lg ${theme.mutedText} max-w-xl`}>
              Interested in my experience or discussing potential leadership opportunities? Feel free to reach out via the form or direct contact methods.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <form className="space-y-5">
                <input type="text" placeholder="Your Name" className={`w-full p-4 border ${theme.border} rounded-xl focus:ring-2 focus:ring-blue-200 outline-none`} />
                <input type="email" placeholder="Your Email" className={`w-full p-4 border ${theme.border} rounded-xl focus:ring-2 focus:ring-blue-200 outline-none`} />
                <textarea placeholder="Your Message" rows={5} className={`w-full p-4 border ${theme.border} rounded-xl focus:ring-2 focus:ring-blue-200 outline-none`}></textarea>
                <button type="submit" className={`${theme.accentBg} text-white w-full py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2`}>
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
              <div className="space-y-6">
                <a href="tel:9079875155" className={`flex items-center gap-4 p-5 border ${theme.border} rounded-xl ${theme.primary} hover:shadow-md transition`}>
                  <Phone className={`w-10 h-10 p-2.5 rounded-full ${theme.secondary} border ${theme.border} ${theme.accent}`} />
                  <div>
                    <p className={`text-sm ${theme.mutedText}`}>Phone</p>
                    <p className="text-lg font-semibold">9079875155</p>
                  </div>
                </a>
                <a href="mailto:vikashapurwa@gmail.com" className={`flex items-center gap-4 p-5 border ${theme.border} rounded-xl ${theme.primary} hover:shadow-md transition`}>
                  <Mail className={`w-10 h-10 p-2.5 rounded-full ${theme.secondary} border ${theme.border} ${theme.accent}`} />
                  <div>
                    <p className={`text-sm ${theme.mutedText}`}>Email</p>
                    <p className="text-lg font-semibold">vikashapurwa@gmail.com</p>
                  </div>
                </a>
                <img src={signaturePhoto} alt="Vikash Kumar Apurwa Signature" className="w-48 mt-8 border ${theme.border} rounded-lg p-2 ${theme.primary}" />
              </div>
            </div>
          </Section>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-12 lg:sticky lg:top-32 lg:self-start">

          {/* Skills */}
          <Section id="skills" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <Award className={`w-7 h-7 ${theme.accent}`} />
              <h4 className="text-2xl font-bold tracking-tight">Key Skills</h4>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map(skill => (
                <span key={skill} className={`text-base font-medium px-4 py-1.5 rounded-full border ${theme.border} ${theme.secondary} ${theme.primaryText}`}>
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          {/* Languages & Interests */}
          <div className="grid grid-cols-2 gap-6">
            <Section id="languages" className="space-y-6 p-6 border ${theme.border} rounded-2xl">
              <div className="flex items-center gap-2">
                <Globe2 className={`w-6 h-6 ${theme.accent}`} />
                <h4 className="text-xl font-bold tracking-tight">Languages</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map(lang => (
                  <span key={lang} className={`text-sm font-medium px-3 py-1 rounded-full border ${theme.border} bg-zinc-100 ${theme.primaryText}`}>
                    {lang}
                  </span>
                ))}
              </div>
            </Section>
            <Section id="interests" className="space-y-6 p-6 border ${theme.border} rounded-2xl">
              <div className="flex items-center gap-2">
                <BookOpen className={`w-6 h-6 ${theme.accent}`} />
                <h4 className="text-xl font-bold tracking-tight">Interests</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <span key={interest} className={`text-sm font-medium px-3 py-1 rounded-full border ${theme.border} bg-zinc-100 ${theme.primaryText}`}>
                    {interest}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          {/* Additional Details */}
          <Section id="personal-details" className="space-y-8 p-8 border ${theme.border} rounded-3xl ${theme.secondary}">
            <div className="flex items-center gap-2.5 border-b border-zinc-200 pb-5">
              <Signature className={`w-7 h-7 ${theme.accent}`} />
              <h4 className="text-2xl font-bold tracking-tight">Personal Profile</h4>
            </div>
            <div className="space-y-4">
              <DetailItem icon={CalendarDays} label="Date of Birth" value="02 March 1993" />
              <DetailItem icon={Heart} label="Marital Status" value="Unmarried" />
              <DetailItem icon={Flag} label="Nationality" value="Indian" />
              <DetailItem icon={Target} label="Religion" value="Hindu" />
              <DetailItem icon={Scale} label="Gender" value="Male" />
              <DetailItem icon={Briefcase} label="Driving License" value="Yes" />
            </div>
          </Section>

          {/* Expected Salary */}
          <div className={`p-6 border ${theme.border} rounded-2xl flex items-center justify-between shadow-inner ${theme.secondary}`}>
            <div className="flex items-center gap-2">

              <h4 className="text-lg font-semibold">Expected Salary</h4>
            </div>
            <p className="text-xl font-bold">₹65,000 + <span className="text-sm font-normal ${theme.mutedText}">(Allowances + Bonus)</span></p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-16 py-10 border-t ${theme.border} ${theme.secondary}`}>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <p className={`text-sm ${theme.mutedText}`}>&copy; {new Date().getFullYear()} Vikash Kumar Apurwa. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6">
            <a href="mailto:vikashapurwa@gmail.com" className={`${theme.mutedText} hover:text-gray-900 transition`}><Mail className="w-5 h-5" /></a>
            <a href="tel:9079875155" className={`${theme.mutedText} hover:text-gray-900 transition`}><Phone className="w-5 h-5" /></a>
            {/* Add LinkedIn URL here if available */}
            {/* <a href="#" className={`${theme.mutedText} hover:text-gray-900 transition`}><Linkedin className="w-5 h-5"/></a> */}
          </div>
          <p className={`text-xs ${theme.mutedText}`}>Designed for Professional Growth | Powered by Vite & Tailwind</p>
          <img src={signaturePhoto} alt="Vikash Kumar Apurwa Signature" className="w-28 mx-auto mt-4" />
        </div>
      </footer>
    </div>
  );
}

export default App;