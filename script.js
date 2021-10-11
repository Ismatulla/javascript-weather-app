const api = {
    key:'3aa42c9a8e2af46dec424744990728a7',
    baseurl:'https://api.openweathermap.org/data/2.5/',
}
const searchBox = document.querySelector('.search-box')
searchBox.addEventListener('keypress',setQuery)

function setQuery(e){
if(e.keyCode===13){
    getResults(searchBox.value)
    searchBox.value = ''
    console.log(searchBox.value)
}
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(wheather=>{
        return wheather.json()
    })
    .then(displayResults).catch(()=>{
   
    })
}

function displayResults(weather){
    console.log(weather)
    let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.name}, ${weather.sys.country}`
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now)
    let temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`
    let weatherEl = document.querySelector('.weather')
    weatherEl.innerHTML = weather.weather[0].main
    let hilow = document.querySelector('.hi-low')
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
   
}

function dateBuilder(s){
    let months  = ['January','february','march','april','may','june','july','august','september','october','november','december']
    let days = ['Monday','Tuesday','wednesday','Thursday','Friday','Saturday','Sunday']
    let day = days[s.getDay()]
    let date = s.getDate()
    let month = months[s.getMonth()]
    let year = s.getFullYear()

    return `${day} ${date} ${month} ${year}`
}