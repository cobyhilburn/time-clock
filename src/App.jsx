import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("hours"));

    data ? setHours(data) : setHours([]);
  }, []);

  const handleClockIn = () => {
    const date = new Date();
    const clockInTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    let formattedDate = date.toLocaleDateString();

    const day = date.getDay();
    const daysOfWeek = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };
    const dayOfWeek = daysOfWeek[day];
    const newHour = {
      clockInTime,
      clockOutTime: "",
      date: formattedDate,
      totalHours: "",
      day: dayOfWeek,
    };

    let hoursArray = JSON.parse(localStorage.getItem("hours")) || [];
    hoursArray.push(newHour);

    localStorage.setItem("hours", JSON.stringify(hoursArray));
    setHours([...hoursArray]);
  };

  const handleClockOut = (index) => {
    const clockOutDate = new Date();
    const clockOutTime = clockOutDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    let hoursArray = JSON.parse(localStorage.getItem("hours"));
    let clockInTime = hoursArray[index].clockInTime;

    const [clockInHour, clockInMinute, clockInPeriod] =
      clockInTime.split(/:| /);
    const [clockOutHour, clockOutMinute, clockOutPeriod] =
      clockOutTime.split(/:| /);

    const clockInHour24 =
      clockInPeriod === "PM"
        ? parseInt(clockInHour, 10) + 12
        : parseInt(clockInHour, 10);
    const clockOutHour24 =
      clockOutPeriod === "PM"
        ? parseInt(clockOutHour, 10) + 12
        : parseInt(clockOutHour, 10);

    const totalMinutes =
      (clockOutHour24 - clockInHour24) * 60 +
      (parseInt(clockOutMinute, 10) - parseInt(clockInMinute, 10));

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    const formattedTotalHours = `${totalHours} hours ${remainingMinutes} minutes`;

    hoursArray[index].totalHours = formattedTotalHours;
    hoursArray[index].clockOutTime = clockOutTime;

    localStorage.setItem("hours", JSON.stringify(hoursArray));
    setHours([...hoursArray]);
  };

  return (
    <div className="container mx-auto h-100">
      <div className="flex flex-col items-center">
        <h1>Time Clock</h1>
        <button
          className="m-2 p-2 bg-green-500 rounded lg"
          onClick={handleClockIn}
        >
          Clock in{" "}
        </button>
        {hours.map((hour, index) => (
          <div className="flex justify-between items-center gap-5" key={index}>
            <p>{hour.day}</p>
            <p>{hour.date}</p>
            <p>{hour.clockInTime}</p>
            <p>{hour.clockOutTime ? hour.clockOutTime : "N/A"}</p>
            <p>{hour.totalHours ? hour.totalHours : "N/A"}</p>
            {hour.clockOutTime ? null : (
              <button
                onClick={() => handleClockOut(index)}
                className="m-2 p-2 bg-red-500 rounded lg"
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
