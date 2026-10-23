// ===================================================================
// ANCIENT-ADVANCED INDIA (AAI) — Platform & Learner Management Engine
// Manages: Accounts, Attendance, Feedback Gate, Certificate Generator,
// Institute Booking, NGO Darpan / CSR Audit CSV Export, and 11 Domains
// ===================================================================

const AAI_STORAGE_KEYS = {
  USERS: 'aai_learners_v1',
  INSTITUTES: 'aai_institutes_v1',
  SESSIONS: 'aai_sessions_v1',
  ATTENDANCE: 'aai_attendance_v1',
  FEEDBACK: 'aai_feedback_v1',
  CURRENT_USER: 'aai_current_user_v1',
  LANG: 'aai_lang_v1'
};

// Initial Seed Data for Real Sessions
const DEFAULT_SESSIONS = [
  {
    id: 'AAI-SES-01',
    title: 'AI in Rural Education (Student Edition)',
    title_kn: 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ಮೂಲಕ ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣದ ಪ್ರಗತಿ (ವಿದ್ಯಾರ್ಥಿ ಆವೃತ್ತಿ)',
    domain: 'AI Literacy & Future Careers',
    date: '2026-07-21',
    venue: 'Govt Degree College / Rural Centers, Bidar',
    passcode: 'AAI2026',
    description: 'Demystifying AI, ChatGPT & Gemini as 24/7 personal tutor, KCET/NEET exam preparation, Spoken English, and future tech careers.',
    resources: [
      { name: 'Presentation 1: AI in Rural Education (Kannada & English Slides)', path: 'workshop-materials/presentation-1-ai-in-rural-education.pdf', size: '95 KB' },
      { name: 'AI in Education Workshop Kit & Checklist', path: 'workshop-materials/ai-in-education-workshop-kit.pdf', size: '31 KB' },
      { name: 'Student Prompt Engineering Quick Reference', path: 'workshop-materials/ancient-to-advanced-india-foundational-charter.pdf', size: '29 KB' }
    ]
  },
  {
    id: 'AAI-SES-02',
    title: 'AI for Educators & Institution Management',
    title_kn: 'ಶಿಕ್ಷಕರು ಮತ್ತು ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳಿಗಾಗಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ',
    domain: 'Teacher Enablement & Automation',
    date: '2026-07-28',
    venue: 'Bidar District Education Hub',
    passcode: 'AAI2026',
    description: 'Lesson planning in 15 mins (vs 4 hours), instant question bank generator, rubrics, personalized remedial plans, and institutional AI maturity.',
    resources: [
      { name: 'Presentation 2: AI for Educators Deck (Kannada & English)', path: 'workshop-materials/presentation-2-ai-for-educators-and-institutions.pdf', size: '84 KB' },
      { name: 'Institutional Permission Request Template', path: 'workshop-materials/permission-request-template.pdf', size: '19 KB' }
    ]
  },
  {
    id: 'AAI-SES-03',
    title: 'Agri-Tech & Smart Farming Masterclass',
    title_kn: 'ಕೃಷಿಯಲ್ಲಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪದ್ಧತಿ',
    domain: 'Agriculture & Rural Innovation',
    date: '2026-08-05',
    venue: 'APMC Yard, Aurad (B) / FPO Clusters',
    passcode: 'AAI2026',
    description: 'AI weather forecasts, pest and disease detection apps, soil health monitoring, and direct-to-consumer digital marketing for farmers.',
    resources: [
      { name: 'Video Guide: Proven Models Behind AAI 11 Missions', path: 'workshop-materials/proven-models-11-missions.mp4', size: '3.3 MB' },
      { name: 'AAI Strategic Vision & Agri-Tech Blueprint', path: 'media-gallery/aai-strategic-vision-roadmap-2051.png', size: '7.4 MB' }
    ]
  },
  {
    id: 'AAI-SES-04',
    title: 'Rural Women & Youth Digital Entrepreneurship',
    title_kn: 'ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರು ಮತ್ತು ಯುವಜನರಿಗೆ ಡಿಜಿಟಲ್ ಉದ್ಯಮಶೀಲತೆ',
    domain: 'Grassroots Entrepreneurship & SHG',
    date: '2026-08-12',
    venue: 'Janata Colony Community Hall, Aurad',
    passcode: 'AAI2026',
    description: 'E-commerce for local handicrafts and produce, WhatsApp business tools, digital payments, and AI small business branding.',
    resources: [
      { name: 'CSR Blueprint: Why AAI is the Ultimate Impact Vehicle', path: 'workshop-materials/why-aai-is-ultimate-csr-vehicle.mp4', size: '4.4 MB' },
      { name: 'AAI Foundational Charter & Social Enterprise Kit', path: 'workshop-materials/ancient-to-advanced-india-foundational-charter.pdf', size: '29 KB' }
    ]
  },
  {
    id: 'AAI-SES-05',
    title: 'Smart Villages, Infrastructure & BIM Technology',
    title_kn: 'ಸ್ಮಾರ್ಟ್ ಗ್ರಾಮಗಳು, ಮೂಲಸೌಕರ್ಯ ಮತ್ತು BIM ತಂತ್ರಜ್ಞಾನ',
    domain: 'Civil Infrastructure & Digital Twins',
    date: '2026-08-20',
    venue: 'AAI Innovation Living Lab, Aurad',
    passcode: 'AAI2026',
    description: 'Applying civil engineering, BIM coordination, geospatial mapping, and smart water/road management to rural villages.',
    resources: [
      { name: 'AAI Strategic Vision Roadmap 2051', path: 'media-gallery/aai-strategic-vision-roadmap-2051.png', size: '7.4 MB' }
    ]
  }
];

