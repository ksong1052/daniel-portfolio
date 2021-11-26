const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");


// Getting Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);    
    res.status(200).json(post);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Getting All Posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if(username) {
      posts = await Post.find({username});
    } else if(catName) {
      posts = await Post.find({categories:{
        $in: [catName]
      }})
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Creating new post
// 👍 async롤 설정하고 await로 data를 받아 오지 않으면 json형태로 데이터가 안 보내 진다.
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch(err) {
    res.status().json(err);
  }
});

// Updating Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id, 
          {
            $set: req.body
          },
          {
            new: true
          }  
        );
        res.status(200).json(updatedPost);
      } catch(err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You only can update your post!!!");
    }   
  } catch(err) {
    res.status(500).json(err);
  }
});

// Deleting Post
router.delete("/:id", async (req, res) => {  
  try {
    const post = await Post.findById(req.params.id);
    if(post.username === req.body.username) {
      try {           
        // Deleting Post
        await post.delete();
        res.status(200).json("Post has been deleted...!!!");
      } catch(err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!!!");
    }    
  } catch(err) {
    res.status(500).json(err);
  } 
});


module.exports = router;