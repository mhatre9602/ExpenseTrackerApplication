const User = require("../models/user");
const Expense = require("../models/expenses");

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
    const response = await User.create({
      name,
      email,
      password,
    });
    res.send(response);
  } else {
    throw new Error("User already exists");
  }
};

exports.login = async (req, res, next) => {
  const response = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  res.send(response);
};
