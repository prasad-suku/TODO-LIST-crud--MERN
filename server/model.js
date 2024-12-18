const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  todo: { type: String, require: true },
  date: { type: Date },
});

const todoModel = mongoose.model("lists", TodoSchema);
module.exports = todoModel;
