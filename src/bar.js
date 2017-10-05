// Bar.js

/**@class Bar
  * The bar in a Breakout game
  */
  export default class Bar {
    constructor(x, y) {
      this.body = {x: x, y: y};
      this.width = 15;
      this.height = 1;
      
      //bind class methods
      this.update =  this.update.bind(this);
      this.render = this.render.bind(this);
      this.getPosition = this.getPosition.bind(this);
    }
    getPosition() {
      return {x: this.body.x, y: this.body.y};
    }
    update(input) {
      //Apply our move
      switch(input) {
        case 'right':
          if(this.body.x+1 > 100-this.width) return;
          this.body.x++;
          break;
        case 'left':
          if(this.body.x-1 < 0) return;
          this.body.x--;
          break;
      }
    }
    /** @function render
      * Render the snake
      */
      render(ctx) {
          ctx.save();
          ctx.fillStyle = 'blue';
          ctx.fillRect(this.body.x, this.body.y, this.width, this.height);
          ctx.restore();
      }
  }
