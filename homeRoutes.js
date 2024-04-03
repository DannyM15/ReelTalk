const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
// The withAuth middleware checks if a user is logged in by verifying the presence of the 'logged_in' property in the session object.
// If the user is logged in, it allows the request to proceed to the route handler; otherwise, it redirects the user to the login page.
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // TODO: Add a comment describing the functionality of this property
      // This property provides the template engine with information about whether the user is logged in or not.
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  // This if statement checks if the user is already logged in. If yes, it redirects the user to the homepage; otherwise, it renders the login page.
  if (req.session.logged_in) {
    res.redirect('/'); // Redirect to the homepage if already logged in
    return;
  }

  res.render('login'); // Render the login page if not logged in
});

module.exports = router;