import Link from 'next/link'
import { Github, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-[var(--border-color)] bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 mb-12">
          {/* About & Social */}
          <div className="space-y-4 md:w-1/2">
            <h3 className="text-lg font-medium text-[var(--foreground)]">About Me</h3>
            <p className="text-[var(--secondary-text)] leading-relaxed text-sm">
              A Computer Science student and photographer based in Perth, capturing the beauty of urban landscapes 
              and natural wonders across Australia.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://github.com/Misoto22" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors"
                aria-label="GitHub"
              >
                <Github size={22} strokeWidth={1.2} className="hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://linkedin.com/in/henry-misoto22" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} strokeWidth={1.2} className="hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://instagram.com/hry.photography" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={22} strokeWidth={1.2} className="hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4 md:w-1/2 md:text-right">
            <h3 className="text-lg font-medium text-[var(--foreground)]">Contact</h3>
            <div className="space-y-2">
              <p className="text-sm text-[var(--secondary-text)]">
                <a 
                  href="mailto:cxw8848@hotmail.com" 
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  cxw8848@hotmail.com
                </a>
              </p>
              <p className="text-sm text-[var(--secondary-text)]">Perth, Western Australia</p>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="pt-8 border-t border-[var(--border-color)]">
          <p className="text-sm text-center text-[var(--secondary-text)]">
            © {new Date().getFullYear()} Henry Chen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
