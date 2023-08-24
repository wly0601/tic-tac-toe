function modeHandlerText(button) {
	init = document.getElementById("btn-offline")
	init.classList.remove("bg-blue-800", "text-white")
	const buttons = ["btn-offline", "btn-vs-ai", "btn-online"]

	document.getElementById("text-game-mode").innerText = button.innerText
	buttons.map((item) => {
		buttonSelect = document.getElementById(item)
		console.log(buttonSelect)
		if(item === button.id) {
			buttonSelect.classList.add("bg-blue-800", "text-white")
		} else {
			buttonSelect.classList.remove("bg-blue-800", "text-white")
		}
	})
}