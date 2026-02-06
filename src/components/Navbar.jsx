import { NavLink, Link } from "react-router";
import { useState } from "react";
import "../styles/navbar.css";

export function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <nav className="navbar">
        <h2 className="logo">
          <Link to="/" onClick={closeMenu}>RHYTHM</Link>
        </h2>

        {/* Hamburger / Close */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/week" onClick={closeMenu}>Weekly</NavLink>
          <NavLink to="/Todolist" onClick={closeMenu}>ToDo List</NavLink>
          <NavLink to="/settings" onClick={closeMenu}>Settings</NavLink>
        </div>
      </nav>

      {/* Overlay (click outside to close) */}
      {open && <div className="nav-overlay" onClick={closeMenu} />}
    </>
  );
}
