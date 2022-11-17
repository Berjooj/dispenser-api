var chart;

function refreshGraph(displayType, infoData)
{

    try
    {
        if (chart != undefined)
            chart.destroy()

        var ctx = $('#myChart')

        chart = new Chart(ctx, {
            type: displayType,
            data: {
                labels: infoData.labels,
                datasets: infoData.datasets
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: true,
                }
            }
        });

        chart.update();
    } catch (e) { console.log(e) }
}

function reloadGraph(companyId, displayType)
{

    try
    {
        $.get('api/dispenser/' + companyId, function (data)
        {
            $('#table-uses').empty()
            $('#table-flow').empty()

            if (data != [] && data != undefined)
            {
                console.log(displayType)
                refreshGraph(displayType, data.series)

                data.table.forEach(element =>
                {
                    switch (element.type)
                    {
                        case 1:
                        case 2:
                            $('#table-uses').append(
                                '<tr>'
                                + '<td> Dispenser #' + element.dispenser_id + '</td>'
                                + '<td>' + parseFloat(element.percentage).toFixed(2) + '%</td>'
                                + '<td>' + element.uses + '</td>'
                                + '<td>' + moment(Date.parse(element.created_at)).format('DD/MM/YYYY HH:mm:ss') + '</td>'
                                + '</tr>'
                            )
                            break;

                        case 3:
                            $('#table-flow').append(
                                '<tr>'
                                + '<td> Dispenser #' + element.dispenser_id + '</td>'
                                + '<td>' + element.entries + '</td>'
                                + '<td>' + moment(Date.parse(element.created_at)).format('DD/MM/YYYY HH:mm:ss') + '</td>'
                                + '</tr>'
                            )
                            break;
                    }
                });
            }
        })
    } catch (e) { }
}