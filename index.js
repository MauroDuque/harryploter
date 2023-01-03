function create(id, parent, width, height) {
  let divWrapper = document.createElement('div');
  let canvasElem = document.createElement('canvas');
  parent.appendChild(divWrapper);
  divWrapper.appendChild(canvasElem);

  divWrapper.id = id;
  canvasElem.width = width;
  canvasElem.height = height;

  let ctx = canvasElem.getContext('2d');
  
  return {
    ctx: ctx,
    id: id,
    canvas: canvasElem,
  };
}

export class HarryPloter {
  constructor(options) {
    options || {};
    options.id = options.id || "harrypotercanvas";
    options.parent = options.parent || document.body;
    options.background = options.background || "rgba(138, 23, 61)";
    options.width = options.width || document.getElementById(options.parent.id).offsetWidth;
    options.height = options.height || document.getElementById(options.parent.id).offsetHeight;
    options.fps = options.fps || 50;
    this.options = options;
    this.init();
  }

  init() {
    var self = this;
    this.container = create(this.options.id, this.options.parent, this.options.width, this.options.height);

    this.container.canvas.addEventListener('mousemove', function (e) {
      console.log("Entra mouse over")
    });

    this.container.canvas.addEventListener('mousedown', (e) => {
      console.log("Mousedown")
    });

    this.container.canvas.addEventListener('mouseup', (e) => {
      console.log("Mouseup")
    });

    addEventListener('keydown', (event) => {
      console.log("Keydown");
    })

    addEventListener('keyup', (event) => {
      console.log("KeyUps")
    })

    this.render_on_tick = function() {
      self.render();
    }

    this.start();
  }

  start() {
    setInterval(this.render_on_tick, this.options.fps);
  }

  stop() {
      
  }

  clear() {
    this.container.ctx.save();
    this.container.ctx.fillStyle = this.options.background;
    this.container.ctx.clearRect(0, 0, this.options.width, this.options.height);
    this.container.ctx.fillRect(0, 0, this.options.width, this.options.height);
    this.container.ctx.restore();
  }

  render() {
    this.clear();
  }
}
