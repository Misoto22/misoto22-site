jest.mock('../../supabase', () => ({ supabase: {} }))

import { mapEducation, mapExperience, mapProject, type DbEducation, type DbExperience, type DbProject } from '../portfolio'

const baseEducation: DbEducation = {
  degree: 'B.Sc. Computer Science',
  school: 'MIT',
  school_link: 'https://mit.edu',
  location: 'Cambridge, MA',
  period: '2020-2024',
  description: ['Built things', 'Learned stuff'],
  courses: ['CS101', 'CS201'],
  logo: '/mit.png',
  order: 1,
  degree_zh: '计算机科学学士',
  description_zh: ['做了东西', '学了知识'],
  courses_zh: ['计算机101', '计算机201'],
}

const baseExperience: DbExperience = {
  title: 'Software Engineer',
  company: 'Acme Corp',
  company_link: 'https://acme.com',
  location: 'NYC',
  period: '2024-Present',
  description: ['Built APIs', 'Led team'],
  technologies: ['React', 'Node.js'],
  logo: '/acme.png',
  order: 1,
  title_zh: '软件工程师',
  description_zh: ['构建API', '带领团队'],
}

const baseProject: DbProject = {
  title: 'Portfolio Site',
  description: 'A personal website',
  link: 'https://github.com/example',
  deploy: 'https://example.com',
  technologies: ['Next.js', 'TypeScript'],
  image_path: '/portfolio.png',
  category: 'Full-stack',
  order: 1,
  title_zh: '个人网站',
  description_zh: '一个个人网站',
}

describe('mapEducation', () => {
  it('maps to frontend format in English', () => {
    const result = mapEducation(baseEducation, 'en')
    expect(result.degree).toBe('B.Sc. Computer Science')
    expect(result.schoolLink).toBe('https://mit.edu')
    expect(result.description).toEqual(['Built things', 'Learned stuff'])
    expect(result.courses).toEqual(['CS101', 'CS201'])
  })

  it('maps to frontend format in Chinese', () => {
    const result = mapEducation(baseEducation, 'zh')
    expect(result.degree).toBe('计算机科学学士')
    expect(result.description).toEqual(['做了东西', '学了知识'])
    expect(result.courses).toEqual(['计算机101', '计算机201'])
    // Non-translated fields stay the same
    expect(result.school).toBe('MIT')
  })

  it('falls back to English when Chinese translations are missing', () => {
    const noZh: DbEducation = { ...baseEducation, degree_zh: undefined, description_zh: undefined, courses_zh: undefined }
    const result = mapEducation(noZh, 'zh')
    expect(result.degree).toBe('B.Sc. Computer Science')
    expect(result.description).toEqual(['Built things', 'Learned stuff'])
  })

  it('defaults locale to en', () => {
    const result = mapEducation(baseEducation)
    expect(result.degree).toBe('B.Sc. Computer Science')
  })
})

describe('mapExperience', () => {
  it('maps to frontend format in English', () => {
    const result = mapExperience(baseExperience, 'en')
    expect(result.title).toBe('Software Engineer')
    expect(result.companyLink).toBe('https://acme.com')
    expect(result.technologies).toEqual(['React', 'Node.js'])
  })

  it('maps to frontend format in Chinese', () => {
    const result = mapExperience(baseExperience, 'zh')
    expect(result.title).toBe('软件工程师')
    expect(result.description).toEqual(['构建API', '带领团队'])
    expect(result.company).toBe('Acme Corp')
  })
})

describe('mapProject', () => {
  it('maps to frontend format in English', () => {
    const result = mapProject(baseProject, 'en')
    expect(result.title).toBe('Portfolio Site')
    expect(result.description).toBe('A personal website')
    expect(result.image).toBe('/portfolio.png')
    expect(result.deploy).toBe('https://example.com')
  })

  it('maps to frontend format in Chinese', () => {
    const result = mapProject(baseProject, 'zh')
    expect(result.title).toBe('个人网站')
    expect(result.description).toBe('一个个人网站')
  })

  it('maps image_path to image field', () => {
    const result = mapProject(baseProject)
    expect(result.image).toBe('/portfolio.png')
  })
})
