// Global Variables
let number1;
let number2;
let operator;
let displayNumber = '0'; // Initial display value
const digits = document.querySelectorAll('.digit-builder');
const output = document.getElementById('output'); // Output element for displaying numbers
const clearButton = document.querySelector('.clearButton');

// Function to speak the text
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1.5;
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
                speakText('Not today, chump'); // Prevent division by zero
                return null;
            }
            return a / b;
        case "%":
            return a % b;
        default:
            throw new Error("Invalid operator");
    }
}

// Main functions:
function displayResult(input) {
    output.textContent = input; // Update the displayed result in output div
}
displayResult(displayNumber); // Display the starting 0 of the calculator.

// Update and limit the display to 9 digits
function limitDisplayDigits() {
    displayResult(displayNumber.slice(0, 9));
}

// Clear display function for the AC button
function clearDisplay() {
    displayNumber = '0'; // Reset display number to '0'
    displayResult(displayNumber); // Update the display
}

// Toggle the sign of the displayed number
function toggleSign() {
    if (displayNumber !== '0') {
        displayNumber = displayNumber.startsWith('-') ?
            displayNumber.slice(1) :
            '-' + displayNumber; // Toggle the sign
    }
    limitDisplayDigits(); // Update the display
}

// Add a period for displayed number
function addPeriod() {
    if (displayNumber === '0') {
        displayNumber = '0.';
    } else if (!displayNumber.includes('.')) {
        displayNumber += '.'; // Add period if it does not already exist
    }
    limitDisplayDigits();
}

// Update the display number based on user input
function updateDisplayNumber(digit) {
    displayNumber = (displayNumber === '0') ? digit : displayNumber + digit; // Concatenate clicked digit
    limitDisplayDigits(); // Update and limit the number on display to 9 digits
}

// Handle digit button clicks
function digitBuilder(digitElement) {
    if (digitElement.innerText === '+/-') {
        toggleSign();
    } else if (digitElement.innerText === '.') {
        addPeriod();
    } else {
        updateDisplayNumber(digitElement.innerText);
    }
}

// Event listeners
digits.forEach(digitElement => {
    digitElement.addEventListener('click', () => digitBuilder(digitElement)); // Handle click
});
clearButton.addEventListener('click', clearDisplay);



/*
1. When I press the button on the calculator the number is displayed on
 the display instead of 0. Done.
2. After I press on the operator button it remains visually pressed.
the first number on the display is assigned to number1 and operator
is assigned to operator
3.When I press the second number the first number dissapears from the display
the second number takes its place there, also the operator no longer visually
 pressed
*After I press = the second number dissapears it is assigned to number2
 and calculation function is initiated
* the result is displayed on the screen
* if I press another operator the number on the display(previous result)
 will be assigned as number1
 */

// Display numbers and initial 0 string.