export var actions = {
    down: 1,
    up: 2,
}

export var mouse_action = {
    move: {
        x: 0,
        y: 0,
    },
    action: null
}

export function set_mouse_coor(x, y){
    mouse_action.move.x = x
    mouse_action.move.y = y
}

export function set_action (action) {
    mouse_action.action = action
}