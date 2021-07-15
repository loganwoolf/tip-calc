

// define tip rates available on buttons
const rates = [0.12, 0.15, 0.18, 0.20, 0.25];
// let currentRate;

// select input elements
const billField = document.getElementById('price');
const guestsField = document.getElementById('people')
const radioButtons = document.querySelectorAll('input[type=radio]');

//map and format rates to textContent of each button
rates.map((rate, i) => {
	radioButtons[i].labels[0].textContent = `${rate*100}%`
});

function calculate() {
	let currentRate;
	if (billField.value && guestsField.value) {
		currentRate = document
			.querySelector('input[name=amount]:checked')
			.labels[0]
			.textContent
			.slice(0,-1)
			/100;
		let tipAmount = parseInt((billField.value*100) * currentRate / guestsField.value)/100;
		let totalAmount = parseInt((billField.value*100) * (1 + currentRate) / guestsField.value)/100;
		console.log(`Tip Amount: ${tipAmount}`)
		console.log(`Total: ${totalAmount}`)
		console.log(currentRate);
	}
}


billField.addEventListener('input', calculate);
guestsField.addEventListener('input', calculate);
radioButtons.forEach(button => button.addEventListener('click', calculate));




