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

// Components ------------------------------------------------------------

var COMPONENT_TYPES = {
  POINT : 1,
  LINE : 2,
  CIRCLE : 3,
  RECTANGLE : 4,
  ARC : 5,
  MEASURE : 6,
  LABEL : 7,
  SHAPE : 8
};


class Component { 
  constructor(){
    this.id = "";
    this.active = true;
    this.type = 0; 
    this.color = "#fff";
    this.radius = 1;
    this.width = 2;
  }

  setActive = function(active) {
    this.active = active;
  }
  
  isActive = function() {
    return this.active;
  }
}

class Point extends Component {
  constructor(x, y, id) {
    super();

    this.x = x;
    this.y = y;
    this.id = id || "";

    if ( x !== undefined && y !== undefined) {
      this.x = x;
      this.y = y;
    }
  }
}

class Line extends Component {
  constructor(x1, y1, x2, y2, id){
    super();
    this.type = COMPONENT_TYPES.LINE;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

    this.id = id || "";
    

    if ( x1 !== undefined
      && y1 !== undefined
      && x2 !== undefined
      && y2 !== undefined)
    {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    }
  }
}

class Circle extends Line {
  constructor(x1, y1, x2, y2, id){
    super(x1, y1, x2, y2);
    this.id = id || "";
    this.type = COMPONENT_TYPES.CIRCLE;
  }
}

class Rectangle extends Line {
  constructor(x1, y1, x2, y2, id){
    super(x1, y1, x2, y2)
    this.id = id || "";
    this.type = COMPONENT_TYPES.RECTANGLE;
  }
}

class Measure extends Line {
  constructor(x1, y1, x2, y2, id){
    super(x1, y1, x2, y2)
    this.id = id || "";
    this.type = COMPONENT_TYPES.MEASURE;
    this.color = "#ff3";
  }
}

class Label extends Point {
  constructor(x, y, text, id) {
    super(x, y)
    this.id = id || "";
    this.type = COMPONENT_TYPES.LABEL;
    this.color = "white";
    this.text = text;
  }
}

class Arc extends Component{
  constructor(x1, y1, x2, y2, x3, y3, id){
    super()
    this.id = id || "";
    this.type = COMPONENT_TYPES.ARC;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.x3 = 0;
    this.y3 = 0;

    if ( x1 !== undefined
      && y1 !== undefined
      && x2 !== undefined
      && y2 !== undefined
      && x3 !== undefined
      && y3 !== undefined)
    {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.x3 = x3;
      this.y3 = y3;
    }
  }
}

class Shape extends Component{
  constructor(x, y, id) {
    super();
    this.id = id || "";
    this.type = COMPONENT_TYPES.SHAPE;
    this.x = 0;
    this.y = 0;
    this.color = "#f0f";
    this.components = new Array();
    if ( x !== undefined && y !== undefined) {
      this.x = x;
      this.y = y;
    }
  }
  addComponent(component) {
    this.components.push(component);
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

    this.MODES = {
			ADDPOINT : 1,
			ADDLINE : 2,
			ADDCIRCLE : 3,
			ADDRECTANGLE : 4,
			ADDARC : 5,
			ADDMEASURE : 6,
			ADDLABEL : 7,
			ADDSHAPE : 8,
			DELETE : 20,
			TRIM : 21,
			NAVIGATE : 22,
			MOVE : 23,
			EDIT : 24,
      NAN : 25,
	  };

    this.mode = this.MODES.NAVIGATE;

    this.mouse = {};
    this.MOUSEACTION = {
      MOVE: 0,
      DOWN: 1,
      UP: 2,
    };

    this.components = [
      new Line(100, 100, 200, 200),
      new Circle(100, 75, 50, 0),
      new Label(50, 50, "Hola", "7C:DF:A1:4D:D1:BE&0x69"),
      new Label(150, 50, "Hola", "7C:DF:A1:4D:D2:BE&0x69"),
    ];

    this.temporaryPoints = new Array(
			null, null,   // x1, y1
			null, null,   // x2, y2
			null, null
    );

    this.temporaryComponentType = null;

    this.init();
  }

