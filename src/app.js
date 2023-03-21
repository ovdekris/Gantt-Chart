import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import Chart from 'chart.js/auto';
(async function() {
    const ctx = document.getElementById('myChart');
    const colors=["rgba(255, 10, 13,0.8)","rgb(0,255,255)","rgb(255,0,255)"];
    //status plagin
    const status={
        id:"status",
        afterDatasetsDraw(chart, args, options) {
            const {ctx, data, options,chartArea:{top,bottom,left,right}, scales:{x,y}}=chart;
            const icons=["\uf00c","\uf00d","\uf110"];
            const angle=Math.PI/180;
            ctx.save();
            ctx.font='bold 10px FontAwesome';
            ctx.textBaseline='middle';
            data.datasets[0].data.map((data,index)=>{
                ctx.beginPath();
                ctx.fillStyle=colors[data.status];
                ctx.arc(right+25,y.getPixelForValue(index),12,0,angle*360,false);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle="white";
                ctx.fillText(icons[data.status],right+20,y.getPixelForValue(index));
            });
            ctx.font="bolder 12px sans-serif";
            ctx.fillStyle="black";
            ctx.fillText("Status",right+20,top-15);
            ctx.restore();
        }
    }
    //assignedTasks plugin
    const assignedTasks={
        id:'assignedTasks',
        afterDatasetsDraw(chart, args, options) {
            const {ctx, data, chartArea:{top,bottom,left,right}, scales:{x,y}}=chart;
            ctx.save();
            ctx.font='bold 12px sans-serif';
            ctx.fillStyle='black';
            ctx.textBaseline='middle';
            data.datasets[0].data.map((data,index)=>{
                ctx.fillText(data.name,5,y.getPixelForValue(index));
                ctx.fillText("Names",10,top-15);
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
                borderWidth: 0,
                borderRadius: 15,
                barPercentage: 0.5,
                backgroundColor: (ctx)=>{
                    return colors[ctx.raw.status];
                },
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
                    right:70
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
