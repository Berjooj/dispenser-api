<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="connect-src * blob:; font-src * data:;img-src * data:;">
    <title>Dispenser v0.4.7</title>

    <link rel="stylesheet" href="{{ asset('res/css/bootstrap.min.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/dashboard.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/dispenser.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/app.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/map.css') }}" crossorigin="anonymous">

    <script src="{{ asset('res/js/popper.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/jquery-3.6.1.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/bootstrap.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/Chart.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/feather.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/index.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/graph.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/map.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/dispenser.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/moment.js') }}" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

    <link rel="stylesheet" href="https://js.arcgis.com/4.25/esri/themes/light/main.css">
    <script src="https://js.arcgis.com/4.25/"></script>

    <link href="{{ asset('res/src/fontawesome-free-6.2.0-web/css/all.min.css') }}" rel="stylesheet">

    <link rel="icon" href="{{ asset('/res/icon.png') }}" type="image/x-icon">

    <style>
        body {
            font-family: 'Nunito', sans-serif;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <div class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
            <div class="btn-group">
                <button disabled class="btn btn-secondary btn-sm select-brand" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="companyLabel">
                    <span>Selecionar</span>
                </button>
                <div class="dropdown-menu" id="dropdown-company">
                </div>
            </div>
        </div>
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
                <a class="nav-link" onclick="window.location.href = '/login'">Sair</a>
            </li>
        </ul>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <button class="nav-link active" data-page="graph" id="chart">
                                <i class="fa-solid fa-chart-simple feather feather-layers"></i>
                                Gráficos <span class="sr-only">(atual)</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" data-page="map" id="map">
                                <i class="fa-solid fa-map feather feather-layers"></i>
                                Mapas
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" data-page="dispenser" id="dispenser">
                                <i class="fa-solid fa-bottle-water feather feather-layers" style="text-align:center"></i>
                                Gerenciamento
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <main role="main" id="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            </main>
        </div>

        <div id="loader" class="hide-loader">
            <i class="fa-solid fa-spinner rotating"></i>
        </div>
    </div>

    <br><br><br>
    <br><br><br>

    <?php
    echo "<script> var basePath = '" . asset('/res/') . "'</script>";
    ?>
    <script>
        $(document).ready(function() {
            moment.defineLocale('pt-br', {
                months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
                monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
                weekdays: 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
                weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
                weekdaysMin: 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
                longDateFormat: {
                    LT: 'HH:mm',
                    L: 'DD/MM/YYYY',
                    LL: 'D [de] MMMM [de] YYYY',
                    LLL: 'D [de] MMMM [de] YYYY [às] LT',
                    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] LT'
                },
                calendar: {
                    sameDay: '[Hoje às] LT',
                    nextDay: '[Amanhã às] LT',
                    nextWeek: 'dddd [às] LT',
                    lastDay: '[Ontem às] LT',
                    lastWeek: function() {
                        return (this.day() === 0 || this.day() === 6) ?
                            '[Último] dddd [às] LT' : // Saturday + Sunday
                            '[Última] dddd [às] LT'; // Monday - Friday
                    },
                    sameElse: 'L'
                },
                relativeTime: {
                    future: 'em %s',
                    past: '%s atrás',
                    s: 'segundos',
                    m: 'um minuto',
                    mm: '%d minutos',
                    h: 'uma hora',
                    hh: '%d horas',
                    d: 'um dia',
                    dd: '%d dias',
                    M: 'um mês',
                    MM: '%d meses',
                    y: 'um ano',
                    yy: '%d anos'
                },
                ordinal: '%dº'
            });

            $.get('api/companies', function(data) {
                $('#loader').addClass('hide-loader');

                companyList = data

                data.forEach(element => {
                    $('#dropdown-company').append(
                        '<a class="dropdown-item company-option" href="" data-company-id="' +
                        element.id +
                        '" data-company-name="' +
                        element.company_name +
                        '" data-company-doc="' +
                        element.company_document +
                        '">' +
                        element.company_name +
                        '</a>'
                    )

                    $('#dropdown-company').append('<div class="dropdown-divider"></div>')
                });

                // seta o evento de trocar de empresa
                $('#dropdown-company a').on('click', function() {
                    $('#dropdown-company a').removeClass('active')
                    $(this).addClass('active')

                    $('#companyLabel').empty()
                    $('#companyLabel').append('<span>' + $(this).data('companyName') + '</span>')
                    $('#companyLabel').attr('data-company-id', $(this).data('companyId'))

                    $('#dropdown-company').removeClass('show')
                })

                $.get("{{ asset('res/components/chart.html') }}", function(data) {
                    $('#main').html(data)
                    chartInit()
                });

                // $.get("{{ asset('res/components/map.html') }}", function(data) {
                //     $('#main').html(data)
                //     mapInit()
                // });

                $('.nav-link').on('click', function() {
                    $('.nav-link').removeClass('active')
                    $(this).addClass('active')

                    $('#main').empty()

                    destroyChart()
                    destroyDispenser()
                    destroyMap()

                    switch ($(this).attr('id')) {
                        case 'dispenser':
                            $.get("{{ asset('res/components/dispenser.html') }}", function(data) {
                                $('#main').html(data)
                                dispenserInit()
                            });
                            break;
                        case 'map':
                            $.get("{{ asset('res/components/map.html') }}", function(data) {
                                $('#main').html(data)
                                mapInit()
                            });
                            break;
                        case 'chart':
                            $.get("{{ asset('res/components/chart.html') }}", function(data) {
                                $('#main').html(data)
                                chartInit()
                            });
                            break;
                    }
                })

            }).fail(function(e) {
                console.log(e)
            })
        })
    </script>

</body>

</html>