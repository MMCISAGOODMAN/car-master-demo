-- Car Master 数据库初始化脚本
-- SQLite

CREATE TABLE IF NOT EXISTS part_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS parts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  fault_symptoms TEXT,
  image_url TEXT,
  FOREIGN KEY (category_id) REFERENCES part_categories(id)
);

CREATE TABLE IF NOT EXISTS fault_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faults (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  symptoms TEXT,
  causes TEXT,
  related_parts TEXT,
  solutions TEXT,
  danger_level TEXT,
  FOREIGN KEY (category_id) REFERENCES fault_categories(id)
);

CREATE INDEX IF NOT EXISTS idx_parts_category ON parts(category_id);
CREATE INDEX IF NOT EXISTS idx_parts_name ON parts(name);
CREATE INDEX IF NOT EXISTS idx_faults_category ON faults(category_id);
CREATE INDEX IF NOT EXISTS idx_faults_title ON faults(title);
