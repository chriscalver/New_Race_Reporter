import React, { useState, useEffect } from "react";
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
import LastTenActivities from "../LastTenActivities";

var AccessCode = "";
const YTDdistanceGoal = 1500;
var YTDpercentage = 0;
var YTDrunTotals = 0;
var YTDdistance = 0;
var RecentRuns = 0;
var RecentKms = 0;
var d = new Date();
// console.log(d);

var runActOne = "kms";
var unitTypeOne = "Distance";
var actOneName = "";

var actOneDistance = 0;
var actOneType = "";
var actOneStartTime = "";
var actOnePace = 0;
var actOneMovingTime = 0;
var actOneMaxSpeed = 0;



var runActTwo = "kms";
var unitTypeTwo = "Distance";
var actTwoName = "";

var actTwoDistance = 0;
var actTwoType = "";
var actTwoStartTime = "";
var actTwoPace = 0;
var actTwoMovingTime = 0;
var actTwoMaxSpeed = 0;




var runActThree = "kms";
var unitTypeThree = "Distance";
var actThreeName = "";

var actThreeDistance = 0;
var actThreeType = "";
var actThreeStartTime = "";
var actThreePace = 0;
var actThreeMovingTime = 0;
var actThreeMaxSpeed = 0;

var runActFour = "kms";
var unitTypeFour = "Distance";
var actFourName = "";
var actFourDistance = 0;
var actFourType = "";
var actFourStartTime = "";
var actFourPace = 0;
var actFourMovingTime = 0;
var actFourMaxSpeed = 0;

var runActFive = "kms";
var unitTypeFive = "Distance";

var actFiveName = "";
var actFiveDistance = 0;
var actFiveType = "";
var actFiveStartTime = "";
var actFivePace = 0;
var actFiveMovingTime = 0;
var actFiveMaxSpeed = 0;

var runActSix = "kms";
var unitTypeSix = "Distance";

var actSixName = "";
var actSixDistance = 0;
var actSixType = "";
var actSixStartTime = "";
var actSixPace = 0;
var actSixMovingTime = 0;
var actSixMaxSpeed = 0;

var runActSeven = "kms";
var unitTypeSeven = "Distance";

var actSevenName = "";
var actSevenDistance = "";
var actSevenDistance = 0;
var actSevenType = "";
var actSevenStartTime = "";
var actSevenPace = 0;
var actSevenMovingTime = 0;
var actSevenMaxSpeed = 0;

var runActEight = "kms";
var unitTypeEight = "Distance";

var actEightName = "";
var actEightDistance = 0;
var actEightType = "";
var actEightStartTime = "";
var actEightPace = 0;
var actEightMovingTime = 0;
var actEightMaxSpeed = 0;

var runActNine = "kms";
var unitTypeNine = "Distance";

var actNineName = "";
var actNineDistance = 0;
var actNineType = "";
var actNineStartTime = "";
var actNinePace = 0;
var actNineMovingTime = 0;
var actNineMaxSpeed = 0;

var runActTen = "kms";
var unitTypeTen = "Distance";

var actTenName = "";
var actTenDistance = 0;
var actTenType = "";
var actTenStartTime = "";
var actTenPace = 0;
var actTenMovingTime = 0;
var actTenMaxSpeed = 0;

var day = d.getDay(),
  diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
var newdate = new Date(d.setDate(diff));
newdate.setHours(0);
newdate.setMinutes(0);
newdate.setSeconds(0);
var myEpoch = newdate.getTime() / 1000;

var weekOneStart = Math.floor(myEpoch);
//  console.log(weekOneStart);
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





function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
  }




function paceConverter (x) {
  x = x * 60;
  x = 60 / x * 1000 / 60;

  let right = x %1
  let left = x - right;
  right *= 60 / 100;
  right = right.toFixed(2)
 
  let finalValue = left + ":" + right.slice(2);
  
  // console.log(left);
  // console.log(right);

  return finalValue;
  

}










function paceConverter2 (x) {
  x = x * 60;
  // console.log(x);

  x = 60 / x * 1000 / 60;  
  // console.log(x);

  let right = x %1
  // console.log(right);


  let left = x - right;
  // console.log(left);

  right *= 60 / 100;
  // console.log(right);

  right = right.toFixed(2)
  //  console.log(right);

  let finalValue = left + ":" + right.slice(2);
  
  // console.log(left);
  // console.log(right);

  return finalValue;
  

}


