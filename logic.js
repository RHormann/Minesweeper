
export const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MARKED: 'marked',
    MINE: 'mine',
    NUMBER: 'number'
}

//creates the board as an array of arrays, each array will represent a row which each index containing the column
export function createBoard(boardSizex, boardSizey, numberOfMines) {
    const board = []
    const minePositions = getMinePositions(boardSizex, boardSizey, numberOfMines)
    for (let x = 0; x < boardSizex; x++) {
        const row = []
        for (let y = 0; y < boardSizey; y++) {
            const element = document.createElement('div')
            element.dataset.status = TILE_STATUSES.HIDDEN
            const tile = {
                element,
                x,
                y,
                mine : minePositions.some(positionMatch.bind(null, {x, y})),
                get status() {
                    return this.element.dataset.status
                },
                set status (value) {
                    this.element.dataset.status = value
                } 
            }

            row.push(tile)
        }
        board.push(row)
    }

    return board
}

function getMinePositions(boardSizex, boardSizey, numberOfMines) {
    const positions = []

    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSizex),
            y: randomNumber(boardSizey)
        }

        if (!positions.some(positionMatch.bind(null, position))){
            positions.push(position)
        }
    }

    return positions
}

function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
}

function randomNumber(n) {
    return Math.floor(Math.random() * n)
}

export function markTile(tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED) {
        return
    }

    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN
    } else {
        tile.status = TILE_STATUSES.MARKED
    }
}

export function revealTile(board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
        return
    }

    if (tile.mine) {
        tile.status = TILE_STATUSES.MINE
        return
    }

    tile.status = TILE_STATUSES.NUMBER
    const adjacentTiles = nearbyTiles(board, tile)
    const mines = adjacentTiles.filter(t => t.mine)
    if (mines.length === 0) {
        adjacentTiles.forEach(revealTile.bind(null,board))
    } else {
        tile.element.textContent = mines.length
    }
}

function nearbyTiles(board,{ x, y }) {
    const tiles = []

    for (let xOffset = -1; xOffset <= 1; xOffset++){
        for (let yOffset = -1; yOffset <= 1; yOffset++){
            const tile = board[x + xOffset]?.[y + yOffset]
            if (tile) tiles.push(tile)
        }
    }

    return tiles
}

export function checkWin(board) {
    return board.every(row => {
        return row.every(tile => {
            return tile.status === TILE_STATUSES.NUMBER || (tile.mine && (tile.status === TILE_STATUSES.HIDDEN || tile.status === TILE_STATUSES.MARKED))
        })
    })
}

export function checkLose(board) {
    return board.some(row => {
        return row.some(tile => {
            return tile.status === TILE_STATUSES.MINE
        })
    })
}