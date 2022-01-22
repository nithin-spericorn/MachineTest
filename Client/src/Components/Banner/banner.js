import React from 'react'

import { Link } from 'react-router-dom'
import classes from "./Banner.module.css"
const Banner = () => {
    const Exploref=()=>{
        
    }
    return (
        <div className={classes.banner}>
          <div className={classes.con}>
              <Link to="/explore" className={classes.b1}><h1>Explore</h1></Link>
              <Link to="/booking" className={classes.b2}><h1>Room Booking</h1></Link>
          </div>
        </div>
    )
}

export default Banner