export const Training = () => {
  const [token, setToken] = useState([]);
  const [stravaData, setStravaData] = useState([]);
  const [lastTenActivities, setLastTenActivities] = useState([]);
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
        setStravaData(statsResponse);

        YTDrunTotals = statsResponse.ytd_run_totals.count;
        YTDpercentage =
          statsResponse.ytd_run_totals.distance / YTDdistanceGoal / 10;

        YTDdistance = statsResponse.ytd_run_totals.distance / 1000;
        RecentRuns = statsResponse.recent_run_totals.distance / 1000;
        RecentKms = statsResponse.recent_run_totals.count;

        //  Grab last ten Activities

        const LastTenActivities = await fetch(
          "https://www.strava.com/api/v3/athlete/activities?access_token=" +
            AccessCode +
            "&per_page=10"
        );
        const LastTenActivitiesResponse = await LastTenActivities.json();
        setLastTenActivities(LastTenActivitiesResponse);






        actOneName = LastTenActivitiesResponse[0].name;
        actOneDistance = LastTenActivitiesResponse[0].distance / 1000;        
        actOneType = LastTenActivitiesResponse[0].type;

        if (actOneType == "Run") {
          runActOne = "kms";
          unitTypeOne = "Distance";
        //  actOneDistance = LastTenActivitiesResponse[0].distance / 1000;
        } 
        if (actOneType == "Workout") {
          runActOne = "mins";
          unitTypeOne = "Workout Length";
          actOneDistance = LastTenActivitiesResponse[0].moving_time / 60;
        }                 
        actOneStartTime = LastTenActivitiesResponse[0].start_date_local;
        actOneStartTime = actOneStartTime.slice(0, -10);
        actOneStartTime = actOneStartTime.substring(5);
        actOnePace = LastTenActivitiesResponse[0].average_speed;
        // console.log(actOnePace);

        actOneMovingTime = secondsToDhms(LastTenActivitiesResponse[0].moving_time);
        // console.log(actOneMovingTime);

        actOneMaxSpeed = LastTenActivitiesResponse[0].max_speed;
        // console.log(actOneMaxSpeed);
        
        actTwoName = LastTenActivitiesResponse[1].name;
        actTwoDistance = LastTenActivitiesResponse[1].distance / 1000;                 
        actTwoType = LastTenActivitiesResponse[1].type;

        if (actTwoType == "Run") {
          runActTwo = "kms";
          unitTypeTwo = "Distance";
          //actTwoDistance = LastTenActivitiesResponse[1].distance / 1000;
        } 
        if (actTwoType == "Workout") {
          runActTwo = "mins";
          unitTypeTwo = "Workout Length";
          actTwoDistance = LastTenActivitiesResponse[1].moving_time / 60;
        }     
        actTwoStartTime = LastTenActivitiesResponse[1].start_date_local;
        actTwoStartTime = actTwoStartTime.slice(0, -10);
        actTwoStartTime = actTwoStartTime.substring(5);
        actTwoPace = LastTenActivitiesResponse[1].average_speed;

        actTwoMovingTime = secondsToDhms(LastTenActivitiesResponse[1].moving_time);
        actTwoMaxSpeed = LastTenActivitiesResponse[1].max_speed;


        actThreeName = LastTenActivitiesResponse[2].name;
        actThreeDistance = LastTenActivitiesResponse[2].distance / 1000;
        actThreeType = LastTenActivitiesResponse[2].type;

        if (actThreeType == "Run") {
          runActThree = "kms";
          unitTypeThree = "Distance";
          //actTwoDistance = LastTenActivitiesResponse[2].distance / 1000;
        } 
        if (actThreeType == "Workout") {
          runActThree = "mins";
          unitTypeThree = "Workout Length";
          actThreeDistance = LastTenActivitiesResponse[2].moving_time / 60;
        }     
    
        actThreeStartTime = LastTenActivitiesResponse[2].start_date_local;
        actThreeStartTime = actThreeStartTime.slice(0, -10);
        actThreeStartTime = actThreeStartTime.substring(5);
        actThreePace = LastTenActivitiesResponse[2].average_speed;
        actThreeMovingTime = secondsToDhms(LastTenActivitiesResponse[2].moving_time);
        
        actThreeMaxSpeed = LastTenActivitiesResponse[2].max_speed;

        actFourName = LastTenActivitiesResponse[3].name;
        actFourDistance = LastTenActivitiesResponse[3].distance / 1000;
        actFourType = LastTenActivitiesResponse[3].type;

        if (actFourType == "Run") {
          runActFour = "kms";
          unitTypeFour = "Distance";
          //actTwoDistance = LastTenActivitiesResponse[3].distance / 1000;
        } 
        if (actFourType == "Workout") {
          runActFour = "mins";
          unitTypeFour = "Workout Length";
          actFourDistance = LastTenActivitiesResponse[3].moving_time / 60;
        }     
        actFourStartTime = LastTenActivitiesResponse[3].start_date_local;
        actFourStartTime = actFourStartTime.slice(0, -10);
        actFourStartTime = actFourStartTime.substring(5);
        actFourPace = LastTenActivitiesResponse[3].average_speed;
        actFourMovingTime = secondsToDhms(LastTenActivitiesResponse[3].moving_time);
        actFourMaxSpeed = LastTenActivitiesResponse[3].max_speed;


        actFiveName = LastTenActivitiesResponse[4].name;
        actFiveDistance = LastTenActivitiesResponse[4].distance / 1000;
        actFiveType = LastTenActivitiesResponse[4].type;

        if (actFiveType == "Run") {
          runActFive = "kms";
          unitTypeFive = "Distance";
        //  actOneDistance = LastTenActivitiesResponse[4].distance / 1000;
        } 
        if (actFiveType == "Workout") {
          runActFive = "mins";
          unitTypeFive = "Workout Length";
          actFiveDistance = LastTenActivitiesResponse[4].moving_time / 60;
        }                 

        actFiveStartTime = LastTenActivitiesResponse[4].start_date_local;
        actFiveStartTime = actFiveStartTime.slice(0, -10);
        actFiveStartTime = actFiveStartTime.substring(5);
        actFivePace = LastTenActivitiesResponse[4].average_speed;
        actFiveMovingTime = secondsToDhms(LastTenActivitiesResponse[4].moving_time);
        actFiveMaxSpeed = LastTenActivitiesResponse[4].max_speed;



        actSixName = LastTenActivitiesResponse[5].name;
        actSixDistance = LastTenActivitiesResponse[5].distance / 1000;
        actSixType = LastTenActivitiesResponse[5].type;

        if (actSixType == "Run") {
          runActSix = "kms";
          unitTypeSix = "Distance";
        //  actOneDistance = LastTenActivitiesResponse[5].distance / 1000;
        } 
        if (actSixType == "Workout") {
          runActSix = "mins";
          unitTypeSix = "Workout Length";
          actSixDistance = LastTenActivitiesResponse[5].moving_time / 60;
        }                 
        actSixStartTime = LastTenActivitiesResponse[5].start_date_local;
        actSixStartTime = actSixStartTime.slice(0, -10);
        actSixStartTime = actSixStartTime.substring(5);
        actSixPace = LastTenActivitiesResponse[5].average_speed;
        actSixMovingTime = secondsToDhms(LastTenActivitiesResponse[5].moving_time);
        actSixMaxSpeed = LastTenActivitiesResponse[5].max_speed;


        actSevenName = LastTenActivitiesResponse[6].name;
        actSevenDistance = LastTenActivitiesResponse[6].distance / 1000;
        actSevenType = LastTenActivitiesResponse[6].type;

        if (actSevenType == "Run") {
          runActSeven = "kms";
          unitTypeSeven = "Distance";
        //  actOneDistance = LastTenActivitiesResponse[6].distance / 1000;
        } 
        if (actSevenType == "Workout") {
          runActSeven = "mins";
          unitTypeSeven = "Workout Length";
          actSevenDistance = LastTenActivitiesResponse[6].moving_time / 60;
        }                 
        actSevenStartTime = LastTenActivitiesResponse[6].start_date_local;
        actSevenStartTime = actSevenStartTime.slice(0, -10);
        actSevenStartTime = actSevenStartTime.substring(5);
        actSevenPace = LastTenActivitiesResponse[6].average_speed;
        actSevenMovingTime = secondsToDhms(LastTenActivitiesResponse[6].moving_time);
        actSevenMaxSpeed = LastTenActivitiesResponse[6].max_speed;


        actEightName = LastTenActivitiesResponse[7].name;
        actEightDistance = LastTenActivitiesResponse[7].distance / 1000;
        actEightType = LastTenActivitiesResponse[7].type;

        if (actEightType == "Run") {
          runActEight = "kms";
          unitTypeEight = "Distance";
        //  actOneDistance = LastTenActivitiesResponse[7].distance / 1000;
        } 
        if (actEightType == "Workout") {
          runActEight = "mins";
          unitTypeEight = "Workout Length";
          actEightDistance = LastTenActivitiesResponse[7].moving_time / 60;
        }                 
        actEightStartTime = LastTenActivitiesResponse[7].start_date_local;
        actEightStartTime = actEightStartTime.slice(0, -10);
        actEightStartTime = actEightStartTime.substring(5);
        actEightPace = LastTenActivitiesResponse[7].average_speed;
        actEightMovingTime = secondsToDhms(LastTenActivitiesResponse[7].moving_time);
        actEightMaxSpeed = LastTenActivitiesResponse[7].max_speed;



        
        actNineName = LastTenActivitiesResponse[8].name;
        actNineDistance = LastTenActivitiesResponse[8].distance / 1000;
        actNineType = LastTenActivitiesResponse[8].type;

        if (actNineType == "Run") {
          runActNine = "kms";
          unitTypeNine = "Distance";
        //  actOneDistance = LastTenActivitiesResponse[8].distance / 1000;
        } 
        if (actNineType == "Workout") {
          runActNine = "mins";
          unitTypeNine = "Workout Length";
          actNineDistance = LastTenActivitiesResponse[8].moving_time / 60;
        }                 
        actNineStartTime = LastTenActivitiesResponse[8].start_date_local;
        actNineStartTime = actNineStartTime.slice(0, -10);
        actNineStartTime = actNineStartTime.substring(5);
        actNinePace = LastTenActivitiesResponse[8].average_speed;
        actNineMovingTime = secondsToDhms(LastTenActivitiesResponse[8].moving_time);
        actNineMaxSpeed = LastTenActivitiesResponse[8].max_speed;



        actTenName = LastTenActivitiesResponse[9].name;
        actTenDistance = LastTenActivitiesResponse[9].distance / 1000;
        actTenType = LastTenActivitiesResponse[9].type;

        if (actTenType == "Run") {
          runActTen = "kms";
          unitTypeTen = "Distance";
        //  actOneDistance = LastTenActivitiesResponse[9].distance / 1000;
        } 
        if (actTenType == "Workout") {
          runActTen = "mins";
          unitTypeTen = "Workout Length";
          actTenDistance = LastTenActivitiesResponse[9].moving_time / 60;
        }                 
        actTenStartTime = LastTenActivitiesResponse[9].start_date_local;
        actTenStartTime = actTenStartTime.slice(0, -10);
        actTenStartTime = actTenStartTime.substring(5);
        actTenPace = LastTenActivitiesResponse[9].average_speed;
        actTenMovingTime = secondsToDhms(LastTenActivitiesResponse[9].moving_time);
        actTenMaxSpeed = LastTenActivitiesResponse[9].max_speed;


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

        weekThreeTotal = weekThreeResponse.map(
          (weekThree) => weekThree.distance
        );
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
  </table>;

  return (
    <div>
      <section className="content_section">
        <div className="container3">
          <div className="item item-1"></div>
          <div className="item item-2">
            <div style={{ marginTop: 0 }}>
              <h1 className="header">2024 Training Log</h1>
              <img
                src={reactLogo4}
                className="stvaLogo"
                width="200"
                style={{ marginRight: 30 }}
              />
            </div>
          </div>
          <div className="item item-3"></div>

          <div className="item item-4">
            <center>
              {/* <h1 className="header3">Year to Date Stats</h1> */}
              <h1 className="header3">Distance Goal</h1>
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
                    <td>{YTDdistance.toFixed()} kms</td>
                    {/* <td>620 kms</td> */}
                  </tr>
                  <tr>
                    <th>Goal:</th>
                    <td>{YTDdistanceGoal} kms</td>
                    {/* <td>1500 kms</td> */}
                  </tr>
                </table>
              </div>
              <h1 className="header3">Last Four weeks</h1>
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

              <h1 className="header3">Recent Activities</h1>

              <LastTenActivities
                name={actOneName}
                distance={actOneDistance.toFixed(2)}
                type={actOneType}
                startTime={actOneStartTime}
                pace={paceConverter(actOnePace)}
                movingTime={actOneMovingTime}
                MaxSpeed={paceConverter(actOneMaxSpeed)}
                unit={runActOne}
                unitType={unitTypeOne}
              />

              <LastTenActivities
                name={actTwoName}
                distance={actTwoDistance.toFixed(2)}
                type={actTwoType}
                startTime={actTwoStartTime}
                pace={paceConverter(actTwoPace)}
                movingTime={actTwoMovingTime}
                MaxSpeed={paceConverter(actTwoMaxSpeed)}
                unit={runActTwo}
                unitType={unitTypeTwo}

              />

              <LastTenActivities
                name={actThreeName}
                distance={actThreeDistance.toFixed(2)}
                type={actThreeType}
                startTime={actThreeStartTime}
                pace={paceConverter(actThreePace)}
                movingTime={actThreeMovingTime}
                MaxSpeed={paceConverter(actThreeMaxSpeed)}
                unit={runActThree}
                unitType={unitTypeThree}

              />

              <LastTenActivities
                name={actFourName}
                distance={actFourDistance.toFixed(2)}
                type={actFourType}
                startTime={actFourStartTime}
                pace={paceConverter(actFourPace)}
                movingTime={actFourMovingTime}
                MaxSpeed={paceConverter(actFourMaxSpeed)}
                unit={runActFour}
                unitType={unitTypeFour}

              />

              <LastTenActivities
                name={actFiveName}
                distance={actFiveDistance.toFixed(2)}
                type={actFiveType}
                startTime={actFiveStartTime}
                pace={paceConverter(actFivePace)}
                movingTime={actFiveMovingTime}
                MaxSpeed={paceConverter(actFiveMaxSpeed)}
                unit={runActFive}
                unitType={unitTypeFive}

              />


                  
              <LastTenActivities
                name={actSixName}
                distance={actSixDistance.toFixed(2)}
                type={actSixType}
                startTime={actSixStartTime}
                pace={paceConverter(actSixPace)}
                movingTime={actSixMovingTime}
                MaxSpeed={paceConverter(actSixMaxSpeed)}
                unit={runActSix}
                unitType={unitTypeSix}

              />


<LastTenActivities
                name={actSevenName}
                distance={actSevenDistance.toFixed(2)}
                type={actSevenType}
                startTime={actSevenStartTime}
                pace={paceConverter(actSevenPace)}
                movingTime={actSevenMovingTime}
                MaxSpeed={paceConverter(actSevenMaxSpeed)}
                unit={runActSeven}
                unitType={unitTypeSeven}

              />


<LastTenActivities
                name={actEightName}
                distance={actEightDistance.toFixed(2)}
                type={actEightType}
                startTime={actEightStartTime}
                pace={paceConverter(actEightPace)}
                movingTime={actEightMovingTime}
                MaxSpeed={paceConverter(actEightMaxSpeed)}
                unit={runActEight}
                unitType={unitTypeEight}

              />




<LastTenActivities
                name={actNineName}
                distance={actNineDistance.toFixed(2)}
                type={actNineType}
                startTime={actNineStartTime}
                pace={paceConverter(actNinePace)}
                movingTime={actNineMovingTime}
                MaxSpeed={paceConverter(actNineMaxSpeed)}
                unit={runActNine}
                unitType={unitTypeNine}

              />


              
<LastTenActivities
                name={actTenName}
                distance={actTenDistance.toFixed(2)}
                type={actTenType}
                startTime={actTenStartTime}
                pace={paceConverter(actTenPace)}
                movingTime={actTenMovingTime}
                MaxSpeed={paceConverter(actTenMaxSpeed)}
                unit={runActTen}
                unitType={unitTypeTen}

              />


              <hr width="370"></hr>
            </center>
          </div>

          <div className="item item-5" id="chart"></div>
        </div>
      </section>
    </div>
  );
};
