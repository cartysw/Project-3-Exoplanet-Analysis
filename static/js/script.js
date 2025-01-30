// script.js

// Initialize SpaceKit
const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: 'https://typpo.github.io/spacekit/src',
});
  
// Create a background using Yale Bright Star Catalog data.
viz.createStars();
  
// Create the sun using a preset space object.
viz.createObject('sun', Spacekit.SpaceObjectPresets.SUN);

//viz.createObject('earth', Spacekit.SpaceObjectPresets.EARTH);

// Create sphere for Earth object
viz.createSphere('earth', {
  position: [-5, 0, 0],
  textureUrl: './static/images/earth_texture.jpg',
  radius: 2,
  //debug: {
    //showAxes: true,
  //},
});

// Example exoplanets array
// const exoplanets = [
//   { name: 'Kepler-22b', size: '2.4', distance: '620', radius: 2.1, texture: './static/images/exoplanets/ceres.jpg' },
//   { name: 'Kepler-452b', size: '1.6', distance: '1400', radius: 1.5, texture: './static/images/exoplanets/eris.jpg' },
//   { name: 'HAT-p-67b', size: '1.2', distance: '4.2', radius: 22.6, texture: './static/images/exoplanets/haumea.jpg' },
// ];

let currentExoplanet = null;

const textures = [
  "./static/images/exoplanets/ceres.jpg",
  "./static/images/exoplanets/eris.jpg",
  "./static/images/exoplanets/haumea.jpg",
  "./static/images/exoplanets/mars.jpg",
  "./static/images/exoplanets/makemake.jpg",
  "./static/images/exoplanets/mercury.jpg",
  "./static/images/exoplanets/venus.jpg",
  "./static/images/exoplanets/venus_atm.jpg",
  "./static/images/exoplanets/saturn.jpg",
  "./static/images/exoplanets/uranus.jpg",
  "./static/images/exoplanets/neptune.jpg",
];

// Fetch exoplanet data from Flask API
fetch("http://127.0.0.1:5000/api/v1.0/exoplanets")
   .then(response => response.json())
   .then(data => {
      //console.log(data);
      console.log(`data: ${data.length}`);

      // Filter out planets with null radius
      const validExoplanets = data.filter(p => p.planet_radius !== null);
      console.log(`filtered data: ${validExoplanets.length}`)

      // Create a dropdown with exoplanets dynamically
      const planetDropdown = document.getElementById('planetDropdown');
      planetDropdown.innerHTML = ''; // clear previous options

      // Populate dropdown with exoplanet names
      validExoplanets.forEach(planet => {
        const option = document.createElement('option');
        option.value = planet.planet_id;
        option.textContent = planet.planet_name;
        planetDropdown.appendChild(option);
      });

      // Set default exoplanet in dropdown and update visualization
      if (validExoplanets.length > 0) {
        const defaultPlanet = validExoplanets[2]; //validExoplanets.find(p => p.planet_id === 1);
        planetDropdown.value = defaultPlanet.planet_id;
        updateExoplanet(defaultPlanet.planet_id, validExoplanets);
      }

      // Event listener to update the visualization when new exoplanet is selected
      planetDropdown.addEventListener('change', function() {
        updateExoplanet(Number(this.value), data);
      });
   })
   .catch(error => console.error("Error fetching data:", error));

// Updates exoplanet visualization
function updateExoplanet(planetId, data) {
  // Find selected planet
  const planet = data.find(p => p.planet_id === Number(planetId));
  if (!planet) return;

  // Remove previous planet if exists
  if (currentExoplanet) {
    viz.removeObject(currentExoplanet);
  }

  // Select random texture for exoplanet
  const randomTexture = textures[Math.floor(Math.random() * textures.length)];

  // Add new exoplanet
  currentExoplanet = viz.createSphere(planet.planet_name.toLowerCase(), {
    position: [5, 0, 0],
    radius: planet.planet_radius,
    textureUrl: randomTexture,
  });
}