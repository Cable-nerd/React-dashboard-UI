import React from "react";
import "./navbar.scss";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src="/app (14).svg" alt="" className="" />
          <span>Cable</span>
        </div>
        <div className="icons">
          <img  src="app (24).svg" alt="" className="icon" />
          <img  src="app (1).svg" alt="" className="icon" />
          <img  src="app (2).svg" alt="" className="icon" />
          <div className="notification">
            <img src="/app (16).svg" alt="" />
            <span>1</span>
          </div>
        
        <div className="user">
          <img src="/young-woman-blue-sweater-autumn-park.jpg" alt="" />
          <span>YourName</span>
        </div>
        <img src="app (26).svg" alt="" className="" />
       </div>
      </div>
    </>
  );
};

export default Navbar;
