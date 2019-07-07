//Variables

const rps = document.getElementById('rps-choose');
let rpsDynamicNumber;
let rpsSavedNumber;
let rpsResults = [];
let playerName;
const addName = document.getElementById('rsp-names');
const inputs = document.getElementsByClassName('player-name');
let playerResult;
const displayResults= document.getElementById('rsp-results');
let dynamicNameList = [];
let nameList=[];
let winnerList = [];
let submitName;
let continueGame;
let savedName;
let roundCounter;
let rpsWinners = [];
let losersArray;

//Save number of players

let rpsNumber = () => {
	let rpsNumberValue = document.getElementById('rps-number').selectedIndex;
	rpsDynamicNumber =document.getElementsByClassName('number-of-players')[rpsNumberValue].value;
	rpsSavedNumber = rpsDynamicNumber;
	return rpsDynamicNumber;
}

//Promtp for names

let addInput = () => {
	
	for (let i = 0; i < rpsDynamicNumber; i++){
		playerName = document.createElement("input");
		playerName.setAttribute("type", "text");
		playerName.setAttribute("name", "player-name");
		playerName.setAttribute("class", "player-name");
		playerName.setAttribute("id", "player-name" + i);
		playerName.setAttribute("placeholder", "Име на участник");
		playerName.setAttribute("value", "Играч " + (i + 1));
		addName.appendChild(playerName);
	}
 
	submitName = document.createElement("button");
	submitName.setAttribute("id", "submit-name");
	let buttonText = document.createTextNode("Започни игра");
	submitName.appendChild(buttonText);
	addName.appendChild(submitName);

	continueGame = document.createElement("button");
	continueGame.setAttribute("id", "continue-game");
	continueGame.setAttribute("class", "hidden");
	let buttonTextContinue = document.createTextNode("Продължи");
	continueGame.appendChild(buttonTextContinue);
	addName.appendChild(continueGame);
}

//Remove input fields

let removeInput = () => {
	while(inputs.length > 0){
		inputs[0].parentNode.removeChild(inputs[0]);
	}
	submitName.remove();
}


// Randomizer

let random = () => {
	let randomNumber = Math.floor(Math.random() * (4-1) + 1)
	rpsResults.push(randomNumber);
	console.log(rpsResults);
}

let rpsRandomizer = (x) => {
	for(let i = 0; i < x; i++){
		random();
	}
}

let domBuilder = (textToAppend, divCLassX, divClassZ, divToAppendTo) => {
	let x = document.createElement("div");
	x.setAttribute("class", divCLassX)
	let y = document.createElement("div");
	y.append(textToAppend);
	x.append(y);
	let z = document.createElement("div");
	z.setAttribute("class", divClassZ);
	x.append(z);
	divToAppendTo.append(x);
}

let printResult = (x) => {

	if (rpsResults[x] === 1){
		domBuilder(dynamicNameList[x] + " избра ", "player-results", "rock", displayResults);
	
	} else if (rpsResults[x] === 2){
		domBuilder(dynamicNameList[x] + " избра ", "player-results", "scissors", displayResults);
		
	} else {
		domBuilder(dynamicNameList[x] + " избра ", "player-results", "paper", displayResults);
	}
}

let printWinners = (arr) => {
	let rpsPlaces;
	arr.forEach((e) => {
		rpsPlaces = document.createElement('p');
		rpsPlaces.setAttribute('class', 'rps-places');
		displayResults.appendChild(rpsPlaces);
		rpsPlaces.append(document.createTextNode(e + " е на " + (arr.indexOf(e) + 1) + " място"));
	});
	continueGame.classList.toggle('hidden');
}


//Logical operator

let findWinner = () => {

	while (dynamicNameList.length != 1){
		let roundParagraph = document.createElement("p");
		roundParagraph.append(document.createTextNode("Рунд " + roundCounter))
		displayResults.append(roundParagraph);


		if(rpsResults.includes(1) && rpsResults.includes(2) && rpsResults.includes(3)){
			for (let i = 0; i < rpsDynamicNumber; i++){
				printResult(i);
			}
			rpsResults= [];
			roundCounter++
		}

		else{
			let i = 0;
			rpsResults.forEach((e) => {
				e === 1? rpsResults.includes(3)? printResult(i)
												: (printResult(i), winnerList.push(dynamicNameList[i])) 
				:e ===2? rpsResults.includes(1)? printResult(i) 
												: (printResult(i), winnerList.push(dynamicNameList[i])) 
				:rpsResults.includes(2)? printResult(i) 
												: (printResult(i), winnerList.push(dynamicNameList[i])) 
				i++
			})
			dynamicNameList = winnerList;
			roundCounter++	
		} 
		
		rpsDynamicNumber = dynamicNameList.length;
		rpsResults= [];
		winnerList = [];
		rpsRandomizer(rpsDynamicNumber); 
	}

	if(dynamicNameList.length === 1){
		domBuilder(dynamicNameList[0] + " печели", "winning-player", "winner", displayResults);
		rpsResults = [];		
	}
}

let keepOnPlaying = (arr) => {
	let index = arr.indexOf(dynamicNameList[0]);
	let rpsWinner = arr.splice(index, 1);
	rpsWinners.push(rpsWinner);
}

//Onclick

rps.onclick = () => {

	while(displayResults.firstChild){
		displayResults.removeChild(displayResults.firstChild);
		continueGame.remove();
	}

	rpsNumber();

	if(inputs.length>0){
		removeInput();
		addInput();
	}

	else{
		
		addInput();
	}

	//Submmit and save names to array

	let submitNames = document.getElementById('submit-name');
	submitNames.onclick = () => {
		roundCounter = 1;
		displayResults.innerHTML = '';
		dynamicNameList = [];
		for(let i = 0; i < rpsSavedNumber; i++){
			savedName = document.getElementById("player-name" + i).value;
			dynamicNameList.push(savedName);
		}
		continueGame.classList.toggle('hidden');
		nameList = dynamicNameList;
		rpsDynamicNumber = rpsSavedNumber;

		//randomize results
		rpsRandomizer(rpsDynamicNumber);

		//logical operator
		findWinner();

		//Continue game

		losersArray = nameList;

		rpsWinners = [];
	
		continueGame.onclick = () => {

			while(displayResults.firstChild){
				displayResults.removeChild(displayResults.firstChild);
			}

			keepOnPlaying(losersArray);
			
			if(losersArray.length == 1){
				rpsWinners.push(losersArray[0]);
				printWinners(rpsWinners);
			}
			
			else {
				rpsDynamicNumber = losersArray.length;

				rpsRandomizer(rpsDynamicNumber);

				dynamicNameList = losersArray;

				findWinner();
			}
		}
	}
} 