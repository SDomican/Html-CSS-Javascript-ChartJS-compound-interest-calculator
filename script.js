var ctx = document.getElementById('myChart');

function calculateSavings(savings, years) {
    let savingsData = new Map();
    let totalSavings = 0;
    for (let i = 1; i < (years + 1); i++) {
        let currentYear = 2020 + i;
        totalSavings += (parseInt(savings) * 12);
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


    if(document.getElementById("years").value.length !== 0 && Number.isInteger(parseInt(document.getElementById("years").value))){
        years = parseInt(document.getElementById("years").value);
    }
    

    let savings = parseInt(document.getElementById("numberTest").value);

    let newMap = new Map();
    
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
    //let passiveIncomeMap = createPassiveIncomeMap(newInterestArray, interest, years); - old v1 working version
    let passiveIncomeMap = createPassiveIncomeMap(savings, interest, years);

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
    

    //Updates the finance text
    
    if(calculateYearsToIndependence(expenses, passiveIncomeArray,interest) != 0){

    document.getElementById("financeParagraph").innerHTML = "With monthly expenses of " + expenses + ", monthly savings of " + savings + ", and a post-inflation return on your investments of " + interest + " percent, you will be financially independent in  " + calculateYearsToIndependence(expenses, passiveIncomeArray,interest) + " years!";

    }
    else{
        document.getElementById("financeParagraph").innerHTML = "With monthly expenses of " + expenses + ", monthly savings of " + savings + ", and a post-inflation return on your investments of " + interest + " percent, you will need to save more money or get a higher interest rate return on your investments to achieve your goal within " + years + " years."; 
    }
   
}

function calculateYearsToIndependence(monthlyExpenses, passiveIncomeArray, interestRate){

    //let passiveMap = createPassiveIncomeMap(interestArray, interestRate, 100);
    let counter = 0;
    let yearlyExpenses = monthlyExpenses * 12;

    //If interest = 0 then return that they will never be independent
    if(interestRate == 0){
        return 0;
    }

    //check passive income for the year. If passive income greater than yearly expenses, return count of the year
    for(let value of passiveIncomeArray){
        counter++;
        if (value >= yearlyExpenses){
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
    for (let i = 0; i < years; i++){
        
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
    
    for (let i = 0; i < years; i++) {
        let year = 2020 + i;
        monthlyExpenses.set(year, parseInt(expenses));
    }

    return monthlyExpenses;
}



//returns map of the interest earned for each year
function calculateInterestEarnings(baseSavingsArray, incomeAndInterestArray, years){
    
    let interestMap = new Map();

    for(let i = 0; i< years; i++){
        let year = 2020 + i;

        let newInterestValue = (parseInt(incomeAndInterestArray[i]) - parseInt(baseSavingsArray[i]));
        interestMap.set(year, newInterestValue);
    }
    return interestMap;
}


function createPassiveIncomeMap(monthlySavings, interestRate, years){

    let passiveIncomeMap = new Map();
    let totalSavings = 0;
    let yearlySavings = monthlySavings * 12;
    let interestAsADecimal = parseInt(interestRate)/100;
    let interestEarnings = 0;


    for(let i = 0; i <= years; i++){
        let year = 2020 + i;
        
        totalSavings += yearlySavings;
        
        interestEarnings = Math.round(totalSavings * interestAsADecimal);

        totalSavings += interestEarnings;

        passiveIncomeMap.set(year, interestEarnings);

    }

    return passiveIncomeMap;
}


function calculateSavingsWithGrowth(savings, years, savingsGrowthRate){
    let savingsData = new Map();
    let totalSavings = 0;
    let yearlySavings = savings;
    let growthRateAsDecimal = parseInt(savingsGrowthRate)/100;
    for (let i = 1; i < (years + 1); i++) {
        let currentYear = 2020 + i;
        totalSavings += (parseInt(yearlySavings) * 12);
        savingsData.set(currentYear, totalSavings);
        yearlySavings *= (100 + growthRateAsDecimal);
    }
  
    return savingsData;
}