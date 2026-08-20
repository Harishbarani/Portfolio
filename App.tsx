import { ThemeProvider } from 'next-themes';
import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Mail,
  Linkedin,
  MapPin,
  Layers,
  Target,
  Zap,
  Code,
  Cloud,
  Package,
  Server,
  GitBranch,
  Activity,
  Github,
  Database,
  Download,
  ExternalLink,
  ChevronDown,
  FileText,
  Terminal,
  CheckCircle2,
  Workflow,
  Menu,
  X,
} from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { CursorDots } from './components/CursorDots';
import { ExperienceAccordion } from './components/ExperienceAccordion';
import { CTASection } from './components/CTASection';
import { PrimaryButton } from './components/PrimaryButton';

type IconType = typeof Code;

type Product = {
  name: string;
  impact: string;
  tags: string[];
  link?: string;
  details: { challenge: string; solution: string; outcome: string };
  icon: IconType;
  pipeline?: string[];
};

function Typewriter({ texts, delay = 2800 }: { texts: string[]; delay?: number }) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = texts[textIndex];
    if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(prev => prev.slice(0, -1)), 28);
      } else {
        setIsDeleting(false);
        setTextIndex(prev => (prev + 1) % texts.length);
      }
    } else if (displayText.length < currentText.length) {
      timeout = setTimeout(() => setDisplayText(currentText.slice(0, displayText.length + 1)), 62);
    } else {
      timeout = setTimeout(() => setIsDeleting(true), delay);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, delay]);

  return (
    <span className="inline-flex items-center min-h-[1.5em]">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        className="inline-block w-[2px] h-[1.1em] bg-[var(--neon-blue)] align-middle ml-1"
      />
    </span>
  );
}

function DeployTerminal() {
  const [lines, setLines] = useState<{ text: string; type: 'cmd' | 'out' }[]>([]);
  const [currentCmd, setCurrentCmd] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<'typing' | 'output' | 'pause'>('typing');

  const commands = [
    { cmd: 'git push origin main', out: '✓ Jenkins pipeline triggered' },
    { cmd: 'docker build -t expense-tracker .', out: '✓ Image built successfully' },
    { cmd: 'kubectl apply -f deployment.yaml', out: '✓ Deployment updated' },
    { cmd: 'terraform apply --auto-approve', out: '✓ Infrastructure provisioned' },
  ];

  useEffect(() => {
    const item = commands[currentCmd % commands.length];
    if (phase === 'typing') {
      if (typed.length < item.cmd.length) {
        const t = setTimeout(() => setTyped(item.cmd.slice(0, typed.length + 1)), 40);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('output'), 450);
      return () => clearTimeout(t);
    }
    if (phase === 'output') {
      setLines(prev => [...prev.slice(-5), { text: `$ ${item.cmd}`, type: 'cmd' }, { text: item.out, type: 'out' }]);
      setTyped('');
      const t = setTimeout(() => setPhase('pause'), 120);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCurrentCmd(prev => prev + 1);
      setPhase('typing');
    }, 1350);
    return () => clearTimeout(t);
  }, [typed, phase, currentCmd]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="absolute -bottom-4 left-1/2 z-30 w-[min(420px,92vw)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]/95 shadow-[0_24px_80px_rgba(0,0,0,.45)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-[#161b22] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-[10px] text-white/30">harish@devops ~ deploy</span>
        <Terminal className="ml-auto h-3.5 w-3.5 text-white/25" />
      </div>
      <div className="min-h-[150px] p-4 font-mono text-[10px] leading-relaxed sm:text-[11px]">
        {lines.map((line, i) => (
          <div key={`${line.text}-${i}`} className={line.type === 'cmd' ? 'text-[#7ee787]' : 'text-[#58a6ff]'}>
            {line.text}
          </div>
        ))}
        <div className="flex items-center text-[#7ee787]">
          <span>$ {typed}</span>
          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }} className="ml-0.5 inline-block h-3 w-[5px] bg-[#7ee787]" />
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-white/5 px-4 py-2 text-[9px] uppercase tracking-[.18em] text-white/30">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> deployment workflow simulation
      </div>
    </motion.div>
  );
}

