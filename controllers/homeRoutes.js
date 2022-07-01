const router = require('express').Router();
const { default: axios } = require('axios');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  const movieData = await axios.get(`https://imdb-api.com/en/API/MostPopularMovies/k_sd1gb1q4`).catch((err) => {
    res.json(err);
  });
  for (let i=0; i < 10; i++){
    console.log(movieData.data.items[i]);
  }
});

router.get('/posts', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'review',
      'date_created'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('post', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// TODO  scrap route.   Use for API movie info if enought time? -bg
router.get('/posts/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'review',
      'title',
      'date_created'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      console.log(post);
      //TODO create an api handlebar page!! -bg
      res.render('post', { post, loggedIn: req.session.loggedIn });


    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to profile route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
