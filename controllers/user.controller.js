module.exports.welcome = async (req, res) => {
    res.render("home");
  };
  
  module.exports.login = async (req, res) => {
    res.render("user/login", {
      layout: false
    });
  };

  module.exports.signup = async (req, res) => {
    res.render("user/signup", {
      layout: false
    });
  };


  module.exports.profile = async (req, res) => {
    res.render("user/index", {
      layout: false
    });
  };
  