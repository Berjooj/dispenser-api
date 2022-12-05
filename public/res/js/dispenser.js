var dispenser;

function dispenserInit()
{
    $('#reloadDispenserList').on('click', function ()
    {
        reloadDispenser($('#companyLabel').data('company-id'))
    })

    reloadDispenser($('#companyLabel').data('company-id'))
}

function destroyDispenser()
{
    $('#reloadDispenserList').off()
}

function openDispenserModal(element)
{
    $('#dispenserListHeaderModal').empty()
    $('#dispenserListBodyModal').empty()

    $('#dispenserListCardModal').modal('show')

    $('#dispenserListHeaderModal').html('<b>ID: </b>#' + element.id)

    let bodyHTML = '';

    bodyHTML += '<b>Capacidade: </b>' + element.current_capacity + '%<br>'
    bodyHTML += '<b>Longitude: </b>' + element.lng + '<br>'
    bodyHTML += '<b>Latitude: </b>' + element.lat + '<br>'
    bodyHTML += '<b>Total utilizações: </b>' + element.uses + '<br>'
    bodyHTML += '<b>Total entradas: </b>' + element.entries + '<br>'
    bodyHTML += '<b>Total recargas: </b>' + element.recharges + '<br>'
    bodyHTML += '<b>Atualizado em: </b>' + moment(element.updated_at).format('LLLL') + '<br>'
    bodyHTML += '<b>Registrado em: </b>' + moment(element.created_at).format('LLLL') + '<br>'
    bodyHTML += '<b>Complemento: </b>' + element.complement + '<br>'
    bodyHTML += '<b>Endereço: </b>' + element.address + '</p>'

    $('#dispenserListBodyModal').html(bodyHTML)
}

function reloadDispenser(companyId)
{

    try
    {
        $('#loader').removeClass('hide-loader');

        $.get('api/dispenser/list/' + companyId, function (data)
        {
            $('#loader').addClass('hide-loader')

            if (data !== [] && data !== undefined)
            {
                let dispenserListHTML = ''

                data.dispensers.forEach(element =>
                {
                    let color = element.current_capacity >= 15 ? '#007bff' : '#c92e2e';

                    dispenserListHTML += '<div class="card text-center col-5 mb-3 ml-3"'
                    dispenserListHTML += '<div class="card-body">'
                    dispenserListHTML += '<i class="fa-solid fa-bottle-water" style="font-size: 150px;color: ' + color + ';margin-top: 15px"></i>'
                    dispenserListHTML += '<br><br>'
                    dispenserListHTML += element.current_capacity >= 15
                        ? '<p class="card-text"><b>ID:</b> #' + element.id + '</p>'
                        : '<p class="card-text" style="color: ' + color + '"><b>(Reabastecimento necessário) ID:</b> #' + element.id + '</p>'
                    dispenserListHTML += '<p class="card-text"><b>Código:</b> #' + element.token + '</p>'
                    dispenserListHTML += '<button type="button" class="btn btn-link" onclick=\'openDispenserModal(' + JSON.stringify(element) + ')\'>Mais informações</button>'
                    dispenserListHTML += '</div></div>'
                })

                $('#dispenserListCard').empty()
                $('#dispenserListCard').html(dispenserListHTML)
            }

        }).fail(function (e)
        {
            $('#loader').addClass('hide-loader')
        })
    } catch (e)
    {
        $('#loader').addClass('hide-loader')
    }
}