var mongoose = require("mongoose");

var TodoList = new mongoose.Schema({
  userId: String,
  title: String,
  status: String,
  date: Date,
  isDelete: { type: Number, default: 0},
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("todoList", TodoList, "todoList");
