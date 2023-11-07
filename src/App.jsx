import { useState, useEffect } from "react";
import "./App.css";
import { handleClockIn, handleClockOut, handleDelete } from "./Funcs";

function App() {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("hours"));

    data ? setHours(data) : setHours([]);
  }, []);

  return (
    <div className="container mx-auto h-100">
      <div className="flex flex-col items-center">
        <h1>Time Clock</h1>
        <button
          className="m-2 p-2 bg-green-500 rounded lg"
          onClick={() => handleClockIn(setHours)}
        >
          Clock in{" "}
        </button>
        {hours.map((hour, index) => (
          <div className="flex justify-between items-center gap-5" key={index}>
            <p>{hour.day}</p>
            <p>{hour.date}</p>
            <p>{hour.clockInTime}</p>
            <p>{hour.clockOutTime ? hour.clockOutTime : null}</p>
            <p>{hour.totalHours ? hour.totalHours : "N/A"}</p>
            {hour.clockOutTime ? (
              <button
                onClick={() => handleDelete(setHours, hours, index)}
                className="m-2 p-2 bg-red-500 rounded-lg"
              >
                Delete
              </button>
            ) : (
              <button
                onClick={() => handleClockOut(setHours, index)}
                className="m-2 p-2 bg-red-500 rounded-lg"
              >
                Clock out
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
