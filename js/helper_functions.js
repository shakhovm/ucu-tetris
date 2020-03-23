var getCurrentObject =  () => objects.find(object => object.state === 'falling');
var createPlayground = () => (new Array(10).fill().map( el => (new Array(5).fill())));

function arrayCopy(array) {
    if (!Array.isArray(array))
        return array;
    let newArray = [];
    array.forEach(element => newArray.push(arrayCopy(element)));
    return newArray;
}

function randomInt(value) {
    return Math.floor(Math.random() * Math.floor(value))
}