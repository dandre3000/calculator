document.addEventListener('DOMContentLoaded', e => {
	const input = document.getElementById('calc-text');
	const output = document.getElementById('calc-output');
	const equal = document.getElementById('equal');
	const history = document.getElementById('history');
	
	// each calculator button appends the input text with its numeral/symbol
	[...document.getElementsByClassName('calc-btn')].forEach(btn => {
		btn.onclick = e => {
			input.value += btn.innerText;
			calculate();
		};
	});
	
	document.getElementById('backspace').onclick = e => {
		input.value = input.value.substring(0, input.value.length - 1);
		calculate();
	};
	
	document.getElementById('clear-history').onclick = e => {
		history.replaceChildren();
	};
	
	const appendHistory = () => {
		const el = document.createElement('button');
		el.className = 'list-group-item list-group-item-action';
		el.innerText = input.value + '=' + output.innerText;
		
		el.onclick = e => {
			const calc = el.innerText.split('=');
			input.value = calc[0];
			output.innerText = calc[1];
		};
		
		history.appendChild(el);
		output.innerText = input.value = '';
	};
	
	document.getElementById('equal').onclick = e => {
		if (output.innerText != 'NaN') {
			appendHistory();
		}
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