const orbitNodes = [
  { label: 'AWS', x: '7%', y: '20%', icon: Cloud },
  { label: 'Docker', x: '0%', y: '52%', icon: Package },
  { label: 'Kubernetes', x: '9%', y: '79%', icon: Server },
  { label: 'Jenkins', x: '70%', y: '14%', icon: Workflow },
  { label: 'Terraform', x: '83%', y: '46%', icon: Server },
  { label: 'Java', x: '68%', y: '78%', icon: Code },
];

function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
      }}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      className="relative mx-auto h-[620px] w-full max-w-[610px]"
    >
      <div className="absolute inset-[14%] rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-pink)] opacity-[0.10] blur-[80px]" />
      <motion.div
        className="absolute inset-0"
        animate={{ x: mouse.x * 8, y: mouse.y * 8 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 600 620" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="orbitGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--neon-blue)" stopOpacity=".05" />
              <stop offset=".5" stopColor="var(--neon-blue)" stopOpacity=".38" />
              <stop offset="1" stopColor="var(--neon-pink)" stopOpacity=".18" />
            </linearGradient>
          </defs>
          <ellipse cx="300" cy="310" rx="220" ry="250" stroke="url(#orbitGradient)" strokeDasharray="3 9" />
          <ellipse cx="300" cy="310" rx="185" ry="215" stroke="url(#orbitGradient)" strokeOpacity=".28" />
          <path d="M95 122 C170 190 170 220 205 255" stroke="url(#orbitGradient)" />
          <path d="M105 322 C165 325 180 330 210 342" stroke="url(#orbitGradient)" />
          <path d="M120 486 C175 450 190 430 220 408" stroke="url(#orbitGradient)" />
          <path d="M465 98 C410 165 405 195 385 225" stroke="url(#orbitGradient)" />
          <path d="M505 290 C450 295 425 305 395 315" stroke="url(#orbitGradient)" />
          <path d="M470 480 C420 450 410 430 380 410" stroke="url(#orbitGradient)" />
        </svg>

        {orbitNodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, y: [0, index % 2 ? -5 : 5, 0] }}
              transition={{
                opacity: { delay: 0.65 + index * 0.08, duration: 0.4 },
                scale: { delay: 0.65 + index * 0.08, type: 'spring', stiffness: 220, damping: 18 },
                y: { delay: 1 + index * 0.1, duration: 4 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
            >
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-background/75 px-3 py-2 shadow-lg backdrop-blur-xl dark:bg-[#101016]/75">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-pink)] text-white">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="whitespace-nowrap text-[11px] font-semibold">{node.label}</span>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
          transition={{ opacity: { duration: 0.8, delay: 0.25 }, y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.8, delay: 0.25 } }}
          className="absolute left-1/2 top-[42%] z-10 h-[500px] w-[370px] -translate-x-1/2 -translate-y-1/2 sm:h-[575px] sm:w-[425px]"
        >
          <div className="absolute inset-x-10 top-8 h-[70%] rounded-full bg-gradient-to-b from-[var(--neon-blue)]/10 via-transparent to-[var(--neon-pink)]/10 blur-2xl" />
          <img
            src="/animated-harish.png"
            alt="Harish B — Junior DevOps Engineer"
            className="relative h-full w-full object-contain object-bottom drop-shadow-[0_30px_45px_rgba(0,0,0,.28)]"
          />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-72 -translate-x-1/2 rounded-full bg-black/20 blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.05, type: 'spring', stiffness: 220, damping: 22 }}
          className="absolute right-[2%] top-[7%] z-40 max-w-[230px] rounded-2xl border border-white/10 bg-background/80 px-4 py-3 shadow-xl backdrop-blur-xl dark:bg-[#101016]/80"
        >
          <p className="text-[12px] font-medium leading-relaxed">
            Hi, I'm <span className="font-semibold text-[var(--neon-blue)]">Harish</span>.<br />
            <Typewriter texts={['I automate delivery.', 'I build cloud infrastructure.', 'I ship Java services.']} />
          </p>
        </motion.div>

        <DeployTerminal />
      </motion.div>
    </div>
  );
}

