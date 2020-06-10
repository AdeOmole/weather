// DOM Manipulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
    // destructure properties
    const {cityDets: cityDetails, weather } = data;

    // update template details
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    // update the night and day svg images
    const iconSource = `https://cdn.jsdelivr.net/gh/AdeOmole/weather/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSource);

    let timerSource = weather.IsDayTime ? 'https://cdn.jsdelivr.net/gh/AdeOmole/weather/day.svg' : 'https://cdn.jsdelivr.net/gh/AdeOmole/weather/night.svg';

    // let timerSource = null;
    // if(weather.IsDayTime){
    //     timerSource = 'img/day.svg';
    // }else{
    //     timerSource = 'img/night.svg';
    // };
    time.setAttribute('src', timerSource);


    // remove the d-none if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };
};


cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update UI with new city
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city') !== null){
    const lastUsed = localStorage.getItem('city');
    forecast.updateCity(lastUsed)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
