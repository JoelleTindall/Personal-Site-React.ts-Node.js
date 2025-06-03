--DROP TABLE projects;


CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url text,
  imagename text not NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  userkey text not null
);

      INSERT INTO users (username, userkey)
       VALUES ('admin','admin');

--alter table projects 
--add url text;
