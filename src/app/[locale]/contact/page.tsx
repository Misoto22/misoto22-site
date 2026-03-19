import PageHeader from '@/components/layout/PageHeader'
import ContactForm from '@/components/contact/ContactForm'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { SiUnsplash } from 'react-icons/si'
import { SITE_CONFIG } from '@/lib/constants'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Contact')
  return {
    title: t('title'),
    description: t('description'),
  }
}

const socialLinks = [
  { href: SITE_CONFIG.GITHUB_URL, label: 'GitHub', icon: FaGithub },
  { href: SITE_CONFIG.LINKEDIN_URL, label: 'LinkedIn', icon: FaLinkedin },
  { href: SITE_CONFIG.INSTAGRAM_URL, label: 'Instagram', icon: FaInstagram },
  { href: SITE_CONFIG.UNSPLASH_URL, label: 'Unsplash', icon: SiUnsplash },
]

export default async function Contact() {
  const t = await getTranslations('Contact')

  return (
    <section className="pt-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title={t('title')}
          description={t('description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-24">
          <ContactForm />

          {/* Contact info — right */}
          <div className="space-y-10">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-2">{t('email')}</h3>
              <a
                href={`mailto:${SITE_CONFIG.EMAIL}`}
                className="text-lg text-(--foreground) underline underline-offset-4 decoration-(--border-color) hover:decoration-(--foreground) transition-colors duration-200"
              >
                {SITE_CONFIG.EMAIL}
              </a>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-2">{t('location')}</h3>
              <p className="text-lg text-(--foreground)">{SITE_CONFIG.LOCATION}</p>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-2">{t('availability')}</h3>
              <p className="text-lg text-(--foreground)">{t('availabilityValue')}</p>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-4">{t('social')}</h3>
              <div className="flex gap-5">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
