// Fetch exoplanet data from Flask API
fetch("http://127.0.0.1:5000/api/v1.0/exoplanets")
  .then(response => response.json())
  .then(data => {
    // // Process the data to create data points for each exoplanet
    // const exoplanetData = data.map((planet) => {
    //   const year = new Date(planet.release_date).getFullYear();  // Extract year
    //   const planetId = planet.planet_id; // Use planet ID as the y-axis value
      
    //   // Return data point with x as year and y as planet ID
    //   return { x: year, y: planetId, name: planet.planet_name };
    // });

  
  // Process the data to count the number of discoveries per year
  const discoveriesByYear = {};
  
  // Iterate through each exoplanet data and extract the year
  data.forEach((planet) => {
    const year = new Date(planet.release_date).getFullYear();
    if (!discoveriesByYear[year]) {
      discoveriesByYear[year] = 0;
    }
    discoveriesByYear[year]++;
  });
  
  // Prepare data for Chart.js
  const years = Object.keys(discoveriesByYear);
  const counts = Object.values(discoveriesByYear);


  
  // Create the scatter plot using Chart.js
  const ctx = document.getElementById('scatter2d-container').getContext('2d');
  
  const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Exoplanet Discoveries Over Time',
        data: years.map((year, index) => ({ x: year, y: counts[index] })),
        //data: exoplanetData,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'category',
          position: 'bottom',
          title: {
            display: true,
            text: 'Year'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Discoveries'
          },
          beginAtZero: true

        }
      }
    }
  });
})
.catch(error => console.error("Error fetching data:", error));  // Error handling for fetch
  