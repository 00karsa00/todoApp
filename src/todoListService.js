const repository = require("./todoLisRepository");
const utils = require("./utils");

exports.registerUser = async (data, cb) => {
  try {
    let respose = {};
    let checkEmail = await repository.getUserDetails(data.email);
    if (checkEmail.error) return cb(checkEmail);

    if (checkEmail.data.length > 0) {
      respose = {
        message: `${data.email} email is already register.`,
        error: true,
      };
      return cb(respose);
    }
    
    let insertValue = {
      email: data.email,
      name: data.name,
      password: data.password,
    };

    let insertRes = await repository.insertUser(insertValue);
    if (insertRes.error) return cb(insertRes);

    respose = {
      message: `Register Successfully`,
      error: false,
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
    };
    return cb(respose);
  }
};

exports.userLogin = async (data, cb) => {
  try {
    let respose = {};
    let checkEmail = await repository.getUserDetails(data.email);
    if (checkEmail.error) return cb(checkEmail);

    if (checkEmail.data.length == 0) {
      respose = {
        message: `${data.email} email is not register.`,
        error: true,
      };
      return cb(respose);
    }
    let userDetail = JSON.parse(JSON.stringify(Object.create(checkEmail.data[0])));
    if (userDetail.password != data.password) {
      respose = {
        message: `Password is mismatched`,
        error: true,
      };
      return cb(respose);
    }
    delete userDetail.password;
    let token = utils.createJWTToken(userDetail);
    respose = {
      message: `Login Successfully.`,
      token: token,
      error: false,
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
    };
    return cb(respose);
  }
};

exports.addTodoData = async (data, cb) => {
  try {
    let respose = {};
    let insertValue = {
      userId: data.userId,
      title: data.title,
      status: data.status,
      date: data.date,
    };
    let insertRes = await repository.insertTodo(insertValue);
    if (insertRes.error) return cb(insertRes);

    respose = {
      message: `Todo Added Successfully`,
      error: false,
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
    };
    return cb(respose);
  }
};

exports.getAllTodo = async (data, cb) => {
  try {
    let respose = {};
    let getTodoList = await repository.getAllTodo(data);
    if (getTodoList.error) return cb(getTodoList);
    respose = {
      message: `Data get Successfully`,
      data: getTodoList.data,
      error: false,
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
    };
    return cb(respose);
  }
};

exports.updateStatus = async (data, cb) => {
  console.log("data =>",data)
  try {
    let respose = {};
    let statusUpdate = await repository.updateStatus(data.status, data.id);
    if (statusUpdate.error) return cb(statusUpdate);
    respose = {
      message: `Data Updated Successfully`,
      data: statusUpdate.data,
      error: false,
    };
    return cb(respose);
  } catch (e) {
    console.log("error => ", e);
    respose = {
      message: `Internal Error.`,
      error: true,
    };
    return cb(respose);
  }
};
