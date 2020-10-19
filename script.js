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

let testMap = calculateSavings(1600);
let savingsArray = [];

for(var i = 0, keys = Object.keys(testMap), ii = keys.length; i < ii; i++){
    savingsArray.push(keys[i]);
}

for(let i = 0; i < savingsArray.length;i++){
    console.log(savingsArray[i]);
}

//var stars = [135850, 52122, 148825, 16939, 9763];
//var frameworks = ['React', 'Angular', 'Vue', 'Hyperapp', 'Omi'];

var myChart = new Chart(ctx, {
    //type: 'bar',
    type: "line",
    data: {
       labels: frameworks,
       datasets: [{

           label: 'Popular JavaScript Frameworks',
           data: savingsArray
        //    data: stars
           }]
    },
   });