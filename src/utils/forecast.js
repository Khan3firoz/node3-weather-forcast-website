const request = require('request')

const forecast = (latitude, longitutde, callback) => {
    const url2 = "http://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(longitutde) +"&lon="+ encodeURIComponent(latitude) + "&appid=04ddc42ea251e397d88a312713207d15&units=metric"
    request({ url: url2, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect......', undefined)
        } else if (body.length === 0) {
            callback('unaable to find', undefined)
        }
        else {
            callback(undefined,' It is currently ' + body.main.temp + ' degress out. There is a ' + body.clouds.all + '% chance of rain.')

        }

    })
}
module.exports = forecast