function ResumeDropdown({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${mobile ? 'w-full' : 'inline-block'}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={mobile
          ? 'mt-1 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-semibold text-[var(--neon-blue)] hover:bg-foreground/5'
          : 'inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-6 py-3.5 text-sm font-semibold transition hover:border-[var(--neon-blue)]/40 hover:bg-foreground/10'}
      >
        <Download className="h-4 w-4" />
        View Resume
        <ChevronDown className={`ml-0.5 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-[120] mt-2 w-64 overflow-hidden rounded-2xl border border-foreground/10 bg-background/95 p-1.5 shadow-2xl backdrop-blur-xl ${mobile ? 'left-0 right-0 w-full' : 'left-0'}`}
        >
          <a
            href="/Harish_B_DevOps_CV.pdf"
            target="_blank"
            rel="noreferrer"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition hover:bg-foreground/5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-pink)] text-white">
              <FileText className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-semibold">DevOps Engineer Resume</span>
              <span className="text-[11px] text-muted-foreground">Cloud & Infrastructure</span>
            </span>
          </a>

          <a
            href="/Harish_B_Software_Engineer_CV.pdf"
            target="_blank"
            rel="noreferrer"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition hover:bg-foreground/5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-pink)] text-white">
              <FileText className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-semibold">Software Engineer Resume</span>
              <span className="text-[11px] text-muted-foreground">Java Full-Stack</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}

function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Projects', href: '#work' },
    { name: 'Skills', href: '#expertise' },
    { name: 'Experience', href: '#experience' },
    { name: 'Workflow', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
        scrolled ? 'border-b border-foreground/10 bg-background/80 py-3 shadow-sm backdrop-blur-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <button onClick={() => scrollTo('#hero')} className="font-semibold tracking-tight text-lg">Harish<span className="text-[var(--neon-blue)]">.</span></button>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(link => (
            <button key={link.name} onClick={() => scrollTo(link.href)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <PrimaryButton onClick={() => scrollTo('#contact')} className="hidden !px-5 !py-2.5 md:flex">Let's Talk</PrimaryButton>
          <button aria-label="Open navigation" onClick={() => setMobileOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-full border border-foreground/10 bg-foreground/5 md:hidden">
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mx-4 mt-3 rounded-2xl border border-foreground/10 bg-background/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
          {links.map(link => (
            <button key={link.name} onClick={() => scrollTo(link.href)} className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
              {link.name}
            </button>
          ))}
          <ResumeDropdown mobile />
        </motion.div>
      )}
    </motion.nav>
  );
}

