import { MODES, set_mode } from './modes.js'

export function keypress (key) {
    switch (key) {
        case "a":
            set_mode(MODES.ADD_LABEL)
        break;
        case "i":
            set_mode(MODES.ZOOMIN)
        break;
        case "o":
            set_mode(MODES.ZOOMOUT)
        break;
        case "n":
            set_mode(MODES.NAVIGATION)
        break;
      }
}

