'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import PageHeader from '@/components/layout/PageHeader'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { SiUnsplash } from 'react-icons/si'
import { SITE_CONFIG } from '@/lib/constants'

export default function Contact() {
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

    if (!publicKey || !serviceId || !templateId) {
      console.error('EmailJS configuration is missing:', {
        publicKey: !!publicKey,
        serviceId: !!serviceId,
        templateId: !!templateId
      })
      return
    }

    emailjs.init({
      publicKey,
      limitRate: { throttle: 1000 }
    })
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ submitting: true, submitted: false, error: false, message: '' })

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'Please fill in all fields'
      })
      return
    }

    try {
      const templateParams = {
        to_name: 'Henry',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      }

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        templateParams
      )

      if (result.status === 200) {
        setStatus({
          submitting: false,
          submitted: true,
          error: false,
          message: 'Message sent successfully!'
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error: unknown) {
      console.error('Contact form submission failed')
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'Unable to send message at this time. Please try again later.'
      })
    }
  }

  const socialLinks = [
    { href: SITE_CONFIG.GITHUB_URL, label: 'GitHub', icon: FaGithub },
    { href: SITE_CONFIG.LINKEDIN_URL, label: 'LinkedIn', icon: FaLinkedin },
    { href: SITE_CONFIG.INSTAGRAM_URL, label: 'Instagram', icon: FaInstagram },
    { href: 'https://unsplash.com/@misoto22', label: 'Unsplash', icon: SiUnsplash },
  ]

  return (
    <section className="pt-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title="Let's connect."
          description="Have a project in mind, a role to discuss, or just want to say hello? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
          {/* Form — left */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {status.submitted && (
                <p className="text-sm text-green-700 dark:text-green-400">
                  {status.message}
                </p>
              )}
              {status.error && (
                <p className="text-sm text-red-700 dark:text-red-400">
                  {status.message}
                </p>
              )}

              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b border-(--border-color) pb-2 pt-5 text-(--foreground) focus:outline-none focus:border-(--accent) transition-colors duration-300"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-5 text-(--secondary-text) text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-(--accent) peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b border-(--border-color) pb-2 pt-5 text-(--foreground) focus:outline-none focus:border-(--accent) transition-colors duration-300"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-5 text-(--secondary-text) text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-(--accent) peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Email
                </label>
              </div>

              {/* Subject */}
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b border-(--border-color) pb-2 pt-5 text-(--foreground) focus:outline-none focus:border-(--accent) transition-colors duration-300"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-0 top-5 text-(--secondary-text) text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-(--accent) peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Subject
                </label>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder=" "
                  rows={4}
                  required
                  className="peer w-full bg-transparent border-b border-(--border-color) pb-2 pt-5 text-(--foreground) focus:outline-none focus:border-(--accent) transition-colors duration-300 resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-5 text-(--secondary-text) text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-(--accent) peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="bg-(--accent) text-white px-8 py-3 rounded-lg font-medium text-sm tracking-wide hover:bg-(--accent-hover) transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact info — right */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ duration: ANIMATION.duration.slow, delay: 0.1, ease: ANIMATION.ease.out }}
            className="space-y-10"
          >
            {/* Email */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-2">
                Email
              </h3>
              <a
                href={`mailto:${SITE_CONFIG.EMAIL}`}
                className="text-lg text-(--foreground) underline underline-offset-4 decoration-(--border-color) hover:decoration-(--foreground) transition-colors duration-200"
              >
                {SITE_CONFIG.EMAIL}
              </a>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-2">
                Location
              </h3>
              <p className="text-lg text-(--foreground)">{SITE_CONFIG.LOCATION}</p>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-2">
                Availability
              </h3>
              <p className="text-lg text-(--foreground)">Mon–Fri, 9:00 AM – 6:00 PM AEST</p>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-4">
                Social
              </h3>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
