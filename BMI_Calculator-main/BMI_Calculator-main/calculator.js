document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const heightFtInput = document.getElementById('height_ft');
    const heightInInput = document.getElementById('height_in');
    const weightStInput = document.getElementById('weight_st');
    const weightLbsInput = document.getElementById('weight_lbs');
    const metricRadio = document.getElementById('metric');
    const imperialRadio = document.getElementById('imperial');
    const metricSystem = document.querySelector('.stats');
    const imperialSystem = document.querySelector('.stats_imperial');
    const topBMI = document.getElementById('top_bmi');
    const resultElement = document.getElementById('result');
    const idealBMI = document.getElementById('ideal_bmi_info');
    const welcome = document.getElementById('welcome');
    const welcomeMore = document.getElementById('welcome_more');

    // BMI Class for calculations
    class BMI {
        constructor(weight, height, system) {
            this.weight = weight;
            this.height = height;
            this.system = system;
        }

        // Normal Constructor: Create a BMI instance from inputs
        static createFromSystem(system, inputs) {
            if (system === 'metric') {
                const { weight, height } = inputs;
                return new BMI(weight, height, system);
            } else if (system === 'imperial') {
                const { ft, in: inches, st, lbs } = inputs;
                return new BMI({ ft, in: inches }, { st, lbs }, system);
            }
            throw new Error('Invalid system type');
        }

        // Copy Constructor: Create a new BMI object from an existing one
        copy() {
            return new BMI(
                JSON.parse(JSON.stringify(this.weight)),
                JSON.parse(JSON.stringify(this.height)),
                this.system
            );
        }

        // Metric BMI Calculation
        calculateMetric() {
            const meters = this.height / 100;
            const bmi = this.weight / (meters * meters);
            const minBMI = 18.5 * (meters * meters);
            const maxBMI = 24.9 * (meters * meters);
            return { bmi, minBMI, maxBMI };
        }

        // Imperial BMI Calculation
        calculateImperial() {
            const imperFt = (this.height.ft * 30.48) / 100;
            const imperIn = (this.height.in * 2.54) / 100;
            const imperSt = this.weight.st * 6.35;
            const imperLbs = this.weight.lbs * 0.43;
            const imperW = imperSt + imperLbs;
            const imperH = imperFt + imperIn;
            const bmi = imperW / (imperH * imperH);
            const minBMI = 18.5 * (imperH * imperH) / 6.35;
            const maxBMI = 24.9 * (imperH * imperH) / 6.35;
            return { bmi, minBMI, maxBMI };
        }
    }

    // Event Listeners for inputs and radio buttons
    heightInput.addEventListener('input', updateBMI);
    weightInput.addEventListener('input', updateBMI);
    heightFtInput.addEventListener('input', updateBMI);
    heightInInput.addEventListener('input', updateBMI);
    weightStInput.addEventListener('input', updateBMI);
    weightLbsInput.addEventListener('input', updateBMI);

    metricRadio.addEventListener('change', function () {
        toggleSystems('metric');
    });

    imperialRadio.addEventListener('change', function () {
        toggleSystems('imperial');
    });

    // Toggle between Metric and Imperial Systems
    function toggleSystems(system) {
        if (system === 'metric') {
            metricSystem.style.display = 'flex';
            imperialSystem.style.display = 'none';
        } else {
            imperialSystem.style.display = 'grid';
            metricSystem.style.display = 'none';
        }
        resetResults();
    }

    // Reset results
    function resetResults() {
        resultElement.innerText = "";
        idealBMI.innerText = "";
        welcome.style.display = "block";
        welcomeMore.style.display = "block";
        topBMI.style.display = "none";
        idealBMI.style.display = "none";
    }

    // Update BMI based on the inputs
    function updateBMI() {
        welcome.style.display = "none";
        welcomeMore.style.display = "none";
        const system = metricRadio.checked ? 'metric' : 'imperial';
        let bmiCalculator;

        if (system === 'metric') {
            const height = parseFloat(heightInput.value);
            const weight = parseFloat(weightInput.value);
            if (!isNaN(height) && !isNaN(weight)) {
                bmiCalculator = BMI.createFromSystem('metric', { weight, height });
                const { bmi, minBMI, maxBMI } = bmiCalculator.calculateMetric();
                displayResults(bmi, minBMI, maxBMI);
            }
       /* } else if (system === 'imperial') {
            const heightFt = parseFloat(heightFtInput.value);
            const heightIn = parseFloat(heightInInput.value);
            const weightSt = parseFloat(weightStInput.value);
            const weightLbs = parseFloat(weightLbsInput.value);
            if (!isNaN(heightFt) && !isNaN(weightSt) && !isNaN(heightIn) && !isNaN(weightLbs)) {
                bmiCalculator = BMI.createFromSystem('imperial', {
                    ft: heightFt,
                    in: heightIn,
                    st: weightSt,
                    lbs: weightLbs,
                });
                const { bmi, minBMI, maxBMI } = bmiCalculator.calculateImperial();
                displayResults(bmi, minBMI, maxBMI);
            }*/
        }

        // Demonstration of the copy constructor
        if (bmiCalculator) {
            const copiedCalculator = bmiCalculator.copy();
            console.log('Original BMI Calculator:', bmiCalculator);
            console.log('Copied BMI Calculator:', copiedCalculator);
        }
    }

    // Display Results in the UI
    function displayResults(bmi, minBMI, maxBMI) {
        resultElement.innerText = bmi.toFixed(1);

        let weightStatus;
        let recommendations;

        if (bmi < 18.5) {
            weightStatus = "You are underweight.";
            recommendations = "Consider incorporating more calorie-dense foods and a balanced diet to gain healthy weight. Consult a nutritionist for personalized advice.";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            weightStatus = "Congratulations! You have a healthy weight.";
            recommendations = "Maintain your current lifestyle with a balanced diet and regular physical activity.";
        } else if (bmi >= 25 && bmi <= 29.9) {
            weightStatus = "You are overweight.";
            recommendations = "Engage in regular physical activity and monitor your calorie intake to manage your weight effectively.";
        } else {
            weightStatus = "You are obese.";
            recommendations = "Seek professional guidance to develop a comprehensive plan for weight loss and overall health improvement.";
        }

        idealBMI.innerText = `${weightStatus} Your ideal weight is between ${minBMI.toFixed(1)} - ${maxBMI.toFixed(1)} kg.`;
        const recommendationsElement = document.createElement('p');
        recommendationsElement.innerText = `Recommendations: ${recommendations}`;
        idealBMI.appendChild(recommendationsElement);

        topBMI.style.display = "block";
        idealBMI.style.display = "block";
    }
});
