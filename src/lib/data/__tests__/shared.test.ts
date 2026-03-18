import { zh } from '../shared'

describe('zh() locale fallback helper', () => {
  it('returns English value when locale is en', () => {
    expect(zh('中文', 'English', 'en')).toBe('English')
  })

  it('returns Chinese value when locale is zh and value exists', () => {
    expect(zh('中文', 'English', 'zh')).toBe('中文')
  })

  it('falls back to English when locale is zh but zhVal is null', () => {
    expect(zh(null, 'English', 'zh')).toBe('English')
  })

  it('falls back to English when locale is zh but zhVal is undefined', () => {
    expect(zh(undefined, 'English', 'zh')).toBe('English')
  })

  it('works with array values', () => {
    const enArr = ['desc1', 'desc2']
    const zhArr = ['描述1', '描述2']
    expect(zh(zhArr, enArr, 'zh')).toBe(zhArr)
    expect(zh(undefined, enArr, 'zh')).toBe(enArr)
  })
})
