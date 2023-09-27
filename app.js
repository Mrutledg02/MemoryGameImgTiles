document.addEventListener("DOMContentLoaded", function(){

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard () {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    
  } else {
    //second click
    hasFlippedCard = false;
    secondCard = this;
    
    checkForMatch();
    }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard;
}

function unflipCards() {
  lockBoard = true;

  //not a match
  setTimeout(() => {
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');

  lockBoard = false;
  }, 1500);
}

function resetBoard() {
  [hasflipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card=> {
    let randomPos = Math.floor(Math.random() * 25);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

});