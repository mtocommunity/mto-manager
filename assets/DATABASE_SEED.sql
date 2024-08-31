USE utp_community;

CREATE TABLE user (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  discord_id CHAR(20) NOT NULL UNIQUE,
  user_code CHAR(9) NOT NULL UNIQUE,
  email CHAR(20) NOT NULL UNIQUE,
  username VARCHAR(20) NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE verification_code (
  discord_id CHAR(20) PRIMARY KEY,
  code CHAR(6) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (discord_id) REFERENCES user(discord_id)
);

CREATE TABLE team (
  team_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  display_name VARCHAR(45),
  description TEXT NOT NULL,
  member_role_id CHAR(20),
  leader_role_id CHAR(20),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_team (
  user_id INT,
  team_id INT,
  role VARCHAR(25) NOT NULL,
  joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, team_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (team_id) REFERENCES team(team_id)
);

CREATE TABLE codes_authorized (
  code CHAR(9) PRIMARY KEY
);

CREATE TABLE user_profile (
  user_id INT PRIMARY KEY,
  bio TEXT,
  url VARCHAR(32),
  display_name VARCHAR(32),
  display_code BOOLEAN NOT NULL DEFAULT TRUE,
  level INT NOT NULL DEFAULT 0, 
  experience INT NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE technologies (
  technology_id INT PRIMARY KEY AUTO_INCREMENT,
  extension VARCHAR(10),
  category enum('programming_language','framework','markup_language') NOT NULL,
  name VARCHAR(20) NOT NULL,
  emoji_id CHAR(20)
);

CREATE TABLE user_technologies (
  user_id INT,
  technology_id INT,
  PRIMARY KEY (user_id, technology_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (technology_id) REFERENCES technologies(technology_id)
);

-- Insert team data

INSERT INTO team (name, display_name, description, member_role_id, leader_role_id) VALUES
('dev', 'Dev Team', '', '1268626577093300234', '1265044817079963648'),
('net', 'Net Team', '', '1268626753472041084', '1265045063986188339'),
('os', 'OS Team', '', '1268626921378283561', '1265045188980772884'),
('iot', 'IOT Team', '', '1268626994522882129', '1265045540870033449'),
('sec', 'Security Team', '', '1268627065356156980', '1265045762178285579');

-- Insert technologies data
-- Categories
-- programming_language
-- markup_language
-- framework

-- extension of the file
-- name equals to the name of the discord emoji, lowercased

INSERT INTO technologies (extension, category, name, emoji_id) VALUES
 ('sh', 'programming_language', 'bashshell', '1277663173066887300'),
 ('c', 'programming_language', 'c_', '1277663156273156227'),
 ('c++', 'programming_language', 'cplusplus', '1277663142608113786'),
 ('c#', 'programming_language', 'csharp', '1277663125373718538'),
 ('css', 'programming_language', 'css', '1277663112123912222'),
 ('dart', 'programming_language', 'dart', '1277663098253349007'),
 ('go', 'programming_language', 'go', '1277663069555921098'),
 ('java', 'programming_language', 'java', '1277663039654592623'),
 ('kotlin', 'programming_language', 'kotlin', '1277663011645030491'),
 ('lua', 'programming_language', 'lua', '1277662999120969880'),
 ('php', 'programming_language', 'php', '1277662982628966531'),
 ('python', 'programming_language', 'python', '1277662963125194812'),
 ('r', 'programming_language', 'r_', '1277662940794847414'),
 ('ruby', 'programming_language', 'ruby', '1277662925699682398'),
 ('rust', 'programming_language', 'rust', '1277662910507913286'),
 ('sql', 'programming_language', 'sql', '1277662886314905700'),
 ('swift', 'programming_language', 'swift', '1277662874373722262'),
 ('typescript', 'programming_language', 'typescript', '1277662860012421273'),
 ('html', 'markup_language', 'html', '1277662844875309089'),
 ('javascript', 'programming_language', 'javascript', '1277662825808003126');