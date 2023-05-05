let cardsUncovers = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer = false;
let numberTimer = 60;
let timeInit = 60;
let regressiveTime = null;

// Random Numbers
let showMovements = document.getElementById("movements");
let showHits = document.getElementById("hits");
let showTime = document.getElementById("time")

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,9,9,10,10];
numbers = numbers.sort(() => {return Math.random() - 0.5;});
console.log(numbers);

let resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);

function resetGame() {
  cardsUncovers = 0;
  card1 = null;
  card2 = null;
  firstResult = null;
  secondResult = null;
  movements = 0;
  hits = 0;
  timer = false;
  numberTimer = 60;
  timeInit = 60;
  clearInterval(regressiveTime);
  showMovements.innerHTML = "Movements: 0";
  showHits.innerHTML = "Hits: 0";
  showTime.innerHTML = "Time: 60 seconds";
  for (let i = 0; i <= 19; i++) {
    let resetCard = document.getElementById(i);
    resetCard.innerHTML = "";
    resetCard.disabled = false;
  }
}

function timeCount(){
  regressiveTime = setInterval(()=> {
    numberTimer--;
    showTime.innerHTML = `Time: ${numberTimer} seconds`;
    if(numberTimer == 0){
      clearInterval(regressiveTime);
      blockCards();
    }
  },1000);
}

function blockCards(){
  for(let i = 0; i <= 19; i++){
    let blockCard = document.getElementById(i);
    blockCard.innerHTML = numbers[i];
    blockCard.disabled = true;
  }
}

// Main Function
function uncover(id) {

  if(timer == false){
    timeCount();
    timer = true;
  }
  cardsUncovers++;
  console.log(cardsUncovers);

  if (cardsUncovers == 1) {
    //show first button
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = firstResult;

    // Disable first button
    card1.disabled = true;
  } else if (cardsUncovers == 2) {
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = secondResult;

    // Disable second button
    card2.disabled = true;

    // Increase movements
    movements++;
    showMovements.innerHTML = `Movements: ${movements}`;

    if(firstResult == secondResult){
      cardsUncovers = 0;
      // Show hits
      hits++;
      showHits.innerHTML = `Hits: ${hits}`;

      if(hits == 10){
        clearInterval(regressiveTime);
        showHits.innerHTML = `Hits: ${hits}`
        showTime.innerHTML = `Congratulations you finish in ${timeInit - numberTimer} seconds`
        showMovements.innerHTML = `Movements: ${movements}`
      }
    }else {
      setTimeout(() => {
        card1.innerHTML = ' ';
        card2.innerHTML = ' ';
        card1.disabled = false;
        card2.disabled = false;
        cardsUncovers = 0;
      },500);
    }
  }
}

// Get DOM elements
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const ampmEl = document.getElementById('ampm');
const weekdayEl = document.getElementById('weekday');
const dayEl = document.getElementById('day');
const monthEl = document.getElementById('month');
const yearEl = document.getElementById('year');

// Function to update current time on clock
function updateClock() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Determine AM or PM
  const ampm = hours < 12 ? 'AM' : 'PM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Add leading zeros to single-digit numbers
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Get weekday, day, month, and year
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Update DOM elements
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
  ampmEl.textContent = ampm;
  weekdayEl.textContent = weekday;
  dayEl.textContent = day;
  monthEl.textContent = month;
  yearEl.textContent = year;
}

// Run updateClock function every second
setInterval(updateClock, 1000);
