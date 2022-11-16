$(document).ready(function ()
{
    var infoChart = []
    var chart = undefined

    $.get('api/companies', function (data)
    {
        companyList = data

        data.forEach(element =>
        {
            $('#dropdown-company').append(
                '<a class="dropdown-item company-option" href="" data-company-id="'
                + element.id
                + '" data-company-name="'
                + element.company_name
                + '" data-company-doc="'
                + element.company_document
                + '">'
                + element.company_name
                + ' - '
                + element.company_document
                + '</a>'
            )

            $('#dropdown-company').append('<div class="dropdown-divider"></div>')
        });

        // seta o evento de trocar de empresa
        $('#dropdown-company a').on('click', function ()
        {
            $('#dropdown-company a').removeClass('active')
            $(this).addClass('active')

            $('#companyLabel').empty()
            $('#companyLabel').append('<span>' + $(this).data('companyName') + '</span>')
            $('#companyLabel').attr('data-company-id', $(this).data('companyId'))

            $('#dropdown-company').removeClass('show')

            reloadGraph($(this).data('companyId'))
        })

    }).fail(function (e)
    {
        console.log(e)
    })

    // desabilita os eventos dos links <a>
    $(document).on('click', '*[href]', function (e)
    {
        e.preventDefault();
        return false;
    });

    // seta o tipo do gráfico
    $('#chartTypeButton').empty()
    $('#dropdown-chart-type a i').first().clone().appendTo('#chartTypeButton')
    $('#dropdown-chart-type a span').first().clone().appendTo('#chartTypeButton')
    $('#dropdown-chart-type a').first().addClass('active')

    $('#dropdown-chart-type a').on('click', function ()
    {
        $('#dropdown-chart-type a').removeClass('active')
        $(this).addClass('active')

        $('#chartTypeButton').empty()
        $(this).find('i').clone().appendTo('#chartTypeButton')
        $(this).find('span').clone().appendTo('#chartTypeButton')

        $('#dropdown-chart-type').removeClass('show')

        refreshGraph(chart, $(this).data('charttype'))
    })

    feather.replace()
})

function refreshGraph(chart, displayType, infoData)
{

    try
    {
        if (chart != undefined && chart != null && chart != '')
            chart.destroy()

        var ctx = $('#chart')

        chart = new Chart(ctx, {
            type: displayType,
            data: {
                infoData
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
    } catch (e) { }
}

function reloadGraph(companyId)
{

    try
    {
        $.get('api/dispenser/' + companyId, function (data)
        {
            $('#table-uses').empty()
            $('#table-flow').empty()

            if (data != [] && data != undefined)
            {
                data.forEach(element =>
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