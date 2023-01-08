--? Run this script to configure postgis schema on the db

CREATE EXTENSION postgis;

CREATE SCHEMA postgis;

ALTER DATABASE "sp-db";

SET
  search_path = public,
  postgis;

UPDATE
  pg_extension
SET
  extrelocatable = true
WHERE
  extname = 'postgis';

ALTER EXTENSION postgis;

SET SCHEMA
  postgis;

ALTER EXTENSION postgis
UPDATE
  TO "3.3.2next";

ALTER EXTENSION postgis
UPDATE
  TO "3.3.2";