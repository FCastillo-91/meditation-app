import { Media } from "./Media.js";
import { Timer } from "./Timer.js";

const mediaStatus = new Media();
const countDown = new Timer();
countDown.timeSelector();

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

pressPlay();
pressPause();
