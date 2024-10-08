import express from "express";

const app = express();
app.use(express.json());
const port = 8080;

let userinfo = [];  
// Get all users
app.get('/user', (req, res) => {
    res.json(userinfo);
});

// Add a new user
app.post('/user', (req, res) => {
    const { name, title, descriptions } = req.body;
    const id = userinfo.length + 1;  
    const user = { id, name, title, descriptions };
    userinfo.push(user);
    res.json(user);
});

 
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    
    const userExists = userinfo.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    
    const newUser = { id: userinfo.length + 1, name, email, password };  
    userinfo.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

     
    const user = userinfo.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    if (user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    res.json({ message: 'Login successful', user });
});

 
app.patch('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userinfo.find(user => user.id === userId);

    if (user) {
        const { name, title, descriptions } = req.body;

        if (name) user.name = name;
        if (title) user.title = title;
        if (descriptions) user.descriptions = descriptions;

        res.json({ message: "User updated", user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

 
app.delete('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = userinfo.findIndex(user => user.id === userId);

    if (index !== -1) {
        const deletedUser = userinfo.splice(index, 1);
        res.json({ message: "User deleted", user: deletedUser });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
