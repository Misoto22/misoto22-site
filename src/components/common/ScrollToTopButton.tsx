"use client"
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 监听 modal 状态
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setModalOpen(document.body.hasAttribute('data-modal-open'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-modal-open'] });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-opacity duration-300 border border-(--border-color) ${
        visible && !modalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
      aria-label="Scroll to top"
    >
      {/* Up arrow icon */}
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
} 