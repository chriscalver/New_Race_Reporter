import React, { useState, useEffect } from "react";
import reactLogo2 from "./thatdamhill.png";
import Marquee from "react-fast-marquee";

export const About = () => {
  const [token, setToken] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      <section className="content_section">
        <div className="container2">
          <div className="item item-1"></div>
          <div className="item item-2">
            <img src={reactLogo2} className="mainlogo" />
          </div>
          <div className="item item-3"></div>

          <div className="item-4">
          <center>
            <div className="marquee">
            <Marquee
              delay={0}
              gradient="true"
              gradientWidth={100}
              direction="left"
              speed={100}
              className=""
            >
              <div className="image_wrapper">
                hey
              </div>
              <div className="image_wrapper">
                you
              </div>
            </Marquee>
            </div>
            </center>

          </div>

          <div className="item item-5" id="chart"></div>
        </div>
      </section>
    </div>
  );
};
