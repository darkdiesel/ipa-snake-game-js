import {getRandomInt} from "./functions.js";

export default class Apple {
    constructor(canvas, config) {
        this.x = 0;
        this.y = 0;
        this.canvas = canvas;
        this.config = config;

        this.eatAudio = new Audio();

        this.eatAudio.volume = this.config.gameVolume;
        this.eatAudio.preload = 'auto';
        this.eatAudio.src = '/audio/browser-games/snake/mr_9999_05.wav';

        this.randomPosition();
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.config.appleColor;

        context.strokeRect(this.x, this.y, this.config.pointSizePx, this.config.pointSizePx);
        context.fillRect(this.x + this.config.pointPadding, this.y + this.config.pointPadding, this.config.pointSizePx - this.config.pointPadding * 2, this.config.pointSizePx - this.config.pointPadding * 2);
    }

    randomPosition() {
        this.x = getRandomInt(0, this.canvas.element.width / this.config.pointSizePx) * this.config.pointSizePx;
        this.y = getRandomInt(0, this.canvas.element.height / this.config.pointSizePx) * this.config.pointSizePx;
    }

    startEatSound() {
        this.eatAudio.play().then(r => console.log('bom'));
    }

    stopEatSound() {
        this.eatAudio.pause();
        this.eatAudio.currentTime = 0;
    }
}