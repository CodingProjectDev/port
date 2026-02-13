// ============================================
// MOBILE TABS - Renders a full mobile layout
// Dynamically injects mobile tab panels from
// desktop book content so content is never duplicated
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // Only run on mobile viewports
  if (window.innerWidth > 768) return;

  buildMobileLayout();

  // Re-init on orientation change
  window.addEventListener('resize', function () {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-tab-panel')) {
      buildMobileLayout();
    }
  });
});

function buildMobileLayout() {
  const body = document.body;

  // ---- 1. Build mobile wrapper ----
  const wrapper = document.createElement('div');
  wrapper.id = 'mobileLayout';

  // ---- 2. PROFILE TAB ----
  const profilePanel = makePanel('profile', true);
  profilePanel.innerHTML = `
    <div class="mobile-profile">
      <img src="./assets/photo.jpg" alt="Bijay Shrestha" class="mobile-profile-img">
      <h1>Bijay Shrestha</h1>
      <h3>Software Engineer | CS Major | Cyber Security<br>University of North Texas</h3>
      <div class="mobile-social">
        <a href="https://github.com/" target="_blank" rel="noopener" aria-label="GitHub"><i class="bx bxl-github"></i></a>
        <a href="https://www.linkedin.com/in/--/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bx bxl-linkedin"></i></a>
        <a href="https://youtube.com/" target="_blank" rel="noopener" aria-label="YouTube"><i class="bx bxl-youtube"></i></a>
      </div>
    </div>
    <div class="mobile-card mobile-summary-card">
      <h4>Summary</h4>
      <p>
        Computer Science professional with 3–4 years of experience in software design, development, and testing.<br><br>
        • Associate in Science<br>
        • Bachelor in Computer Science<br>
        • Languages: C++, Java, HTML, CSS, JavaScript, PHP, C#, Go<br>
        • Databases: MySQL, Oracle<br>
        • Tools: XCode, Eclipse, VS Code, NetBeans, IntelliJ<br>
        • OS: Unix, Windows, Linux
      </p>
    </div>
    <div class="mobile-btn-row">
      <a href="#" class="btn download-cv">Download CV</a>
      <a href="#" class="btn contact-me-mobile">Contact Me</a>
    </div>
  `;

  // Contact Me button on profile → go to contact tab
  profilePanel.querySelector('.contact-me-mobile')?.addEventListener('click', function (e) {
    e.preventDefault();
    switchTab('contact');
  });

  // ---- 3. EXPERIENCE TAB ----
  const expPanel = makePanel('experience');
  expPanel.innerHTML = `
    <h2 class="mobile-section-title">Work Experience</h2>
    <div class="mobile-card">
      ${timelineItem('2019–2021', 'Hamro Pasal, Fort Worth TX', '<strong>Computer Technician</strong><br>• Installed and configured software/hardware<br>• Supported end users through troubleshooting<br>• Maintained check cashing software<br>• Linked computers to networks and peripherals')}
      ${timelineItem('2022–2023', 'Bank of America / Chase & Co', '<strong>Full Stack Entry-Level</strong><br>• Developed core support tools for computer lab<br>• Built backend with Java, SQL, Oracle DB<br>• Managed secure CRUD operations<br>• Contributed HTML/CSS front-end interfaces')}
      ${timelineItem('2024–Present', 'Tech Technologies – Irving, TX', '<strong>Full Stack Entry-Level</strong><br>• Maintained high-usage lab tools<br>• Java, SQL, Oracle backend development<br>• Improved usability of internal web tools<br>• Testing, debugging, and deployment')}
    </div>
    <h2 class="mobile-section-title">Education</h2>
    <div class="mobile-card">
      ${timelineItem('2014–2016', "Amar Int'l College", '<strong>High School</strong><br>Kathmandu, Nepal — Graduated Dec 2016')}
      ${timelineItem('2018–2021', 'Lake, Dallas College', '<strong>Associate in Science</strong> — GPA: 3.72<br>Irving, Texas — Graduated May 2022')}
      ${timelineItem('2021–2023', 'University of North Texas', '<strong>Bachelor in Computer Science</strong> — GPA: 3.7<br>Denton, Texas — Graduated May 2023<br><em>Coursework: OOP, Algorithms, Data Structures, OS, Databases, Cybersecurity</em>')}
    </div>
  `;

  // ---- 4. EXPERTISE TAB ----
  const expTab = makePanel('expertise');
  expTab.innerHTML = `
    <h2 class="mobile-section-title">My Expertise</h2>
    ${mobileServiceCard('assets/it.png', 'IT Support & Computer Technician',
      ['Technical support for hardware & software', 'System installation and configuration', 'Troubleshooting and problem-solving', 'Network setup and maintenance', 'Data backup and system security', 'User support and training'],
      'Dedicated IT Support Technician with strong troubleshooting abilities and a proven record of maintaining reliable system performance.'
    )}
    ${mobileServiceCard('assets/web.png', 'Full-Stack Web Development',
      ['Front-end: HTML, CSS, JavaScript', 'Back-end: Node.js, Python, PHP', 'Database management (SQL & NoSQL)', 'RESTful API integration', 'Cross-browser compatibility', 'Clean, reusable code'],
      'Skilled Full-Stack Web Developer building scalable, high-performance applications with clean code and seamless integration.'
    )}
    ${mobileServiceCard('assets/security.png', 'Quality Assurance & Maintenance',
      ['System reliability and uptime', 'Thorough testing and inspections', 'Defect identification and resolution', 'Performance monitoring', 'Compliance with standards', 'Minimize downtime'],
      'Detail-oriented QA professional maintaining system integrity and ensuring consistent operational performance.'
    )}
    ${mobileServiceCard('assets/lock.png', 'Security Handling',
      ['Protect systems and data', 'Monitor network activity', 'Detect security threats', 'Implement security protocols', 'Conduct risk assessments', 'Vulnerability testing'],
      'Proactive Cybersecurity professional with expertise in safeguarding networks and enforcing security policies.'
    )}

    <h2 class="mobile-section-title">My Skills</h2>
    <div class="mobile-card">
      ${mobileSkillGroup('Front-end', [
        { icon: 'bxl-html5', name: 'HTML' },
        { icon: 'bxl-css3', name: 'CSS' },
        { icon: 'bxl-javascript', name: 'JS' },
        { icon: 'bxl-angular', name: 'Angular' },
        { icon: 'bxl-react', name: 'React' },
        { icon: 'bxl-bootstrap', name: 'Bootstrap' },
        { icon: 'bxl-tailwind-css', name: 'Tailwind' }
      ])}
      ${mobileSkillGroup('Back-end', [
        { icon: 'bxl-python', name: 'Python' },
        { icon: 'bxl-php', name: 'PHP' },
        { icon: 'bxl-java', name: 'Java' },
        { icon: 'bxl-nodejs', name: 'Node.js' },
        { icon: 'bxl-firebase', name: 'Firebase' }
      ])}
      ${mobileSkillGroup('UI/UX Design', [
        { icon: 'bxl-figma', name: 'Figma' },
        { icon: 'bxl-adobe', name: 'Adobe' }
      ])}
    </div>
  `;

  // Wire up accordion
  expTab.querySelectorAll('.mobile-service-header').forEach(header => {
    header.addEventListener('click', function () {
      const card = this.closest('.mobile-service-card');
      card.classList.toggle('open');
    });
  });

  // ---- 5. PROJECTS TAB ----
  const projPanel = makePanel('projects');
  projPanel.innerHTML = `
    <h2 class="mobile-section-title">Latest Project</h2>
    <div class="mobile-card">
      <img src="./assets/portfolio.jpg" alt="Wedding RSVPs" class="mobile-project-img">
      <h3 class="mobile-project-title">Wedding RSVPs</h3>
      <p class="mobile-project-desc">
        Full-stack Wedding RSVP application with responsive front-end for guest submissions and a secure back-end for data storage, RSVP management, and automated notifications.
      </p>
      <a href="https://wed-rsvps.vercel.app/" target="_blank" rel="noopener" class="mobile-project-link">
        Live Preview <i class="bx bx-link-external"></i>
      </a>
    </div>
  `;

  // ---- 6. CONTACT TAB ----
  const contactPanel = makePanel('contact');
  contactPanel.innerHTML = `
    <h2 class="mobile-section-title">Contact Me</h2>
    <div class="mobile-card">
      <form id="contactFormMobile" class="mobile-form" novalidate>
        <input type="text"  class="field" id="fullNameMobile" placeholder="Full Name"      required autocomplete="name">
        <input type="email" class="field" id="emailMobile"    placeholder="Email Address"  required autocomplete="email">
        <textarea           class="field" id="messageMobile"  placeholder="Your Message"   required rows="7"></textarea>
        <input type="submit" class="btn" value="Send Message">
      </form>
      <div id="formMessageMobile" class="form-message" role="status" aria-live="polite"></div>
    </div>
  `;

  // ---- Append panels ----
  [profilePanel, expPanel, expTab, projPanel, contactPanel].forEach(p => wrapper.appendChild(p));
  body.insertBefore(wrapper, body.firstChild);

  // ---- 7. Wire up bottom nav ----
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      switchTab(this.getAttribute('data-tab'));
    });
  });
}

