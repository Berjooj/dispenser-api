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

                    let useAmount = element.entries != 0 ? (element.uses / element.entries).toFixed(2) : 0;
                    let percentage = ((element.current_capacity * 100) / element.capacity).toFixed(0);
                    let color = percentage >= 15 ? 'w3-blue' : 'w3-red';
                    let textColor = percentage >= 15 ? 'w3-text-blue' : 'w3-text-red';

                    console.log(percentage)

                    dispenserListHTML += `<div class="w3-container w3-card w3-white">`
                    dispenserListHTML += `<div class="w3-container w12-card w3-white w3-margin-bottom">`
                    dispenserListHTML += `<h2 class="w3-text-grey w3-padding-14">`
                    dispenserListHTML += `<i class="fa-solid fa-bottle-water fa-fw w3-margin-top w3-xxlarge ` + textColor + `"></i>`
                    dispenserListHTML += element.token + ` (ID: ` + element.id + `)`
                    dispenserListHTML += `</h2>`
                    dispenserListHTML += `<div class="w3-container">`
                    dispenserListHTML += `<h5 class="w3-opacity">`
                    dispenserListHTML += `<b>Total de usos: </b>` + element.uses + `<br>`
                    dispenserListHTML += `<b>Total de entradas: </b>` + element.entries + `<br>`
                    dispenserListHTML += `<b>Total de recargas: </b>` + element.recharges + `<br>`
                    dispenserListHTML += `<b>Endereço: </b>` + element.address + `<br>`
                    dispenserListHTML += `<b>Complemento: </b>` + element.complement + `<br>`
                    dispenserListHTML += `<b>Longitude: </b>` + element.lng + `<br>`
                    dispenserListHTML += `<b>Latitude: </b>` + element.lat + `<br>`
                    dispenserListHTML += `<b>Taxa de utilização: </b>` + useAmount + `<br>`
                    dispenserListHTML += `<b>Capacidade (atual/total): </b>` + element.current_capacity + `ml / ` + element.capacity + `ml<br>`
                    dispenserListHTML += `</h5>`
                    dispenserListHTML += `<h6 class="w3-text-blue">`

                    if (percentage <= 15)
                        dispenserListHTML += `<span class="w3-tag w3-red w3-round" style="height: 23px">Recarga necessária</span>`

                    dispenserListHTML += `</h6>`
                    dispenserListHTML += `<div class="w3-light-grey w3-round-xlarge w3-small">`
                    dispenserListHTML += `<div class="w3-container w3-center w3-round-xlarge ` + color + `" style="width:` + percentage + `%">`
                    dispenserListHTML += `<div class="w3-center w3-text-white">` + percentage + `%</div>`
                    dispenserListHTML += `</div>`
                    dispenserListHTML += `</div>`
                    dispenserListHTML += `<br>`
                    dispenserListHTML += `</div>`
                    dispenserListHTML += `</div>`
                    dispenserListHTML += `</div><br>`
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