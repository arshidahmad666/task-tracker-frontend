import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/dashboard" style={{ marginRight: "10px", color: "#fff" }}>
        Dashboard
      </Link>
      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: "10px", color: "#fff" }}>
            Login
          </Link>
          <Link to="/signup" style={{ color: "#fff" }}>
            Signup
          </Link>
        </>
      ) : (
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
