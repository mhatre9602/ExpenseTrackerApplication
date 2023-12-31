import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./services/Home";
import Login from "./services/Login";
import Signup from "./services/Sigup";
import Reports from "./services/Reports";
import axios from "axios";
import "../src/services/styles.css";
// https://codesandbox.io/p/sandbox/goofy-dawn-k9q46q?file=%2Futils%2Fdatabase.js%3A5%2C44

export const API_BASE_URL = "http://localhost:3001";

//decode jwt
function parseJwt(tk) {
  var base64Url = tk.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const App = () => {
  const userId = localStorage.getItem("token");
  let checkPremium;
  if (userId) {
    const decodeToken = parseJwt(userId);
    console.log("decode", decodeToken);
    checkPremium = decodeToken.ispremiumuser;
  }

  return (
    <div className="App">
      <nav>
        {userId ? (
          <>
            <NavLink
              className="link"
              to="/user/login"
              style={({ isActive }) => {
                return isActive ? { color: "black", fontWeight: "bold" } : {};
              }}
              onClick={() => {
                localStorage.removeItem("token");
                window.location.pathname = "/user/login";
              }}
            >
              Log out
            </NavLink>

            <NavLink
              className="link"
              to="/reports"
              style={({ isActive }) => {
                return isActive ? { color: "black", fontWeight: "bold" } : {};
              }}
            >
              Reports
            </NavLink>
            <NavLink
              className="link"
              to="/"
              style={({ isActive }) => {
                return isActive ? { color: "black", fontWeight: "bold" } : {};
              }}
            >
              Home
            </NavLink>
            {!checkPremium ? (
              <NavLink
                className="link"
                onClick={async (e) => {
                  const response = await axios.get(
                    "http://localhost:3001/purchase/premiummembership",
                    {
                      headers: { Authorization: localStorage.getItem("token") },
                    }
                  );
                  var options = {
                    key: response.data.key_id,
                    order_id: response.data.order.id,
                    handler: async function (response) {
                      await axios.post(
                        "http://localhost:3001/purchase/updatetransactionstatus",
                        {
                          order_id: options.order_id,
                          payment_id: response.razorpay_payment_id,
                        },
                        {
                          headers: {
                            Authorization: localStorage.getItem("token"),
                          },
                        }
                      );
                      // localStorage.setItem("premium", true);
                      alert(
                        "You are a premium user, please re-login to use features"
                      );
                      localStorage.removeItem("token");
                      window.location.pathname = "/user/login";
                    },
                  };
                  const rzp1 = new window.Razorpay(options);
                  rzp1.open();
                  e.preventDefault();

                  rzp1.on("payment-failed", function (response) {
                    console.log(response);
                    alert("Something went wrong");
                  });
                }}
                style={({ isActive }) => {
                  return isActive ? { color: "black", fontWeight: "bold" } : {};
                }}
              >
                Buy Premium
              </NavLink>
            ) : (
              ""
            )}
            {checkPremium ? <NavLink className="link">Premium</NavLink> : ""}
          </>
        ) : (
          <>
            <NavLink
              className="link"
              to="/user/login"
              style={({ isActive }) => {
                return isActive ? { color: "black", fontWeight: "bold" } : {};
              }}
            >
              Login
            </NavLink>
            <NavLink
              className="link"
              to="/user/signup"
              style={({ isActive }) => {
                return isActive ? { color: "black", fontWeight: "bold" } : {};
              }}
            >
              Signup
            </NavLink>
          </>
        )}
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
