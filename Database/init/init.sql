--DROP TABLE categories;
--DROP TABLE projects;
--DROP TABLE users;

CREATE TABLE categories (
  id Serial PRIMARY KEY,
  category text NOT NULL);

INSERT INTO categories (category) VALUES 
  ('other'),
  ('playdate');

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url text NOT NULL,
  imagename text NOT null,
  categoryid int NOT NULL,
  CONSTRAINT fk_categories FOREIGN KEY (categoryid)
  REFERENCES categories(id)
);

ALTER TABLE projects ALTER COLUMN categoryid SET DEFAULT 1;

INSERT INTO projects (title,description,imagename,url,categoryid) VALUES
	 ('Touch Egg','A silly little game for the Playdate. Won 3 nominations! Name is self explanatory','1748896733866.png','https://play.date/games/touch-egg/',2),
	 ('Monster Elevator','Another silly little game for the Playdate. Make sandwiches for semi-randomized monsters!','1748901602251.png','https://play.date/games/monster-elevator/',2),
	 ('RPSB','My 3rd silly little game for the Playdate. Mix and mash together rocks, papers, and scissors to create explosions.','1748972401481.png','https://play.date/games/rock-paper-scissors-boom/',2),
	 ('Chat App','A simple chat application built with React, .NET Core, and Postgres','1748972468313.gif','https://github.com/JoelleTindall/.NET-Core-React-Postgres-ChatApp',1),
	 ('PHP Storefront','A very bare bones storefront application built with PHP, JavaScript, and MySQL','1748972546858.gif','https://github.com/JoelleTindall/Simple-PHP-MySQL-JS-Web-App',1),
	 ('My Site!','Yes, I made this website with React, Nodejs, and Postgres! (placeholder image)','1748972647201.gif','/',1);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username text unique not null,
  passhash text not null
);

INSERT INTO users (username, passhash) VALUES('user', '$2b$10$at0zJX/krW9x91b4xY0fhuOtm4MXt74reRE5/nCj4X2eCd4FBk4Na');