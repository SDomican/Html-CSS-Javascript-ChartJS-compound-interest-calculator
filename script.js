var ctx = document.getElementById('myChart');

function calculateSavings(savings, years) {
    //console.log("calculateSavings savings value: " + savings);
    //console.log("Years: " + years);
    let savingsData = new Map();
    let totalSavings = 0;
    for (let i = 1; i <= (years + 1); i++) {
        let currentYear = 2020 + i;
        totalSavings += (parseInt(savings) * 12);
        console.log("Savings for year " + currentYear + ": " + totalSavings);
        savingsData.set(currentYear, totalSavings);
    }
  
    return savingsData;
}



let testMap = new Map();
testMap = calculateSavings(0);
let savingsArray = [];
let yearArray = [];


//Adds values from map to an array.
for (let value of testMap.values()) {
    savingsArray.push(value);
}

//add keys from map(years) to an array
for (let key of testMap.keys()) {
    yearArray.push(key);
}



var myChart = new Chart(ctx, {
    //type: 'bar',
    type: "line",
    data: {
        labels: yearArray,
        datasets: [{
            label: 'Base Savings',
            data: savingsArray        
        },{
            label: 'Savings plus interest',
            //backgroundColor: "rgb(0,200,0)",
            borderColor: "rgb(255,0,0)",
            data: savingsArray
        }
        ,{
            label: 'Yearly Expenses',
            //backgroundColor: "rgb(0,200,0)",
            borderColor: "rgb(0,99,0)",
            data: savingsArray
        }
        ,{
            label: 'Total Interest earned',
            //backgroundColor: "rgb(0,200,0)",
            borderColor: "rgb(255,255,0)",
            data: savingsArray
        }
        ,{
            label: 'Yearly passive income (interest)',
            //backgroundColor: "rgb(0,200,0)",
            borderColor: "rgb(186,85,211)",
            data: savingsArray
        }
    
    ]
    },
});


function updateChart() {
    
    var years = 10;

    if(document.getElementById("years") !== null){
        var years = parseInt(document.getElementById("years").value);
    }
    
    let savings = parseInt(document.getElementById("numberTest").value);

    let newMap = new Map();
    
    // if(document.getElementById("increaseSavings") == null){
    //     console.log("PING 1");
    //     newMap = calculateSavings(savings, years);
    // } else{
    //     console.log("PING 2");
    //     var growth = parseInt(document.getElementById("increaseSavings").value);
    //     calculateSavingsWithGrowth(savings, years, growth);
    // }
    
    newMap = calculateSavings(savings, years);

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

    myChart.data.datasets[0].data = newSavingsArray;
    myChart.config.data.labels = yearArray;



    // //update data in chart that represents the savings plus interest
    let interest = parseInt(document.getElementById("intRate").value);
    let newInterestMap = calculateCompoundSavings(newSavingsArray, interest, years);
    
    let newInterestArray = [];

     //Adds values from interest map to interest array.
     for (let value of newInterestMap.values()) {
        newInterestArray.push(value);
    }
    
    myChart.data.datasets[1].data = newInterestArray;
    


    //Update chart with the user's monthly expenses
    let expenses = parseInt(document.getElementById("expenses").value)
    let expensesMap = calculateMonthlyExpenses(expenses, years);

    let ExpensesArray = [];

    //Adds values from expensesMap to expensesArray.
    for (let value of expensesMap.values()) {
        ExpensesArray.push(value * 12);
    }
    myChart.data.datasets[2].data = ExpensesArray;


    

    
    // //update chart with yearly interest
    let yearlyInterestArray = [];
    let yearlyInterestMap = calculateInterestEarnings(newSavingsArray, newInterestArray, years);

    for (let value of yearlyInterestMap.values()) {
        yearlyInterestArray.push(value);
    }

    myChart.data.datasets[3].data = yearlyInterestArray;



    // //update passive earnings chart
    let passiveIncomeArray = [];
    let newYearArray = [];
    let passiveIncomeMap = createPassiveIncomeMap(newInterestArray, interest,years);

    for (let value of passiveIncomeMap.values()) {
        passiveIncomeArray.push(value);
    }

    //add keys from map(years) to an array
    for (let key of passiveIncomeMap.keys()) {
        newYearArray.push(key);   
    }

    myChart.data.datasets[4].data = passiveIncomeArray;

    //updates the chart
    myChart.update();
    

    //Update the finance text
    
    document.getElementById("financeParagraph").innerHTML = "With monthly expenses of " + expenses + ", monthly savings of " + savings + " ,and a post-inflation return on your investments of " + interest + " percent, you will be financially independent in  " + calculateYearsToIndependence() + " years!";
   
}

