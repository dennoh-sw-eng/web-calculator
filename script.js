let displayValue = '';

function appendToDisplay(value) {
    displayValue += value;
    updateDisplay();
}

function calculateResult() {
    try {
        const result = eval(displayValue);
        displayValue = String(result);
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function clearDisplay() {
    displayValue = '';
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.value = displayValue;
}

function calculateMortgage() {
        const loanAmount = parseFloat(document.getElementById("loanAmount").value);
        const interestRate = parseFloat(document.getElementById("interestRate").value);
        const loanTerm = parseInt(document.getElementById("loanTerm").value);

        // Check if all the inputs are valid
        if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
            document.getElementById("mortgageResult").innerText = "Please enter valid values for all fields.";
            return;
        }

        const monthlyInterest = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        const mortgage = loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

        document.getElementById("mortgageResult").innerText = `Monthly Mortgage Payment: $${mortgage.toFixed(2)}`;
    }
    function calculateInterestRate() {
        const principalAmount = parseFloat(document.getElementById("principal").value);
        const interestAmount = parseFloat(document.getElementById("interest").value);
        const timeInYears = parseFloat(document.getElementById("time").value);

        // Check if all the inputs are valid
        if (isNaN(principalAmount) || isNaN(interestAmount) || isNaN(timeInYears)) {
            document.getElementById("interestRateResult").innerText = "Please enter valid values for all fields.";
            return;
        }

        const interestRate = (interestAmount / (principalAmount * timeInYears)) * 100;

        document.getElementById("interestRateResult").innerText = `Interest Rate: ${interestRate.toFixed(2)}%`;
    }

    function calculateStatistics() {
        const dataInput = document.getElementById("data").value;
        const selectedOperations = Array.from(document.getElementById("operations").selectedOptions).map(option => option.value);
    
        const data = dataInput.split(",").map(Number);
        
        let resultText = "";
    
        if (selectedOperations.includes("mean")) {
            const mean = calculateMean(data);
            resultText += `Mean: ${mean.toFixed(2)}<br>`;
        }
    
        if (selectedOperations.includes("median")) {
            const median = calculateMedian(data);
            resultText += `Median: ${median}<br>`;
        }
    
        if (selectedOperations.includes("standardDeviation")) {
            const standardDeviation = calculateStandardDeviation(data);
            resultText += `Standard Deviation: ${standardDeviation.toFixed(2)}<br>`;
        }
    
        document.getElementById("result").innerHTML = resultText;
    }
    
    function calculateMean(data) {
        const sum = data.reduce((acc, val) => acc + val, 0);
        return sum / data.length;
    }
    
    function calculateMedian(data) {
        const sortedData = data.slice().sort((a, b) => a - b);
        const middle = Math.floor(sortedData.length / 2);
        
        if (sortedData.length % 2 === 0) {
            return (sortedData[middle - 1] + sortedData[middle]) / 2;
        } else {
            return sortedData[middle];
        }
    }
    
    function calculateStandardDeviation(data) {
        const mean = calculateMean(data);
        const squaredDifferences = data.map(val => (val - mean) ** 2);
        const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / data.length;
        return Math.sqrt(variance);
    }

    function solveQuadraticEquation(equation) {
        const regex = /([-+]?\s*\d*)x\^2\s*([-+]?\s*\d*)x\s*([-+]?\s*\d*)\s*=\s*0/;
        const coefficients = equation.match(regex);

        if (!coefficients || coefficients.length !== 4) {
            return "Invalid quadratic equation format. Please provide the equation in the form 'ax^2 + bx + c = 0'";
        }

        const a = parseInt(coefficients[1], 10);
        const b = parseInt(coefficients[2].replace(/\s+/g, ""), 10);
        const c = parseInt(coefficients[3].replace(/\s+/g, ""), 10);

        const discriminant = b * b - 4 * a * c;

        if (discriminant < 0) {
            return "No real roots";
        } else if (discriminant === 0) {
            const x = -b / (2 * a);
            return [x];
        } else {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            return [x1, x2];
        }
    }

    function solveQuadratic() {
        const input = document.getElementById("equation").value;
        const resultDiv = document.getElementById("resultx");
        const roots = solveQuadraticEquation(input);

        if (Array.isArray(roots)) {
            resultDiv.innerText = "Roots: " + roots.join(", ");
        } else {
            resultDiv.innerText = roots; // Display error message
        }
    }
    function calculateBMI() {
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
    
        if (isNaN(weight) || isNaN(height) || height <= 0) {
            document.getElementById("bmiResult").innerText = "Please enter valid weight and height.";
            return;
        }
    
        const bmi = weight / (height * height);
        const bmiCategory = getBMICategory(bmi);
    
        document.getElementById("bmiResult").innerText = `Your BMI: ${bmi.toFixed(2)}\nCategory: ${bmiCategory}`;
    }
    
    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return "Normal Weight";
        } else if (bmi >= 25 && bmi < 29.9) {
            return "Overweight";
        } else {
            return "Obese";
        }
    }
    function calculateGPA() {
        const gradesInput = document.getElementById("grades").value;
        const creditsInput = document.getElementById("credits").value;
    
        const grades = gradesInput.split(",").map(parseFloat);
        const credits = creditsInput.split(",").map(parseFloat);
    
        if (grades.length !== credits.length) {
            document.getElementById("gpaResult").innerText = "Please enter the same number of grades and credits.";
            return;
        }
    
        let totalCredits = 0;
        let totalGradePoints = 0;
    
        for (let i = 0; i < grades.length; i++) {
            if (isNaN(grades[i]) || isNaN(credits[i]) || grades[i] < 0 || grades[i] > 4 || credits[i] <= 0) {
                document.getElementById("gpaResult").innerText = "Please enter valid grades (0 to 4) and positive credits.";
                return;
            }
    
            totalCredits += credits[i];
            totalGradePoints += grades[i] * credits[i];
        }
    
        const gpa = totalGradePoints / totalCredits;
        document.getElementById("gpaResult").innerText = `Your GPA is: ${gpa.toFixed(2)}`;
    }
    document.addEventListener('DOMContentLoaded', function () {
        const whatsappButton = document.getElementById('whatsappButton');
        whatsappButton.addEventListener('click', function () {
            window.open('https://assignmenthelpers.online/', '_blank');
        });
    });