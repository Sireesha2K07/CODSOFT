let current    = '0';   
let previous   = '';    
let operator   = null;  
let freshResult = false; 
const resultEl     = document.getElementById('result');
const expressionEl = document.getElementById('expression');
function render() {
  resultEl.textContent = current;
  if (operator && previous !== '') {
    expressionEl.textContent = previous + ' ' + operator;
  } else {
    expressionEl.textContent = '';
  }
}
function inputDigit(d) {
  if (freshResult) {       
    current = d;
    freshResult = false;
  } else if (current === '0') {
    current = d;              
  } else {
    current += d;             
  }
  render();
}
function inputDecimal() {
  if (!current.includes('.')) current += '.';
  render();
}
function inputOperator(op) {
  if (operator && !freshResult) calculate(); 
  previous    = current;
  operator    = op;
  freshResult = true;
  render();
}
function calculate() {
  if (!operator || previous === '') return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;
  if (operator === '+') result = a + b;
  else if (operator === '−') result = a - b;
  else if (operator === '×') result = a * b;
  else if (operator === '÷') {
    if (b === 0) { current = 'Error'; operator = null; previous = ''; render(); return; }
    result = a / b;
  }
  expressionEl.textContent = previous + ' ' + operator + ' ' + current + ' =';
  current     = String(result);
  operator    = null;
  previous    = '';
  freshResult = true;
  render();
}
function clearAll() {
  current = '0'; previous = ''; operator = null; freshResult = false;
  render();
}
document.querySelectorAll('button').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const action = btn.dataset.action;
    const value  = btn.dataset.value;
    if (action === 'digit')    inputDigit(value);
    if (action === 'decimal')  inputDecimal();
    if (action === 'operator') inputOperator(value);
    if (action === 'equals')   calculate();
    if (action === 'clear')    clearAll();
    if (action === 'sign') {
      current = current.startsWith('-') ? current.slice(1) : '-' + current;
      render();
    }
    if (action === 'percent') {
      current = String(parseFloat(current) / 100);
      render();
    }

  });
});
render();