//FUNCTION NEEDS FINISHING!
function calculateYearsToIndependence(savingsPlusInterestArray, interestRate){

    let passiveMap = createPassiveIncomeMap(monthlyExpenses, savingsPlusInterestArray, interestRate, 100);
    let counter = 0;

    //If interest = 0 then return that they will never be independent
    if(interestRate == 0){
        return 0;
    }

    //check passive income for the year. If passive income greater than yearly expenses, return count of the year
    for(let value of passiveMap){
        counter++;
        if (value >= monthlyExpenses){
            return counter;
        }
    }

    return 0;
}


function calculateCompoundSavings(savingsArray, interest, years){
    let interestAsADecimal = parseInt(interest)/100;
    let savingsData = new Map();
    let totalSavings = 0;
    //loop through savingsArray

    //take the ith value of the array and add the amount to totalSavings
    for (let i = 0; i <= years; i++){
        
        let currentYear = 2020 + i;
        totalSavings += parseInt(savingsArray[0]);

         //add interest to the totalSavings
        let interestToAdd = totalSavings * interestAsADecimal;
        totalSavings += interestToAdd;
        
        //push the values to the map
        savingsData.set(currentYear, Math.floor(totalSavings));
    }


    //return the map
    return savingsData;
}




//Adds the user's monthly expenses as a vertical line to the chart
function calculateMonthlyExpenses(expenses, years){
    let monthlyExpenses = new Map();
    
    for (let i = 0; i <= years; i++) {
        let year = 2020 + i;
        monthlyExpenses.set(year, parseInt(expenses));
    }

    return monthlyExpenses;
}



//returns map of the interest earned for each year
function calculateInterestEarnings(baseSavingsArray, incomeAndInterestArray, years){
    
    let interestMap = new Map();

    for(let i = 0; i<= years; i++){
        let year = 2020 + i;

        let newInterestValue = (parseInt(incomeAndInterestArray[i]) - parseInt(baseSavingsArray[i]));
        interestMap.set(year, newInterestValue);
        console.log("New interest value: " + newInterestValue)
    }
    return interestMap;
}


//creates a map of the passive income
function createPassiveIncomeMap(savingsPlusInterestArray, interestRate, years){
    let interestAsADecimal = parseInt(interestRate)/100;
    let passiveIncomeMap = new Map();

    for (let i = 0; i <= years;i++){
        let year = 2020 + i;
        passiveIncomeMap.set(year, Math.round((savingsPlusInterestArray[i] * interestAsADecimal)));
    }

    return passiveIncomeMap;
}

function calculateSavingsWithGrowth(savings, years, savingsGrowthRate){
    let savingsData = new Map();
    let totalSavings = 0;
    let yearlySavings = savings;
    let growthRateAsDecimal = parseInt(savingsGrowthRate)/100;
    for (let i = 1; i <= (years + 1); i++) {
        let currentYear = 2020 + i;
        totalSavings += (parseInt(yearlySavings) * 12);
        console.log("Savings for year " + currentYear + ": " + totalSavings);
        savingsData.set(currentYear, totalSavings);
        yearlySavings *= (100 + growthRateAsDecimal);
    }
  
    return savingsData;
}