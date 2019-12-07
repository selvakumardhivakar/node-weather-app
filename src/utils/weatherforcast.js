const request = require("request")
const weatherForcast = (latitude, longitude, callback) => {
	const url =
		"https://api.darksky.net/forecast/fa728a748cbe9966769ffc90d998fe13/" +
		latitude +
		"," +
		longitude +
		"?units=si"
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect weather service!", undefined)
		} else if (body.error) {
			callback("Unable to find location!", undefined)
		} else {
			const temperature = body.currently.temperature
			const precipProbability = body.currently.precipProbability
			callback(
				undefined,
				body.daily.data[0].summary +
					" It's currently " +
					temperature +
					" deg out there!" +
					" And now there's " +
					precipProbability * 100 +
					"% possibility of rain!"
			)
		}
	})
}
module.exports = weatherForcast
