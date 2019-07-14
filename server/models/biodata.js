const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const biodataSchema = new Schema({
  personal: {
    fullName: String,
    birthDate: Date,
    birthTime: String,
    height: String,
    birthPlace: String,
    complexion: String,
    bloodGroup: String,
    qualification: String,
    occupation: String,
    hobbies: String
  },
  family: {
    fatherName: String,
    fatherOccupation: String,
    motherName: String,
    motherOccupation: String,
    brothers: [],
    sisters: []
  },
  contact: {
    address: String,
    contact1: String,
    contact2: String,
    email: String
  },
  paternal: {
    grandfatherName: String,
    grandmotherName: String,
    uncles: [],
    aunts: []
  },
  maternal: {
    "grandfatherName#": String,
    "grandmotherName#": String,
    "uncles#": [],
    "aunts#": []
  }
});

module.exports = mongoose.model("biodata", biodataSchema, "info");
