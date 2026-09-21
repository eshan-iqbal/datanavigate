'use client';

import React, { useState, useEffect, useMemo } from 'react';

type ViewType = 'home' | 'about' | 'services' | 'contact' | 'apply';

interface ModuleItem {
  code: string;
  name: string;
  category: 'it' | 'ops' | 'business';
  desc: string;
}

const MODULES: ModuleItem[] = [
  { code: 'ITSM', name: 'IT Service Management', category: 'it', desc: 'Incident, Problem, Change, Service Catalog & Request Management' },
  { code: 'ITOM', name: 'IT Operations Management', category: 'ops', desc: 'Discovery, Service Mapping, Event Management & Cloud Operations' },
  { code: 'GRC', name: 'Governance, Risk & Compliance', category: 'ops', desc: 'Risk Assessment, Policy Management, Audit & Regulatory Workflows' },
  { code: 'HRSD', name: 'HR Service Delivery', category: 'business', desc: 'Employee Onboarding, Lifecycle Events & Enterprise Case Management' },
  { code: 'CSM', name: 'Customer Service Management', category: 'business', desc: 'Omni-Channel Customer Cases, Self-Service Portals & Field Work' },
  { code: 'App Engine', name: 'Custom App Development', category: 'it', desc: 'Low-Code & Pro-Code Custom Scoped Application Architecture' },
  { code: 'ITAM', name: 'IT Asset Management', category: 'business', desc: 'Full-Lifecycle Asset Tracking, Contracts & Financial Optimization' },
  { code: 'HAM', name: 'Hardware Asset Management', category: 'business', desc: 'Hardware Discovery, Inventory Audits & Normalization Engine' },
  { code: 'SAM', name: 'Software Asset Management', category: 'business', desc: 'Software License Compliance, Publisher Packs & Spend Optimization' },
  { code: 'CMDB', name: 'Configuration Management', category: 'it', desc: 'Accurate CI Relationships, Service Topology & Data Health' },
  { code: 'CSDM', name: 'Common Service Data Model', category: 'it', desc: 'CSDM 4.0 Architecture, Digital Products & Enterprise Mapping' },
  { code: 'SecOps', name: 'Security Operations', category: 'ops', desc: 'Security Incident Response, Vulnerability Response & Threat Data' },
  { code: 'DevOps', name: 'DevOps Integration', category: 'ops', desc: 'CI/CD Pipeline Governance, Change Acceleration & Audit Trails' },
  { code: 'IRM', name: 'Integrated Risk Management', category: 'ops', desc: 'Enterprise Risk Hierarchy, Continuous Control Monitoring' },
  { code: 'SPM', name: 'Strategic Portfolio Management', category: 'business', desc: 'Demand Management, Roadmaps, Agile & Project Investment' },
  { code: 'S2P', name: 'Source to Pay', category: 'business', desc: 'Procurement Workflows, Supplier Lifecycle & Contract Governance' },
];

const ROLES_LIST = [
  { key: 'A', title: 'Certified Master Architect (CMA)', badge: 'Architect' },
  { key: 'B', title: 'Technical Architect / Solution Lead', badge: 'Leadership' },
  { key: 'C', title: 'Senior ServiceNow Developer', badge: 'Core Dev' },
  { key: 'D', title: 'ITOM & SecOps Specialist', badge: 'Specialist' },
  { key: 'E', title: 'Platform Consultant / Business Analyst', badge: 'Consulting' },
  { key: 'F', title: 'Full-Stack & Integration Engineer', badge: 'Cloud & API' },
];

const EXP_LIST = [
  { key: '1', label: '1–3 Years', sub: 'Associate / Junior' },
  { key: '2', label: '3–5 Years', sub: 'Mid-Level Specialist' },
  { key: '3', label: '5–8 Years', sub: 'Senior Platform Engineer' },
  { key: '4', label: '8+ Years', sub: 'Principal / Lead / Architect' },
];

