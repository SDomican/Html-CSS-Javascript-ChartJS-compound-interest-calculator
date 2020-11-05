
function Chart() {
    var ctx = document.getElementById('myChart');

    //Takes in savings amount and returns a map of the year as a key and the savings total per year as the value
    function calculateSavings(savings) {
        let savingsData = new Map();
        let totalSavings = 0;
        for (let i = 0; i < 10; i++) {
            let year = 2020 + i;
            totalSavings += savings;
            savingsData.set(totalSavings, year);
        }
        return savingsData;
    }


    function CreateChart() {

        let testMap = new Map();
        testMap = calculateSavings(1600);
        let savingsArray = [];
        let yearArray = [];

        //Adds values from map to an array.
        for (let value of testMap.keys()) {
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

                    label: 'Savings',
                    data: savingsArray
                }]
            },
        });


    }


}

const testChart = new Chart();
Chart.CreateChart();