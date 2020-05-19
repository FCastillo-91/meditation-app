export class Timer {
  timeDuration;
  progressDisplay;
  circleCountdownLength;
  playBtn;
  pauseBtn;
  timerInterval;
  meditationTime;
  timePassed;

  constructor() {
    this.timeDuration = document.querySelector(".time-display");
    this.progressDisplay = document.querySelector(".moving-outline circle");
    this.circleCountdownLength = this.progressDisplay.getTotalLength();
    this.playBtn = document.querySelector(".play");
    this.pauseBtn = document.querySelector(".pause");

  }

    start() {
        this.playBtn.style.display = "none";
        this.pauseBtn.style.display = "block";
        this.timerInterval = setInterval(() => {
            const timeLeft = this.meditationTime - this.timePassed;
            if (timeLeft >= 0) {
                this.timeDuration.innerHTML = this.formatTime(timeLeft);
                this.setCircle(timeLeft / this.meditationTime);
            } else {
                // mediaStatus.pause(); Does Timer call new Media
                this.stop();
                this.meditationTime = null;
            }
            this.timePassed = this.timePassed += 1;
        }, 1000);
    };

    stop() {
        this.playBtn.style.display = "block";
        this.pauseBtn.style.display = "none";
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    };

    setCircle(percentage) {
        const timePassed = Math.floor(this.circleCountdownLength - percentage * this.circleCountdownLength);
        if (timePassed === 0) {
            this.resetCircle();
        } else {
            this.progressDisplay.style.strokeDashoffset = timePassed;
        }
    };

    resetCircle() {
        this.progressDisplay.style.strokeDasharray = this.circleCountdownLength;
        this.progressDisplay.style.strokeDashoffset = 0;
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}: ${seconds}`;
    };
}
