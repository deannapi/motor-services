const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  User.findAll({
    email: req.body.email,
    password: req.body.password,
    miles: req.body.miles,
    oil_type: req.body.oil_type
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234', 'oil_type: 'Synthetic' OR 'Conventional'}
  User.create({
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    oil_type: req.body.oil_type
    // Conventional is default, add checkbox to switch to Synthetic
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this is for when a user logs in and it verifies if the email exists already or not
// Login route to log in to the website
router.post("/login", async (req, res) => {
  // expects {email: 'email@mail.com', password: 'password1'}
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(400).json({ message: 'No user with that email address!' });
    return;
  }
  // Verify user
  console.log(req.body.password);
  const validPassword = await user.checkPassword(req.body.password);
  if (!validPassword) {
    res.status(400).json({ message: 'Incorrect password!' });
    return;
  }

  req.session.save(() => {
    req.session.user_id = user.id;
    req.session.full_name = user.full_name;
    req.session.loggedIn = true;

    res.json({ user, message: "You are now logged in!" });
  });
});

router.put("/:id", withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
