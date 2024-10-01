// Global Variables
let number1;
let number2;
let operator;
let displayNumber = '0'; // Initial display value
const output = document.getElementById('output'); // Output element for displaying numbers

// Function to speak the text
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1; // Adjust pitch if needed
    utterance.rate = 1.5; // Adjust rate if needed
    window.speechSynthesis.speak(utterance); // Speak the text
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
            } else {
                return a / b;
            }
        case "%":
            return a % b;
    }
}

// Display numbers and the initial 0 string
function displayResult(input) {
    output.textContent = input; // Update the displayed result
}
displayResult(displayNumber); // Show the initial value

// AC Button: Clear the display
const clearButton = document.querySelector('.clearButton');
clearButton.addEventListener('click', () => clearDisplay());

// Clear display function
function clearDisplay() {
    displayNumber = '0'; // Reset display number to '0'
    displayResult(displayNumber); // Update the display
}

// Handle digit and period button clicks
function digitBuilder(digitElement) {
    // Check if the clicked element is a period
    if (digitElement.innerText === '.') {
        // If display is '0', change it to '0.'
        if (displayNumber === '0') {
            displayNumber = '0.';
        } else if (!displayNumber.includes('.')) {
            displayNumber += '.'; // Add period if it does not already exist
        }
    } else {
        // If the display is '0', replace it with the clicked digit
        if (displayNumber === '0') {
            displayNumber = digitElement.innerText;
        } else {
            displayNumber += digitElement.innerText; // Concatenate clicked digit
        }
    }
    displayResult(displayNumber); // Update the display
}

// Add event listeners to digit buttons
let digits = document.querySelectorAll('.digit-builder');
digits.forEach(digitElement => {
    digitElement.addEventListener('click', () => digitBuilder(digitElement)); // Handle click
});

/*
1. When I press the button on the calculator the number is displayed on
 the display instead of 0
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