const weatherForm = document.querySelector("form")
const address = document.querySelector("input")
const locationResult = document.querySelector("#location")
const forcastResult = document.querySelector("#forcast")
document.addEventListener("submit", (e) => {
	e.preventDefault()
	locationResult.textContent = "Loading ..."
	forcastResult.textContent = ""
	fetch("http://localhost:3000/weather?address=" + address.value).then(
		(res) => {
			res.json().then((data) => {
				if (data.error) {
					locationResult.textContent = data.error
				} else {
					locationResult.textContent = "Location: " + data.location
					forcastResult.textContent = "Weather: " + data.forcastdata
				}
			})
		}
	)
})
