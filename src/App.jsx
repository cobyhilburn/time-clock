import { useState, useEffect } from "react";
import "./App.css";
import {
  handleClockIn,
  handleClockOut,
  handleDelete,
  getTotalHours,
} from "./Funcs";

function App() {
  const [hours, setHours] = useState([]);
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem("hours"));

      if (data) {
        setHours(data);

        if (data[0]) {
          const getMondayDate = new Date(data[0].date);
          const fiveDaysAfter = new Date(getMondayDate);
          fiveDaysAfter.setDate(getMondayDate.getDate() + 5);

          setFormattedDate(fiveDaysAfter.toLocaleDateString());
        }
      } else {
        setHours([]);
      }
    };

    fetchData();
  }, []);

  // Update the formatted date whenever 'hours' changes
  useEffect(() => {
    if (hours[0]) {
      const getMondayDate = new Date(hours[0].date);
      const fiveDaysAfter = new Date(getMondayDate);
      fiveDaysAfter.setDate(getMondayDate.getDate() + 5);
      setFormattedDate(fiveDaysAfter.toLocaleDateString());
    }
  }, [hours]);

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
        {hours[0] && formattedDate && (
          <h2 className="text-left w-full">
            Week of {hours[0].date} - {formattedDate}
          </h2>
        )}
        {hours.map((hour, index) => (
          <div
            className="grid w-full grid-cols-7 text-center items-center gap-2"
            key={index}
          >
            <p className="text-left">{hour.day}</p>
            <p>{hour.date}</p>
            <p>{hour.clockInTime}</p>
            <p>{hour.clockOutTime ? hour.clockOutTime : null}</p>
            <p className="col-span-2">
              {hour.totalHours ? hour.totalHours : "N/A"}
            </p>
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
        <h2>Total Hours: {getTotalHours(hours)}</h2>
      </div>
    </div>
  );
}

export default App;
