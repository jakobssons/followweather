const apiKey = 'Tf998b7e16f0647ffbd4f4cc8431563b5';

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={Tf998b7e16f0647ffbd4f4cc8431563b5}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.weather[0].main;
  } catch (error) {
    console.error('Virhe haettaessa säätietoja:', error);
  }
}

function searchWeather() {
  const searchInput = document.getElementById('searchInput');
  const location = searchInput.value.trim();

  if (location !== '') {
    setBackgroundByWeather(location);
    searchInput.value = ''; // Tyhjentää hakupalkin!
  } else {
    alert('Syötä sijainnin nimi ensin!');
  }
}

async function setBackgroundByWeather(city) {
  const weather = await getWeatherData(city);

  let imageUrl = '';

  switch (weather) {
    // on aurinkoista
    case 'Clear':
      imageUrl = 'aurinko.gif';
      break;

    // Sataa lunta
    case 'Snow':
      imageUrl = 'sataalunta';
      break;

    // Sataa vettä  
    case 'Rain':
      imageUrl = 'sataavetta.gif';
      break;

    // on yö
    case 'Night':
      imageUrl = 'yo.gif';
      break;

    // tuulinen
    case 'Wind':
        imageUrl = 'tuulee.gif';
        break;

    default:
      imageUrl = 'default.gif'; // Oletus taustakuva
  }

  document.body.style.backgroundImage = `url(${imageUrl})`;
}

// Aseta kaupunki ja kutsu taustakuvan vaihtofunktiota
const defaultCity = 'Vaasa';
setBackgroundByWeather(defaultCity);