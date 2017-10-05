// game.js

import Bar from './bar';
import Ball from './ball';
import Brick from './brick';

/** @class Game
  * Represents a snake game
  */
  export default class Game {
    constructor() {
      this.bar = new Bar(43, 95);
      this.ball = new Ball(50, 93);
      this.brick = new Brick();
      this.over = false;
      this.start = false;
      this.input = {
        direction: 'neutral',
        start: false,
        b_direction: 'neutral'
      };
      this.score = 0;
    this.audio = new Audio("bounce.mp3");
    //Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 100;
    this.backBufferCanvas.height = 100;
    this.backBufferContext =  this.backBufferCanvas.getContext('2d');
    // Create the screen buffer canvas
    this.screenBufferCanvas =  document.createElement('canvas');
    this.screenBufferCanvas.width = 100;
    this.screenBufferCanvas.height = 100;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    //Create HTML UI Elements
    var message = document.createElement('div');
    message.id = "message";
    message.textContent = "Press Space to play";
    document.body.appendChild(message);
    var message2 = document.createElement('div');
    message2.id = "message2";
    message2.textContent = "Score: " + this.score;
    document.body.appendChild(message2);
    // Bind class functions
    this.gameOver = this.gameOver.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.control = this.control.bind(this);
    this.hit = this.hit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);
    // Set up event handlers
    window.onkeydown = this.handleKeyDown;
    window.onkeyup =  this.handleKeyUp;
    // Start the game loop
    this.interval = setInterval(this.loop, 25);
  }
  hit() {
    var ball = this.ball.getPosition();
    var bar = this.bar.getPosition();
    var brick = this.brick.getBrick();

    //Check if ball hit bar.
    if(ball.y+2 === bar.y && ball.x+2 > bar.x && ball.x < bar.x+15) {
      if (this.input.direction === 'right') {
        this.audio.play();
        this.input.b_direction = 'upright';
      } else if (this.input.direction === 'left') {
        this.audio.play();
        this.input.b_direction = 'upleft';
      } else {
          this.audio.play();
          this.input.b_direction = 'up';
      }
    }

    //Check if ball hit brick
    for(var i = 0; i < 6; i++) {
      for(var j = 0; j < 10; j++) {

        //Hit bottom brick
        if(ball.y === brick[i][j].y+3 && ball.x+2 > brick[i][j].x && ball.x < brick[i][j].x+8) {
          if (this.input.b_direction === 'upleft') {
            this.input.b_direction = 'downleft';
            this.audio.play();
            this.score += this.brick.update(brick[i][j]);
          } else if (this.input.b_direction === 'upright') {
            this.input.b_direction = 'downright';
            this.audio.play();
            this.score += this.brick.update(brick[i][j]);
          } else if(this.input.b_direction === 'up'){
              this.input.b_direction = 'down';
              this.audio.play();
            this.score += this.brick.update(brick[i][j]);
          }
        }

        //Hit top of brick
        if(ball.y+2 === brick[i][j].y && ball.x+2 > brick[i][j].x && ball.x < brick[i][j].x+8) {
          if (this.input.b_direction === 'downleft') {
            this.audio.play();
            this.input.b_direction = 'upleft';
            this.score += this.brick.update(brick[i][j]);
          } else if (this.input.b_direction === 'downright') {
            this.audio.play();
            this.input.b_direction = 'upright';
            this.score += this.brick.update(brick[i][j]);
          } else if (this.input.b_direction === 'down') {
            this.audio.play();
            this.input.b_direction = 'up';
            this.score += this.brick.update(brick[i][j]);
          }

        }

        //Hit right of brick
        if(ball.x === brick[i][j].x+8 && ball.y+2 > brick[i][j].y && ball.y < brick[i][j].y+3) {
          if (this.input.b_direction === 'upleft') {
            this.audio.play();
            this.input.b_direction = 'upright';
            this.score += this.brick.update(brick[i][j]);
          } else if (this.input.b_direction === 'downleft') {
            this.audio.play();
            this.input.b_direction = 'downright';
            this.score += this.brick.update(brick[i][j]);
          } else if (this.input.b_direction === 'left'){
            this.audio.play();
            this.input.b_direction = 'right';
            this.score += this.brick.update(brick[i][j]);
          }
        }
        //Hit left of brick
        if(ball.x+2 === brick[i][j].x && ball.y+2 > brick[i][j].y && ball.y < brick[i][j].y+3) {
          if (this.input.b_direction === 'upright') {
            this.audio.play();
            this.input.b_direction = 'upleft';
            this.score += this.brick.update(brick[i][j]);
          } else if (this.input.b_direction === 'downright') {
            this.audio.play();
            this.input.b_direction = 'downleft';
            this.score += this.brick.update(brick[i][j]);
          } else if (this.input.b_direction === 'right'){
            this.audio.play();
            this.input.b_direction = 'left';
            this.score += this.brick.update(brick[i][j]);
          }
        }
      }
    }

  }
  /** @method gameStart
    * Removes game start message and starts ball movement.
    */
  gameStart() {
    this.start = true;
    //Message
    var message = document.getElementById("message");
    message.innerText = "";

    //Initial Ball Direction
    if (this.input.direction === 'right') {
      this.input.b_direction = 'upright';
    } else if (this.input.direction === 'left') {
      this.input.b_direction = 'upleft';
    } else {
        this.input.b_direction = 'up';
    }
  }
  /** @method gameOver
    * Displays a game over message
    */
  gameOver() {
    //End Game Message
    var message = document.getElementById("message");
    message.textContent = "Game Over!";
    this.over = true;
  }
  /** @method control
    * Changes direction for movmeent
    */
  control() {
    var position = this.ball.getPosition();

    //Changes ball direction when hitting a wall.
    if(position.x === 0) {
      if (this.input.b_direction === 'upleft') {
        this.audio.play();
        this.input.b_direction = 'upright';
      } else if (this.input.b_direction === 'downleft') {
        this.audio.play();
        this.input.b_direction = 'downright';
      } else {
          this.audio.play();
          this.input.b_direction = 'right';
      }
    } else if (position.x === 99) {
      if (this.input.b_direction === 'upright') {
        this.audio.play();
        this.input.b_direction = 'upleft';
      } else if (this.input.b_direction === 'downright') {
        this.audio.play();
        this.input.b_direction = 'downleft';
      } else {
          this.audio.play();
          this.input.b_direction = 'left';
      }
    } else if (position.y === 0) {
      if (this.input.b_direction === 'upleft') {
        this.audio.play();
        this.input.b_direction = 'downleft';
      } else if (this.input.b_direction === 'upright') {
        this.audio.play();
        this.input.b_direction = 'downright';
      } else {
          this.audio.play();
          this.input.b_direction = 'down';
      }
    } else if (position.y === 99) {
      return this.gameOver();
    }
  }
  /**@method handleKeyDown
    * Register when a key is pressed and changed out input object.
    */
    handleKeyDown(event) {
      event.preventDefault();
      switch(event.key){
        case 'a':
        case 'ArrowLeft':
          this.input.direction = 'left';
          break;
        case 'd':
        case 'ArrowRight':
          this.input.direction = 'right';
          break;
       case ' ':
          //TODO: Start Game if game hasn't started yet.
          this.input.start = true;
          break;
      }
    }

    /**@method handleKeyUp
      * Register when a key is pressed and changed out input object.
      */
      handleKeyUp(event) {
        event.preventDefault();
        switch(event.key){
          case 'a':
          case 'ArrowLeft':
            this.input.direction = 'neutral';
            break;
          case 'd':
          case 'ArrowRight':
            this.input.direction = 'neutral';
            break;
        }
      }

    /**@method update
      * Updates the game world
      */
      update() {
        if(!this.over) {
          //Check if the game has started.
          if (this.input.start && this.input.b_direction === 'neutral') {
            this.gameStart();
          }
          if(this.start) {
            this.control();
            this.hit();
            var message2 = document.getElementById("message2");
            message2.innerText = "Score: " + this.score;
          }
          this.bar.update(this.input.direction);
          this.ball.update(this.input.direction, this.input.start, this.input.b_direction);

        }
      }

      /**@method render
        * Renders the game world
        */
        render() {
          this.backBufferContext.fillStyle = '#ccc';
          this.backBufferContext.fillRect(0,0,100,100);
          /*this.brick.forEach((brick) => {
            brick.render(this.backBufferContext);
          });*/
          this.bar.render(this.backBufferContext);
          this.ball.render(this.backBufferContext);
          this.brick.render(this.backBufferContext);
          this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);
        }

      /**@method loop
        * Loops
        */
        loop() {
          this.update();
          this.render();
        }
      }
