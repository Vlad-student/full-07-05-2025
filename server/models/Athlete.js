const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const athleteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      maxLength: 250,
    },
    country: {
      type: String,
      enum: CONSTANTS.COUNTRIES,
      required: true,
      trim: true,
    },
    birthYear: {
      type: Number,
      required: true,
      minYear: 1985,
      maxYear: new Date().getFullYear() - 15,
    },
    sportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sport",
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

athleteSchema.index({ name: 1, country: 1, birthYear: 1 }, { unique: true });

const Athlete = mongoose.model("Athlete", athleteSchema);

module.exports = Athlete;
