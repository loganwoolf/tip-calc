// define string constants
const ZERO = '0.00';

// define tip rates available on first 5 buttons, 6th will override custom field
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

// a function to pad a one or two digit number to 3 digits
function pad(str) {
	while (str.length < 3 ) {
		str = `0${str}`
	}
	return str;
}

// a function to determine which tip button is 
// checked and return its value from the rates array
function findRate() {
	for (let i in radioButtons) {
		if (radioButtons[i].checked) {
			return rates[i];
		}
	}
}

// main function to calculate all values
function calculate() {
	//pull current rate from array
	let currentRate = findRate();
	//check if required fields are filled
	if (billField.value && guestsField.value) {
		// calculate the required values
		let tipAmount = pad(String(parseInt((billField.value*100) * currentRate / guestsField.value)));
		let totalAmount = pad(String(parseInt((billField.value*100) * (1 + currentRate) / guestsField.value)));
		// display the values in the HTML elements
		tipDisplay.textContent = `${tipAmount.substr(0,tipAmount.length-2)}.${tipAmount.substr(-2)}`;
		totalDisplay.textContent = `${totalAmount.substr(0,totalAmount.length-2)}.${totalAmount.substr(-2)}`;
	}
}

// a function to reset all buttons, fields, and displays
function resetFields() {
	billField.value = null;
	guestsField.value = null;
	radioButtons.forEach(button => button.checked = false);
	customField.value = null;
	tipDisplay.textContent = ZERO;
	totalDisplay.textContent = ZERO;
}

//a function which attempts to disallow invalid inputs for a 2-decimal number
function checkPrice() { //still allows for inserting any character in existing string
	const regexPrice = /^\d+(\.\d{0,2})?$/g;
	const str = billField.value;
	//if the first character is a decimal, pad it with a zero
	if (str == '.') {
		billField.value = '0.';
		return;
	}
	//if an invalid character is entered, remove last character in the string
	if (!regexPrice.test(str)) {
		billField.value = str.substr(0, str.length - 1);
		calculate();
	}
}

//a function that attempts to disallow invalid inputs for a 2 digit number
function checkNumber() {
	const regexNumber = /^\d{0,2}$/;
	const field = guestsField.value;
	//if an invalid character is entered, remove last character in the string
	if (!regexNumber.test(field)) {
		guestsField.value = field.substr(0, field.length - 1);
		calculate();
	}
}

//a function that formats and pushes a value from the custom field to the rates array
function handleCustomInput() {
	let num = customField.value;
	radioButtons[5].checked = true;
	rates[5] = num/100;
	calculate();
}

//a function that applies a checked flag to the 6th radio button
function handleCustomClick() {
	radioButtons[5].checked = true;
	calculate();
}

//event listeners
billField.addEventListener('input', checkPrice);
billField.addEventListener('input', calculate);
radioButtons.forEach(button => button.addEventListener('click', calculate));
guestsField.addEventListener('input', checkNumber);
guestsField.addEventListener('input', calculate);
resetButton.addEventListener('click', resetFields);
customField.addEventListener('click', handleCustomClick);
customField.addEventListener('input', handleCustomInput);
