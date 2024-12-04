
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());  // Middleware to parse JSON requests
app.use(cors());  // Enable CORS

const JWT_SECRET = 'mySuperSecretKey123';

const db = mysql.createConnection({
  host: 'sql.freedb.tech',
  user: 'freedb_nitish29',  
  password: '4!86*jSwjVxnZbq',  
  database: 'freedb_n29-db'
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Dashboard Route: This route requires JWT authentication
app.get('/dashboard', authenticateJWT, (req, res) => {
  const summary = "Generative AI is revolutionizing several industries, including healthcare, finance, and creative arts. By leveraging deep learning models, these technologies can generate new content, such as images, text, and music, based on large datasets. In this project, we will explore the significance of generative AI advancements and their technical implications.";
  const techStack = "This project uses Node.js for the backend, MySQL for database management, Angular for the frontend, and JWT for authentication.";
  res.json({ summary, techStack });
});

app.get('/summary-chart', authenticateJWT, async (req, res) => {
    try {
      // Query for pie chart data
      const [pieChartRows] = await db.promise().query(`
        SELECT industry, application_share
        FROM generative_ai_industries
      `);
  
      // Query for line chart data
      const [lineChartRows] = await db.promise().query(`
        SELECT year, research_papers_published
        FROM generative_ai_growth
      `);
  
      // Send response
      res.json({
        pieChartData: pieChartRows,
        lineChartData: lineChartRows
      });
    } catch (error) {
      console.error('Error fetching summary chart data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.get('/reports-chart', authenticateJWT, async (req, res) => {
try {
    // Query for stacked bar chart data
    const [barChartRows] = await db.promise().query(`
    SELECT industry, investment_2019, investment_2020, investment_2021
    FROM generative_ai_investment
    `);

    // Query for heatmap data
    const [heatmapRows] = await db.promise().query(`
    SELECT technology, healthcare, automotive, entertainment, finance, retail, education
    FROM generative_ai_tech_adoption
    `);

    // Send response
    res.json({
    barChartData: barChartRows,
    heatmapData: heatmapRows
    });
} catch (error) {
    console.error('Error fetching reports chart data:', error);
    res.status(500).json({ message: 'Internal server error' });
}
});
  
// User registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      // Check if the username already exists
      const queryCheck = 'SELECT * FROM users WHERE username = ?';
      const [rows] = await db.promise().query(queryCheck, [username]);
  
      if (rows.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the user into the database
      const queryInsert = 'INSERT INTO users (username, password) VALUES (?, ?)';
      await db.promise().query(queryInsert, [username, hashedPassword]);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      // Find the user in the database
      const query = 'SELECT * FROM users WHERE username = ?';
      const [rows] = await db.promise().query(query, [username]);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const user = rows[0];
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// JWT Authentication Middleware
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = user; // Attach the user to the request object
      next();
    });
  }
  

// Start the server on port 3000
app.listen(3000,'0.0.0.0', () => {
  console.log('Server is running on http://localhost:3000');
});
