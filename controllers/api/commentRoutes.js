const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/comments route
router.get('/', (req, res) => {
  if (req.session) {
  try {
    Comment.findAll()
    .then(CommentData => res.json(CommentData))
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }};
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });
    console.log("New user comment =====>", newComment);

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;