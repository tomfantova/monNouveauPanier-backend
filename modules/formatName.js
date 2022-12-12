// Formate correctement un nom propre (simple ou composé) avec les premières lettres en majuscule et le reste en minuscule

function formatName(name) {
    const array = name.toLowerCase().split('')
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            array.splice(0, 1, array[0].toUpperCase())
        } else if (array[i - 1] === '-') {
            array.splice(i, 1, array[i].toUpperCase())
        } else if (array[i - 1] === ' ') {
            array.splice(i, 1, array[i].toUpperCase())
        }
    }
    const formatedName = array.join('')
    return formatedName
}

module.exports = { formatName }