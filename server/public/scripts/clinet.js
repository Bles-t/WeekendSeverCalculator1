
console.log("Hello world");
let firstNumber;
let secondNumber;
let step = 0;
let operation;
let result = 0;

let calculatorData = {
  firstNumber: firstNumber,
  secondNumber: secondNumber,
  operation: operation,
  result: result
}

const userInput = document.getElementById("userInput");
let numArray = []
let secondNumArray = []

let display = document.getElementById('userInput')

function press(num) {
  if (step === 0 || step === 1) {
    numArray.push(num)
    step = 1
    firstNumber = Number(numArray.join(''))
    display.value = firstNumber
  }
  else if (step === 2) {
    secondNumArray.push(num)
    secondNumber = Number(secondNumArray.join(''))
    display.value = secondNumber
  }

  // userInput.value += num;
}

function getOperator(op) {
  console.log(op);
  step = 2
  operation = op
  userInput.value += op;
}

function erase() {
  display.value = 0
  firstNumber = null
  secondNumber = null
  step = 0
  operation = null
  result = 0
  numArray = []
  secondNumArray = []
  userInput.value = '';
}

const equal = () => {
  console.log('calculate here');
  if (operation === '+') {
    result = firstNumber + secondNumber
    display.value = result
  }
  else if (operation === '-') {
    result = firstNumber - secondNumber
    display.value = result
  }
  else if (operation === '*') {
    result = firstNumber * secondNumber
    display.value = result
  }
  else if (operation === '/') {
    result = firstNumber / secondNumber
    display.value = result
  }
  const postData = {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operation: operation,
    result: result
  }
  console.log("item first number", firstNumber);
  console.log("item result", result);

  axios.post('/calculatorData', postData).then((response) => {
    console.log(response);
    getItems()
  }).catch((error) => {
    console.log(error);
    alert('Something Went Wrong')
  })
}


function getItems() {
  axios.get('/calculatorData').then((response) => {
    console.log("success", response.data);
    let calculateSum = response.data
    renderToDom(calculateSum)
  }).catch((error) => {
    console.log(error);
    alert("Something Went Wrong")
  })
}

function renderToDom(calculateSum) {
  let calculatedTotal = document.querySelector('#calculatedTotal');
  calculatedTotal.innerHTML = '';
  for (let postData of calculateSum) {

    calculatedTotal.innerHTML += `
      <div>
           <p> Calculated Total: ${postData.firstNumber} ${operation} ${postData.secondNumber} </p>
         <br>
         <p> Result: ${postData.result} </p>
       </div>`
      ;


  }
}



