const mongoose = require("mongoose");
const db = require("./dbConnection");
const user = require("./dbSchema/users");
const todoList = require("./dbSchema/todoList");

exports.insertUser = (data) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      var insertUser = new user(data);
      insertUser.save(function (err, data) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
          };
        } else {
          respose = {
            error: false,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
      };
      resolve(respose);
    }
  });
};

exports.getUserDetails = (email) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      user.find({ email: email }, function (err, results) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
          };
          resolve(respose);
        } else {
          respose = {
            error: false,
            data: results,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
      };
      resolve(respose);
    }
  });
};

exports.insertTodo = (data) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      let todoInsert = new todoList(data);
      todoInsert.save(function (err, data) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
          };
        } else {
          respose = {
            error: false,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
      };
      resolve(respose);
    }
  });
};

exports.getAllTodo = (data) => {
  let respose = {};
  return new Promise((resolve) => {
    let whareData = {}
    data.status != 'all' ? whareData.status = data.status: '';
    whareData.userId = data.userId 
    whareData.isDelete = 0;
    console.log(whareData)
    try {
      todoList.find(whareData, function (err, results) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
          };
          resolve(respose);
        } else {
          respose = {
            error: false,
            data: results,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
      };
      resolve(respose);
    }
  });
};

exports.updateStatus = (status,id) => {
  let respose = {};
  return new Promise((resolve) => {
    try {
      let updateData = {};
      updateData.status = status;
      status == 'deleted'? updateData.isDelete = 1:'';
      todoList.updateOne({ _id: id },updateData, function (err, results) {
        if (err) {
          console.log("error => ", err);
          respose = {
            error: true,
            message: "Database Error",
          };
          resolve(respose);
        } else {
          respose = {
            error: false,
            data: results,
          };
          resolve(respose);
        }
      });
    } catch (err) {
      console.log(err);
      respose = {
        message: `Internal Error.`,
        error: true,
      };
      resolve(respose);
    }
  });
};