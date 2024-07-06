import React, { useState, useEffect } from "react";
import axios from "axios";

import reactLogo2 from "./thatdamhill.png";
import reactLogo4 from "./strava.svg";
// import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const data2 = [
  {
    name: "Wk 1",
    kms: 32,
    pv: 2400,
    amt: 10,
  },
  {
    name: "Wk 2",
    kms: 28,
    pv: 1398,
    amt: 20,
  },
  {
    name: "Wk 3",
    kms: 36,
    pv: 9800,
    amt: 30,
  },
  {
    name: "Wk 4",
    kms: 30,
    pv: 3908,
    amt: 40,
  },
];
let percentage = 82;
let AccessCode = "";

const distanceGoal = 1500;

var d = new Date();
// console.log(d);
var day = d.getDay(),
  diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
var newdate = new Date(d.setDate(diff));
// var hour = newdate.getHours();
// var mins = newdate.getMinutes();
// var secs = newdate.getSeconds();

// console.log(newdate);
// console.log(hour);
// console.log(mins);
// console.log(secs);

newdate.setHours(0);
newdate.setMinutes(0);
newdate.setSeconds(0);

// console.log(newdate);
// console.log(hour);
// console.log(mins);
// console.log(secs);

//var epoch = newdate.getTime() - newdate.getMilliseconds() / 1000;

var myEpoch = newdate.getTime() / 1000.0;
// console.log(myEpoch);

let Monday = myEpoch.toFixed();
// console.log(myEpoch.toFixed());

export const Training = () => {
  const [token, setToken] = useState([]);
  const [stravaData, setStravaData] = useState([]);

  useEffect(() => {
    async function getData() {
      const request = await fetch(
        "https://www.strava.com/oauth/token?client_id=105639&client_secret=7189c307da8243d844c6baa42687e07b6bf2602f&refresh_token=12e9e2963c28b90e2c2da47839f26875c76952f1&grant_type=refresh_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const response = await request.json();

      // const fetchedData = await fetch("https://www.chriscalver.com/employeeregisterapibk/api/Employee/");
      // const data3 = await fetchedData.json();

      setToken(response);
      // setStravaData(response.access_token);
      AccessCode = response.access_token;
      // console.log(data3);

      async function getActivities() {
        const endpoint2 = await fetch(
          // "https://www.strava.com/api/v3/athlete/activities?access_token=" + AccessCode);

        //   "https://www.strava.com/api/v3/athlete/activities?access_token=" +
        //     AccessCode +
        //     "&after=" +
        //     Monday
        // );

        "https://www.strava.com/api/v3/athletes/27856438/stats?access_token=" + AccessCode);

        const response = await endpoint2.json();
        //console.log(response);
        setStravaData(response);
         //console.log(response);

      }
      getActivities();
    }
    getData();
  }, []);

  //console.log(token);
  // console.log(stravaData.ytd_run_totals.distance);

  // async function fetchData() {
  //   const response = await fetch(
  //     "https://www.chriscalver.com/employeeregisterapibk/api/Employee/"
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // }
  // fetchData();
 console.log(stravaData.ytd_run_totals.distance);
percentage = stravaData.ytd_run_totals.distance / distanceGoal /10;
 console.log(percentage);
return (
    <div>
      <section className="content_section">
        <div className="container3">
          {/* <div className="item item-1"></div>
          <div className="item item-2">
            <img src={reactLogo2} className="mainlogo" />
          </div>
          <div className="item item-3"></div> */}
          <div className="item item-4">
            <div style={{ marginTop: 10 }}>
              <h1 className="header">2024 Training Log</h1>
            </div>
            <div>
              <img src={reactLogo4} width="200" style={{ marginRight: 30 }} />
            </div>
            <h1 className="header3">Last Four weeks</h1>
            <center>
              {" "}
              <BarChart
                width={400}
                height={200}
                data={data2}
                margin={{
                  top: 5,
                  right: 80,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey="amt" />
                <Tooltip />
                <Legend />
                {/* <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} /> */}
                <Bar
                  dataKey="kms"
                  fill="#B1312A"
                  activeBar={<Rectangle fill="#C5A432" stroke="purple" />}
                />
              </BarChart>
              <table className="table1">
                <tr>
                  <th>Total Runs:</th>
                  {/* <td>{recentRunCount[0].employeeID}</td> */}
                  <td>19</td>
                </tr>
                <tr>
                  <th>Distance:</th>
                  {/* <td>{recentRunCount[0].employeeID} kms</td> */}
                  <td>138 kms</td>
                </tr>
              </table>
              {/* <h1 className="header3">Year to Date Stats</h1> */}
              <h1 className="header3">Year to Date Stats</h1>
              <div>
                {/* <img src={reactLogo4} width="100" style={{ marginRight: 30 }}/> */}
                <table className="table1">
                  <tr>
                    <th>Total Runs:</th>
                    <td>{stravaData.ytd_run_totals.count}</td>
                    {/* <td>{stravaData}</td> */}
                  </tr>
                  <tr>
                    <th>Distance:</th>
                    <td>{stravaData.ytd_run_totals.distance /1000}</td>
                    {/* <td>620 kms</td> */}
                  </tr>
                  <tr>
                    <th>Goal:</th>
                    <td>{distanceGoal} kms</td>
                    {/* <td>1500 kms</td> */}
                  </tr>
                </table>
              </div>
              <div style={{ width: 200, height: 200, marginRight: 30 }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage.toFixed()}%`}
                  styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                      // Path color

                      stroke: "#B1312A",

                      // stroke: `rgba(62, 152, 199, ${percentage / 100})`,
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "round",
                      // Customize transition animation
                      transition: "stroke-dashoffset 0.5s ease 0s",
                      // Rotate the path
                      //  transform: 'rotate(0.25turn)',
                      transformOrigin: "center center",
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                      // Trail color
                      stroke: "#C5A432",
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "butt",
                      // Rotate the trail
                      transform: "rotate(0.25turn)",
                      transformOrigin: "center center",
                    },
                    // Customize the text
                    text: {
                      // Text color
                      fill: "#B1312A",
                      // Text size
                      fontSize: "16px",
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                      fill: "#3e98c7",
                    },
                  }}
                />
                ;
              </div>
            </center>
          </div>
          <div className="item item-5" id="chart"></div>
        </div>
      </section>
    </div>
  );
};
