import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, X, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const examples = [
  {
    id: 1,
    title: "Teacher",
    icon: "🎓",
    sample: {
      name: "Sarah Johnson",
      title: "High School English Teacher",
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      location: "New York, NY",
      summary: "Dedicated educator with 8+ years of experience teaching high school English literature and composition. Proven track record of improving student engagement and academic performance through innovative teaching methods.",
      experience: [
        {
          position: "Senior English Teacher",
          company: "Lincoln High School",
          duration: "2019 - Present",
          details: "Lead AP Literature program for 120+ students annually, increased pass rate by 25%"
        },
        {
          position: "English Teacher",
          company: "Washington Middle School",
          duration: "2015 - 2019",
          details: "Developed curriculum standards and mentored 3 junior teachers"
        }
      ],
      education: [
        { degree: "Master of Arts in Education", school: "Columbia University", year: "2015" },
        { degree: "Bachelor of Arts in English", school: "State University", year: "2013" }
      ],
      skills: ["Curriculum Development", "Student Mentoring", "Creative Writing", "Public Speaking", "Classroom Management"]
    }
  },
  {
    id: 2,
    title: "Nurse",
    icon: "🏥",
    sample: {
      name: "Michael Chen",
      title: "Registered Nurse - ICU",
      email: "michael.chen@email.com",
      phone: "(555) 234-5678",
      location: "Los Angeles, CA",
      summary: "Compassionate and skilled ICU nurse with 6+ years of critical care experience. Expert in patient care, medical equipment operation, and team collaboration. Committed to providing exceptional care to patients and families.",
      experience: [
        {
          position: "Registered Nurse - ICU",
          company: "City Medical Center",
          duration: "2018 - Present",
          details: "Provide critical care to 8-10 patients, maintain detailed medical records, coordinate with physicians"
        },
        {
          position: "Registered Nurse - Emergency Department",
          company: "County Hospital",
          duration: "2015 - 2018",
          details: "Managed patient triage and care in fast-paced environment, reduced wait times by 20%"
        }
      ],
      education: [
        { degree: "Bachelor of Science in Nursing", school: "UCLA", year: "2015" },
        { degree: "RN License", school: "California Board of Nursing", year: "2015" }
      ],
      skills: ["Patient Care", "Medical Equipment", "Critical Thinking", "Communication", "EMR Systems", "Trauma Care"]
    }
  },
  {
    id: 3,
    title: "Sales Representative",
    icon: "💼",
    sample: {
      name: "Jessica Martinez",
      title: "Senior Sales Representative",
      email: "jessica.martinez@email.com",
      phone: "(555) 345-6789",
      location: "Chicago, IL",
      summary: "Results-driven sales professional with 7+ years of experience in B2B sales. Consistently exceed quotas by 150%+ through strategic account management and relationship building.",
      experience: [
        {
          position: "Senior Sales Representative",
          company: "Tech Solutions Inc.",
          duration: "2019 - Present",
          details: "$2.5M annual revenue, managed 35 key accounts, 160% of quota achievement"
        },
        {
          position: "Sales Representative",
          company: "Business Systems Corp.",
          duration: "2016 - 2019",
          details: "Generated $1.2M in revenue, built relationships with Fortune 500 clients"
        }
      ],
      education: [
        { degree: "Bachelor of Business Administration", school: "University of Illinois", year: "2016" }
      ],
      skills: ["Account Management", "Negotiation", "CRM Software", "Presentation Skills", "Client Relations"]
    }
  },
  {
    id: 4,
    title: "Customer Service",
    icon: "📞",
    sample: {
      name: "David Wilson",
      title: "Customer Service Manager",
      email: "david.wilson@email.com",
      phone: "(555) 456-7890",
      location: "Houston, TX",
      summary: "Customer-focused professional with 5+ years of experience delivering exceptional service. Proven ability to resolve complex issues and lead high-performing teams.",
      experience: [
        {
          position: "Customer Service Manager",
          company: "Global Services Ltd.",
          duration: "2020 - Present",
          details: "Manage team of 12 representatives, 98% customer satisfaction rate, reduced response time by 35%"
        },
        {
          position: "Senior Customer Service Representative",
          company: "Premier Support Inc.",
          duration: "2017 - 2020",
          details: "Handled 50+ customer inquiries daily, maintained 95% satisfaction rating"
        }
      ],
      education: [
        { degree: "Associate Degree in Business", school: "Community College", year: "2017" }
      ],
      skills: ["Team Leadership", "Conflict Resolution", "Communication", "Problem Solving", "Customer Service"]
    }
  },
  {
    id: 5,
    title: "Software Engineer",
    icon: "💻",
    sample: {
      name: "Alex Kumar",
      title: "Senior Software Engineer",
      email: "alex.kumar@email.com",
      phone: "(555) 567-8901",
      location: "San Francisco, CA",
      summary: "Full-stack software engineer with 8+ years of experience developing scalable applications. Expert in React, Node.js, and cloud technologies. Passionate about clean code and mentoring junior developers.",
      experience: [
        {
          position: "Senior Software Engineer",
          company: "Tech Startup Inc.",
          duration: "2020 - Present",
          details: "Led development of microservices architecture, reduced load time by 60%, mentored 4 junior engineers"
        },
        {
          position: "Software Engineer",
          company: "Enterprise Systems Co.",
          duration: "2016 - 2020",
          details: "Developed full-stack applications for 10M+ users, improved deployment pipeline efficiency by 45%"
        }
      ],
      education: [
        { degree: "Bachelor of Science in Computer Science", school: "MIT", year: "2016" }
      ],
      skills: ["React", "Node.js", "Python", "AWS", "Docker", "GraphQL", "System Design", "Git"]
    }
  },
  {
    id: 6,
    title: "Data Analyst",
    icon: "📊",
    sample: {
      name: "Emily Rodriguez",
      title: "Senior Data Analyst",
      email: "emily.rodriguez@email.com",
      phone: "(555) 678-9012",
      location: "Boston, MA",
      summary: "Data-driven analyst with 6+ years of experience turning raw data into actionable insights. Proficient in SQL, Python, and Tableau. Delivered 50+ high-impact analyses.",
      experience: [
        {
          position: "Senior Data Analyst",
          company: "Analytics Corp.",
          duration: "2019 - Present",
          details: "Created dashboards for C-suite executives, identified optimization opportunities saving $500K annually"
        },
        {
          position: "Data Analyst",
          company: "Insights Inc.",
          duration: "2016 - 2019",
          details: "Analyzed customer behavior data for 20+ projects, improved decision-making accuracy by 35%"
        }
      ],
      education: [
        { degree: "Master of Science in Data Science", school: "Carnegie Mellon", year: "2016" }
      ],
      skills: ["SQL", "Python", "Tableau", "Excel", "Statistical Analysis", "Power BI", "Data Visualization"]
    }
  },
  {
    id: 7,
    title: "Accountant",
    icon: "🧮",
    sample: {
      name: "Robert Thompson",
      title: "Senior Accountant",
      email: "robert.thompson@email.com",
      phone: "(555) 789-0123",
      location: "New York, NY",
      summary: "Detail-oriented accountant with 7+ years of experience in financial analysis and reporting. CPA with expertise in GAAP, tax preparation, and audit procedures.",
      experience: [
        {
          position: "Senior Accountant",
          company: "Finance Solutions Ltd.",
          duration: "2019 - Present",
          details: "Managed accounting operations for $50M+ portfolio, reduced audit time by 25%"
        },
        {
          position: "Staff Accountant",
          company: "Big Four Firm",
          duration: "2016 - 2019",
          details: "Completed audits for Fortune 500 clients, maintained error-free financial statements"
        }
      ],
      education: [
        { degree: "Bachelor of Science in Accounting", school: "NYU", year: "2016" },
        { degree: "CPA License", school: "New York Board", year: "2017" }
      ],
      skills: ["GAAP", "Tax Preparation", "Audit", "QuickBooks", "Excel", "Financial Analysis"]
    }
  },
  {
    id: 8,
    title: "IT Specialist",
    icon: "🖥️",
    sample: {
      name: "Marcus Green",
      title: "IT Systems Specialist",
      email: "marcus.green@email.com",
      phone: "(555) 890-1234",
      location: "Austin, TX",
      summary: "IT professional with 5+ years of experience managing enterprise systems and infrastructure. Certified in multiple platforms with strong troubleshooting and project management skills.",
      experience: [
        {
          position: "IT Systems Specialist",
          company: "Enterprise Tech Co.",
          duration: "2019 - Present",
          details: "Maintain 200+ systems, achieved 99.8% uptime, reduced ticket resolution time by 40%"
        },
        {
          position: "IT Support Technician",
          company: "Tech Solutions Inc.",
          duration: "2016 - 2019",
          details: "Provided technical support to 500+ users, completed network upgrades"
        }
      ],
      education: [
        { degree: "CompTIA Network+", school: "CompTIA", year: "2017" },
        { degree: "Bachelor of Science in IT", school: "State University", year: "2016" }
      ],
      skills: ["Network Administration", "Windows Server", "Linux", "Cloud Platforms", "Cybersecurity", "Ticketing Systems"]
    }
  },
  {
    id: 9,
    title: "Intern",
    icon: "🌟",
    sample: {
      name: "Lauren Brooks",
      title: "Marketing Intern",
      email: "lauren.brooks@email.com",
      phone: "(555) 901-2345",
      location: "Denver, CO",
      summary: "Motivated recent graduate with strong communication and marketing skills. Eager to apply classroom knowledge to real-world projects and contribute to growing marketing initiatives.",
      experience: [
        {
          position: "Marketing Intern",
          company: "Digital Marketing Agency",
          duration: "June 2023 - Present",
          details: "Created social media content, assisted with campaign analytics, collaborated on 3 client projects"
        },
        {
          position: "Content Writer Intern",
          company: "Tech Startup",
          duration: "Jan 2023 - May 2023",
          details: "Wrote blog posts and marketing copy, managed email marketing campaigns"
        }
      ],
      education: [
        { degree: "Bachelor of Science in Marketing", school: "University of Colorado", year: "2023" }
      ],
      skills: ["Social Media", "Content Writing", "Microsoft Office", "Canva", "Communication", "Google Analytics"]
    }
  },
  {
    id: 10,
    title: "Marketing Manager",
    icon: "📈",
    sample: {
      name: "Nicole Anderson",
      title: "Marketing Manager",
      email: "nicole.anderson@email.com",
      phone: "(555) 012-3456",
      location: "Seattle, WA",
      summary: "Strategic marketing leader with 6+ years driving brand growth and digital transformation. Expertise in campaign strategy, team leadership, and data-driven decision making.",
      experience: [
        {
          position: "Marketing Manager",
          company: "Brand Innovations Inc.",
          duration: "2020 - Present",
          details: "Led campaigns generating $3M+ revenue, managed budget of $500K, grew social followers by 150%"
        },
        {
          position: "Marketing Specialist",
          company: "Digital Agency",
          duration: "2017 - 2020",
          details: "Developed digital strategies for 15+ clients, increased engagement by 200%"
        }
      ],
      education: [
        { degree: "Master of Business Administration", school: "University of Washington", year: "2017" }
      ],
      skills: ["Digital Strategy", "Campaign Management", "Analytics", "Team Leadership", "Content Strategy", "SEO/SEM"]
    }
  },
  {
    id: 11,
    title: "Graphic Designer",
    icon: "🎨",
    sample: {
      name: "Tyler Matthews",
      title: "Senior Graphic Designer",
      email: "tyler.matthews@email.com",
      phone: "(555) 123-5678",
      location: "Portland, OR",
      summary: "Creative graphic designer with 7+ years of experience in brand identity and digital design. Proficient in Adobe Creative Suite with a portfolio of award-winning designs.",
      experience: [
        {
          position: "Senior Graphic Designer",
          company: "Creative Studios LLC",
          duration: "2019 - Present",
          details: "Led design for 50+ projects, managed creative team of 3, increased client retention by 30%"
        },
        {
          position: "Graphic Designer",
          company: "Marketing Collective",
          duration: "2016 - 2019",
          details: "Designed branding materials, web graphics, and marketing collateral for diverse clients"
        }
      ],
      education: [
        { degree: "Bachelor of Fine Arts in Graphic Design", school: "Portland State University", year: "2016" }
      ],
      skills: ["Adobe CC", "UI/UX Design", "Branding", "Typography", "Web Design", "Figma", "Prototyping"]
    }
  },
  {
    id: 12,
    title: "Project Manager",
    icon: "📋",
    sample: {
      name: "Patricia Lee",
      title: "Senior Project Manager",
      email: "patricia.lee@email.com",
      phone: "(555) 234-6789",
      location: "Miami, FL",
      summary: "Experienced project manager with 8+ years leading cross-functional teams and delivering complex projects on time and within budget. PMP certified with expertise in Agile and Waterfall methodologies.",
      experience: [
        {
          position: "Senior Project Manager",
          company: "Enterprise Solutions Group",
          duration: "2019 - Present",
          details: "Managed 10+ enterprise projects, $5M+ combined budget, 95% on-time delivery rate"
        },
        {
          position: "Project Manager",
          company: "Technology Consultants Inc.",
          duration: "2015 - 2019",
          details: "Led Agile transformation for 5 teams, improved velocity by 40%"
        }
      ],
      education: [
        { degree: "Master of Business Administration", school: "Florida International University", year: "2015" },
        { degree: "Project Management Professional (PMP)", school: "PMI", year: "2016" }
      ],
      skills: ["Project Planning", "Agile/Scrum", "Risk Management", "Stakeholder Management", "Budget Management", "Jira"]
    }
  }
];

