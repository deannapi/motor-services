const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      console.log("this is a test");
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;