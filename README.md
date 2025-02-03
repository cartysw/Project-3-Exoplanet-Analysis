# Project-3-Exoplanet-Analysis
## File Structure


## Instructions to Run the Files
### 1.Pip installs
-Open a git bash terminal
-Activate the environment of your choice
-Use command `pip install flask-cors`
-Use command `pip install psycopg2`
### 2.Clone the repo
-Copy the repository URL in github
-Open a git bash terminal and locate the folder you want your repository to go
-Use command `git clone ‘https://github.com/cartysw/Project-3-Exoplanet-Analysis.git’ `

### 3. Create config.py file
-Open the cloned repository folder in VSC
-Create a new file called `config.py`
-In this file paste the following:
```Username = ‘postgres’ 
Password = ‘YOUR-POSTGRES-PASSWORD’```

### 4. Set Up the Database and Tables

**Open and Execute the Schema Script:**
  - Open PGAdmin and create a database called `exoplanet_db`
  - Open the `schema.sql` file in the new `exoplanet_db`
  - Execute the entire script to create the tables.

### 4. Import the Data

-After executing the schema, import the CSV data into the database table created
Y-ou can import the data using the **Import/Export** feature in **PGAdmin**.

### 5. Run SELECT Statement

-Open a new query and run the following command:

```sql
SELECT * FROM exoplanets;```

### 6. Run Flask API
	-Open your cloned repository folder in a git bash terminal
	-Run the command `python app.py`


### 7. Open Web Browser
	-Open the cloned repository folder in VSC
  -Right click in index.html and select 'Open with Liver Server'
