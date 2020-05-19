import { Media } from "./Media.js";
import { Timer } from "./Timer.js";

const mediaStatus = new Media();
const countDown = new Timer();
countDown.resetCircle();

const timeSelector = () => {
  const timeSelect = document.querySelectorAll(".time-select button");
  timeSelect.forEach((btn) => {
    btn.addEventListener("click", () => {
      countDown.timePassed = 0;
      updateTimeDisplay(btn.getAttribute("data-time"));
    });
  });
};

const updateTimeDisplay = (dataTime) => {
  countDown.meditationTime = dataTime;
  countDown.timeDuration.textContent = countDown.formatTime(countDown.meditationTime);
};

const pressPlay = () => {
  countDown.playBtn.addEventListener("click", () => {
    if (!countDown.meditationTime) {
      alertify.alert("Please select a time", function () {});
      return null;
    } else {
      mediaStatus.play();
      countDown.start();
    }
  });
};

const pressPause = () => {
  countDown.pauseBtn.addEventListener("click", () => {
    mediaStatus.pause();
    countDown.stop();
  });
};




timeSelector();
pressPlay();
pressPause();


