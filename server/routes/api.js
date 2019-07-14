const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const biodata = require("../models/biodata");

const monogDB = process.env.MONGOLAB_URI;

mongoose.connect(monogDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
mongoose.Promise = global.Promise;

// router.get("/biodata", (req, res) => {
//   biodata.find({}).exec(function(err, data) {
//     if (err) console.log("Error retrieving biodata");
//     else res.json(data);
//   });
// });

router.post("/biodata", (req, res) => {
  let newbiodata = new biodata(req.body);
  newbiodata.save(function(err, insertedBiodata) {
    if (err) console.log(err);
    else res.json(insertedBiodata);
  });
});

module.exports = router;
