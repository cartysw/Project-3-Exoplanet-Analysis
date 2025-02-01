-- Drop tables
DROP TABLE IF EXISTS exoplanets;

-- CREATE exoplanet table --
CREATE TABLE exoplanets (
	planet_id SERIAL PRIMARY KEY,
	planet_name VARCHAR(100) NOT NULL,
	number_of_stars INTEGER,
	number_of_planets INTEGER,
	discovery_method VARCHAR(100),
	discovery_year INTEGER,
	discovery_facility VARCHAR(100),
	orbital_period FLOAT,
	planet_radius FLOAT,
	planet_mass FLOAT,
	distance_from_earth FLOAT,
	release_date DATE
);

-- Verify table creation and data import --
--SELECT * FROM exoplanets;