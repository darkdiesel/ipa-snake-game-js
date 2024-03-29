import {convertSpeed, convertVolume} from "./functions";

export default class Config {
    constructor(options = {}) {
        this.snakeColor = options.snakeColor || "#2e3434";
        this.appleColor = options.appleColor || "#2e3434"; // #A00034

        this.pointSizePx = options.pointSizePx || 16; // size 1 point of snake in pixels
        this.pointPadding = options.pointPadding || 4; // padding for points

        this.centerX = 0; // start position by x of snake
        this.centerY = 0; // start position by y of snake

        this.snakeStartSize = options.snakeStartSize || 3; // snake start size

        // if field haveWalls then snake crashed when touch it
        if ('haveWalls' in options) {
            this.haveWalls = options.haveWalls;
        } else {
            this.haveWalls = true;
        }

        // mute game
        if ('mute' in options) {
            this.mute = options.mute;
        } else {
            this.mute = true;
        }

        // volume of game
        if (options.gameVolume) {
            this.gameVolume = convertVolume(options.gameVolume)
        } else {
            this.gameVolume = 0.001;
        }

        this.gameTick = options.gameTick || 10; // time out between game animation steps

        // time out between snake steps
        if (options.snakeTick) {
            this.snakeTick = convertSpeed(options.snakeTick)
        } else {
            this.snakeTick = 300;
        }

        this.appleTick = options.appleTick || 50; // time out between apple blinding

        this.gameOverStatus = false;
    }
}
