import express from "express";
import mongoose from "mongoose";
import Blog from "./models/blog.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(express.json());
const port = 8080;

async function main() {
  try {
    await mongoose.connect(process.env.MANGO_URL);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  
  }
}
main(); 

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
  
 // post 
app.post("/add", (req, res) => {
  console.log("Request body received:", req.body);

  const article = new Blog({
    title: req.body.title,
    body: req.body.body,
    name: req.body.name,
    isEmployee: req.body.isEmployee,
  });

  article
    .save() 
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error("Error details:", err);
      res.status(500).json({ error: "Failed to save article", details: err });
    });
});
 // get all
app.get("/articles", (req, res) => {
  Blog.find()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch articles", details: err });
    });
});
// get one by id
app.get("/articles/:id", (req, res) => {
    const articleId = req.params.id;   
    Blog.findById(articleId)
      .then((article) => {
        if (article) {
          res.status(200).json(article);  
        } else {
          res.status(404).json({ message: "Article not found" });  
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to fetch article", details: err });
      });
  });
  //update
app.patch("/update/:id", (req, res) => {
  const articleId = req.params.id;
  const updateData = req.body;  

  Blog.findByIdAndUpdate(articleId, updateData, { new: true })
    .then((updatedArticle) => {
      if (updatedArticle) {
        res.status(200).json({ message: "Article updated", article: updatedArticle });
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update article", details: err });
    });
});
//delete
app.delete("/delete/:id", (req, res) => {
    const articleId = req.params.id;
  
    Blog.findByIdAndDelete(articleId)
      .then((deletedArticle) => {
        if (deletedArticle) {
          res.status(200).json({ message: "Article deleted", article: deletedArticle });
        } else {
          res.status(404).json({ message: "Article not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to delete article", details: err });
      });
  });
  

// Route to create a new article

// app.get('/artical', (req, res) => {
//   const article = new Blog({
//     title: "nora",
//     body: "this is body",
//   });

//   article.save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Failed to save article", details: err });
//     });
// });
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
 
// -----------------  //

// lab tuseday


// let userinfo = [];  
// // Get all users
// app.get('/user', (req, res) => {
//     res.json(userinfo);
// });

// // Add a new user
// app.post('/user', (req, res) => {
//     const { name, title, descriptions } = req.body;
//     const id = userinfo.length + 1;  
//     const user = { id, name, title, descriptions };
//     userinfo.push(user);
//     res.json(user);
// });

 
// app.post('/signup', (req, res) => {
//     const { name, email, password } = req.body;

    
//     const userExists = userinfo.find(user => user.email === email);
//     if (userExists) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

    
//     const newUser = { id: userinfo.length + 1, name, email, password };  
//     userinfo.push(newUser);

//     res.status(201).json({ message: 'User registered successfully' });
// });


// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

     
//     const user = userinfo.find(user => user.email === email);
//     if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }

    
//     if (user.password !== password) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }

    
//     res.json({ message: 'Login successful', user });
// });

 
// app.patch('/user/:id', (req, res) => {
//     const userId = parseInt(req.params.id);
//     const user = userinfo.find(user => user.id === userId);

//     if (user) {
//         const { name, title, descriptions } = req.body;

//         if (name) user.name = name;
//         if (title) user.title = title;
//         if (descriptions) user.descriptions = descriptions;

//         res.json({ message: "User updated", user });
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
// });

 
// app.delete('/user/:id', (req, res) => {
//     const userId = parseInt(req.params.id);
//     const index = userinfo.findIndex(user => user.id === userId);

//     if (index !== -1) {
//         const deletedUser = userinfo.splice(index, 1);
//         res.json({ message: "User deleted", user: deletedUser });
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

