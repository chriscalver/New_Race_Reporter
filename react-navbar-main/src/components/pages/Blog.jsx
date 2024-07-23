import React from "react";
import reactLogo2 from "./thatdamhill.png";
import Marquee from "react-fast-marquee";
import chatIcon from "./chatIcon.png";

export const Blog = () => {
  return (
    <div>
      <section className="content_section">
        <div className="container2">
          <div className="item item-1"></div>
          <div className="item item-2">
            <img src={reactLogo2} className="mainlogo" />
          </div>
          <div className="item item-3"></div>
          <div className="item item-4">
            {/* <img src={reactLogo2} className="mainlogo2" /> */}

            {/* <div className="windowWidth"></div> */}

            <table className="table2">
              <tr>
                <td width="35%"></td>

                <td width="">
                  <Marquee delay={2} gradient="true" gradientWidth={50} direction="left" speed={30} className="">
                  ...................
                    <img width="20" src={chatIcon} />
                   
                    Come back for hourly update with pictures, videos, and a
                    full pain report
                  </Marquee>
                </td>

                <td width="30%"></td>
              </tr>
            </table>
            <h1 className="header">Blog</h1>
            {/* <div>Race Reporter</div> */}
          </div>
          <div className="item item-5" id="chart"></div>
        </div>
      </section>
    </div>
  );
};
