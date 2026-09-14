'use client';

import React, { useState, useEffect } from 'react';

type ViewType = 'home' | 'about' | 'services' | 'contact' | 'apply';

const MODULES = [
  { code: 'ITSM', name: 'IT Service Management', category: 'it' },
  { code: 'ITOM', name: 'IT Operations Management', category: 'ops' },
  { code: 'GRC', name: 'Governance, Risk & Compliance', category: 'ops' },
  { code: 'HRSD', name: 'HR Service Delivery', category: 'business' },
  { code: 'CSM', name: 'Customer Service Management', category: 'business' },
  { code: 'App Engine', name: 'Custom App Development', category: 'it' },
  { code: 'ITAM', name: 'IT Asset Management', category: 'business' },
  { code: 'HAM', name: 'Hardware Asset Management', category: 'business' },
  { code: 'SAM', name: 'Software Asset Management', category: 'business' },
  { code: 'CMDB', name: 'Configuration Management', category: 'it' },
  { code: 'CSDM', name: 'Common Service Data Model', category: 'it' },
  { code: 'SecOps', name: 'Security Operations', category: 'ops' },
  { code: 'DevOps', name: 'DevOps Integration', category: 'ops' },
  { code: 'IRM', name: 'Integrated Risk Management', category: 'ops' },
  { code: 'SPM', name: 'Strategic Portfolio Management', category: 'business' },
  { code: 'S2P', name: 'Source to Pay', category: 'business' },
];

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [moduleFilter, setModuleFilter] = useState('all');
  const [fileStatus, setFileStatus] = useState('No file selected');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
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
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px',
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const animatableElements = document.querySelectorAll('.scroll-animate');
    animatableElements.forEach((el) => observer.observe(el));

    return () => {
      animatableElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentView, moduleFilter]);

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileStatus(`Selected: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Message transmitted to DataNavigate Limited.');
    (e.target as HTMLFormElement).reset();
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Application & CV submitted to DataNavigate Limited!');
    (e.target as HTMLFormElement).reset();
    setFileStatus('No file selected');
  };

  const filteredModules = moduleFilter === 'all' 
    ? MODULES 
    : MODULES.filter(m => m.category === moduleFilter);

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <div 
        className={`mobile-backdrop ${mobileNavOpen ? 'active' : ''}`}
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Header with Floating Pill Navigation */}
      <header className="site-header">
        <div className="nav-container">
          <div className="brand-logo" onClick={() => handleNavClick('home')}>
            <span className="logo-circle-icon"></span>
            <div>
              <span className="brand-name">DataNavigate</span>
              <span className="brand-sub">LIMITED</span>
            </div>
          </div>

          <div className={`nav-pill-container ${mobileNavOpen ? 'mobile-open' : ''}`}>
            <button className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>Home</button>
            <button className={`nav-link-btn ${currentView === 'about' ? 'active' : ''}`} onClick={() => handleNavClick('about')}>About Us</button>
            <button className={`nav-link-btn ${currentView === 'services' ? 'active' : ''}`} onClick={() => handleNavClick('services')}>Services</button>
            <button className={`nav-link-btn ${currentView === 'contact' ? 'active' : ''}`} onClick={() => handleNavClick('contact')}>Contact</button>
            
            <div className="mobile-drawer-actions">
              <button className="btn btn-mint full-width" onClick={() => handleNavClick('apply')}>
                <span>Submit Your CV ›</span>
              </button>
              <button className="btn btn-outline full-width" onClick={() => handleNavClick('contact')}>
                <span>Request Talent ›</span>
              </button>
            </div>
          </div>

          <button className="btn btn-mint desktop-header-cta" onClick={() => handleNavClick('apply')}>
            <span>Submit CV ›</span>
          </button>

          <button className={`hamburger-btn ${mobileNavOpen ? 'active' : ''}`} onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle Navigation">
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
                <div className="section-tag">
                  <span>DEVELOPER-LED TALENT NAVIGATION</span>
                </div>

                <h1 className="hero-title">
                  Ready to <br />
                  <i>make the switch?</i>
                </h1>

                <p className="hero-subtitle">
                  We cut through AI-generated CV noise to pinpoint ServiceNow professionals who deliver demonstrable business outcomes and architectural excellence.
                </p>

                <div className="hero-actions">
                  <button className="btn btn-mint" onClick={() => handleNavClick('contact')}>
                    <span>Request Talent ›</span>
                  </button>
                  <button className="btn btn-outline" onClick={() => handleNavClick('apply')}>
                    <span>Submit Your CV ›</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="section-container">
              <div className="dual-portal-grid">
                {/* Enterprise Card */}
                <div className="portal-card enterprise-card scroll-animate">
                  <div className="portal-card-header">
                    <div className="portal-tag">ENTERPRISES</div>
                  </div>

                  <h3 className="portal-card-title">
                    Find Certified <br />
                    <i>ServiceNow Experts</i>
                  </h3>

                  <p className="portal-card-desc">
                    Eliminate trial-and-error hiring. Get pre-vetted engineers, architects, and leads evaluated by experienced developers.
                  </p>

                  <button className="btn btn-mint portal-action-btn" onClick={() => handleNavClick('services')}>
                    <span>Explore Enterprise Solutions</span>
                    <span className="btn-arrow-icon">→</span>
                  </button>

                  <div className="portal-card-glow-bg"></div>
                </div>

                {/* Specialist Card */}
                <div className="portal-card specialist-card scroll-animate">
                  <div className="portal-card-header">
                    <div className="portal-tag specialist-tag">SPECIALISTS</div>
                  </div>

                  <h3 className="portal-card-title">
                    Discover High-Impact <br />
                    <i>ServiceNow Roles</i>
                  </h3>

                  <p className="portal-card-desc">
                    Accelerate your career trajectory with premier tech companies looking for true technical mastery, not keyword matches.
                  </p>

                  <button className="btn btn-outline portal-action-btn" onClick={() => handleNavClick('apply')}>
                    <span>Upload Resume & Apply</span>
                    <span className="btn-arrow-icon">→</span>
                  </button>

                  <div className="portal-card-glow-bg alt"></div>
                </div>
              </div>
            </div>

            <div className="section-container">
              <div className="section-header center scroll-animate">
                <span className="section-tag">METHODOLOGY</span>
                <h2>Why DataNavigate <i>Limited?</i></h2>
                <p>We solve traditional recruitment flaws through code-level evaluation and deep industry alignment.</p>
              </div>

              <div className="features-grid">
                <div className="feature-card scroll-animate">
                  <div className="feature-icon">01</div>
                  <h3>Developer-Led Vetting</h3>
                  <p>Our team of technical architects assesses candidates on actual code quality, system architecture depth, and real technical substance.</p>
                </div>

                <div className="feature-card scroll-animate">
                  <div className="feature-icon">02</div>
                  <h3>Proven Business Outcomes</h3>
                  <p>We filter past generic CVs to pinpoint candidates with a verifiable track record of driving ROI and successful ServiceNow rollouts.</p>
                </div>

                <div className="feature-card scroll-animate">
                  <div className="feature-icon">03</div>
                  <h3>Smarter, Faster Velocity</h3>
                  <p>Receive a curated shortlist of high-probability fits within 48 hours, drastically lowering time-to-hire and interview fatigue.</p>
                </div>
              </div>
            </div>

            <div className="section-container">
              <div className="section-header scroll-animate">
                <span className="section-tag">SPECIALIZED CAPABILITIES</span>
                <h2>Expertise Across All ServiceNow <i>Modules</i></h2>
                <p>Click any category to filter specialized talent coverage across the platform ecosystem.</p>
              </div>

              <div className="modules-filter scroll-animate">
                <button className={`filter-chip ${moduleFilter === 'all' ? 'active' : ''}`} onClick={() => setModuleFilter('all')}>All Modules</button>
                <button className={`filter-chip ${moduleFilter === 'it' ? 'active' : ''}`} onClick={() => setModuleFilter('it')}>IT Solutions</button>
                <button className={`filter-chip ${moduleFilter === 'ops' ? 'active' : ''}`} onClick={() => setModuleFilter('ops')}>Operations & Security</button>
                <button className={`filter-chip ${moduleFilter === 'business' ? 'active' : ''}`} onClick={() => setModuleFilter('business')}>Business & Assets</button>
              </div>

              <div className="modules-grid">
                {filteredModules.map((mod, idx) => (
                  <div key={idx} className="module-card scroll-animate">
                    <span className="mod-code">{mod.code}</span>
                    <span className="mod-name">{mod.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-container">
              <div className="section-header center scroll-animate">
                <span className="section-tag">PROVEN IMPACT</span>
                <h2>What Industry Leaders <i>Say</i></h2>
              </div>

              <div className="testimonials-grid">
                <div className="testimonial-card scroll-animate">
                  <div className="quote-icon">“</div>
                  <p className="testimonial-text">"DataNavigate Limited helped us source a top-tier ServiceNow Architect who overhauled our CMDB in record time. Their technical screening is unmatched."</p>
                  <div className="testimonial-author">
                    <h4>Chief Technology Officer</h4>
                    <span>Global Enterprise Tech</span>
                  </div>
                </div>

                <div className="testimonial-card scroll-animate">
                  <div className="quote-icon">“</div>
                  <p className="testimonial-text">"As a candidate, working with DataNavigate was refreshing. They understood my technical background immediately and placed me in a dream lead developer role."</p>
                  <div className="testimonial-author">
                    <h4>ServiceNow Technical Lead</h4>
                    <span>Financial Services Partner</span>
                  </div>
                </div>

                <div className="testimonial-card scroll-animate">
                  <div className="quote-icon">“</div>
                  <p className="testimonial-text">"Professional, rapid, and transparent. They are our exclusive partner for specialized ITOM and SecOps recruitment."</p>
                  <div className="testimonial-author">
                    <h4>VP of Engineering</h4>
                    <span>Cloud Infrastructure Corp</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-container">
              <div className="cta-banner scroll-animate">
                <div className="cta-content">
                  <h2>Ready to <i>make the switch?</i></h2>
                  <p>Connect with our expert developers and talent strategists today.</p>
                </div>
                <div className="cta-actions">
                  <button className="btn btn-mint" onClick={() => handleNavClick('contact')}>Request a Pilot ›</button>
                  <button className="btn btn-outline" onClick={() => handleNavClick('apply')}>Submit CV ›</button>
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
                <span className="section-tag">ABOUT DATANAVIGATE LIMITED</span>
                <h1>Empowering Careers. <i>Driving Growth.</i></h1>
                <p>Your global partner in ServiceNow recruitment, technical talent navigation, and enterprise workforce solutions.</p>
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
                    <div>
                      <span className="mini-number">30+</span>
                      <span className="mini-label">Countries Active</span>
                    </div>
                    <div>
                      <span className="mini-number">80%</span>
                      <span className="mini-label">Repeat Enterprise Clients</span>
                    </div>
                    <div>
                      <span className="mini-number">100%</span>
                      <span className="mini-label">Developer-Vetted Shortlists</span>
                    </div>
                  </div>
                </div>
                <div className="about-graphic-panel scroll-animate">
                  <div className="cyber-card-stack">
                    <div className="stack-card">
                      <span className="stack-title">Developer Vetting Standard</span>
                      <p>Code reviews, system design scenarios, live problem-solving assessments.</p>
                    </div>
                    <div className="stack-card highlight">
                      <span className="stack-title">Quality Over Quantity</span>
                      <p>Precision shortlists over high-volume irrelevant CV blasts.</p>
                    </div>
                    <div className="stack-card">
                      <span className="stack-title">Long-Term Retention</span>
                      <p>Cultural & technical alignment focused on 90-day+ performance success.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-container">
              <div className="section-header center scroll-animate">
                <span className="section-tag">TALENT MATRIX</span>
                <h2>Our Specialist <i>Divisions</i></h2>
              </div>

              <div className="team-pillars-grid">
                <div className="pillar-card scroll-animate">
                  <div className="pillar-icon">⚡</div>
                  <h3>ServiceNow Architecture & Lead Dev</h3>
                  <p>Certified Architects, Lead Engineers, ITSM/ITOM Implementation Specialists.</p>
                </div>

                <div className="pillar-card scroll-animate">
                  <div className="pillar-icon">🛡️</div>
                  <h3>SecOps & Integrated Risk (GRC)</h3>
                  <p>Cybersecurity analysts, SecOps leads, and GRC compliance consultants.</p>
                </div>

                <div className="pillar-card scroll-animate">
                  <div className="pillar-icon">🚀</div>
                  <h3>Full-Stack & Cloud Engineering</h3>
                  <p>Java, Node.js, React/Vue, DevOps pipelines, AWS/Azure cloud specialists.</p>
                </div>

                <div className="pillar-card scroll-animate">
                  <div className="pillar-icon">📊</div>
                  <h3>Data Science & Platform Analytics</h3>
                  <p>BI experts, machine learning engineers, data pipeline architects.</p>
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
                <span className="section-tag">STRATEGIC TALENT SOLUTIONS</span>
                <h1>Strategic Talent & <i>Solutions</i></h1>
                <p>We deliver specialized recruitment and technical consulting to help you scale winning engineering teams.</p>
              </div>
            </div>

            <div className="section-container">
              <div className="services-list-grid">
                <div className="service-detail-card scroll-animate">
                  <div className="service-badge">01</div>
                  <h3>Permanent Talent Acquisition</h3>
                  <p>End-to-end recruitment for high-impact permanent roles. Rigorous technical screening, cultural fit evaluation, and long-term retention support with a 90-day guarantee.</p>
                </div>

                <div className="service-detail-card scroll-animate">
                  <div className="service-badge">02</div>
                  <h3>Contract & Project Staffing</h3>
                  <p>Flexible duration deployment of pre-vetted ServiceNow developers and platform consultants to accelerate immediate project deadlines.</p>
                </div>

                <div className="service-detail-card scroll-animate">
                  <div className="service-badge">03</div>
                  <h3>Executive & Architecture Search</h3>
                  <p>Targeted headhunting for Enterprise Architects, Technical Leads, and Platform Directors who possess rare technical depth.</p>
                </div>

                <div className="service-detail-card scroll-animate">
                  <div className="service-badge">04</div>
                  <h3>ServiceNow Health & Capability Audits</h3>
                  <p>Developer-led reviews of existing platform customisation, CMDB data integrity, and workflow optimization recommendations.</p>
                </div>
              </div>
            </div>

            <div className="section-container">
              <div className="section-header center scroll-animate">
                <span className="section-tag">OUR METHODOLOGY</span>
                <h2>Our Proven <i>5-Step Process</i></h2>
              </div>

              <div className="process-timeline">
                <div className="timeline-step scroll-animate">
                  <div className="step-num">1</div>
                  <h4>Discovery & Requirements</h4>
                  <p>Deep-dive analysis of your stack, culture, and project objectives.</p>
                </div>
                <div className="timeline-step scroll-animate">
                  <div className="step-num">2</div>
                  <h4>Talent Sourcing</h4>
                  <p>Leveraging our global 280,000+ developer ecosystem.</p>
                </div>
                <div className="timeline-step scroll-animate">
                  <div className="step-num">3</div>
                  <h4>Technical Screening</h4>
                  <p>Code reviews & scenario assessments led by active senior devs.</p>
                </div>
                <div className="timeline-step scroll-animate">
                  <div className="step-num">4</div>
                  <h4>Presentation</h4>
                  <p>Shortlist of top 3 vetted candidates with complete technical dossiers.</p>
                </div>
                <div className="timeline-step scroll-animate">
                  <div className="step-num">5</div>
                  <h4>Onboarding & Support</h4>
                  <p>Smooth deployment and ongoing performance check-ins.</p>
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
                <span className="section-tag">GET IN TOUCH</span>
                <h1>Connect With Our <i>Talent Team</i></h1>
                <p>Have a hiring inquiry or ready to start your talent search? We respond within 24 hours.</p>
              </div>
            </div>

            <div className="section-container">
              <div className="contact-wrapper">
                <div className="contact-info-panel scroll-animate">
                  <h2>Direct Communication Channels</h2>
                  <p>Connect with a developer-recruiting specialist to start a productive conversation.</p>

                  <div className="contact-method">
                    <div className="method-icon">✉️</div>
                    <div>
                      <h4>Email Inquiries</h4>
                      <a href="mailto:contact@datanavigate.com" className="contact-link">contact@datanavigate.com</a><br />
                      <a href="mailto:careers@datanavigate.com" className="contact-link">careers@datanavigate.com</a>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">⚡</div>
                    <div>
                      <h4>Global Talent SLA</h4>
                      <p>Shortlists delivered within 48 business hours.</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">🌐</div>
                    <div>
                      <h4>Global Operations</h4>
                      <p>Serving clients & candidates across North America, Europe, Asia Pacific, and EMEA.</p>
                    </div>
                  </div>
                </div>

                <div className="contact-form-panel scroll-animate">
                  <form className="cyber-form" onSubmit={handleContactSubmit}>
                    <h3>Send Us A Message</h3>
                    
                    <div className="form-group">
                      <label htmlFor="cName">Full Name *</label>
                      <input type="text" id="cName" required placeholder="John Doe" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cEmail">Work Email *</label>
                      <input type="email" id="cEmail" required placeholder="john@company.com" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cType">I am a... *</label>
                      <select id="cType" required defaultValue="">
                        <option value="" disabled>Select Option</option>
                        <option value="Employer looking to hire">Employer looking to hire</option>
                        <option value="Candidate seeking roles">Candidate seeking roles</option>
                        <option value="General inquiry">General inquiry</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cMessage">Message / Hiring Needs *</label>
                      <textarea id="cMessage" rows={5} required placeholder="Tell us about the roles or skills you are looking for..."></textarea>
                    </div>

                    <button type="submit" className="btn btn-mint full-width">
                      <span>Send Message ›</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= SUBMIT CV VIEW ================= */}
        {currentView === 'apply' && (
          <section className="spa-view active">
            <div className="page-hero">
              <div className="section-container scroll-animate">
                <span className="section-tag">CANDIDATE PORTAL</span>
                <h1>Submit Your CV & <i>Join Network</i></h1>
                <p>Get matched with high-growth ServiceNow opportunities and premier global engineering teams.</p>
              </div>
            </div>

            <div className="section-container">
              <div className="apply-form-wrapper scroll-animate">
                <form className="cyber-form large" onSubmit={handleApplySubmit}>
                  <div className="form-section-title">
                    <span className="step-badge">1</span>
                    <h3>Personal Details</h3>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="aName">Full Name *</label>
                      <input type="text" id="aName" required placeholder="Sarah Jenkins" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="aEmail">Email Address *</label>
                      <input type="email" id="aEmail" required placeholder="sarah@example.com" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="aPhone">Phone Number *</label>
                      <input type="tel" id="aPhone" required placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="aLocation">Current Location / Country *</label>
                      <input type="text" id="aLocation" required placeholder="e.g. United Kingdom, USA, Remote" />
                    </div>
                  </div>

                  <div className="form-section-title">
                    <span className="step-badge">2</span>
                    <h3>Professional Background</h3>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="aRole">Primary Technical Specialization *</label>
                      <select id="aRole" required defaultValue="">
                        <option value="" disabled>Select Role</option>
                        <option value="ServiceNow Architect">ServiceNow Architect</option>
                        <option value="ServiceNow Senior Developer">ServiceNow Senior Developer</option>
                        <option value="ServiceNow Technical Consultant">ServiceNow Technical Consultant</option>
                        <option value="ServiceNow Business Analyst">ServiceNow Business Analyst</option>
                        <option value="Full-Stack Developer">Full-Stack Developer</option>
                        <option value="DevOps / SecOps Lead">DevOps / SecOps Lead</option>
                        <option value="Other Specialist">Other Specialist</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="aExp">Years of Experience *</label>
                      <select id="aExp" required defaultValue="">
                        <option value="" disabled>Select Experience</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-8 years">5-8 years</option>
                        <option value="8+ years">8+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-section-title">
                    <span className="step-badge">3</span>
                    <h3>Upload Resume / CV</h3>
                  </div>

                  <div className="dropzone-container">
                    <input type="file" id="cvFileInput" accept=".pdf,.doc,.docx" className="file-input-hidden" onChange={handleFileChange} />
                    <div className="dropzone-content" onClick={() => document.getElementById('cvFileInput')?.click()}>
                      <div className="upload-icon">📄</div>
                      <h4>Drag & Drop your CV / Resume here or Browse</h4>
                      <p>Supports PDF, DOC, DOCX (Max 10MB)</p>
                      <div className="file-status">{fileStatus}</div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-mint full-width">
                    <span>Submit Application & CV ›</span>
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Toast Notification */}
      <div className={`toast-notification ${toastMessage ? 'show' : ''}`}>
        <span className="toast-icon">✓</span>
        <span className="toast-message">{toastMessage}</span>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand-logo" onClick={() => handleNavClick('home')}>
              <span className="logo-circle-icon"></span>
              <div>
                <span className="brand-name">datanavigate</span>
                <span className="brand-sub">LIMITED</span>
              </div>
            </div>
            <p className="footer-tagline">Specializing in developer-led ServiceNow & IT talent solutions globally.</p>
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
              <h4>Candidates</h4>
              <ul>
                <li><button onClick={() => handleNavClick('apply')}>Submit CV</button></li>
                <li><button onClick={() => handleNavClick('services')}>Methodology</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 DataNavigate Limited. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
