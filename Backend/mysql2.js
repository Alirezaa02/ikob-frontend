const mysql = require('mysql2');
require('dotenv').config();


// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ali9122764609', // The root password you set earlier
  database: 'myapp' // The database you created
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});
