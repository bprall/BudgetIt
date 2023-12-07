const slides = [
  {image: "https://cdn.glitch.global/30912d47-6e52-415c-a8d9-2c320ed272ff/1604629742515.jfif?v=1701273589810",
   quote: '"Let\'s make good decisions"<br><br> &mdash; Andy Jung'},
  {image: "https://media.licdn.com/dms/image/D4E03AQFbGrNlhV3vOQ/profile-displayphoto-shrink_400_400/0/1701894420208?e=1707350400&v=beta&t=TW86FZM34SFXhqHlKaaSXb6_NA6H8M3oYd3aTmRUrP0",
   quote: '"Hey, don\'t buy that" <br><br> &mdash; Blake Prall'},
  {image: "https://cdn.glitch.global/30912d47-6e52-415c-a8d9-2c320ed272ff/IMG_8344.jpg?v=1701584504575",
  quote: '"Save money. Live better. Walmart." <br><br> &mdash; Immanuel Ochuko-Kivie'},
  {image: "https://media.licdn.com/dms/image/C4E03AQFmMnB8gkDt6Q/profile-displayphoto-shrink_200_200/0/1634930548034?e=2147483647&v=beta&t=PhCUqMHK1itrIL9UEQf3rimdH_ysiPuduOo_J6BAZnY",
  quote: '"Now I have so much money I use it as a mattress!" <br><br> &mdash; Dylan Leddy'}
]

var currentSlide = 0;

function changeSlide() { 
  currentSlide += 1
  
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  
  const slideContainer = document.getElementById('andy-container');
  const slideImage = document.getElementById('andy');
  const quoteElement = document.getElementById('andy-quote');
  
  const lastSlidePos = document.querySelector('.current-slide');
  const nextSlidePos = document.querySelector('#slide-pos-'+String(currentSlide));
  
  if (lastSlidePos !== null && nextSlidePos !== null) {
    lastSlidePos.classList.remove('current-slide');
    nextSlidePos.classList.add('current-slide');
  }

  slideImage.src = slides[currentSlide].image;
  quoteElement.innerHTML = slides[currentSlide].quote;

  slideContainer.classList.add('fade');
  setTimeout(() => {
      slideContainer.classList.remove('fade');
  }, 1000);
  
  setTimeout(changeSlide, 4000);
}

export default function renderHome() {
  var main = document.createElement('main');
  
  var andyContainer = document.createElement('div');
  andyContainer.id = 'andy-container';
  andyContainer.className = 'hidden';

  var andyImage = document.createElement('img');
  andyImage.id = 'andy';
  andyImage.className = 'hidden';
  andyImage.src = 'https://cdn.glitch.global/30912d47-6e52-415c-a8d9-2c320ed272ff/1604629742515.jfif?v=1701273589810';

  var andyQuote = document.createElement('p');
  andyQuote.id = 'andy-quote';
  andyQuote.className = 'hidden';
  andyQuote.innerHTML = '"Let\'s make good decisions" &mdash; Andy Jung';
  
  andyContainer.appendChild(andyImage);
  andyContainer.appendChild(andyQuote);
  
  var slidePositions = document.createElement('div');
  slidePositions.id = 'slide-positions';
  
  var pos1 = document.createElement('div');
  pos1.id = 'slide-pos-0';
  pos1.className = 'slide-position current-slide';
  slidePositions.appendChild(pos1);
  
  var pos2 = document.createElement('div');
  pos2.id = 'slide-pos-1';
  pos2.className = 'slide-position';
  slidePositions.appendChild(pos2);

  var pos3 = document.createElement('div');
  pos3.id = 'slide-pos-2';
  pos3.className = 'slide-position';
  slidePositions.appendChild(pos3);
  
  var pos4 = document.createElement('div');
  pos4.id = 'slide-pos-3';
  pos4.className = 'slide-position';
  slidePositions.appendChild(pos4);
  
  andyContainer.appendChild(slidePositions);
  main.appendChild(andyContainer);
  document.body.appendChild(main);
  changeSlide();
}