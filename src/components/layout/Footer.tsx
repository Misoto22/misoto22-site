import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FULL_NAME, EMAIL, LOCATION, GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL } from '@/lib/constants'

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-(--border-color) bg-(--background)">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 mb-12">
          {/* About */}
          <div className="space-y-4 md:w-1/2">
            <h3 className="text-lg font-medium text-(--foreground)">About Me</h3>
            <p className="text-(--secondary-text) leading-relaxed text-sm">
              A Computer Science student and photographer based in Sydney, capturing the beauty of urban landscapes
              and natural wonders across Australia.
            </p>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4 md:w-1/2 md:text-right">
            <h3 className="text-lg font-medium text-(--foreground)">Contact</h3>
            <div className="space-y-2">
              <p className="text-sm text-(--secondary-text)">
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-(--foreground) transition-colors"
                >
                  {EMAIL}
                </a>
              </p>
              <p className="text-sm text-(--secondary-text)">{LOCATION}</p>
            </div>
            <div className="flex justify-start md:justify-end space-x-6 pt-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--secondary-text) hover:text-(--foreground) transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--secondary-text) hover:text-(--foreground) transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--secondary-text) hover:text-(--foreground) transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="pt-8 border-t border-(--border-color)">
          <p className="text-sm text-center text-(--secondary-text)">
            © {new Date().getFullYear()} {FULL_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
