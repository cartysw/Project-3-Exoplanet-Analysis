import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS

from config import username
from config import password


#################################################
# Database Setup
#################################################
engine = create_engine(f"postgresql://{username}:{password}@localhost:5432/exoplanet_db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Exoplanet = Base.classes.exoplanets

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/exoplanets<br/>"
        f"/api/v1.0/exoplanet_names"
    )


@app.route("/api/v1.0/exoplanet_names")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(Exoplanet.planet_name).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


@app.route("/api/v1.0/exoplanets")
def exoplanets():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of exoplanet data including the data of each exoplanet"""
    # Query all exoplanets
    results = session.query(
        Exoplanet.planet_id,
        Exoplanet.planet_name,
        Exoplanet.number_of_stars,
        Exoplanet.number_of_planets,
        Exoplanet.discovery_method,
        Exoplanet.discovery_year,
        Exoplanet.discovery_facility,
        Exoplanet.orbital_period,
        Exoplanet.planet_radius,
        Exoplanet.planet_mass,
        Exoplanet.distance_from_earth,
        Exoplanet.release_date
        ).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_exoplanets
    all_exoplanets = []
    for id, name, stars, planets, method, year, facility, orbit, radius, mass, distance, date in results:
        exoplanet_dict = {
            "planet_id": id,
            "planet_name": name,
            "number_of_stars": stars,
            "number_of_planets": planets,
            "discovery_method": method,
            "discovery_year": year,
            "discovery_facility": facility,
            "orbital_period": orbit,
            "planet_radius": radius,
            "planet_mass": mass,
            "distance_from_earth": distance,
            "release_date": date
        }
        all_exoplanets.append(exoplanet_dict)

    return jsonify(all_exoplanets)


if __name__ == '__main__':
    app.run(debug=True)
