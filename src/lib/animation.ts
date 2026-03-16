// 共享动画常量 — 统一全站动效时间与缓动曲线
export const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },

  ease: {
    out: [0.16, 1, 0.3, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
    spring: { type: 'spring' as const, stiffness: 200, damping: 26, mass: 0.8 },
    gentle: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 1 },
  },

  stagger: {
    fast: 0.04,
    normal: 0.08,
    slow: 0.12,
  },
} as const

// Framer Motion variant presets
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION.stagger.normal,
    },
  },
}

export const viewportConfig = {
  once: true,
  amount: 0.2,
}
