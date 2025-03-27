
let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function showSlides() {
    slideIndex = (slideIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}
setInterval(showSlides, 3000); 

// Change slide every 3 seconds

const visitedCities = [
    {
        "city": "Hamburg",
        "country": "Germany",
        "visitDate": "2023-06-15",
        "thumbnail": "https://live.staticflickr.com/65535/48447525277_ff7c3134dc_z.jpg",
        "story": " This is just a story for Hamburg:",
        "long":1, 
        "lat" :1
    },
    {
        "city": "Nairobi",
        "country": "Kenya",
        "visitDate": "2022-12-01",
        "thumbnail": "https://live.staticflickr.com/65535/49665369267_f64939290d_b.jpg",
        "story": " This is just a story for Nairobi",
        "long":1, 
        "lat" :1
    }, 
    {
        "city": "Shanghai",
        "country": "China",
        "visitDate": "2021-09-20",
        "thumbnail": "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg1OTcyNDQtaW1hZ2Uta3d2eGtubHEuanBn.jpg",
        "story": " This is just a stor for Shanghai",
        "long":1, 
        "lat" :1
    },
    {
        "city": "Vancouver",
        "country": "Canada",
        "visitDate": "2023-03-10",
        "thumbnail": "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJ2YW5jb3V2ZXJfY2FuYWRhXzE2ODQ0NjctaW1hZ2Uta3liY2ZldzQuanBn.jpg",
        "story": " This is just a story for Vancouver",
        "long":1, 
        "lat" :1
    },
  
];

// Function to display the cities
function displayCities(cities) {
    const cityListContainer = document.getElementById('city-list');
    
    cities.forEach(city => {
        const cityCard = document.createElement('div');
        cityCard.classList.add('city-card');
        cityCard.classList.add('col-sm-5');
        


        cityCard.innerHTML = `
            <img src="${city.thumbnail}" alt="${city.city} Thumbnail" class="city-thumbnail">
            <h3>${city.city}</h3>
            <p>${city.country}</p>
            <p class="visit-date">Visited on: ${city.visitDate}</p>
        `;
        cityCard.addEventListener('click', () => {
            // Your city story
            var  cityStoryCard = document.getElementById("city-story")
        cityStoryCard.innerHTML = `           
            <h3>${city.city}</h3>
            <p>${city.country}</p>
            <p class="visit-date">Visited on: ${city.visitDate}</p>
            <p> ${city.story}</p>
        `;

        //city map
     var cityMap = document.getElementById("city-map")
         cityMap.innerHTML = ``
        });

        cityListContainer.appendChild(cityCard);
    });
}

// Display cities when the page loads
window.onload = function() {
    displayCities(visitedCities);
};

// WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "YOUR API KEY";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){

    // WEATHER APP  const apiUrl = `https://api.openweathermap.

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

// google map logic


setTimeout(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoicmlzaGltd2UiLCJhIjoiY2xoczF4MTlkMDZ6djNmcWc3bHgxejA5bCJ9.tiz7vX9bKEgWPU7BLNCgMA';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 9 // starting zoom
        });    
    }, 500);