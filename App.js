let globalSound = document.querySelector(".song");
let globalVideo = document.querySelector(".vid-container video");
let meditationTime = null;
// let isPlaying = false;
let timePassed = 0;
let timerInterval = null;
let timeSelected = 0;

const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const sounds = document.querySelectorAll(".sound-picker button");
const timeSelect = document.querySelectorAll(".time-select button");
const outline = document.querySelector(".moving-outline circle");
const outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

const timeSelector = () => {
  timeSelect.forEach((btn) => {
    btn.addEventListener("click", () => {
      updateTimeDisplay(btn);
    });
  });
};

const updateTimeDisplay = (btn) => {
  timeSelected = btn.getAttribute("data-time");
  meditationTime = timeSelected;
  timeDisplay.textContent = formatTime(timeSelected);
  showPlayBtn();
};

const pressPlay = () => {
  playBtn.addEventListener("click", () => {
    if (!meditationTime) {
      alertify.alert("Please select a time", function () {});
      return null;
    } else{
      showPauseBtn();
      soundPlayer();
      videoPlayer();
      startTimer();
    }

  });
};

//Sound picker function
const soundSelector = () => {
  sounds.forEach((soundbtn) => {
    soundbtn.addEventListener("click", () => {
      globalSound.src = soundbtn.getAttribute("data-sound");
      globalVideo.src = soundbtn.getAttribute("data-video");
    });
  });
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    const timeLeft = meditationTime - timePassed;
    if (timeLeft >= 0) {
      timeDisplay.innerHTML = formatTime(timeLeft);
      setCircle(
          Math.floor(outlineLength - (timeLeft / meditationTime) * outlineLength)
      );
    } else {
      soundPauser();
      vidPauser();
      stopTimer();
    }
    timePassed = timePassed += 1;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

const setCircle = (fill) => {
  if (!fill) {
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
  } else {
    outline.style.strokeDashoffset = fill;
  }
};

// const togglePlay = () => {
//   if (isPlaying) {
//     soundPauser();
//     vidPauser();
//     play.src = "./svg/play.svg";
//   } else {
//     outline.style.strokeDashoffset = 0;
//     soundPlayer();
//     videoPlayer();
//     startTimer();
//     play.src = "./svg/pause.svg";
//   }
//   globalSound.onplaying = () => {
//     isPlaying = true;
//   };
//   globalSound.onpause = () => {
//     isPlaying = false;
//   };
// };

const showPlayBtn = () => {
  playBtn.src = "./svg/play.svg";
};

const showPauseBtn = () => {
  playBtn.src = "./svg/pause.svg";
};
const soundPlayer = () => {
  globalSound.play();
};

const videoPlayer = () => {
  globalVideo.play();
};

const soundPauser = () => {
  globalSound.pause();
};

const vidPauser = () => {
  globalVideo.pause();
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}: ${seconds}`;
};
timeSelector();
pressPlay();
soundSelector();

/*

display: reset, show
circle: reset, show
action Btn toogle
time Btns: onclick => setTime
enviroment Btns: onclick => set Env



* */
