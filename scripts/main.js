import listener from "./listener.js"
// import presentation from "./presentation.js"
import Game from "./game.js"

const board = [['','',''],['','',''],['','','']]
const players = ['O', 'X']

function restart() {
	document.getElementById("game-over").style.display = "none"
	document.getElementById("main").innerHTML = ""
	populateBoard()
} 

function setCell(event, TicTacToe) {
	const getId = event.target.id.split(",").map((x) => parseInt(x))
	const x = getId[0]
	const y = getId[1]
	const write = TicTacToe.setCell({x, y})
	if(write) event.target.innerText = TicTacToe.board[x][y]
		const result = TicTacToe.checkWinner()
	if(result) listener.onGameOver(result)
}

function populateBoard() {
	const board = [['','',''],['','',''],['','','']]
	const players = ['O', 'X']
	const TicTacToe = new Game(board, players)
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			let cell = document.createElement("div")
			cell.id = `${i.toString()},${j.toString()}`
			cell.classList.add("font-sans", "p-1", "items-center", "flex", "justify-center", "min-h-fit", "border-[#000]", "text-black", "bg-none")

			if(i !== 2){
				cell.classList.add("border-b-4")
			}

			if(j !== 2){
				cell.classList.add("border-r-4")
			}
			cell.addEventListener("click", (e) => setCell(e, TicTacToe))
			document.getElementById("main").append(cell)
		}
	}
}


function clearHistory() {
	players.map((item) => {
		const history = localStorage.removeItem(item.toLowerCase())
		document.getElementById(`${item.toLowerCase()}-win-counter`).textContent = `0`
	})
}

window.onload = function() {
	players.map((item) => {
		const history = localStorage.getItem(item.toLowerCase()) || 0
		document.getElementById(`${item.toLowerCase()}-win-counter`).textContent = `${history}`
	})
	populateBoard()
}

document.getElementById("game-over").addEventListener("click", restart)
document.getElementById("btn-offline").addEventListener("click", listener.modeHandlerText)
document.getElementById("btn-vs-ai").addEventListener("click", listener.modeHandlerText)
document.getElementById("btn-online").addEventListener("click", listener.modeHandlerText)
document.getElementById("btn-clear-history").addEventListener("click", clearHistory)
document.getElementById("btn-create-room").addEventListener("click", listener.handlerBtnLobby)
document.getElementById("btn-join-room").addEventListener("click", listener.handlerBtnLobby)
document.getElementById("btn-ready").addEventListener("click", listener.handlerBtnLobby)
document.getElementById("btn-exit").addEventListener("click", listener.handlerBtnLobby)