export default function Examples() {
  const [selectedExample, setSelectedExample] = useState<typeof examples[0] | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-4">
              Resume Examples
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
              Real-World Resume Samples
            </h1>
            <p className="text-foreground/60 text-lg max-w-xl mx-auto">
              Explore professionally crafted resumes for different roles and industries.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {examples.map((example, i) => (
              <motion.div key={example.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => setSelectedExample(example)}
                className="card-blur rounded-2xl p-6 cursor-pointer group hover:border-primary/50 smooth-transition"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 smooth-transition">{example.icon}</div>
                <h3 className="font-bold text-base mb-1">{example.title}</h3>
                <p className="text-foreground/50 text-sm mb-4 line-clamp-2">{example.sample.title}</p>
                <button className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-2.5 smooth-transition">
                  <FileText className="w-3.5 h-3.5" /> View Sample
                </button>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-foreground/50 mb-4">Ready to build your own?</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/template-picker"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-primary/40 smooth-transition">
                Start Building <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedExample && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedExample(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
            className="bg-background border border-foreground/10 rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-2xl"
          >
            {/* Modal header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-primary to-secondary px-6 py-5 rounded-t-2xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-2xl">{selectedExample.icon}</span>
                  <h2 className="text-xl font-bold text-white">{selectedExample.sample.title}</h2>
                </div>
                <p className="text-white/70 text-sm">{selectedExample.sample.email} · {selectedExample.sample.location}</p>
              </div>
              <button onClick={() => setSelectedExample(null)}
                className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg smooth-transition">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Professional Summary</p>
                <p className="text-foreground/80 text-sm leading-relaxed">{selectedExample.sample.summary}</p>
              </div>
              {/* Experience */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Work Experience</p>
                <div className="space-y-4">
                  {selectedExample.sample.experience.map((job, i) => (
                    <div key={i} className="card-blur p-4 rounded-xl">
                      <div className="flex justify-between items-start mb-1">
                        <div><p className="font-semibold text-sm">{job.position}</p>
                          <p className="text-foreground/60 text-xs">{job.company}</p></div>
                        <span className="text-xs text-foreground/40 whitespace-nowrap ml-2">{job.duration}</span>
                      </div>
                      <p className="text-foreground/70 text-xs leading-relaxed">{job.details}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Education */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Education</p>
                <div className="space-y-2">
                  {selectedExample.sample.education.map((edu, i) => (
                    <div key={i} className="card-blur px-4 py-3 rounded-xl flex justify-between items-start">
                      <div><p className="font-semibold text-sm">{edu.degree}</p>
                        <p className="text-foreground/60 text-xs">{edu.school}</p></div>
                      <span className="text-xs text-foreground/40">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Skills */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedExample.sample.skills.map((skill, i) => (
                    <span key={i} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">{skill}</span>
                  ))}
                </div>
              </div>
              {/* CTA */}
              <div className="flex gap-3 pt-2">
                <Link to="/create-resume"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:shadow-lg smooth-transition">
                  Use This as Template <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={() => setSelectedExample(null)}
                  className="px-5 py-2.5 card-blur rounded-xl text-sm font-semibold hover:bg-foreground/10 smooth-transition">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
