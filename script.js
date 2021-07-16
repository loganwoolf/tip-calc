

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

//select output elements
const tipDisplay = document.getElementById('tip');
const totalDisplay = document.getElementById('total');

function pad(str) { // not yet working
	if (str.length < 3) {
		str = `0${str}`;
		pad();
	}
	return str;
}

console.log(pad('a'));

function calculate() {
	let currentRate;
	if (billField.value && guestsField.value) {
		currentRate = document
			.querySelector('input[name=amount]:checked')
			.labels[0]
			.textContent
			.slice(0,-1)
			/100;
		let tipAmount = String(parseInt((billField.value*100) * currentRate / guestsField.value));
		pad(tipAmount);

		tipDisplay.textContent = `${tipAmount.substr(0,tipAmount.length-2)}.${tipAmount.substr(-2)}`;
		let totalAmount = String(parseInt((billField.value*100) * (1 + currentRate) / guestsField.value));
		totalDisplay.textContent = `${totalAmount.substr(0,totalAmount.length-2)}.${totalAmount.substr(-2)}`;
		console.log(`Tip Amount: ${tipAmount}`)
		console.log(`Total: ${totalAmount}`)
		console.log(currentRate);
	}
}


billField.addEventListener('input', calculate);
guestsField.addEventListener('input', calculate);
radioButtons.forEach(button => button.addEventListener('click', calculate));




