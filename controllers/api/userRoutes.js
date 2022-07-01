const router = require('express').Router();
const { User } = require('../../models');
const passport = require("../../config/passport");

router.post('/login', passport.authenticate("local"), async (req, res) => {
    try {
        res
            .status(200)
            .json({ user: req.user, message: "You are now logged in!" });
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
});

router.post('./signup', async (req, res) => {
    try {
        const dbUserData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
    } catch (err) {
        console.log(err.errors[0]);
        res.status(500).json({
            message: err.errors[0]["message"]
        });
    }
})

router.post('/logout', (req, res) => {
    if(req.user) {
        req.logout();
        res.redirect("/");
    } else {
        res.status(404).end();
    }
});

module.exports = router;