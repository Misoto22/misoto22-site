import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Frontend interface types
export interface Education {
  id?: number
  degree: string
  school: string
  schoolLink?: string
  location: string
  period: string
  description: string[]
  courses: string[]
  logo: string
  order?: number
  created_at?: string
  updated_at?: string
}

export interface Experience {
  id?: number
  title: string
  company: string
  companyLink?: string
  location: string
  period: string
  description: string[]
  technologies: string[]
  logo: string
  order?: number
  created_at?: string
  updated_at?: string
}

export interface Project {
  id?: number
  title: string
  description: string
  link: string
  deploy?: string
  technologies: string[]
  image: string
  category: string
  order?: number
  created_at?: string
  updated_at?: string
}

export interface Photo {
  id?: number
  src: string
  width: number
  height: number
  alt: string
  order?: number
  created_at?: string
  updated_at?: string
}
