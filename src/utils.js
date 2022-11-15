const jwt = require("jsonwebtoken");
const jwtKey = "shhhhh";

exports.createJWTToken = (data) => {

  let token = jwt.sign(data, jwtKey);
  return token;
};

exports.verifyJWTToken = (token, cb) => {
  jwt.verify(token, "shhhhh", function (err, decoded) {
    if (err) {
        console.log("err => ",err)
        return cb({error: true, message: "Authorization error."})
    }
    return cb({error: false, data: decoded})
  });
};



