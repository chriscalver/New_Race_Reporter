import { useState, useEffect } from "react";
import reactLogo2 from "../assets/thatdamhill.png";
import reactLogo3 from "../assets/caution.png";
// import reactLogo4 from "../assets/strava.svg";
// import axios from "axios";
// import { RotatingLines } from "react-loader-spinner";
import Display from "./Display";
// import Progressbar from "./Progressbar";
export default function Center() {
  const endTime = new Date("Sept 21, 2024 08:00:00").getTime();

  const [currentTime, setcurrentTime] = useState(new Date().getTime());
  const gap = endTime - currentTime; //177670892

  const seconds = 1000; // in milliseconds
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  const remainingDays = Math.floor(gap / days);
  const remainingHours = Math.floor((gap % days) / hours);
  const remainingMinutes = Math.floor((gap % hours) / minutes);
  const remainingSeconds = Math.floor((gap % minutes) / seconds);

  const data = [
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
  const [recentRunCount, setrecentRunCount] = useState([0]);

  const percentage = 42;

  // const employeeAPI = (
  //   url = "https://www.chriscalver.com/employeeregisterapibk/api/Employee/"
  // ) => {
  //   return {
  //     fetchAll: () => axios.get(url),
  //   };
  // };

  // function refreshEmployeeList() {
  //   employeeAPI()
  //     .fetchAll()
  //     .then((res) => {
  //       // setEmployeeList(res.data);
  //       setrecentRunCount(res.data);

  //       console.log(res.data);
  //       //setRating(rating);
  //     })
  //     .catch((err) => console.log(err));
  // }

  useEffect(() => {
    setTimeout(() => setcurrentTime(new Date().getTime()), 1000);
    // refreshEmployeeList();
  }, [currentTime]); // 11:30:55

  // useEffect(() => {
  //   //setTimeout(() => setcurrentTime(new Date().getTime()), 1000);
  //   refreshEmployeeList();
  // }, []); // 11:30:55

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
          
          <img src={reactLogo3} className="mainlogo2" />
          <h3>September 21, 2024</h3>
            <h1 className="header">24hr RACE</h1>
            <h1 className="header2">starts in</h1>

            <center>
              <Display
                days={remainingDays}
                hours={remainingHours}
                minutes={remainingMinutes}
                seconds={remainingSeconds}
              />
            </center>

            {/* <div>Race Reporter</div> */}
          </div>
          <div className="item item-5" id="chart">
            {/* <Progressbar /> */}


                {/* <RotatingLines width="50" height="50"
                  wrapperStyle={{
                    justifyContent: "center",
                  }}
                  /> */}

            
          </div>
        </div>
      </section>
    </div>
  );
}
