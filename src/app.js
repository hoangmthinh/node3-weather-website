const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//port to heroku
const port = process.env.PORT || 3000

//define path
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//set up handlebar & view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title:  'WeatherApp',
        name: 'thinhhm'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'thinhhm'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'thinhhm'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            err: 'You must provide an address'
        })
    }
     
    geocode(req.query.address, (err, {lat, long, location} = {}) => {
        if (err) {
            return res.send({err})
        }

        forecast(lat, long, (err, forecastData) => {
            if (err) {
                return res.send({err})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })

    })
    
    
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'thinhhm',
        error: 'Help not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'thinhhm',
        error: '404 page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
    
})