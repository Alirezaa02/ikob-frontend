app.post('/user/login', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }
  
    // Check if the user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Error logging in.' });
      if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password.' });
  
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password.' });
  
      res.status(200).json({ message: 'Login successful.' });
  });
  });
  