// ---- Helpers ----

function makePanel(id, active = false) {
  const div = document.createElement('div');
  div.className = 'mobile-tab-panel' + (active ? ' active' : '');
  div.id = `tab-${id}`;
  return div;
}

function switchTab(tabId) {
  document.querySelectorAll('.mobile-tab-panel').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`tab-${tabId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
}

function timelineItem(year, title, desc) {
  return `
    <div class="mobile-timeline-item">
      <span class="year">${year}</span>
      <h2>${title}</h2>
      <p>${desc}</p>
    </div>`;
}

function mobileServiceCard(icon, title, bullets, description) {
  const items = bullets.map(b => `<li>${b}</li>`).join('');
  return `
    <div class="mobile-service-card">
      <div class="mobile-service-header">
        <img src="${icon}" alt="${title}">
        <h3>${title}</h3>
        <i class="bx bx-chevron-down mobile-service-toggle"></i>
      </div>
      <div class="mobile-service-body">
        <ul>${items}</ul>
        <p class="service-description">${description}</p>
      </div>
    </div>`;
}

function mobileSkillGroup(title, skills) {
  const chips = skills.map(s =>
    `<span class="mobile-skill-chip"><i class="bx ${s.icon}"></i>${s.name}</span>`
  ).join('');
  return `
    <div class="mobile-skills-group">
      <h3>${title}</h3>
      <div class="mobile-skills-grid">${chips}</div>
    </div>`;
}