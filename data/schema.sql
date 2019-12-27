DROP TABLE IF EXISTS user_info;
CREATE TABLE IF NOT EXISTS user_info(
  user_id SERIAL PRIMARY KEY,
  lat NUMERIC(10, 7),
  long NUMERIC(10, 7),
  location VARCHAR(255),
  hungry bit,
  interest VARCHAR(255)
);
INSERT INTO user_info (lat, long, location, hungry, interest) VALUES (12.123123123, 12.1234242, 'seattle', '1', 'sports');