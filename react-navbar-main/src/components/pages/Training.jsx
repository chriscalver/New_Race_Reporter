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

var AccessCode = "";
const YTDdistanceGoal = 1500;
var YTDpercentage = 0;
var YTDrunTotals = 0;
var YTDdistance = 0;

var RecentRuns = 0;
var RecentKms = 0;

var d = new Date();
var day = d.getDay(),
  diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
var newdate = new Date(d.setDate(diff));
newdate.setHours(0);
newdate.setMinutes(0);
newdate.setSeconds(0);
var myEpoch = newdate.getTime() / 1000;

var weekOneStart = Math.floor(myEpoch);
// console.log(weekOneStart);
var weekOneEnd = weekOneStart + 604799;
var weekOneTotal = 0;

var weekTwoStart = weekOneStart - 604800;
var weekTwoEnd = weekOneStart - 1;
var weekTwoTotal = 0;


var weekThreeStart = weekOneStart - 1209600;
var weekThreeEnd = weekOneStart - 1209600 + 604799;
var weekThreeTotal = 0;


var weekFourStart = weekOneStart - 1814400;
var weekFourEnd = weekOneStart - 1814400 + 604799;
var weekFourTotal = 0;

var data2 = [
  {
    name: "Wk 1",
    kms: 32,
    pv: 2400,
    amt: 15,
  },
  {
    name: "Wk 2",
    kms: 28,
    pv: 1398,
    amt: 30,
  },
  {
    name: "Wk 3",
    kms: 24,
    pv: 9800,
    amt: 45,
  },
  {
    name: "Wk 4",
    kms: 39,
    pv: 3908,
    amt: 60,
  },
];

