import React, { useState } from "react";
import reactLogo from "./news2.png";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/racer" className="title">
       
        {/* add racer sub dir for server  */}
        Race Reporter
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/racer">Home</NavLink>{" "}
          {/* add racer sub dir for server  */}
        </li>

        <li>
          <NavLink to="/training">Training Log</NavLink>
        </li>
        <li>
          <NavLink to="/blog">Race Blog</NavLink>
        </li>

        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};
