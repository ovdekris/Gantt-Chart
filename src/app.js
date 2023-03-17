import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import Chart from 'chart.js/auto';
(async function() {
    const ctx = document.getElementById('myChart');
    const assignedTasks={
        id:'assignedTasks',
        afterDatasetsDraw(chart, args, options) {
            const {ctx, data, chartArea:{top,bottom,left,right}, scales:{x,y}}=chart;
            ctx.font='12px sans-serif bold';
            ctx.fillStyle='black';
            ctx.fillText('text',10,y.getPixelForValue(0));
        }
    }
    console.log(assignedTasks);
    new Chart(ctx, {

        type: 'bar',
        data: {
            datasets: [{
                label: 'Gant Chart',
                borderSkipped:false,
                borderWidth: 2,
                borderColor:["rgba(255, 10, 13,0.8)","rgb(0,255,255)","rgb(255,0,255)"],
                backgroundColor: [ "rgba(255, 10, 13, 0.4)","rgb(0,255,255,0.4)","rgb(255,0,255,0.4)"],
                borderRadius: 15,
                opacity: 90,
                data: [
                    {x: ['2023-03-09','2023-03-01'], y: "Task 1", name:'Kris'},
                    {x: ['2023-03-08','2023-03-03'], y: "Task 2", name: 'John'},
                    {x: ['2023-03-07','2023-03-02'], y: "Task 3", name: 'Ariel'}],

            }],
            plugins:[assignedTasks],
        },
        options: {
            layout:{
                padding:{
                     left:100
                }
            },
            indexAxis: 'y',
            scales: {
                x: {
                    type: 'time',
                    time:{
                        unit: 'day'
                    },
                    min:'2023-03-01',
                    max: '2023-03-30'
                }
            }
        }
    });

        })();
