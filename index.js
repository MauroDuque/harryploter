// Components ------------------------------------------------------------
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var COMPONENT_TYPES = {
    POINT: 1,
    LINE: 2,
    CIRCLE: 3,
    RECTANGLE: 4,
    ARC: 5,
    MEASURE: 6,
    LABEL: 7,
    SHAPE: 8
};
/**
* Abstract class Component used to derive
* all other concrete item classes
*/
var Component = /** @class */ (function () {
    function Component() {
        this.setActive = function (active) {
            this.active = active;
        };
        this.isActive = function () {
            return this.active;
        };
        this.active = true;
        this.type = 0;
        this.color = "#fff";
        this.radius = 1;
        this.width = 2;
    }
    return Component;
}());
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        if (x !== undefined && y !== undefined) {
            _this.x = x;
            _this.y = y;
        }
        return _this;
    }
    return Point;
}(Component));
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(x1, y1, x2, y2) {
        var _this = _super.call(this) || this;
        _this.type = COMPONENT_TYPES.LINE;
        _this.x1 = 0;
        _this.y1 = 0;
        _this.x2 = 0;
        _this.y2 = 0;
        if (x1 !== undefined
            && y1 !== undefined
            && x2 !== undefined
            && y2 !== undefined) {
            _this.x1 = x1;
            _this.y1 = y1;
            _this.x2 = x2;
            _this.y2 = y2;
        }
        return _this;
    }
    return Line;
}(Component));
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(x1, y1, x2, y2) {
        var _this = _super.call(this, x1, y1, x2, y2) || this;
        _this.type = COMPONENT_TYPES.CIRCLE;
        return _this;
    }
    return Circle;
}(Line));
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x1, y1, x2, y2) {
        var _this = _super.call(this, x1, y1, x2, y2) || this;
        _this.type = COMPONENT_TYPES.RECTANGLE;
        return _this;
    }
    return Rectangle;
}(Line));
var Measure = /** @class */ (function (_super) {
    __extends(Measure, _super);
    function Measure(x1, y1, x2, y2) {
        var _this = _super.call(this, x1, y1, x2, y2) || this;
        _this.type = COMPONENT_TYPES.MEASURE;
        _this.color = "#ff3";
        return _this;
    }
    return Measure;
}(Line));
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label(x, y, text) {
        var _this = _super.call(this, x, y) || this;
        _this.type = COMPONENT_TYPES.LABEL;
        _this.color = "#eee";
        _this.text = text;
        return _this;
    }
    return Label;
}(Point));
var Arc = /** @class */ (function (_super) {
    __extends(Arc, _super);
    function Arc(x1, y1, x2, y2, x3, y3) {
        var _this = _super.call(this) || this;
        _this.type = COMPONENT_TYPES.ARC;
        _this.x1 = 0;
        _this.y1 = 0;
        _this.x2 = 0;
        _this.y2 = 0;
        _this.x3 = 0;
        _this.y3 = 0;
        if (x1 !== undefined
            && y1 !== undefined
            && x2 !== undefined
            && y2 !== undefined
            && x3 !== undefined
            && y3 !== undefined) {
            _this.x1 = x1;
            _this.y1 = y1;
            _this.x2 = x2;
            _this.y2 = y2;
            _this.x3 = x3;
            _this.y3 = y3;
        }
        return _this;
    }
    return Arc;
}(Component));
var Shape = /** @class */ (function (_super) {
    __extends(Shape, _super);
    function Shape(x, y) {
        var _this = _super.call(this) || this;
        _this.type = COMPONENT_TYPES.SHAPE;
        _this.x = 0;
        _this.y = 0;
        _this.color = "#f0f";
        _this.components = new Array();
        if (x !== undefined && y !== undefined) {
            _this.x = x;
            _this.y = y;
        }
        return _this;
    }
    Shape.prototype.addComponent = function (component) {
        this.components.push(component);
    };
    ;
    return Shape;
}(Component));
// Components end ------------------------------------------------------------
// Mouse and Keyboard ------------------------------------------------------------
var KeyboardEvent = /** @class */ (function () {
    function KeyboardEvent(keyDown, key, fx) {
        this.keyDown = keyDown;
        this.key = key;
        this.fx = fx;
    }
    return KeyboardEvent;
}());
/**
 * Class that handles keyboard input
 */
