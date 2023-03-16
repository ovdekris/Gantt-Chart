import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import Chart from 'chart.js/auto';
(async function() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Gant Chart',
                backgroundColor: '#FFC0CB',
                data: [
                    {x: ['2022-09-09','2022-09-01'], y: "Task 1"},
                    {x: ['2022-09-08','2022-09-03'], y: "Task 2"},
                    {x: ['2022-09-07','2022-09-02'], y: "Task 3"}],

            }],
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    type: 'time',
                    time:{
                        unit: 'day'
                    },
                    min:'2022-08-08',
                    max: '2022-10-10'
                }
            }
        }
    });

        })();
