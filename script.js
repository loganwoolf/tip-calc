const ZERO = '0.00';

// define tip rates available on buttons
const rates = [0.12, 0.15, 0.18, 0.20, 0.25];

// select input elements
const billField = document.getElementById('price');
const guestsField = document.getElementById('people');
const radioButtons = document.querySelectorAll('input[type=radio]');
const customField = document.getElementById('custom-amount');
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

function findRate() {
	for (let i in radioButtons) {
		if (radioButtons[i].checked) {
			return rates[i];
		}
	}
}

function calculate() {
	let currentRate = findRate();
	//check if required fields are filled
	if (billField.value && guestsField.value) {
		// replace this section to read rate from rates array
		// currentRate = document
		// 	.querySelector('input[name=amount]:checked')
		// 	.labels[0]
		// 	.textContent
		// 	.slice(0,-1)
		// 	/100;
		

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
	billField.value = null;
	guestsField.value = null;
	radioButtons.forEach(button => button.checked = false);
	tipDisplay.textContent = ZERO;
	totalDisplay.textContent = ZERO;
}

function checkPrice() { //still allows for inserting any character in existing string
	const regexPrice = /^\d+(\.\d{0,2})?$/g;
	const str = billField.value;
	if (str == '.') {
		billField.value = '0.';
		return;
	}
	if (!regexPrice.test(str)) {
		billField.value = str.substr(0, str.length - 1);
		calculate();
	}
}

function checkNumber() {
	const regexNumber = /^\d{0,2}$/;
	const field = guestsField.value;
	console.log(field);
	if (!regexNumber.test(field)) {
		guestsField.value = field.substr(0, field.length - 1);
		calculate();
	}
}

function handleCustomInput() {
	let num = customField.value;
	radioButtons[5].checked = true;
	console.log(num);
	rates[5] = num/100;
	console.log(rates);
	calculate();
}

function handleCustomClick() {
	radioButtons[5].checked = true;
	calculate();
}

billField.addEventListener('input', checkPrice);
billField.addEventListener('input', calculate);
radioButtons.forEach(button => button.addEventListener('click', calculate));
guestsField.addEventListener('input', checkNumber);
guestsField.addEventListener('input', calculate);
resetButton.addEventListener('click', resetFields);
customField.addEventListener('click', handleCustomClick);
customField.addEventListener('input', handleCustomInput);




