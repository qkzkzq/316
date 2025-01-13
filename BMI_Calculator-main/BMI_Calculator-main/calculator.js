document.addEventListener('DOMContentLoaded', function () {
    // The DOMContentLoaded event ensures that the script runs only after the HTML document is fully loaded.
    // This is important as it prevents the script from running before the elements it needs to interact with are available.

    // DOM elements
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const metricSystem = document.querySelector('.stats');
    const topBMI = document.getElementById('top_bmi');
    const resultElement = document.getElementById('result');
    const idealBMI = document.getElementById('ideal_bmi_info');
    const welcome = document.getElementById('welcome');
    const welcomeMore = document.getElementById('welcome_more');
    
    // Explanation: The above lines are selecting HTML elements by their IDs or class names and storing them in variables.
    // These elements will be used later to display the user input, the BMI result, and recommendations.

    // BMI Class for calculations
    class BMI {
        #weight; // private variable to store weight
        #height; // private variable to store height

        constructor(weight, height) {
            this.#weight = weight; // initializes the weight
            this.#height = height; // initializes the height
        }

        // Metric BMI Calculation
        calculateMetric() {
            const meters = this.#height / 100; // Convert height from cm to meters
            const bmi = this.#weight / (meters * meters); // Calculate BMI using the formula: weight (kg) / height (m)^2
            const minBMI = 18.5 * (meters * meters); // Calculate the minimum healthy weight BMI for the height
            const maxBMI = 24.9 * (meters * meters); // Calculate the maximum healthy weight BMI for the height
            return { bmi, minBMI, maxBMI }; // Returns the calculated BMI, min BMI, and max BMI
        }

        // Getters for private variables
        getWeight() {
            return this.#weight; // Returns the current weight
        }

        getHeight() {
            return this.#height; // Returns the current height
        }

        // Setters for private variables
        setWeight(weight) {
            this.#weight = weight; // Updates the weight value
        }

        setHeight(height) {
            this.#height = height; // Updates the height value
        }
    }

    // Recommendations Class
    class Recommendations {
        static getRecommendations(bmi) {
            // The method is static because it does not rely on any instance data but is based on the BMI input
            let advice = {
                diet: '',
                exercise: '',
                waterIntake: '',
                calorieIntake: ''
            };

            // Provide recommendations based on BMI ranges
            if (bmi < 18.5) {
                advice.diet = "Focus on nutrient-dense foods like avocados, nuts, and whole grains to promote healthy weight gain.";
                advice.exercise = "Strength training exercises like weightlifting can help increase muscle mass.";
                advice.waterIntake = "Aim for at least 2.5 liters of water daily to stay hydrated.";
                advice.calorieIntake = "Increase your daily calorie intake with healthy, calorie-dense foods.";
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                advice.diet = "Maintain a balanced diet, focusing on lean proteins, whole grains, and plenty of fruits and vegetables.";
                advice.exercise = "Continue with regular physical activity, including both cardio and strength training, for overall health.";
                advice.waterIntake = "Aim for 2-2.5 liters of water per day.";
                advice.calorieIntake = "Maintain a moderate calorie intake to sustain your healthy weight.";
            } else if (bmi >= 25 && bmi <= 29.9) {
                advice.diet = "Reduce calorie-dense and processed foods, and focus on balanced meals with plenty of fiber and vegetables.";
                advice.exercise = "Incorporate regular cardiovascular exercises like walking, cycling, or swimming.";
                advice.waterIntake = "Stay hydrated with at least 2.5 liters of water daily.";
                advice.calorieIntake = "Consider reducing daily calorie intake and focusing on portion control.";
            } else {
                advice.diet = "Consult with a nutritionist to develop a calorie-reduced diet plan focused on nutrient-rich foods.";
                advice.exercise = "Engage in regular exercise, including walking, swimming, and strength training, to aid in weight loss.";
                advice.waterIntake = "Drink at least 3 liters of water daily to support metabolic functions.";
                advice.calorieIntake = "Monitor and reduce daily calorie intake, aiming for a calorie deficit for weight loss.";
            }

            return advice; // Returns the personalized advice based on BMI
        }
    }

// Event Listeners for inputs
heightInput.addEventListener('input', updateBMI);
weightInput.addEventListener('input', updateBMI);

// Reset results
function resetResults() {
    resultElement.innerText = ""; // Clears the BMI result text
    idealBMI.innerText = ""; // Clears the ideal BMI info text
    recommendationsSection.innerHTML = ""; // Clears the recommendations text
    welcome.style.display = "block"; // Makes the "Welcome!" message visible again
    welcomeMore.style.display = "block"; // Makes the "Enter your height and weight" message visible again
    topBMI.style.display = "none"; // Hides the top BMI section
    idealBMI.style.display = "none"; // Hides the ideal BMI section
    document.querySelector('.recommendations_output').style.display = "none"; // Hides recommendations section
}

// Update BMI based on the inputs
function updateBMI() {
    welcome.style.display = "none"; // Hides the welcome message when input is provided
    welcomeMore.style.display = "none"; // Hides the instruction message

    const height = parseFloat(heightInput.value); // Converts the height input to a float number
    const weight = parseFloat(weightInput.value); // Converts the weight input to a float number

    if (!isNaN(height) && !isNaN(weight)) { // Checks if both height and weight are valid numbers
        const bmiCalculator = new BMI(weight, height); // Creates a new BMI object with the user's height and weight
        const { bmi, minBMI, maxBMI } = bmiCalculator.calculateMetric(); // Calculates the BMI and ideal weight range
        displayResults(bmi, minBMI, maxBMI); // Displays the results on the webpage
        displayRecommendations(bmi); // Displays the recommendations based on BMI
    }
}

// Display Results in the UI
function displayResults(bmi, minBMI, maxBMI) {
    resultElement.innerText = bmi.toFixed(1); // Displays the BMI rounded to 1 decimal place

    let weightStatus; // Stores the weight status message

    // Determines the weight status based on BMI
    if (bmi < 18.5) {
        weightStatus = "You are underweight.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        weightStatus = "Congratulations! You have a healthy weight.";
    } else if (bmi >= 25 && bmi <= 29.9) {
        weightStatus = "You are overweight.";
    } else {
        weightStatus = "You are obese.";
    }

    // Display the weight status and ideal BMI range
    idealBMI.innerText = `${weightStatus} Your ideal weight is between ${minBMI.toFixed(1)} - ${maxBMI.toFixed(1)} kg.`;
    topBMI.style.display = "block"; // Makes the top BMI section visible
    idealBMI.style.display = "block"; // Makes the ideal BMI section visible
}

        // Event Listeners for inputs
    heightInput.addEventListener('input', updateBMI);
    weightInput.addEventListener('input', updateBMI);
    
    // Explanation: These event listeners trigger the `updateBMI` function whenever the user changes the height or weight input values.
    
    // Reset results
    function resetResults() {
        resultElement.innerText = ""; // Clears the BMI result text
        idealBMI.innerText = ""; // Clears the ideal BMI info text
        welcome.style.display = "block"; // Makes the "Welcome!" message visible again
        welcomeMore.style.display = "block"; // Makes the "Enter your height and weight" message visible again
        topBMI.style.display = "none"; // Hides the top BMI section
        idealBMI.style.display = "none"; // Hides the ideal BMI section
    }

 // Function to display personalized recommendations based on BMI
function displayRecommendations(bmi) {
    const recommendations = Recommendations.getRecommendations(bmi); // Get recommendations based on BMI

    // Get the recommendations section container
    const recommendationsSection = document.getElementById('recommendations_section');
    
    // Clear previous recommendations before appending new ones
    recommendationsSection.innerHTML = ''; 

    // Create a new <p> element for recommendations
    const recommendationsElement = document.createElement('p');
    recommendationsElement.innerText = `Diet: ${recommendations.diet} \nExercise: ${recommendations.exercise} \nWater Intake: ${recommendations.waterIntake} \nCalorie Intake: ${recommendations.calorieIntake}`;

    // Append the recommendations to the recommendations section
    recommendationsSection.appendChild(recommendationsElement);

    // Make sure the recommendations section is visible
    document.querySelector('.recommendations_output').style.display = "block";
}
});
