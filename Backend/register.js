app.post('/user/register', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }
  
    // Check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error checking email.' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
  
      // Insert the new user into the database
      const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
      db.query(query, [email, password], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error registering user.' });
        }
  
        res.status(201).json({ message: 'User registered successfully.' });
      });
    });
  });
  