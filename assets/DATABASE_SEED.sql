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
  code CHAR(9) PRIMARY KEY,
);

-- Insert team data

INSERT INTO team (name, display_name, description, member_role_id, leader_role_id) VALUES
('dev', 'Dev Team', '', '1268626577093300234', '1265044817079963648'),
('net', 'Net Team', '', '1268626753472041084', '1265045063986188339'),
('os', 'OS Team', '', '1268626921378283561', '1265045188980772884'),
('iot', 'IOT Team', '', '1268626994522882129', '1265045540870033449'),
('sec', 'Security Team', '', '1268627065356156980', '1265045762178285579');