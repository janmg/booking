USE mysql;
CREATE DATABASE booking;
CREATE USER 'booking'@'localhost' IDENTIFIED BY 'booking';
GRANT ALL PRIVILEGES ON booking.* TO 'booking'@'localhost' WITH GRANT OPTION;

USE booking;
CREATE TABLE booking (email TEXT NOT NULL, created TEXT NOT NULL, venue TEXT NOT NULL, people TEXT NOT NULL, eventdate TEXT NOT NULL, duration INT NOT NULL, price INT NOT NULL, country TEXT NOT NULL)

INSERT INTO booking VALUES ('jan@janmg.com', '2018-01-01 10:20:05.123', 'suomenlinna', 'mommy, daddy and little kids', '2019-02-18 08:00:00.000', 60, 37, 'fi');
INSERT INTO booking VALUES ('test@janmg.com', '2018-01-01 10:20:05.123', 'Mutteri', 'superman, batman and spiderman', '2019-02-18 08:00:00.000', 180, 500, 'fi');
