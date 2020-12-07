const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const { publicDecrypt } = require('crypto')
// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlerbars engin and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        title1: 'Created by firoz',
        name: 'Firoz khan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        title1: 'Created by firoz',
        name: 'Firoz khan'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is helpful text',
        title: 'help',
        title1: 'Created by firoz',
        name: 'Firoz khan'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitutde, location }={ }) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitutde, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
}

)
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search tearm"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
// console.log(products)
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404!',
        name: 'Firoz',
        errorMessage: 'help artical  not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404!',
        name: 'Firoz',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('server is up on the port 3000.')
})