function PortfolioContent() {
  const heroPills = ['CI/CD Automation', 'Cloud Infrastructure', 'Java Backend'];

  const skillCategories = [
    { category: 'DevOps & Cloud', icon: Cloud, context: 'Hands-on + projects', skills: ['AWS EC2', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'GitHub'] },
    { category: 'Infrastructure & Automation', icon: Server, context: 'Project-driven', skills: ['OpenTofu', 'Vagrant', 'Ansible', 'cloud-init', 'Linux', 'Bash'] },
    { category: 'Java & Backend', icon: Code, context: 'Hands-on', skills: ['Java', 'Spring Boot', 'REST APIs', 'SQL', 'OOP', 'Collections'] },
    { category: 'CI/CD & Monitoring', icon: Zap, context: 'Applied in deployments', skills: ['Jenkins Pipelines', 'Build Automation', 'CloudWatch', 'Grafana'] },
    { category: 'Frontend', icon: Layers, context: 'Project experience', skills: ['JavaScript', 'HTML5', 'CSS3', 'MERN Stack'] },
    { category: 'Databases', icon: Database, context: 'Project experience', skills: ['MySQL', 'MongoDB', 'H2 Database'] },
  ];

  const processSteps = [
    { id: '01', title: 'Plan', desc: 'Understand the requirement, map the architecture, and identify infrastructure and delivery needs.' },
    { id: '02', title: 'Build', desc: 'Develop Java services and infrastructure configuration with Git-based, repeatable workflows.' },
    { id: '03', title: 'Ship', desc: 'Containerize with Docker, automate builds with Jenkins, and deploy using Kubernetes manifests.' },
    { id: '04', title: 'Operate', desc: 'Monitor system health, troubleshoot Linux environments, and improve reliability through automation.' },
  ];

  const experiences = [{
    title: 'DevOps Intern',
    company: 'Allianz Technology',
    duration: 'Jan 2025 – Aug 2025',
    summary: 'Completed a structured 8-month technical training program spanning Java development, Generative AI fundamentals, and core DevOps tooling across the software delivery lifecycle.',
    bullets: [
      'Completed an 8-month structured training program covering Java development, Generative AI fundamentals, and core DevOps tooling.',
      'Gained hands-on proficiency in Git/GitHub workflows including branching, merge conflict resolution, and collaborative code review.',
      'Administered Linux environments and provisioned AWS EC2 instances.',
      'Self-taught Docker, Jenkins, and Kubernetes outside the formal curriculum to complete a mentor-assigned sprint within deadline.',
      'Containerized a Java Spring Boot application using Docker and designed a Jenkins CI/CD pipeline for automated build and deployment.',
      'Created Kubernetes Deployment and Service manifests for application deployment.',
      'Documented complete deployment procedures with implementation notes and screenshots.',
    ],
  }];

  const products: Product[] = [
    {
      name: 'Expense Tracker — Full-Stack + DevOps Pipeline',
      impact: 'Spring Boot application taken from code to containerized deployment workflow.',
      tags: ['Spring Boot', 'Docker', 'Jenkins', 'Kubernetes'],
      link: 'https://github.com/Harishbarani/Expense-Tracker',
      pipeline: ['Git', 'Jenkins', 'Docker', 'Kubernetes'],
      details: {
        challenge: 'Build a full-stack expense management app and deliver it through an automated DevOps workflow.',
        solution: 'Spring Boot REST API backend with a JavaScript frontend, Docker containerization, Jenkins CI/CD, and Kubernetes manifests.',
        outcome: 'Demonstrated full SDLC ownership from REST API design to automated build, test, and deployment workflow.',
      },
      icon: Code,
    },
    {
      name: 'Infrastructure Automation & Virtualization',
      impact: '3-node local infrastructure provisioned end-to-end with IaC.',
      tags: ['OpenTofu', 'Vagrant', 'VirtualBox', 'cloud-init'],
      link: 'https://github.com/Harishbarani/Infrastructure-Automation-Virtualization-Project',
      pipeline: ['OpenTofu', 'Vagrant', 'cloud-init', 'Nginx'],
      details: {
        challenge: 'Simulate a production-like multi-VM environment locally to practice repeatable infrastructure provisioning.',
        solution: 'Automated a 3-node Ubuntu setup using OpenTofu, Vagrant, VirtualBox and cloud-init with Nginx provisioning.',
        outcome: 'Eliminated manual server setup across nodes and resolved the OpenTofu–Vagrant integration gap.',
      },
      icon: Server,
    },
    {
      name: 'Progressive Web App — Library Management',
      impact: 'Offline-capable MERN Stack application.',
      tags: ['MERN Stack', 'PWA', 'MongoDB'],
      link: 'https://github.com/Harishbarani/Progressive-Web-App-MERN-Stack',
      details: {
        challenge: 'Build an accessible, offline-capable library management system for books, users, and lending records.',
        solution: 'MERN Stack PWA with MongoDB schemas and offline support through PWA capabilities.',
        outcome: 'Delivered a functional library management PWA across the development lifecycle.',
      },
      icon: Layers,
    },
    {
      name: 'Intelligent Security Camera System',
      impact: '2nd Prize — College Project Expo 2023.',
      tags: ['Python', 'YOLO', 'AI/ML', 'Computer Vision'],
      details: {
        challenge: 'Build a real-time AI surveillance system capable of automated threat detection.',
        solution: 'Python-based modular application using YOLO for object detection with custom dataset preparation.',
        outcome: 'Improved detection accuracy and response time through iterative testing and tuning; secured 2nd Prize.',
      },
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <TopNav />
      <CursorDots />

      <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-10 pt-28 sm:px-8 lg:pt-24">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_45%,rgba(96,165,250,.08),transparent_30%),radial-gradient(circle_at_90%_75%,rgba(244,114,182,.06),transparent_25%)]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }} className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] text-muted-foreground">
              <span className="h-px w-8 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-pink)]" /> Junior DevOps Engineer
            </div>
            <h1 className="max-w-3xl text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.94] tracking-[-.055em]">
              I build systems that{' '}
              <span className="bg-gradient-to-r from-[var(--neon-blue)] via-[#7c9cff] to-[var(--neon-pink)] bg-clip-text text-transparent">ship, scale,</span>{' '}
              and stay up.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              DevOps engineer with an 8-month internship at Allianz Technology and hands-on project work across CI/CD, Linux, AWS EC2, Docker, Kubernetes, Jenkins, Terraform and Java backend development.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-foreground/80">
              {heroPills.map((pill, i) => (
                <motion.span key={pill} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 + i * .08 }} className="flex items-center gap-3">
                  {pill}{i < heroPills.length - 1 && <span className="h-1 w-1 rounded-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-pink)]" />}
                </motion.span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} icon={<ArrowRight className="h-4 w-4" />}>Let's Talk</PrimaryButton>
              <ResumeDropdown />
              <a href="https://github.com/Harishbarani" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
              <ProofStat value="8 months" label="Allianz Technology" />
              <ProofStat value="5+" label="Projects built" />
              <ProofStat value="8.02" label="B.Tech CGPA" />
            </div>
          </motion.div>

          <HeroVisual />
        </div>
      </section>

      <Section id="work" title="Projects" subtitle="Evidence, not just badges" layout="grid">
        <div className="grid gap-5 lg:grid-cols-2">
          {products.map((product, i) => <ProductCard key={product.name} product={product} delay={i * .08} featured={i < 2} />)}
        </div>
      </Section>

      <Section id="expertise" title="Skills" subtitle="Technical expertise with context" layout="grid">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((cat, i) => <SkillCategory key={cat.category} category={cat} delay={i * .06} />)}
        </div>
      </Section>

      <Section id="experience" title="Experience" subtitle="Professional experience" layout="grid">
        <div className="space-y-7">
          <div className="grid gap-3 md:grid-cols-3">
            <Highlight icon={Workflow} title="CI/CD" text="Jenkins pipeline for a Spring Boot deployment." />
            <Highlight icon={Package} title="Containers" text="Docker + Kubernetes Deployment and Service manifests." />
            <Highlight icon={Cloud} title="Cloud" text="Linux administration and AWS EC2 exposure." />
          </div>
          <ExperienceAccordion experiences={experiences} />
        </div>
      </Section>

      <Section id="process" title="Workflow" subtitle="From commit to operation" layout="stack">
        <div className="relative grid max-w-6xl gap-7 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent lg:block" />
          {processSteps.map((step, i) => <ProcessStep key={step.id} step={step} index={i} delay={i * .08} />)}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/[.02] px-5 py-4 text-xs font-semibold text-muted-foreground">
          {['Git', 'Jenkins', 'Docker', 'Kubernetes', 'AWS', 'CloudWatch / Grafana'].map((item, i) => (
            <span key={item} className="flex items-center gap-2">{item}{i < 5 && <ArrowRight className="h-3 w-3 text-[var(--neon-blue)]" />}</span>
          ))}
        </div>
      </Section>

      <CTASection />

      <Section id="contact" title="Contact" subtitle="Let's talk about the next system" layout="stack">
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard icon={<Mail className="h-6 w-6" />} label="Email" value="harishbarani1014@gmail.com" description="Opportunities and collaboration" href="mailto:harishbarani1014@gmail.com" valueClassName="text-xs sm:text-sm" />
          <ContactCard icon={<Linkedin className="h-6 w-6" />} label="LinkedIn" value="harishbarani1014" description="Connect professionally" href="https://www.linkedin.com/in/harishbarani1014" />
          <ContactCard icon={<Github className="h-6 w-6" />} label="GitHub" value="Harishbarani" description="Projects and source code" href="https://github.com/Harishbarani" />
          <ContactCard icon={<MapPin className="h-6 w-6" />} label="Location" value="India • Remote" description="Open to opportunities" />
        </div>
      </Section>

      <footer className="relative overflow-hidden border-t border-foreground/5 py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--neon-blue)]/5 to-transparent" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
          <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="mb-7 grid h-16 w-16 place-items-center rounded-2xl border border-foreground/10 bg-foreground/[.02] font-mono text-xl font-bold transition hover:border-[var(--neon-blue)]/40">
            <span className="bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-pink)] bg-clip-text text-transparent">&lt;H/&gt;</span>
          </button>
          <div className="font-medium">Harish B</div>
          <div className="mt-1 text-sm text-muted-foreground">Junior DevOps Engineer · Java Backend Developer</div>
          <div className="mt-7 flex gap-3">
            <a href="https://www.linkedin.com/in/harishbarani1014" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-foreground/10 bg-foreground/[.03] text-muted-foreground transition hover:border-[var(--neon-blue)]/50 hover:text-[var(--neon-blue)]"><Linkedin className="h-5 w-5" /></a>
            <a href="https://github.com/Harishbarani" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border border-foreground/10 bg-foreground/[.03] text-muted-foreground transition hover:border-[var(--neon-blue)]/50 hover:text-[var(--neon-blue)]"><Github className="h-5 w-5" /></a>
          </div>
          <div className="mt-10 text-[10px] uppercase tracking-[.2em] text-muted-foreground/50">© {new Date().getFullYear()} Harish B</div>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, subtitle, children, id, layout = 'stack' }: { title: string; subtitle?: string; children: React.ReactNode; id?: string; layout?: 'stack' | 'grid' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: .12 });
  return (
    <section id={id} ref={ref} className="scroll-m-20 border-t border-foreground/5 px-5 py-24 sm:px-8 lg:py-32">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .6 }} className={`mx-auto max-w-[1400px] ${layout === 'grid' ? 'grid gap-10 lg:grid-cols-12 lg:gap-20' : ''}`}>
        <div className={layout === 'grid' ? 'h-fit lg:col-span-4 lg:sticky lg:top-28' : 'mb-12 max-w-3xl'}>
          <div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-pink)]" /><span className="text-xs font-semibold uppercase tracking-[.2em] text-muted-foreground">{title}</span></div>
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">{subtitle}</h2>
        </div>
        <div className={layout === 'grid' ? 'lg:col-span-8' : ''}>{children}</div>
      </motion.div>
    </section>
  );
}

