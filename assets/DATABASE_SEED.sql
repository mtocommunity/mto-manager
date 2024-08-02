USE utp_community;

CREATE TABLE user (
    user_id CHAR(20) PRIMARY KEY,
    user_code CHAR(9) NOT NULL UNIQUE,
    email CHAR(20) NOT NULL UNIQUE,
    username VARCHAR(20) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE verification_code (
  user_id CHAR(20) PRIMARY KEY,
  code CHAR(6) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);