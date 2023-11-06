import { useState } from "react";
import { API_BASE_URL } from "../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onLogin() {
    if (!(email.length && password.length)) {
      window.alert("Please fill all details.");
      return;
    }
    fetch(API_BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("userId", data.id);
        window.alert("User Login Successful");
        window.location.pathname = "/";
      })
      .catch(
        (err) => window.alert("Incorrect email or password")
        // window.alert(err.message)
      );
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <form className="login-form">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={onLogin}>
            Sign in
          </button>
        </div>
        <div class="text-center">
          <p>
            Not a member? <a href="/signup">Signup</a>
          </p>
        </div>
      </form>
    </div>
  );
}
