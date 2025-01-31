// Fetch exoplanet data from Flask API
fetch("http://127.0.0.1:5000/api/v1.0/exoplanets")
  .then(response => response.json())
  .then(data => {
    console.log(`data: ${data.length}`);

    // Filter out planets with null radius
    const validExoplanets = data.filter(p => p.planet_radius !== null);
    console.log(`filtered data: ${validExoplanets.length}`);

    // Extract the necessary columns for plotting
    const discoveryYear = validExoplanets.map(p => p.discovery_year);
    const orbitalPeriods = validExoplanets.map(p => p.orbital_period);
    const earthDistance = validExoplanets.map(p => p.distance_from_earth);
    const discoveryMethods = validExoplanets.map(p => p.discovery_method);

    // Create a color scale for the discovery methods
    const discoveryMethodColors = {
      'Transit': 'rgb(31, 119, 180)',  // Blue
      'Radial Velocity': 'rgb(255, 127, 14)',  // Orange
      'Imaging': 'rgb(44, 160, 44)',  // Green
      'Gravitational Microlensing': 'rgb(214, 39, 40)',  // Red
      'Other': 'rgb(148, 103, 189)'  // Purple
    };

    // Map the discovery methods to colors
    const colors = discoveryMethods.map(method => {
      return discoveryMethodColors[method] || 'rgb(169, 169, 169)';  // Default to gray if not found
    });

    // Define the trace for the 3D scatter plot
    const trace = {
      x: orbitalPeriods,
      y: earthDistance,
      z: discoveryYear,  // Directly use discoveryYear
      mode: 'markers',
      marker: {
        size: 3,
        color: colors,  // Color based on discovery method
        opacity: 0.8,
        line: {
          color: 'rgba(217, 217, 217, 0.14)',
          width: 0.5
        }
      },
      type: 'scatter3d'
    };

    // Layout for the plot
    const layout = {
      margin: { l: 0, r: 0, b: 0, t: 0 },
      scene: {
        xaxis: { 
            title: 'Orbital Period [days]',
            range:[-500, 500]
        },
        yaxis: { 
            title: 'Distance From Earth',
            range:[-10000, 10000] 
        },
        zaxis: { 
            title: 'Discovery Year',
            range: [1990, 2025] }
      }
    };

    // Plot the chart
    Plotly.newPlot('scatter3d-container', [trace], layout)
      .catch(error => console.error("Error during plot generation:", error)); // Error handling for plot generation
  })
  .catch(error => console.error("Error fetching data:", error));  // Error handling for fetch

