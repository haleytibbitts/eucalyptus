// Create namespace object for app
const eucalyptusApp = {};

// Create init function
eucalyptusApp.init = () => {
  eucalyptusApp.welcome();
  // STRETCH: bypass welcome() if they have been to the site before.
};

// Make the main section a re-useable variable
eucalyptusApp.mainElement = document.querySelector("main");
console.log(eucalyptusApp);

// Create welcome page function and populate with text
eucalyptusApp.welcome = () => {
  // Create section to contain text and append to main
  const welcomeSection = document.createElement("section");
  eucalyptusApp.mainElement.append(welcomeSection);
  // Create text elements, populate with text, and append to section
  const welcomeHeader = document.createElement("h2");
  const welcomeSubHeader = document.createElement("h3");
  const welcomeParagraph = document.createElement("p");
  const welcomeButton = document.createElement("button");
  welcomeHeader.innerText = "hello, friend 🐨";
  welcomeSubHeader.innerText =
    "welcome to eucalyptus 🌿 the anti-productivity app inspired by the wisdom of koalas.";
  welcomeParagraph.innerText =
    "Sleeping up to 20 hours a day, Koalas know a thing or two about rest and retreat. Whether you struggle with depression, anxiety, insomnia, or a bad case of the Mondays... sometimes 25-minutes of productivity feels like an impossible tree to climb. That's why we've created a guilt-free timer based off of the Pomodoro principal, but backwards. For every 5 minutes of productivity, you get 25-minutes of rest with one 25-minute challenge every two hours (if you're up for it). We've also peppered in some koala facts and self-care tips straight from the marsupial's mouth to make your downtime even more luxurious. So grab a warm bevvy, your favourite blanket, and let's take it easy.";
  welcomeSection.append(welcomeHeader);
  welcomeSection.append(welcomeSubHeader);
  welcomeSection.append(welcomeParagraph);
  // Create button to trigger the next page load
  welcomeButton.innerText = "begin";
  welcomeSection.append(welcomeButton);
  welcomeButton.addEventListener("click", () => {
    welcomeSection.remove();
    eucalyptusApp.timer();
  });
};

eucalyptusApp.timer = () => {};

// Call init function at the end of the script
eucalyptusApp.init();
