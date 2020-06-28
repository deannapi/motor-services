const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  User.findAll({
    email: req.body.email,
    password: req.body.password,
    miles: req.body.miles,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
      full_name: req.body.full_name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// this is for when a user logs in and it verifies if the email exists already or not
// Login route to log in to the website
router.post("/login", (req, res) => {
  // expects {email: 'email@mail.com', password: 'password1'}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.full_name = dbUserData.full_name;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });

    // if (!dbUserData) {
    //     res.status(400).json({ message: 'No user with that email address!' });
    //     return;
    // }
    // Verify user
    // const validPassword = dbUserData.checkPassword(req.body.password);
    // if(!validPassword){
    //     res.status(400).json({ message: 'Incorrect password!' });
    //     return;
    // }
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
