/**
 * Domain-specific resume content configuration.
 * Each domain maps to tailored placeholders, suggestions, skills,
 * certifications, and summary examples used throughout the Resume Builder.
 * Add a new domain object to extend — no Builder logic changes needed.
 */

export interface DomainContent {
  label: string;
  jobTitlePlaceholder: string;
  jobTitleSuggestions: string[];
  summaryPlaceholder: string;
  summaryExamples: string[];
  skillSuggestions: string[];
  softSkillSuggestions: string[];
  certificationSuggestions: string[];
  workDescriptionPlaceholder: string;
  projectPlaceholder: string;
  achievementPlaceholder: string;
  keywordsHint: string;
  interestSuggestions: string[];
}

// ── Fallback / Generic ────────────────────────────────────────────────────────
const generic: DomainContent = {
  label: "General",
  jobTitlePlaceholder: "e.g. Professional Role",
  jobTitleSuggestions: ["Manager", "Analyst", "Coordinator", "Specialist", "Consultant"],
  summaryPlaceholder: "Brief overview of your professional background, key skills, and career goals…",
  summaryExamples: [
    "Results-driven professional with 5+ years of experience delivering high-impact outcomes across multiple disciplines.",
    "Dedicated team player with strong analytical and communication skills, seeking to contribute to organisational growth.",
  ],
  skillSuggestions: ["Communication", "Problem Solving", "Team Collaboration", "Project Management", "MS Office", "Data Analysis", "Critical Thinking", "Adaptability"],
  softSkillSuggestions: ["Leadership", "Time Management", "Attention to Detail", "Initiative", "Flexibility"],
  certificationSuggestions: ["PMP – Project Management Professional", "Six Sigma Green Belt", "Google Analytics Certification"],
  workDescriptionPlaceholder: "Describe your key responsibilities, projects, and measurable achievements in this role…",
  projectPlaceholder: "Describe the project, your role, technologies used, and outcome…",
  achievementPlaceholder: "Award, recognition, or measurable result you're proud of…",
  keywordsHint: "collaboration, strategy, leadership, results, stakeholder",
  interestSuggestions: ["Reading", "Public Speaking", "Community Service", "Travel", "Sports"],
};

