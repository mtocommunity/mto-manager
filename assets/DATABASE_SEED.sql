USE utp_community;

CREATE TABLE users (
    user_id CHAR(18) PRIMARY KEY,
    user_code CHAR(8) NOT NULL,
    email CHAR(20) NOT NULL UNIQUE,
    username  VARCHAR(20) NOT NULL,
);

CREATE TABLE verification_code (
  user_id CHAR(18) PRIMARY KEY,
  code CHAR(6) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);