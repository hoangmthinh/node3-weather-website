const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/8ea8160d880f556473ddec9bbd49ae93/'+lat+','+long

    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary);    
        }
    })
}

module.exports = forecast

// const https = require('https')

// const url = 'https://api.darksky.net/forecast/8ea8160d880f556473ddec9bbd49ae93/34.0544,-118.2439'

// const request = https.request(url, (res) => {
//     let data = ''
//     res.on('data', (chunk) => {
        
//         data = data + chunk.toString()
        
//     })

//     res.on('end', () => {
//         const body = JSON.parse(data)
//         console.log(body);
        
        
//     })

// })

// request.end()