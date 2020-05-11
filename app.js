const app = () => {
  ///Globals
  //Create variables for all the dynamic elements of the app
  let globalSound = document.querySelector(".song");
  let globalVideo = document.querySelector(".vid-container video");

  const play = document.querySelector(".play");
  //Time Display h3
  const timeDisplay = document.querySelector(".time-display");
  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time duration
  const timeSelect = document.querySelectorAll(".time-select button");
  //Timer outline
  const outline = document.querySelector(".moving-outline circle");
  //Get length of the outline = duration
  const outlineLength = outline.getTotalLength();
  //Amend circle around play
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  let globalTime = null;

  //Pick different sounds
  sounds.forEach((scenario) => {
    scenario.addEventListener("click", () => {
      globalSound.src = scenario.getAttribute("data-sound");
      globalVideo.src = scenario.getAttribute("data-video");
      playAnimation();
    });
  });
  //Play sound
  play.addEventListener("click", () => {
    if (!globalTime) {
      console.log("SHOW TO USER!");
      return null;
    }
    togglePlay();
  });
  let pickTime = 0;
  //Select a duration
  timeSelect.forEach((btn) => {
    btn.addEventListener("click", () => {
      pickTime = btn.getAttribute("data-time");
      globalTime = pickTime;
      timeDisplay.textContent = formatTimeLeft(pickTime);
      clearInterval(timerInterval);
      resetCircle();
    });
  });

  //Create a function to stop and play the sounds
  // if song img is clicked play song & change img to stop button
  // if song img is clicked again stop song and change img to play button
  let isPlaying = false;
  const togglePlay = () => {
    if (isPlaying) {
      pauseAnimation();
      play.src = "./svg/play.svg";
    } else {
      outline.style.strokeDashoffset = 0;
      playAnimation();
      startTimer();
      play.src = "./svg/pause.svg";
    }
    globalSound.onplaying = () => {
      console.log("onplaying");
      isPlaying = true;
    };
    globalSound.onpause = () => {
      console.log("onpause");
      isPlaying = false;
    };
  };

  const playAnimation = () => {
    globalSound.pause();
    globalSound.play();
    globalVideo.pause();
    globalVideo.play();
  };

  const pauseAnimation = () => {
    globalSound.pause();
    globalVideo.pause();
  };

  const formatTimeLeft = (meditationDuration) => {
    const minutes = Math.floor(meditationDuration / 60);
    let seconds = meditationDuration % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}: ${seconds}`;
  };
  //Initial Time
  timeDisplay.innerHTML = formatTimeLeft();
  let timePassed = 0;
  let timerInterval = null;
  timeDisplay.innerHTML = "";

  const startTimer = () => {
    let initialTime = globalTime;
    timerInterval = setInterval(() => {
      timeLeft = initialTime - timePassed;
      if (timeLeft >= 0) {
        timeDisplay.innerHTML = formatTimeLeft(timeLeft);

        const calculateTimeFraction = () => {
          return timeLeft / initialTime;
        };

        let progress = Math.floor(
          outlineLength - calculateTimeFraction() * outlineLength
        );
        console.log({ progress });
        outline.style.strokeDashoffset = progress;
      } else {
        pauseAnimation();
        clearInterval(timerInterval);
      }
      timePassed = timePassed += 1;
    }, 1000);
  };

  const resetCircle = () => {
    console.log("CLEAR DISPLAY");
  };
};

app();

/*

display: reset, show
circle: reset, show
action Btn toogle
time Btns: onclick => setTime
enviroment Btns: onclick => set Env



* */
