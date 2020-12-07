const request = require('request')
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2hhbjNmaXJveiIsImEiOiJja2k5YTE1eHEwZHM3MnNsYzd6ZXVnb2N1In0.tI8ouRA0ys1X8k6VW_tYww&limit=1"
    request({url, json: true }, (error,{body}) => {

        if (error) {
            callback('Unable to connect......', undefined)
        } else if (body.features.length === 0) {
            callback('unaable to find', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitutde: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode