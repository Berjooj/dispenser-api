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

    let bodyHTML = '<form>';

    bodyHTML += '<div class="form-group"><label for="">Capacidade:</label><input value="'
        + element.capacity
        + '" type="text" class="form-control" id="" placeholder=""></div>'

    bodyHTML += '<div class="form-group"><label for="">Longitude:</label><input value="'
        + element.lng
        + '" type="text" class="form-control" id="" placeholder=""></div>'

    bodyHTML += '<div class="form-group"><label for="">Latitude:</label><input value="'
        + element.lat
        + '" type="text" class="form-control" id="" placeholder=""></div>'

    bodyHTML += '<div class="form-group"><label for="">Endereço:</label><input value="'
        + element.address
        + '" type="text" class="form-control" id="" placeholder=""></div>'

    bodyHTML += '<div class="form-group"><label for="">Complemento:</label><input value="'
        + element.complement
        + '" type="text" class="form-control" id="" placeholder=""></div>'

    bodyHTML += '</form>'

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
                    dispenserListHTML += '<p class="card-text"><b>Código:</b> #' + element.token + '<br>'
                    dispenserListHTML += '<b>Total de usos:</b> ' + element.uses + '<br>'
                    dispenserListHTML += '<b>Total de entradas:</b> ' + element.entries + '<br>'
                    dispenserListHTML += '<b>Total de recargas:</b> ' + element.recharges + '</p>'
                    dispenserListHTML += '<div><button type="button" class="btn btn-primary" onclick=\'openDispenserModal(' + JSON.stringify(element) + ')\'><i class="fa-solid fa-pencil"></i> Editar</button>'
                    dispenserListHTML += '<button disabled type="button" class="btn btn-danger" onclick=\'openDispenserModal(' + JSON.stringify(element) + ')\'><i class="fa-solid fa-trash"></i> Remover</button></div>'
                    dispenserListHTML += '<br></div></div>'
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