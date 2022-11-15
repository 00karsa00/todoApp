const express = require('express');
const router = express.Router();
const service = require('./todoListService');
const repository = require("./todoLisRepository");
const utils = require('./utils');


var verifyToken = async (req, res, next) => {
  let respose = {};
  utils.verifyJWTToken(req.headers.authorization, async (userDetail) => {
    if (userDetail.error) {
      return res.send(userDetail);
    }
    console.log(userDetail);
    let checkEmail = await repository.getUserDetails(userDetail.data.email);
    if (checkEmail.error) return cb(checkEmail);

    if (checkEmail.data.length == 0) {
      respose = {
        message: `${data.email} is invalid.`,
        error: true,
      };
      return cb(respose);
    }
    req.userDetail = userDetail.data
    next();
  });
};

router.post('/register', (req, res) => {
    service.registerUser(req.body, (result) => {
        console.log("result =>",result)
       res.send(result)
    });
});

router.post('/login', (req, res) => {
    service.userLogin(req.body, (result) => {
        console.log("result =>",result)
       res.send(result)
    });
});

router.post('/addTodo',verifyToken, (req, res) => {
    req.body.userId = req.userDetail._id;
    service.addTodoData(req.body, (result) => {
        console.log("result =>",result)
       res.send(result)
    });
});

router.post('/getAllTodo',verifyToken, (req, res) => {
    req.body.userId = req.userDetail._id;
   service.getAllTodo(req.body, (result) => {
        console.log("result =>",result)
       res.send(result)
    });
});

router.post('/updateStatus',verifyToken, (req, res) => {
  req.body.userId = req.userDetail._id;
  service.updateStatus(req.body, (result) => {
      console.log("result =>",result)
     res.send(result)
  });
});


 
module.exports = router;