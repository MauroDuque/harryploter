import { clear } from './clear.js'
import { draw } from './draw.js'

var zoom_factor = 1;
var step_factor = 0.1;

export function zoomin() {
    zoom_factor = zoom_factor - step_factor
}

export function zoomout() {
    zoom_factor = zoom_factor + step_factor
}

export function get_zoom() {
    return zoom_factor
}

export function render(ctx, arr) {
    clear(ctx)
    arr.forEach(element => {
        draw(element)
    });
}