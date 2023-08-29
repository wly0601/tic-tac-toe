export default class Board {
	constructor(board, players) {
		this.board = board
		this.players = players
		this.turn = 0
		this.gameOver = false
		this.winner = null
		this.step = 0
	}

	setCell(boardId) {
		const { x, y } = boardId
		const occupied = this.board[x][y] === '' ? false : true
		if(occupied || this.gameOver) return 

		this.board[x][y] = this.players[this.turn]
		this.step += 1
		this.turn = (this.turn + 1) % this.players.length
		return this.board
	}

	checkWinner() {
		let colorTheWinner = []
		let b = this.board
		for (let i = 0; i < 3; i++){
			let vert, hor, diag, antidiag
			vert = (b[i][0] == b[i][1]) && (b[i][1] == b[i][2]) && b[i][0] !== ""
			hor = (b[0][i] == b[1][i]) && (b[1][i] == b[2][i]) && b[0][i] !== ""
			diag = (b[0][0] == b[1][1]) && (b[1][1] == b[2][2]) && b[0][0] !== ""
			antidiag = (b[2][0] == b[1][1]) && (b[1][1] == b[0][2]) && b[2][0] !== ""

			if (vert){
				this.winner = b[i][0]
				colorTheWinner = [[i,0], [i,1], [i,2]]
			}
			if (hor){
				this.winner = b[0][i]
				colorTheWinner = [[0,i], [1,i], [2,i]]
			}
			if (diag){
				this.winner = b[0][0]
				colorTheWinner = [[0,0], [1,1], [2,2]]
			}
			if (antidiag){
				this.winner = b[2][0]
				colorTheWinner = [[2,0], [1,1], [0,2]]
			}
		}

		if (!this.winner && this.step >= 9){
			this.step = 0
			this.gameOver = true
			return 'tie';
		} 

		if (this.winner) {
			this.step = 0
			this.gameOver = true
			return { winner: this.winner, colorTheWinner }
		}
	}
}