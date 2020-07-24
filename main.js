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
	
	document.getElementById('backspace').onclick = e => {
		input.value = input.value.substring(0, input.value.length - 1);
	};

	// solve the equation given in the input text
	const calculate = () => {
		// use regex to clean input
		// remove whitespace
		// input must match an arithmethic equation without parenthesis
		const regexMatch = /^[-+]?[0-9]+([-+*/]+[-+]?[0-9]+)*$/.exec(input.value.replaceAll(' ', '')); // regex match array
		const cleanInput = regexMatch? regexMatch[0] : NaN; // default to NaN
		
		try {
			output.innerText = eval(cleanInput); // solve
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