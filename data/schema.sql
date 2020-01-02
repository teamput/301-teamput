DROP TABLE IF EXISTS user_info;
CREATE TABLE
IF NOT EXISTS user_info
(
  user_id SERIAL PRIMARY KEY,
  lat NUMERIC
(10, 7),
  long NUMERIC
(10, 7),
  location VARCHAR
(255),
  hunger VARCHAR,
  interest VARCHAR
(255),
  music VARCHAR
(255), 
  trivia VARCHAR(255)
);
INSERT INTO user_info (lat, long, location, hunger, interest, music, trivia) VALUES (12.123123123, 12.1234242, 'seattle', 'yes', 'sports', 'the beatles', 'animals');

DROP TABLE IF EXISTS news_favs;
CREATE TABLE
IF NOT EXISTS news_favs
(
  headline text,
  abstract text,
  web_url VARCHAR
(255),
  date VARCHAR
(50),
  byline VARCHAR
(255),
  image VARCHAR
(255),
  source VARCHAR
(255)
);

DROP TABLE IF EXISTS events_favs;
CREATE TABLE
IF NOT EXISTS events_favs
(
  url VARCHAR
(255),
  title VARCHAR
(255),
  venue_name VARCHAR
(255),
  city_name VARCHAR
(50),
  start_time VARCHAR
(35),
  description TEXT
);

DROP TABLE IF EXISTS music_favs;
CREATE TABLE
IF NOT EXISTS music_favs
(
  name VARCHAR
(50),
  teaser TEXT,
  wikilink VARCHAR
(100),
  youtubelink VARCHAR
(100)
);

DROP TABLE IF EXISTS yelp_favs;
CREATE TABLE
IF NOT EXISTS yelp_favs
(
  id VARCHAR
(100),
  name VARCHAR
(50),
  image_url VARCHAR
(255),
  is_closed VARCHAR
(5),
  rating NUMERIC
(2, 1),
  price VARCHAR
(5),
  distance NUMERIC
(20, 15)
);
