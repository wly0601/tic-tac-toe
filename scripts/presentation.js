import Game from "./game.js"

const board = [['','',''],['','',''],['','','']]
const players = ['O', 'X']

function restart() {
	document.getElementById("game-over").style.display = "none"
	document.getElementById("main").textContent = ""
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

const presentation = {
	populateBoard: function(TicTacToe) {
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
}

