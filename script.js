const key ='80b42f8e53b81f545a7268529925647e'

function searchByCity(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
  .then(response => response.json())
  .then(data => console.log(data));
}
searchByCity('rome')


document.querySelector('.abs-lft').addEventListener('click',()=>{
  let menu = document.querySelector('.menu');
  menu.style.left = 0;
})
document.querySelector('.close').addEventListener('click',()=>{
  let menu = document.querySelector('.menu');
  menu.style.left = '-100%';
})

