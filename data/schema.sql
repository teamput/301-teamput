DROP TABLE IF EXISTS user_info;
CREATE TABLE IF NOT EXISTS user_info(
  user_id SERIAL PRIMARY KEY,
  lat NUMERIC(10, 7),
  long NUMERIC(10, 7),
  location VARCHAR(255),
  hunger VARCHAR,
  interest VARCHAR(255),
  music VARCHAR(255),
  trivia VARCHAR(255)
);
INSERT INTO user_info (lat, long, location, hunger, interest, music, trivia) VALUES (12.123123123, 12.1234242, 'seattle', 'yes', 'sports', 'the beatles', 'animals');