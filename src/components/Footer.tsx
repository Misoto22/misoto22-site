import Link from 'next/link'
import { Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-[var(--border-color)] bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[var(--foreground)]">About Me</h3>
            <p className="text-[var(--secondary-text)] leading-relaxed text-sm">
              A Computer Science student and photographer based in Perth, capturing the beauty of urban landscapes 
              and natural wonders across Australia.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[var(--foreground)]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
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
