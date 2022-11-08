// buisnessContactsList.js, Tomislav Lazovic, 301229459, Faculty Information web App,10/28/2022
// modules required for routing
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const buisnessContact = require("../models/buisnessContact")


/* GET buisnessContacts List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  console.log("main Path started.");
  buisnessContact.find({}, (err, buisnessContacts) => {
    console.log("db call finished.");
    if (err) {
      return console.error(err);
    } else {
      res.render("buisnessContacts/index", {
        buisnessContacts: buisnessContacts,
      });
      // res.send("buisnessContactList")

    }
  });
  console.log("main Path finished.");
});

// route to update view
router.get("/:id", (req, res, next) => {
    buisnessContact.findById(req.params.id, (err, buisnessContact) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("buisnessContacts/update.ejs/", {
        nextURL: "/update/" + buisnessContact._id,
        buisnessContact: buisnessContact,
      });
    }
  });
});

router.post("/:id", (req, res, next) => {
  let f = {
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  }
  buisnessContact.updateOne({_id: req.params.id}, f, {}, function (err, data) {   
    res.redirect("/buisnessContacts/");
  });
});


// route to delete
router.get("/delete/:id", (req, res, next) => {
  buisnessContact.deleteOne({_id: req.params.id}, function (err, data) {   
    res.redirect("/buisnessContacts/");
  });
});


// //  GET the faculty Details page in order to add a new faculty
// router.get("/add", (req, res, next) => {
//   res.render("faculties/add", {
//     title: "add",
//     nextURL: "/faculties/add",
//     faculties: {},
//   });
// });

// // POST process the faculty  Details page and create a new faculty  - CREATE
// router.post("/add", (req, res, next) => {
//   /*****************
//    * ADD CODE HERE *
//    *****************/
//   console.log("Post /add");
//   let f = {
//     Facultyid: req.body.Facultyid,
//     Facultyname: req.body.Facultyname,
//     Department: req.body.Department,
//     Subject: req.body.Subject,
//   }
//   faculty.create(f);
//   res.redirect("/faculties");
// });

// // GET the faculty  Details page in order to edit an existing faculty
// router.get("/:id", (req, res, next) => {
//   /*****************
//    * ADD CODE HERE *
//    *****************/
//   faculty.findById(req.params.id, function (err, data) {
//     // if (err) return handleError(err);
//     // deleted at most one tank document
//     console.log("err: " + err + ",\ndata: " + data);
//     res.render("faculties/details", {
//       title: "a",
//       nextURL: "/faculties/" + data._id,
//       faculties: data,
//     });

//   });
// });

// // POST - process the information passed from the details form and update the document
// router.post("/:id", (req, res, next) => {
//   /*****************
//    * ADD CODE HERE *
//    *****************/
//   console.log("post /id");
//   let f = {
//     Facultyid: req.body.Facultyid,
//     Facultyname: req.body.Facultyname,
//     Department: req.body.Department,
//     Subject: req.body.Subject,
//   }
//   faculty.updateOne({_id: req.params.id}, f, {}, function (err, data) {
//     // if (err) return handleError(err);
//     // deleted at most one tank document
    
//     console.log("err: " + err + ",\ndata: " + data);
//     res.redirect("/faculties");

//   });
// });

// // GET - process the delete
// router.get("/delete/:name", (req, res, next) => {
//   /*****************
//    * ADD CODE HERE *
//    *****************/
//    console.log("Post /delete");
//   //  faculty.deleteOne({Facultyname: req.params.name});
//    faculty.deleteOne({ Facultyname: req.params.name }, function (err) {
//     // if (err) return handleError(err);
//     // deleted at most one tank document
//     console.log(err);
//     res.redirect("/faculties");
//   });
// });

module.exports = router;
