const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMessage = document.querySelector('#location-m')
const forecastMessage = document.querySelector('#forecast-m')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    locationMessage.textContent = 'loading...'
    forecastMessage.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                locationMessage.textContent = data.err   
            } else {
                locationMessage.textContent = data.location
                forecastMessage.textContent = data.forecast
            }
        })
    })
    
})

