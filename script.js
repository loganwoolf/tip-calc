

// define tip rates available on buttons
const rates = [0.08, 0.12, 0.15, 0.18, 0.25];

// select input elements
const billField = document.getElementById('price');
const guestsField = document.getElementById('people')
const buttons = document.querySelectorAll('.button-label');

//map and format rates to textContent of each button
rates.map((rate, i) => {
	buttons[i].textContent = `${rate*100}%`
});





