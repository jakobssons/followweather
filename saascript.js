const apiKey = 'Tf998b7e16f0647ffbd4f4cc8431563b5';

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${Vaasa}&appid=${Tf998b7e16f0647ffbd4f4cc8431563b5}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.weather[0].main;
  } catch (error) {
    console.error('Virhe haettaessa säätietoja:', error);
  }
}

async function setBackgroundByWeather(city) {
  const weather = await getWeatherData(city);

  let imageUrl = '';

  switch (weather) {
    // on aurinkoista
    case 'aurinko':
      imageUrl = 'aurinko.gif';
      break;

    // Sataa lunta
    case 'sataalunta':
      imageUrl = 'sataalunta';
      break;

    // Sataa vettä  
    case 'sataavetta':
      imageUrl = 'sataavetta.gif';
      break;

    // on yö
    case 'yo':
      imageUrl = 'yo.gif';
      break;

    // tuulinen
    case 'tuulee':
        imageUrl = 'tuulee.gif';
        break;

    default:
      imageUrl = 'default.gif'; // Oletus taustakuva
  }

  document.body.style.backgroundImage = `url(${imageUrl})`;
}

// Aseta kaupunki ja kutsu taustakuvan vaihtofunktiota
const city = 'Vaasa'; // Voit vaihtaa kaupungin nimen
setBackgroundByWeather(city);