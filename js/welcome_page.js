//Varialbles

const diceImage = document.getElementById("dice-img");
const rpsImage = document.getElementById("rps-img");

const diceSection = document.getElementById("dice-section");
const rpsSection = document.getElementById("rps-section");

const welcomeText = document.getElementById("welcome-text");

const headerName=document.getElementById("header-name");

const diceClear = document.getElementById("dice-results");
const rpsNamesClear = document.getElementById("rsp-names")
const rpsResultsClear = document.getElementById("rsp-results");

//Toggle "hidden"

let toggleHidden = (clicked, otherGame, welcomeInfo) => {
    if (otherGame.classList.contains("hidden") == false){
        otherGame.classList.toggle("hidden");
    }
    if (welcomeInfo.classList.contains("hidden") == false){
        welcomeInfo.classList.toggle("hidden");
    }
    if (clicked.classList.contains("hidden") == false && otherGame.classList.contains("hidden") && welcomeInfo.classList.contains("hidden")){
        welcomeInfo.classList.toggle("hidden");
    }
    clicked.classList.toggle("hidden")
}

//Clear results

let clearResults = (...inactiveGame) => {
    inactiveGame.forEach((e) => {
        while(e.firstChild){
            e.removeChild(e.firstChild);
        }
    })
}

diceImage.onclick = () => {
    toggleHidden(diceSection, rpsSection, welcomeText);
    clearResults(rpsNamesClear, rpsResultsClear);
}

rpsImage.onclick = () => {
    toggleHidden(rpsSection, diceSection, welcomeText);
    clearResults(diceClear);
}

headerName.onclick = () => {
    if (welcomeText.classList.contains("hidden")){
        welcomeText.classList.toggle("hidden");
    }
    rpsSection.classList.add("hidden");
    diceSection.classList.add("hidden");
    clearResults(diceClear, rpsNamesClear, rpsResultsClear)
}