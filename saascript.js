const apiKey = 'f998b7e16f0647ffbd4f4cc8431563b5';

function createDateWithOffset(epoch, offset) {
  const d = new Date()
  const date = new Date ((epoch + offset + d.getTimezoneOffset()*60) * 1000)
  return date
} 

async function getWeatherData(locationName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    //  Poimitaan tarpeelliset säätiedot
    const weatherData = {locationName: data.name, temperature: data.main.temp, timestamp: createDateWithOffset(data.dt, data.timezone), description: data.weather[0].main};
    return weatherData;
  } catch (error) {
    console.error('Virhe haettaessa säätietoja', error);
  }
}

function searchWeather() {
  const searchInput = document.getElementById('searchInput');
  const location = searchInput.value.trim();

  if (location !== '') {
    setWeather(location);
    searchInput.value = ''; // Tyhjentää hakupalkin!
  } else {
    alert('Syötä sijainnin nimi ensin!');
  }
}

    //  Muutetaan kelvinit oikeaksi yksiköksi
function kelvinToCelsius(kelvin){
  return kelvin - 272.15;
}

   // Taustakuvat
async function setWeather(city) {
  const weatherData = await getWeatherData(city);
  let imageUrl = '';

  switch (weatherData.description) {
    // on aurinkoista
    case 'Clear':
      imageUrl = 'aurinko.gif';
      break;

    // Sataa lunta
    case 'Snow':
      imageUrl = 'sataalunta.gif';
      break;

    // Sataa vettä  
    case 'Rain':
      imageUrl = 'sataavetta.gif';
      break;

    // tuulinen
    case 'Wind':
        imageUrl = 'tuulee.gif';
        break;

    //  Defaultit taustat jos mikään aiempi case ei osu
    //  Valitaan tausta kellonajan mukaan  
    default:
      if (weatherData.timestamp.getHours() > 8 && weatherData.timestamp.getHours() < 20){
        imageUrl = 'default.gif';
      } else {
        imageUrl = 'yo.gif';
      }
  }

  // Renderöidään uudet säätiedot

  document.body.style.backgroundImage = `url(${imageUrl})`;

  const locationName = document.getElementById("locationName");
  const locationTemperature = document.getElementById("locationTemperature");
  const weatherDescription = document.getElementById("weatherDescription");
  const weatherTimestamp = document.getElementById("weatherTimestamp");
  
  locationName.textContent = weatherData.locationName;
  locationTemperature.textContent = `${kelvinToCelsius(weatherData.temperature).toFixed(1)} °C`;
  weatherDescription.textContent = weatherData.description;
  weatherTimestamp.textContent = weatherData.timestamp.toLocaleTimeString("fi-Fi", {hour: "2-digit", minute: "2-digit"} );

}

//  Enterin toimivuus
function handleSubmit(e){
  e.preventDefault()
  searchWeather()
};

// Aseta kaupunki ja kutsu taustakuvan vaihtofunktiota
const defaultCity = 'Vaasa';
setWeather(defaultCity);
