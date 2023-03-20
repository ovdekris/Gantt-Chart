import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import Chart from 'chart.js/auto';
(async function() {
    const ctx = document.getElementById('myChart');
    //status plagin
    const status={
        id:"status",
        afterDatasetsDraw(chart, args, options) {
            const {ctx, data, chartArea:{top,bottom,left,right}, scales:{x,y}}=chart;
            const icons=["\uf00c","\uf00d","\uf110"];
            const colors=["rgba(255, 10, 13,0.8)","rgb(0,255,255)","rgb(255,0,255)"];
            ctx.save();
            ctx.font='bold 12px FontAwesome';
            // ctx.fillStyle=colors[1];
            ctx.textBaseline='middle';
            data.datasets[0].data.map((data,index)=>{
                ctx.arc(x,y,1,angleS,angleE,false);
                ctx.fillText(icons[data.status],right+10,y.getPixelForValue(index));
            })
            ctx.restore();
        }
    }
    console.log('/uf00c')
    //assignedTasks plugin
    const assignedTasks={
        id:'assignedTasks',
        afterDatasetsDraw(chart, args, options) {
            const {ctx, data, chartArea:{top,bottom,left,right}, scales:{x,y}}=chart;
            ctx.save();
            ctx.font='bold 12px FontAwesome';
            ctx.fillStyle='black';
            ctx.textBaseline='middle';
            data.datasets[0].data.map((data,index)=>{
                ctx.fillText(data.name,10,y.getPixelForValue(index));
               })
            ctx.restore();

        }
    }
    //main objects
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
                    {x: ['2023-03-09','2023-03-01'], y: "Task 1", name:'Kris',status: 0},
                    {x: ['2023-03-08','2023-03-03'], y: "Task 2", name: 'John',status: 1},
                    {x: ['2023-03-07','2023-03-02'], y: "Task 3", name: 'Ariel',status: 2}],

            }],

        },
        options: {
            layout:{
                padding:{
                     left:100,
                    right:100
                }
            },
            indexAxis: 'y',
            scales: {
                x: {
                    position: 'top',
                    type: 'time',
                    time:{
                        unit: 'day'
                    },
                    min:'2023-03-01',
                    max: '2023-03-30'
                }
            }
        },
        plugins:[assignedTasks,status],
    });

        })();
