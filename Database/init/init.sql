--DROP TABLE projects;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_data BYTEA NOT NULL,
  image_type TEXT NOT NULL
);


