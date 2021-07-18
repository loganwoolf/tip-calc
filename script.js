

// define tip rates available on buttons
const rates = [0.12, 0.15, 0.18, 0.20, 0.25];

// select input elements
const billField = document.getElementById('price');
const guestsField = document.getElementById('people')
const radioButtons = document.querySelectorAll('input[type=radio]');
const resetButton = document.querySelector('.reset');

//map and format rates to textContent of each button
rates.map((rate, i) => {
	radioButtons[i].labels[0].textContent = `${rate*100}%`
});

//select output elements
const tipDisplay = document.getElementById('tip');
const totalDisplay = document.getElementById('total');


function pad(str) {
	while (str.length < 3 ) {
		str = `0${str}`
	}
	return str;
}

function calculate() {
	let currentRate;
	//check if required fields are filled
	if (billField.value && guestsField.value) {
		currentRate = document
			.querySelector('input[name=amount]:checked')
			.labels[0]
			.textContent
			.slice(0,-1)
			/100;

		let tipAmount = pad(String(parseInt((billField.value*100) * currentRate / guestsField.value)));
		let totalAmount = pad(String(parseInt((billField.value*100) * (1 + currentRate) / guestsField.value)));

		tipDisplay.textContent = `${tipAmount.substr(0,tipAmount.length-2)}.${tipAmount.substr(-2)}`;
		totalDisplay.textContent = `${totalAmount.substr(0,totalAmount.length-2)}.${totalAmount.substr(-2)}`;
		console.log(`Tip Amount: ${tipAmount}`)
		console.log(`Total: ${totalAmount}`)
		console.log(currentRate);
	}
}

function resetFields() {
	const ZERO = '0.00';
	billField.value = null;
	guestsField.value = null;
	radioButtons.forEach(button => button.checked = false);
	tipDisplay.textContent = ZERO;
	totalDisplay.textContent = ZERO;
}

function checkPrice() { // not working with key held down
	const regexPrice = /^\d+(\.\d{0,2})?$/;
	let str = billField.value;
	console.log(str);
	if (!regexPrice.test(str)) {
		billField.value = str.substr(0, str.length - 1);
		calculate();
	}
}

billField.addEventListener('keyup', checkPrice);

billField.addEventListener('input', calculate);
guestsField.addEventListener('input', calculate);
radioButtons.forEach(button => button.addEventListener('click', calculate));
resetButton.addEventListener('click', resetFields);





