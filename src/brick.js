export default class Brick {
  constructor() {
    this.body = [];
    this.width = 8;
    this.height = 3;

    for(var i = 0; i < 6; i++) {
        this.body[i] = [];
      for(var j = 0; j < 10; j++) {
        this.body[i][j] = { x: (6 + (j*9)), y: (6 + (i*9)) }
      }
    }

    //bind class methods
    this.update =  this.update.bind(this);
    this.render = this.render.bind(this);
    this.getBar = this.getBrick.bind(this);
  }
  getBrick() {
    return this.body;
  }
  update(brick) {
    for(var i = 0; i < 6; i++) {
      for(var j = 0; j < 10; j++) {
        if(this.body[i][j] === brick) {
          this.body[i][j] = {};
          switch(i) {
            case 0:
            case 1:
              return 30;
              break;
            case 2:
            case 3:
              return 20;
              break;
            case 4:
            case 5:
              return 10;
              break;
          }
        }
      }
    }
  }
  render(ctx) {
    ctx.save();
    for(var i = 0; i < 6; i++) {
      for(var j = 0; j < 10; j++) {
        //Change color of bricks.
        switch(i) {
          case 0:
          case 1:
            ctx.fillStyle = 'darkred';
            break;
          case 2:
          case 3:
            ctx.fillStyle = 'darkorange';
            break;
          case 4:
          case 5:
            ctx.fillStyle = 'yellow';
            break;
        }

        //Fill bricks into the canvas.
        ctx.fillRect(this.body[i][j].x, this.body[i][j].y, this.width, this.height);
      }
    }

    ctx.restore();

  }
}