function LogoIcon({ size = 48 }: { size?: number }) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/logo.png"
        alt="DataNavigate"
        className="brand-logo-img"
        style={{ height: `${size}px`, width: 'auto' }}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <svg 
      width={Math.round(size * 1.14)} 
      height={size} 
      viewBox="0 0 114 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="brand-logo-svg"
      aria-hidden="true"
    >
      {/* Pillar 1 (Leftmost Solid Block) */}
      <rect x="6" y="8" width="18" height="84" rx="1.5" fill="currentColor" />

      {/* Arch 2 (Outer Wave) */}
      <path
        d="M29 92 V48 C29 25.5 47 9 70 9 C75 9 79.5 10.2 83.5 12 V25.5 C80 24 75.5 23 70 23 C54.5 23 43 33.5 43 49.5 V92 H29 Z"
        fill="currentColor"
      />

      {/* Arch 3 (Middle Wave) */}
      <path
        d="M48 92 V58 C48 41 60 29.5 76 29.5 C83.5 29.5 89.5 32 94.5 35.8 V49 C90 45.2 84 43 76.5 43 C67.5 43 62 49 62 60 V92 H48 Z"
        fill="currentColor"
      />

      {/* Arch 4 (Inner Gateway / N Arch) */}
      <path
        d="M67 92 V63 C67 52 75.5 44 87.5 44 C99.5 44 108 52 108 63 V92 H94 V64 C94 59.5 90.5 56.5 86.5 56.5 C82.5 56.5 79 59.5 79 64 V92 H67 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [moduleFilter, setModuleFilter] = useState<'all' | 'it' | 'ops' | 'business'>('all');
  const [moduleSearch, setModuleSearch] = useState('');
  
  // Conversational Application State
  const [applyStep, setApplyStep] = useState<1 | 2 | 3>(1);
  const [candidateData, setCandidateData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: 'ServiceNow Senior Developer',
    exp: '5–8 Years',
    selectedModules: ['ITSM', 'CMDB', 'App Engine'],
    linkedin: '',
    notes: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileNavOpen]);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.05,
      rootMargin: '0px 0px -10px 0px',
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const animatableElements = document.querySelectorAll('.scroll-animate');
    animatableElements.forEach((el) => observer.observe(el));

    return () => {
      animatableElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentView, moduleFilter, moduleSearch, applyStep]);

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileSelect = (file: File) => {
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExt)) {
      showToast('Please upload a valid PDF, DOC, or DOCX document.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size exceeds 10MB limit. Please upload a smaller file.');
      return;
    }

    setSelectedFile(file);
    showToast(`Attached: ${file.name}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    const fileInput = document.getElementById('cvFileInput') as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
  };

  const toggleCandidateModule = (code: string) => {
    setCandidateData((prev) => {
      const exists = prev.selectedModules.includes(code);
      if (exists) {
        return { ...prev, selectedModules: prev.selectedModules.filter(m => m !== code) };
      } else {
        return { ...prev, selectedModules: [...prev.selectedModules, code] };
      }
    });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formElement = e.currentTarget;

    try {
      const nameInput = document.getElementById('cName') as HTMLInputElement | null;
      const emailInput = document.getElementById('cEmail') as HTMLInputElement | null;
      const typeSelect = document.getElementById('cType') as HTMLSelectElement | null;
      const msgInput = document.getElementById('cMessage') as HTMLTextAreaElement | null;

      const formData = new FormData();
      formData.append('formType', 'contact');
      formData.append('name', nameInput?.value || '');
      formData.append('email', emailInput?.value || '');
      formData.append('inquiryType', typeSelect?.value || '');
      formData.append('message', msgInput?.value || '');

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error && result.error.includes('RESEND_API_KEY')) {
          showToast('Form ready! Add your RESEND_API_KEY to .env.local to deliver live emails.');
        } else {
          showToast(result.error || 'Failed to transmit message. Please try again.');
        }
      } else {
        showToast('Thank you! Your inquiry has been sent to our talent team.');
        formElement.reset();
      }
    } catch (err) {
      console.error('Submission error:', err);
      showToast('Thank you! Your inquiry has been recorded.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showToast('Please attach your CV / Resume before submitting.');
      return;
    }
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('formType', 'application');
      formData.append('name', candidateData.name);
      formData.append('email', candidateData.email);
      formData.append('phone', candidateData.phone);
      formData.append('location', candidateData.location);
      formData.append('role', candidateData.role);
      formData.append('exp', candidateData.exp);
      formData.append('linkedin', candidateData.linkedin);
      formData.append('notes', candidateData.notes);
      formData.append('selectedModules', JSON.stringify(candidateData.selectedModules));
      formData.append('file', selectedFile);

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error && result.error.includes('RESEND_API_KEY')) {
          showToast('Application registered! Add RESEND_API_KEY in .env.local for email delivery.');
        } else {
          showToast(result.error || 'Submission failed. Please check your connection.');
        }
      } else {
        showToast('Application submitted! Details & CV sent to the talent lead.');
      }

      setCandidateData({
        name: '',
        email: '',
        phone: '',
        location: '',
        role: 'ServiceNow Senior Developer',
        exp: '5–8 Years',
        selectedModules: ['ITSM', 'CMDB', 'App Engine'],
        linkedin: '',
        notes: '',
      });
      setSelectedFile(null);
      setApplyStep(1);
      const fileInput = document.getElementById('cvFileInput') as HTMLInputElement | null;
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error('Submission error:', err);
      showToast('Application recorded! A technical lead will review your profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredModules = useMemo(() => {
    return MODULES.filter((m) => {
      const matchesCategory = moduleFilter === 'all' || m.category === moduleFilter;
      const matchesQuery = moduleSearch.trim() === '' || 
        m.code.toLowerCase().includes(moduleSearch.toLowerCase()) || 
        m.name.toLowerCase().includes(moduleSearch.toLowerCase()) ||
        m.desc.toLowerCase().includes(moduleSearch.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [moduleFilter, moduleSearch]);

  const moduleCounts = useMemo(() => {
    return {
      all: MODULES.length,
      it: MODULES.filter(m => m.category === 'it').length,
      ops: MODULES.filter(m => m.category === 'ops').length,
      business: MODULES.filter(m => m.category === 'business').length,
    };
  }, []);

  const getInitials = (name: string) => {
    if (!name.trim()) return 'DN';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`mobile-backdrop ${mobileNavOpen ? 'active' : ''}`}
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Typeform Minimalist Floating Header */}
      <header className="site-header">
        <div className="nav-container">
          <div className="brand-logo" onClick={() => handleNavClick('home')} role="button" tabIndex={0} aria-label="DataNavigate Home">
            <LogoIcon size={54} />
          </div>

          <nav className={`nav-pill-container ${mobileNavOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
            <button 
              className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`} 
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button 
              className={`nav-link-btn ${currentView === 'about' ? 'active' : ''}`} 
              onClick={() => handleNavClick('about')}
            >
              About Us
            </button>
            <button 
              className={`nav-link-btn ${currentView === 'services' ? 'active' : ''}`} 
              onClick={() => handleNavClick('services')}
            >
              Services
            </button>
            <button 
              className={`nav-link-btn ${currentView === 'contact' ? 'active' : ''}`} 
              onClick={() => handleNavClick('contact')}
            >
              Contact
            </button>
            
            <div className="mobile-drawer-actions">
              <button className="btn btn-primary full-width" onClick={() => handleNavClick('apply')}>
                <span>Submit Your CV</span>
                <span className="btn-arrow-icon">→</span>
              </button>
              <button className="btn btn-secondary full-width" onClick={() => handleNavClick('contact')}>
                <span>Request Talent</span>
                <span className="btn-arrow-icon">→</span>
              </button>
            </div>
          </nav>

          <div className="header-actions-desktop">
            <button className="btn btn-ghost desktop-header-cta" onClick={() => handleNavClick('contact')}>
              <span>Request Talent</span>
            </button>
            <button className="btn btn-primary desktop-header-cta" onClick={() => handleNavClick('apply')}>
              <span>Submit CV</span>
              <span className="btn-arrow-icon">→</span>
            </button>
          </div>

          <button 
            className={`hamburger-btn ${mobileNavOpen ? 'active' : ''}`} 
            onClick={() => setMobileNavOpen(!mobileNavOpen)} 
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* ================= HOME VIEW ================= */}
        {currentView === 'home' && (
          <section className="spa-view active">
            <div className="hero-section">
              <div className="hero-container scroll-animate">

                <h1 className="hero-title">
                  Forms of brilliance. <br />
                  <i className="hero-serif-accent">Ready to make the switch?</i>
                </h1>

                <p className="hero-subtitle">
                  We cut through generic CV noise with developer-led vetting. Pinpointing certified ServiceNow specialists and architects who deliver real enterprise outcomes.
                </p>

                <div className="hero-actions">
                  <button className="btn btn-primary btn-lg" onClick={() => handleNavClick('contact')}>
                    <span>Request Talent</span>
                    <span className="btn-key-badge">Enter ↵</span>
                  </button>
                  <button className="btn btn-secondary btn-lg" onClick={() => handleNavClick('apply')}>
                    <span>Submit Your CV</span>
                    <span className="btn-arrow-icon">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Typeform Dual Portal Cards */}
            <div className="section-container">
              <div className="section-header center scroll-animate">
                <span className="section-tag typeform-tag">SELECT YOUR PATH</span>
                <h2>Choose how you want to <i>engage with us.</i></h2>
                <p>Select an option below to start your personalized navigation experience.</p>
              </div>

              <div className="dual-portal-grid">
                <div className="portal-card enterprise-card scroll-animate" onClick={() => handleNavClick('services')} role="button" tabIndex={0}>
                  <div className="portal-card-header">
                    <div className="typeform-choice-badge">
                      <span className="key-char">A</span>
                      <span className="choice-label">ENTERPRISES</span>
                    </div>
                    <div className="portal-status-badge">
                      <span className="pulse-dot green"></span>
                      <span>Vetted Talent Ready</span>
                    </div>
                  </div>

                  <h3 className="portal-card-title">
                    I need certified <br />
                    <i>ServiceNow Experts</i>
                  </h3>

                  <p className="portal-card-desc">
                    Eliminate trial-and-error hiring. Get pre-screened engineers, technical architects, and module leads evaluated by senior developers with enterprise track records.
                  </p>

                  <div className="portal-features-list">
                    <span className="portal-feature-item">✓ Code-Level Screening</span>
                    <span className="portal-feature-item">✓ 48-Hour Shortlists</span>
                    <span className="portal-feature-item">✓ 90-Day Guarantee</span>
                  </div>

                  <div className="portal-action-row">
                    <span className="portal-action-text">Explore Enterprise Solutions</span>
                    <span className="portal-arrow-circle">→</span>
                  </div>
                </div>

                <div className="portal-card specialist-card scroll-animate" onClick={() => handleNavClick('apply')} role="button" tabIndex={0}>
                  <div className="portal-card-header">
                    <div className="typeform-choice-badge alt">
                      <span className="key-char">B</span>
                      <span className="choice-label">SPECIALISTS</span>
                    </div>
                    <div className="portal-status-badge">
                      <span className="pulse-dot green"></span>
                      <span>High-Impact Roles</span>
                    </div>
                  </div>

                  <h3 className="portal-card-title">
                    I want to explore <br />
                    <i>High-Impact Roles</i>
                  </h3>

                  <p className="portal-card-desc">
                    Accelerate your career trajectory with premier tech companies looking for genuine platform mastery, verified architectural depth, and leadership ability.
                  </p>

                  <div className="portal-features-list">
                    <span className="portal-feature-item">✓ Top Market Packages</span>
                    <span className="portal-feature-item">✓ Peer Technical Interviews</span>
                    <span className="portal-feature-item">✓ Remote & Hybrid Roles</span>
                  </div>

                  <div className="portal-action-row">
                    <span className="portal-action-text">Upload Resume & Apply</span>
                    <span className="portal-arrow-circle">→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Methodology Features */}
            <div className="section-container">
              <div className="section-header center scroll-animate">
                <span className="section-tag typeform-tag">METHODOLOGY</span>
                <h2>Why DataNavigate <i>Limited?</i></h2>
                <p>We solve traditional recruitment flaws through code-level evaluation and deep technical alignment.</p>
              </div>

              <div className="features-grid">
                <div className="feature-card scroll-animate">
                  <div className="feature-step-badge">1</div>
                  <h3>Developer-Led Vetting</h3>
                  <p>Our team of technical architects assesses candidates on actual script includes, Flow Designer best practices, API integrations, and architecture.</p>
                </div>

                <div className="feature-card scroll-animate">
                  <div className="feature-step-badge">2</div>
                  <h3>Proven Business Outcomes</h3>
                  <p>We filter past generic CVs to pinpoint candidates with a verifiable track record of driving ROI, CMDB health, and successful enterprise rollouts.</p>
                </div>

                <div className="feature-card scroll-animate">
                  <div className="feature-step-badge">3</div>
                  <h3>Smarter, Faster Velocity</h3>
                  <p>Receive a curated shortlist of high-probability fits within 48 hours, drastically lowering time-to-hire and interview fatigue.</p>
                </div>
              </div>
            </div>

            {/* ServiceNow Modules Explorer */}
            <div className="section-container">
              <div className="section-header scroll-animate">
                <div className="section-header-top">
                  <div>
                    <span className="section-tag typeform-tag">SPECIALIZED CAPABILITIES</span>
                    <h2>Expertise Across All ServiceNow <i>Modules</i></h2>
                    <p>Filter or search our talent coverage across every platform application.</p>
                  </div>
                  
                  <div className="module-search-box">
                    <span className="search-icon">🔍</span>
                    <input 
                      type="text" 
                      placeholder="Search module (e.g. ITSM, SecOps, CSDM)..."
                      value={moduleSearch}
                      onChange={(e) => setModuleSearch(e.target.value)}
                      aria-label="Search ServiceNow Modules"
                    />
                    {moduleSearch && (
                      <button className="search-clear-btn" onClick={() => setModuleSearch('')} aria-label="Clear search">✕</button>
                    )}
                  </div>
                </div>
              </div>

              <div className="modules-filter scroll-animate">
                <button 
                  className={`filter-chip ${moduleFilter === 'all' ? 'active' : ''}`} 
                  onClick={() => setModuleFilter('all')}
                >
                  All Modules <span className="chip-count">({moduleCounts.all})</span>
                </button>
                <button 
                  className={`filter-chip ${moduleFilter === 'it' ? 'active' : ''}`} 
                  onClick={() => setModuleFilter('it')}
                >
                  IT Solutions <span className="chip-count">({moduleCounts.it})</span>
                </button>
                <button 
                  className={`filter-chip ${moduleFilter === 'ops' ? 'active' : ''}`} 
                  onClick={() => setModuleFilter('ops')}
                >
                  Operations & Security <span className="chip-count">({moduleCounts.ops})</span>
                </button>
                <button 
                  className={`filter-chip ${moduleFilter === 'business' ? 'active' : ''}`} 
                  onClick={() => setModuleFilter('business')}
                >
                  Business & Assets <span className="chip-count">({moduleCounts.business})</span>
                </button>
              </div>

              <div className="modules-grid">
                {filteredModules.map((mod, idx) => (
                  <div key={idx} className="module-card scroll-animate">
                    <div className="module-card-top">
                      <span className="mod-code">{mod.code}</span>
                      <span className={`mod-badge mod-badge-${mod.category}`}>
                        {mod.category.toUpperCase()}
                      </span>
                    </div>
                    <span className="mod-name">{mod.name}</span>
                    <p className="mod-desc">{mod.desc}</p>
                  </div>
                ))}
                {filteredModules.length === 0 && (
                  <div className="no-modules-found">
                    <p>No ServiceNow modules matched "<strong>{moduleSearch}</strong>".</p>
                    <button className="btn btn-secondary" onClick={() => { setModuleSearch(''); setModuleFilter('all'); }}>
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Testimonials */}
            <div className="section-container">
              <div className="section-header center scroll-animate">
                <span className="section-tag typeform-tag">PROVEN IMPACT</span>
                <h2>What Industry Leaders <i>Say</i></h2>
                <p>Trusted by CTOs, enterprise heads, and elite ServiceNow technical leads worldwide.</p>
              </div>

              <div className="testimonials-grid">
                <div className="testimonial-card scroll-animate">
                  <div className="quote-icon">“</div>
                  <p className="testimonial-text">
                    "DataNavigate Limited helped us source a top-tier ServiceNow Architect who overhauled our CMDB and CSDM model in record time. Their technical screening is unmatched."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">CTO</div>
                    <div>
                      <h4>Chief Technology Officer</h4>
                      <span>Global Enterprise Tech</span>
                    </div>
                  </div>
                </div>

                <div className="testimonial-card scroll-animate">
                  <div className="quote-icon">“</div>
                  <p className="testimonial-text">
                    "As a candidate, working with DataNavigate was refreshing. They understood my technical background immediately and placed me in a dream lead developer role."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">TL</div>
                    <div>
                      <h4>ServiceNow Technical Lead</h4>
                      <span>Financial Services Partner</span>
                    </div>
                  </div>
                </div>

                <div className="testimonial-card scroll-animate">
                  <div className="quote-icon">“</div>
                  <p className="testimonial-text">
                    "Professional, rapid, and transparent. They are our exclusive partner for specialized ITOM, SecOps, and custom App Engine staffing requirements."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar">VP</div>
                    <div>
                      <h4>VP of Engineering</h4>
                      <span>Cloud Infrastructure Corp</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark CTA Banner */}
            <div className="section-container">
              <div className="cta-banner-dark scroll-animate">
                <div className="cta-content">
                  <span className="cta-mini-tag">GET STARTED</span>
                  <h2>Ready to make <i>the switch?</i></h2>
                  <p>Connect with our expert technical talent strategists and start seeing precision results today.</p>
                </div>
                <div className="cta-actions">
                  <button className="btn btn-white-pill btn-lg" onClick={() => handleNavClick('contact')}>
                    <span>Request a Pilot</span>
                    <span className="btn-arrow-icon">→</span>
                  </button>
                  <button className="btn btn-outline-white btn-lg" onClick={() => handleNavClick('apply')}>
                    <span>Submit CV</span>
                    <span className="btn-arrow-icon">→</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= ABOUT VIEW ================= */}
        {currentView === 'about' && (
          <section className="spa-view active">
            <div className="page-hero">
              <div className="section-container scroll-animate">
                <span className="section-tag typeform-tag">ABOUT DATANAVIGATE LIMITED</span>
                <h1>Empowering Careers. <i>Driving Growth.</i></h1>
                <p>Your global partner in developer-led ServiceNow recruitment, technical talent navigation, and enterprise workforce solutions.</p>
              </div>
            </div>

            <div className="section-container">
              <div className="about-grid">
                <div className="about-text-panel scroll-animate">
                  <h2>Engineered to Fix Broken Recruitment</h2>
                  <p>
                    At DataNavigate Limited, we are a global team of senior developers and talent engineers who have sat on every side of the hiring table. We established this agency to solve what conventional recruitment firms get wrong: generic CV matching, buzzword filtering, and lookalike profiles that fail to deliver real-world code quality.
                  </p>
                  <p>
                    Our technical vetting methodology measures candidates by demonstrable business impact, architectural soundness, and execution velocity. We empower candidates to get recognized for their genuine mastery and help enterprises build resilient technology teams.
                  </p>
                  <div className="stats-row">
                    <div className="mini-stat">
                      <span className="mini-number">30+</span>
                      <span className="mini-label">Countries Active</span>
                    </div>
                    <div className="mini-stat">
                      <span className="mini-number">80%</span>
                      <span className="mini-label">Repeat Enterprise Clients</span>
                    </div>
                    <div className="mini-stat">
                      <span className="mini-number">100%</span>
                      <span className="mini-label">Developer-Vetted Shortlists</span>
                    </div>
                  </div>
                </div>
                <div className="about-graphic-panel scroll-animate">
                  <div className="typeform-card-stack">
                    <div className="stack-card">
                      <span className="stack-title">Developer Vetting Standard</span>
                      <p>Code reviews, system design scenarios, and live problem-solving assessments conducted by active practitioners.</p>
                    </div>
                    <div className="stack-card highlight">
                      <span className="stack-title">Quality Over Quantity</span>
                      <p>Curated, precision shortlists of 2-3 elite candidates instead of high-volume, irrelevant CV blasts.</p>
                    </div>
                    <div className="stack-card">
                      <span className="stack-title">Long-Term Retention</span>
                      <p>Cultural & technical alignment focused on 90-day+ ongoing project and team performance success.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-container">
              <div className="section-header center scroll-animate">
                <span className="section-tag typeform-tag">TALENT MATRIX</span>
                <h2>Our Specialist <i>Divisions</i></h2>
                <p>Deep vertical expertise across every facet of enterprise digital transformation.</p>
              </div>

              <div className="team-pillars-grid">
                <div className="pillar-card scroll-animate">
                  <div className="pillar-icon">⚡</div>
                  <h3>ServiceNow Architecture & Lead Dev</h3>
                  <p>Certified Master Architects, Technical Leads, and ITSM/ITOM Implementation Specialists.</p>
                </div>

                <div className="pillar-card scroll-animate">
                  <div className="pillar-icon">🛡️</div>
                  <h3>SecOps & Integrated Risk (GRC)</h3>
                  <p>Security Incident Response leads, Vulnerability Management analysts, and GRC compliance consultants.</p>
                </div>

                <div className="pillar-card scroll-animate">
                  <div className="pillar-icon">🚀</div>
                  <h3>Full-Stack & Cloud Engineering</h3>
                  <p>Java, Node.js, React/Next.js, DevOps pipelines, AWS/Azure cloud integration specialists.</p>
                </div>

                <div className="pillar-card scroll-animate">
                  <div className="pillar-icon">📊</div>
                  <h3>Data Science & Platform Analytics</h3>
                  <p>Performance Analytics experts, Machine Learning engineers, and BI pipeline architects.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= SERVICES VIEW ================= */}
        {currentView === 'services' && (
          <section className="spa-view active">
            <div className="page-hero">
              <div className="section-container scroll-animate">
                <span className="section-tag typeform-tag">STRATEGIC TALENT SOLUTIONS</span>
                <h1>Strategic Talent & <i>Solutions</i></h1>
                <p>We deliver specialized recruitment and technical consulting to help you build and scale high-performing engineering teams.</p>
              </div>
            </div>

            <div className="section-container">
              <div className="services-list-grid">
                <div className="service-detail-card scroll-animate">
                  <div className="service-badge">01</div>
                  <h3>Permanent Talent Acquisition</h3>
                  <p>End-to-end recruitment for high-impact permanent roles. Rigorous technical screening, cultural fit evaluation, and long-term retention support with a 90-day guarantee.</p>
                  <ul className="service-bullets">
                    <li>Full technical assessment report</li>
                    <li>Salary benchmarking & compensation advice</li>
                    <li>Replacement warranty guarantee</li>
                  </ul>
                </div>

                <div className="service-detail-card scroll-animate">
                  <div className="service-badge">02</div>
                  <h3>Contract & Project Staffing</h3>
                  <p>Flexible duration deployment of pre-vetted ServiceNow developers and platform consultants to accelerate immediate project milestones and delivery sprints.</p>
                  <ul className="service-bullets">
                    <li>Immediate onboarding readiness</li>
                    <li>Direct contract governance & compliance</li>
                    <li>Burst capacity for major releases</li>
                  </ul>
                </div>

                <div className="service-detail-card scroll-animate">
                  <div className="service-badge">03</div>
                  <h3>Executive & Architecture Search</h3>
                  <p>Targeted headhunting for Enterprise Architects, Technical Practice Leads, and Platform Directors who possess rare technical depth and leadership capability.</p>
                  <ul className="service-bullets">
                    <li>Confidential executive matching</li>
                    <li>Strategic platform vision evaluation</li>
                    <li>Stakeholder alignment assessment</li>
                  </ul>
                </div>

                <div className="service-detail-card scroll-animate">
                  <div className="service-badge">04</div>
                  <h3>ServiceNow Health & Capability Audits</h3>
                  <p>Developer-led reviews of existing platform customization, CMDB data integrity, instance hygiene, and workflow optimization recommendations.</p>
                  <ul className="service-bullets">
                    <li>Upgrade readiness & debt assessment</li>
                    <li>Integration & API security audit</li>
                    <li>Best practice architecture roadmap</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="section-container">
              <div className="section-header center scroll-animate">
                <span className="section-tag typeform-tag">OUR METHODOLOGY</span>
                <h2>Our Proven <i>5-Step Process</i></h2>
                <p>From initial discovery to post-placement support, every step is built on technical precision.</p>
              </div>

              <div className="process-timeline">
                <div className="timeline-step scroll-animate">
                  <div className="step-num">1</div>
                  <h4>Discovery & Needs</h4>
                  <p>Deep-dive analysis of your technical stack, culture, and project objectives.</p>
                </div>
                <div className="timeline-step scroll-animate">
                  <div className="step-num">2</div>
                  <h4>Targeted Sourcing</h4>
                  <p>Leveraging our specialized global developer and architect network.</p>
                </div>
                <div className="timeline-step scroll-animate">
                  <div className="step-num">3</div>
                  <h4>Technical Screening</h4>
                  <p>Code reviews & scenario assessments led by active senior engineers.</p>
                </div>
                <div className="timeline-step scroll-animate">
                  <div className="step-num">4</div>
                  <h4>Presentation</h4>
                  <p>Shortlist of top 2-3 vetted candidates with complete technical dossiers.</p>
                </div>
                <div className="timeline-step scroll-animate">
                  <div className="step-num">5</div>
                  <h4>Onboarding & Support</h4>
                  <p>Smooth deployment and structured 30/60/90-day performance check-ins.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= CONTACT VIEW ================= */}
        {currentView === 'contact' && (
          <section className="spa-view active">
            <div className="page-hero">
              <div className="section-container scroll-animate">
                <span className="section-tag typeform-tag">GET IN TOUCH</span>
                <h1>Connect With Our <i>Talent Team</i></h1>
                <p>Have an immediate hiring inquiry or looking to explore talent options? We respond within 24 business hours.</p>
              </div>
            </div>

            <div className="section-container">
              <div className="contact-wrapper">
                <div className="contact-info-panel scroll-animate">
                  <h2>Direct Communication Channels</h2>
                  <p>Connect directly with a developer-recruiting specialist to start a focused, productive conversation.</p>

                  <div className="contact-method-card">
                    <div className="method-icon">✉️</div>
                    <div>
                      <h4>Email Inquiries</h4>
                      <a href="mailto:contact@datanavigate.co.uk" className="contact-link">contact@datanavigate.co.uk</a><br />
                      <a href="mailto:careers@datanavigate.co.uk" className="contact-link">careers@datanavigate.co.uk</a>
                    </div>
                  </div>

                  <div className="contact-method-card">
                    <div className="method-icon">⚡</div>
                    <div>
                      <h4>Global Talent SLA</h4>
                      <p>Shortlists delivered within 48 business hours.</p>
                    </div>
                  </div>

                  <div className="contact-method-card">
                    <div className="method-icon">🌐</div>
                    <div>
                      <h4>Global Operations</h4>
                      <p>Serving clients & candidates across North America, Europe, Asia Pacific, and EMEA.</p>
                    </div>
                  </div>
                </div>

                <div className="contact-form-panel scroll-animate">
                  <form className="typeform-card-form" onSubmit={handleContactSubmit}>
                    <h3>Send Us A Message</h3>
                    <p className="form-subtitle">Fill in the details below and an architect will reach out shortly.</p>
                    
                    <div className="form-group">
                      <label htmlFor="cName">
                        <span className="field-number">1 →</span> Full Name *
                      </label>
                      <input type="text" id="cName" required placeholder="Type your name..." />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cEmail">
                        <span className="field-number">2 →</span> Work Email *
                      </label>
                      <input type="email" id="cEmail" required placeholder="name@company.com" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cType">
                        <span className="field-number">3 →</span> I am a... *
                      </label>
                      <select id="cType" required defaultValue="">
                        <option value="" disabled>Select Option</option>
                        <option value="Employer looking to hire">Employer looking to hire</option>
                        <option value="Candidate seeking roles">Candidate seeking roles</option>
                        <option value="General inquiry">General inquiry</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cMessage">
                        <span className="field-number">4 →</span> Message / Hiring Needs *
                      </label>
                      <textarea id="cMessage" rows={4} required placeholder="Tell us about the roles, modules, or skills you are looking for..."></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary full-width btn-lg" disabled={isSubmitting}>
                      <span>{isSubmitting ? 'Transmitting...' : 'Submit Message'}</span>
                      <span className="btn-key-badge">Enter ↵</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= REDESIGNED CONVERSATIONAL CANDIDATE PORTAL ================= */}
        {currentView === 'apply' && (
          <section className="spa-view active candidate-portal-section">
            {/* Seamless Hero Lockup */}
            <div className="candidate-portal-hero scroll-animate">
              <div className="section-tag typeform-tag">
                <span className="pulse-dot green"></span>
                <span>CANDIDATE TALENT PORTAL</span>
              </div>
              <h1 className="portal-main-heading">
                Step into your next <i className="serif-title">ServiceNow Chapter.</i>
              </h1>
              <p className="portal-sub-heading">
                Direct developer-to-developer technical matching. Complete your candidate profile in 3 quick steps.
              </p>

              {/* Typeform Step Progress Pill Bar */}
              <div className="typeform-step-nav">
                <button 
                  className={`step-nav-item ${applyStep === 1 ? 'active' : ''} ${applyStep > 1 ? 'completed' : ''}`}
                  onClick={() => setApplyStep(1)}
                >
                  <span className="step-nav-badge">{applyStep > 1 ? '✓' : '1'}</span>
                  <span>Personal Details</span>
                </button>
                <span className="step-nav-divider">→</span>
                <button 
                  className={`step-nav-item ${applyStep === 2 ? 'active' : ''} ${applyStep > 2 ? 'completed' : ''}`}
                  onClick={() => setApplyStep(2)}
                >
                  <span className="step-nav-badge">{applyStep > 2 ? '✓' : '2'}</span>
                  <span>Role & Skills Matrix</span>
                </button>
                <span className="step-nav-divider">→</span>
                <button 
                  className={`step-nav-item ${applyStep === 3 ? 'active' : ''}`}
                  onClick={() => setApplyStep(3)}
                >
                  <span className="step-nav-badge">3</span>
                  <span>CV & Resume Upload</span>
                </button>
              </div>
            </div>

            {/* Split Conversational Form & Live Dossier Preview */}
            <div className="section-container portal-content-container">
              <div className="candidate-split-layout">
                
                {/* LEFT: Conversational Step Flow */}
                <div className="conversational-form-pane">
                  
                  {/* STEP 1: Personal Details */}
                  {applyStep === 1 && (
                    <div className="step-card-box animate-step">
                      <div className="step-header-lockup">
                        <span className="step-counter-tag">STEP 01 / 03</span>
                        <h2>Let's start with your <i>basics.</i></h2>
                        <p>How can our technical hiring directors reach you with confidential matching roles?</p>
                      </div>

                      <div className="typeform-field-group">
                        <label htmlFor="c_name">
                          <span className="field-q-num">1.1</span> What is your full name? *
                        </label>
                        <input 
                          type="text" 
                          id="c_name" 
                          placeholder="e.g. Sarah Jenkins"
                          value={candidateData.name}
                          onChange={(e) => setCandidateData({ ...candidateData, name: e.target.value })}
                          required
                          autoFocus
                        />
                      </div>

                      <div className="typeform-field-group">
                        <label htmlFor="c_email">
                          <span className="field-q-num">1.2</span> Your primary email address? *
                        </label>
                        <input 
                          type="email" 
                          id="c_email" 
                          placeholder="sarah@example.com"
                          value={candidateData.email}
                          onChange={(e) => setCandidateData({ ...candidateData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-row-2col">
                        <div className="typeform-field-group">
                          <label htmlFor="c_phone">
                            <span className="field-q-num">1.3</span> Phone Number
                          </label>
                          <input 
                            type="tel" 
                            id="c_phone" 
                            placeholder="+1 (555) 000-0000"
                            value={candidateData.phone}
                            onChange={(e) => setCandidateData({ ...candidateData, phone: e.target.value })}
                          />
                        </div>
                        <div className="typeform-field-group">
                          <label htmlFor="c_loc">
                            <span className="field-q-num">1.4</span> Location / Country *
                          </label>
                          <input 
                            type="text" 
                            id="c_loc" 
                            placeholder="e.g. London, UK / Remote"
                            value={candidateData.location}
                            onChange={(e) => setCandidateData({ ...candidateData, location: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="step-action-bar">
                        <button 
                          type="button" 
                          className="btn btn-primary btn-lg"
                          onClick={() => {
                            if (!candidateData.name.trim() || !candidateData.email.trim()) {
                              showToast('Please enter your full name and email address.');
                              return;
                            }
                            setApplyStep(2);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                        >
                          <span>Continue to Role Matrix</span>
                          <span className="btn-key-badge">Enter ↵</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Technical Role & Specialization */}
                  {applyStep === 2 && (
                    <div className="step-card-box animate-step">
                      <div className="step-header-lockup">
                        <span className="step-counter-tag">STEP 02 / 03</span>
                        <h2>What is your <i>ServiceNow focus?</i></h2>
                        <p>Select your primary specialization and platform module mastery.</p>
                      </div>

                      <div className="typeform-field-group">
                        <label>
                          <span className="field-q-num">2.1</span> Primary Specialization / Target Role:
                        </label>
                        <div className="typeform-choice-grid">
                          {ROLES_LIST.map((r) => {
                            const isSelected = candidateData.role === r.title;
                            return (
                              <div 
                                key={r.key}
                                className={`typeform-choice-tile ${isSelected ? 'selected' : ''}`}
                                onClick={() => setCandidateData({ ...candidateData, role: r.title })}
                                role="button"
                                tabIndex={0}
                              >
                                <span className="choice-key-tag">{r.key}</span>
                                <div className="choice-text-wrap">
                                  <span className="choice-main-title">{r.title}</span>
                                  <span className="choice-sub-tag">{r.badge}</span>
                                </div>
                                {isSelected && <span className="choice-check-icon">✓</span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="typeform-field-group">
                        <label>
                          <span className="field-q-num">2.2</span> Years of ServiceNow Experience:
                        </label>
                        <div className="exp-tiles-grid">
                          {EXP_LIST.map((exp) => {
                            const isSelected = candidateData.exp === exp.label;
                            return (
                              <div 
                                key={exp.key}
                                className={`exp-choice-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => setCandidateData({ ...candidateData, exp: exp.label })}
                                role="button"
                                tabIndex={0}
                              >
                                <span className="exp-key">{exp.key}</span>
                                <span className="exp-label">{exp.label}</span>
                                <span className="exp-sub">{exp.sub}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="typeform-field-group">
                        <label>
                          <span className="field-q-num">2.3</span> Platform Modules (Click to Toggle):
                        </label>
                        <div className="module-toggle-chips">
                          {MODULES.map((m) => {
                            const isChecked = candidateData.selectedModules.includes(m.code);
                            return (
                              <button
                                key={m.code}
                                type="button"
                                className={`toggle-chip ${isChecked ? 'active' : ''}`}
                                onClick={() => toggleCandidateModule(m.code)}
                              >
                                <span className="chip-indicator">{isChecked ? '✓' : '+'}</span>
                                <span className="chip-code">{m.code}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="step-action-bar">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => setApplyStep(1)}
                        >
                          <span>← Back</span>
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-primary btn-lg"
                          onClick={() => {
                            setApplyStep(3);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                        >
                          <span>Continue to CV Upload</span>
                          <span className="btn-key-badge">Enter ↵</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CV Upload & Submission */}
                  {applyStep === 3 && (
                    <div className="step-card-box animate-step">
                      <div className="step-header-lockup">
                        <span className="step-counter-tag">STEP 03 / 03</span>
                        <h2>Attach your <i>CV / Resume.</i></h2>
                        <p>Our developer leads review candidate code dossiers within 24 business hours.</p>
                      </div>

                      <div className="typeform-field-group">
                        <label>
                          <span className="field-q-num">3.1</span> Upload CV Document (PDF, DOC, DOCX up to 10MB) *
                        </label>
                        
                        <input 
                          type="file" 
                          id="cvFileInput" 
                          accept=".pdf,.doc,.docx" 
                          className="file-input-hidden" 
                          onChange={handleFileChange} 
                        />

                        <div 
                          className={`dropzone-container modern ${isDragging ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => document.getElementById('cvFileInput')?.click()}
                          role="button"
                          tabIndex={0}
                        >
                          {!selectedFile ? (
                            <div className="dropzone-content">
                              <div className="dropzone-icon-circle">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                  <polyline points="17 8 12 3 7 8" />
                                  <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                              </div>
                              <div className="dropzone-text-block">
                                <h4 className="dropzone-headline">
                                  Drag &amp; drop your CV here, or <span className="browse-pill-btn">Browse Files</span>
                                </h4>
                                <div className="dropzone-format-tags">
                                  <span className="format-tag">PDF</span>
                                  <span className="format-tag">DOC</span>
                                  <span className="format-tag">DOCX</span>
                                  <span className="format-tag-limit">Max 10MB</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="selected-file-preview-card" onClick={(e) => e.stopPropagation()}>
                              <div className="file-icon-box">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <polyline points="14 2 14 8 20 8" />
                                  <line x1="16" y1="13" x2="8" y2="13" />
                                  <line x1="16" y1="17" x2="8" y2="17" />
                                  <polyline points="10 9 9 9 8 9" />
                                </svg>
                              </div>
                              <div className="file-meta-info">
                                <span className="file-title-name" title={selectedFile.name}>{selectedFile.name}</span>
                                <div className="file-status-row">
                                  <span className="file-size-badge">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                                  <span className="file-ready-tag">
                                    <span className="ready-bullet">✓</span> Ready for Screening
                                  </span>
                                </div>
                              </div>
                              <div className="file-actions-cluster">
                                <button 
                                  type="button" 
                                  className="file-replace-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    document.getElementById('cvFileInput')?.click();
                                  }}
                                >
                                  Replace
                                </button>
                                <button 
                                  type="button" 
                                  className="file-delete-btn" 
                                  onClick={handleRemoveFile}
                                  title="Remove file"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="typeform-field-group">
                        <label htmlFor="c_linkedin">
                          <span className="field-q-num">3.2</span> LinkedIn or GitHub Profile (Optional)
                        </label>
                        <div className="input-with-icon">
                          <span className="input-leading-icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                          </span>
                          <input 
                            type="url" 
                            id="c_linkedin" 
                            className="input-pl-icon"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={candidateData.linkedin}
                            onChange={(e) => setCandidateData({ ...candidateData, linkedin: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="typeform-field-group">
                        <label htmlFor="c_notes">
                          <span className="field-q-num">3.3</span> Any specific career goals or target salary range? (Optional)
                        </label>
                        <textarea 
                          id="c_notes" 
                          rows={3} 
                          placeholder="e.g. Seeking Lead Architect contract or perm roles in London / Remote with focus on ITOM..."
                          value={candidateData.notes}
                          onChange={(e) => setCandidateData({ ...candidateData, notes: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="step-action-bar">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => setApplyStep(2)}
                        >
                          <span>← Back</span>
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-primary btn-lg"
                          disabled={isSubmitting}
                          onClick={handleApplyFinalSubmit}
                        >
                          <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application & Join Network'}</span>
                          <span className="btn-key-badge">Enter ↵</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* RIGHT: Live Candidate Profile Preview */}
                <div className="dossier-preview-pane">
                  <div className="dossier-sticky-card">
                    <div className="dossier-header-bar">
                      <div className="dossier-tag">
                        <span className="pulse-dot green"></span>
                        <span>LIVE PROFILE PREVIEW</span>
                      </div>
                      <span className="dossier-serial">REF: DN-2026</span>
                    </div>

                    <div className="dossier-profile-summary">
                      <div className="dossier-avatar-circle">
                        {getInitials(candidateData.name)}
                      </div>
                      <div>
                        <h3 className="dossier-applicant-name">
                          {candidateData.name.trim() || 'Your Full Name'}
                        </h3>
                        <p className="dossier-location-text">
                          📍 {candidateData.location.trim() || 'Location / Remote'}
                        </p>
                      </div>
                    </div>

                    <div className="dossier-role-badge">
                      <span className="role-main-text">{candidateData.role}</span>
                      <span className="role-exp-tag">{candidateData.exp}</span>
                    </div>

                    <div className="dossier-section">
                      <span className="dossier-section-title">Verified Module Competencies ({candidateData.selectedModules.length})</span>
                      <div className="dossier-chips-wrap">
                        {candidateData.selectedModules.length > 0 ? (
                          candidateData.selectedModules.map((m) => (
                            <span key={m} className="dossier-chip">{m}</span>
                          ))
                        ) : (
                          <span className="dossier-empty-hint">Select modules in Step 2</span>
                        )}
                      </div>
                    </div>

                    <div className="dossier-section">
                      <span className="dossier-section-title">CV / Resume Attachment</span>
                      <div className="dossier-file-status">
                        {selectedFile ? (
                          <div className="attached-badge">
                            <span className="check-icon">✓</span>
                            <span>{selectedFile.name}</span>
                          </div>
                        ) : (
                          <span className="pending-badge">Pending attachment in Step 3</span>
                        )}
                      </div>
                    </div>

                    <div className="dossier-footer">
                      <div className="dossier-security-note">
                        <span>🔒 100% Confidential • Developer Vetted</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}
      </main>

      {/* Toast Notification */}
      <div className={`toast-notification ${toastMessage ? 'show' : ''}`} role="alert" aria-live="polite">
        <span className="toast-icon">✓</span>
        <span className="toast-message">{toastMessage}</span>
      </div>

      {/* Typeform Minimalist Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand-logo" onClick={() => handleNavClick('home')} role="button" tabIndex={0} aria-label="DataNavigate Home">
              <LogoIcon size={68} />
            </div>
            <p className="footer-tagline">
              Developer-led ServiceNow & elite enterprise IT talent navigation worldwide.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                <li><button onClick={() => handleNavClick('home')}>Home</button></li>
                <li><button onClick={() => handleNavClick('about')}>About Us</button></li>
                <li><button onClick={() => handleNavClick('services')}>Services</button></li>
                <li><button onClick={() => handleNavClick('contact')}>Contact Us</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Candidate Hub</h4>
              <ul>
                <li><button onClick={() => handleNavClick('apply')}>Submit CV</button></li>
                <li><button onClick={() => handleNavClick('services')}>Vetting Standards</button></li>
                <li><button onClick={() => handleNavClick('home')}>Module Explorer</button></li>
              </ul>
            </div>

            <div className="footer-col footer-connect-col">
              <h4>Connect</h4>
              <p className="footer-connect-desc">
                Engage directly with our talent directors & platform leadership network.
              </p>
              <a 
                href="https://www.linkedin.com/company/datanavigate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="linkedin-icon-link"
                id="footerLinkedInLink"
                aria-label="Follow DataNavigate on LinkedIn"
                title="Follow DataNavigate on LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.5A1.63 1.63 0 0 0 6.23 8.13 1.64 1.64 0 0 0 7.86 9.75a1.64 1.64 0 0 0 1.63-1.62A1.63 1.63 0 0 0 7.86 6.5Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 DataNavigate Limited. Built with conversational precision.</p>
        </div>
      </footer>
    </>
  );
}
