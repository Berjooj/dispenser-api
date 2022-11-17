$(document).ready(function ()
{
    var companyId = null;

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

            $('#chartTypeButton').empty()
            $('#bar-i').clone().appendTo('#chartTypeButton')
            $('#bar-span').clone().appendTo('#chartTypeButton')

            companyId = $(this).data('companyId')
            reloadGraph(companyId, 'bar')
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

        $('#chartTypeButton').attr('data-charttype', $(this).data('charttype'))

        $('#dropdown-chart-type').removeClass('show')

        reloadGraph(companyId, $(this).data('charttype'))
    })

    feather.replace()
})