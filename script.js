const key ='80b42f8e53b81f545a7268529925647e'




document.querySelector('.abs-lft').addEventListener('click',()=>{
  let menu = document.querySelector('.menu');
  menu.style.left = 0;
})
document.querySelector('.close').addEventListener('click',()=>{
  let menu = document.querySelector('.menu');
  menu.style.left = '-100%';
})

