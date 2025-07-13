import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Linkedin, Github, User, Code, Palette, Globe, Mail, Phone, MapPin, ExternalLink, Calendar, Award, Briefcase, GraduationCap } from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // EmailJS state
  type ResultType = { success: boolean; message: string } | null;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<ResultType>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      await emailjs.send(
        'service_hi0dj1c', // service ID
        'template_98ck7tm', // template ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        '75AujBIe4LiIHJhAz' // public key
      );
      setResult({ success: true, message: 'Message sent successfully!' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setResult({ success: false, message: 'Failed to send message. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#1f1f1f' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-800" style={{ backgroundColor: 'rgba(31, 31, 31, 0.95)' }}>
        
        {/* Floating Buy Me a Coffee Button */}
        <div className="fixed top-4 right-4 z-50 md:block hidden">
          <a 
            href="https://buymeacoffee.com/rishiraj_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
          >
            <img 
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExazgwZGpucm0zaXJnenJod292em50bGtvMTc5eWM2bGxvNXFnZ2p6ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TDQOtnWgsBx99cNoyH/giphy.gif" 
              alt="Buy Me a Coffee" 
              className="w-4 h-4"
            />
            <span className="hidden sm:inline">Buy me a coffee</span>
          </a>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold flex items-center">
              <span className="text-green-400 mr-2">//</span>
              <span className="text-white">Rishi Raj</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'portfolio', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors ${
                    activeSection === item.id 
                      ? 'text-green-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Social Icons */}
            <div className="hidden md:flex items-center space-x-4 mr-20">
              <a 
                href="https://www.linkedin.com/in/rishirajx/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/Sikorsky3301" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://leetcode.com/u/sikorsky3301/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors"
                title="LeetCode"
              >
                <Code size={20} />
              </a>
              <a 
                href="https://www.credly.com/users/rishi-raj.c1936167" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors"
                title="Credly"
              >
                <Award size={20} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-800">
              <div className="space-y-4">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left transition-colors ${
                      activeSection === item.id 
                        ? 'text-green-400' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile Social Icons */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
                  <a 
                    href="https://www.linkedin.com/in/rishirajx/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://github.com/Sikorsky3301" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="https://leetcode.com/u/sikorsky3301/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                    title="LeetCode"
                  >
                    <Code size={20} />
                  </a>
                  <a 
                    href="https://www.credly.com/users/rishi-raj.c1936167" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                    title="Credly"
                  >
                    <Award size={20} />
                  </a>
                </div>
                
                {/* Mobile Buy Me a Coffee Button */}
                <div className="pt-4 border-t border-gray-700">
                  <a 
                    href="https://buymeacoffee.com/rishiraj_" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <img 
                      src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExazgwZGpucm0zaXJnenJod292em50bGtvMTc5eWM2bGxvNXFnZ2p6ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TDQOtnWgsBx99cNoyH/giphy.gif" 
                      alt="Buy Me a Coffee" 
                      className="w-5 h-5"
                    />
                    <span>Buy me a coffee</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative px-6 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Experience Badge */}
              <div className="inline-block">
                <span className="text-green-400 text-sm font-medium">
                  &lt;3+ Years Experience&gt;
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  BUILDING FAST,
                  <br />
                  SCALABLE, AND
                  <br />
                  SECURE AI APPLICATIONS
                </h1>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <a href="https://www.linkedin.com/in/rishirajx/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                  <img src="/icons/linkedin.png" alt="LinkedIn" className="w-6 h-6 mr-2" />
                  LinkedIn
                </a>
                <a href="https://github.com/Sikorsky3301" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                  <img src="/icons/github.png" alt="GitHub" className="w-6 h-6 mr-2" />
                  GitHub
                </a>
                <a href="https://leetcode.com/u/sikorsky3301/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                  <img src="/icons/leetcode.png" alt="LeetCode" className="w-6 h-6 mr-2" />
                  LeetCode
                </a>
                <a href="https://www.credly.com/users/rishi-raj.c1936167" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
                  <img src="/icons/credly.png" alt="Credly" className="w-6 h-6 mr-2" />
                  Credly
                </a>
              </div>

              {/* About Section */}
              <div className="space-y-4 max-w-md">
                <h3 className="text-green-400 text-sm font-medium">
                  &lt;About&gt;
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                I'm a Software Developer based in India, specializing in building scalable AI-driven and web-based solutions that address real-world challenges. My work focuses on leveraging machine learning, full-stack development, and cloud-native technologies to deliver impactful, user-centric tools.
                </p>
              </div>

              {/* Stats Section */}
              <div className="space-y-6">
                <h3 className="text-green-400 text-sm font-medium">
                  &lt;Success & Achievements&gt;
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
                    <div className="text-gray-400 text-sm">
                      Completed
                      <br />
                      Projects
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">3+</div>
                    <div className="text-gray-400 text-sm">
                      Years in
                      <br />
                      Development
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">5+</div>
                    <div className="text-gray-400 text-sm">
                      Technologies
                      <br />
                      Mastered
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
                    <div className="text-gray-400 text-sm">
                      Users
                      <br />
                      Base
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Profile Photo with rectangular shape and better alignment */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Profile Photo - Rectangular shape */}
                <div className="w-80 h-96 lg:w-96 lg:h-[500px] rounded-xl overflow-hidden border-4 border-green-400/20 shadow-2xl">
                  <img 
                    src="/images/profilepic.png" 
                    alt="Rishi Raj - Developer" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name Label */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700">
                  <span className="text-green-400 text-sm">//</span>
                  <span className="text-white text-sm ml-1">Rishi Raj</span>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 border border-green-400 rounded-lg rotate-12 opacity-30"></div>
                <div className="absolute -bottom-8 -right-8 w-12 h-12 border border-green-400 rounded-lg rotate-45 opacity-30"></div>
                <div className="absolute top-1/2 -right-12 w-8 h-8 border border-green-400 rounded-lg rotate-12 opacity-30"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-700 rotate-45 opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gray-700 rotate-12 opacity-20"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-gray-700 rotate-45 opacity-20"></div>
      </section>

      {/* Animated Skills Strip Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden">
            {/* Animated Skills Strip */}
            <div className="relative w-full h-24">
              <div className="flex animate-scroll-skill min-w-max" style={{width: 'max-content'}}>
                {/* One set of icons */}
                <img 
                  src="https://skillicons.dev/icons?i=aws,azure,gcp,postman,docker,kubernetes,python,git,react,flutter,django,cpp,javascript,typescript,nodejs,go,fastapi,java,bash,cs,git,kali,mongodb,mysql&perline=24" 
                  alt="Technical Skills"
                  className="h-20 w-auto inline-block"
                />
                {/* Duplicate for seamless loop */}
                <img 
                  src="https://skillicons.dev/icons?i=aws,azure,gcp,postman,docker,kubernetes,python,git,react,flutter,django,cpp,javascript,typescript,nodejs,go,fastapi,java,bash,cs,git,kali,mongodb,mysql&perline=24" 
                  alt="Technical Skills"
                  className="h-20 w-auto inline-block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Profile Section - Moved here after main section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Side - Professional Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-400">
                  &lt;Professional Profile&gt;
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                    Passionate Full Stack Developer with 3+ years of experience in building scalable web applications 
                    and AI-powered solutions. Specialized in modern JavaScript frameworks and cloud technologies.
                  </p>
                </div>
                {/* Education */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-green-400 flex items-center">
                    <GraduationCap className="mr-2" size={24} />
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div className="border-l-2 border-green-400 pl-4">
                      <h4 className="font-semibold text-white text-lg">Bachelor of Technology</h4>
                      <p className="text-gray-400 text-base">Computer Science & Engineering</p>
                      <p className="text-sm text-gray-500">2021 - 2024</p>
                    </div>
                  </div>
                </div>
                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-green-400 flex items-center">
                    <Code className="mr-2" size={24} />
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-base">Frontend</h4>
                      <div className="space-y-1 text-base text-gray-300">
                        <p>React.js, Next.js</p>
                        <p>JavaScript, TypeScript</p>
                        <p>HTML5, CSS3, Tailwind</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-base">Backend</h4>
                      <div className="space-y-1 text-base text-gray-300">
                        <p>Node.js, Express.js</p>
                        <p>Python, Django</p>
                        <p>MongoDB, PostgreSQL</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-base">Cloud & DevOps</h4>
                      <div className="space-y-1 text-base text-gray-300">
                        <p>AWS, Docker</p>
                        <p>CI/CD, Git</p>
                        <p>Kubernetes</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-base">AI/ML</h4>
                      <div className="space-y-1 text-base text-gray-300">
                        <p>TensorFlow, PyTorch</p>
                        <p>Gemini AI, OpenAI</p>
                        <p>Data Analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Experience & Certifications */}
              <div className="space-y-8">
                {/* Experience */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-green-400 flex items-center">
                    <Briefcase className="mr-2" size={24} />
                    Experience
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-2 border-green-400 pl-4">
                      <h4 className="font-semibold text-white text-lg">Full Stack Developer</h4>
                      <p className="text-gray-400 text-base">Freelance & Personal Projects</p>
                      <p className="text-sm text-gray-500 mb-2">2021 - Present</p>
                      <ul className="text-base text-gray-300 space-y-1">
                        <li>• Developed 15+ web applications using React and Node.js</li>
                        <li>• Implemented AI-powered solutions using Gemini AI</li>
                        <li>• Built automated code review systems</li>
                        <li>• Deployed applications on AWS cloud platform</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Certifications */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-green-400 flex items-center">
                    <Award className="mr-2" size={24} />
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white text-base">Microsoft Certified AZ-900: Azure AI Fundamentals</h4>
                      <p className="text-sm text-gray-400">Microsoft Azure</p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white text-base">Microsoft AI/ML Engineering Professional Certification</h4>
                      <p className="text-sm text-gray-400">Microsoft</p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white text-base">IBM Python for Data Science, Al & Development</h4>
                      <p className="text-sm text-gray-400">IBM</p>
                    </div>
                  </div>
                </div>
                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-green-400">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-6 h-6 text-green-400" />
                      <span className="text-gray-300 text-base">rishiraj_connect@outlook.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Linkedin className="w-6 h-6 text-green-400" />
                      <a href="https://www.linkedin.com/in/rishirajx/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors text-base">
                        linkedin.com/in/rishirajx
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Github className="w-6 h-6 text-green-400" />
                      <a href="https://github.com/Sikorsky3301" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 transition-colors text-base">
                        github.com/Sikorsky3301
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-6" style={{ backgroundColor: 'rgba(31, 31, 31, 0.8)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-green-400">&lt;</span>AI Projects<span className="text-green-400">&gt;</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              A showcase of projects that demonstrate my skills and passion for development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Proclens AI - Gemini AI",
                description: "AI-powered application leveraging Google's Gemini AI for intelligent data processing and analysis.",
                tech: ["React", "Gemini AI", "JavaScript", "API Integration"],
                image: "/images/proclens.jpg",
                link: "https://github.com/Sikorsky3301/Proclensai-geminiAI"
              },
              {
                title: "AI Agent Code Reviewer",
                description: "Intelligent code review system using AI agents to analyze and provide feedback on code quality.",
                tech: ["Python", "AI/ML", "Code Analysis", "Automation"],
                image: "/images/aiagent.jpg",
                link: "https://github.com/Sikorsky3301/Ai-agent-codereviewer"
              }
            ].map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-green-400/50 transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">{project.title}</h3>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-400/10 text-green-400 text-sm rounded-full border border-green-400/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-green-400">&lt;</span>Let's Connect<span className="text-green-400">&gt;</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Ready to start your next project? Let's collaborate and create something amazing together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-6">Let's Collaborate</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  I'm always excited to work on new projects and help bring innovative ideas to life. 
                  Whether you need a complete web application, AI integration, or want to improve an existing project, 
                  I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">rishiraj_connect@outlook.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">India</span>
                </div>
              </div>

              <div className="flex space-x-6">
                <a href="https://www.linkedin.com/in/rishirajx/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-400 hover:text-black transition-all duration-300 border border-gray-700 hover:border-green-400">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/Sikorsky3301" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-400 hover:text-black transition-all duration-300 border border-gray-700 hover:border-green-400">
                  <Github size={20} />
                </a>
                <a href="https://leetcode.com/u/sikorsky3301/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-400 hover:text-black transition-all duration-300 border border-gray-700 hover:border-green-400">
                  <Code size={20} />
                </a>
                <a href="https://www.credly.com/users/rishi-raj.c1936167" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-400 hover:text-black transition-all duration-300 border border-gray-700 hover:border-green-400">
                  <Award size={20} />
                </a>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
              <form className="space-y-6" onSubmit={handleSendEmail}>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:border-green-400 focus:outline-none transition-colors text-white"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:border-green-400 focus:outline-none transition-colors text-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:border-green-400 focus:outline-none transition-colors text-white resize-none"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
                {result && (
                  <div className={`mt-4 text-center font-semibold ${result.success ? 'text-green-400' : 'text-red-400'}`}>{result.message}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-green-400 mr-2">//</span>
            <span className="text-xl font-bold">Rishi Raj</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Crafted with passion and precision by Rishi Raj.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;