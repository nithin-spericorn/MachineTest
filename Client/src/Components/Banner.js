import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css"
const Banner = ({ children, title, subtitle}) => {
  return (
    <>
    <div className="banner">
      <h1>{title}</h1>
      <div />
      <p>{subtitle}</p>
      
      <div className="s">
      {children}
      </div>
     
    </div>
    {title==='cart' && <div className="banner">
      <p>Number of people:3</p>
     <button>Book</button></div>}
     </>
  );
};

export default Banner;