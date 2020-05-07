const app = () => {
  //Create variables for all the dynamic parts of the app
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //Sounds
  const sounds = document.querySelector(".sound-picker button");

  //Play sound
  play.addEventListener("click", () => {
    togglePlay();
  });

  //Create a function to stop and play the sounds
  // if song img is clicked play song & change img to stop button
  // if song img is clicked again stop song and change img to play button
  let isPlaying = false;
  const togglePlay = () => {
    if (isPlaying) {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    } else {
      song.play();
      video.play();
      startTimer();
      play.src = "./svg/pause.svg";
    }
    song.onplaying = () => {
      isPlaying = true;
    };
    song.onpause = () => {
      isPlaying = false;
    };
  };
  //Time Display h3
  const timeDisplay = document.querySelector(".time-display");
  //Get length of the outline
  const outlineLength = outline.getTotalLength();
  //Duration
  //Amend circle around play
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;
  //Animate the circle

  const formatTimeLeft = (meditationDuration) => {
    const minutes = Math.floor(meditationDuration / 60);
    let seconds = meditationDuration % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}: ${seconds}`;
  };
  //Initial Time
  // timeDisplay.innerHTML = formatTimeLeft();
  let timePassed = 0;
  let timerInterval = null;
  timeDisplay.innerHTML = "";

  const startTimer = () => {
    let initialTime = 5;

    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = initialTime - timePassed;
      if (timeLeft >= 0) {
        timeDisplay.innerHTML = formatTimeLeft(timeLeft);
      } else {
        clearInterval(timerInterval);
        console.log("stop");
      }
    }, 1000);
  };
};

app();
