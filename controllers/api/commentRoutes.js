const router = require('express').Router();
// const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/comments route
router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log("New user comment =====>", newComment);
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;