const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs"); // Hashing passwords
const jwt = require("jsonwebtoken"); // Generating JWT tokens

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS with the frontend URL
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL (React)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json()); // Parse incoming JSON requests

// MySQL database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Register User (Hashed Password)
app.post("/user/register", async (req, res) => {
  const { email, password, username } = req.body;

  console.log('Request data:', req.body); // Log the incoming data for debugging

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log the hashed password to verify it's being hashed correctly
    console.log('Hashed password:', hashedPassword);

    // Insert the user into the database (including the username)
    const query = "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
    await db.execute(query, [email, hashedPassword, username]);

    // Send response indicating successful registration
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('Error during registration:', err); // Log any errors
    res.status(500).json({ message: "Registration failed" });
  }
});


// ✅ Login User (Compare Hashed Passwords & Generate JWT)
app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [users] = await db.execute(query, [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});

