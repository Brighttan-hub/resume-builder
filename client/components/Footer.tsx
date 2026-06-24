import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="text-2xl font-bold gradient-text inline-block mb-4">
              ResumePro
            </Link>
            <p className="text-foreground/60 text-sm">
              Build stunning resumes with AI-powered suggestions and beautiful templates.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#features" className="hover:text-foreground smooth-transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground smooth-transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-foreground smooth-transition">
                  How it Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground smooth-transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground smooth-transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground smooth-transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground smooth-transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground smooth-transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground smooth-transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-foreground/60">
          <p>&copy; {currentYear} ResumePro. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-foreground smooth-transition">
              Twitter
            </a>
            <a href="#" className="hover:text-foreground smooth-transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-foreground smooth-transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
