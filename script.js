// Create namespace object for app
eucalyptusApp = {
  countdown: 0,
  seconds: 1500,
  restTime: 25,
  riseTime: 5,
  powerRiseTime: 25,
  powerRiseOn: false,
  isRest: true,
  isPaused: true,
  timerStatus: document.querySelector("#status"),
  counter: document.querySelector("#counter"),
  timerDisplay: document.querySelector(".timer-display"),
  startBtn: document.querySelector("#start-btn"),
  skipBtn: document.querySelector("#skip-btn"),
  resetBtn: document.querySelector("#reset"),
  powerRiseBtn: document.querySelector("#power-rise-checkbox"),
  restMin: document.querySelector("#rest-min"),
  riseMin: document.querySelector("#rise-min"),
  powerRiseMin: document.querySelector("#power-rise-min"),
  mainElement: document.querySelector("main"),
  alarm: document.createElement("audio"),
};

// Link sound variables to mp3 files.
eucalyptusApp.alarm.setAttribute("src", "./assets/bell.mp3");

// Add event listeners for start, skip, reset, and power rise buttons
eucalyptusApp.startBtn.addEventListener("click", () => {
  clearInterval(eucalyptusApp.countdown);
  eucalyptusApp.isPaused = !eucalyptusApp.isPaused;
  if (!eucalyptusApp.isPaused) {
    eucalyptusApp.countdown = setInterval(eucalyptusApp.timer, 1000);
  }
});

eucalyptusApp.transition = () => {
  clearInterval(eucalyptusApp.countdown);
  eucalyptusApp.alarm.currentTime = 0;
  eucalyptusApp.alarm.play();
  if (
    eucalyptusApp.counter.textContent === "🌿🌿🌿" &&
    eucalyptusApp.isRest === true &&
    eucalyptusApp.powerRiseOn === true
  ) {
    eucalyptusApp.seconds = eucalyptusApp.powerRiseTime * 60;
    eucalyptusApp.counter.textContent += "🌿";
  } else if (
    eucalyptusApp.counter.textContent === "🌿🌿🌿🌿" &&
    eucalyptusApp.isRest === false
  ) {
    eucalyptusApp.seconds = eucalyptusApp.restTime * 60;
    eucalyptusApp.counter.textContent = "";
  } else if (eucalyptusApp.isRest === true) {
    eucalyptusApp.seconds = eucalyptusApp.riseTime * 60;
    eucalyptusApp.counter.textContent += "🌿";
  } else {
    eucalyptusApp.seconds = eucalyptusApp.restTime * 60;
  }
  eucalyptusApp.isRest = !eucalyptusApp.isRest;
  eucalyptusApp.countdown = setInterval(eucalyptusApp.timer, 1000);
};

eucalyptusApp.skipBtn.addEventListener("click", () => {
  eucalyptusApp.transition();
});

eucalyptusApp.resetBtn.addEventListener("click", () => {
  clearInterval(eucalyptusApp.countdown);
  eucalyptusApp.seconds = eucalyptusApp.restTime * 60;
  eucalyptusApp.countdown = 0;
  eucalyptusApp.isPaused = true;
  eucalyptusApp.isRest = true;
});

eucalyptusApp.powerRiseBtn.addEventListener("change", function () {
  if (this.checked) {
    eucalyptusApp.powerRiseOn = true;
  } else {
    eucalyptusApp.powerRiseOn = false;
  }
});

// Create main functions for pomodoro timer
eucalyptusApp.timer = () => {
  eucalyptusApp.seconds--;
  if (eucalyptusApp.seconds < 0) {
    eucalyptusApp.transition();
  }
};

// Update work and break times
eucalyptusApp.increment = 5;

eucalyptusApp.incrementFunctions = {
  "#rest-plus": function () {
    eucalyptusApp.restTime = Math.min(
      eucalyptusApp.restTime + eucalyptusApp.increment,
      60
    );
  },
  "#rest-minus": function () {
    eucalyptusApp.restTime = Math.max(
      eucalyptusApp.restTime - eucalyptusApp.increment,
      5
    );
  },
  "#rise-plus": function () {
    eucalyptusApp.riseTime = Math.min(
      eucalyptusApp.riseTime + eucalyptusApp.increment,
      60
    );
  },
  "#rise-minus": function () {
    eucalyptusApp.riseTime = Math.max(
      eucalyptusApp.riseTime - eucalyptusApp.increment,
      5
    );
  },
  "#power-rise-plus": function () {
    eucalyptusApp.powerRiseTime = Math.min(
      eucalyptusApp.powerRiseTime + eucalyptusApp.increment,
      60
    );
  },
  "#power-rise-minus": function () {
    eucalyptusApp.powerRiseTime = Math.max(
      eucalyptusApp.powerRiseTime - eucalyptusApp.increment,
      5
    );
  },
};

for (let key in eucalyptusApp.incrementFunctions) {
  if (eucalyptusApp.incrementFunctions.hasOwnProperty(key)) {
    document.querySelector(key).onclick = eucalyptusApp.incrementFunctions[key];
  }
}

// Update html content
eucalyptusApp.countdownDisplay = () => {
  let minutes = Math.floor(eucalyptusApp.seconds / 60);
  let remainderSeconds = eucalyptusApp.seconds % 60;
  eucalyptusApp.timerDisplay.textContent = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
};

eucalyptusApp.buttonDisplay = () => {
  if (eucalyptusApp.isPaused && eucalyptusApp.countdown === 0) {
    eucalyptusApp.startBtn.textContent = "start";
  } else if (eucalyptusApp.isPaused && eucalyptusApp.countdown !== 0) {
    eucalyptusApp.startBtn.textContent = "continue";
  } else {
    eucalyptusApp.startBtn.textContent = "pause";
  }
};

eucalyptusApp.updateHTML = () => {
  eucalyptusApp.countdownDisplay();
  eucalyptusApp.buttonDisplay();
  eucalyptusApp.isPaused
    ? (eucalyptusApp.timerStatus.textContent = `ready?`)
    : eucalyptusApp.isRest
    ? (eucalyptusApp.timerStatus.textContent = "time to chillax ✨")
    : (eucalyptusApp.timerStatus.textContent = `you've got this 💪`);
  eucalyptusApp.restMin.textContent = eucalyptusApp.restTime;
  eucalyptusApp.riseMin.textContent = eucalyptusApp.riseTime;
  eucalyptusApp.powerRiseMin.textContent = eucalyptusApp.powerRiseTime;
};

window.setInterval(eucalyptusApp.updateHTML, 100);

document.onclick = eucalyptusApp.updateHTML;

// TIMER PAGE
// User can see a timer for 25 minutes (rest session)
// After the rest session is over, the user can see a timer for 5 minutes (rise session)
// For the 4th rise session, the session lasts 25 minutes.
// User can start/pause, stop, and reset timers.
// STRETCH GOALS
// User can hear a sound playing when the timer hits.
// User can change/customize the minutes in both sessions before starting.
// During the rest sessions, put up a mix of koala facts and self-care tips.
// During the rise session, put up some motivational words of encouragement.
// Display current date.
// Stop session triggers celebration page with stats for session.
// Donation information for koala sanctuaries.
