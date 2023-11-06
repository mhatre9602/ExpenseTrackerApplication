import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./services/Home";
import Login from "./services/Login";
import Signup from "./services/Sigup";
import Reports from "./services/Reports";

import "../src/services/styles.css";
// https://codesandbox.io/p/sandbox/goofy-dawn-k9q46q?file=%2Futils%2Fdatabase.js%3A5%2C44

export const API_BASE_URL = "http://localhost:3001";

const App = () => {
  const userId = localStorage.getItem("userId");
  return (
    <div className="App">
      <nav>
        {userId ? (
          <>
            <NavLink
              className="link"
              to="/"
              style={({ isActive }) => {
                return isActive ? { color: "black", fontWeight: "bold" } : {};
              }}
            >
              Home
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
              to="/login"
              style={({ isActive }) => {
                return isActive ? { color: "black", fontWeight: "bold" } : {};
              }}
              onClick={() => {
                localStorage.removeItem("userId");
                window.location.pathname = "/login";
              }}
            >
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="link"
              to="/login"
              style={({ isActive }) => {
                return isActive ? { color: "black", fontWeight: "bold" } : {};
              }}
            >
              Login
            </NavLink>
            <NavLink
              className="link"
              to="/signup"
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
