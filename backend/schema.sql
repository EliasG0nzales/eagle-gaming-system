CREATE DATABASE IF NOT EXISTS dashboard_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE dashboard_db;

CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(120)  NOT NULL,
  email         VARCHAR(200)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  role          ENUM('admin','user') NOT NULL DEFAULT 'user',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS excel_records (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  filename    VARCHAR(255) NOT NULL,
  sheet_name  VARCHAR(100),
  row_index   INT UNSIGNED NOT NULL,
  data        JSON         NOT NULL,
  uploaded_by INT UNSIGNED,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS change_history (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  record_id    INT UNSIGNED NOT NULL,
  field_name   VARCHAR(100) NOT NULL,
  old_value    TEXT,
  new_value    TEXT,
  changed_by   INT UNSIGNED,
  changed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (record_id)  REFERENCES excel_records(id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT IGNORE INTO users (name, email, password_hash, role) VALUES (
  'Administrador',
  'admin@empresa.com',
  '$2a$12$KIXIhk3xjDCbLoEZqEpKuuaI7UYoFiJjb9ZhKz8skNAuwQgUKOTiq',
  'admin'
);
