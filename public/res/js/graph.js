var chart;

function chartInit() {
    var companyId = $('#companyLabel').data('company-id');

    // seta o evento de trocar de empresa
    $('#dropdown-company a').on('click', function () {
        $('#chartTypeButton').empty()
        $('#bar-i').clone().appendTo('#chartTypeButton')
        $('#bar-span').clone().appendTo('#chartTypeButton')

        companyId = $(this).data('companyId')
        reloadGraph(companyId, 'bar')
    })

    if (companyId)
        reloadGraph(companyId, 'bar')

    // desabilita os eventos dos links <a>
    $(document).on('click', '*[href]', function (e) {
        e.preventDefault();
        return false;
    });

    // seta o tipo do gráfico
    $('#chartTypeButton').empty()
    $('#dropdown-chart-type a i').first().clone().appendTo('#chartTypeButton')
    $('#dropdown-chart-type a span').first().clone().appendTo('#chartTypeButton')
    $('#dropdown-chart-type a').first().addClass('active')

    $('#dropdown-chart-type a').on('click', function () {
        $('#dropdown-chart-type a').removeClass('active')
        $(this).addClass('active')

        $('#chartTypeButton').empty()
        $(this).find('i').clone().appendTo('#chartTypeButton')
        $(this).find('span').clone().appendTo('#chartTypeButton')

        $('#chartTypeButton').attr('data-charttype', $(this).data('charttype'))

        $('#dropdown-chart-type').removeClass('show')

        reloadGraph(companyId, $(this).data('charttype'))
    })

    feather.replace()
}

function destroyChart() {
    $('#dropdown-company a').off()
    $('#dropdown-chart-type a').off()
}


function refreshGraph(displayType, infoData) {

    try {
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

function reloadGraph(companyId, displayType) {

    try {
        $.get('api/dispenser/' + companyId, function (data) {
            $('#table-uses').empty()
            $('#table-flow').empty()

            if (data != [] && data != undefined) {
                refreshGraph(displayType, data.series)

                data.table.forEach(element => {
                    switch (element.type) {
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