# Project-3-Exoplanet-Analysis
## File Structure


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
Username = ‘YOUR-USERNAME’
Password = ‘YOUR-PASSWORD’
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

**Run SELECT Statement**

- Open a new query and run the following command:

`SELECT * FROM exoplanets;`

### 5. Run Flask API
- Open your cloned repository folder in a git bash terminal
- Run the command `python app.py`


### 6. Open Web Browser
- Open the cloned repository folder in VSC
- Right click on index.html and select 'Open with Liver Server'

### Ethical Considerations 
