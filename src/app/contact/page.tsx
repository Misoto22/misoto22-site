'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import PageHeader from '@/components/layout/PageHeader'
import { FaGithub, FaLinkedin, FaInstagram, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { SiUnsplash } from 'react-icons/si';
import Card from '@/components/ui/Card'

export default function Contact() {
  useEffect(() => {
    // Check if environment variables are properly loaded
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId) {
      console.error('EmailJS configuration is missing:', {
        publicKey: !!publicKey,
        serviceId: !!serviceId,
        templateId: !!templateId
      });
      return;
    }

    // Initialize EmailJS
    emailjs.init({
      publicKey,
      limitRate: {
        throttle: 1000
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: false, message: '' });

    // Verify form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'Please fill in all fields'
      });
      return;
    }

    try {
      const templateParams = {
        to_name: 'Henry', // Recipient's name
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      // Remove detailed logging in production
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        templateParams
      );

      if (result.status === 200) {
        setStatus({
          submitting: false,
          submitted: true,
          error: false,
          message: 'Message sent successfully!'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error: any) {
      // Log error for monitoring but don't expose details to user
      console.error('Contact form submission failed');
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'Unable to send message at this time. Please try again later.'
      });
    }
  };

  return (
    <section className="pt-24 min-h-screen bg-(--background)">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader 
          title="Let's Connect"
          description="I'm actively seeking opportunities in DevOps and Full-stack web development. If you're interested in discussing potential roles or collaborations, I'd love to hear from you. Also, feel free to connect if you share a passion for photography!"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <Card
            delay={0.1}
            width="full"
          >
            <h2 className="text-2xl font-heading mb-6 text-(--foreground)">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MdEmail className="w-6 h-6 text-(--foreground) mt-1" />
                <div>
                  <h3 className="font-medium text-(--foreground)">Email</h3>
                  <a href="mailto:cxw8848@hotmail.com" className="text-(--secondary-text) hover:text-(--foreground) transition-colors">
                    cxw8848@hotmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="w-6 h-6 text-(--foreground) mt-1" />
                <div>
                  <h3 className="font-medium text-(--foreground)">Location</h3>
                  <p className="text-(--secondary-text)">Perth, Western Australia</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaClock className="w-6 h-6 text-(--foreground) mt-1" />
                <div>
                  <h3 className="font-medium text-(--foreground)">Availability</h3>
                  <p className="text-(--secondary-text)">Mon-Fri: 9:00 AM - 6:00 PM AWST</p>
                </div>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="font-medium text-(--foreground) mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/Misoto22" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:scale-110 transition-transform">
                  <span className="bg-gray-900 rounded-full flex items-center justify-center w-10 h-10">
                    <FaGithub size={20} color="#fff" />
                  </span>
                </a>
                <a href="https://linkedin.com/in/henry-misoto22" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
                  <span className="bg-[#0077B5] rounded-full flex items-center justify-center w-10 h-10">
                    <FaLinkedin size={20} color="#fff" />
                  </span>
                </a>
                <a href="https://instagram.com/hry.photography" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition-transform">
                  <span className="bg-pink-500 rounded-full flex items-center justify-center w-10 h-10">
                    <FaInstagram size={20} color="#fff" />
                  </span>
                </a>
                <a href="https://unsplash.com/@misoto22" target="_blank" rel="noopener noreferrer" aria-label="Unsplash" className="hover:scale-110 transition-transform">
                  <span className="bg-black rounded-full flex items-center justify-center w-10 h-10">
                    <SiUnsplash size={18} color="#fff" />
                  </span>
                </a>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card
            delay={0.2}
            width="full"
          >
            <h2 className="text-2xl font-heading mb-6 text-(--foreground)">Send me a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.submitted && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                  {status.message}
                </div>
              )}
              {status.error && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                  {status.message}
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-(--foreground) mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-(--border-color) focus:outline-hidden focus:ring-2 focus:ring-(--foreground) bg-(--background) text-(--foreground)"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-(--foreground) mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-(--border-color) focus:outline-hidden focus:ring-2 focus:ring-(--foreground) bg-(--background) text-(--foreground)"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-(--foreground) mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-(--border-color) focus:outline-hidden focus:ring-2 focus:ring-(--foreground) bg-(--background) text-(--foreground)"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-(--foreground) mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-(--border-color) focus:outline-hidden focus:ring-2 focus:ring-(--foreground) bg-(--background) text-(--foreground)"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full bg-(--foreground) text-(--background) py-3 rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </Card>
        </div>

        {/* Additional Information */}
        <Card delay={0.3} width="full" className="mb-16">
          <h2 className="text-2xl font-heading mb-6 text-(--foreground)">What to expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-(--foreground) mb-2">Response Time</h3>
              <p className="text-(--secondary-text)">I typically respond within 24-48 hours during business days.</p>
            </div>
            <div>
              <h3 className="font-medium text-(--foreground) mb-2">Job Opportunities</h3>
              <p className="text-(--secondary-text)">Open to discussing DevOps and Full-stack development roles.</p>
            </div>
            <div>
              <h3 className="font-medium text-(--foreground) mb-2">Photography</h3>
              <p className="text-(--secondary-text)">Always happy to connect with fellow photography enthusiasts!</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}