var config = {
    url: 'https://api.countrystatecity.in/v1/countries',
    key: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}

var countryDropdown = document.querySelector('.country');
var stateDropdown = document.querySelector('.state');
var cityDropdown = document.querySelector('.city');

function loadCountries() {
    let api = config.url
    fetch(api, {headers: {"X-CSCAPI-KEY": config.key}})
    .then(Response => Response.json())
    .then(data => {
        data.forEach(country => {
            const option = document.createElement('option')
            option.value = country.iso2
            option.textContent = country.name 
            countryDropdown.appendChild(option)
        })
    })
}

function getStates() {
    const countryCode = countryDropdown.value
    stateDropdown.innerHTML = '<option value="">Select State</option>' // for clearing the existing states
    cityDropdown.innerHTML = '<option value="">Select City</option>' // Clear existing city options
    fetch(`${config.url}/${countryCode}/states`, {headers: {"X-CSCAPI-KEY": config.key}})
    .then(response => response.json())
    .then(data => {
        data.forEach(state => {
            const option = document.createElement('option')
            option.value = state.iso2
            option.textContent = state.name 
            stateDropdown.appendChild(option)
        })
    })
}

function getCities() {
    const countryCode = countryDropdown.value
    const stateCode = stateDropdown.value
    cityDropdown.innerHTML = '<option value="">Select City</option>' 
    fetch(`${config.url}/${countryCode}/states/${stateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.key}})
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            const option = document.createElement('option')
            option.value = city.iso2
            option.textContent = city.name 
            cityDropdown.appendChild(option)
        })
    })
}

window.onload = loadCountries