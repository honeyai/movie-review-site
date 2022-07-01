require("dotenv");
const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const axios = require("axios");

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    let title = newPost.dataValues.title.toLowerCase();
    let movieTitle = await axios.get(`https://imdb-api.com/en/API/SearchTitle/${process.env.IMDB_KEY}/${title}`).catch((err) => {
        console.error("error", err.message);
      });
    const isValidMovie = async (movie) => {
      console.log("movietite", movie.data.results);
      if(movieTitle.data.results.length === 0) return false;
      else return true;
    }
    if(await isValidMovie(movieTitle)) {
      console.log("movie found");
      
      res.status(200).json(newPost);
    } else {
      console.log("no movie found");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
