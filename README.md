# Project-3-Exoplanet-Analysis
## File Structure
```
Project-3-Exoplanet-Analysis
│  .gitignore
│  app.py
│  config.py
│  Exoplanet Discovery Project Proposal.docx
│  exoplanets.js
│  index.html
│  Project-3-Visualization-Concepts-Sketch.png
│  README.md
│
├─Data
│    exoplanetDataClean.csv
│    exoplanets.json
│    schema.sql
│
└─static
  ├─css
  │      style.css
  │
  ├─images
  │  │  2k_sun.jpg
  │  │  earth_texture.jpg
  │  │  jupiter.jpg
  │  │  mars.jpg
  │  │  mercury.jpg
  │  │  neptune.jpg
  │  │  saturn.jpg
  │  │  uranus.jpg
  │  │  venus.jpg
  │  │  venus_atm.jpg
  │  │
  │  └─exoplanets
  │          ceres.jpg
  │          eris.jpg
  │          haumea.jpg
  │          makemake.jpg
  │
  └─js
          3D_scatter.js
          pie.js
          spacekit.js
```

## Instructions to Run the Files
### 1. Pip installs
- Open a git bash terminal
- Activate the environment of your choice
- Use command `pip install flask-cors`
- Use command `pip install psycopg2`
### 2. Clone the repo
- Copy the repository URL in github
- Open a git bash terminal and locate the folder you want your repository to go
- Use command `git clone ‘https://github.com/cartysw/Project-3-Exoplanet-Analysis.git’ `

### 3. Create config.py file
- Open the cloned repository folder in VSC
- Create a new file called `config.py`
- In this file paste the following:
```
username = ‘YOUR-USERNAME’
password = ‘YOUR-PASSWORD’
```
- Replace with your postgres username and password
> **_NOTE:_**  The username for postgres is usually 'postgres'

### 4. Set up the Database and Tables
**Open and Execute the Schema Script:**
- Open PGAdmin and create a database called `exoplanet_db`
- Open the `schema.sql` file in the new `exoplanet_db`
- Execute the entire script to create the tables

**Import the Data**

- After executing the schema, import the CSV data into the database table created
- You can import the data using the **Import/Export** feature in **PGAdmin**
> **_NOTE:_** When the import box appears, go to the columns tab and uncheck the column `planet_id`

**Run SELECT Statement**

- Open a new query and run the following command:

`SELECT * FROM exoplanets;`

### 5. Run Flask API
- Open your cloned repository folder in a git bash terminal
- Run the command `python app.py`


### 6. Open Web Browser
- Open the cloned repository folder in VSC
- Right click on index.html and select 'Open with Liver Server'

## Ethical Considerations
The ethical considerations surrounding the Exoplanet Archive data primarily revolve around issues of accessibility, data usage, and transparency. The archive, which provides valuable scientific data about exoplanets, is generally open to the public, allowing researchers and the general public to explore space discoveries. However, it’s crucial that the data is used responsibly, ensuring that findings are communicated accurately and transparently, avoiding misinterpretations that could lead to misinformation. Furthermore, while the data itself doesn’t typically contain personal information, ethical considerations about the environmental impact of space exploration and the effects of such discoveries on societal values and policies must also be acknowledged. Something to highlight is the 'controversial flag' column in this data. The presense of this information shows transparency about exoplanets that are currently being debated, but in doing so awknowledges that there is un-confirmed public information regarding exoplanets online. For our use of this data specifically, we decided not to use any exoplanets that were flagged as controversial and focused only on those that were not debated.

## Sources
### Dataset
- https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PS
### Code
- https://plotly.com/javascript/3d-scatter-plots/
- https://github.com/typpo/spacekit?tab=readme-ov-file
- https://typpo.github.io/spacekit/docs/index.html
### Textures
- https://www.solarsystemscope.com/textures/
### Special Thanks
- https://github.com/zachnguyen/Exoplanets-Visualization
