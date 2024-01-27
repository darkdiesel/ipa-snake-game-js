(()=>{"use strict";function t(t,e){return Math.floor(Math.random()*(e-t)+t)}function e(t){return t>=100?1:t<0?0:t/100}function i(t){return t>=10&&(t=10),t<0&&(t=1),501-50*t}function s(t){return null==t}function n(t,e){return a(t.getAttribute(e))}function a(t){return t?document.querySelectorAll(function(t){return t.replace(/#([^\s"#']+)/g,((t,e)=>`#${CSS.escape(e)}`))}(t)):[]}function o(t,e,i){let s=[];for(const n of t){let t=a(n.getAttribute(i)),o=!1;for(const i of t)if(i.isEqualNode(e)){o=!0;break}o&&s.push(n)}return s}class h{constructor(t={}){this.snakeColor=t.snakeColor||"#2e3434",this.appleColor=t.appleColor||"#2e3434",this.pointSizePx=t.pointSizePx||16,this.pointPadding=t.pointPadding||4,this.centerX=0,this.centerY=0,this.snakeStartSize=t.snakeStartSize||3,this.haveWalls=!("haveWalls"in t)||t.haveWalls,this.mute=!("mute"in t)||t.mute,t.gameVolume?this.gameVolume=e(t.gameVolume):this.gameVolume=.001,this.gameTick=t.gameTick||10,t.snakeTick?this.snakeTick=i(t.snakeTick):this.snakeTick=300,this.appleTick=t.appleTick||50,this.gameOverStatus=!1}}const c="data-ipa-snake-game-parent";class r{constructor(t,e){this.config=e,this.speedSettingsElements=n(t,"data-ipa-snake-game-s-speed"),this.wallsSettingsElements=n(t,"data-ipa-snake-game-s-walls"),this.soundsSettingsElements=n(t,"data-ipa-snake-game-s-sounds"),this.volumeSettingsElements=n(t,"data-ipa-snake-game-s-volume"),this.initSettings()}initSettings(){for(const t of this.speedSettingsElements)this.setSpeed(t.value),t.addEventListener("input",(t=>{this.setSpeed(t.target.value)}));for(const t of this.wallsSettingsElements)this.setWalls(t.checked),t.addEventListener("click",(t=>{this.setWalls(t.target.checked)}));for(const t of this.soundsSettingsElements)this.mute(!t.checked),t.addEventListener("click",(t=>{this.mute(!t.target.checked)}));for(const t of this.volumeSettingsElements)this.setVolume(t.value),t.addEventListener("input",(t=>{this.setVolume(t.target.value)}))}mute(t){this.config.mute=!!t}setSpeed(t){this.config.snakeTick=i(t)}setVolume(t){this.config.gameVolume=e(t)}setWalls(t){this.config.haveWalls=t}}class l{constructor(t,e,i,s,n){this.start=t,this.stop=e,this.pause=i,this.reset=s,this.container=n,this.actionStartElements=o(a('[data-ipa-snake-game="start"]'),this.container,c),this.actionStopElements=o(a('[data-ipa-snake-game="stop"]'),this.container,c),this.actionPauseElements=o(a('[data-ipa-snake-game="pause"]'),this.container,c),this.actionResetElements=o(a('[data-ipa-snake-game="reset"]'),this.container,c),this.initActions()}initActions(){this.actionStartElements.length||this.start();for(const t of this.actionStartElements)t.addEventListener("click",(async()=>{this.start()}));for(const t of this.actionStopElements)t.addEventListener("click",(async()=>{this.stop()}));for(const t of this.actionPauseElements)t.addEventListener("click",(async()=>{this.pause()}));for(const t of this.actionResetElements)t.addEventListener("click",(async()=>{this.reset()}))}}class m{constructor(t,e){this.container=t,this.config=e,this.element=document.createElement("canvas"),this.context=this.element.getContext("2d"),this.element.width=20*e.pointSizePx,this.element.height=26*e.pointSizePx,this.element.classList.add("ipa-snake-game-canvas"),this.container.querySelector(".ipa-snake-game-canvas-wrapper").appendChild(this.element),this.config.centerX=this.getCenterX(),this.config.centerY=this.getCenterY()}getCenterX(){return Math.floor(this.element.width/this.config.pointSizePx/2)*this.config.pointSizePx}getCenterY(){return Math.floor(this.element.height/this.config.pointSizePx/2)*this.config.pointSizePx}drawCell(t,e,i){this.context.fillStyle=i,this.context.strokeStyle=i,this.context.strokeRect(t,e,this.config.pointSizePx,this.config.pointSizePx),this.context.fillRect(t+this.config.pointPadding,e+this.config.pointPadding,this.config.pointSizePx-2*this.config.pointPadding,this.config.pointSizePx-2*this.config.pointPadding)}drawWalls(t){this.context.strokeStyle=t,this.context.strokeRect(0,0,this.element.width,this.element.height)}clearFull(){this.clearCell(0,0,this.element.width,this.element.height)}clearCell(t,e,i,s){this.context.clearRect(t,e,i,s)}}class p{constructor(t){this.container=t,this.btnUp=this.container.querySelector(".ipa-snake-game-control-up"),this.btnDown=this.container.querySelector(".ipa-snake-game-control-down"),this.btnLeft=this.container.querySelector(".ipa-snake-game-control-left"),this.btnRight=this.container.querySelector(".ipa-snake-game-control-right")}}class g{constructor(t,e=0){this.container=t,this.scoreBlock=this.container.querySelector(".ipa-snake-game-score .ipa-snake-game-score-count"),this.score=e,this.draw()}incScore(){this.score++,this.draw()}setToZero(){this.score=0,this.draw()}draw(){this.scoreBlock.innerHTML=this.score}}class u{constructor(t,e,i,s,n){this.tXStart=null,this.tYStart=null,this.moveUp=e,this.moveDown=i,this.moveLeft=s,this.moveRight=n,this.initControls(t)}initControls(t){t.element.addEventListener("touchstart",(async t=>{this.tXStart=t.touches[0].clientX,this.tYStart=t.touches[0].clientY})),t.element.addEventListener("touchmove",(async t=>{if(t.preventDefault(),!this.tXStart||!this.tYStart)return;let e=t.touches[0].clientX,i=t.touches[0].clientY,s=this.tXStart-e,n=this.tYStart-i;Math.abs(s)>Math.abs(n)?s>0?this.moveLeft():this.moveRight():n>0?this.moveUp():this.moveDown(),this.tXStart=null,this.tYStart=null})),t.element.addEventListener("touchend",(async()=>{this.tXStart=null,this.tYStart=null})),t.element.addEventListener("touchcancel",(async()=>{this.tXStart=null,this.tYStart=null}))}}class d{constructor(t,e,i){this.config=t,this.canvas=e,this.x=this.config.centerX,this.y=this.config.centerY,this.speedX=this.config.pointSizePx,this.speedY=0,this.points=[],this.maxPoints=this.config.snakeStartSize,this.moveAudio=new Audio,this.moveAudio.preload="auto",this.moveAudio.src="../audio/mr_9999_14.wav",this.gameOverAudio=new Audio,this.gameOverAudio.preload="auto",this.gameOverAudio.src="../audio/mr_9999_08.wav",this.config.gameOverStatus=!1,this.control(i)}update(t,e){this.x+=this.speedX,this.y+=this.speedY,this.x<0?this.config.haveWalls?this.config.gameOverStatus=!0:this.x=this.canvas.element.width-this.config.pointSizePx:this.x>=this.canvas.element.width&&(this.config.haveWalls?this.config.gameOverStatus=!0:this.x=0),this.y<0?this.config.haveWalls?this.config.gameOverStatus=!0:this.y=this.canvas.element.height-this.config.pointSizePx:this.y>=this.canvas.element.height&&(this.config.haveWalls?this.config.gameOverStatus=!0:this.y=0),this.points.unshift({x:this.x,y:this.y}),this.points.length>this.maxPoints&&this.points.pop(),this.points.forEach(((i,s)=>{i.x===t.x&&i.y===t.y&&(t.startEatSound(),this.maxPoints++,e.incScore(),t.randomPosition());for(let t=s+1;t<this.points.length;t++)i.x===this.points[t].x&&i.y===this.points[t].y&&(this.config.gameOverStatus=!0)})),this.config.gameOverStatus&&(this.gameOver(),e.setToZero(),t.randomPosition())}checkIfTurnBack(t,e){if(void 0===this.points[1])return!1;let i=this.x+t,s=this.y+e;return this.points[1].x===i&&this.points[1].y===s}draw(){this.points.forEach((t=>{this.canvas.drawCell(t.x,t.y,this.config.snakeColor)}))}startMoveSound(){this.config.mute||(this.moveAudio.volume=this.config.gameVolume,this.moveAudio.play().then((t=>{})))}stopMoveSound(){this.config.mute||(this.moveAudio.pause(),this.moveAudio.currentTime=0)}startGameOverSound(){this.config.mute||(this.gameOverAudio.volume=this.config.gameVolume,this.gameOverAudio.play().then((t=>{})))}stopGameOverSound(){this.config.mute||(this.gameOverAudio.pause(),this.gameOverAudio.currentTime=0)}gameOver(){this.startGameOverSound(),this.x=this.config.centerX,this.y=this.config.centerY,this.speedX=this.config.pointSizePx,this.speedY=0,this.points=[],this.maxPoints=this.config.snakeStartSize}control(t){s(t.btnUp)||t.btnUp.addEventListener("click",(async()=>{this.moveUp()})),s(t.btnDown)||t.btnDown.addEventListener("click",(async()=>{this.moveDown()})),s(t.btnDown)||t.btnLeft.addEventListener("click",(async()=>{this.moveLeft()})),s(t.btnDown)||t.btnRight.addEventListener("click",(async()=>{this.moveRight()})),new u(this.canvas,(()=>{this.moveUp()}),(()=>{this.moveDown()}),(()=>{this.moveLeft()}),(()=>{this.moveRight()})),document.addEventListener("keydown",(t=>{switch(t.code){case"KeyW":case"ArrowUp":case"Numpad8":t.preventDefault(),this.moveUp();break;case"KeyS":case"ArrowDown":case"Numpad2":t.preventDefault(),this.moveDown();break;case"KeyA":case"ArrowLeft":case"Numpad4":t.preventDefault(),this.moveLeft();break;case"KeyD":case"ArrowRight":case"Numpad6":t.preventDefault(),this.moveRight()}}))}moveUp(){this.checkIfTurnBack(0,-this.config.pointSizePx)||(this.speedX=0,this.speedY=-this.config.pointSizePx)}moveDown(){this.checkIfTurnBack(0,this.config.pointSizePx)||(this.speedX=0,this.speedY=this.config.pointSizePx)}moveLeft(){this.checkIfTurnBack(-this.config.pointSizePx,0)||(this.speedX=-this.config.pointSizePx,this.speedY=0)}moveRight(){this.checkIfTurnBack(this.config.pointSizePx,0)||(this.speedX=this.config.pointSizePx,this.speedY=0)}}class f{constructor(t,e){this.config=t,this.canvas=e,this.x=0,this.y=0,this.show=!0,this.eatAudio=new Audio,this.eatAudio.preload="auto",this.eatAudio.src="../audio/browser-games/snake/mr_9999_05.wav",this.randomPosition()}draw(t=!1){t&&(this.show=!this.show),this.canvas.clearCell(this.x,this.y,this.config.pointSizePx,this.config.pointSizePx),this.show&&this.canvas.drawCell(this.x,this.y,this.config.appleColor)}randomPosition(){this.x=t(0,this.canvas.element.width/this.config.pointSizePx)*this.config.pointSizePx,this.y=t(0,this.canvas.element.height/this.config.pointSizePx)*this.config.pointSizePx}startEatSound(){this.config.mute||(this.eatAudio.volume=this.config.gameVolume,this.eatAudio.play().then((t=>{})))}stopEatSound(){this.config.mute||(this.eatAudio.pause(),this.eatAudio.currentTime=0)}}class v{constructor(t,e,i,s){this.snakeUpdate=t,this.snakeDraw=e,this.appleDraw=i,this.config=s,this.gameTime=Date.now(),this.snakeTime=Date.now(),this.appleTime=Date.now(),this.gameTickTimer=void 0}gameTick(){if(this.config.gameOverStatus)return this.stop(),void this.snakeUpdate();this.gameTime=Date.now(),this.gameTime-this.snakeTime>this.config.snakeTick&&(this.snakeTime=Date.now(),this.snakeUpdate(),this.snakeDraw()),this.gameTime-this.appleTime>this.config.appleTick&&(this.appleTime=Date.now(),this.appleDraw())}start(){this.isActive()||(this.gameTickTimer=setInterval((()=>{this.gameTick()}),this.config.gameTick))}stop(){this.isActive()&&(clearInterval(this.gameTickTimer),this.gameTickTimer=void 0)}isActive(){return!(void 0===this.gameTickTimer)}}new class{constructor(t,e={}){null!==t&&(this.config=new h(e),this.settings=new r(t,this.config),this.canvas=new m(t,this.config),this.controls=new p(t),this.score=new g(t,0),this.snake=new d(this.config,this.canvas,this.controls),this.apple=new f(this.config,this.canvas),this.loop=new v(this.updateSnake.bind(this),this.drawSnake.bind(this),this.drawApple.bind(this),this.config),this.actions=new l(this.start.bind(this),this.stop.bind(this),this.pause.bind(this),this.reset.bind(this),t,this.config))}start(){this.loop.start()}stop(){this.loop.stop(),this.snake.gameOver(),this.score.setToZero(),this.canvas.clearFull()}pause(){this.loop.isActive()&&this.loop.stop()}reset(){this.loop.isActive()&&(this.loop.stop(),this.snake.gameOver(),this.score.setToZero(),this.apple.randomPosition(),this.loop.start())}updateSnake(){this.config.gameOverStatus?this.drawGameOver():this.snake.update(this.apple,this.score)}drawSnake(){this.snake.stopMoveSound(),this.canvas.clearFull(),this.snake.startMoveSound(),this.snake.draw(),this.apple.draw(),this.config.haveWalls&&this.canvas.drawWalls()}drawApple(){this.apple.draw(this.canvas,!0)}drawGameOver(){for(let t=0;t<this.canvas.element.height;t+=this.config.pointSizePx)for(let e=0;e<this.canvas.element.width;e+=this.config.pointSizePx)this.canvas.drawCell(e,t,this.config.snakeColor);this.config.gameOverStatus=!1}}(document.querySelector('[data-ipa-snake-game="init"]'))})();