var KeyboardHandler = /** @class */ (function () {
    function KeyboardHandler() {
        this.KEYS = {
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            CAPSLOCK: 20,
            ENTER: 13,
            SLASH: 220,
            FORWARDSLASH: 191,
            LESSTHAN: 188,
            GREATERTHAN: 190,
            SEMICOLON: 59,
            APOSTROPHE: 222,
            OPENBRACKET: 219,
            CLOSEBRACKET: 221,
            BACKSPACE: 8,
            TAB: 9,
            SPACE: 32,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            ESC: 27,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            PRINTSCREEN: 44,
            SCROLLLOCK: 145,
            BREAKK: 19,
            DASH: 109,
            PLUS: 107,
            TILDE: 192,
            NUMPADSLASH: 111,
            NUMPADASTERISK: 106,
            NUMPADPERIOD: 110,
            INSERT: 45,
            DEL: 46,
            PAGEUP: 33,
            PAGEDOWN: 34,
            END: 35,
            HOME: 36,
            NUM: function (n) { return n + 48; },
            NUMPAD: function (n) { return n + 96; }
        };
        this.lastkey = 0;
        this.currentKeyBuffer = new Array(false, false);
        this.defaultPreventionList = new Array();
        // This array store all key events
        this.keyEvents = new Array();
    }
    KeyboardHandler.prototype.setLastKey = function (k) {
        this.lastKey = k;
    };
    KeyboardHandler.prototype.defaultKeyDownAction = function (key) {
        this.lastKey = key;
    };
    KeyboardHandler.prototype.addKeyEvent = function (keyDown, key, fx) {
        var keyEvent = new KeyboardEvent(keyDown, key, fx);
        this.keyEvents.push(keyEvent);
    };
    KeyboardHandler.prototype.onKeyUp = function (e) {
        for (var k = this.keyEvents.length - 1; k >= 0; k--) {
            if (this.keyEvents[k].key === e.which && !this.keyEvents[k].keyDown) {
                this.keyEvents[k].fx();
            }
        }
    };
    KeyboardHandler.prototype.onKeyDown = function (e) {
        // Looks if is necessary to prevent action on this key
        for (var k = 0; k < this.defaultPreventionList.length; k++)
            if (defaultPreventionList[k] === e.which)
                e.preventDefault();
        // Set last used key
        this.defaultKeyDownAction(e.which);
        for (var k = this.keyEvents.length - 1; k >= 0; k--) {
            if (this.keyEvents[k].key === e.which && this.keyEvents[k].keyDown) {
                this.keyEvents[k].fx();
            }
        }
    };
    KeyboardHandler.prototype.setKeyEnabled = function (key, enabled) {
        var found = -1;
        for (var i = 0; i < this.defaultPreventionList.length; i++) {
            if (this.defaultPreventionList[i] === key) {
                found = i;
                break;
            }
        }
        if (found !== -1 && enabled)
            delete this.defaultPreventionList[i];
        if (found === -1 && !enabled)
            this.defaultPreventionList.push(key);
    };
    return KeyboardHandler;
}());
/**
 * Class that handles mouse input
 */
