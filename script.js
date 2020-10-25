var ctx = document.getElementById('myChart');

function calculateSavings(savings) {

    let savingsData = new Map();
    let totalSavings = 0;
    for (let i = 0; i < 10; i++) {
        let year = 2020 + i;
        totalSavings += savings;
        savingsData.set(year, totalSavings);
    }
    //console.log("savingsData: " + JSON.stringify(savingsData));
    return savingsData;
}

let testMap = new Map();
testMap = calculateSavings(1600);
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
            label: 'Savings',
            data: savingsArray
        },{
            label: 'My second dataset (test)',
            //backgroundColor: "rgb(0,200,0)",
            borderColor: "rgb(0,99,0)",
            data: savingsArray
        }
    
    ]
    },
});


//function for updating Chart.JS
// function updateChart(){
//     myChart.data.datasets[0].data = [100, 200, 300, 400,500,600,700,800,900,1000]
//     myChart.update(); 
// }


function updateChart(savings) {

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
    // console.log(newSavingsArray);
    // console.log(myChart.data.datasets[0].data);
    myChart.data.datasets[0].data = newSavingsArray;
    myChart.update();
}