export let elements_pile = []

export const element_types = {
    SQUARE: 1,
    CIRCLE: 2,
    LABEL: 3,
}

export function add (element, arr) {
    let arrtmp = arr
    arrtmp.push(element)
    return arrtmp
}

export function update (data, arr) {
    arr.forEach(element => {
       if(element.id == data.id) element.text = data.text 
    })
}