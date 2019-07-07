//Variables

let savedType;
let savedNumber;
const rollDice = document.getElementById('choose-dice');
let diceResults = [];
const diceDisplayResults = document.getElementById('dice-results');
let dicePlayerResult;

//Save number of dice

let chooseNumber = function() {
	let numberValue = document.getElementById('dice-number').selectedIndex;
	savedNumber = document.getElementsByClassName('number-of-dice')[numberValue].value;
	return savedNumber;
}

//Save type of die

let chooseType = function() {
	let typeValue = document.getElementById('dice-type').selectedIndex;
	savedType = document.getElementsByClassName('type-of-die')[typeValue].value;
	return savedType;
}

//Pick a number

let randomizer = function() {
		let randomNumber = Math.floor(Math.random() * savedType + 1);
		diceResults.push(randomNumber);
		console.log(diceResults);
		return diceResults;
	}


//Display results

let diceDivs = (x) => {
	let diceDiv = document.createElement('div');
	diceDiv.setAttribute('id', 'dice-result' + x);
	diceDiv.setAttribute("class", "dice-div");
	diceDisplayResults.appendChild(diceDiv);
}

let dicePrintResults = (x) =>{
	dicePlayerResult = document.createElement('img');
	let y = document.getElementById('dice-result' + x);
	switch(diceResults[x]){
		case 1:
		dicePlayerResult.setAttribute('src', 'images/dice/one.gif' +"?a="+Math.random());
		y.appendChild(dicePlayerResult);
		break;

		case 2:
		dicePlayerResult.setAttribute('src', 'images/dice/two.gif' +"?a="+Math.random());
		y.appendChild(dicePlayerResult);
		break;

		case 3:
		dicePlayerResult.setAttribute('src', 'images/dice/three.gif' +"?a="+Math.random());
		y.appendChild(dicePlayerResult);
		break;

		case 4:
		dicePlayerResult.setAttribute('src', 'images/dice/four.gif' +"?a="+Math.random());
		y.appendChild(dicePlayerResult);
		break;

		case 5:
		dicePlayerResult.setAttribute('src', 'images/dice/five.gif' +"?a="+Math.random());
		y.appendChild(dicePlayerResult);
		break;

		case 6:
		dicePlayerResult.setAttribute('src', 'images/dice/six.gif' +"?a="+Math.random());
		y.appendChild(dicePlayerResult);
		break;
	}
}

//Onclick

rollDice.onclick = function() {

	
	while(diceDisplayResults.firstChild){
		diceDisplayResults.removeChild(diceDisplayResults.firstChild);
	}

	chooseNumber();
	chooseType();
	for(let i = 0; i < savedNumber; i++){
		randomizer();
		diceDivs(i);
		dicePrintResults(i);
	}
	diceResults = [];
} 
