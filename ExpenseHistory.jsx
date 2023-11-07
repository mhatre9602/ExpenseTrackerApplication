import { format } from "date-fns";

export default function ExpenseHistoryTable({ data, deleteExpense }) {
  return (
    <section>
      <table className="table mx-5">
        <thead>
          <tr>
            <th className="col">Date</th>
            <th className="col">Category</th>
            <th className="col">Description</th>
            <th className="col">Amount</th>
            {!window.location.pathname.includes("/reports") ? <th></th> : ""}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr>
              <td scope="row">
                {d.createdAt
                  ? format(new Date(d.createdAt), "dd MMM yyyy")
                  : ""}
              </td>
              <td>{d.category}</td>
              <td>{d.description}</td>
              <td>₹{parseFloat(d.expenseamount).toFixed(2)}</td>
              {!window.location.pathname.includes("/reports") ? (
                <td>
                  <div className="btn">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </div>
                  <div
                    className="btn"
                    onClick={() => {
                      deleteExpense(d.id);
                    }}
                  >
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#e10e0e" }}
                    ></i>
                  </div>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
