var ctx = document.getElementById('myChart');

function calculateSavings(savings){

    let savingsData = new Map();
    let totalSavings = 0;
    for(let i = 0; i < 10; i++){
        let year = 2020+i;
        totalSavings += savings;
        savingsData.set(totalSavings, year);
    }

    return savingsData;
}

let testMap = new Map();
testMap = calculateSavings(1600);
let savingsArray = [];
let yearArray = [];

//Adds values from map to an array.
for(let value of testMap.keys()){
    savingsArray.push(value);
}

//add keys from map(years) to an array
for(let key of testMap.keys()){
    yearArray.push(key);
}


//var stars = [135850, 52122, 148825, 16939, 9763];
//var frameworks = ['React', 'Angular', 'Vue', 'Hyperapp', 'Omi'];

var myChart = new Chart(ctx, {
    //type: 'bar',
    type: "line",
    data: {
       labels: yearArray,
        //labels: frameworks,
       datasets: [{

           label: 'Savings',
           data: savingsArray
        //    data: stars
           }]
    },
   });

   console.log(savingsArray);
   console.log(yearArray);

   //Testing Git Push....