// spacekit.js

// Initialize SpaceKit
const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: 'https://typpo.github.io/spacekit/src',
});
  
// Create a background using Yale Bright Star Catalog data.
viz.createStars();
  
// Create the sun using a preset space object.
viz.createObject('sun', Spacekit.SpaceObjectPresets.SUN);

const ephem = new Spacekit.Ephem({
  epoch: 2458600.5,
  a: 0.00001,
  e: 0.19893,
  i: 22.11137,
  om: 294.42992,
  w: 314.28890,
  ma: 229.14238,
}, 'deg');

// Adjusts rotation speed based on radius
function calculateRotationSpeed(radius) {
  // Larger radius = slower rotation
  const baseSpeed = 0.1;
  const rotationSpeed = baseSpeed / radius;
  return rotationSpeed;
}

let currentExoplanet = null;
let currentPlanet = null;

const textures = [
  "./static/images/exoplanets/ceres.jpg",
  "./static/images/exoplanets/eris.jpg",
  "./static/images/exoplanets/haumea.jpg",
  "./static/images/exoplanets/makemake.jpg",
  "./static/images/venus.jpg",
];

const solarSystemPlanets = {
  mercury: { texture: './static/images/mercury.jpg', radius: 0.38 },
  venus: { texture: './static/images/venus_atm.jpg', radius: 0.95 },
  earth: { texture: './static/images/earth_texture.jpg', radius: 1 },
  mars: { texture: './static/images/mars.jpg', radius: 0.53 },
  jupiter: { texture: './static/images/jupiter.jpg', radius: 11.2 },
  saturn: { texture: './static/images/saturn.jpg', radius: 9.45 },
  uranus: { texture: './static/images/uranus.jpg', radius: 4.0 },
  neptune: { texture: './static/images/neptune.jpg', radius: 3.9 },
}

// Updates solar system planet visualization
function updateSolarSystemPlanet(selectedPlanet) {
  const planetData = solarSystemPlanets[selectedPlanet];
  if (!planetData) return;

  if (currentPlanet) {
    viz.removeObject(currentPlanet);
  }

  let rotationSpeed = calculateRotationSpeed(planetData.radius);

  currentPlanet = viz.createSphere(selectedPlanet, {
    ephem,
    position: [-5, 0, 0],
    textureUrl: planetData.texture,
    radius: planetData.radius,
    rotation: {
      enable: true,
      speed: rotationSpeed,
    },
  });

  // Reset slider to default
  document.getElementById('earthSlider').value = -5;
}

// Make Earth selected by default
const solarSystemDropdown = document.getElementById('solarSystemDropdown');
solarSystemDropdown.value = 'earth';

updateSolarSystemPlanet('earth');

solarSystemDropdown.addEventListener('change', function() {
  updateSolarSystemPlanet(this.value);
});

// Fetch exoplanet data from Flask API
fetch("http://127.0.0.1:5000/api/v1.0/exoplanets")
   .then(response => response.json())
   .then(data => {
      //console.log(data);
      console.log(`data: ${data.length}`);

      const minReleaseYear = 2025;

      // Filter out planets with null radius and release year past 2015
      const validExoplanets = data.filter(p => {
        if (p.release_date) {
          const year = new Date(p.release_date).getFullYear();
          return p.planet_radius !== null && year >= minReleaseYear;
        }
        return false;
    });

      console.log(`filtered data: (after ${minReleaseYear}): ${validExoplanets.length}`)

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
        const defaultPlanet = validExoplanets[0];
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

  // Calculate rotation speed
  let rotationSpeed = calculateRotationSpeed(planet.planet_radius);

  // Add new exoplanet
  currentExoplanet = viz.createSphere(planet.planet_name.toLowerCase(), {
    ephem,
    position: [5, 0, 0],
    rotation: {
      enable: true,
      speed: rotationSpeed,
    },
    radius: planet.planet_radius,
    textureUrl: randomTexture,
  });

  // Reset slider to default
  document.getElementById('exoplanetSlider').value = 5;
}

// Add event listeners for sliders
document.getElementById('earthSlider').addEventListener('input', function() {
  if (currentPlanet) {
    const xPos = Number(this.value);
    currentPlanet.setPosition(xPos, 0, 0);
  }
});

document.getElementById('exoplanetSlider').addEventListener('input', function() {
  if (currentExoplanet) {
    const xPos = Number(this.value);
    currentExoplanet.setPosition(xPos, 0, 0);
  }
});