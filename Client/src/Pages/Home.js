import React from "react";
import { Link } from "react-router-dom";
import Hero from "../Components/Hero";
import Banner from "../Components/Banner"

const home = () => {
  return (
    <>
      <Hero>
        <Banner
          title="Toobler Softwares.."
          subtitle="please login to see the function "
        >
         
        </Banner>
      </Hero>
     
    </>
  );
};

export default home
