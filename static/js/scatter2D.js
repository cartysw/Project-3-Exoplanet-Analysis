// Fetch exoplanet data from Flask API
fetch("http://127.0.0.1:5000/api/v1.0/exoplanets")
  .then(response => response.json())
  .then(data => {

    const exoplanetCounts = {};

    data.forEach(planet => {
        const exoplanet = planet.planet_name;
        if (exoplanet) {
            exoplanetCounts[exoplanet] = (exoplanetCounts[exoplanet] || 0) + 1;
        }
    });

    const sortedExoplanets = Object.entries(exoplanetCounts).sort((a, b) => b[1] - a[1]);

    const topN = 10;
    const topExoplanets = sortedExoplanets.slice(0, topN);
    const otherCount = sortedExoplanets.slice(topN).reduce((sum, [, count]) => sum + count, 0);

    if (otherCount > 0) {
        topExoplanets.push(["Other", otherCount]);
    }

    const exoplanets = topExoplanets.map(([exoplanet]) => exoplanet);
    const discoveries = topExoplanets.map(([, count]) => count);

    const trace = {
        labels: exoplanets,
        values: discoveries,
        type: 'scatter',
        marker: {
            size: 40,
            colors: [
                'rgb(31, 119, 180)', 'rgb(255, 127, 14)', 'rgb(44, 160, 44)',
                'rgb(214, 39, 40)', 'rgb(148, 103, 189)', 'rgb(140, 86, 75)',
                'rgb(227, 119, 194)', 'rgb(127, 127, 127)','rgb(100, 100, 100)' // "Other" category
              ]
        }
    };

    const layout = {
        title: "Exoplanets Discovered Over Time",
        margin: {l: 50, r: 50, b: 150, t: 50 },
        paper_bgcolor: 'rgb(50, 50, 50)',
        font: { color: 'white' }
    };

    Plotly.newPlot('scatter2d-container', [trace], layout);

  })
  .catch(error => console.error("Error fetching data:", error));  // Error handling for fetch