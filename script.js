var board
const players = ['O', 'X']
var gameOver = false
var step = 0
var currentPlayer = Math.floor(Math.random(players.length))
var board = [['','',''],['','',''],['','','']]

window.onload = function() {
	populateBoard()
}

function restart() {
	gameOver = false
	step = 0
	board = [['','',''],['','',''],['','','']]
	document.getElementById("game-over").style.display = "none"
	document.getElementById("main").innerHTML = ""
	populateBoard()
}

function checkWinner(step, board){
	let winner = null;

	for (let i = 0; i < 3; i++){
		if ((board[i][0] == board[i][1]) && (board[i][1] == board[i][2]) && board[i][0] != ''){
			winner = board[i][0];
		}
		if ((board[0][i] == board[1][i]) && (board[1][i] == board[2][i]) && board[0][i] != ''){
			winner = board[0][i];
		}
		if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && (board[0][0] != '')){
			winner = board[0][0];
		}
		if ((board[2][0] == board[1][1]) && (board[1][1] == board[0][2]) && board[2][0] != ''){
			winner = board[2][0];
		}
	}

	if (winner == null && step === 9){
		step = 0
		gameOver = true
		return 'IMBANG!';
	} 

	if (winner) {
		step = 0
		gameOver = true
		return `${winner} MENANG!`
	}
}

function setCell() {
	const getId = this.id.split(",").map((x) => parseInt(x))
	const x = getId[0]
	const y = getId[1]
	const occupied = board[x][y] === '' ? false : true
	if(gameOver || occupied) return
		board[x][y] = players[currentPlayer]
	this.innerText = players[currentPlayer]
	currentPlayer = (currentPlayer + 1) % 2
	step++
	result = checkWinner(step, board)
	
	if(result) { 
		document.getElementById("game-over").style.display = "block"
	}
}

function populateBoard() {
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			let cell = document.createElement("div")
			cell.id = `${i.toString()},${j.toString()}`
			cell.classList.add("p-1", "items-center", "flex", "justify-center", "min-h-fit", "border-[#000]")

			if(i !== 2){
				cell.classList.add("border-b-4")
			}

			if(j !== 2){
				cell.classList.add("border-r-4")
			}

			cell.addEventListener("click", setCell)
			document.getElementById("main").append(cell)
		}
	}
}