// ── IT & Software Development ─────────────────────────────────────────────────
const it: DomainContent = {
  label: "IT & Software Development",
  jobTitlePlaceholder: "e.g. Full Stack Developer, Software Engineer",
  jobTitleSuggestions: ["Software Engineer", "Full Stack Developer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "Mobile Developer", "Cloud Engineer", "QA Engineer"],
  summaryPlaceholder: "e.g. Full-stack engineer with 4+ years building scalable React/Node apps…",
  summaryExamples: [
    "Full-stack software engineer with 5+ years building scalable web applications using React and Node.js. Led a team that shipped a product serving 2M+ users, reducing load time by 60% through architecture improvements.",
    "Passionate mobile developer with expertise in React Native and Flutter. Delivered 8+ production apps with 4.8★ average rating on app stores. Strong background in REST APIs, CI/CD, and Agile workflows.",
    "Cloud engineer with hands-on AWS experience managing infrastructure for 99.9% uptime SLAs. Certified Solutions Architect with a focus on cost optimisation and security best practices.",
  ],
  skillSuggestions: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker", "Git", "REST APIs", "GraphQL", "MongoDB", "PostgreSQL", "CI/CD", "Linux"],
  softSkillSuggestions: ["Problem Solving", "Code Review", "Mentoring", "Agile/Scrum", "Technical Communication"],
  certificationSuggestions: ["AWS Certified Solutions Architect", "Google Cloud Professional", "Microsoft Azure Fundamentals", "Certified Kubernetes Administrator (CKA)", "Oracle Java SE Certification"],
  workDescriptionPlaceholder: "e.g. Developed microservices in Node.js, reduced API latency by 40%, led team of 4 engineers…",
  projectPlaceholder: "e.g. Built a real-time chat app using React, Socket.io and Redis — 10K+ daily users…",
  achievementPlaceholder: "e.g. Reduced deployment time by 70% by implementing a CI/CD pipeline with GitHub Actions…",
  keywordsHint: "scalable, microservices, agile, cloud, API, deployment, performance",
  interestSuggestions: ["Open Source Contribution", "Competitive Programming", "Tech Blogging", "Hackathons", "Gaming"],
};

// ── Nursing & Healthcare ──────────────────────────────────────────────────────
const nursing: DomainContent = {
  label: "Nursing & Healthcare",
  jobTitlePlaceholder: "e.g. Registered Nurse, ICU Nurse, Staff Nurse",
  jobTitleSuggestions: ["Registered Nurse (RN)", "Staff Nurse", "ICU Nurse", "ER Nurse", "Pediatric Nurse", "OR Nurse", "Head Nurse", "Clinical Nurse Specialist"],
  summaryPlaceholder: "e.g. Compassionate RN with 4+ years of critical care experience in high-acuity ICU settings…",
  summaryExamples: [
    "Compassionate Registered Nurse with 5+ years of critical care experience in ICU settings. Skilled in patient monitoring, IV therapy, and rapid response protocols. Consistently maintained 98% patient satisfaction scores.",
    "Dedicated Staff Nurse with strong clinical assessment and medication administration skills. Experienced in coordinating multidisciplinary care teams and patient education across general medicine wards.",
    "Newly qualified nurse with clinical placements in paediatrics, A&E, and surgical wards. BLS/ACLS certified with strong commitment to evidence-based nursing practice and patient-centred care.",
  ],
  skillSuggestions: ["Patient Assessment", "IV Therapy", "Wound Care", "Medication Administration", "BLS/CPR", "ACLS", "EMR/EHR", "Vital Signs Monitoring", "Patient Education", "Catheter Care", "Phlebotomy", "Triage"],
  softSkillSuggestions: ["Empathy", "Clinical Judgement", "Team Collaboration", "Stress Management", "Communication with Patients & Families"],
  certificationSuggestions: ["BLS – Basic Life Support", "ACLS – Advanced Cardiovascular Life Support", "PALS – Paediatric Advanced Life Support", "NLE – Nursing Licensure Exam", "NCLEX-RN"],
  workDescriptionPlaceholder: "e.g. Provided critical care to 8–10 ICU patients per shift, administered IV medications, coordinated with physicians…",
  projectPlaceholder: "e.g. Clinical Internship – Paediatric Ward: Managed patient intake, performed vitals assessments and assisted in minor procedures…",
  achievementPlaceholder: "e.g. Achieved 100% compliance with infection control protocols; reduced ward-acquired infection rate by 15%…",
  keywordsHint: "patient-centred, evidence-based, clinical, triage, multidisciplinary, compassionate",
  interestSuggestions: ["Healthcare Volunteering", "First Aid Training", "Health Awareness Campaigns", "Community Nursing", "Medical Research"],
};

// ── UI/UX & Graphic Design ────────────────────────────────────────────────────
const design: DomainContent = {
  label: "UI/UX & Graphic Design",
  jobTitlePlaceholder: "e.g. UI/UX Designer, Graphic Designer, Product Designer",
  jobTitleSuggestions: ["UI/UX Designer", "Graphic Designer", "Product Designer", "Visual Designer", "Motion Designer", "Brand Designer", "Interaction Designer"],
  summaryPlaceholder: "e.g. Creative UI/UX designer with 4+ years crafting user-centred digital experiences…",
  summaryExamples: [
    "Creative UI/UX designer with 4+ years designing intuitive digital products for mobile and web. Increased user engagement by 35% through data-driven redesigns. Proficient in Figma, Adobe XD, and prototyping.",
    "Brand designer with expertise in visual identity, typography and packaging design. Built brand systems for 20+ clients across fintech, e-commerce and healthcare sectors.",
  ],
  skillSuggestions: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InDesign", "Prototyping", "Wireframing", "User Research", "Design Systems", "Usability Testing", "HTML/CSS basics", "Motion Design", "Canva"],
  softSkillSuggestions: ["Creative Thinking", "Attention to Detail", "Client Communication", "Feedback Receptivity", "Storytelling through Design"],
  certificationSuggestions: ["Google UX Design Certificate", "Interaction Design Foundation", "Adobe Certified Professional", "Figma Professional Certification"],
  workDescriptionPlaceholder: "e.g. Designed end-to-end UX for a mobile banking app; conducted user interviews and usability tests; increased retention by 22%…",
  projectPlaceholder: "e.g. E-commerce Redesign: Led complete UX audit, created 40+ screen wireframes, A/B tested 3 checkout flows…",
  achievementPlaceholder: "e.g. Won regional design competition; portfolio featured on Behance top picks…",
  keywordsHint: "user-centred, pixel-perfect, accessible, responsive, iterative design",
  interestSuggestions: ["Design Competitions", "Illustration", "Photography", "Branding", "Open Source Design"],
};

// ── Business & Management ─────────────────────────────────────────────────────
const business: DomainContent = {
  label: "Business & Management",
  jobTitlePlaceholder: "e.g. Business Analyst, Operations Manager, Product Manager",
  jobTitleSuggestions: ["Business Analyst", "Operations Manager", "Product Manager", "Strategy Consultant", "Business Development Manager", "General Manager", "COO"],
  summaryPlaceholder: "e.g. Strategic business leader with 7+ years driving operational excellence and revenue growth…",
  summaryExamples: [
    "Results-oriented Business Analyst with 5+ years translating complex business requirements into technical solutions. Delivered $2M cost savings through process optimisation across 3 departments.",
    "Dynamic operations manager with a track record of scaling teams and streamlining workflows. Reduced operational costs by 25% through Lean Six Sigma implementation.",
  ],
  skillSuggestions: ["Business Analysis", "Strategic Planning", "P&L Management", "Stakeholder Management", "Process Improvement", "Data Analysis", "Excel/Power BI", "CRM (Salesforce)", "Agile", "Risk Management", "OKR/KPI Setting"],
  softSkillSuggestions: ["Leadership", "Negotiation", "Executive Communication", "Decision Making", "Cross-functional Collaboration"],
  certificationSuggestions: ["PMP – Project Management Professional", "Six Sigma Green/Black Belt", "MBA", "PRINCE2", "Certified Business Analysis Professional (CBAP)"],
  workDescriptionPlaceholder: "e.g. Led cross-functional team of 15 to deliver $5M digital transformation project on time and 10% under budget…",
  projectPlaceholder: "e.g. Market Expansion Strategy: Researched 3 new markets, built financial models, presented to C-suite — resulted in 2 new market entries…",
  achievementPlaceholder: "e.g. Grew department revenue by 40% YoY through new client acquisition strategy…",
  keywordsHint: "ROI, strategic, scalable, stakeholder, revenue growth, operational efficiency",
  interestSuggestions: ["Entrepreneurship", "Public Speaking", "Business Networking", "Reading Business Books", "Mentoring"],
};

// ── Finance & Accounting ──────────────────────────────────────────────────────
const finance: DomainContent = {
  label: "Finance & Accounting",
  jobTitlePlaceholder: "e.g. Financial Analyst, Accountant, CFO",
  jobTitleSuggestions: ["Financial Analyst", "Senior Accountant", "CPA", "Investment Analyst", "Tax Consultant", "Audit Manager", "CFO", "Treasury Analyst"],
  summaryPlaceholder: "e.g. CPA with 6+ years in financial reporting, audit, and GAAP-compliant accounting for $50M+ portfolios…",
  summaryExamples: [
    "Detail-oriented CPA with 6+ years managing financial reporting, audit, and tax for portfolios exceeding $50M. Reduced month-end close cycle by 3 days through process automation.",
    "Financial analyst with expertise in DCF modelling, equity research, and portfolio risk assessment. Delivered actionable insights that improved fund returns by 12%.",
  ],
  skillSuggestions: ["GAAP / IFRS", "Financial Modelling", "Excel / Power BI", "SAP / Oracle", "Tax Preparation", "Audit", "QuickBooks", "Budgeting & Forecasting", "Variance Analysis", "DCF Valuation", "Risk Assessment"],
  softSkillSuggestions: ["Analytical Thinking", "Attention to Detail", "Integrity", "Deadline Management", "Stakeholder Reporting"],
  certificationSuggestions: ["CPA – Certified Public Accountant", "CFA – Chartered Financial Analyst", "ACCA", "CMA – Certified Management Accountant", "CIA – Certified Internal Auditor"],
  workDescriptionPlaceholder: "e.g. Managed $50M accounting portfolio, prepared quarterly GAAP financial statements, coordinated external audit…",
  projectPlaceholder: "e.g. Implemented automated reconciliation process in SAP; saved 10 hours/month in manual work…",
  achievementPlaceholder: "e.g. Identified $500K cost-saving opportunity through variance analysis; implemented within 1 quarter…",
  keywordsHint: "GAAP, IFRS, compliance, audit, financial accuracy, reconciliation",
  interestSuggestions: ["Financial Markets", "Investment Research", "Economics Blogs", "CFA Study Groups", "Business News"],
};

// ── Education & Teaching ──────────────────────────────────────────────────────
const education: DomainContent = {
  label: "Education & Teaching",
  jobTitlePlaceholder: "e.g. High School Teacher, Lecturer, Academic Coordinator",
  jobTitleSuggestions: ["Primary School Teacher", "High School Teacher", "University Lecturer", "Academic Coordinator", "Special Education Teacher", "Curriculum Developer", "Tutor"],
  summaryPlaceholder: "e.g. Dedicated educator with 6+ years fostering student growth through innovative, inclusive teaching methods…",
  summaryExamples: [
    "Passionate educator with 6+ years teaching Mathematics at secondary level. Increased student pass rates by 30% through differentiated instruction and data-driven assessment strategies.",
    "University lecturer with a PhD in Computer Science and 4 years of teaching experience. Published 5 peer-reviewed papers; mentor for 12 final-year research projects.",
  ],
  skillSuggestions: ["Curriculum Development", "Lesson Planning", "Classroom Management", "Student Assessment", "Differentiated Instruction", "Google Classroom", "SMART Board", "Parent Communication", "Special Needs Support", "Bloom's Taxonomy"],
  softSkillSuggestions: ["Patience", "Empathy", "Inspiring Communication", "Adaptability", "Mentoring"],
  certificationSuggestions: ["B.Ed – Bachelor of Education", "TEFL / TESOL Certificate", "CTET – Central Teacher Eligibility Test", "SEN Qualification", "Cambridge Teaching Award"],
  workDescriptionPlaceholder: "e.g. Taught A-level Biology to 120 students, developed project-based units, raised pass rate from 68% to 91%…",
  projectPlaceholder: "e.g. Designed STEM enrichment programme for gifted Year 9 students; 4 students won regional science competition…",
  achievementPlaceholder: "e.g. Awarded 'Teacher of the Year 2023' by school board for outstanding student outcomes…",
  keywordsHint: "student-centred, inclusive, curriculum, assessment, engagement, outcomes",
  interestSuggestions: ["Educational Research", "Child Development", "Creative Writing", "STEM Outreach", "Community Volunteering"],
};

// ── Marketing & Sales ─────────────────────────────────────────────────────────
const marketing: DomainContent = {
  label: "Marketing & Sales",
  jobTitlePlaceholder: "e.g. Marketing Manager, Sales Executive, Growth Analyst",
  jobTitleSuggestions: ["Marketing Manager", "Digital Marketing Specialist", "Sales Executive", "Brand Manager", "Growth Hacker", "Content Strategist", "SEO Analyst", "Account Executive"],
  summaryPlaceholder: "e.g. Data-driven marketing manager with 5+ years growing brand awareness and pipeline revenue…",
  summaryExamples: [
    "Performance marketing manager with 5+ years driving $3M+ revenue through omnichannel campaigns. Grew organic traffic 200% via SEO strategy and reduced CPL by 40% through A/B testing.",
    "Sales professional consistently exceeding quotas by 150%+. Managed 35 enterprise accounts and built a $2.5M annual pipeline through consultative selling and strategic relationship building.",
  ],
  skillSuggestions: ["SEO/SEM", "Google Analytics", "Meta Ads", "HubSpot / Salesforce", "Email Marketing", "Content Strategy", "A/B Testing", "Copywriting", "Social Media Management", "Market Research", "CRM", "Brand Strategy"],
  softSkillSuggestions: ["Persuasion", "Storytelling", "Client Relationship Building", "Data-Driven Decision Making", "Creative Thinking"],
  certificationSuggestions: ["Google Ads Certification", "HubSpot Marketing Certification", "Meta Blueprint", "Google Analytics GA4", "Salesforce Sales Cloud Consultant"],
  workDescriptionPlaceholder: "e.g. Led 12 digital campaigns generating $1.2M revenue, managed $200K monthly ad budget, grew email list by 80K subscribers…",
  projectPlaceholder: "e.g. Product Launch Campaign: Managed full-funnel strategy from awareness to conversion; 250% ROI in 90 days…",
  achievementPlaceholder: "e.g. Increased MQL-to-SQL conversion rate by 35% by redesigning lead nurturing workflow…",
  keywordsHint: "ROI, conversion, engagement, pipeline, brand awareness, growth",
  interestSuggestions: ["Digital Trends", "Podcasting", "Social Media Content", "Entrepreneurship", "Networking Events"],
};

// ── Civil Engineering ─────────────────────────────────────────────────────────
const civil: DomainContent = {
  label: "Civil Engineering",
  jobTitlePlaceholder: "e.g. Civil Engineer, Site Engineer, Structural Engineer",
  jobTitleSuggestions: ["Civil Engineer", "Site Engineer", "Structural Engineer", "Project Manager – Civil", "Geotechnical Engineer", "Transportation Engineer", "Urban Planner"],
  summaryPlaceholder: "e.g. Civil engineer with 5+ years delivering infrastructure projects worth ₹50Cr+, specialising in structural design and site management…",
  summaryExamples: [
    "Civil engineer with 5 years overseeing road and bridge construction projects valued at ₹50Cr+. Proficient in AutoCAD, STAAD Pro and IS code design. PMP certified with a track record of on-time, on-budget delivery.",
    "Structural engineer specialising in RC and steel design. Designed 8 commercial buildings up to G+12 floors. Skilled in ETABS, SAFE and foundation design per IS 456.",
  ],
  skillSuggestions: ["AutoCAD", "STAAD Pro", "ETABS", "Revit", "MS Project", "Structural Design (IS Code)", "Concrete Technology", "Surveying", "Bill of Quantities", "Site Supervision", "Road Design", "Drainage Design"],
  softSkillSuggestions: ["Site Leadership", "Technical Reporting", "Problem Solving", "Safety Compliance", "Cross-team Coordination"],
  certificationSuggestions: ["PMP – Project Management Professional", "LEED Green Associate", "NICMAR Certification", "AutoCAD Certified Professional", "IS/IS Standards Certification"],
  workDescriptionPlaceholder: "e.g. Supervised construction of 2.5 km highway project, managed 30-person crew, ensured IS code compliance…",
  projectPlaceholder: "e.g. Design of G+5 RC residential building — structural analysis, detailing and bar bending schedule…",
  achievementPlaceholder: "e.g. Completed bridge project 3 weeks ahead of schedule saving ₹8L in labour costs…",
  keywordsHint: "structural, compliance, BOQ, site management, IS code, surveying",
  interestSuggestions: ["Smart Cities", "Sustainable Construction", "CAD Design", "Infrastructure Policy", "Site Photography"],
};

// ── Mechanical Engineering ────────────────────────────────────────────────────
const mechanical: DomainContent = {
  label: "Mechanical Engineering",
  jobTitlePlaceholder: "e.g. Mechanical Engineer, Design Engineer, Production Engineer",
  jobTitleSuggestions: ["Mechanical Engineer", "Design Engineer", "Production Engineer", "Maintenance Engineer", "Quality Engineer", "CAD Engineer", "Thermal Engineer"],
  summaryPlaceholder: "e.g. Mechanical engineer with 4+ years in product design and manufacturing, proficient in SolidWorks and GD&T…",
  summaryExamples: [
    "Mechanical engineer with 4+ years designing precision components for automotive OEMs. Proficient in SolidWorks, GD&T and FMEA. Reduced component defect rate by 22% through design optimisation.",
    "Production engineer with Lean Manufacturing expertise. Improved OEE from 68% to 84% by implementing TPM and 5S across 3 production lines.",
  ],
  skillSuggestions: ["SolidWorks", "AutoCAD", "CATIA", "ANSYS", "GD&T", "FMEA", "Lean Manufacturing", "Six Sigma", "CNC Programming", "Hydraulics/Pneumatics", "Thermodynamics", "FEA Analysis"],
  softSkillSuggestions: ["Technical Documentation", "Root Cause Analysis", "Safety Mindset", "Team Leadership", "Precision"],
  certificationSuggestions: ["Six Sigma Green Belt", "Certified Manufacturing Engineer (CMfgE)", "SolidWorks CSWA/CSWP", "ASME Certifications", "ISO 9001 Internal Auditor"],
  workDescriptionPlaceholder: "e.g. Designed 12 sheet metal components using SolidWorks, reduced material waste by 18% through DFM analysis…",
  projectPlaceholder: "e.g. Final Year: Design and fabrication of solar-powered water pump — 30% efficiency improvement over baseline…",
  achievementPlaceholder: "e.g. Patent filed for heat exchanger design innovation that improved thermal efficiency by 15%…",
  keywordsHint: "precision, tolerance, DFM, manufacturing, CAD, quality, thermal",
  interestSuggestions: ["Robotics", "3D Printing", "Formula SAE", "Renewable Energy", "DIY Engineering"],
};

// ── Electrical & Electronics ──────────────────────────────────────────────────
const electrical: DomainContent = {
  label: "Electrical & Electronics",
  jobTitlePlaceholder: "e.g. Electrical Engineer, Embedded Systems Engineer, VLSI Design Engineer",
  jobTitleSuggestions: ["Electrical Engineer", "Electronics Engineer", "Embedded Systems Engineer", "VLSI Design Engineer", "Power Systems Engineer", "Control Systems Engineer", "PCB Design Engineer"],
  summaryPlaceholder: "e.g. Electrical engineer with 3+ years in power systems and embedded firmware development…",
  summaryExamples: [
    "Electrical engineer with 3+ years designing and commissioning power distribution systems for industrial plants. Proficient in AutoCAD Electrical, PLC programming and IEC standards.",
    "Embedded systems engineer with expertise in ARM Cortex-M, RTOS and communication protocols (UART, SPI, I2C, CAN). Delivered 5 IoT product designs from prototype to mass production.",
  ],
  skillSuggestions: ["Circuit Design", "PCB Layout (Altium/Eagle)", "MATLAB/Simulink", "PLC Programming", "AutoCAD Electrical", "Embedded C/C++", "RTOS", "VLSI/VHDL/Verilog", "Power Electronics", "Arduino/Raspberry Pi", "IoT Protocols", "Motor Drives"],
  softSkillSuggestions: ["Systematic Debugging", "Technical Documentation", "Safety Compliance", "Research Orientation", "Team Collaboration"],
  certificationSuggestions: ["IEEE Membership", "Certified Energy Manager (CEM)", "Altium PCB Designer Certification", "Siemens STEP 7 PLC Certification", "CompTIA A+"],
  workDescriptionPlaceholder: "e.g. Designed PCB for industrial IoT sensor node; reduced board size by 40% and power consumption by 25%…",
  projectPlaceholder: "e.g. Smart Home Automation System — ESP32 based, MQTT protocol, mobile app control for 12 devices…",
  achievementPlaceholder: "e.g. Developed firmware that reduced boot time by 60%; selected for company patent application…",
  keywordsHint: "embedded, firmware, PCB, power, IoT, RTOS, schematic",
  interestSuggestions: ["Robotics", "IoT Projects", "Amateur Radio", "Drone Building", "Arduino/Raspberry Pi Tinkering"],
};

// ── Law & Legal ───────────────────────────────────────────────────────────────
const law: DomainContent = {
  label: "Law & Legal",
  jobTitlePlaceholder: "e.g. Advocate, Legal Counsel, Corporate Lawyer",
  jobTitleSuggestions: ["Advocate", "Legal Counsel", "Corporate Lawyer", "Litigation Attorney", "Paralegal", "Legal Analyst", "Compliance Officer", "Notary"],
  summaryPlaceholder: "e.g. Qualified advocate with 5+ years in corporate law, M&A transactions and contract drafting…",
  summaryExamples: [
    "Corporate lawyer with 5+ years advising on M&A transactions, commercial contracts, and regulatory compliance across BFSI and technology sectors. Managed deals worth $200M+ in aggregate.",
    "Litigation attorney with expertise in civil and commercial disputes. Represented clients in 40+ High Court matters with an 85% favourable outcome rate.",
  ],
  skillSuggestions: ["Legal Research", "Contract Drafting", "Litigation", "Due Diligence", "Compliance", "Corporate Law", "Criminal Law", "IP Law", "Legal Writing", "Negotiation", "Court Advocacy", "GDPR/Data Privacy"],
  softSkillSuggestions: ["Analytical Reasoning", "Persuasive Advocacy", "Confidentiality", "Negotiation", "Client Counselling"],
  certificationSuggestions: ["Bar Council Enrollment", "LL.M – Master of Laws", "Certified Compliance Professional (CCEP)", "GDPR Practitioner", "CIPP/E – Certified Information Privacy Professional"],
  workDescriptionPlaceholder: "e.g. Drafted and negotiated 50+ commercial agreements; advised on regulatory compliance for 15 fintech clients…",
  projectPlaceholder: "e.g. Moot Court Competition: Led team to national finals; argued constitutional law before panel of High Court judges…",
  achievementPlaceholder: "e.g. Successfully defended client in complex IP infringement case; awarded damages of ₹2.5Cr…",
  keywordsHint: "compliance, litigation, contract, due diligence, regulatory, advocacy",
  interestSuggestions: ["Legal Aid", "Moot Court", "Policy Research", "Law Reviews", "International Arbitration"],
};

// ── HR ────────────────────────────────────────────────────────────────────────
const hr: DomainContent = {
  label: "Human Resources",
  jobTitlePlaceholder: "e.g. HR Manager, Talent Acquisition Specialist, HRBP",
  jobTitleSuggestions: ["HR Manager", "Talent Acquisition Specialist", "HRBP", "Learning & Development Manager", "Compensation & Benefits Analyst", "HR Generalist", "People Operations Manager"],
  summaryPlaceholder: "e.g. Strategic HR professional with 6+ years building talent pipelines and driving employee engagement initiatives…",
  summaryExamples: [
    "Strategic HR manager with 6+ years designing talent acquisition, onboarding, and performance management frameworks for 500+ employee organisations. Reduced attrition by 18% through targeted engagement programmes.",
    "HRBP with expertise aligning people strategy to business objectives. Led organisational redesign for 3 business units, achieving 25% improvement in team productivity.",
  ],
  skillSuggestions: ["Talent Acquisition", "ATS (Workday/BambooHR)", "Onboarding", "Performance Management", "Learning & Development", "Compensation & Benefits", "Labour Law Compliance", "HRIS", "Diversity & Inclusion", "Conflict Resolution", "Employee Relations"],
  softSkillSuggestions: ["Empathy", "Confidentiality", "Influencing Skills", "Organisational Awareness", "Communication"],
  certificationSuggestions: ["SHRM-CP / SHRM-SCP", "PHR – Professional in Human Resources", "CIPD Level 5", "Workday HCM Certification", "LinkedIn Talent Solutions"],
  workDescriptionPlaceholder: "e.g. Recruited 80+ candidates in FY23 across tech and ops roles; reduced time-to-hire by 22% using structured interviews…",
  projectPlaceholder: "e.g. Implemented new HRIS (BambooHR) for 300-person company — migration completed in 6 weeks, 95% adoption within 1 month…",
  achievementPlaceholder: "e.g. Built graduate recruitment programme from scratch; hired 30 graduates in year 1 with 90% retention after 12 months…",
  keywordsHint: "talent, engagement, retention, onboarding, compliance, HRIS, diversity",
  interestSuggestions: ["People Analytics", "Leadership Coaching", "Organisational Psychology", "DEI Initiatives", "Workforce Planning"],
};

// ── Media & Communication ─────────────────────────────────────────────────────
const media: DomainContent = {
  label: "Media & Communication",
  jobTitlePlaceholder: "e.g. Content Writer, Journalist, Media Producer",
  jobTitleSuggestions: ["Content Writer", "Journalist", "Media Producer", "PR Specialist", "Broadcast Journalist", "Social Media Manager", "Video Editor", "Copywriter"],
  summaryPlaceholder: "e.g. Versatile content strategist with 4+ years producing engaging editorial and multimedia content…",
  summaryExamples: [
    "Award-winning journalist with 5+ years covering technology and business for national publications. Specialise in investigative features and data-driven storytelling reaching 500K+ monthly readers.",
    "Digital content strategist with expertise in SEO writing, video scripting and podcast production. Grew brand blog from 2K to 80K monthly visitors in 18 months.",
  ],
  skillSuggestions: ["Content Writing", "Copywriting", "SEO Writing", "Video Editing (Premiere Pro)", "Adobe Creative Suite", "Social Media Strategy", "Press Release Writing", "CMS (WordPress)", "Podcast Production", "AP/Chicago Style", "Analytics (GA4)"],
  softSkillSuggestions: ["Storytelling", "Research", "Adaptability", "Creative Direction", "Deadline Management"],
  certificationSuggestions: ["Google Analytics GA4", "HubSpot Content Marketing", "NCTJ Journalism Qualification", "Adobe Premiere Pro Certification", "PR Diploma"],
  workDescriptionPlaceholder: "e.g. Produced 3 long-form investigative pieces per month; 2 articles featured in Best-of-Year roundups…",
  projectPlaceholder: "e.g. Launched company podcast — 10K downloads in first 3 months, ranked #4 in industry category…",
  achievementPlaceholder: "e.g. Won National Press Award for Best Digital Feature 2023…",
  keywordsHint: "editorial, engagement, multimedia, reach, audience growth, storytelling",
  interestSuggestions: ["Podcasting", "Photojournalism", "Documentary Films", "Book Reviewing", "Creative Writing"],
};

// ── Hospitality & Tourism ─────────────────────────────────────────────────────
const hospitality: DomainContent = {
  label: "Hospitality & Tourism",
  jobTitlePlaceholder: "e.g. Hotel Manager, Front Office Executive, Tour Coordinator",
  jobTitleSuggestions: ["Hotel Manager", "Front Office Executive", "Food & Beverage Manager", "Tour Coordinator", "Guest Relations Officer", "Events Manager", "Revenue Manager"],
  summaryPlaceholder: "e.g. Hospitality professional with 5+ years delivering exceptional guest experiences across 5-star properties…",
  summaryExamples: [
    "Guest-centric hotel manager with 6+ years leading front office and F&B operations in 5-star properties. Maintained 4.8/5 TripAdvisor rating and increased RevPAR by 18% through yield management.",
    "Events coordinator with expertise in luxury weddings, corporate retreats and MICE events. Successfully managed 60+ events with combined budget of ₹3Cr+.",
  ],
  skillSuggestions: ["Opera PMS", "Revenue Management", "Guest Relations", "F&B Operations", "Event Planning", "Housekeeping Management", "Front Desk Operations", "MICROS POS", "OTA Management", "Upselling", "Complaint Resolution"],
  softSkillSuggestions: ["Guest-Centric Mindset", "Calm Under Pressure", "Cultural Sensitivity", "Team Motivation", "Attention to Detail"],
  certificationSuggestions: ["IHM Diploma in Hotel Management", "Fidelio/Opera PMS Certification", "WSET – Wine & Spirit Education Trust", "Food Safety Level 2 (HACCP)", "Revenue Management Certification"],
  workDescriptionPlaceholder: "e.g. Managed 120-room property, led team of 45 staff, achieved 92% occupancy in peak season…",
  projectPlaceholder: "e.g. Led hotel rebrand and soft opening — coordinated marketing, staff training and OTA listing; hit 85% occupancy within 3 months…",
  achievementPlaceholder: "e.g. Property awarded TripAdvisor Travellers' Choice 2023 under my management tenure…",
  keywordsHint: "guest satisfaction, RevPAR, occupancy, service excellence, PMS, F&B",
  interestSuggestions: ["Travel", "Food Culture", "Wine & Cuisine", "Cultural Tourism", "Sustainable Hospitality"],
};

// ── Science & Research ────────────────────────────────────────────────────────
const science: DomainContent = {
  label: "Science & Research",
  jobTitlePlaceholder: "e.g. Research Scientist, Data Scientist, Lab Analyst",
  jobTitleSuggestions: ["Research Scientist", "Data Scientist", "Lab Analyst", "Postdoctoral Researcher", "Biomedical Scientist", "Environmental Scientist", "Pharmaceutical Scientist"],
  summaryPlaceholder: "e.g. Research scientist with 5+ years in computational biology, 8 peer-reviewed publications, and grant funding experience…",
  summaryExamples: [
    "Research scientist with 5+ years in computational biology. Published 8 peer-reviewed papers (h-index: 6). Secured £200K in research grants from UKRI and Wellcome Trust.",
    "Data scientist with PhD in Statistics. Specialise in ML model development for drug discovery. Proficient in Python, R, and bioinformatics pipelines.",
  ],
  skillSuggestions: ["Python / R", "MATLAB", "Statistical Analysis", "Machine Learning", "Lab Techniques", "PCR / ELISA", "Bioinformatics", "SPSS / SAS", "Scientific Writing", "Grant Writing", "Data Visualisation", "Literature Review"],
  softSkillSuggestions: ["Critical Thinking", "Scientific Rigour", "Research Ethics", "Collaboration", "Science Communication"],
  certificationSuggestions: ["Good Laboratory Practice (GLP)", "Good Clinical Practice (GCP)", "Python for Data Science (Coursera)", "Bioinformatics Specialisation", "Research Ethics Certification"],
  workDescriptionPlaceholder: "e.g. Designed and executed 15+ experiments, analysed datasets of 50K+ data points, co-authored 3 journal articles…",
  projectPlaceholder: "e.g. PhD Research: Developed ML model to predict protein-ligand binding affinity — 92% accuracy, published in Nature Methods…",
  achievementPlaceholder: "e.g. Awarded Best Paper at International Biomedical Conference 2023; research cited 40+ times…",
  keywordsHint: "peer-reviewed, methodology, hypothesis, experimental, reproducible, publication",
  interestSuggestions: ["Science Communication", "Open Access Publishing", "Citizen Science", "Lab Innovation", "Science Outreach"],
};

// ── Logistics & Supply Chain ──────────────────────────────────────────────────
const logistics: DomainContent = {
  label: "Logistics & Supply Chain",
  jobTitlePlaceholder: "e.g. Supply Chain Manager, Logistics Coordinator, Procurement Officer",
  jobTitleSuggestions: ["Supply Chain Manager", "Logistics Coordinator", "Procurement Officer", "Warehouse Manager", "Inventory Analyst", "Operations Manager", "Import/Export Specialist"],
  summaryPlaceholder: "e.g. Supply chain professional with 6+ years optimising end-to-end logistics for FMCG companies…",
  summaryExamples: [
    "Supply chain manager with 6 years optimising end-to-end logistics for FMCG. Reduced lead time by 30% and inventory carrying cost by 20% through demand forecasting and vendor consolidation.",
    "Procurement specialist with expertise in strategic sourcing, contract negotiation, and supplier relationship management. Delivered ₹2Cr in cost savings over 2 years.",
  ],
  skillSuggestions: ["SAP SCM / ERP", "Demand Forecasting", "Inventory Management", "Procurement", "Vendor Management", "Incoterms", "Warehouse Management (WMS)", "Lean / Six Sigma", "Import/Export Compliance", "3PL Management", "KPI Reporting"],
  softSkillSuggestions: ["Negotiation", "Analytical Thinking", "Process Orientation", "Crisis Management", "Supplier Communication"],
  certificationSuggestions: ["CSCMP – Certified Supply Chain Professional", "APICS CPIM", "Six Sigma Green Belt", "SAP SCM Certification", "IATA Logistics Diploma"],
  workDescriptionPlaceholder: "e.g. Managed ₹15Cr annual procurement budget, negotiated 40+ supplier contracts, reduced costs by 12%…",
  projectPlaceholder: "e.g. Implemented WMS across 3 warehouses — reduced picking errors by 35%, improved throughput by 20%…",
  achievementPlaceholder: "e.g. Achieved 99.8% on-time delivery rate for FY23 despite global supply disruptions…",
  keywordsHint: "end-to-end, procurement, vendor, inventory, lead time, cost reduction",
  interestSuggestions: ["Global Trade", "Sustainability in Supply Chain", "Supply Chain Tech", "Procurement Networks", "Operations Research"],
};

// ── Aviation ──────────────────────────────────────────────────────────────────
const aviation: DomainContent = {
  label: "Aviation",
  jobTitlePlaceholder: "e.g. Commercial Pilot, Aircraft Maintenance Engineer, Air Traffic Controller",
  jobTitleSuggestions: ["Commercial Pilot (CPL)", "First Officer", "Aircraft Maintenance Engineer (AME)", "Air Traffic Controller", "Flight Dispatcher", "Cabin Crew", "Aviation Safety Officer"],
  summaryPlaceholder: "e.g. CPL holder with 1500+ flight hours on B737, multi-engine IFR rated, committed to safety and operational excellence…",
  summaryExamples: [
    "Commercial pilot with 2,500+ flight hours on B737/A320 type-rated aircraft. Multi-engine IFR proficient with a clean safety record. Experienced in international operations across 25+ countries.",
    "Aircraft Maintenance Engineer (AME) with DGCA B1.1 licence and 4 years of line maintenance experience on narrowbody aircraft. Proficient in AMOS and CAMP MIS.",
  ],
  skillSuggestions: ["CPL / ATPL", "IFR / VFR", "CRM – Crew Resource Management", "AMOS / CAMP MIS", "Aircraft Systems Knowledge", "Emergency Procedures", "Navigation", "Weather Briefing", "DGCA Regulations", "Aircraft Maintenance", "Avionics"],
  softSkillSuggestions: ["Situational Awareness", "Decision Making Under Pressure", "Team Coordination", "Precision", "Regulatory Compliance"],
  certificationSuggestions: ["CPL / ATPL Licence", "DGCA Type Rating", "AME Licence (B1.1/B2)", "IATA Diplomas", "HUET Certification"],
  workDescriptionPlaceholder: "e.g. Operating B737-800 on domestic routes; 1500 hours PIC; zero safety incidents in tenure…",
  projectPlaceholder: "e.g. Led fuel efficiency initiative resulting in 4% reduction in average fuel burn per sector…",
  achievementPlaceholder: "e.g. Awarded Airline Safety Recognition for reporting 3 critical MEL items that prevented potential AOG…",
  keywordsHint: "safety, IFR, CRM, type-rated, hours, regulatory, maintenance",
  interestSuggestions: ["Aviation Photography", "Flight Simulation", "Aircraft Spotting", "Aerospace Technology", "Meteorology"],
};

// ── Arts & Creative ───────────────────────────────────────────────────────────
const arts: DomainContent = {
  label: "Arts & Creative",
  jobTitlePlaceholder: "e.g. Actor, Musician, Art Director, Creative Director",
  jobTitleSuggestions: ["Art Director", "Creative Director", "Illustrator", "Animator", "Musician", "Performing Artist", "Sculptor", "Fashion Designer"],
  summaryPlaceholder: "e.g. Multidisciplinary artist with 6+ years in commercial illustration, animation and brand storytelling…",
  summaryExamples: [
    "Multidisciplinary artist with 6 years in commercial illustration and animation. Clients include Nike, Penguin Books and BBC. Proficient in Adobe Creative Suite and Procreate.",
    "Fashion designer with expertise in sustainable materials and ethical production. Launched independent label; sold 500+ units in first year via online and pop-up retail.",
  ],
  skillSuggestions: ["Adobe Creative Suite", "Procreate", "Blender 3D", "After Effects", "Illustration", "Typography", "Colour Theory", "Fashion Design", "Textile Knowledge", "Fine Art", "Storyboarding", "Music Production"],
  softSkillSuggestions: ["Creative Vision", "Artistic Direction", "Collaboration", "Portfolio Presentation", "Adaptability"],
  certificationSuggestions: ["BA/BFA in Fine Arts", "Adobe Certified Professional", "Animation Bootcamp Certificate", "Royal Academy Diploma", "Fashion Design Diploma"],
  workDescriptionPlaceholder: "e.g. Created 20-illustration campaign for Nike global launch; managed creative brief through to final artwork delivery…",
  projectPlaceholder: "e.g. Animated short film 'Liminal' — 3-minute 2D animation; screened at 5 international festivals…",
  achievementPlaceholder: "e.g. Won Creative Circle Gold Award for Best Digital Illustration 2023…",
  keywordsHint: "portfolio, creative direction, storytelling, visual, branding, aesthetic",
  interestSuggestions: ["Gallery Visits", "Street Art", "Music", "Film", "Creative Writing"],
};

// ── Retail & Customer Service ─────────────────────────────────────────────────
const retail: DomainContent = {
  label: "Retail & Customer Service",
  jobTitlePlaceholder: "e.g. Retail Manager, Store Supervisor, Customer Service Rep",
  jobTitleSuggestions: ["Retail Manager", "Store Supervisor", "Customer Service Representative", "Visual Merchandiser", "Sales Associate", "Area Manager", "E-commerce Manager"],
  summaryPlaceholder: "e.g. Energetic retail manager with 5+ years leading high-performing teams in fast-paced fashion retail…",
  summaryExamples: [
    "Energetic retail manager with 5+ years driving sales performance and team development for high-street fashion brands. Consistently ranked in top 10% of stores for NPS and conversion rate.",
    "Customer service professional with a passion for creating positive brand experiences. Maintained 97% CSAT score managing 60+ daily customer interactions across omnichannel touchpoints.",
  ],
  skillSuggestions: ["Retail Operations", "POS Systems", "Visual Merchandising", "Stock Management", "Sales Techniques", "KPI Tracking", "Customer Complaints", "Team Scheduling", "Shopify / Magento", "Loss Prevention", "Product Knowledge"],
  softSkillSuggestions: ["Customer Empathy", "Energy & Positivity", "Conflict Resolution", "Coaching & Development", "Adaptability"],
  certificationSuggestions: ["ILM Retail Management", "NVQ Level 3 Retail", "Salesforce Commerce Cloud", "Visual Merchandising Certificate", "Food Safety (if applicable)"],
  workDescriptionPlaceholder: "e.g. Managed flagship store of 20 staff; increased conversion rate from 18% to 26%; achieved £1.2M quarterly target…",
  projectPlaceholder: "e.g. Led store refurbishment and re-merchandise — improved dwell time by 25% and basket size by £12…",
  achievementPlaceholder: "e.g. Ranked #1 store in region for customer satisfaction Q3 2023 — 4.9/5 Google reviews…",
  keywordsHint: "NPS, conversion, basket size, visual, team, customer experience",
  interestSuggestions: ["Fashion & Trends", "Customer Experience Design", "Retail Technology", "E-commerce", "Team Building"],
};

// ── Generic Other ─────────────────────────────────────────────────────────────
const other: DomainContent = generic;

// ── Domain map (keyed by TemplatePicker domain id) ────────────────────────────
export const domainConfigMap: Record<string, DomainContent> = {
  it,
  nursing,
  design,
  business,
  finance,
  law,
  civil,
  mechanical,
  electrical,
  education,
  marketing,
  media,
  hospitality,
  science,
  logistics,
  aviation,
  arts,
  retail,
  hr,
  other,
};

/**
 * Returns the domain-specific content config, or falls back to generic.
 */
export function getDomainConfig(domainId?: string | null): DomainContent {
  if (!domainId) return generic;
  return domainConfigMap[domainId] ?? generic;
}
