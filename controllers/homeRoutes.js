const router = require('express').Router();
const { User, Comment, Review } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render('homepage', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/review/:id', async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const review = reviewData.get({ plain: true });

    res.render('review', {
      review: review,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review, Comment }],
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

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/createuser', (req, res) => {
  res.render('createuser');
}
)

router.get('/createreview', withAuth, (req, res) => {
  res.render('createreview', {

    logged_in: req.session.logged_in,
  });
}
)

module.exports = router;
