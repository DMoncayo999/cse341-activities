//TA05 COMPTROLLER 
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  req.session.style =
    typeof req.session.style === "undefined" ? false : req.session.style;
  req.session.counter =
    typeof req.session.counter === "undefined" ? 0 : req.session.counter;

  res.render("pages/ta05", {
    title: "Team Activity 05",
    path: "/ta05", // For EJS
    counter: req.session.counter,
    style: req.session.style,
  });
});

router.get("/change-style", (req, res, next) => {
  req.session.style = !req.session.style;

  res.render("pages/ta05", {
    title: "Team Activity 05",  
    path: "/ta05/change-style",
    counter: req.session.counter,
    style: req.session.style,
  });
});

router.post("/counter", (req, res, next) => {
  if (req.body.increase === "true") {
    req.session.counter++;
  } else {
    req.session.counter--;
  }

  res.render("pages/ta05", {
    path: "/ta05/update-counter",
    title: "Team Activity 05",
    counter: req.session.counter,
    style: req.session.style,
  });
});

router.get("/reset", (req, res, next) => {
  req.session.destroy();
  res.redirect("/ta05");
});

module.exports = router;

