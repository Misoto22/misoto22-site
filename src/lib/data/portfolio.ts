// Portfolio data fetching: projects, education, experience
import { supabase, type Education, type Experience, type Project } from '../supabase'
import { type Locale, zh } from './shared'

// Database row types — match Supabase table schemas
export interface DbEducation {
  degree: string; school: string; school_link?: string; location: string
  period: string; description: string[]; courses: string[]; logo: string; order?: number
  degree_zh?: string; description_zh?: string[]; courses_zh?: string[]
}

export interface DbExperience {
  title: string; company: string; company_link?: string; location: string
  period: string; description: string[]; technologies: string[]; logo: string; order?: number
  title_zh?: string; description_zh?: string[]
}

export interface DbProject {
  title: string; description: string; link: string; deploy?: string
  technologies: string[]; image_path: string; category: string; order?: number
  title_zh?: string; description_zh?: string
}

// Convert database field names to frontend interface
export function mapEducation(db: DbEducation, locale: Locale = 'en'): Education {
  return {
    degree: zh(db.degree_zh, db.degree, locale),
    school: db.school,
    schoolLink: db.school_link,
    location: db.location,
    period: db.period,
    description: zh(db.description_zh, db.description, locale),
    courses: zh(db.courses_zh, db.courses, locale),
    logo: db.logo,
    order: db.order
  }
}

export function mapExperience(db: DbExperience, locale: Locale = 'en'): Experience {
  return {
    title: zh(db.title_zh, db.title, locale),
    company: db.company,
    companyLink: db.company_link,
    location: db.location,
    period: db.period,
    description: zh(db.description_zh, db.description, locale),
    technologies: db.technologies,
    logo: db.logo,
    order: db.order
  }
}

export function mapProject(db: DbProject, locale: Locale = 'en'): Project {
  return {
    title: zh(db.title_zh, db.title, locale),
    description: zh(db.description_zh, db.description, locale),
    link: db.link,
    deploy: db.deploy,
    technologies: db.technologies,
    image: db.image_path,
    category: db.category,
    order: db.order
  }
}

export async function getProjects(locale: Locale = 'en'): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }

    return data?.map(d => mapProject(d, locale)) || []
  } catch (error) {
    console.error('Unexpected error fetching projects:', error)
    return []
  }
}

export async function getEducation(locale: Locale = 'en'): Promise<Education[]> {
  try {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching education:', error)
      return []
    }

    return data?.map(d => mapEducation(d, locale)) || []
  } catch (error) {
    console.error('Unexpected error fetching education:', error)
    return []
  }
}

export async function getExperience(locale: Locale = 'en'): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching experience:', error)
      return []
    }

    return data?.map(d => mapExperience(d, locale)) || []
  } catch (error) {
    console.error('Unexpected error fetching experience:', error)
    return []
  }
}
