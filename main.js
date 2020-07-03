document.addEventListener('DOMContentLoaded', e => {
	const input = document.querySelector('#calc-text');
	const output = document.querySelector('#calc-output');
	
	// each calculator button appends the input text with its numeral/symbol
	[...document.getElementsByClassName('calc-btn')].forEach(num => {
		num.onclick = e => {
			input.value += num.innerText;
			calculate();
		};
	});

	// solve the equation given in the input text
	// will replace eval with regex
	const calculate = () => {
		try {
			output.innerText = eval(input.value.replaceAll(' ', '')) || NaN; // remove whitespace
		} catch (e) {
			output.innerText = NaN;
		}
	};
	
	// calculate everytime input is modified
	input.oninput = e => {
		calculate();
	};
	
	calculate();
});