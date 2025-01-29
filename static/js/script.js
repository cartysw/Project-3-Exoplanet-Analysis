const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
    basePath: 'https://typpo.github.io/spacekit/src',
  });
  
  // Create a background using Yale Bright Star Catalog data.
  viz.createStars();
  
  // Create our first object - the sun - using a preset space object.
  viz.createObject('sun', Spacekit.SpaceObjectPresets.SUN);

  //viz.createObject('earth', Spacekit.SpaceObjectPresets.EARTH);

  viz.createSphere('earth', {
    position: [-5, 0, 0],
    textureUrl: './static/images/earth_texture.jpg',
    radius: 2,
    debug: {
      showAxes: true,
    },
  });

  // Example exoplanets array
  const exoplanets = [
    { name: 'Kepler-22b', size: '2.4', distance: '620' },
    { name: 'Kepler-452b', size: '1.6', distance: '1400' },
    { name: 'hat-p-67b', size: '1.2', distance: '4.2' },
  ];

  let currentExoplanet = null;
  
  // Populate the dropdown with options dynamically
  const planetDropdown = document.getElementById('planetDropdown');
  exoplanets.forEach(planet => {
    const option = document.createElement('option');
    option.value = planet.name;
    option.textContent = planet.name;
    planetDropdown.appendChild(option);
  });

  planetDropdown.addEventListener('change', function() {
    const selectedPlanet = planetDropdown.value;

    // Remove previous exoplanet if one exists
    if (currentExoplanet) {
        viz.removeObject(currentExoplanet);
    }
  
    // Add the new selected exoplanet
    if (selectedPlanet === 'Kepler-22b') {
        currentExoplanet = viz.createSphere('kepler-22b', {
            position: [5, 0, 0],
            radius: 2.1,
            //scale: [2.1, 2.1, 2.1],
            textureUrl: './static/images/ceres.jpg'
        });
    } else if (selectedPlanet === 'Kepler-452b') {
        currentExoplanet = viz.createSphere('kepler-452b', {
            position: [5, 0, 0],
            radius: 1.5,
            //scale: [1.5, 1.5, 1.5],
            textureUrl: './static/images/eris.jpg'
        });
    } else if (selectedPlanet === 'hat-p-67b') {
        currentExoplanet = viz.createSphere('HAT-P-67b', {
            position: [5, 0, 0],
            radius: 22.6,
            //scale: [22.6, 22.6, 22.6],
            textureUrl: './static/images/haumea.jpg'
        });
    }
  });