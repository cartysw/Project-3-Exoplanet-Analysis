// Fetch exoplanet data from Flask API
fetch("http://127.0.0.1:5000/api/v1.0/exoplanets")
  .then(response => response.json())
  .then(data => {

    // Filter out planets with null radius
    //const validExoplanets = data.filter(p => p.planet_radius !== null);

    // Gets unique methods
    const discoveryMethods = [...new Set(data.map(p => p.discovery_method))];

    // Create a color scale for the discovery methods
    const discoveryMethodColors = {
      'Transit': 'rgb(31, 119, 180)',                       // Blue
      'Radial Velocity': 'rgb(255, 127, 14)',               // Orange
      'Imaging': 'rgb(44, 160, 44)',                        // Green
      'Microlensing': 'rgb(214, 39, 40)',                   // Red
      'Eclispse Timing Variations': 'rgb(0, 204, 102)',     // Light Green
      'Astrometry': 'rgb(148, 103, 189)',                   // Purple
      'Pulsar Timing': 'rgb(255, 255, 153)',                // Yellow
      'Pulsation Timing Variations': 'rgb(153, 255, 255)',  // Cyan
      'Transit Timing Variations': 'rgb(153, 0, 0)',        // Dark Red
      'Disk Kinematics': 'rgb(0, 0, 153)',                  // Dark Blue
      'Orbital Brightness Modulation': 'rgb(153, 0, 153)',  // Dark Violet
    };

    function planetMass(mass) {
      if (!mass || mass <= 0) return 3;
      return Math.max(3, Math.log10(mass + 1) * 5);
    }

    // Define the trace for the 3D scatter plot
    const traces = discoveryMethods.map(method => {
      const filteredData = data.filter(p => p.discovery_method === method);

      return {
        x: filteredData.map(p => p.orbital_period),
        y: filteredData.map(p => p.distance_from_earth),
        z: filteredData.map(p => p.discovery_year),
        mode: 'markers',
        name: method,
        marker: {
          size: filteredData.map(p => planetMass(p.planet_mass)),
          color: discoveryMethodColors[method] || 'rgb(160, 160, 160)',
          opacity: 0.8
        },
        type: 'scatter3d',
        legendgroup: method,
        showlegend: false
      };
    });

    const legendTraces = discoveryMethods.map(method => {
      return {
        x: [null], y: [null], z: [null],
        mode: 'markers',
        name: method,
        marker: {
          size: 10,
          color: discoveryMethodColors[method] || 'rgb(160, 160, 160)',
          opacity: 1
        },
        legendgroup: method,
        showlegend: true,
        type: 'scatter3d'
      };
    });

    // Layout for the plot
    const layout = {
      margin: { l: 0, r: 0, b: 0, t: 0 },
      paper_bgcolor: 'rgb(255, 255, 255)',
      plot_bgcolor: 'rgb(255, 255, 255)',
      scene: {
        xaxis: { 
            title: 'Orbital Period [days]',
            range:[-100, 1000],
            // backgroundcolor: 'rgb(60, 60, 60)',
            // gridcolor: 'rgb(100, 100, 100)',
            // zerolinecolor: 'rgb(150, 150, 150)'
        },
        yaxis: { 
            title: 'Distance From Earth',
            range:[-100, 1000],
            // backgroundcolor: 'rgb(60, 60, 60)',
            // gridcolor: 'rgb(100, 100, 100)',
            // zerolinecolor: 'rgb(150, 150, 150)' 
        },
        zaxis: { 
            title: 'Discovery Year',
            range: [1990, 2025],
            // backgroundcolor: 'rgb(60, 60, 60)',
            // gridcolor: 'rgb(100, 100, 100)',
            // zerolinecolor: 'rgb(150, 150, 150)'
        }
      },
      showlegend: true,
      legend: {
        x: 1,
        y: .5,
        bgcolor: 'rgba(99, 99, 99, 0.5)',
        font: { color: 'white' }
      }
    };

    // Plot the chart
    Plotly.newPlot('scatter3d-container', [...traces, ...legendTraces], layout)
      .catch(error => console.error("Error during plot generation:", error)); // Error handling for plot generation
  })
  .catch(error => console.error("Error fetching data:", error));  // Error handling for fetch

