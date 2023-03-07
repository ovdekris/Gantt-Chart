import Chart from 'chart.js/auto'

(async function() {
    const data=
        [{x: '2016-12-25', y: 20},
            {x: '2016-12-26', y: 10}]

    new Chart(
        document.getElementById('acquisitions'),
        {
            type: 'bar',
            options:{
                indexAxis: 'y',
                min:'2020-09-02',
                // scales:{
                //     x:{
                //         type:"time",
                //         time:{
                //             unit:"day"
                //         }
                //     }
                // }
            },
            data: {
                labels: data.map(row => row.y),
                datasets: [
                    {
                        label: 'Acquisitions by day',
                        data: data.map(row => row.x)
                    }
                ]
            }
        }
    );
})();
