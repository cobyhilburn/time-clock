const handleClockIn = (setHours) => {
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

const handleClockOut = (setHours, index) => {
  const clockOutDate = new Date();
  const clockOutTime = clockOutDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let hoursArray = JSON.parse(localStorage.getItem("hours"));
  let clockInTime = hoursArray[index].clockInTime;

  const [clockInHour, clockInMinute, clockInPeriod] = clockInTime.split(/:| /);
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

const handleDelete = (setHours, hours, index) => {
  hours.splice(index, 1);
  localStorage.setItem("hours", JSON.stringify(hours));
  setHours([...hours]);
};
const getTotalHours = (hours) => {
  let total = 0;
  for (let i = 0; i < hours.length; i++) {
    if (hours[i].totalHours) {
      total = total + +hours[i].totalHours[0];
    }
  }
  return total;
};
export { handleClockIn, handleClockOut, handleDelete, getTotalHours };
