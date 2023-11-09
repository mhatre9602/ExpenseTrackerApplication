const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("email", email);
    if (
      isstringinvalid(name) ||
      isstringinvalid(email || isstringinvalid(password))
    ) {
      return res
        .status(400)
        .json({ err: "Bad parameters . Something is missing" });
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      console.log(err);
      await User.create({ name, email, password: hash });
      res.status(201).json({ message: "Successfuly create new user" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const generateAccessToken = (id, name, ispremiumuser) => {
  return jwt.sign({ userId: id, name: name, ispremiumuser }, "secretkey");
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isstringinvalid(email) || isstringinvalid(password)) {
      return res
        .status(400)
        .json({ message: "Email id or password is missing ", success: false });
    }
    console.log(password);
    const user = await User.findAll({ where: { email } });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          throw new Error("Something went wrong");
        }
        if (result === true) {
          return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: generateAccessToken(
              user[0].id,
              user[0].name,
              user[0].ispremiumuser
            ),
          });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Password is incorrect" });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User Does not exitst" });
    }
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};

const forgotPassword = (req, res) => {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.API_KEY;

  const tranEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: "pratikk.mhatre93@gmail.com",
  };

  const receivers = [
    {
      email: "pratikk.mhatre@gmail.com",
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "Reset password link",
      textContent: "Reset your password by clicking on this link",
    })
    .then(console.log(res))
    .catch(console.log());
};

module.exports = {
  signup,
  login,
  generateAccessToken,
  forgotPassword,
};
