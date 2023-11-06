const User = require("../models/user");
const Expense = require("../models/expenses");
const bcrypt = require("bcrypt");

function isEmailUnique(email) {
  return User.count({ where: { email: email } }).then((count) => {
    if (count != 0) {
      return false;
    }
    return true;
  });
}

exports.signUp = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (isEmailUnique(email)) {
    bcrypt.hash(password, 10, async (err, hash) => {
      const response = await User.create({
        name,
        email,
        password: hash,
      });
      res.send(response);
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await User.findAll({
    where: {
      email,
    },
  });
  console.log(response[0].password);
  if (response) {
    bcrypt.compare(password, response[0].password, (err, result) => {
      if (result === true) {
        res.send(response);
      }
    });
  }
};
