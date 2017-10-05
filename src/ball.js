export default class Ball {
  constructor(x, y) {
    this.body = {x: x, y: y};
    this.width = 2;
    this.height = 2;
    this.start = false;
    this.direction = 'neutral';
    //bind class methods
    this.update =  this.update.bind(this);
    this.render = this.render.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }
  getPosition() {
    return {x: this.body.x, y: this.body.y};
  }
  update(input, start, ballD) {
    if(!start) {
      switch(input) {
        case 'right':
          if(this.body.x+1 > 100-8) return;
          this.body.x++;
          break;
        case 'left':
          if(this.body.x-1 < 7) return;
          this.body.x--;
          break;
      }
    } else if (ballD === 'neutral') {
      ballD = 'up';
      this.body.y--;
      switch(input) {
        case 'right':
          ballD = 'upright';
          this.body.x++;
          break;
        case 'left':
          ballD = 'upleft';
          this.body.x--;
      }
    } else {
      switch(ballD) {
        case 'up':
          this.body.y--;
          break;
        case 'down' :
          this.body.y++;
          break;
        case 'left' :
          this.body.x--;
          break;
        case 'right' :
          this.body.x++;
          break;
        case 'upright' :
          this.body.x++;
          this.body.y--;
          break;
        case 'upleft' :
          this.body.x--;
          this.body.y--;
          break;
        case 'downright' :
          this.body.x++;
          this.body.y++;
          break;
        case 'downleft':
          this.body.x--;
          this.body.y++;
          break;
      }
    }
        //this.direction = ballD;
  }
  render(ctx) {
      ctx.save();
      ctx.fillStyle = 'red';
      ctx.fillRect(this.body.x, this.body.y, this.width, this.height);
      ctx.restore();
  }
}