function ProofStat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-foreground/10 bg-foreground/[.025] p-4"><div className="text-lg font-semibold sm:text-xl">{value}</div><div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">{label}</div></div>;
}

function Highlight({ icon: Icon, title, text }: { icon: IconType; title: string; text: string }) {
  return <div className="rounded-2xl border border-foreground/10 bg-foreground/[.02] p-5"><div className="mb-3 flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-pink)] text-white"><Icon className="h-4 w-4" /></span><span className="font-semibold">{title}</span></div><p className="text-sm leading-relaxed text-muted-foreground">{text}</p></div>;
}

function ProductCard({ product, delay, featured }: { product: Product; delay: number; featured?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: .15 });
  const Icon = product.icon;
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .55, delay }} className={`group overflow-hidden rounded-3xl border border-foreground/10 bg-white/60 shadow-sm backdrop-blur-md transition-all duration-300 dark:bg-white/[.025] ${featured ? 'min-h-[350px]' : ''} hover:border-[var(--neon-blue)]/35 hover:shadow-[0_20px_55px_-18px_var(--neon-blue-glow)]`}>
      <button onClick={() => setExpanded(v => !v)} className="w-full text-left">
        <div className="p-6 sm:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-pink)] text-white"><Icon className="h-5 w-5" /></div>
            <motion.span animate={{ rotate: expanded ? 45 : 0 }} className="grid h-8 w-8 place-items-center rounded-full border border-foreground/10 text-muted-foreground"><span className="text-lg leading-none">+</span></motion.span>
          </div>
          <h3 className="max-w-xl text-lg font-semibold tracking-tight sm:text-xl">{product.name}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{product.impact}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">{product.tags.map(tag => <span key={tag} className="rounded-full border border-foreground/10 bg-foreground/[.04] px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">{tag}</span>)}</div>
        </div>
      </button>

      {product.pipeline && (
        <div className="mx-6 mb-6 overflow-x-auto rounded-2xl border border-foreground/10 bg-[#0d1117] p-4 sm:mx-7">
          <div className="mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-white/35"><Workflow className="h-3 w-3" /> Delivery path</div>
          <div className="flex min-w-max items-center gap-2">{product.pipeline.map((step, i) => <span key={step} className="flex items-center gap-2"><span className="rounded-lg border border-white/10 bg-white/[.04] px-2.5 py-1.5 font-mono text-[10px] text-white/75">{step}</span>{i < product.pipeline!.length - 1 && <ArrowRight className="h-3 w-3 text-[var(--neon-blue)]" />}</span>)}</div>
        </div>
      )}

      <motion.div initial={false} animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }} className="overflow-hidden">
        <div className="space-y-4 border-t border-foreground/10 px-6 pb-7 pt-5 sm:px-7">
          <Detail label="Challenge" text={product.details.challenge} />
          <Detail label="Solution" text={product.details.solution} />
          <Detail label="Outcome" text={product.details.outcome} strong />
          {product.link && <a href={product.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--neon-blue)] hover:underline">View on GitHub <ExternalLink className="h-3 w-3" /></a>}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Detail({ label, text, strong }: { label: string; text: string; strong?: boolean }) {
  return <div><div className="mb-1.5 text-[9px] font-bold uppercase tracking-[.18em] text-muted-foreground">{label}</div><p className={`text-xs leading-relaxed ${strong ? 'font-semibold text-foreground' : 'text-foreground/70'}`}>{text}</p></div>;
}

