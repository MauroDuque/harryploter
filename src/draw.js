import { element_types } from './elements.js'

export function draw(element) {
  if(element.type == element_types.SQUARE) return square(element)
  if(element.type == element_types.CIRCLE) return circle(element)
  if(element.type == element_types.LABEL) return label(element)
}

function square (element) {
  element.ctx.fillStyle = element.color
  element.ctx.fillRect(element.x, element.y, element.length, element.length)

  return {
    type: element.type,
    id: "",
    length: element.length,
    x: element.x,
    y: element.y,
    color: element.color
  }
}

function circle (element) {
  element.ctx.beginPath()
  element.ctx.arc(element.x, element.y, element.radius, 0, 2 * Math.PI, false)
  element.ctx.fillStyle = element.color
  element.ctx.fill()

  return {
    type: element.type,
    id: "",
    radius: element.radius,
    x: element.x,
    y: element.y,
    color: element.color
  }
}

function label(element) {
  element.ctx.save();
  element.fillStyle = element.color
  element.ctx.font = "18px Arial";
  element.ctx.fillText(element.text, element.x, element.y);
  element.ctx.restore();

  return {
    type: element.type,
    id: element.id,
    x: element.x,
    y: element.y,
    color: element.color,
    text: element.color,
  }
}
