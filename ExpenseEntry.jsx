import { useState } from "react";
import { expenseTypes } from "../dummyData";
import "./styles.css";

export default function CreateExpense({ createExpense }) {
  const [expenseType, setExpenseType] = useState(null);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAnount, setExpenseAmount] = useState(null);

  return (
    <section className="my-3">
      <form className="create_expense_container d-flex flex-wrap gap-2 justify-content-center align-items-center w-100">
        <div className="mr-3">
          <select
            className="form-select"
            aria-label="Expense type selection"
            value={expenseType}
            onChange={(e) => {
              setExpenseType(e.target.value);
            }}
          >
            {expenseTypes.map((t) => (
              <option value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="expense_create_description d-flex">
          <label className="mr-3">Description</label>
          <input
            type="text"
            className="form-control mx-3"
            placeholder="Enter expense description"
            value={expenseDescription}
            onChange={(e) => {
              setExpenseDescription(e.target.value);
            }}
            required
          />
        </div>

        <div className="expense_create_description d-flex">
          <label className="mr-3">Amount ₹</label>
          <input
            type="number"
            className="form-control mx-3"
            placeholder="Enter expense amount"
            value={expenseAnount}
            onChange={(e) => {
              setExpenseAmount(e.target.value);
            }}
            required
          />
        </div>

        <div
          className="btn btn-success"
          onClick={() => {
            createExpense({
              category: expenseType,
              description: expenseDescription,
              expenseamount: expenseAnount,
            });
            setExpenseAmount(null);
            setExpenseDescription("");
          }}
        >
          Add Expense
        </div>
      </form>
    </section>
  );
}
