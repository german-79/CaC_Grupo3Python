const hourList = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm"];

onPageLoad();


function onPageLoad() {
  drawCalendar();
  setupEventListeners();
  populateTimes();
  populateLengthSelector(hourList.length + 1);
}


function drawCalendar() {
  const dayList = Object.freeze(["Lunes", "Martes", "Miércoles", "Jueves", "viernes"]);
  const weekElement = document.querySelector("#week");
  for (const day of dayList) {
    const dayElement = drawDay(day);
    weekElement.appendChild(dayElement);
  }
}


function drawDay(dayName) {
  const dayElement = document.createElement("div");
  dayElement.setAttribute("class", "day");
  dayElement.setAttribute("data-day", dayName);
  const titleElement = document.createElement("h2");
  const dayNameNode = document.createTextNode(dayName);
  titleElement.appendChild(dayNameNode);
  dayElement.appendChild(titleElement);
  const hourListElement = document.createElement("div");
  hourListElement.setAttribute("class", "hour_block");
  dayElement.appendChild(hourListElement);
  
  for (const hour of hourList) {
    const hourElement = drawHour(hour);
    hourListElement.appendChild(hourElement);
  }

  return dayElement;
}


function drawHour(hour) {
  const hourElement = document.createElement("div");
  hourElement.setAttribute("class", "hour");
  hourElement.setAttribute("data-hour", hour);
  hourElement.addEventListener("click", handleHourClick);

  return hourElement;
}


function handleHourClick(evt) {
  const currentTarget = evt.currentTarget;
  const day = currentTarget.parentElement.parentElement.dataset.day;
  const startTime = currentTarget.dataset.hour;
  const eventDaySelector = document.querySelector("#day");
  const eventStartTimeSelector = document.querySelector("#start_time");
  eventDaySelector.value = day;
  eventStartTimeSelector.value = startTime;
  handleStartTimeChange();
}


function setupEventListeners() {
  const addEventButton = document.querySelector("#add_event_button");
  addEventButton.addEventListener("click", handleAddEventClick);

  const startTimeSelector = document.querySelector("#start_time");
  startTimeSelector.addEventListener("change", handleStartTimeChange);
}


function handleStartTimeChange() {
  const startTimeSelector = document.querySelector("#start_time");
  const startTime = startTimeSelector.value;
  const hourIndex =
    startTime !== "" ? hourList.findIndex((x) => x === startTime) : 0;
  const allowedHours = hourList.length - hourIndex + 1;
  populateLengthSelector(allowedHours);
}


function handleAddEventClick() {
  const name = document.querySelector("#name").value;
  if(name.trim() == "") {
    return window.alert("Por favor ingrese su nombre antes de reservar el turno");
  }

  const eventDay = document.querySelector("#day").value;
  const eventStartTime = document.querySelector("#start_time").value;
  const eventLength = 1.5

  if (!checkEventCollision(eventDay, eventStartTime)) {
    addEvent(eventDay, eventStartTime, eventLength);
  } else {
    window.alert(
      "That would conflict with another event. Please choose a different timeframe"
    );
  }
}



function handleEventClick(evt) {
  const eventElement = evt.currentTarget;
  eventElement.remove();
}


function addEvent(day, startTime, length) {
  const defaultText = "Turno Reservado"
  const daySelector = "[data-day='" + day + "']";
  const dayElement = document.querySelector(daySelector);
  const hourSelector = "[data-hour='" + startTime + "']";
  const hourElement = dayElement.querySelector(hourSelector);
  
  let eventHeight = 1.75 + (length - 1) * 2.1;

  
  const event = document.createElement("div");
  event.classList.add("event");
  event.textContent = defaultText;
  hourElement.appendChild(event);
  event.addEventListener("click", handleEventClick);

  
  event.style.height = eventHeight.toString() + "em";
}


function checkEventCollision(day, startTime, eventLength) {
  const daySelector = "[data-day='" + day + "']";
  const dayElement = document.querySelector(daySelector);
  const hourSelector = "[data-hour='" + startTime + "']";
  let hourElement = dayElement.querySelector(hourSelector);
  let collision = false;

  
    if (hourElement.firstElementChild != null) {
      collision = true;
    }
  
  return collision;
}


function populateLengthSelector(allowedHours) {
  
  for (let i = 1; i < allowedHours; i++) {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", i);
    optionElement.textContent = i.toString() + " hour" + (i > 1 ? "s" : "");
  }
}


function populateTimes() {
  
  const hourColumnElement = document.querySelector("#hour_column");
  const startTimeSelector = document.querySelector("#start_time");

  
  for (const hour of hourList) {
    const divElement = document.createElement("div");
    divElement.textContent = hour;
    hourColumnElement.appendChild(divElement);

    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", hour);
    optionElement.textContent = hour;
    startTimeSelector.appendChild(optionElement);
  }

  
  const divElement = document.createElement("div");
  divElement.textContent = "5pm";
  hourColumnElement.appendChild(divElement);
}
