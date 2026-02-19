const displayText = document.querySelector("#displayText");
const operations = document.querySelectorAll("#operators button");
const buttonFunctions = document.querySelectorAll("#functions button");
const zeroButton = document.querySelector("#zero");
const displayHistory = document.querySelector("#history p");
const numButtons = document.querySelectorAll("#numbers button");
const dot = document.querySelector("#dot");

let firstNum = "";
let secondNum = "";
let operation = ""
let total = "";

const usableNumbers = ["1","2","3","4","5","6","7","8","9"];
const usuableOperations = ["/", "*", "-", "+", "Enter"];
//booleans
let getSecondNum = false;
let gotTotal = false;




// Operation functions
function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    return a / b;
};

function operate(num1,num2,func){
    return func(num1, num2)
};

function switchOperation(operation){
    switch(operation){
        case "+":
            total = operate(Number(firstNum), Number(secondNum), add);         
            break;
        case "-":
            total = operate(Number(firstNum), Number(secondNum), subtract);
            break;
        case "*":
            total = operate(Number(firstNum), Number(secondNum), multiply);
            break;
        case '/':
            total = operate(Number(firstNum), Number(secondNum), divide)
            break;
    }
    gotTotal = true;
    operation ="";
    total = Math.round(total * 100) / 100
};

function allClearFunc() {
    gotTotal = false
    firstNum = "";
    secondNum = "";
    getSecondNum = false;
    displayText.textContent = "0";
    displayHistory.textContent = "";
};

function deleteNumber() {
    if(getSecondNum) {
        secondNum = secondNum.replace(secondNum[secondNum.length-1], '');
        displayText.textContent = secondNum;
        console.log(secondNum)
    }
    else{
        firstNum = firstNum.replace(firstNum[firstNum.length-1], '');
        displayText.textContent = firstNum;
        console.log(firstNum)
    }
}

function placeDot() {
    if(gotTotal === true){
        allClearFunc();
        firstNum = ".";
        displayText.textContent = firstNum;
    }
    else if(getSecondNum && (secondNum === "" || !secondNum.includes("."))){
        secondNum += ".";
        displayText.textContent = secondNum;
    }
    else if(firstNum === "" || firstNum.includes(".") === false){
        console.log(firstNum.includes("."))
        firstNum += ".";
        displayText.textContent = firstNum;
    }
};

function placeNumber(num) {
    if(gotTotal === true && operation === ""){
        allClearFunc();
        firstNum = String(Number(num));
        displayText.textContent = firstNum;
    }
    else if(!getSecondNum){
        firstNum += String(Number(num));
        displayText.textContent = firstNum;
    }
    else if(getSecondNum){
        secondNum += String(Number(num));
        displayText.textContent = secondNum;
    }
    
}

function placeOperation(operator) {
    if((operator != "Enter") && firstNum === ""){
        firstNum = "0"
        getSecondNum = true;
        gotTotal = false;
        displayHistory.textContent = `${firstNum} ${operation}`;
    }
    else if((operator === "Enter") && firstNum != "" && secondNum != "") {
        switchOperation(operation)
        displayHistory.textContent =`${firstNum} ${operation} ${secondNum} = `
        secondNum = ""
        firstNum = String(total)
        displayText.textContent = total
        operation = ""
        
    }
    else if (secondNum != "") {
        switchOperation(operation)
        secondNum = ""
        firstNum = String(total)
        displayText.textContent = total
        operation = operator
        displayHistory.textContent = ` ${firstNum} ${operation}`
    }
    else if(operator != "Enter") {
        operation = operator;
        console.log(operation);
        getSecondNum = true;
        gotTotal = false;
        displayHistory.textContent = `${firstNum} ${operation} `;
    }
}

//Calculate numbers 
operations.forEach((operator) => operator.addEventListener('click', () => placeOperation(operator.id)));


//Get first number and second number
numButtons.forEach((num) => num.addEventListener('click', () => placeNumber(num.textContent)));
document.addEventListener("keydown", key => {
    if (usuableOperations.includes(key.key)){
        placeOperation(key.key)
    }
    else if (usableNumbers.includes(key.key)){
        placeNumber(key.key);
    }
    else if(key.key === "."){
        placeDot();
    }
    else if(key.key === "Backspace"){
        deleteNumber();
    }
});


zeroButton.addEventListener('click', () => {
    if(gotTotal === true && operation === false){
        allClearFunc();
        firstNum = String(Number(zeroButton.textContent));;
        displayText.textContent = firstNum;
    }
    else if(!getSecondNum && firstNum != ""){
        firstNum += String(Number(zeroButton.textContent));
        displayText.textContent = firstNum;
    }
    else if(getSecondNum && secondNum != ""){
        secondNum += String(Number(zeroButton.textContent));
        displayText.textContent = secondNum;
    }
})
    
//All clear, Clear and delete logic
buttonFunctions.forEach((button) => button.addEventListener('click', () => {
    if(gotTotal === true){
        allClearFunc();
    }
    else{
        switch(button.id){
            case "allclear":
                allClearFunc();
                break;
            case "clear":
                getSecondNum ? secondNum = "" : firstNum = "";
                displayText.textContent = "0";
                break;
            case "delete":
                deleteNumber();
                break;
        }  
    }

})) 
    
// dot button logic

dot.addEventListener('click', () => placeDot());

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}



