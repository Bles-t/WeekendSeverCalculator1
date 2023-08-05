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
  };

  axios.post('/calculatorData', postData)
    .then(() => {
      // After the server updates the calculatorData, retrieve the result
      axios.get('/calculatorData')
        .then((response) => {
          // Update the result in the DOM
          display.value = response.data.result;

          let calculatedTotal = document.querySelector('#calculatedTotal');
          calculatedTotal.innerHTML = `
<div>
    <p> Calculated Total: ${postData.firstNumber} ${operation} ${postData.secondNumber} = ${postData.result}</p>
  </div>
`;
        })
        .catch((error) => {
          console.log('Error retrieving calculator data:', error);
        });
    })
    .catch((error) => {
      console.log('Error updating calculator data:', error);
    });
};
