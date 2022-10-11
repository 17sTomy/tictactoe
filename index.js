const GAME_BOARD = document.querySelector(".game-container")
const $BTN_RESET = document.querySelector(".game-restart")
const NOTIFICATION = document.querySelector(".game-notification")
const GAME_STATUS = ["", "", "", "", "", "", "", "", ""]
const WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

let currentPlayer = "X"
let gameActive = true
let draw = false


const showMessagge = currentPlayer => {
    if (gameActive && draw == false) {
        NOTIFICATION.textContent = `Player's "${currentPlayer}" turn...`  
    }else if (!gameActive && draw == false){
        NOTIFICATION.textContent = `Player "${currentPlayer}" wins!`  
    }else if (draw == true){
        NOTIFICATION.textContent = `Draw!`  
    }
}

const handlePlayerChange = () => {
    currentPlayer = (currentPlayer === "X") ? "O" : "X"  
    showMessagge(currentPlayer)
}

const handleCellPlayed = (clickedCellIndex, cellClicked) => {
    GAME_STATUS[clickedCellIndex] = currentPlayer
    cellClicked.innerText = currentPlayer
}

const checkWinner = () => {
    for (chance of WINNINGS){
        posicion1 = chance[0]
        posicion2 = chance[1]
        posicion3 = chance[2]
        
        if ((GAME_STATUS[posicion1] && GAME_STATUS[posicion2] && GAME_STATUS[posicion3]) !== ""){
            if (GAME_STATUS[posicion1] === GAME_STATUS[posicion2] && GAME_STATUS[posicion2] === GAME_STATUS[posicion3]){
                gameActive = false
                showMessagge(currentPlayer)
                return
            }
        }
    }

    if (GAME_STATUS.indexOf("") == -1){
        draw = true
    }
    
    handlePlayerChange()
}

const handleCellClick = (event) => {
    const cellClicked = event.target
    
    if (cellClicked.classList.contains("game-cell") && cellClicked.textContent === "" && gameActive){
        const clickedCellIndex = Array.from(cellClicked.parentNode.children).indexOf(cellClicked)
        handleCellPlayed(clickedCellIndex, cellClicked)
        checkWinner()
    }
}

const handleRestartGame = () => {
    resetGameStatus()
    gameActive = true
    draw = false
    currentPlayer = "X"
    showMessagge(currentPlayer)
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = "")
}

const resetGameStatus = () => {
    i = WINNINGS.length
    while (i >= 0){
        GAME_STATUS[i] = ""
        i--
    }
}

$BTN_RESET.addEventListener('click', handleRestartGame)
GAME_BOARD.addEventListener('click', handleCellClick)