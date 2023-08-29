const players = ['O', 'X']
var gameOver = false
var step = 0
var currentPlayer = Math.floor(Math.random(players.length))
var board = [['','',''],['','',''],['','','']]

function checkWinner(step, board){
	let winner = null;
	let colorTheWinner = []
	for (let i = 0; i < 3; i++){
		if ((board[i][0] == board[i][1]) && (board[i][1] == board[i][2]) && board[i][0] != ''){
			winner = board[i][0]
			colorTheWinner = [[i,0], [i,1], [i,2]]
		}
		if ((board[0][i] == board[1][i]) && (board[1][i] == board[2][i]) && board[0][i] != ''){
			winner = board[0][i]
			colorTheWinner = [[0,i], [1,i], [2,i]]
		}
		if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && (board[0][0] != '')){
			winner = board[0][0]
			colorTheWinner = [[0,0], [1,1], [2,2]]
		}
		if ((board[2][0] == board[1][1]) && (board[1][1] == board[0][2]) && board[2][0] != ''){
			winner = board[2][0]
			colorTheWinner = [[2,0], [1,1], [0,2]]
		}
	}

	if (winner == null && step >= 9){
		step = 0
		gameOver = true
		return 'tie';
	} 

	if (winner) {
		step = 0
		gameOver = true
		return { winner, colorTheWinner }
	}
}

const game = {
	nextTurnAI: function (board) {
		const available = []
		for(let i = 0; i < 3; i++){
			for(let j = 0; j < 3; j++){
				if(board[i][j] === ''){
					available.push({i,j})
				}
			}
		}

		let move = available[Math.floor(Math.random()*available.length)]
		return move
	},
	nextTurnAI: function (board) {
		const available = []
		for(let i = 0; i < 3; i++){
			for(let j = 0; j < 3; j++){
				if(board[i][j] === ''){
					available.push({i,j})
				}
			}
		}

		let move = available[Math.floor(Math.random()*available.length)]
		return move
	},

	restart: function() {
		gameOver = false
		step = 0
		board = [['','',''],['','',''],['','','']]
		document.getElementById("game-over").style.display = "none"
		document.getElementById("main").innerHTML = ""
		populateBoard()
	}, 

	clearHistory: function() {
		players.map((item) => {
			const history = localStorage.removeItem(item.toLowerCase())
			document.getElementById(`${item.toLowerCase()}-win-counter`).textContent = `0`
		})
	},

	setCell: function(e) {
		var AIMode = false
		console.log(e.target, 'test')
		const getId = e.target.id.split(",").map((x) => parseInt(x))
		const x = getId[0]
		const y = getId[1]
		const occupied = board[x][y] === '' ? false : true
		if(gameOver || occupied) return
			board[x][y] = players[currentPlayer]
		e.target.innerText = players[currentPlayer]

		if(AIMode){
			currentPlayer = (currentPlayer + 1) % 2
			next = nextTurnAI(board)
			const idCellNext = document.getElementById(`${next.i},${next.j}`)
			board[next.i][next.j] = players[currentPlayer]
			idCellNext.innerText = players[currentPlayer]
			step++
		}

		currentPlayer = (currentPlayer + 1) % 2
		step++
		const result = checkWinner(step, board)

		if(result) { 
			document.getElementById("game-over").style.display = "block"
			if(result !== 'tie'){
				const res = result.winner.toLowerCase()
				const counterTag = `${res}-win-counter`
				const currentCount = document.getElementById(counterTag).innerText.split(" ")[0]
				const nextCount = parseInt(currentCount) + 1
				document.getElementById(counterTag).textContent = `${nextCount}`
				localStorage.setItem(res, nextCount)

				result.colorTheWinner.map((cell) => {
					const idCell = `${cell[0]},${cell[1]}`
					const getCell = document.getElementById(idCell)
					getCell.classList.replace("text-black", "text-rose-600")
					getCell.classList.replace("bg-none", "bg-blue-200")
				})
			}
		}
	}
}


export default game