// Translations dictionary
const I18N = {
  en: {
    portalBadge: 'INNOVATION & LEARNER ECOSYSTEM',
    portalTitle: 'Ancient-Advanced Learning & Impact Platform',
    portalSubtitle: 'Dedicated multi-account portal for rural learners, educational institutions, and partners. Attend sessions, submit feedback to unlock exclusive resources, and earn verifiable certificates.',
    tabOverview: 'Trust & 11 Missions',
    tabLearner: 'Learner Portal',
    tabInstitute: 'Institute Booking',
    tabAdmin: 'Admin & Audit Vault',
    registeredSuccess: 'Registration successful! Welcome to Ancient-Advanced India.',
    loginSuccess: 'Logged in successfully!',
    feedbackUnlocked: 'Feedback received! Session resources unlocked and Certificate is ready.',
    passcodeError: 'Invalid session passcode. Please ask your session coordinator.',
    fillRequired: 'Please fill in all required fields.'
  },
  kn: {
    portalBadge: 'ನಾವೀನ್ಯತೆ ಮತ್ತು ಕಲಿಕಾ ವ್ಯವಸ್ಥೆ',
    portalTitle: 'ಏನ್ಷಿಯಂಟ್-ಅಡ್ವಾನ್ಸ್ಡ್ ಇಂಡಿಯಾ ಕಲಿಕಾ ವೇದಿಕೆ',
    portalSubtitle: 'ಗ್ರಾಮೀಣ ಕಲಿಯುವವರು, ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳು ಮತ್ತು ಪಾಲುದಾರರಿಗಾಗಿ ಮೀಸಲಾದ ಪೋರ್ಟಲ್. ಸೆಷನ್‌ಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿ, ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ.',
    tabOverview: 'ಟ್ರಸ್ಟ್ ಮತ್ತು 11 ಮಿಷನ್‌ಗಳು',
    tabLearner: 'ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್',
    tabInstitute: 'ಸಂಸ್ಥೆಗಳ ನೋಂದಣಿ',
    tabAdmin: 'ಅಡ್ಮಿನ್ ಮತ್ತು ಆಡಿಟ್',
    registeredSuccess: 'ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ! ಏನ್ಷಿಯಂಟ್-ಅಡ್ವಾನ್ಸ್ಡ್ ಇಂಡಿಯಾಗೆ ಸ್ವಾಗತ.',
    loginSuccess: 'ಯಶಸ್ವಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ!',
    feedbackUnlocked: 'ಪ್ರತಿಕ್ರಿಯೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ! ಸಂಪನ್ಮೂಲಗಳು ಅನ್‌ಲಾಕ್ ಆಗಿವೆ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರ ಸಿದ್ಧವಾಗಿದೆ.',
    passcodeError: 'ತಪ್ಪಾದ ಸೆಷನ್ ಪಾಸ್‌ಕೋಡ್. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂಯೋಜಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    fillRequired: 'ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.'
  }
};

// State Manager
class AAIPlatform {
  constructor() {
    this.initStorage();
    this.currentUser = this.load(AAI_STORAGE_KEYS.CURRENT_USER, null);
    this.lang = this.load(AAI_STORAGE_KEYS.LANG, 'en');
    this.activeTab = 'learner';
    this.selectedSessionForFeedback = null;
    this.initDOM();
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  }

  initStorage() {
    if (!this.load(AAI_STORAGE_KEYS.SESSIONS, null)) {
      this.save(AAI_STORAGE_KEYS.SESSIONS, DEFAULT_SESSIONS);
    }
    if (!this.load(AAI_STORAGE_KEYS.USERS, null)) {
      // Seed sample demo learner
      const sampleLearner = {
        id: 'AAI-LRN-2026-001',
        name: 'Aadesh Navade',
        phone: '9341102949',
        aadhaar: '5041-4292-1234',
        role: 'Rural Entrepreneur / Innovator',
        village: 'Aurad (B)',
        district: 'Bidar',
        state: 'Karnataka',
        pin: '1234',
        registeredAt: new Date().toISOString()
      };
      this.save(AAI_STORAGE_KEYS.USERS, [sampleLearner]);
    }
    if (!this.load(AAI_STORAGE_KEYS.INSTITUTES, null)) {
      const sampleInstitute = {
        id: 'AAI-INST-2026-01',
        name: 'Government Degree College',
        category: 'College / University',
        contactPerson: 'Dr. Principal',
        designation: 'Principal',
        email: 'gdc.aurad@karnataka.gov.in',
        phone: '9341102949',
        district: 'Bidar',
        batchSize: 120,
        proposedDate: '2026-07-21',
        track: 'AI in Rural Education (Student Edition)',
        description: 'Comprehensive AI awareness and career roadmap for final year degree students.',
        status: 'Confirmed',
        timestamp: new Date().toISOString()
      };
      this.save(AAI_STORAGE_KEYS.INSTITUTES, [sampleInstitute]);
    }
    if (!this.load(AAI_STORAGE_KEYS.ATTENDANCE, null)) {
      this.save(AAI_STORAGE_KEYS.ATTENDANCE, []);
    }
    if (!this.load(AAI_STORAGE_KEYS.FEEDBACK, null)) {
      this.save(AAI_STORAGE_KEYS.FEEDBACK, []);
    }
  }

