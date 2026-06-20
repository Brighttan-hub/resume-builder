import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText, Plus, Clock, Download, Edit, Trash2,
  Star, TrendingUp, Eye, X, ArrowRight, Mail, Phone, MapPin, Sparkles,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { resumeApi, userApi } from "@/lib/api";
import type { ResumeData } from "@shared/api";
import {
  ModernPreview, ClassicPreview, MinimalPreview,
  CreativePreview, ExecutivePreview, ATSPreview,
} from "@/components/ResumeTemplatePreviews";
import { lazy, Suspense } from "react";
const FloatingShapes3D = lazy(() => import("@/components/FloatingShapes3D"));

// ─── Types ───────────────────────────────────────────────────────────────────
interface ExampleResume {
  id: number; title: string; icon: string; role: string; skills: string[];
  sample: {
    name: string; title: string; email: string; phone: string; location: string;
    summary: string;
    experience: { position: string; company: string; duration: string; details: string }[];
    education:  { degree: string; school: string; year: string }[];
    skills: string[];
  };
}
type Tab = "overview" | "templates" | "examples";

// ─── Static data ─────────────────────────────────────────────────────────────
const stats = [
  { label: "Resumes Created", value: "3",   icon: FileText,  color: "from-primary to-secondary" },
  { label: "Profile Views",   value: "128", icon: Eye,       color: "from-secondary to-accent" },
  { label: "Downloads",       value: "24",  icon: Download,  color: "from-accent to-primary" },
  { label: "Job Matches",     value: "47",  icon: TrendingUp,color: "from-primary to-accent" },
];

const resumes = [
  { id: 1, title: "Software Engineer Resume", lastEdited: "2 days ago",  views: 42, rating: 4.5, template: "Modern" },
  { id: 2, title: "Product Manager CV",       lastEdited: "1 week ago",  views: 61, rating: 4.8, template: "Professional" },
  { id: 3, title: "Fullstack Developer",      lastEdited: "3 weeks ago", views: 25, rating: 4.2, template: "Creative" },
];

const templates = [
  { id: 1, name: "Modern",       description: "Bold sidebar with orange accent — great for tech & creative roles",  color: "from-orange-500 to-amber-500",  accent: "#f97316", Preview: ModernPreview,    badge: "Most Popular" },
  { id: 2, name: "Classic",      description: "Timeless header bar layout — trusted by recruiters everywhere",       color: "from-amber-500 to-orange-600",  accent: "#d97706", Preview: ClassicPreview,   badge: "" },
  { id: 3, name: "Minimal",      description: "Clean white space & thin lines — perfect for academia & research",   color: "from-gray-400 to-gray-600",     accent: "#6b7280", Preview: MinimalPreview,   badge: "" },
  { id: 4, name: "Creative",     description: "Diagonal header with sidebar skills — stands out in design roles",   color: "from-orange-600 to-red-500",    accent: "#ea580c", Preview: CreativePreview,  badge: "Eye-Catching" },
  { id: 5, name: "Executive",    description: "Dark premium header — ideal for senior & C-suite positions",         color: "from-stone-600 to-gray-700",    accent: "#57534e", Preview: ExecutivePreview, badge: "Premium" },
  { id: 6, name: "ATS-Ready",    description: "Plain structured layout — maximises ATS keyword matching",           color: "from-amber-600 to-orange-500",  accent: "#b45309", Preview: ATSPreview,       badge: "ATS ✓" },
];