  init() {
    var self = this;
    this.container = create(this.options.id, this.options.parent, this.options.width, this.options.height);

    this.container.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.pageX
      this.mouse.y = e.pageY
      self.performAction(e, 0);
    });

    this.container.canvas.addEventListener('mousedown', (event) => {
      self.performAction(event, 1);
    });

    this.container.canvas.addEventListener('mouseup', (event) => {
      self.performAction(event, 2);
    });

    addEventListener('keydown', (event) => {
      // console.log("Keydown", event);
    })

    addEventListener('keyup', (event) => {
      switch (event.key) {
        case "l":
          this.setMode(this.MODES.ADDLINE);
        break;
        case "b":
          this.setMode(this.MODES.ADDLABEL);
        break;
        case "n":
          this.setMode(this.MODES.NAVIGATE);
        break;
      }
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

  drawCircle(element){
    this.container.ctx.save();
    this.container.ctx.lineWidth = element.radius;
    this.container.ctx.fillStyle = element.color;
    this.container.ctx.strokeStyle = element.color;
    this.container.ctx.beginPath();
    this.container.ctx.arc(element.x1, element.y1, element.x2, element.y2, 2 * Math.PI)
    this.container.ctx.closePath();
    this.container.ctx.stroke();
    this.container.ctx.restore();
  }

  drawLine(element) {
    this.container.ctx.save();
    this.container.ctx.beginPath();
    this.container.ctx.moveTo(element.x1, element.y1);
    this.container.ctx.lineTo(element.x2, element.y2);
    this.container.ctx.lineWidth = element.width;
    this.container.ctx.strokeStyle = element.color;
    this.container.ctx.stroke();
    this.container.ctx.restore();
  }

  drawLabel(element) {
    this.container.ctx.save();
    this.container.fillStyle = element.color
    this.container.ctx.font = "18px Arial";
    this.container.ctx.fillText(element.text, element.x, element.y);
    this.container.ctx.restore();
  }

  drawComponent(element) {
    var self = this;
    
    switch (element.type) {
      case COMPONENT_TYPES.POINT:
      break
      case COMPONENT_TYPES.LINE:
        self.drawLine(element);
      break
      case COMPONENT_TYPES.CIRCLE:
        self.drawCircle(element);
      break
      case COMPONENT_TYPES.RECTANGLE:
      break
      case COMPONENT_TYPES.ARC:
      break
      case COMPONENT_TYPES.MEASURE:
      break
      case COMPONENT_TYPES.LABEL:
        self.drawLabel(element);
      break
      case COMPONENT_TYPES.SHAPE:
      break
    }
    
  }

  drawTemporaryComponent() {
    switch (this.temporaryComponentType) {
      case COMPONENT_TYPES.LINE:
        let element = {}
        
        this.drawLine({
          x1: this.temporaryPoints[0],
          y1: this.temporaryPoints[1],
          x2: this.temporaryPoints[2],
          y2: this.temporaryPoints[3],
        });
      break;
      case COMPONENT_TYPES.LABEL:
        this.drawLabel(
            this.temporaryPoints[0],
            this.temporaryPoints[1],
            this.temporaryText,
            this.selectedColor,
            this.selectedRadius);
      break;
    } 
  }

  drawAllComponents() {
    var self = this;
    this.components.forEach(element => {
      if(element.active) self.drawComponent(element);
    });
  }

  setMode(mode) {
    this.mode = mode;
  }

  resetMode() {
    this.mode = this.MODES.NAVIGATE;
  }

  getCursor() {
    return {
      x: this.mouse.x,
      y: this.mouse.y,
    }
  }

  performAction (event, action) {
    switch (this.mode) {
      case this.MODES.ADDLINE:
        if (action === this.MOUSEACTION.MOVE) {         
          if (this.temporaryComponentType === null) {
            this.temporaryComponentType = COMPONENT_TYPES.POINT;                             
          } else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
            this.temporaryPoints[0] = this.getCursor().x;
            this.temporaryPoints[1] = this.getCursor().y;
          } else if (this.temporaryComponentType === COMPONENT_TYPES.LINE) {
            this.temporaryPoints[2] = this.getCursor().x;
            this.temporaryPoints[3] = this.getCursor().y;
          }
        } else if (action === this.MOUSEACTION.DOWN) {
          if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
            this.temporaryComponentType = COMPONENT_TYPES.LINE;
            this.temporaryPoints[2] = this.getCursor().x;
            this.temporaryPoints[3] = this.getCursor().y;
          } else if (this.temporaryComponentType === COMPONENT_TYPES.LINE) {

            this.components.push(new Line(
							this.temporaryPoints[0],
							this.temporaryPoints[1],
							this.temporaryPoints[2],
							this.temporaryPoints[3]
            ));

            this.temporaryPoints[0] = this.temporaryPoints[2];
            this.temporaryPoints[1] = this.temporaryPoints[3];
          }                        
        }
        
      break;

      case this.MODES.ADDLABEL:
        console.log("Entra")
        if (action === this.MOUSEACTION.MOVE) {
          if (this.temporaryComponentType === null) {
            this.temporaryComponentType = COMPONENT_TYPES.POINT;
          } else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
            this.temporaryPoints[0] = this.getCursor().x;
            this.temporaryPoints[1] = this.getCursor().y;
          }
        } else if ( action === this.MOUSEACTION.DOWN ) {
          var text = prompt("Text:");
          if ( text.length > 0 ) {
            this.components.push(new Label(
              this.temporaryPoints[0],
              this.temporaryPoints[1],
              text));
            this.resetMode();
          }
        }
      break;

      case this.MODES.NAVIGATE:

      break;
    }
  }

  update(data) {
    this.components.forEach((element) => {
      if(element.id == data.id) element.text = data.text
    })
  }

  render() {
    var self = this;
    self.clear();
    self.drawAllComponents();

    self.drawTemporaryComponent();
  }
}
