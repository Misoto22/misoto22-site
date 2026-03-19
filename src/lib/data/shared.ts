// Shared types and helpers for data layer

export type Locale = 'en' | 'zh'

// 选择对应语言字段，没有中文翻译时 fallback 到英文
export function zh<T>(zhVal: T | undefined | null, enVal: T, locale: Locale): T {
  return locale === 'zh' && zhVal != null ? zhVal : enVal
}
