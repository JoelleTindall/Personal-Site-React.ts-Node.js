--DROP TABLE projects;
--DROP TABLE users;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url text,
  imagename text not NULL
);

INSERT INTO projects (title,description,imagename,url) VALUES
	 ('Touch Egg','A silly little game for the Playdate. Won 3 nominations! Name is self explanatory','1748896733866.png','https://play.date/games/touch-egg/'),
	 ('Monster Elevator','Another silly little game for the Playdate. Make sandwiches for semi-randomized monsters!','1748901602251.png','https://play.date/games/monster-elevator/'),
	 ('RPSB','My 3rd silly little game for the Playdate. Mix and mash together rocks, papers, and scissors to create explosions.','1748972401481.png','https://play.date/games/rock-paper-scissors-boom/'),
	 ('Chat App','A simple chat application built with React, .NET Core, and Postgres','1748972468313.gif','https://github.com/JoelleTindall/.NET-Core-React-Postgres-ChatApp'),
	 ('PHP Storefront','A very bare bones storefront application built with PHP, JavaScript, and MySQL','1748972546858.gif','https://github.com/JoelleTindall/Simple-PHP-MySQL-JS-Web-App'),
	 ('My Site!','Yes, I made this website with React, Nodejs, and Postgres! (placeholder image)','1748972647201.gif','/');


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username text unique not null,
  passhash text not null
);
