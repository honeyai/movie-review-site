require("dotenv");
const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const axios = require("axios");

// /api/posts routes
router.get('/', (req, res) => {
  try {Post.findAll({
    attributes: ['id', 'title', 'review', 'date_created'],
    order: [['date_created', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
} catch(err) {
    console.log(err);
    res.status(500).json(err);
  };
});


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
      if(movieTitle.data.results.length === 0) return false;
      else return true;
    }
    if(await isValidMovie(movieTitle)) {
      let results = movie.data.results;
      console.log("results", results);
      res.status(200).json(newPost);
    } else {
      console.log("no movie found");
    }
  } catch (err) {
    res.status(400).json(err.message);
    console.log("New user post =====>", newPost);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No posts found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
