-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.blog_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  CONSTRAINT blog_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.blog_post_tags (
  post_id uuid NOT NULL,
  tag_id uuid NOT NULL,
  CONSTRAINT blog_post_tags_pkey PRIMARY KEY (post_id, tag_id),
  CONSTRAINT post_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id),
  CONSTRAINT post_tags_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.blog_posts(id)
);
CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  summary text,
  cover_image text,
  published_at timestamp without time zone,
  updated_at timestamp without time zone DEFAULT now(),
  is_published boolean DEFAULT false,
  author_id uuid,
  category_id uuid,
  subcategory_id uuid,
  CONSTRAINT blog_posts_pkey PRIMARY KEY (id),
  CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id),
  CONSTRAINT posts_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES public.blog_subcategories(id),
  CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.blog_categories(id)
);
CREATE TABLE public.blog_subcategories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  category_id uuid,
  CONSTRAINT blog_subcategories_pkey PRIMARY KEY (id),
  CONSTRAINT subcategories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.blog_categories(id)
);
CREATE TABLE public.education (
  id bigint NOT NULL DEFAULT nextval('education_id_seq'::regclass),
  degree text NOT NULL,
  school text NOT NULL,
  school_link text,
  location text NOT NULL,
  period text NOT NULL,
  description ARRAY NOT NULL,
  courses ARRAY NOT NULL,
  logo text NOT NULL,
  order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT education_pkey PRIMARY KEY (id)
);
CREATE TABLE public.experience (
  id bigint NOT NULL DEFAULT nextval('experience_id_seq'::regclass),
  title text NOT NULL,
  company text NOT NULL,
  company_link text,
  location text NOT NULL,
  period text NOT NULL,
  description ARRAY NOT NULL,
  technologies ARRAY NOT NULL,
  logo text NOT NULL,
  order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT experience_pkey PRIMARY KEY (id)
);
CREATE TABLE public.photos (
  id bigint NOT NULL DEFAULT nextval('photos_id_seq'::regclass),
  src text NOT NULL,
  width integer NOT NULL,
  height integer NOT NULL,
  alt text NOT NULL,
  order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  basename text NOT NULL,
  type text NOT NULL,
  taken_at timestamp with time zone,
  CONSTRAINT photos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.projects (
  id bigint NOT NULL DEFAULT nextval('projects_id_seq'::regclass),
  title text NOT NULL,
  description text NOT NULL,
  link text NOT NULL,
  deploy text,
  technologies ARRAY NOT NULL,
  image_path text NOT NULL,
  category text NOT NULL,
  order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tags (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  CONSTRAINT tags_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar text,
  bio text,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);