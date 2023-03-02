
const Easy = {
    BOARDSIZEX: 7,
    BOARDSIZEY: 12,
    NUMBEROFMINES: 13 
}

const Normal = {
    BOARDSIZEX: 18,
    BOARDSIZEY: 14,
    NUMBEROFMINES: 40 
}

const Hard = {
    BOARDSIZEX: 24,
    BOARDSIZEY: 20,
    NUMBEROFMINES: 99
}

const Extreme = {
    BOARDSIZEX: 30,
    BOARDSIZEY: 28,
    NUMBEROFMINES: 200
}

const Custom = {
    BOARDSIZEX: 8,
    BOARDSIZEY: 10,
    NUMBEROFMINES: 12 
}

const difficulties = {
    Easy,
    Normal,
    Hard,
    Extreme,
    Custom
}

export function getDifficulty (text) {
    return difficulties.text
}

function getCustom(x, y, noOfMines) {

}