  initDOM() {
    this.renderTabs();
    this.renderLanguage();
    this.renderActivePanel();
    this.bindEvents();
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.portal-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const l = e.currentTarget.getAttribute('data-lang');
        this.setLanguage(l);
      });
    });

    // Star rating click handler
    document.addEventListener('click', (e) => {
      if (e.target && e.target.parentElement && e.target.parentElement.id === 'feedback-stars') {
        const star = Number(e.target.getAttribute('data-star'));
        const ratingInput = document.getElementById('feedback-rating-val');
        if (ratingInput) ratingInput.value = star;

        const stars = document.querySelectorAll('#feedback-stars span');
        stars.forEach((s, idx) => {
          s.classList.toggle('selected', idx < star);
        });
      }
    });

    // Feedback form submission handler
    document.addEventListener('submit', (e) => {
      if (e.target && e.target.id === 'session-feedback-form') {
        e.preventDefault();
        const rating = document.getElementById('feedback-rating-val').value;
        const topic = document.getElementById('feedback-topic').value;
        const learnings = document.getElementById('feedback-learnings').value.trim();
        const suggestions = document.getElementById('feedback-suggestions').value.trim();

        if (!learnings) {
          this.toast('Please write what you learned today.');
          return;
        }

        this.submitFeedbackForm(rating, topic, learnings, suggestions);
      }
    });
  }

  setLanguage(l) {
    this.lang = l;
    this.save(AAI_STORAGE_KEYS.LANG, l);
    this.renderLanguage();
    this.renderActivePanel();
  }

  renderLanguage() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.lang);
    });
    const t = I18N[this.lang];
    const badgeEl = document.getElementById('platform-badge-text');
    if (badgeEl) badgeEl.innerText = t.portalBadge;
    const titleEl = document.getElementById('platform-title-text');
    if (titleEl) titleEl.innerText = t.portalTitle;
    const subEl = document.getElementById('platform-subtitle-text');
    if (subEl) subEl.innerText = t.portalSubtitle;
  }

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.portal-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tab);
    });
    document.querySelectorAll('.portal-panel').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-panel') === tab);
    });
    this.renderActivePanel();
  }

  renderTabs() {
    // sync tab buttons
    document.querySelectorAll('.portal-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === this.activeTab);
    });
  }

  renderActivePanel() {
    if (this.activeTab === 'overview') {
      this.renderOverviewPanel();
    } else if (this.activeTab === 'learner') {
      this.renderLearnerPanel();
    } else if (this.activeTab === 'institute') {
      this.renderInstitutePanel();
    } else if (this.activeTab === 'admin') {
      this.renderAdminPanel();
    }
  }

  // ===================================================================
  // 1. OVERVIEW PANEL: 11 MISSIONS FROM TRUST DEED & LEGAL GOVERNANCE
  // ===================================================================
  renderOverviewPanel() {
    const container = document.getElementById('panel-overview');
    if (!container) return;

    container.innerHTML = `
      <div class="portal-grid-3" style="margin-bottom: 2.5rem;">
        <div class="portal-card" style="border-left: 4px solid var(--portal-primary);">
          <div class="mission-num">Article VIII.A & B</div>
          <h3 class="mission-title">AI Literacy & Future Knowledge</h3>
          <p class="mission-desc">Making AI understandable and accessible in Kannada & English. Practical learning with ChatGPT, Gemini, prompt engineering, and vernacular advisory tools for rural schools and colleges.</p>
          <div class="mission-tags">
            <span class="mission-tag">STEM Education</span>
            <span class="mission-tag">Vernacular AI</span>
            <span class="mission-tag">Prompt Labs</span>
          </div>
        </div>

        <div class="portal-card" style="border-left: 4px solid var(--portal-secondary);">
          <div class="mission-num">Article VIII.E</div>
          <h3 class="mission-title">Agriculture & Rural Innovation</h3>
          <p class="mission-desc">Smart farming, AI crop disease detection, localized weather advisories, precision agriculture, and connecting farmer producer organizations (FPOs) directly to digital markets.</p>
          <div class="mission-tags">
            <span class="mission-tag">Precision Agri</span>
            <span class="mission-tag">Weather AI</span>
            <span class="mission-tag">FPO Networks</span>
          </div>
        </div>

        <div class="portal-card" style="border-left: 4px solid var(--portal-success);">
          <div class="mission-num">Article VIII.D & I</div>
          <h3 class="mission-title">Rural Entrepreneurship & Women SHG</h3>
          <p class="mission-desc">Incubating grassroots enterprises, e-commerce training, digital payment literacy, and empowering Women's Self-Help Groups (SHGs) to build sustainable local livelihoods.</p>
          <div class="mission-tags">
            <span class="mission-tag">Micro-Startups</span>
            <span class="mission-tag">Women SHGs</span>
            <span class="mission-tag">Digital Khata</span>
          </div>
        </div>

        <div class="portal-card" style="border-left: 4px solid #8E24AA;">
          <div class="mission-num">Article VIII.F & J</div>
          <h3 class="mission-title">Smart Villages, BIM & Civil Tech</h3>
          <p class="mission-desc">Leveraging Building Information Modeling (BIM), digital twins, geospatial tools, and renewable infrastructure to design clean, resilient, and forward-looking village facilities.</p>
          <div class="mission-tags">
            <span class="mission-tag">BIM Tech</span>
            <span class="mission-tag">Digital Twins</span>
            <span class="mission-tag">Smart Villages</span>
          </div>
        </div>

        <div class="portal-card" style="border-left: 4px solid #E65100;">
          <div class="mission-num">Article VIII.G & J</div>
          <h3 class="mission-title">Frontier Tech & Living Labs</h3>
          <p class="mission-desc">Exposing rural youth to robotics, drones, IoT sensors, spatial computing, and digital manufacturing so villages become technology creators rather than mere consumers.</p>
          <div class="mission-tags">
            <span class="mission-tag">Drone Labs</span>
            <span class="mission-tag">IoT Sensing</span>
            <span class="mission-tag">Maker Spaces</span>
          </div>
        </div>

        <div class="portal-card" style="border-left: 4px solid #00897B;">
          <div class="mission-num">Article VIII.H & XIX</div>
          <h3 class="mission-title">UN SDGs & Institutional Compliance</h3>
          <p class="mission-desc">Aligned with UN SDGs 1, 4, 8, 9 & 10. Fully compliant with NITI Aayog NGO Darpan, Section 135 CSR norms, and transparent banking at Canara Bank (IFSC: CNRB0003868).</p>
          <div class="mission-tags">
            <span class="mission-tag">NGO Darpan</span>
            <span class="mission-tag">CSR Section 135</span>
            <span class="mission-tag">Canara Bank</span>
          </div>
        </div>
      </div>

      <!-- Trust Deed Governance Card -->
      <div class="portal-card" style="background: #FCFBF7; border: 1px dashed var(--portal-border);">
        <div class="portal-card-header">
          <div>
            <h4 style="font-family: var(--font-display, serif); font-size: 1.3rem;">Institutional Legal Charter & Governance Dossier</h4>
            <p style="font-size: 0.88rem; color: var(--portal-gray-600); margin-top: 0.25rem;">Ancient-Advanced India (AAI) Public Charitable Trust • Executed on 08.07.2026 at Aurad (B)</p>
          </div>
          <span class="user-badge user-badge-green">Perpetual Trust • Karnataka</span>
        </div>

        <div class="portal-grid-3" style="font-size: 0.88rem; line-height: 1.6;">
          <div>
            <strong>Registered Office:</strong><br>
            Plot No. 122, APMC Yard, Aurad (B) Village,<br>
            Aurad Taluk, Bidar District,<br>
            Karnataka - 585326.
          </div>
          <div>
            <strong>Founder & President:</strong><br>
            <strong>Mr. Aadesh Navade</strong> (Settlor & Patron)<br>
            <em>Secretary:</em> Jagdish Gorte<br>
            <em>Trustee:</em> Laxmi Rachappa Gorte
          </div>
          <div>
            <strong>Compliance & Banking:</strong><br>
            • Registered under Indian Trusts Act<br>
            • Canara Bank Aurad Branch (IFSC: CNRB0003868)<br>
            • NITI Aayog NGO Darpan Verified<br>
            • Permanent Founder & Heritage Clause (Art. VI & XXV)
          </div>
        </div>
      </div>
    `;
  }

  // ===================================================================
  // 2. LEARNER PORTAL: REGISTRATION, SESSIONS, ATTENDANCE & GATED UNLOCK
  // ===================================================================
  renderLearnerPanel() {
    const container = document.getElementById('panel-learner');
    if (!container) return;

    if (!this.currentUser) {
      // Show Login / Registration View
      container.innerHTML = `
        <div class="portal-grid-2">
          <!-- Individual Learner Registration Form -->
          <div class="portal-card">
            <div class="portal-card-header">
              <h3 class="portal-card-title">New Learner Registration</h3>
              <span class="user-badge user-badge-orange">Free Account</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--portal-gray-600); margin-bottom: 1.25rem;">
              Create your permanent learner account to register for workshops, mark your attendance, unlock training slides, and download certificates.
            </p>
            <form id="learner-reg-form">
              <div class="portal-form-group">
                <label class="portal-label">Full Name <span class="req">*</span></label>
                <input type="text" class="portal-input" id="reg-name" placeholder="As it should appear on certificates" required>
              </div>

              <div class="portal-grid-2" style="gap: 1rem;">
                <div class="portal-form-group">
                  <label class="portal-label">Mobile Number <span class="req">*</span></label>
                  <input type="tel" class="portal-input" id="reg-phone" placeholder="10-digit mobile" maxlength="10" required>
                </div>
                <div class="portal-form-group">
                  <label class="portal-label">4-Digit PIN <span class="req">*</span></label>
                  <input type="password" class="portal-input" id="reg-pin" placeholder="Quick login PIN" maxlength="4" required>
                </div>
              </div>

              <div class="portal-form-group">
                <label class="portal-label">Aadhaar Number <span class="opt">(Optional for Official NGO Darpan / CSR Audit)</span></label>
                <input type="text" class="portal-input" id="reg-aadhaar" placeholder="XXXX-XXXX-XXXX" maxlength="14">
                <p class="portal-help">Optional: Stored securely for government audit and certified beneficiary records.</p>
              </div>

              <div class="portal-grid-2" style="gap: 1rem;">
                <div class="portal-form-group">
                  <label class="portal-label">Category / Role <span class="req">*</span></label>
                  <select class="portal-select" id="reg-role" required>
                    <option value="School / College Student">School / College Student</option>
                    <option value="Farmer / Agri-worker">Farmer / Agri-worker</option>
                    <option value="Teacher / Educator">Teacher / Educator</option>
                    <option value="Rural Youth / Job Seeker">Rural Youth / Job Seeker</option>
                    <option value="Woman Entrepreneur / SHG">Woman Entrepreneur / SHG</option>
                    <option value="Community Member">Community Member</option>
                  </select>
                </div>
                <div class="portal-form-group">
                  <label class="portal-label">Village / Town & District <span class="req">*</span></label>
                  <input type="text" class="portal-input" id="reg-village" placeholder="e.g. Aurad, Bidar" required>
                </div>
              </div>

              <button type="submit" class="p-btn p-btn-primary p-btn-block" style="margin-top: 0.5rem;">
                Create Learner Account
              </button>
            </form>
          </div>

          <!-- Existing Learner Quick Login -->
          <div class="portal-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="portal-card-header">
                <h3 class="portal-card-title">Learner Login</h3>
                <span class="user-badge user-badge-blue">Existing Member</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--portal-gray-600); margin-bottom: 1.5rem;">
                Already registered? Sign in using your mobile number and 4-digit PIN to view your enrolled sessions, submit feedback, and download resource packs.
              </p>
              <form id="learner-login-form">
                <div class="portal-form-group">
                  <label class="portal-label">Registered Mobile Number <span class="req">*</span></label>
                  <input type="tel" class="portal-input" id="login-phone" placeholder="Enter 10-digit number" required>
                </div>
                <div class="portal-form-group">
                  <label class="portal-label">4-Digit PIN <span class="req">*</span></label>
                  <input type="password" class="portal-input" id="login-pin" placeholder="Enter PIN" maxlength="4" required>
                </div>
                <button type="submit" class="p-btn p-btn-secondary p-btn-block">
                  Sign In to Portal
                </button>
              </form>

              <div style="margin-top: 1.5rem; padding: 1rem; background: var(--portal-gray-100); border-radius: 8px; font-size: 0.85rem;">
                <strong>Demo Quick Access:</strong><br>
                Phone: <code>9341102949</code> • PIN: <code>1234</code><br>
                <em>(Or register your own new account in 30 seconds)</em>
              </div>
            </div>

            <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--portal-gray-200); font-size: 0.85rem; color: var(--portal-gray-600);">
              💡 <strong>How it works:</strong> Attend an AAI session → Enter session passcode → Complete 60-second feedback → Download unlocked presentation decks & claim participation certificate!
            </div>
          </div>
        </div>
      `;

      // Form Bindings
      document.getElementById('learner-reg-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLearnerRegistration();
      });

      document.getElementById('learner-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLearnerLogin();
      });
      return;
    }

    // Authenticated Learner Dashboard View
    const users = this.load(AAI_STORAGE_KEYS.USERS, []);
    const sessions = this.load(AAI_STORAGE_KEYS.SESSIONS, DEFAULT_SESSIONS);
    const attendance = this.load(AAI_STORAGE_KEYS.ATTENDANCE, []);
    const feedbacks = this.load(AAI_STORAGE_KEYS.FEEDBACK, []);

    const userAttendance = attendance.filter(a => a.userId === this.currentUser.id);
    const userFeedbacks = feedbacks.filter(f => f.userId === this.currentUser.id);

    container.innerHTML = `
      <!-- User Profile Lockup -->
      <div class="portal-card" style="margin-bottom: 2rem; background: #FFFFFF; border-left: 5px solid var(--portal-secondary);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <h3 style="font-family: var(--font-display, serif); font-size: 1.6rem; color: var(--portal-dark);">${this.currentUser.name}</h3>
              <span class="user-badge user-badge-green">${this.currentUser.role}</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--portal-gray-600);">
              Learner ID: <strong style="font-family: var(--font-mono, monospace);">${this.currentUser.id}</strong> • 
              Mobile: ${this.currentUser.phone} • 
              Location: ${this.currentUser.village}, ${this.currentUser.district}
              ${this.currentUser.aadhaar ? ` • Aadhaar: <span style="font-family: var(--font-mono, monospace);">${this.currentUser.aadhaar}</span> (Verified)` : ''}
            </p>
          </div>
          <div style="display: flex; gap: 0.6rem;">
            <button id="logout-btn" class="p-btn p-btn-outline p-btn-sm">Sign Out</button>
          </div>
        </div>
      </div>

      <!-- Active Sessions & Resource Unlock Workflow -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
        <div>
          <h3 style="font-family: var(--font-display, serif); font-size: 1.4rem; color: var(--portal-dark);">
            Available Training Sessions & Workshops
          </h3>
          <p style="font-size: 0.88rem; color: var(--portal-gray-600);">
            Mark attendance for your session, submit your feedback, and instantly unlock exclusive resource files & certificates.
          </p>
        </div>
      </div>

      <div class="sessions-list">
        ${sessions.map(s => {
          const isAttended = userAttendance.some(a => a.sessionId === s.id);
          const feedbackObj = userFeedbacks.find(f => f.sessionId === s.id);
          const isUnlocked = Boolean(feedbackObj);

          return `
            <div class="session-card ${isAttended ? 'active-session' : ''}">
              <div class="session-header-row">
                <div>
                  <span class="session-id">${s.id}</span>
                  <span class="user-badge ${isUnlocked ? 'user-badge-green' : isAttended ? 'user-badge-orange' : 'user-badge-blue'}" style="margin-left: 0.5rem;">
                    ${isUnlocked ? '🔓 Materials Unlocked' : isAttended ? '⏳ Feedback Required to Unlock' : '📝 Unregistered'}
                  </span>
                </div>
                <div class="session-meta-item" style="font-family: var(--font-mono, monospace); font-size: 0.82rem;">
                  📅 ${s.date}
                </div>
              </div>

              <h4 class="session-title">${this.lang === 'kn' ? (s.title_kn || s.title) : s.title}</h4>
              <p style="font-size: 0.9rem; color: var(--portal-gray-600); margin-bottom: 0.75rem;">${s.description}</p>

              <div class="session-meta">
                <span class="session-meta-item">📍 Venue: <strong>${s.venue}</strong></span>
                <span class="session-meta-item">🏷️ Domain: <strong>${s.domain}</strong></span>
              </div>

              <!-- Workflow Actions -->
              ${!isAttended ? `
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--portal-gray-200);">
                  <input type="text" id="passcode-${s.id}" class="portal-input" placeholder="Enter Session Passcode (e.g. AAI2026)" style="max-width: 280px; padding: 0.55rem 0.8rem; font-size: 0.88rem;">
                  <button class="p-btn p-btn-primary p-btn-sm" onclick="window.aaiApp.markAttendance('${s.id}')">
                    ✓ Mark My Attendance
                  </button>
                </div>
              ` : `
                <div class="gate-box ${isUnlocked ? 'unlocked' : 'locked'}">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>${isUnlocked ? '🎉 Access Granted: Official Resources & Certificate Unlocked' : '🔒 Resources Locked: Please Submit Session Feedback'}</strong>
                    ${isUnlocked ? `
                      <button class="p-btn p-btn-success p-btn-sm" onclick="window.aaiApp.openCertificate('${s.id}')">
                        🎓 View & Download Certificate
                      </button>
                    ` : `
                      <button class="p-btn p-btn-primary p-btn-sm" onclick="window.aaiApp.openFeedbackModal('${s.id}')">
                        ✍️ Give Feedback to Unlock
                      </button>
                    `}
                  </div>

                  ${isUnlocked ? `
                    <div class="resource-list">
                      ${s.resources.map(r => `
                        <div class="resource-item">
                          <span>📄 <strong>${r.name}</strong> <span style="font-size:0.75rem; color: var(--portal-gray-600);">(${r.size})</span></span>
                          <a href="${r.path}" download class="p-btn p-btn-outline p-btn-sm">Download File</a>
                        </div>
                      `).join('')}
                    </div>
                  ` : `
                    <p style="font-size: 0.85rem; margin: 0;">
                      To preserve training integrity and satisfy NGO audit requirements, training slides and official prompt kits are unlocked exclusively for participants who complete the short 60-second session feedback.
                    </p>
                  `}
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
      this.handleLogout();
    });
  }

  handleLearnerRegistration() {
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const pin = document.getElementById('reg-pin').value.trim();
    const aadhaar = document.getElementById('reg-aadhaar').value.trim();
    const role = document.getElementById('reg-role').value;
    const village = document.getElementById('reg-village').value.trim();

    if (!name || !phone || !pin || !village) {
      this.toast('Please fill in all required fields.');
      return;
    }

    const users = this.load(AAI_STORAGE_KEYS.USERS, []);
    if (users.some(u => u.phone === phone)) {
      this.toast('An account with this mobile number already exists. Please log in.');
      return;
    }

    const newUser = {
      id: `AAI-LRN-2026-${String(users.length + 1).padStart(3, '0')}`,
      name,
      phone,
      aadhaar: aadhaar || null,
      role,
      village,
      district: 'Bidar',
      state: 'Karnataka',
      pin,
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    this.save(AAI_STORAGE_KEYS.USERS, users);
    this.currentUser = newUser;
    this.save(AAI_STORAGE_KEYS.CURRENT_USER, newUser);

    this.toast(I18N[this.lang].registeredSuccess);
    this.renderLearnerPanel();
  }

  handleLearnerLogin() {
    const phone = document.getElementById('login-phone').value.trim();
    const pin = document.getElementById('login-pin').value.trim();

    const users = this.load(AAI_STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.phone === phone && u.pin === pin);

    if (!user) {
      this.toast('Invalid mobile number or PIN. Please try again.');
      return;
    }

    this.currentUser = user;
    this.save(AAI_STORAGE_KEYS.CURRENT_USER, user);
    this.toast(I18N[this.lang].loginSuccess);
    this.renderLearnerPanel();
  }

  handleLogout() {
    this.currentUser = null;
    localStorage.removeItem(AAI_STORAGE_KEYS.CURRENT_USER);
    this.renderLearnerPanel();
  }

  markAttendance(sessionId) {
    if (!this.currentUser) return;
    const passcodeEl = document.getElementById(`passcode-${sessionId}`);
    const inputCode = passcodeEl ? passcodeEl.value.trim().toUpperCase() : '';

    const sessions = this.load(AAI_STORAGE_KEYS.SESSIONS, DEFAULT_SESSIONS);
    const session = sessions.find(s => s.id === sessionId);

    if (!session || inputCode !== session.passcode.toUpperCase()) {
      this.toast(I18N[this.lang].passcodeError);
      return;
    }

    const attendance = this.load(AAI_STORAGE_KEYS.ATTENDANCE, []);
    if (!attendance.some(a => a.userId === this.currentUser.id && a.sessionId === sessionId)) {
      attendance.push({
        id: `ATT-${Date.now()}`,
        userId: this.currentUser.id,
        userName: this.currentUser.name,
        userPhone: this.currentUser.phone,
        userAadhaar: this.currentUser.aadhaar || 'N/A',
        userRole: this.currentUser.role,
        userVillage: this.currentUser.village,
        sessionId: session.id,
        sessionTitle: session.title,
        markedAt: new Date().toISOString()
      });
      this.save(AAI_STORAGE_KEYS.ATTENDANCE, attendance);
    }

    this.toast('✓ Attendance verified! Now please submit your session feedback to unlock resources.');
    this.renderLearnerPanel();
  }

  openFeedbackModal(sessionId) {
    this.selectedSessionForFeedback = sessionId;
    const modal = document.getElementById('feedback-modal');
    if (modal) modal.classList.add('show');
  }

  closeFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) modal.classList.remove('show');
    this.selectedSessionForFeedback = null;
  }

  submitFeedbackForm(rating, topic, learnings, suggestions) {
    if (!this.currentUser || !this.selectedSessionForFeedback) return;

    const feedbacks = this.load(AAI_STORAGE_KEYS.FEEDBACK, []);
    const sessions = this.load(AAI_STORAGE_KEYS.SESSIONS, DEFAULT_SESSIONS);
    const session = sessions.find(s => s.id === this.selectedSessionForFeedback);

    const newFeedback = {
      id: `FDBK-${Date.now()}`,
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      userPhone: this.currentUser.phone,
      sessionId: this.selectedSessionForFeedback,
      sessionTitle: session ? session.title : this.selectedSessionForFeedback,
      rating: rating || 5,
      topic: topic || 'All Topics',
      learnings: learnings || 'Very useful',
      suggestions: suggestions || 'None',
      submittedAt: new Date().toISOString(),
      certId: `AAI-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    feedbacks.push(newFeedback);
    this.save(AAI_STORAGE_KEYS.FEEDBACK, feedbacks);

    this.closeFeedbackModal();
    this.toast(I18N[this.lang].feedbackUnlocked);
    this.renderLearnerPanel();
  }

  openCertificate(sessionId) {
    const feedbacks = this.load(AAI_STORAGE_KEYS.FEEDBACK, []);
    const fb = feedbacks.find(f => f.userId === this.currentUser.id && f.sessionId === sessionId);
    const sessions = this.load(AAI_STORAGE_KEYS.SESSIONS, DEFAULT_SESSIONS);
    const session = sessions.find(s => s.id === sessionId);

    const certId = fb ? fb.certId : `AAI-CERT-2026-9999`;
    const dateStr = session ? session.date : new Date().toISOString().slice(0, 10);
    const sessionTitle = session ? session.title : 'AI Training & Future Empowerment';

    const modal = document.getElementById('cert-modal');
    const container = document.getElementById('cert-modal-body');
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="cert-preview-card" id="printable-cert">
        <div class="cert-border-inner">
          <div style="font-family: var(--font-mono, monospace); font-size: 0.75rem; letter-spacing: 0.15em; color: var(--portal-secondary); text-transform: uppercase;">
            ANCIENT-ADVANCED INDIA (AAI) PUBLIC CHARITABLE TRUST
          </div>
          <div style="font-size: 0.75rem; color: var(--portal-gray-600); margin-top: 0.15rem;">
            Reg. No. 08/07/2026 • Aurad (B), Bidar District, Karnataka - 585326
          </div>

          <img src="assets/aai-seal.jpeg" alt="Official Seal" class="cert-seal">

          <h2 style="font-family: var(--font-display, serif); font-size: 1.8rem; color: var(--portal-dark); margin: 0.5rem 0;">
            Certificate of Participation
          </h2>
          <p style="font-size: 0.9rem; color: var(--portal-gray-600);">This is proudly awarded to</p>

          <div class="cert-student-name">${this.currentUser.name}</div>

          <p style="font-size: 0.95rem; color: var(--portal-dark); max-width: 500px; margin: 0.75rem auto; line-height: 1.5;">
            for active participation, successful attendance verification, and feedback contribution in the workshop:
            <br><strong>"${sessionTitle}"</strong>
          </p>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--portal-gray-200); font-size: 0.82rem;">
            <div style="text-align: left;">
              <div><strong>Date:</strong> ${dateStr}</div>
              <div><strong>Certificate ID:</strong> <code>${certId}</code></div>
              <div><strong>Beneficiary ID:</strong> <code>${this.currentUser.id}</code></div>
            </div>
            <div style="text-align: right;">
              <div style="font-family: var(--font-display, serif); font-weight: 700; color: var(--portal-dark);">Aadesh Navade</div>
              <div style="font-size: 0.75rem; color: var(--portal-gray-600);">Founder & President, AAI Trust</div>
              <div style="font-size: 0.7rem; color: var(--portal-primary);">"Aim • Achieve • Inspire"</div>
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1.5rem;">
        <button class="p-btn p-btn-primary" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <button class="p-btn p-btn-outline" onclick="document.getElementById('cert-modal').classList.remove('show')">Close</button>
      </div>
    `;

    modal.classList.add('show');
  }

  // ===================================================================
  // 3. INSTITUTE & ORGANIZATION BOOKING PORTAL
  // ===================================================================
  renderInstitutePanel() {
    const container = document.getElementById('panel-institute');
    if (!container) return;

    container.innerHTML = `
      <div class="portal-grid-2">
        <!-- Institute Registration Form -->
        <div class="portal-card">
          <div class="portal-card-header">
            <h3 class="portal-card-title">Book a Session for Your Institution</h3>
            <span class="user-badge user-badge-green">Free Institutional Program</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--portal-gray-600); margin-bottom: 1.25rem;">
            Colleges, Schools, Panchayats, Farmer Producer Organizations (FPOs), and Women's SHG federations can request on-site AI awareness and skill sessions.
          </p>

          <form id="institute-booking-form">
            <div class="portal-form-group">
              <label class="portal-label">Institution / Organization Name <span class="req">*</span></label>
              <input type="text" class="portal-input" id="inst-name" placeholder="e.g. Government Degree College, Aurad" required>
            </div>

            <div class="portal-grid-2" style="gap: 1rem;">
              <div class="portal-form-group">
                <label class="portal-label">Institution Type <span class="req">*</span></label>
                <select class="portal-select" id="inst-category" required>
                  <option value="College / University">College / University</option>
                  <option value="Government High School / PUC">Government High School / PUC</option>
                  <option value="Farmer Producer Org (FPO)">Farmer Producer Org (FPO)</option>
                  <option value="Gram Panchayat / Local Body">Gram Panchayat / Local Body</option>
                  <option value="Women SHG Federation">Women SHG Federation</option>
                  <option value="Non-Profit / NGO">Non-Profit / NGO</option>
                  <option value="Corporate / CSR Partner">Corporate / CSR Partner</option>
                </select>
              </div>

              <div class="portal-form-group">
                <label class="portal-label">Expected Number of People <span class="req">*</span></label>
                <input type="number" class="portal-input" id="inst-batch" placeholder="e.g. 50, 100, 300" min="10" required>
              </div>
            </div>

            <div class="portal-grid-2" style="gap: 1rem;">
              <div class="portal-form-group">
                <label class="portal-label">Contact Person & Designation <span class="req">*</span></label>
                <input type="text" class="portal-input" id="inst-contact" placeholder="e.g. Dr. Rajesh (Principal / Secretary)" required>
              </div>

              <div class="portal-form-group">
                <label class="portal-label">Official Mobile / WhatsApp <span class="req">*</span></label>
                <input type="tel" class="portal-input" id="inst-phone" placeholder="10-digit number" maxlength="10" required>
              </div>
            </div>

            <div class="portal-grid-2" style="gap: 1rem;">
              <div class="portal-form-group">
                <label class="portal-label">Official Email <span class="req">*</span></label>
                <input type="email" class="portal-input" id="inst-email" placeholder="contact@institution.edu.in" required>
              </div>

              <div class="portal-form-group">
                <label class="portal-label">Proposed Date <span class="req">*</span></label>
                <input type="date" class="portal-input" id="inst-date" required>
              </div>
            </div>

            <div class="portal-form-group">
              <label class="portal-label">Training Track Requested <span class="req">*</span></label>
              <select class="portal-select" id="inst-track" required>
                <option value="AI in Rural Education (Student Edition)">AI in Rural Education (Student Edition - 75 Mins)</option>
                <option value="AI for Educators & Lesson Planning Automation">AI for Educators & Lesson Planning Automation (90 Mins)</option>
                <option value="Agri-Tech, Precision Farming & Crop Decision AI">Agri-Tech, Precision Farming & Crop Decision AI</option>
                <option value="Rural Women Entrepreneurship & Digital Commerce">Rural Women Entrepreneurship & Digital Commerce</option>
                <option value="Smart Villages, Infrastructure & BIM Technology">Smart Villages, Infrastructure & BIM Technology</option>
                <option value="Custom Multidisciplinary Program">Custom Multidisciplinary Program</option>
              </select>
            </div>

            <div class="portal-form-group">
              <label class="portal-label">Session Expectations & Description <span class="req">*</span></label>
              <textarea class="portal-textarea" id="inst-desc" rows="3" placeholder="Describe the background of your participants, lab/projector availability, and any specific topics you wish to cover." required></textarea>
            </div>

            <button type="submit" class="p-btn p-btn-primary p-btn-block">
              Submit Institutional Request
            </button>
          </form>
        </div>

        <!-- Institutional Benefits & Tracking Info -->
        <div class="portal-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="portal-card-header">
              <h3 class="portal-card-title">What AAI Delivers for Institutions</h3>
              <span class="user-badge user-badge-blue">Zero Institutional Fee</span>
            </div>
            
            <ul style="font-size: 0.9rem; color: var(--portal-dark); line-height: 1.7; padding-left: 1.25rem; margin-bottom: 1.5rem;">
              <li><strong>Complete Speaker & Training Deck:</strong> Interactive presentations in Kannada & English tailored to rural colleges and schools.</li>
              <li><strong>Zero Cost Guarantee:</strong> Conducted strictly as public charitable initiatives under AAI Trust Objectives (Article VIII).</li>
              <li><strong>Verifiable Digital Certificates:</strong> Every registered student receiving attendance and feedback verification receives a verifiable certificate.</li>
              <li><strong>Institutional Impact Report:</strong> A formal summary report provided to your management for NAAC, NIRF, or government activity documentation.</li>
              <li><strong>Formal Permission Kit:</strong> Ready-to-print official permission letters and college circular drafts.</li>
            </ul>

            <div style="background: var(--portal-gray-100); padding: 1.25rem; border-radius: 10px;">
              <h4 style="font-size: 0.95rem; margin-bottom: 0.4rem;">Direct WhatsApp Coordination</h4>
              <p style="font-size: 0.85rem; color: var(--portal-gray-600); margin-bottom: 0.75rem;">
                Prefer direct discussion? Speak directly with Chairman Aadesh Navade:
              </p>
              <a href="https://wa.me/919341102949?text=Hello%20AAI%20Trust,%20we%20want%20to%20host%20an%20AI%20session" target="_blank" class="p-btn p-btn-success p-btn-sm">
                💬 WhatsApp: +91 93411 02949
              </a>
            </div>
          </div>

          <div style="margin-top: 2rem; font-size: 0.82rem; color: var(--portal-gray-600); border-top: 1px solid var(--portal-gray-200); padding-top: 1rem;">
            Registered under NITI Aayog NGO Darpan • Canara Bank Aurad IFSC: CNRB0003868
          </div>
        </div>
      </div>
    `;

    document.getElementById('institute-booking-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleInstituteBooking();
    });
  }

  handleInstituteBooking() {
    const name = document.getElementById('inst-name').value.trim();
    const category = document.getElementById('inst-category').value;
    const batch = document.getElementById('inst-batch').value.trim();
    const contact = document.getElementById('inst-contact').value.trim();
    const phone = document.getElementById('inst-phone').value.trim();
    const email = document.getElementById('inst-email').value.trim();
    const date = document.getElementById('inst-date').value;
    const track = document.getElementById('inst-track').value;
    const desc = document.getElementById('inst-desc').value.trim();

    if (!name || !batch || !contact || !phone || !email || !date || !desc) {
      this.toast('Please fill in all required fields.');
      return;
    }

    const institutes = this.load(AAI_STORAGE_KEYS.INSTITUTES, []);
    const newBooking = {
      id: `AAI-INST-2026-${String(institutes.length + 1).padStart(2, '0')}`,
      name,
      category,
      batchSize: Number(batch),
      contactPerson: contact,
      designation: 'Coordinator',
      phone,
      email,
      district: 'Bidar',
      proposedDate: date,
      track,
      description: desc,
      status: 'Pending Confirmation',
      timestamp: new Date().toISOString()
    };

    institutes.push(newBooking);
    this.save(AAI_STORAGE_KEYS.INSTITUTES, institutes);

    this.toast(`🎉 Institutional booking submitted! Application ID: ${newBooking.id}`);
    document.getElementById('institute-booking-form').reset();
  }

  // ===================================================================
  // 4. FOUNDER & ADMIN AUDIT VAULT (NGO DARPAN & CSR REPORTING)
  // ===================================================================
  renderAdminPanel() {
    const container = document.getElementById('panel-admin');
    if (!container) return;

    const users = this.load(AAI_STORAGE_KEYS.USERS, []);
    const institutes = this.load(AAI_STORAGE_KEYS.INSTITUTES, []);
    const attendance = this.load(AAI_STORAGE_KEYS.ATTENDANCE, []);
    const feedbacks = this.load(AAI_STORAGE_KEYS.FEEDBACK, []);
    const sessions = this.load(AAI_STORAGE_KEYS.SESSIONS, DEFAULT_SESSIONS);

    container.innerHTML = `
      <div class="portal-card" style="margin-bottom: 2rem;">
        <div class="portal-card-header">
          <div>
            <h3 class="portal-card-title">NGO Darpan & CSR Audit Console</h3>
            <p style="font-size: 0.88rem; color: var(--portal-gray-600); margin-top: 0.25rem;">
              Verified documentation vault for claiming government grants, CSR funding audits (Companies Act Sec 135), and Income Tax 12A/80G compliance.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="p-btn p-btn-primary p-btn-sm" onclick="window.aaiApp.exportBeneficiaryCSV()">
              📥 Export Beneficiaries (NGO Darpan CSV)
            </button>
            <button class="p-btn p-btn-outline p-btn-sm" onclick="window.aaiApp.exportInstitutesCSV()">
              📥 Export Institutes CSV
            </button>
          </div>
        </div>

        <!-- Metric Counter Grid -->
        <div class="portal-grid-3" style="margin-bottom: 2rem;">
          <div style="background: var(--portal-gray-100); padding: 1.25rem; border-radius: 10px; text-align: center;">
            <div style="font-family: var(--font-display, serif); font-size: 2.2rem; font-weight: 800; color: var(--portal-primary);">${users.length}</div>
            <div style="font-size: 0.85rem; color: var(--portal-gray-600); font-weight: 600;">Registered Individual Learners</div>
          </div>
          <div style="background: var(--portal-gray-100); padding: 1.25rem; border-radius: 10px; text-align: center;">
            <div style="font-family: var(--font-display, serif); font-size: 2.2rem; font-weight: 800; color: var(--portal-secondary);">${attendance.length}</div>
            <div style="font-size: 0.85rem; color: var(--portal-gray-600); font-weight: 600;">Verified Session Attendances</div>
          </div>
          <div style="background: var(--portal-gray-100); padding: 1.25rem; border-radius: 10px; text-align: center;">
            <div style="font-family: var(--font-display, serif); font-size: 2.2rem; font-weight: 800; color: var(--portal-success);">${feedbacks.length}</div>
            <div style="font-size: 0.85rem; color: var(--portal-gray-600); font-weight: 600;">Feedbacks & Certificates Issued</div>
          </div>
        </div>

        <!-- Live Beneficiary Documentation Table -->
        <h4 style="font-family: var(--font-display, serif); font-size: 1.2rem; margin-bottom: 0.5rem;">
          Official Beneficiary Register (Audit Ready)
        </h4>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Learner ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Aadhaar</th>
                <th>Role</th>
                <th>Village</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td><code>${u.id}</code></td>
                  <td><strong>${u.name}</strong></td>
                  <td>${u.phone}</td>
                  <td>${u.aadhaar || '<span style="color:#999;">Not Provided</span>'}</td>
                  <td>${u.role}</td>
                  <td>${u.village}, ${u.district}</td>
                  <td>${u.registeredAt ? u.registeredAt.slice(0, 10) : '2026-07-21'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Institutional Bookings Register -->
        <h4 style="font-family: var(--font-display, serif); font-size: 1.2rem; margin: 2rem 0 0.5rem;">
          Institutional Training Bookings
        </h4>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Institution</th>
                <th>Category</th>
                <th>Contact</th>
                <th>Batch Size</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${institutes.map(inst => `
                <tr>
                  <td><code>${inst.id}</code></td>
                  <td><strong>${inst.name}</strong></td>
                  <td>${inst.category}</td>
                  <td>${inst.contactPerson} (${inst.phone})</td>
                  <td>${inst.batchSize} People</td>
                  <td>${inst.proposedDate}</td>
                  <td><span class="user-badge user-badge-green">${inst.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  exportBeneficiaryCSV() {
    const users = this.load(AAI_STORAGE_KEYS.USERS, []);
    const attendance = this.load(AAI_STORAGE_KEYS.ATTENDANCE, []);
    const feedbacks = this.load(AAI_STORAGE_KEYS.FEEDBACK, []);

    let csv = 'Learner_ID,Full_Name,Phone_Number,Aadhaar_Number,Role_Category,Village,District,Session_Attended,Attendance_Timestamp,Feedback_Rating,Certificate_ID\n';

    users.forEach(u => {
      const userAtt = attendance.find(a => a.userId === u.id);
      const userFb = feedbacks.find(f => f.userId === u.id);

      const sess = userAtt ? `"${userAtt.sessionTitle.replace(/"/g, '""')}"` : 'General Registered';
      const attTime = userAtt ? userAtt.markedAt : 'N/A';
      const rating = userFb ? userFb.rating : 'N/A';
      const cert = userFb ? userFb.certId : 'N/A';

      csv += `"${u.id}","${u.name}","${u.phone}","${u.aadhaar || 'N/A'}","${u.role}","${u.village}","${u.district}",${sess},"${attTime}","${rating}","${cert}"\n`;
    });

    this.downloadCSV(csv, `AAI_Beneficiaries_Audit_${new Date().toISOString().slice(0, 10)}.csv`);
  }

  exportInstitutesCSV() {
    const institutes = this.load(AAI_STORAGE_KEYS.INSTITUTES, []);
    let csv = 'Application_ID,Institution_Name,Category,Contact_Person,Phone,Email,District,Batch_Size,Proposed_Date,Track_Requested,Status\n';

    institutes.forEach(i => {
      csv += `"${i.id}","${i.name}","${i.category}","${i.contactPerson}","${i.phone}","${i.email}","${i.district}","${i.batchSize}","${i.proposedDate}","${i.track}","${i.status}"\n`;
    });

    this.downloadCSV(csv, `AAI_Institutes_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
  }

  downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.toast(`Exported: ${filename}`);
  }

  toast(msg) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();

    const t = document.createElement('div');
    t.className = 'toast-msg';
    t.innerHTML = `<span>ℹ️</span> <span>${msg}</span>`;
    document.body.appendChild(t);

    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 300);
    }, 3800);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.aaiApp = new AAIPlatform();
});
