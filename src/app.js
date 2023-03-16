import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import Chart from 'chart.js/auto';
(async function() {
    const ctx = document.getElementById('myChart');
    const todayLine={
        id: 'todayLine',
        afterDatasetsDraw(chart, args, options){
        const {ctx, data, chartArea:{top,bottom,left,right}, scales:{x,y}}=chart
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth =3;
            ctx.moveTo(x.getPixelForValue(new Date()),top);
            ctx.lineTo(x.getPixelForValue(new Date()),bottom);
            ctx.stroke();

         }
    }
    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Gant Chart',
                backgroundColor: ['#FFC0CB','#fff','#FFC0CB'],
                data: [
                    {x: ['2023-01-09','2023-01-01'], y: "Task 1"},
                    {x: ['2023-02-08','2023-02-03'], y: "Task 2"},
                    {x: ['2023-03-07','2023-03-02'], y: "Task 3"}],

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
                    min:'2023-01-01',
                    max: '2023-10-10'
                }
            }
        }
    });

        })();
