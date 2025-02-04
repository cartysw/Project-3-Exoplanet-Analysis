// Fetch exoplanet data from Flask API
fetch("http://127.0.0.1:5000/api/v1.0/exoplanets")
    .then(response => response.json())
    .then(data => {
        // Count number of discoveries per year
        let yearCounts = {};

        data.forEach(planet => {
          let year = parseInt(planet.discovery_year); // Convert to number
          if (!isNaN(year)) {  // Ensure it's a valid year
              yearCounts[year] = (yearCounts[year] || 0) + 1;
          }
        });

        // Convert data to arrays for plotting
        let years = Object.keys(yearCounts).map(Number).sort((a, b) => a - b);
        let counts = years.map(year => yearCounts[year]);

        // Create line chart trace
        let trace = {
            x: years,
            y: counts,
            mode: 'lines+markers',
            type: 'scatter',
            line: { shape: 'linear', color: 'cyan', width: 2 },
            marker: { size: 6, color: 'cyan' }
        };

        // Chart layout
        let layout = {
            title: 'Exoplanet Discoveries Over Time',
            xaxis: { title: 'Year of Discovery', tickmode: "linear", dtick: 2 },
            yaxis: { title: 'Number of Planets Discovered' },
            plot_bgcolor: "#2a2a2a",
            paper_bgcolor: "#2a2a2a",
            font: { color: "white" }
        };

        // Render the chart in a container
        Plotly.newPlot('line-container', [trace], layout);
    })
    .catch(error => console.error("Error fetching data:", error));