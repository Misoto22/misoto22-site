'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'
import { useTranslations } from 'next-intl'

export default function ContactForm() {
  const t = useTranslations('Contact.form')

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

    if (!publicKey || !serviceId || !templateId) return

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
        message: t('errorRequired')
      })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: t('errorEmail')
      })
      return
    }

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

      if (!serviceId || !templateId) {
        throw new Error(t('errorConfig'))
      }

      const templateParams = {
        to_name: 'Henry',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      }

      const result = await emailjs.send(serviceId, templateId, templateParams)

      if (result.status === 200) {
        setStatus({
          submitting: false,
          submitted: true,
          error: false,
          message: t('success')
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch {
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: t('errorGeneric')
      })
    }
  }

  const inputClass = "peer w-full bg-transparent border-b border-(--border-color) pb-2 pt-5 text-(--foreground) focus:outline-none focus:border-(--accent) transition-colors duration-300"
  const labelClass = "absolute left-0 top-5 text-(--secondary-text) text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-(--accent) peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"

  const fields = [
    { id: 'name', type: 'text', label: t('name') },
    { id: 'email', type: 'email', label: t('email') },
    { id: 'subject', type: 'text', label: t('subject') },
  ]

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {status.submitted && (
          <p className="text-sm text-green-700 dark:text-green-400">{status.message}</p>
        )}
        {status.error && (
          <p className="text-sm text-red-700 dark:text-red-400">{status.message}</p>
        )}

        {fields.map(({ id, type, label }) => (
          <div key={id} className="relative">
            <input
              type={type}
              id={id}
              value={formData[id as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
              placeholder=" "
              required
              className={inputClass}
            />
            <label htmlFor={id} className={labelClass}>{label}</label>
          </div>
        ))}

        <div className="relative">
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder=" "
            rows={4}
            required
            className={`${inputClass} resize-none`}
          />
          <label htmlFor="message" className={labelClass}>{t('message')}</label>
        </div>

        <button
          type="submit"
          disabled={status.submitting}
          className="bg-(--accent) text-white px-8 py-3 rounded-lg font-medium text-sm tracking-wide hover:bg-(--accent-hover) transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.submitting ? t('sending') : t('send')}
        </button>
      </form>
    </motion.div>
  )
}