const examples: ExampleResume[] = [
  { id:1, title:"Teacher", icon:"🎓", role:"High School English Teacher", skills:["Curriculum Development","Student Mentoring","Public Speaking"],
    sample:{ name:"Sarah Johnson", title:"High School English Teacher", email:"sarah.johnson@email.com", phone:"(555) 123-4567", location:"New York, NY",
      summary:"Dedicated educator with 8+ years of experience in English literature and composition. Proven track record of improving student engagement through innovative teaching methods and data-driven curriculum design.",
      experience:[{ position:"Senior English Teacher", company:"Lincoln High School", duration:"2019 – Present", details:"Lead AP Literature program for 120+ students annually, increased pass rate by 25%. Developed project-based learning units adopted school-wide." },
                  { position:"English Teacher", company:"Washington Middle School", duration:"2015 – 2019", details:"Developed curriculum standards, mentored 3 junior teachers, and achieved highest student satisfaction scores in department." }],
      education:[{ degree:"M.A. in Education", school:"Columbia University", year:"2015" },{ degree:"B.A. in English", school:"State University", year:"2013" }],
      skills:["Curriculum Development","Student Mentoring","Creative Writing","Public Speaking","Classroom Management","Google Classroom","Assessment Design"] }},
  { id:2, title:"Nurse", icon:"🏥", role:"Registered Nurse – ICU", skills:["Patient Care","Critical Thinking","Trauma Care"],
    sample:{ name:"Michael Chen", title:"Registered Nurse – ICU", email:"michael.chen@email.com", phone:"(555) 234-5678", location:"Los Angeles, CA",
      summary:"Compassionate ICU nurse with 6+ years of critical care experience. Expert in patient monitoring, rapid response, and cross-functional team collaboration in high-acuity environments.",
      experience:[{ position:"Registered Nurse – ICU", company:"City Medical Center", duration:"2018 – Present", details:"Provide critical care to 8–10 patients per shift, coordinate with physicians on treatment plans, and train 5 new nurses annually." },
                  { position:"RN – Emergency Department", company:"County Hospital", duration:"2015 – 2018", details:"Managed triage and acute care, reduced average wait time by 20% through process improvements." }],
      education:[{ degree:"B.S. in Nursing", school:"UCLA", year:"2015" },{ degree:"RN License", school:"California Board of Nursing", year:"2015" }],
      skills:["Patient Care","Medical Equipment","Critical Thinking","EMR Systems","Trauma Care","IV Therapy","ACLS Certified"] }},
  { id:3, title:"Sales Rep", icon:"💼", role:"Senior Sales Representative", skills:["Account Management","Negotiation","CRM Software"],
    sample:{ name:"Jessica Martinez", title:"Senior Sales Representative", email:"jessica.martinez@email.com", phone:"(555) 345-6789", location:"Chicago, IL",
      summary:"Results-driven sales professional with 7+ years in B2B sales. Consistently exceed quotas by 150%+ through strategic account management and consultative selling techniques.",
      experience:[{ position:"Senior Sales Representative", company:"Tech Solutions Inc.", duration:"2019 – Present", details:"Generated $2.5M in annual revenue, managed 35 key accounts, achieved 160% of quota. Developed outbound strategy that increased pipeline by 80%." },
                  { position:"Sales Representative", company:"Business Systems Corp.", duration:"2016 – 2019", details:"Built relationships with Fortune 500 clients, generating $1.2M in revenue and earning top performer award 3 consecutive years." }],
      education:[{ degree:"B.B.A. in Business Administration", school:"University of Illinois", year:"2016" }],
      skills:["Account Management","Negotiation","Salesforce CRM","Presentation Skills","Cold Outreach","Pipeline Management","Client Relations"] }},
  { id:4, title:"Customer Service", icon:"📞", role:"Customer Service Manager", skills:["Team Leadership","Conflict Resolution","Problem Solving"],
    sample:{ name:"David Wilson", title:"Customer Service Manager", email:"david.wilson@email.com", phone:"(555) 456-7890", location:"Houston, TX",
      summary:"Customer-focused leader with 5+ years delivering exceptional service experiences. Proven ability to resolve complex issues, reduce churn, and build high-performing support teams.",
      experience:[{ position:"Customer Service Manager", company:"Global Services Ltd.", duration:"2020 – Present", details:"Manage team of 12 reps, maintain 98% CSAT score, reduced average response time by 35% through workflow automation." },
                  { position:"Senior CS Representative", company:"Premier Support Inc.", duration:"2017 – 2020", details:"Handled 50+ daily inquiries, maintained 95% satisfaction rating, promoted within 18 months." }],
      education:[{ degree:"A.S. in Business", school:"Houston Community College", year:"2017" }],
      skills:["Team Leadership","Conflict Resolution","Communication","Zendesk","Problem Solving","CSAT Optimization","Onboarding"] }},
  { id:5, title:"Software Engineer", icon:"💻", role:"Senior Software Engineer", skills:["React","Node.js","AWS","Docker"],
    sample:{ name:"Alex Kumar", title:"Senior Software Engineer", email:"alex.kumar@email.com", phone:"(555) 567-8901", location:"San Francisco, CA",
      summary:"Full-stack engineer with 8+ years building scalable web applications. Passionate about clean architecture, mentoring junior engineers, and driving performance improvements at scale.",
      experience:[{ position:"Senior Software Engineer", company:"Tech Startup Inc.", duration:"2020 – Present", details:"Led migration to microservices, cut page load by 60%, mentored 4 engineers. Architected real-time notification system serving 2M+ users." },
                  { position:"Software Engineer", company:"Enterprise Systems Co.", duration:"2016 – 2020", details:"Developed full-stack features for 10M+ user platform, improved CI/CD pipeline efficiency by 45%." }],
      education:[{ degree:"B.S. in Computer Science", school:"MIT", year:"2016" }],
      skills:["React","Node.js","TypeScript","Python","AWS","Docker","GraphQL","System Design","PostgreSQL"] }},
  { id:6, title:"Data Analyst", icon:"📊", role:"Senior Data Analyst", skills:["SQL","Python","Tableau","Power BI"],
    sample:{ name:"Emily Rodriguez", title:"Senior Data Analyst", email:"emily.rodriguez@email.com", phone:"(555) 678-9012", location:"Boston, MA",
      summary:"Data-driven analyst with 6+ years transforming raw data into actionable business insights. Delivered 50+ high-impact analyses that influenced product roadmap and saved $500K+ annually.",
      experience:[{ position:"Senior Data Analyst", company:"Analytics Corp.", duration:"2019 – Present", details:"Built executive dashboards in Tableau, identified $500K cost-saving opportunity via churn analysis, mentored 2 junior analysts." },
                  { position:"Data Analyst", company:"Insights Inc.", duration:"2016 – 2019", details:"Analyzed customer behavior across 20+ projects, improved forecast accuracy by 35% using predictive modeling." }],
      education:[{ degree:"M.S. in Data Science", school:"Carnegie Mellon", year:"2016" }],
      skills:["SQL","Python","Tableau","Power BI","Excel","Statistical Analysis","Data Visualization","A/B Testing"] }},
  { id:7, title:"Accountant", icon:"🧮", role:"Senior Accountant", skills:["GAAP","Tax Preparation","Audit","Excel"],
    sample:{ name:"Robert Thompson", title:"Senior Accountant (CPA)", email:"robert.thompson@email.com", phone:"(555) 789-0123", location:"New York, NY",
      summary:"Detail-oriented CPA with 7+ years in financial analysis, audit, and reporting. Expertise in GAAP compliance, tax strategy, and closing financial statements for portfolios exceeding $50M.",
      experience:[{ position:"Senior Accountant", company:"Finance Solutions Ltd.", duration:"2019 – Present", details:"Manage $50M+ accounting portfolio, reduced audit prep time by 25%, implemented automated reconciliation saving 10hrs/month." },
                  { position:"Staff Accountant", company:"Big Four Firm", duration:"2016 – 2019", details:"Completed audits for Fortune 500 clients, maintained error-free financial statements across 3 fiscal years." }],
      education:[{ degree:"B.S. in Accounting", school:"NYU Stern", year:"2016" },{ degree:"CPA License", school:"New York State Board", year:"2017" }],
      skills:["GAAP","Tax Preparation","Audit","QuickBooks","Excel","Financial Modeling","SAP","Month-End Close"] }},
  { id:8, title:"IT Specialist", icon:"🖥️", role:"IT Systems Specialist", skills:["Network Admin","Linux","Cybersecurity"],
    sample:{ name:"Marcus Green", title:"IT Systems Specialist", email:"marcus.green@email.com", phone:"(555) 890-1234", location:"Austin, TX",
      summary:"Certified IT professional with 5+ years managing enterprise infrastructure. Achieved 99.8% system uptime across 200+ endpoints and led multiple cloud migration initiatives.",
      experience:[{ position:"IT Systems Specialist", company:"Enterprise Tech Co.", duration:"2019 – Present", details:"Maintain 200+ systems, achieved 99.8% uptime, reduced ticket resolution time by 40% via self-service portal rollout." },
                  { position:"IT Support Technician", company:"Tech Solutions Inc.", duration:"2016 – 2019", details:"Supported 500+ users, completed network upgrades with zero downtime, earned Employee of the Year 2018." }],
      education:[{ degree:"B.S. in Information Technology", school:"UT Austin", year:"2016" },{ degree:"CompTIA Network+", school:"CompTIA", year:"2017" }],
      skills:["Network Administration","Windows Server","Linux","AWS","Cybersecurity","Active Directory","Ticketing Systems","Python Scripting"] }},
  { id:9, title:"Intern", icon:"🌟", role:"Marketing Intern", skills:["Social Media","Content Writing","Canva"],
    sample:{ name:"Lauren Brooks", title:"Marketing Intern", email:"lauren.brooks@email.com", phone:"(555) 901-2345", location:"Denver, CO",
      summary:"Motivated recent graduate with a strong foundation in digital marketing and brand communication. Eager to apply academic knowledge and internship experience to drive measurable campaign results.",
      experience:[{ position:"Marketing Intern", company:"Digital Marketing Agency", duration:"Jun 2023 – Present", details:"Create weekly social media content (+2K impressions/post), assist with campaign analytics, contributed to 3 client launch campaigns." },
                  { position:"Content Writer Intern", company:"Tech Startup", duration:"Jan – May 2023", details:"Wrote SEO blog posts and email marketing copy, managed subscriber list of 5K, achieved 32% open rate." }],
      education:[{ degree:"B.S. in Marketing", school:"University of Colorado", year:"2023" }],
      skills:["Social Media","Content Writing","Canva","Google Analytics","Microsoft Office","Email Marketing","SEO Basics"] }},
  { id:10, title:"Marketing Manager", icon:"📈", role:"Marketing Manager", skills:["Digital Strategy","Analytics","SEO/SEM"],
    sample:{ name:"Nicole Anderson", title:"Marketing Manager", email:"nicole.anderson@email.com", phone:"(555) 012-3456", location:"Seattle, WA",
      summary:"Strategic marketing leader with 6+ years driving brand growth, digital transformation, and revenue impact. Managed $500K+ budgets and teams of 5+, consistently delivering campaigns above KPI targets.",
      experience:[{ position:"Marketing Manager", company:"Brand Innovations Inc.", duration:"2020 – Present", details:"Led campaigns generating $3M+ revenue, grew social following by 150%, managed $500K annual budget." },
                  { position:"Marketing Specialist", company:"Digital Agency", duration:"2017 – 2020", details:"Developed digital strategies for 15+ clients, increased average engagement by 200% YoY." }],
      education:[{ degree:"M.B.A.", school:"University of Washington Foster School", year:"2017" }],
      skills:["Digital Strategy","Campaign Management","Google Analytics","HubSpot","Team Leadership","Content Strategy","SEO/SEM","Paid Media"] }},
  { id:11, title:"Graphic Designer", icon:"🎨", role:"Senior Graphic Designer", skills:["Adobe CC","Figma","UI/UX Design"],
    sample:{ name:"Tyler Matthews", title:"Senior Graphic Designer", email:"tyler.matthews@email.com", phone:"(555) 123-5678", location:"Portland, OR",
      summary:"Creative graphic designer with 7+ years in brand identity and digital design. Award-winning portfolio spanning visual identity, packaging, web, and interactive media for global brands.",
      experience:[{ position:"Senior Graphic Designer", company:"Creative Studios LLC", duration:"2019 – Present", details:"Led design for 50+ projects, managed creative team of 3, increased client retention by 30% through elevated brand systems." },
                  { position:"Graphic Designer", company:"Marketing Collective", duration:"2016 – 2019", details:"Designed branding, web graphics, and marketing collateral for 20+ clients across tech, retail, and hospitality." }],
      education:[{ degree:"B.F.A. in Graphic Design", school:"Portland State University", year:"2016" }],
      skills:["Adobe Illustrator","Photoshop","InDesign","Figma","UI/UX Design","Branding","Typography","Motion Graphics"] }},
  { id:12, title:"Project Manager", icon:"📋", role:"Senior Project Manager", skills:["Agile/Scrum","Risk Management","Jira"],
    sample:{ name:"Patricia Lee", title:"Senior Project Manager (PMP)", email:"patricia.lee@email.com", phone:"(555) 234-6789", location:"Miami, FL",
      summary:"Certified PMP with 8+ years leading cross-functional teams to deliver complex enterprise projects on time and under budget. Expert in Agile transformation, stakeholder alignment, and risk mitigation.",
      experience:[{ position:"Senior Project Manager", company:"Enterprise Solutions Group", duration:"2019 – Present", details:"Managed 10+ projects with $5M+ combined budget, achieved 95% on-time delivery, led Agile transformation for 3 teams." },
                  { position:"Project Manager", company:"Technology Consultants Inc.", duration:"2015 – 2019", details:"Improved team velocity by 40% through Scrum adoption, delivered 8 projects with zero scope creep incidents." }],
      education:[{ degree:"M.B.A.", school:"Florida International University", year:"2015" },{ degree:"PMP Certification", school:"Project Management Institute", year:"2016" }],
      skills:["Project Planning","Agile/Scrum","Risk Management","Jira","Confluence","Stakeholder Management","Budget Control","Change Management"] }},
];

