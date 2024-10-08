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
    const id = userinfo.length + 1; // simple way to assign ID
    const user = { id, name, title, descriptions };
    userinfo.push(user);
    res.json(user);
});
app.patch('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userinfo.find(user => user.id === userId);

    if (user) {
        const { name, title, descriptions } = req.body;
        // Update only the provided fields
        if (name) user.name = name;
        if (title) user.title = title;
        if (descriptions) user.descriptions = descriptions;

        res.json({ message: "User updated", user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Delete a user by ID
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
