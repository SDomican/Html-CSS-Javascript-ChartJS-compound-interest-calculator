var ctx = document.getElementById('myChart');

function calculateSavings(savings) {
    console.log("calculateSavings savings value: " + savings);
    let savingsData = new Map();
    let totalSavings = 0;
    for (let i = 0; i < 10; i++) {
        let year = 2020 + i;
        totalSavings += parseInt(savings);
        console.log("total Savings: " + totalSavings);
        savingsData.set(year, totalSavings);
    }
    //console.log("savingsData: " + JSON.stringify(savingsData));
    return savingsData;
}

let testMap = new Map();
testMap = calculateSavings(0);
let savingsArray = [];
let yearArray = [];

//Adds values from map to an array.
for (let value of testMap.values()) {
    //console.log("Pushing savings of " + value);
    savingsArray.push(value);
}

//add keys from map(years) to an array
for (let key of testMap.keys()) {
    //console.log("Pushing year of " + key);
    yearArray.push(key);
}

console.log("Initial year array: " + yearArray);


var myChart = new Chart(ctx, {
    //type: 'bar',
    type: "line",
    data: {
        labels: yearArray,
        datasets: [{
            label: 'Base Savings',
            data: savingsArray
        },{
            label: 'Income plus interest',
            //backgroundColor: "rgb(0,200,0)",
            borderColor: "rgb(255,0,0)",
            data: savingsArray
        }
        ,{
            label: 'Expenses',
            //backgroundColor: "rgb(0,200,0)",
            borderColor: "rgb(0,99,0)",
            data: savingsArray
        }
        ,{
            label: 'Interest',
            //backgroundColor: "rgb(0,200,0)",
            borderColor: "rgb(255,255,0)",
            data: savingsArray
        }
    
    ]
    },
});


function updateChart() {
    let savings = parseInt(document.getElementById("numberTest").value);
    console.log("Savings update: " + savings);

    let newMap = new Map();
    newMap = calculateSavings(savings);
    let newSavingsArray = [];
    let yearArray = [];

    //Adds values from map to an array.
    for (let value of newMap.values()) {
        newSavingsArray.push(value);
    }

    //add keys from map(years) to an array
    for (let key of newMap.keys()) {
        yearArray.push(key);
    }
    // console.log("Year Array: " + yearArray);
    // console.log(savings);
    //console.log("newSavingsArray: " + newSavingsArray);
    
    myChart.data.datasets[0].data = newSavingsArray;

    //update data in chart that represents the savings plus interest
    let interest = parseInt(document.getElementById("intRate").value);
    console.log("interest: " + interest/100);
    console.log("typeOf savings: " + typeof savings);
    console.log("savings math: " + (savings + (savings * (interest/100))));
    let newInterestMap = calculateCompoundSavings(savings, interest);
    
    let newInterestArray = [];

     //Adds values from interest map to interest array.
     for (let value of newInterestMap.values()) {
        newInterestArray.push(value);
    }
    
    myChart.data.datasets[1].data = newInterestArray;


    //Update chart with the user's monthly expenses
    let expenses = parseInt(document.getElementById("expenses").value)
    let expensesMap = calculateMonthlyExpenses(expenses);

    let ExpensesArray = [];

    //Adds values from expensesMap to expensesArray.
    for (let value of expensesMap.values()) {
        ExpensesArray.push(value);
    }
    myChart.data.datasets[2].data = ExpensesArray;

    
    //update chart with yearl interest
    let yearlyInterestArray = [];
    let yearlyInterestMap = calculateInterestEarnings(newSavingsArray, interest);

    for (let value of yearlyInterestMap.values()) {
        yearlyInterestArray.push(value);
    }

    myChart.data.datasets[3].data = yearlyInterestArray;


    //updates the chart
    myChart.update();
    

}


//creates a map with the savings plus the compounding interest
function calculateCompoundSavings(savings, interest){
    let interestAsADecimal = parseInt(interest)/100;
    let savingsData = new Map();
    let totalSavings = 0;
    for (let i = 0; i < 10; i++) {
        let year = 2020 + i;

        let accumulatedInterest = totalSavings * interestAsADecimal;

        totalSavings += (parseInt(savings) + accumulatedInterest);
        savingsData.set(year, totalSavings);
    }
    return savingsData;
}


//Adds the user's monthly expenses as a vertical line to the chart
function calculateMonthlyExpenses(expenses){
    let monthlyExpenses = new Map();
    
    for (let i = 0; i < 10; i++) {
        let year = 2020 + i;
        monthlyExpenses.set(year, parseInt(expenses));
    }

    return monthlyExpenses;
}

//returns map of the interest earned for each year
function calculateInterestEarnings(savingsArray, interest){
    let interestAsADecimal = parseInt(interest)/100;
    let interestMap = new Map();
        
    for (let i = 0; i < 10; i++) {
        let year = 2020 + i;
        let yearlyInterest = parseInt(savingsArray[i]) * interestAsADecimal;

        interestMap.set(year, yearlyInterest);
    }
return interestMap;

}