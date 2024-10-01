// Global Variables
let firstOperand;
let secondOperand;
let currentOperator;
let currentDisplayValue = '0'; // Initial display value
let operatorSet = false; // Track if an operator was set
let secondNumberSet = false;
let resultCalculated = false; // Track if a result was calculated
const digits = document.querySelectorAll('.digit-builder');
const output = document.getElementById('output');
const clearButton = document.querySelector('.clearButton');
const operatorButtons = document.querySelectorAll('.operatorButton');
const equalSign = document.querySelector('.equalSign');

// Function to speak the text
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.7;
    utterance.rate = 1.7;
    utterance.lang = 'ru-RU'; // Set the language to Russian
    window.speechSynthesis.speak(utterance);
}

// Function for all basic math operations
function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                speakText('Так низя, лопух.'); // Prevent division by zero
                return null;
            }
            return a / b;
        case "%":
            return a / 100; // Return percentage of a
        default:
            throw new Error("Invalid operator");
    }
}

// Function to update the display
function updateDisplay(value) {
    output.textContent = value.slice(0, 9); // Limit display to 9 characters
}

// Clear display function
function clearDisplay() {
    currentDisplayValue = '0'; // Reset display value
    updateDisplay(currentDisplayValue); // Update the display
    // Reset flags
    operatorSet = false;
    secondNumberSet = false;
    resultCalculated = false;
    firstOperand = undefined;
    secondOperand = undefined;
}

// Toggle the sign of the displayed number
function toggleSign() {
    if (currentDisplayValue !== '0') {
        currentDisplayValue = currentDisplayValue.startsWith('-') ?
            currentDisplayValue.slice(1) :
            '-' + currentDisplayValue;
    }
    updateDisplay(currentDisplayValue);
}

// Add a decimal point to the displayed number
function addDecimal() {
    if (currentDisplayValue === '0') {
        currentDisplayValue = '0.';
    } else if (!currentDisplayValue.includes('.')) {
        currentDisplayValue += '.'; // Add period if it does not already exist
    }
    updateDisplay(currentDisplayValue);
}

// Update the display number based on user input
function updateDisplayValue(digit) {
    if (resultCalculated) {
        currentDisplayValue = digit; // Start new operation if a digit is pressed after a result
        resultCalculated = false;
        firstOperand = undefined;
    } else {
        currentDisplayValue = (currentDisplayValue === '0') ? digit : currentDisplayValue + digit; // Concatenate clicked digit
    }
    updateDisplay(currentDisplayValue);
}

// Handle digit button clicks
function handleDigitInput(digitElement) {
    if (digitElement.innerText === '+/-') {
        toggleSign();
    } else if (digitElement.innerText === '.') {
        addDecimal();
    } else {
        updateDisplayValue(digitElement.innerText);
    }
}

// Handle percentage calculation
function handlePercentage() {
    firstOperand = parseFloat(currentDisplayValue);
    currentDisplayValue = (firstOperand / 100).toString(); // Calculate percentage
    updateDisplay(currentDisplayValue); // Display the result
    resultCalculated = true; // Set flag that result has been calculated
}

// Handle operator setting
function setOperator(operator) {
    if (resultCalculated) {
        firstOperand = parseFloat(currentDisplayValue);
        resultCalculated = false;
    } else if (!operatorSet) {
        firstOperand = parseFloat(currentDisplayValue);
    }

    currentOperator = operator;
    updateDisplay(currentDisplayValue);
    operatorSet = true;
    secondNumberSet = false;
}

// Main function to handle operator input
function handleOperatorInput(operator) {
    if (operator === "%") {
        handlePercentage(); // Handle percentage calculation
    } else {
        setOperator(operator); // Set the operator
    }
}

// Handle digit button clicks for the second operand
function handleDigitButtonClick(digitElement) {
    if (operatorSet && !secondNumberSet) {
        currentDisplayValue = digitElement.innerText;
        secondNumberSet = true;
        updateDisplay(currentDisplayValue);
    } else {
        handleDigitInput(digitElement);
    }

    if (operatorSet && secondNumberSet) {
        secondOperand = parseFloat(currentDisplayValue);
    }
}

// Function to handle the calculation result
function handleCalculationResult(result) {
    if (result !== null) {
        currentDisplayValue = result.toString(); // Convert the result to a string
        updateDisplay(currentDisplayValue);
    } else {
        updateDisplay('..........'); // Display an error message
        currentDisplayValue = '0'; // Reset the display number
    }
}

// Reset calculator state
function resetCalculatorState() {
    firstOperand = undefined;
    secondOperand = undefined;
    operatorSet = false;
    secondNumberSet = false;
    resultCalculated = true;
}

// Event listeners
clearButton.addEventListener('click', clearDisplay);

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        handleOperatorInput(button.innerText);
    });
});

digits.forEach(digitElement => {
    digitElement.addEventListener('click', function() {
        handleDigitButtonClick(digitElement);
    });
});

equalSign.addEventListener('click', function() {
    if (firstOperand !== undefined && secondOperand !== undefined && currentOperator) {
        const result = calculate(firstOperand, secondOperand, currentOperator);
        handleCalculationResult(result);
        firstOperand = result;
        resetCalculatorState();
    }
});
