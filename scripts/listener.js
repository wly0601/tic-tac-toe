const listener = {
	onGameOver: function(result) {
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
	},

	modeHandlerText: function(e) {
		const init = document.getElementById("btn-offline")
		init.classList.remove("bg-blue-800", "text-white")
		const states = ["offline", "vs-ai", "online"]

		document.getElementById("text-game-mode").innerText = e.target.innerText

		states.map((item) => {
			const sectionId = `${item}-settings`
			const buttonId = `btn-${item}`
			const buttonSelect = document.getElementById(buttonId)
			const sectionSelect = document.getElementById(sectionId)

			if(buttonId === e.target.id) {
				buttonSelect.classList.add("bg-blue-800", "text-white")
				sectionSelect.classList.remove("hidden")
			} else {
				buttonSelect.classList.remove("bg-blue-800", "text-white")
				sectionSelect.classList.add("hidden")
			}
		})
	},

	handlerBtnLobby: function(button) {
		const currentState = `btns-${button}`
		const states = ['btns-lobby', 'btns-in-game']
		const indexState = states.indexOf(currentState)
		const nextState = states[(indexState + 1) % states.length]

		document.getElementById(currentState).classList.add("hidden")
		document.getElementById(nextState).classList.remove("hidden")
	},

	setDifficultyText: function(button) {
		const diff = ['Baby', 'Easy', 'Medium', 'Hard', 'Impossible']
		const value = parseInt(document.getElementById("set-difficulty").value)
		document.getElementById("ai-difficulty").textContent = diff[value - 1]
	}
} 


export default listener