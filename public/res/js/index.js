$(document).ready(function ()
{
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
        })

    }).fail(function (e)
    {
        console.log(e)
    })
})