function SkillCategory({ category, delay }: { category: { category: string; icon: IconType; context: string; skills: string[] }; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = category.icon;
  return <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .4, delay }} whileHover={{ y: -3 }} className="rounded-2xl border border-foreground/10 bg-white/60 p-5 backdrop-blur-md transition-all dark:bg-white/[.02] hover:border-[var(--neon-blue)]/35 hover:shadow-[0_18px_40px_-18px_var(--neon-blue-glow)]">
    <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-pink)] text-white"><Icon className="h-4 w-4" /></span><span className="text-sm font-semibold">{category.category}</span></div><span className="text-[9px] uppercase tracking-wider text-muted-foreground">{category.context}</span></div>
    <div className="mt-4 flex flex-wrap gap-1.5">{category.skills.map(skill => <span key={skill} className="rounded-full border border-foreground/10 bg-foreground/[.04] px-2 py-1 text-[10px] font-medium text-muted-foreground">{skill}</span>)}</div>
  </motion.div>;
}

function ProcessStep({ step, index, delay }: { step: { id: string; title: string; desc: string }; index: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .5, delay }} className="relative text-center lg:text-left">
    <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-foreground/10 bg-background text-lg font-bold shadow-sm lg:mx-0"><span className="bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-pink)] bg-clip-text text-transparent">{step.id}</span></div>
    <h3 className="text-lg font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
  </motion.div>;
}

function ContactCard({ icon, label, value, description, href, valueClassName }: { icon: React.ReactNode; label: string; value: string; description: string; href?: string; valueClassName?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const content = <><div className="mb-7 grid h-11 w-11 place-items-center rounded-xl bg-foreground/5 text-foreground transition group-hover:scale-105 group-hover:text-[var(--neon-blue)]">{icon}</div><div className="mb-1 text-[9px] font-bold uppercase tracking-[.18em] text-muted-foreground">{label}</div><div className={`mb-2 break-all font-semibold tracking-tight ${valueClassName || 'text-base sm:text-lg'}`}>{value}</div><div className="text-xs font-medium text-muted-foreground">{description}</div></>;
  return <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} whileHover={{ y: -4 }} transition={{ duration: .45 }} className="group rounded-2xl border border-foreground/10 bg-white/60 p-6 backdrop-blur-md dark:bg-white/[.02] hover:border-[var(--neon-blue)]/30">{href ? <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}>{content}</a> : content}</motion.div>;
}

export default function App() {
  return <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}><PortfolioContent /></ThemeProvider>;
}
