<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="connect-src * 'unsafe-inline'; font-src 'self' data:;">

    <title>Dispenser v0.2.5</title>

    <link rel="stylesheet" href="{{ asset('res/css/bootstrap.min.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/dashboard.css') }}" crossorigin="anonymous">

    <script src="{{ asset('res/js/popper.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/jquery-3.6.1.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/bootstrap.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/Chart.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/feather.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/index.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/graph.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/moment.js') }}" crossorigin="anonymous"></script>

    <link href="{{ asset('res/src/fontawesome-free-6.2.0-web/css/all.min.css') }}" rel="stylesheet">

    <link rel="icon" href="{{ asset('/res/bottle-water.svg') }}" type="image/x-icon">

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
                <button class="btn btn-secondary btn-sm dropdown-toggle select-brand" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="companyLabel">
                    <span>Selecionar</span>
                </button>
                <div class="dropdown-menu" id="dropdown-company">
                </div>
            </div>
        </div>
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
                                Dispenser
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <main role="main" id="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            </main>
        </div>
    </div>

    <br><br><br>
    <br><br><br>

    <script>
        $(document).ready(function() {
            $.get("{{ asset('res/components/chart.html') }}", function(data) {
                $('#main').html(data)
                chartInit()
            });

            $('.nav-link').on('click', function() {
                $('.nav-link').removeClass('active')
                $(this).addClass('active')

                $('#main').empty()

                switch ($(this).attr('id')) {
                    case 'dispenser':
                        break;
                    case 'map':
                        break;
                    case 'chart':
                        $.get("{{ asset('res/components/chart.html') }}", function(data) {
                            $('#main').html(data)
                            chartInit()
                        });
                        break;
                }
            })
        })
    </script>
</body>

</html>