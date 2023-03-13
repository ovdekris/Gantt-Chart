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
                data: [
                    {x: '2022-09-09', y: "Task 1"}],
                borderWidth: 1
            }],
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    type: 'time',
                    time:{
                        unit: 'day'
                    }
                }
            }
        }
    });

        })();
