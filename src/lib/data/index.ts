// Re-exports — keeps @/lib/data imports working across the codebase
// Frontend types (originally from supabase.ts, re-exported for component use)
export type { Education, Experience, Project, BlogPost, BlogCategory, BlogSubcategory, BlogTag, BlogAuthor } from '../supabase'
export { zh, type Locale } from './shared'
export { mapEducation, mapExperience, mapProject, getProjects, getEducation, getExperience } from './portfolio'
export type { DbEducation, DbExperience, DbProject } from './portfolio'
export { mapPhoto, getPhotos, type FrontendPhoto } from './photos'
export type { DbPhoto } from './photos'
export { mapBlogPost, mapBlogCategory, mapBlogTag, getBlogPosts, getBlogPostBySlug, getRelatedPosts, getBlogCategories, getBlogTags } from './blog'
export type { DbBlogPost, DbNamedRecord } from './blog'
