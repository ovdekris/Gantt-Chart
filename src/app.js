import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import Chart from 'chart.js/auto';


(async function() {
    const ctx = document.getElementById('myChart');
    const colors=["rgba(255, 10, 13,0.8)","rgb(0,255,255)","rgb(255,0,255)"];
    //status plagin
    const status={
        id:"status",
        afterDatasetsDraw(chart, args) {
            const {ctx, data,chartArea:{top,bottom,left,right}, scales:{x,y}}=chart;
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
                ctx.fillText(icons[data.status],right+25,y.getPixelForValue(index));
            });
            ctx.font="bolder 12px sans-serif";
            ctx.fillStyle="black";
            ctx.fillText("Status",right+30,top-15);
            ctx.restore();
        }
    }
    //todayLine plugin
    const todayLine={

        id:'todayLine',
        afterDatasetsDraw(chart, args,pluginOptions){
            const {ctx, data, chartArea:{top,bottom,left,right}, scales:{x,y}}=chart;
            ctx.save();

            if (x.getPixelForValue(new Date())>=left&&x.getPixelForValue(new Date())<=right){
                ctx.beginPath();
                ctx.lineWidth=3;
                ctx.strokeStyle='rgba(102,102,102,1)';
                ctx.setLineDash([6,6]);
                ctx.moveTo(x.getPixelForValue(new Date()),top);
                ctx.lineTo(x.getPixelForValue(new Date()),bottom);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.beginPath();
                ctx.lineWidth=1;
                ctx.strokeStyle='rgba(102,102,102,1)';
                ctx.fillStyle='rgba(102,102,102,1)';
                ctx.moveTo(x.getPixelForValue(new Date()),top+3);
                ctx.lineTo(x.getPixelForValue(new Date())-6,top-6 );
                ctx.lineTo(x.getPixelForValue(new Date())+6,top-6 );
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.restore();

                ctx.font='bold 12px sans-serif';
                ctx.fillStyle='rgba(102,102,102,1)';
                ctx.textAlign='center';
                ctx.fillText("Today",x.getPixelForValue(new Date()),bottom+15);
            }


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
            ctx.textAlign='left';
            data.datasets[0].data.map((data,index)=>{
                ctx.fillText(data.name,5,y.getPixelForValue(index));
                ctx.fillText("Names",10,top-15);
               })
            ctx.restore();

        }
    }
    const config={
        type: 'bar',
        data: {
            datasets: [{
                label: 'Gant Chart',
                borderSkipped:false,
                borderWidth: 0,
                borderRadius: 15,
                barPercentage: 0.8,
                backgroundColor: (ctx)=>{
                    return colors[ctx.raw.status];
                },
                opacity: 90,
                data: [
                    {x: ['2023-03-01','2023-03-09'], y: "Task 1", name:'Kris',status: 0},
                    {x: ['2023-03-03','2023-03-08'], y: "Task 2", name: 'John',status: 1},
                    {x: ['2023-03-02','2023-03-07'], y: "Task 3", name: 'Ariel',status: 2},
                    {x: ['2023-03-04','2023-03-10'], y: "Task 4", name:'Donat',status: 0},
                    {x: ['2023-03-15','2023-03-20'], y: "Task 5", name: 'Leila',status: 2},
                    {x: ['2023-03-12','2023-03-19'], y: "Task 6", name: 'Erik',status: 1}
                ]



            }],

        },
        options: {
            layout:{
                padding:{
                    left:100,
                    right:70,
                    bottom:40
                }
            },
            indexAxis: 'y',
            scales: {
                x: {
                    position: 'top',
                    type: 'time',
                    time:{
                        // unit: 'day'
                        displayFormats:{
                            day:'d'
                        }
                    },
                    // min:'2023-03-01',
                    // max: '2023-03-31'
                }
            },
            plugins:{
                legend:{
                    display:false
                },
                tooltip:{
                    displayColors:false,
                    yAlign: 'bottom',
                    callbacks:{
                        label:(ctx)=>{
                            return '';
                        },
                        title:(ctx)=>{
                            const startDate=new Date(ctx[0].raw.x[0]);
                            const endDate=new Date(ctx[0].raw.x[1]);
                            const formatedStartDate=startDate.toLocaleString([],{
                                year:'numeric',
                                month:'short',
                                day:'numeric',
                            });
                            const formatedEndDate=endDate.toLocaleString([],{
                                year:'numeric',
                                month:'short',
                                day:'numeric',
                            });
                            return [ctx[0].raw.name,`Task Date: ${formatedStartDate} - ${formatedEndDate}`];
                        }}
                }
            }
        },
        plugins:[assignedTasks,todayLine,status]

    };
    //main objects
  const myChart=new Chart(document.getElementById('myChart'), config);
    //function for chart data filter
    document.getElementById("dateId").addEventListener("change",chartFilter);
    function chartFilter(date){
      const year=this.value.substring(0,4);
      const month=this.value.substring(5,7);
      const lastDay=(y,m)=>{
          return  new Date(y,m,0).getDate();
      }
        const startDate=`${year}-${month}-01`;
      const endDate=`${year}-${month}-${lastDay(year,month)}`;
      myChart.config.options.scales.x.min=startDate;
      myChart.config.options.scales.x.max=endDate;
      myChart.update();
    }
    const buttonAddTask=document.getElementById("addTask");
    buttonAddTask.addEventListener("click",addTask);
    function addTask(){
        const startDateTask=document.getElementById("startDate");
        const endDateTask=document.getElementById("endDate");
        const nameTask=document.getElementById("nameTask");
        const teamMember=document.getElementById("teamMember");
        const statusTask=document.getElementById("statusTask");
        const arrayLength=myChart.data.datasets[0].data.length;
        myChart.data.datasets[0].data[arrayLength]=({x: [startDateTask.value,endDateTask.value], y: nameTask.value, name:teamMember.value,status: parseInt(statusTask.value)});
        startDateTask.value="";
        endDateTask.value="";
        nameTask.value="";
        teamMember.value="";
        statusTask.value="";
        addNames();
        myChart.update();
    }
    function addNames(){
        const names=document.getElementById('teamMember');
        while (names.firstElementChild){
            names.removeChild(names.firstElementChild);

        }
         const namesArray=myChart.data.datasets[0].data.map((item)=>{
             return item.name;
         })
        const namesArrayFilter=[...new Set(namesArray)];
        namesArray.forEach((itemName)=>{
        const option=document.createElement('option');
        option.value=itemName;
        option.innerHTML=itemName;
        names.appendChild(option);
        })
    }
    addNames();
        })();

