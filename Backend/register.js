const bcrypt = require("bcryptjs");

// Use db.promise() to work with async/await
app.post('/user/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate the input fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields.' });
    }

    try {
        // Check if email already exists
        const [existingUsers] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database, including the username
        await db.promise().query('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashedPassword, username]);

        res.status(201).json({ message: 'User registered successfully.' });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Error registering user.' });
    }
});
