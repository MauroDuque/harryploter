function create(id, parent, width, height) {
    let divWrapper = document.createElement('div');
    let canvasElem = document.createElement('canvas');
    parent.appendChild(divWrapper);
    divWrapper.appendChild(canvasElem);
  
    divWrapper.id = id;
    canvasElem.width = width || 530;
    canvasElem.height = height || 320;
  
    let ctx = canvasElem.getContext('2d');
   
    return {
      ctx: ctx,
      id: id
    };
  }

  export class HarryPloter {
    constructor(options) {
        options || {};
        options.id = options.id || "harrypotercanvas";
        options.parent = options.parent || document.body;
        this.options = options;
    }

    init() {
        console.log(this.options);
        this.myCanvas = create(this.options.id, this.options.parent);
    }
  }
