// index.js, Tomislav Lazovic, 301229459, 10/02/2022
var express = require("express");
var router = express.Router();
var users = require("../models/users")



router.get("/test", function (req, res, next) {
  res.send("test echo");
});


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home.ejs", { title: "Home" });
});

/* GET aboutMe page. */
router.get("/aboutMe", function (req, res, next) {
  res.render("aboutMe.ejs", { title: "About Me" });
});

/* GET projects page. */
router.get("/projects", function (req, res, next) {
  res.render("projects.ejs", { title: "Projects" });
});

/* GET services page. */
router.get("/services", function (req, res, next) {
  res.render("services.ejs", { title: "Services" });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login.ejs", { title: "Login" });
});

router.post("/login", function (req, res, next) {
  console.log("POST login");
  users.findOne({"username" : req.body.username}, function(err,user) {
    console.log(user);
    if(err) {
      res.redirect("/login");
    }
    else if(user.password === req.body.password) {
      res.redirect("/buisnessContacts/");
    } else {
      res.redirect("/login");
    }
  })

});

// /* GET buisnessContactList page. */
// router.get("/buisnessContact", function (req, res, next) {
//   res.render("buisnessContact.ejs", { title: "Buisness Contact List" });
//   // res.send("buisnessContactListToDo");
// });

/* GET contactMe page. */
router.get("/contactMe", function (req, res, next) {
  res.render("contactMe.ejs", { title: "Contact Me" });
});

module.exports = router;