var MouseHandler = /** @class */ (function () {
    function MouseHandler() {
        this.cursorXGlobal = 0;
        this.cursorYGlobal = 0;
        this.cLMB = false;
        this.cRMB = false;
        this.pLMB = false;
        this.pRMB = false;
    }
    MouseHandler.prototype.updateCoords = function (x, y) {
        this.cursorXGlobal = x;
        this.cursorYGlobal = y;
    };
    MouseHandler.prototype.onMouseMove = function (e) {
        this.updateCoords(e.pageX, e.pageY);
    };
    MouseHandler.prototype.onMouseDown = function (e) {
        switch (e.which) {
            case 1:
                this.cLMB = true;
                this.cRMB = false;
                break;
            case 3:
                this.cLMB = false;
                this.cRMB = true;
                break;
        }
    };
    MouseHandler.prototype.onMouseDown = function (e) {
        switch (e.which) {
            case 1:
                this.cLMB = true;
                this.cRMB = false;
                break;
            case 3:
                this.cLMB = false;
                this.cRMB = true;
                break;
        }
    };
    MouseHandler.prototype.onMouseUp = function (e) {
        switch (e.which) {
            case 1:
                this.cLMB = false;
                break;
            case 3:
                this.cRMB = false;
                break;
        }
    };
    return MouseHandler;
}());
// Mouse and Keyboard  End------------------------------------------------------------
var HarryPloter = /** @class */ (function () {
    // counter: number;
    // imageBackground: any;
    function HarryPloter(options) {
        options = options || {};
        options.grid = options.grid || { fillStyle: '#000000', strokeStyle: '#777777', lineWidth: 1, millisPerLine: 1000, verticalSections: 2 };
        options.fps = options.fps || 50;
        this.options = options;
        this.components = [
            new Line(100, 100, 200, 200),
            new Circle(100, 75, 50, 0)
        ];
        this.temporaryPoints = new Array(null, null, // x1, y1
        null, null, // x2, y2
        null, null);
        this.temporaryComponentType = null;
        this.cOutX = 100;
        this.cOutY = 100;
        this.camMoving = false;
        this.xCNaught = 0;
        this.yCNaught = 0;
        this.cOutX = 0;
        this.cOutY = 0;
        this.camX = 0;
        this.camY = 0;
        this.MOUSEACTION = {
            MOVE: 0,
            DOWN: 1,
            UP: 2
        };
        this.MODES = {
            ADDPOINT: 1,
            ADDLINE: 2,
            ADDCIRCLE: 3,
            ADDRECRTANGLE: 4,
            ADDARC: 5,
            ADDMEASURE: 6,
            ADDLABEL: 7,
            ADDSHAPE: 8,
            DELETE: 20,
            TRIM: 21,
            NAVIGATE: 22,
            MOVE: 23,
            EDIT: 24,
            NAN: 25
        };
        this.mode = this.MODES.LINE;
        this.keyboard = {};
        this.mouse = {};
    }
    HarryPloter.prototype.streamTo = function (canvas, delay) {
        var _this = this;
        var self = this;
        this.keyboard = new KeyboardHandler();
        this.mouse = new MouseHandler();
        this.ctx = canvas.getContext("2d");
        this.dimensions = { top: 0, left: 0, width: canvas.clientWidth, height: canvas.clientHeight };
        canvas.addEventListener('mousemove', function (e) {
            _this.mouse.onMouseMove(e);
            self.performAction(e, _this.MOUSEACTION.MOVE);
        });
        canvas.addEventListener('mousedown', function (e) {
            _this.mouse.onMouseDown(e);
            self.performAction(e, _this.MOUSEACTION.DOWN);
        });
        canvas.addEventListener('mouseup', function (e) {
            _this.mouse.onMouseUp(e);
            self.performAction(e, _this.MOUSEACTION.UP);
        });
        addEventListener('keydown', function (event) {
            _this.keyboard.onKeyDown(event);
        });
        addEventListener('keyup', function (event) {
            _this.keyboard.onKeyUp(event);
        });
        // Adding keyboard events 
        this.keyboard.addKeyEvent(true, this.keyboard.KEYS.H, function () {
            //this.logicDisplay.foo();
        });
        this.keyboard.addKeyEvent(true, this.keyboard.KEYS.I, function () {
        });
        this.keyboard.addKeyEvent(true, this.keyboard.KEYS.L, function () {
            console.log("entra L");
            self.setMode(this.MODES.ADDLINE);
        });
        this.keyboard.addKeyEvent(true, this.keyboard.KEYS.N, function () {
            self.setMode(this.MODES.NAVIGATE);
        });
        this.keyboard.addKeyEvent(true, this.keyboard.KEYS.ESC, function () {
            self.setMode(this.MODES.NAN);
        });
        // cuando se presione SHIFT se hagan lineas rectas.
        this.keyboard.addKeyEvent(true, this.keyboard.KEYS.SHIFT, function () { });
        // onkeydown = (event) => {
        //   console.log("Down>>>>", event)
        // };
        // onkeyup = (event) => { 
        // };
        // Save the state of the canvas context, any transformations applied in this method
        // will get removed from the stack at the end of this method when .restore() is called.
        this.ctx.save();
        // Move the origin.
        this.ctx.translate(this.dimensions.left, this.dimensions.top);
        // Create a clipped rectangle - anything we draw will be constrained to this rectangle.
        // This prevents the occasional pixels from curves near the edges overrunning and creating
        // screen cheese (that phrase should neeed no explanation).
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.dimensions.width, this.dimensions.height);
        this.ctx.clip();
        this.render_on_tick = function () {
            self.render();
        };
        this.start();
    };
    HarryPloter.prototype.clear = function () {
        // Clear the working area.
        this.ctx.save();
        this.ctx.fillStyle = this.options.grid.fillStyle;
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        this.ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
        this.ctx.restore();
    };
    HarryPloter.prototype.start = function () {
        if (!this.timer) {
            this.timer = setInterval(this.render_on_tick, 1000 / this.options.fps);
        }
    };
    HarryPloter.prototype.stop = function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    };
    HarryPloter.prototype.render = function () {
        var self = this;
        self.clear();
        self.drawAllComponents();
        self.updateCamera();
    };
    HarryPloter.prototype.drawAllComponents = function () {
        var self = this;
        this.components.forEach(function (element) {
            if (element.active)
                self.drawComponent(element);
        });
    };
    HarryPloter.prototype.drawCircle = function (element) {
        this.ctx.lineWidth = element.radius;
        this.ctx.fillStyle = element.color;
        this.ctx.strokeStyle = element.color;
        this.ctx.beginPath();
        this.ctx.arc(element.x1 + this.cOutX, element.y1 + this.cOutY, element.x2, element.y2, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.stroke();
        // this.drawPoint(x1, y1, color, radius);
    };
    HarryPloter.prototype.drawLine = function (element) {
        this.ctx.beginPath();
        this.ctx.moveTo(element.x1 + this.cOutX, element.y1 + this.cOutY);
        this.ctx.lineTo(element.x2 + this.cOutX, element.y2 + this.cOutY);
        this.ctx.lineWidth = element.width;
        this.ctx.strokeStyle = element.color;
        this.ctx.stroke();
    };
    HarryPloter.prototype.drawComponent = function (element) {
        var self = this;
        this.ctx.save();
        switch (element.type) {
            case COMPONENT_TYPES.POINT:
                break;
            case COMPONENT_TYPES.LINE:
                self.drawLine(element);
                break;
            case COMPONENT_TYPES.CIRCLE:
                self.drawCircle(element);
                break;
            case COMPONENT_TYPES.RECTANGLE:
                break;
            case COMPONENT_TYPES.ARC:
                break;
            case COMPONENT_TYPES.MEASURE:
                break;
            case COMPONENT_TYPES.LABEL:
                break;
            case COMPONENT_TYPES.SHAPE:
                break;
        }
        this.ctx.restore();
    };
    HarryPloter.prototype.drawTemporaryComponent = function (temporaryElement) {
        switch (temporaryElement) {
            case COMPONENT_TYPES.POINT:
                break;
            case COMPONENT_TYPES.LINE:
                break;
            case COMPONENT_TYPES.CIRCLE:
                break;
            case COMPONENT_TYPES.RECTANGLE:
                break;
            case COMPONENT_TYPES.ARC:
                break;
            case COMPONENT_TYPES.MEASURE:
                break;
            case COMPONENT_TYPES.LABEL:
                break;
            case COMPONENT_TYPES.SHAPE:
                break;
        }
    };
    HarryPloter.prototype.performAction = function (e, action) {
        switch (this.mode) {
            case this.MODES.ADDLINE:
                if (action === this.MOUSEACTION.MOVE) {
                    if (this.temporaryComponentType === null) {
                        this.temporaryComponentType = COMPONENT_TYPES.POINT;
                    }
                    else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
                        this.temporaryPoints[0] = this.getCursorXLocal();
                        this.temporaryPoints[1] = this.getCursorYLocal();
                    }
                    else if (this.temporaryComponentType === COMPONENT_TYPES.LINE) {
                        this.temporaryPoints[2] = this.getCursorXLocal();
                        this.temporaryPoints[3] = this.getCursorYLocal();
                    }
                }
                else if (action === this.MOUSEACTION.DOWN) {
                    if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
                        this.temporaryComponentType = COMPONENT_TYPES.LINE;
                        this.temporaryPoints[2] = this.getCursorXLocal();
                        this.temporaryPoints[3] = this.getCursorYLocal();
                    }
                    else if (this.temporaryComponentType === COMPONENT_TYPES.LINE) {
                        this.components.push(new Line(this.temporaryPoints[0], this.temporaryPoints[1], this.temporaryPoints[2], this.temporaryPoints[3]));
                        this.temporaryPoints[0] = this.temporaryPoints[2];
                        this.temporaryPoints[1] = this.temporaryPoints[3];
                    }
                }
                console.log(this.temporaryPoints, this.temporaryComponentType);
                break;
            case this.MODES.NAVIGATE:
                if (action === this.MOUSEACTION.DOWN) {
                    this.camMoving = true;
                    this.xCNaught = this.getCursorXLocal();
                    this.yCNaught = this.getCursorYLocal();
                }
                else if (action === this.MOUSEACTION.UP) {
                    this.camMoving = false;
                    this.camX += this.getCursorXLocal() - this.xCNaught;
                    this.camY += this.getCursorYLocal() - this.yCNaught;
                }
                break;
        }
    };
    HarryPloter.prototype.setMode = function (mode) {
        console.log("Mode", mode);
        // this.resetMode();
        // if (false)
        //   this.mode = this.MODES.NAVIGATE;
        // else
        //   this.mode = mode;
    };
    HarryPloter.prototype.resetMode = function () {
        this.temporaryComponentType = null;
        for (var i = 0; i < this.temporaryPoints.length; i++)
            delete this.temporaryPoints[i];
        this.mode = -1;
    };
    HarryPloter.prototype.updateCamera = function () {
        this.cOutX = this.camX;
        this.cOutY = this.camY;
        if (this.camMoving) {
            this.cOutX += this.getCursorXLocal() - this.xCNaught;
            this.cOutY += this.getCursorYLocal() - this.yCNaught;
        }
    };
    HarryPloter.prototype.getCursorXLocal = function () {
        return this.mouse.cursorXGlobal - this.camX;
        // return (this.mouse.cursorXGlobal - this.offsetX - this.displayWidth/2)/this.zoom - this.camX;
    };
    HarryPloter.prototype.getCursorYLocal = function () {
        return this.mouse.cursorYGlobal - this.camY;
    };
    return HarryPloter;
}());
