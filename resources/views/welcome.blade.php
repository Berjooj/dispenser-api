<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="connect-src * 'unsafe-inline'; font-src 'self' data:;">

    <title>Dispenser v0.1</title>

    <link rel="stylesheet" href="{{ asset('res/css/bootstrap.min.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/dashboard.css') }}" crossorigin="anonymous">

    <script src="{{ asset('res/js/popper.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/jquery-3.6.1.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/bootstrap.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/Chart.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/feather.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/index.js') }}" crossorigin="anonymous"></script>

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
                            <button class="nav-link active" data-page="graph">
                                <i class="fa-solid fa-chart-simple feather feather-layers"></i>
                                Gráficos <span class="sr-only">(atual)</span>
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" data-page="map">
                                <i class="fa-solid fa-map feather feather-layers"></i>
                                Mapas
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" data-page="dispenser">
                                <i class="fa-solid fa-bottle-water feather feather-layers" style="text-align:center"></i>
                                Dispenser
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;">
                    <div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                        <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>
                    </div>
                    <div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                        <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
                    </div>
                </div>
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Dashboard</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group mr-2">
                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-sm btn-outline-secondary dropdown-toggle" id="chartTypeButton">
                                Selecionar
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" id="dropdown-chart-type">
                                <a class="dropdown-item" href="#" data-chartType="bar" type="button">
                                    <i class="fa-solid fa-chart-simple feather feather-calendar"></i>
                                    <span> Barra</span>
                                </a>
                                <a class="dropdown-item" href="#" data-chartType="line" type="button">
                                    <i class="fa-solid fa-chart-line feather feather-calendar"></i>
                                    <span> Linha</span>
                                </a>
                                <a class="dropdown-item" href="#" data-chartType="pie" type="button">
                                    <i class="fa-solid fa-chart-pie feather feather-calendar"></i>
                                    <span> Pizza</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <canvas class="my-4 w-100 chartjs-render-monitor" id="myChart" width="656" height="276" style="display: block; width: 656px; height: 276px;"></canvas>

                <div class="row">
                    <div class="col-md-6">
                        <h2>Usos</h2>
                        <div class="table-responsive">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Dispenser</th>
                                        <th>Capacidade</th>
                                        <th>Utilização</th>
                                        <th>Data Registro</th>
                                    </tr>
                                </thead>
                                <tbody id="table-uses">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h2>Fluxo</h2>
                        <div class="table-responsive">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Dispenser</th>
                                        <th>Status</th>
                                        <th>Data Registro</th>
                                    </tr>
                                </thead>
                                <tbody id="table-flow">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <br><br><br>
    <br><br><br>
</body>

</html>