// ─── Map example id → domain + template for builder pre-fill ─────────────────
const exampleMeta: Record<number, { domain: string; template: string }> = {
  1:  { domain: "education", template: "classic"   },   // Teacher
  2:  { domain: "nursing",   template: "modern"    },   // Nurse
  3:  { domain: "business",  template: "executive" },   // Sales Rep
  4:  { domain: "business",  template: "classic"   },   // Customer Service
  5:  { domain: "it",        template: "modern"    },   // Software Engineer
  6:  { domain: "science",   template: "minimal"   },   // Data Analyst
  7:  { domain: "finance",   template: "executive" },   // Accountant
  8:  { domain: "it",        template: "ats"        },  // IT Specialist
  9:  { domain: "marketing", template: "creative"  },   // Intern
  10: { domain: "marketing", template: "modern"    },   // Marketing Manager
  11: { domain: "design",    template: "creative"  },   // Graphic Designer
  12: { domain: "business",  template: "executive" },   // Project Manager
};
function ResumeModal({ ex, onClose }: { ex: ExampleResume; onClose: () => void }) {
  const navigate = useNavigate();
  const s = ex.sample;
  const meta = exampleMeta[ex.id] ?? { domain: "other", template: "modern" };

  const handleUseTemplate = () => {
    const draft = {
      templateId: meta.template,
      domain: meta.domain,
      withPhoto: false,
      layoutColumns: "one-col",
      experienceLevel: "five-years",
      fd: {
        fullName: "", email: "", phone: s.phone ?? "",
        location: s.location ?? "", jobTitle: s.title ?? "",
        summary: s.summary ?? "", website: "", linkedin: "", github: "",
      },
      workList: s.experience.map((e, i) => ({
        id: `w${i+1}`, company: e.company, position: e.position,
        startDate: e.duration?.split("–")[0]?.trim() ?? "",
        endDate: e.duration?.split("–")[1]?.trim() ?? "",
        current: (e.duration ?? "").toLowerCase().includes("present"),
        description: e.details ?? "", achievements: "",
      })),
      eduList: s.education.map((e, i) => ({
        id: `ed${i+1}`, institution: e.school, degree: e.degree,
        field: "", startYear: "", endYear: e.year ?? "", gpa: "", activities: "",
      })),
      skills: s.skills,
      softSkills: [], languages: [], interests: [],
      projects: [{ id:"p1", name:"", role:"", tech:"", description:"", link:"" }],
      certs: [{ id:"c1", name:"", issuer:"", date:"", credentialId:"" }],
      achievements: [{ id:"a1", title:"", description:"", year:"" }],
      refs: [{ id:"r1", name:"", title:"", company:"", email:"", phone:"" }],
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("rp_draft", JSON.stringify(draft));
    localStorage.setItem("rp_example_prefill", "1");
    onClose();
    navigate(`/create-resume?domain=${meta.domain}&template=${meta.template}&prefill=1`);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-background border border-foreground/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-primary to-secondary p-6 rounded-t-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/30 rounded-lg smooth-transition">
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{ex.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-white">{s.name}</h2>
                <p className="text-white/80 text-sm">{s.title}</p>
              </div>
              <span className="ml-auto mr-8 flex items-center gap-1 text-xs bg-white/20 px-2.5 py-1 rounded-full text-white">
                <Sparkles className="w-3 h-3" /> AI Generated
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-white/70 text-xs mt-3">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{s.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{s.phone}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{s.location}</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Summary */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Professional Summary</h3>
              <p className="text-foreground/80 text-sm leading-relaxed">{s.summary}</p>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Work Experience</h3>
              <div className="space-y-4">
                {s.experience.map((job, i) => (
                  <div key={i} className="card-blur p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-semibold text-sm">{job.position}</p>
                        <p className="text-foreground/60 text-xs">{job.company}</p>
                      </div>
                      <span className="text-xs text-foreground/50 whitespace-nowrap ml-2">{job.duration}</span>
                    </div>
                    <p className="text-foreground/70 text-xs leading-relaxed">{job.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Education</h3>
              <div className="space-y-2">
                {s.education.map((edu, i) => (
                  <div key={i} className="flex justify-between items-start card-blur p-3 rounded-xl">
                    <div>
                      <p className="font-semibold text-sm">{edu.degree}</p>
                      <p className="text-foreground/60 text-xs">{edu.school}</p>
                    </div>
                    <span className="text-xs text-foreground/50">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {s.skills.map((skill) => (
                  <span key={skill} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">{skill}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={handleUseTemplate}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 smooth-transition"
              >
                Use This as Template <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="px-5 py-2.5 card-blur rounded-xl text-sm font-semibold hover:bg-foreground/10 smooth-transition">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Domain list for template filter ─────────────────────────────────────────
const domainFilters = [
  { id: "all",         label: "All",          emoji: "🗂" },
  { id: "it",          label: "IT & Software", emoji: "💻" },
  { id: "nursing",     label: "Healthcare",    emoji: "🏥" },
  { id: "design",      label: "Design",        emoji: "🎨" },
  { id: "business",    label: "Business",      emoji: "📈" },
  { id: "finance",     label: "Finance",       emoji: "💰" },
  { id: "law",         label: "Law",           emoji: "⚖" },
  { id: "education",   label: "Education",     emoji: "📚" },
  { id: "marketing",   label: "Marketing",     emoji: "📣" },
  { id: "hr",          label: "HR",            emoji: "👨‍💼" },
  { id: "science",     label: "Science",       emoji: "🔬" },
  { id: "civil",       label: "Engineering",   emoji: "🏗" },
  { id: "other",       label: "Other",         emoji: "📦" },
];

// Domain → which template names work best
const domainTemplateMap: Record<string, string[]> = {
  all:        ["Modern","Classic","Minimal","Creative","Executive","ATS-Ready"],
  it:         ["Modern","Minimal","ATS-Ready"],
  nursing:    ["Classic","Modern","ATS-Ready"],
  design:     ["Creative","Modern"],
  business:   ["Executive","Classic"],
  finance:    ["Executive","Classic","ATS-Ready"],
  law:        ["Executive","Classic"],
  education:  ["Minimal","Classic"],
  marketing:  ["Creative","Modern"],
  hr:         ["Executive","Classic"],
  science:    ["Minimal","ATS-Ready"],
  civil:      ["Minimal","Classic","ATS-Ready"],
  other:      ["Modern","Classic","Minimal","Creative","Executive","ATS-Ready"],
};

function TemplatesTab() {
  const [activeDomain, setActiveDomain] = useState("all");
  const recommended = domainTemplateMap[activeDomain] ?? domainTemplateMap.all;

  const sorted = [...templates].sort((a, b) => {
    const aRec = recommended.includes(a.name);
    const bRec = recommended.includes(b.name);
    if (aRec && !bRec) return -1;
    if (!aRec && bRec) return 1;
    return 0;
  });

  return (
    <motion.div key="templates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Choose a Template</h2>
        <p className="text-foreground/60 mb-5">Filter by your domain to see the best-matched designs</p>

        {/* Domain filter chips */}
        <div className="flex flex-wrap gap-2">
          {domainFilters.map(d => (
            <motion.button key={d.id}
              onClick={() => setActiveDomain(d.id)}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold smooth-transition border ${
                activeDomain === d.id
                  ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg shadow-primary/30"
                  : "card-blur hover:border-primary/40 text-foreground/70"
              }`}
            >
              <span>{d.emoji}</span> {d.label}
            </motion.button>
          ))}
        </div>

        {activeDomain !== "all" && (
          <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-xs text-primary font-medium">
            ✨ Showing best templates for <strong>{domainFilters.find(d => d.id === activeDomain)?.label}</strong> — recommended ones are highlighted
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((tpl, i) => {
          const isRecommended = activeDomain !== "all" && recommended.includes(tpl.name);
          return (
            <motion.div key={tpl.id}
              className={`card-blur rounded-2xl overflow-hidden group smooth-transition cursor-pointer ${
                isRecommended ? "border-2 border-primary/60 shadow-xl shadow-primary/20" : "hover:border-primary/50"
              }`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -5, scale: 1.01 }}
            >
              {/* Realistic resume preview */}
              <div className="relative h-56 bg-white dark:bg-gray-50 overflow-hidden border-b border-foreground/10">
                <div className="absolute inset-0 p-1">
                  <tpl.Preview />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-50/80 pointer-events-none" />
                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                  {isRecommended && (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-primary to-secondary shadow"
                    >
                      ⭐ Best for You
                    </motion.div>
                  )}
                  {tpl.badge && !isRecommended && (
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${tpl.color} shadow`}>
                      {tpl.badge}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold">{tpl.name}</h3>
                  <div className="w-3 h-3 rounded-full" style={{ background: tpl.accent }} />
                </div>
                <p className="text-foreground/60 text-sm mb-4 leading-relaxed">{tpl.description}</p>
                <Link to={`/create-resume?template=${tpl.id}&domain=${activeDomain === "all" ? "" : activeDomain}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${tpl.color} text-white rounded-xl font-semibold text-sm hover:shadow-lg smooth-transition group-hover:gap-3`}>
                  Use Template <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedExample, setSelectedExample] = useState<ExampleResume | null>(null);

  // Real data state
  const [myResumes, setMyResumes] = useState<ResumeData[]>([]);
  const [statsData, setStatsData] = useState({ resumesCreated: 0, totalDownloads: 0, avgResumeScore: 0, profileViews: 0, jobMatches: 0 });
  const [loadingResumes, setLoadingResumes] = useState(true);

  useEffect(() => {
    setLoadingResumes(true);
    // resumeApi.list() always falls back to localStorage when server is unavailable
    resumeApi.list()
      .then(list => {
        setMyResumes(list);
        return userApi.stats().catch(() => ({
          resumesCreated: list.length,
          totalDownloads: list.reduce((s, r) => s + (r.downloadCount ?? 0), 0),
          avgResumeScore: 0,
          profileViews: 0,
          jobMatches: 0,
        }));
      })
      .then(stats => {
        setStatsData(prev => ({ ...prev, ...stats }));
      })
      .catch(() => {})
      .finally(() => setLoadingResumes(false));
  }, [isAuthenticated]);

  const handleDeleteResume = async (id: number) => {
    try {
      await resumeApi.delete(id);
      setMyResumes(prev => prev.filter(r => r.id !== id));
      setStatsData(s => ({ ...s, resumesCreated: Math.max(0, s.resumesCreated - 1) }));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const dynStats = [
    { label: "Resumes Created", value: String(myResumes.length),
      icon: FileText,   color: "from-primary to-secondary" },
    { label: "Total Downloads", value: String(myResumes.reduce((s, r) => s + (r.downloadCount ?? 0), 0)),
      icon: Download,   color: "from-accent to-primary" },
    { label: "Avg Resume Score", value: String(myResumes.length
        ? Math.round(myResumes.reduce((s, r) => s + (r.resumeScore ?? 65), 0) / myResumes.length)
        : 0) + "%",
      icon: TrendingUp, color: "from-primary to-accent" },
    { label: "Profile Views",   value: String(statsData.profileViews),
      icon: Eye,        color: "from-secondary to-accent" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* 3D floating shapes background */}
      <Suspense fallback={null}>
        <FloatingShapes3D density="low" className="z-0 opacity-60" />
      </Suspense>
      <Navigation />

      {selectedExample && <ResumeModal ex={selectedExample} onClose={() => setSelectedExample(null)} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold gradient-text mb-1">Dashboard</h1>
          <p className="text-foreground/60">Manage your resumes and track your progress</p>
        </motion.div>

        {/* Tab Bar */}
        <motion.div className="flex gap-1 p-1 card-blur rounded-xl w-fit mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Link to="/" className="px-5 py-2 rounded-lg text-sm font-semibold smooth-transition text-foreground/60 hover:text-foreground">Home</Link>
          {(["overview", "templates", "examples"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold smooth-transition capitalize ${tab === t ? "bg-gradient-to-r from-primary to-secondary text-white shadow" : "text-foreground/60 hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </motion.div>

        {/* ── Overview ── */}
        {tab === "overview" && (
          <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {dynStats.map((stat, i) => (
                <motion.div key={stat.label} className="card-blur p-6 rounded-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}><stat.icon className="w-5 h-5 text-white" /></div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Resumes</h2>
              <Link to="/create-resume" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/40 smooth-transition">
                <Plus className="w-4 h-4" /> New Resume
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {loadingResumes ? (
                [1,2,3].map(i => (
                  <div key={i} className="card-blur rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-40 bg-foreground/5" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-foreground/10 rounded w-3/4" />
                      <div className="h-3 bg-foreground/5 rounded w-1/2" />
                    </div>
                  </div>
                ))
              ) : myResumes.length > 0 ? (
                myResumes.map((resume, i) => (
                  <motion.div key={resume.id} className="card-blur rounded-2xl overflow-hidden group hover:border-primary/50 smooth-transition" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}>
                    <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-primary/40" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-base">{resume.title}</h3>
                          <span className="text-xs text-foreground/50 bg-foreground/5 px-2 py-0.5 rounded-full">{resume.templateId ?? "Draft"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {((resume.resumeScore ?? 42) / 20).toFixed(1)}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-foreground/50 mb-4">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : "Draft"}</span>
                        <span className="flex items-center gap-1"><Download className="w-3 h-3" />{resume.downloadCount ?? 0} downloads</span>
                      </div>
                      <div className="flex gap-2">
                        <Link to={"/resume-preview"} className="flex-1 flex items-center justify-center gap-1 py-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-lg smooth-transition"><Eye className="w-3.5 h-3.5" /> Preview</Link>
                        <button
                          onClick={() => {
                            // Increment downloadCount locally and re-fetch list
                            const list = myResumes.map(r =>
                              r.id === resume.id ? { ...r, downloadCount: (r.downloadCount ?? 0) + 1 } : r
                            );
                            setMyResumes(list);
                            // Persist to localStorage
                            try {
                              const raw = localStorage.getItem("rp_resumes");
                              if (raw) {
                                const all = JSON.parse(raw).map((r: any) =>
                                  r.id === resume.id ? { ...r, downloadCount: (r.downloadCount ?? 0) + 1 } : r
                                );
                                localStorage.setItem("rp_resumes", JSON.stringify(all));
                              }
                            } catch (_) {}
                            // Navigate to preview to download
                            navigate("/resume-preview");
                          }}
                          className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-foreground/5 hover:bg-foreground/10 rounded-lg smooth-transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => resume.id && handleDeleteResume(resume.id)} className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg smooth-transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-foreground/50">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No resumes yet.</p>
                  <p className="text-sm mt-1">Create your first resume to get started.</p>
                </div>
              )}
              <Link to="/create-resume" className="card-blur rounded-2xl min-h-[280px] flex flex-col items-center justify-center gap-3 border-dashed hover:border-primary/50 smooth-transition group">
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center smooth-transition"><Plus className="w-6 h-6 text-primary" /></div>
                <span className="text-foreground/60 group-hover:text-foreground smooth-transition font-medium">Create New Resume</span>
              </Link>
            </div>

            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="card-blur rounded-2xl divide-y divide-foreground/10">
              {[{ action:"Edited", target:"Software Engineer Resume", time:"2 days ago", icon:Edit },{ action:"Downloaded", target:"Product Manager CV", time:"5 days ago", icon:Download },{ action:"Created", target:"Fullstack Developer", time:"3 weeks ago", icon:Plus }].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><item.icon className="w-4 h-4 text-primary" /></div>
                  <div className="flex-1"><span className="font-medium">{item.action}</span> <span className="text-foreground/70">{item.target}</span></div>
                  <span className="text-sm text-foreground/40">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Templates ── */}
        {tab === "templates" && (
          <TemplatesTab />
        )}

        {/* ── Examples ── */}
        {tab === "examples" && (
          <motion.div key="examples" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="mb-8"><h2 className="text-2xl font-bold mb-1">Example Resumes</h2><p className="text-foreground/60">Click any card to view a full AI-generated sample resume</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {examples.map((ex, i) => (
                <motion.div key={ex.id} className="card-blur rounded-2xl p-6 group hover:border-primary/50 smooth-transition cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} onClick={() => setSelectedExample(ex)}>
                  <div className="text-3xl mb-3 group-hover:scale-110 smooth-transition">{ex.icon}</div>
                  <h3 className="font-bold text-base mb-0.5">{ex.title}</h3>
                  <p className="text-foreground/50 text-sm mb-3">{ex.role}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ex.skills.slice(0, 3).map((s) => (<span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{s}</span>))}
                  </div>
                  <button className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 smooth-transition">
                    <FileText className="w-3.5 h-3.5" /> View Sample
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
