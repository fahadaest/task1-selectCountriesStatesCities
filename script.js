// class to load countries, fetch states and cities
class LocationDropdown {
    constructor(config) {
        this.config = config;
        this.countryDropdown = document.querySelector('.country');
        this.stateDropdown = document.querySelector('.state');
        this.cityDropdown = document.querySelector('.city');
    }

    // fetching list of countries from API
    loadCountries() {
        let api = this.config.url;
        fetch(api, { headers: { "X-CSCAPI-KEY": this.config.key } })
            .then(response => response.json())
            .then(data => {
                data.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.iso2;
                    option.textContent = country.name;
                    this.countryDropdown.appendChild(option);
                });
            });
    }

    // fetching list of states from api
    getStates() {
        const countryCode = this.countryDropdown.value;
        this.stateDropdown.innerHTML = '<option value="">Select State</option>';
        this.cityDropdown.innerHTML = '<option value="">Select City</option>';
        fetch(`${this.config.url}/${countryCode}/states`, { headers: { "X-CSCAPI-KEY": this.config.key } })
            .then(response => response.json())
            .then(data => {
                data.forEach(state => {
                    const option = document.createElement('option');
                    option.value = state.iso2;
                    option.textContent = state.name;
                    this.stateDropdown.appendChild(option);
                });
            });
    }

    // fetching cities from api
    getCities() {
        const countryCode = this.countryDropdown.value;
        const stateCode = this.stateDropdown.value;
        this.cityDropdown.innerHTML = '<option value="">Select City</option>';
        fetch(`${this.config.url}/${countryCode}/states/${stateCode}/cities`, { headers: { "X-CSCAPI-KEY": this.config.key } })
            .then(response => response.json())
            .then(data => {
                data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.iso2;
                    option.textContent = city.name;
                    this.cityDropdown.appendChild(option);
                });
            });
    }

    // method to initially load countries then fetching states and countries
    initialize() {
        this.loadCountries();
        this.countryDropdown.addEventListener('change', () => {
            this.getStates();
        });
        this.stateDropdown.addEventListener('change', () => {
            this.getCities();
        });
    }
}

// api url and key
const config = {
    url: 'https://api.countrystatecity.in/v1/countries',
    key: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

// new instance of locationDropdown class
const locationDropdown = new LocationDropdown(config);

// calling initialize method on load of window
window.onload = function () {
    locationDropdown.initialize();
};