// API KEY
const API_KEY = '1b2b0a4654bbc4d9a014edde73eb083e';

// const _weather = document.getElementById('weather')
const _container = document.querySelector('.container')
const _spinner = document.querySelector('.loader')

const fetchData = position =>{
    const {latitude, longitude} = position.coords;
    
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response =>  response.json())
    .then(data => setWeatherData(data))

    _spinner.style.display = 'none';
    _container.style.display = "flex";

    // _weather.innerHTML += `<p>La temperatura es ${data}</p>`
    console.log(position)
}

const setWeatherData = data =>{
    console.log(data)
    const weatherData = {
        // weather: data.weather,
        location: data.name,
        descriptionDay: data.weather[0].main,
        temp: data.main.temp,
        // feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        data: getDate(),
}

    // _weather.innerHTML += `<p>Tu ciudad es ${weatherData.location} y la temperatura es ${weatherData.temp}</p>`
    // _weather.innerHTML += `<p>La Sensacion Termica es ${weatherData.feelsLike} y el cielo esta ${weatherData.descriptionDay}</p>`
    // _weather.innerHTML += `<p>La humedad es del ${weatherData.humidity}% y la presion atmosferica es ${weatherData.pressure} </p>`
    // console.log(weatherData.weather)
    // // console.log(weatherData)
    Object.keys(weatherData).forEach( key =>{
        document.getElementById(key).textContent = weatherData[key];
    });
}

const getDate = () =>{
    let date = new Date();
    return ` ${date.getDate()}-${('0' + (date.getMonth()+1)).slice(-2)}-${date.getFullYear()} `
    
}

const onLoad = () =>{
    navigator.geolocation.getCurrentPosition(fetchData);
}