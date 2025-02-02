// Fetch exoplanet data from Flask API
fetch("http://127.0.0.1:5000/api/v1.0/exoplanets")
  .then(response => response.json())
  .then(data => {

    const facilityCounts = {};

    data.forEach(planet => {
        const facility = planet.discovery_facility;
        if (facility) {
            facilityCounts[facility] = (facilityCounts[facility] || 0) + 1;
        }
    });

    const sortedFacilities = Object.entries(facilityCounts).sort((a, b) => b[1] - a[1]);

    const topN = 10;
    const topFacilities = sortedFacilities.slice(0, topN);
    const otherCount = sortedFacilities.slice(topN).reduce((sum, [, count]) => sum + count, 0);

    if (otherCount > 0) {
        topFacilities.push(["Other", otherCount]);
    }

    const facilities = topFacilities.map(([facility]) => facility);
    const discoveries = topFacilities.map(([, count]) => count);

    const trace = {
        labels: facilities,
        values: discoveries,
        type: 'pie',
        hole: 0.3, // 0.3 makes donut chart
        marker: {
            colors: [
                'rgb(31, 119, 180)', 'rgb(255, 127, 14)', 'rgb(44, 160, 44)',
                'rgb(214, 39, 40)', 'rgb(148, 103, 189)', 'rgb(140, 86, 75)',
                'rgb(227, 119, 194)', 'rgb(127, 127, 127)', 'rgb(188, 189, 34)',
                'rgb(23, 190, 207)', 'rgb(100, 100, 100)' // "Other" category
              ]
        }
    };

    const layout = {
        title: "Top Exoplanets Discovered by Facility",
        margin: {l: 50, r: 50, b: 150, t: 50 },
        paper_bgcolor: 'rgb(50, 50, 50)',
        font: { color: 'white' }
    };

    Plotly.newPlot('pie-container', [trace], layout);

  })
  .catch(error => console.error("Error fetching data:", error));  // Error handling for fetch