-- Create Education table
CREATE TABLE education (
  id BIGSERIAL PRIMARY KEY,
  degree TEXT NOT NULL,
  school TEXT NOT NULL,
  school_link TEXT,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT[] NOT NULL,
  courses TEXT[] NOT NULL,
  logo TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Experience table
CREATE TABLE experience (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_link TEXT,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT[] NOT NULL,
  technologies TEXT[] NOT NULL,
  logo TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Projects table
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT NOT NULL,
  deploy TEXT,
  technologies TEXT[] NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Photos table
CREATE TABLE photos (
  id BIGSERIAL PRIMARY KEY,
  src TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  alt TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_education_order ON education("order");
CREATE INDEX idx_experience_order ON experience("order");
CREATE INDEX idx_projects_order ON projects("order");
CREATE INDEX idx_photos_order ON photos("order");

-- Enable Row Level Security (RLS)
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON education FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON photos FOR SELECT USING (true);

-- Create update triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_photos_updated_at BEFORE UPDATE ON photos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
