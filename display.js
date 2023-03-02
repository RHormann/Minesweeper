

import { createBoard, markTile, TILE_STATUSES, revealTile, checkWin, checkLose} from "./logic.js";

const BOARDSIZEX = 10
const BOARDSIZEY = 10
const NUMBEROFMINES = 15


const board = createBoard(BOARDSIZEX,BOARDSIZEY,NUMBEROFMINES)
const boardElement = document.querySelector('.board')
const flagsLeftCount = document.querySelector('[data-flag-count]')
const message = document.querySelector(".subtext")

//accidently did this the wrong way
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
            checkGameEnd()
        })
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault()
            markTile(tile)
            listMinesLeft()
        })
    })
})
boardElement.style.setProperty('--sizex',BOARDSIZEY)
boardElement.style.setProperty('--sizey',BOARDSIZEX)
flagsLeftCount.textContent = NUMBEROFMINES

function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return (count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length)
    }, 0)

    flagsLeftCount.textContent = NUMBEROFMINES - markedTilesCount
}

function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        boardElement.addEventListener('click', stopProp, { capture: true})
        boardElement.addEventListener('contextmenu', stopProp, { capture: true})
    }

    if (win) {
        message.textContent = "Win!"
    }

    if (lose) {
        message.textContent = "Lost!"
        board.forEach(row => {
            row.forEach (tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if (tile.mine) revealTile(board, tile)
            })
        })
    }
    
}

function stopProp(e) {
    e.stopImmediatePropagation()
}