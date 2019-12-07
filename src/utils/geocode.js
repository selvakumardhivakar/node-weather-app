const request = require("request")

const geoCode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1IjoiZGhpdmFrYXItcyIsImEiOiJjazNwZ3prMDUwMDNhM2VwNjZiZHR0MjVpIn0.u357zTlJXt5ipDso-PJ7NA&limit=1"
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect weather service! ", undefined)
		} else if (body.features.length === 0) {
			callback(
				"Unable to find this location. Try another search!",
				undefined
			)
		} else {
			const latitude = body.features[0].center[1]
			const longitude = body.features[0].center[0]
			const location = body.features[0].place_name
			callback(undefined, {
				latitude,
				longitude,
				location
			})
		}
	})
}

module.exports = geoCode
