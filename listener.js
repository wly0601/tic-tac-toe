function modeHandlerText(button) {
	init = document.getElementById("btn-offline")
	init.classList.remove("bg-blue-800", "text-white")
	const states = ["offline", "vs-ai", "online"]
	
	document.getElementById("text-game-mode").innerText = button.innerText
	
	states.map((item) => {
		const sectionId = `${item}-settings`
		const buttonId = `btn-${item}`
		buttonSelect = document.getElementById(buttonId)
		sectionSelect = document.getElementById(sectionId)
		
		if(buttonId === button.id) {
			buttonSelect.classList.add("bg-blue-800", "text-white")
			sectionSelect.classList.remove("hidden")
		} else {
			buttonSelect.classList.remove("bg-blue-800", "text-white")
			sectionSelect.classList.add("hidden")
		}
	})
}

function handlerBtnLobby(button) {
	const currentState = `btns-${button}`
	const states = ['btns-lobby', 'btns-in-game']
	const indexState = states.indexOf(currentState)
	const nextState = states[(indexState + 1) % states.length]

	document.getElementById(currentState).classList.add("hidden")
	document.getElementById(nextState).classList.remove("hidden")
}