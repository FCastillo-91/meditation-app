export class Media {
  sound;
  video;

  constructor() {
    this.sound = document.querySelector(".song");
    this.video = document.querySelector(".vid-container video");
    const sounds = document.querySelectorAll(".sound-picker button");
    sounds.forEach((soundbtn) => {
      soundbtn.addEventListener("click", () => {
        this.pause();
        this.sound.src = soundbtn.getAttribute("data-sound");
        this.video.src = soundbtn.getAttribute("data-video");
        this.play();
      });
    });
  }
  play() {
    this.sound.play();
    this.video.play();
  }
  pause() {
    this.sound.pause();
    this.video.pause();
  }
}
