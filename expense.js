const Expense = require("../models/expenses");
const { Op } = require("sequelize");
const User = require("../models/users");

const addexpense = (req, res) => {
  const { expenseamount, description, category } = req.body;

  if (expenseamount == undefined || expenseamount.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Parameters missing" });
  }

  Expense.create({ expenseamount, description, category, userId: req.user.id })
    .then((expense) => {
      const total_cost = Number(req.user.totalExpenses) + Number(expenseamount);
      console.log(total_cost);
      User.update(
        {
          totalExpenses: total_cost,
        },
        {
          where: { id: req.user.id },
        }
      )
        .then(async () => {
          return res.status(201).json({ expense: expense });
        })
        .catch((err) => {
          return res.status(500).json({ success: false, error: err });
        });
    })
    .catch(async (err) => {
      return res.status(500).json({ success: false, error: err });
    });
};

const getexpenses = (req, res) => {
  let whereClause = {};
  if (req.query.type == "daily" && req.query.start.length) {
    whereClause = {
      ...whereClause,
      createdAt: {
        [Op.between]: [
          req.query.start + " 00:00:00",
          req.query.start + " 23:59:59",
        ],
      },
    };
  }
  if (
    req.query.type == "monthly" &&
    req.query.start.length &&
    req.query.end.length
  ) {
    whereClause = {
      ...whereClause,
      createdAt: {
        [Op.between]: [
          req.query.start + " 00:00:00",
          req.query.end + " 23:59:59",
        ],
      },
    };
  }

  //for normal expense reports
  Expense.findAll({ where: { ...whereClause, userId: req.user.id } })
    .then((expenses) => {
      return res.status(200).json({ expenses, success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err, success: false });
    });
};

const deleteexpense = (req, res) => {
  const expenseid = req.params.expenseid;
  if (expenseid == undefined || expenseid.length === 0) {
    return res.status(400).json({ success: false });
  }
  Expense.destroy({ where: { id: expenseid, userId: req.user.id } })
    .then((noofrows) => {
      if (noofrows === 0) {
        return res.status(404).json({
          success: false,
          message: "Error deleting the expense",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Deleted Successfuly" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ success: true, message: "Failed" });
    });
};

module.exports = {
  deleteexpense,
  getexpenses,
  addexpense,
};
