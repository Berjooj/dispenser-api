var chart;

function chartInit()
{
    var companyId = $('#companyLabel').data('company-id');

    // seta o evento de trocar de empresa
    $('#dropdown-company a').on('click', function ()
    {
        $('#chartTypeButton').empty()
        $('#bar-i').clone().appendTo('#chartTypeButton')
        $('#bar-span').clone().appendTo('#chartTypeButton')

        companyId = $(this).data('companyId')
        reloadGraph(companyId, 'bar')
    })

    if (companyId)
        reloadGraph(companyId, 'bar')

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

        $('#chartTypeButton').attr('data-charttype', $(this).data('charttype'))

        $('#dropdown-chart-type').removeClass('show')

        reloadGraph(companyId, $(this).data('charttype'))
    })

    feather.replace()

    $('#dropdown-company a').first().trigger('click')
}

function destroyChart()
{
    $('#dropdown-company a').off()
    $('#dropdown-chart-type a').off()
}


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
        $('#loader').removeClass('hide-loader');

        $.get('api/dispenser/' + companyId, function (data)
        {
            $('#loader').addClass('hide-loader');

            $('#table-uses').empty()
            $('#table-flow').empty()

            if (data != [] && data != undefined)
            {
                refreshGraph(displayType, data.series)

                $('#dispenser-count').empty().html(data.counter.dispensers)
                $('#entries-count').empty().html(data.counter.entries)
                $('#recharges-count').empty().html(data.counter.recharges)
                $('#usage-count').empty().html(data.counter.usage)

                let eventTypeList = [
                    'Utilização',
                    'Substituição',
                    'Entrada'
                ]

                let eventIcon = [
                    '<i class="fa-solid fa-hands-bubbles text-white bg-secondary timeline-icon"></i>',
                    '<i class="fa-solid fa-person-walking text-white bg-success timeline-icon" style="padding-left: 8px;"></i>',
                    '<i class="fa-solid fa-fill text-white bg-info timeline-icon"></i>'
                ]

                let eventMessage = [
                    'Utilização registrada para o dispenser #',
                    'Reabastecimento realizado ao dispenser #',
                    'Entrada registrada para o dispenser #',
                ]

                let updateListHTML = '<h6 class="border-bottom border-gray pb-2 mb-0">Atualizações recentes</h6>';

                $('#update-list').empty()

                data.table.forEach(element =>
                {
                    let eventDate = moment(element.created_at).format('DD/MM/yyyy HH:mm:ss')
                    let eventType = eventTypeList[element.type - 1]

                    updateListHTML += '<div class="media text-muted pt-3">'
                    updateListHTML += eventIcon[element.type - 1]
                    updateListHTML += '<p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'
                    updateListHTML += '<strong class="d-block text-gray-dark">' + eventType + '<span class="update-date"> - ' + eventDate + '</span></strong>'
                    updateListHTML += eventMessage[element.type - 1] + element.dispenser_id + '</p></div>'

                })

                $('#update-list').html(updateListHTML)
            }
        }).fail(function (e)
        {
            $('#loader').addClass('hide-loader');
        })
    } catch (e)
    {
        $('#loader').addClass('hide-loader');
    }
}