export const Training = () => {
  const [token, setToken] = useState([]);
  const [stravaData, setStravaData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [weeklyTotals, setWeeklyTotals] = useState([
    {
      name: "Wk 1",
      kms: 0,
      amt: 15,
    },
    {
      name: "Wk 2",
      kms: 0,
      amt: 30,
    },
    {
      name: "Wk 3",
      kms: 0,
      amt: 45,
    },
    {
      name: "Wk 4",
      kms: 0,
      amt: 60,
    },
  ]);

  useEffect(() => {
    async function getCode() {
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

      setToken(response);
      AccessCode = response.access_token;
      // console.log(AccessCode);

      async function getStats() {
        // api call for stats below

        const endpointStats = await fetch(
          "https://www.strava.com/api/v3/athletes/27856438/stats?access_token=" +
            AccessCode
        );
        const statsResponse = await endpointStats.json();
        // console.log(statsResponse);
        setStravaData(statsResponse);
        // console.log(stravaData);
        // data2[0].kms = statsResponse.recent_run_totals.distance / 1000;
        YTDpercentage =
          statsResponse.ytd_run_totals.distance / YTDdistanceGoal / 10;
        YTDrunTotals = statsResponse.ytd_run_totals.count;
        YTDdistance = statsResponse.ytd_run_totals.distance / 1000;
        RecentRuns = statsResponse.recent_run_totals.distance / 1000;
        RecentKms = statsResponse.recent_run_totals.count;






        // weekly api calls below

        const weekFourActivities = await fetch(
          "https://www.strava.com/api/v3/athlete/activities?access_token=" +
            AccessCode +
            "&after=" +
            weekFourStart +
            "&before=" +
            weekFourEnd
        );        

        const weekFourResponse = await weekFourActivities.json();
        // console.log("wk4" + weekFourResponse);
        weekFourTotal = weekFourResponse.map((weekFour) => weekFour.distance);
        let wk4Sum = 0;
        weekFourTotal.forEach((el) => (wk4Sum += el));
        weekFourTotal = wk4Sum;
        wk4Sum = wk4Sum / 1000;
        wk4Sum = wk4Sum.toFixed(1);
        // console.log(wk4Sum);
        // setActivities(weekFourTotal);

        const weekThreeActivities = await fetch(
          "https://www.strava.com/api/v3/athlete/activities?access_token=" +
            AccessCode +
            "&after=" +
            weekThreeStart +
            "&before=" +
            weekThreeEnd
        );
        const weekThreeResponse = await weekThreeActivities.json();
        // console.log("wk3" + weekThreeResponse);

        weekThreeTotal = weekThreeResponse.map((weekThree) => weekThree.distance);
        let wk3Sum = 0;
        weekThreeTotal.forEach((el) => (wk3Sum += el));
        weekThreeTotal = wk3Sum;
        wk3Sum = wk3Sum / 1000;
        wk3Sum = wk3Sum.toFixed(1);

        const weekTwoActivities = await fetch(
          "https://www.strava.com/api/v3/athlete/activities?access_token=" +
            AccessCode +
            "&after=" +
            weekTwoStart +
            "&before=" +
            weekTwoEnd
        );
        const weekTwoResponse = await weekTwoActivities.json();
        // console.log("wk2" + weekTwoResponse);

        weekTwoTotal = weekTwoResponse.map((weekTwo) => weekTwo.distance);
        let wk2Sum = 0;
        weekTwoTotal.forEach((el) => (wk2Sum += el));
        weekTwoTotal = wk2Sum;
        wk2Sum = wk2Sum / 1000;
        wk2Sum = wk2Sum.toFixed(1); 

        const weekNowActivities = await fetch(
          "https://www.strava.com/api/v3/athlete/activities?access_token=" +
            AccessCode +
            "&after=" +
            weekOneStart
        );
        const weekNowResponse = await weekNowActivities.json();
      //  console.log("wkNow" + weekNowResponse);
        weekOneTotal = weekNowResponse.map((weekNow) => weekNow.distance);
        let wkNowSum = 0;
        weekOneTotal.forEach((el) => (wkNowSum += el));
        weekOneTotal = wkNowSum;
        wkNowSum = wkNowSum / 1000;
        wkNowSum = wkNowSum.toFixed(1);
      // console.log(wkNowSum);
        // setActivities(weekNowTotal);


        setWeeklyTotals([
          {
            name: "Wk 1",
            kms: wkNowSum,
            amt: 15,
          },
          {
            name: "Wk 2",
            kms: wk2Sum,
            amt: 30,
          },
          {
            name: "Wk 3",
            kms: wk3Sum,
            amt: 45,
          },
          {
            name: "Wk 4",
            kms: wk4Sum,
            amt: 60,
          },
        ]);
      }
      getStats();
    }
    getCode();
  }, []);

  // console.log(stravaData);
 // console.log(activities);
  //  console.log(weekFourTotal);
  // console.log(data2);

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
            <center>
              <div style={{ marginTop: 0 }}>
                <h1 className="header">2024 Training Log</h1>
              </div>
              <div>
                <img src={reactLogo4} width="200" style={{ marginRight: 30 }} />
              </div>
              <h1 className="header3">Last Four weeks</h1>{" "}
              <BarChart
                width={400}
                height={200}
                data={weeklyTotals}
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
              
                <Bar
                  dataKey="kms"
                  fill="#B1312A"
                  activeBar={<Rectangle fill="#C5A432" stroke="purple" />}
                />
              </BarChart>
              <table className="table1">
                <tr>
                  <th>Total Runs:</th>
                  <td>{RecentKms}</td>
                  {/* <td>19</td> */}
                </tr>
                <tr>
                  <th>Distance:</th>
                  <td>{RecentRuns.toFixed()} kms</td>
                  {/* <td>138 kms</td> */}
                </tr>
              </table>
              {/* <h1 className="header3">Year to Date Stats</h1> */}
              <h1 className="header3">Year to Date Stats</h1>
              <div style={{ width: 150, height: 150, marginRight: 30 }}>
                <CircularProgressbar
                  value={YTDpercentage}
                  text={`${YTDpercentage.toFixed()}%`}
                  styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the "compvared progress"
                    path: {
                      // Path color

                      stroke: "#B1312A",

                      // stroke: `rgba(62, 152, 199, ${YTDpercentage / 100})`,
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
              </div>
              <div>
                {/* <img src={reactLogo4} width="100" style={{ marginRight: 30 }}/> */}
                <table className="table1">
                  <tr>
                    <th>Total Runs:</th>
                    <td>{YTDrunTotals}</td>
                    {/* <td>{stravaData}</td> */}
                  </tr>
                  <tr>
                    <th>Distance:</th>
                    <td>{YTDdistance.toFixed()}</td>
                    {/* <td>620 kms</td> */}
                  </tr>
                  <tr>
                    <th>Goal:</th>
                    <td>{YTDdistanceGoal} kms</td>
                    {/* <td>1500 kms</td> */}
                  </tr>
                </table>
              </div>
            </center>
          </div>

          <div className="item item-5" id="chart"></div>
        </div>
      </section>
    </div>
  );
};
