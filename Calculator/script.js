// Get the display element
const display = document.getElementById('display');

// Function to speak the text
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1; // Adjust pitch if needed
    utterance.rate = 1.5; // Adjust rate if needed
    window.speechSynthesis.speak(utterance);
}


function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case '-':
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                speakText('Nice try meatbag. Gonna put some dirt in your eye?')
                return null;
            } else{
                return a / b;
            }
        case "%":
            return a % b;
    }
}

console.log(calculate(9, 0, '/'));