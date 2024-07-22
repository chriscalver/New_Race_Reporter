import React, { useState } from "react";

function LastTenActivities(props) {
  const [isOpen, SetIsOpen] = useState(false);
  const [isRun, SetIsRun] = useState(true);

  return (
    <div className="activities">
      <hr></hr>
      <table className="table2">
        <tbody>
          <tr>
            <td className="TD1">{props.type}</td>
            <td className="TD2">
              {props.distance}
              {props.unit}
            </td>
            <td className="TD3">{props.startTime}</td>

            <td className="TD4">
              <button
                class="button-12"
                role="button"
                onClick={() => SetIsOpen(!isOpen)}
              >
                more...
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {isOpen && (
        <table className="table2">
          <tbody>
            <tr>
              <td>
                <h2 className="h2Training">{props.name}</h2>
                {props.type === "Workout" && (
                  <>
                    {props.unitType} {props.distance}
                    {props.unit}
                  </>
                )}

                {props.type === "Run" && (
                  <>
                   <h5>Avg pace {props.pace} /km</h5>
                   <h5>Max Speed {props.MaxSpeed} /km</h5>
                   <h5>Moving Time {props.movingTime}</h5>

                  </>
                )}
               
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LastTenActivities;
