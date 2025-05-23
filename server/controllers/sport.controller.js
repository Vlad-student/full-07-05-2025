const fs = require("fs/promises");
const path = require("path");
const createError = require("http-errors");
const Sport = require("../models/Sport");
const CONSTANTS = require("../constants");

module.exports.createSport = async (req, res, next) => {
  try {
    const image = req.file
      ? `/${CONSTANTS.UPLOAD_FOLDER}${req.file.filename}`
      : null;
    const body = { ...req.body, image };
    console.log(body);
    const newSport = await Sport.create(body);
    res.status(201).send({ data: newSport });
  } catch (error) {
    console.log(error);
    next(createError(400, error.message));
  }
};

module.exports.findAllSports = async (req, res, next) => {
  try {
    const { limit, skip } = req.pagination;
    const sports = await Sport.find(req.filter).skip(skip).limit(limit);
    res.status(200).send({ data: sports });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.findSportById = async (req, res, next) => {
  try {
    const sport = await Sport.findById(req.params.idSport).populate({
      path: "athletes",
    });
    if (!sport) {
      return res.status(400).send("sport not found");
    }
    res.status(200).send({ data: sport });
  } catch (error) {
    next(error);
  }
};

module.exports.updateSportById = async (req, res, next) => {
  try {
    const { idSport } = req.params;
    const { name, isOlimpic } = req.body;
    const sport = await Sport.findById(idSport).populate({
      path: "athletes",
    });
    if (!sport) {
      return next(createError(400, "sport not found"));
    }
    if (req.file) {
      if (sport.image) {
        const imagePath = path.join(__dirname, "..", sport.image);
        await fs.unlink(imagePath);
      }
      sport.image = `/${CONSTANTS.UPLOAD_FOLDER}${req.file.filename}`;
    }
    sport.name = name || sport.name;
    if (isOlimpic !== undefined) {
      sport.isOlimpic = isOlimpic;
    }
    const updateSport = await sport.save();
    res.status(200).send({ data: updateSport });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.deleteSportById = async (req, res, next) => {
  try {
    const { idSport } = req.params;
    const deletedSport = await Sport.findByIdAndDelete(idSport);
    if (!deletedSport) {
      return next(createError(404, "sport not found"));
    }
    if (deletedSport.image) {
      const imagePath = path.join(__dirname, "..", deletedSport.image);
      console.log(imagePath);
      await fs.unlink(imagePath);
    }
    res.status(200).send({ data: deletedSport });
  } catch (error) {
    next(error);
  }
};
