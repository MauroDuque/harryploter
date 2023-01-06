import { create } from './src/canvas.js'
import { add, element_types, update, elements_pile } from './src/elements.js'
import { mouse_action, set_mouse_coor, set_action, actions } from './src/mouse.js'
import { keypress } from './src/keys.js'
import { mode, MODES } from './src/modes.js'
import { zoomin, zoomout, get_zoom, render } from './src/camera.js'

var background = new Image();
background.src = "https://firebasestorage.googleapis.com/v0/b/md-ingenieria.appspot.com/o/background.png?alt=media&token=cb1d6132-ce7e-48a1-96cf-b55adda6b626";

let parentDiv = document.getElementById('canvas-enerinno')

let myCanvas = create('myCanvas', parentDiv, parentDiv.offsetWidth, parentDiv.offsetHeight)
let arr = elements_pile

background.onload = function(){
    myCanvas.ctx.scale(0.3, 0.3);
    myCanvas.ctx.drawImage(background,0,0);
}

myCanvas.ctx.canvas.onmouseup = function(e){
    set_action(actions.up)
}

myCanvas.ctx.canvas.onmousedown = function(e){
    set_action(actions.down)
    if(mode == MODES.ADD_LABEL) {
        arr = add({
            ctx: myCanvas.ctx, 
            x: mouse_action.move.x, 
            y: mouse_action.move.y, 
            text: "label test",
            color: 'green',
            type: element_types.LABEL
        }, arr)
        
        render(myCanvas.ctx, arr)
    }
}

myCanvas.ctx.canvas.onmousemove = function(e){
    set_mouse_coor(e.offsetX, e.offsetY);
}

addEventListener('keydown', (event) => {
    keypress(event.key)
    if(mode == MODES.ZOOMIN)  zoomin()
    if(mode == MODES.ZOOMOUT)  zoomout()
})

arr = add({
    ctx: myCanvas.ctx, 
    x: 50, 
    y: 50, 
    length: 100, 
    color: 'blue',
    type: element_types.SQUARE
}, arr)

add({
    ctx: myCanvas.ctx, 
    x: 20, 
    y: 30, 
    radius: 5, 
    color: 'red',
    type: element_types.CIRCLE
}, arr)

add({
    ctx: myCanvas.ctx, 
    x: 50, 
    y: 100, 
    id: '7C:DF:A1:4D:D1:BE&0x69',
    text: 'Hello', 
    color: 'black',
    type: element_types.LABEL
}, arr)

add({
    ctx: myCanvas.ctx, 
    x: 150, 
    y: 100, 
    id: '7C:DF:A1:4D:D2:BE&0x69',
    text: 'Hello', 
    color: 'green',
    type: element_types.LABEL
}, arr)

add({
    ctx: myCanvas.ctx, 
    x: 50, 
    y: 100, 
    id: '7C:DF:A1:4D:D1:BE&0x69',
    text: 'Hello', 
    color: 'black',
    type: element_types.LABEL
}, arr)
console.log(arr)

render(myCanvas.ctx, arr)

// setInterval(function(){
//     update({
//         id: "7C:DF:A1:4D:D1:BE&0x69",
//         text: Math.floor(Math.random() * 100),
//     }, arr)

//     render(myCanvas.ctx, arr)
// }, 50)


// setInterval(function(){
//     update({
//         id: "7C:DF:A1:4D:D2:BE&0x69",
//         text: Math.floor(Math.random() * 100),
//     }, arr)

//     render(myCanvas.ctx, arr)
// }, 5000)

export {
    myCanvas
}