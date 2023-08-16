let express = require('express');
let app = express();
const port = 5001
app.use(express.json())
app.use(express.static('server/public'));

// let calculatorData = {
//   firstNumber: firstNumber,
//   secondNumber: secondNumber,
//   operation: operation,
//   result: result
// }

let calculateArr = []


// POST request to update cal data
app.post('/calculatorData', (req, res) => {
  calculatorData = req.body;
  console.log('Updated calculator data:', calculatorData);
  calculateArr.push(calculatorData)
  res.sendStatus(200);
});

// GET request to retrieve calculator data
app.get('/calculatorData', (req, res) => {
  console.log('Sending calculator data:', calculatorData);
  res.json(calculateArr);
});

app.listen(port, function () {
  console.log('listening on port', port);
})
