document.addEventListener('DOMContentLoaded', e => {
	const input = document.getElementById('calc-input');
	const output = document.getElementById('calc-output');
	const equal = document.getElementById('calc-equal');
	const history = document.getElementById('calc-history');
	
	// each calculator button appends the input text with its numeral/symbol
	[...document.getElementsByClassName('calc-btn')].forEach(btn => {
		btn.onclick = e => {
			input.value += btn.innerText;
			calculate();
		};
	});
	
	document.getElementById('calc-backspace').onclick = e => {
		input.value = input.value.substring(0, input.value.length - 1);
		calculate();
	};
	
	document.getElementById('calc-clear').onclick = e => {
		input.value = '';
		output.innerText = NaN;
	};
	
	document.getElementById('calc-clear-history').onclick = e => {
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
	
	// const regexMatch = /^[-+]?[0-9]+([-+*/]+[-+]?[0-9]+)*$/.exec(input.value.replaceAll(' ', '')); // regex match array
	
	// solve the equation given in the input text and prevent code injection while using eval
	const calculate = () => {
		const str = input.value.replaceAll(' ', ''); // remove whitespace
		
		// validate characters
		for (let i = 0; i < str.length; i++) {
			const arithmetic = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '-', '+', '/', '*', '(', ')'];
			const ch = str[i];
			
			if (!arithmetic.includes(ch)) {
				throw new SyntaxError('invalid character');
			}
		}
		
		// solve
		try {
			const result = eval(str);
			output.innerText = result != undefined? result : 0;
		} catch (e) {
			output.innerText = NaN; // not an arithmetic equation
		}
	};
	
	// calculate everytime input is modified
	input.oninput = e => {
		calculate();
	};
	
	calculate();
});