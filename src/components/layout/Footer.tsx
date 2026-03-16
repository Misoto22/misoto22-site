import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FULL_NAME, EMAIL, LOCATION, GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL } from '@/lib/constants'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t border-(--border-color) bg-(--background)">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-heading text-xl text-(--foreground)">
              {FULL_NAME}
            </Link>
            <p className="text-(--secondary-text) text-sm leading-relaxed max-w-xs">
              Fullstack developer & photographer based in Sydney, building thoughtful software and capturing quiet moments.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-(--secondary-text)">Navigate</h3>
            <nav className="flex flex-col space-y-2">
              {[
                { href: '/projects', text: 'Work' },
                { href: '/photography', text: 'Photography' },
                { href: '/blog', text: 'Writing' },
                { href: '/contact', text: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-(--foreground-muted) hover:text-(--foreground) transition-colors duration-200 w-fit"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-(--secondary-text)">Connect</h3>
            <div className="space-y-2">
              <a
                href={`mailto:${EMAIL}`}
                className="block text-sm text-(--foreground-muted) hover:text-(--foreground) transition-colors duration-200"
              >
                {EMAIL}
              </a>
              <p className="text-sm text-(--secondary-text)">{LOCATION}</p>
            </div>
            <div className="flex space-x-5 pt-2">
              {[
                { href: GITHUB_URL, icon: FaGithub, label: 'GitHub' },
                { href: LINKEDIN_URL, icon: FaLinkedin, label: 'LinkedIn' },
                { href: INSTAGRAM_URL, icon: FaInstagram, label: 'Instagram' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="pt-8 border-t border-(--border-subtle)">
          <p className="text-xs font-mono text-(--secondary-text) tracking-wide">
            © {new Date().getFullYear()} {FULL_NAME}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
