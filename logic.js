
//creates the board as an array of arrays, each array will represent a row which each index containing 0 or 1 meaing mine or not
export function createBoard(boardSizex, boardSizey, numberOfMines) {
    const board = []
    for (let x = 0; x < boardSizex; x++) {
        const row = []
        for (let y = 0; boardSizey; y++) {
            const tile = {
                x,
                y,
            }

            row.push(tile)
        }
        board.push(row)
    }

    return board
}