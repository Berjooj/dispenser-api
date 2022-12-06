<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="connect-src * blob:; font-src * data:;img-src * data:;">
    <title>Login</title>

    <link rel="stylesheet" href="{{ asset('res/css/bootstrap.min.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/dashboard.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/dispenser.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/app.css') }}" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('res/css/map.css') }}" crossorigin="anonymous">

    <script src="{{ asset('res/js/popper.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/jquery-3.6.1.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/bootstrap.min.js') }}" crossorigin="anonymous"></script>
    <script src="{{ asset('res/js/moment.js') }}" crossorigin="anonymous"></script>

    <style>
        html,
        body {
            height: 100%;
        }

        body {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            padding-top: 40px;
            padding-bottom: 40px;
            background-color: #f5f5f5;
        }

        .form-signin {
            width: 100%;
            max-width: 330px;
            padding: 15px;
            margin: auto;
        }

        .form-signin .checkbox {
            font-weight: 400;
        }

        .form-signin .form-control {
            position: relative;
            box-sizing: border-box;
            height: auto;
            padding: 10px;
            font-size: 16px;
        }

        .form-signin .form-control:focus {
            z-index: 2;
        }

        .form-signin input[type="email"] {
            margin-bottom: -1px;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
        }

        .form-signin input[type="password"] {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    </style>
</head>

<body class="text-center">
    <form class="form-signin" action="../">
        <img class="mb-4" src="{{ asset('res/icon.png') }}" alt="" width="180" height="180">
        <h1 class="h3 mb-3 font-weight-normal">Faça login</h1>
        <label for="inputEmail" class="sr-only">Endereço de email</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Seu email" required="" autofocus="">
        <label for="inputPassword" class="sr-only">Senha</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Senha" required="">
        <div class="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"> Lembrar de mim
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        <p class="mt-5 mb-3 text-muted">Copyright © 2022 Dispenser API</p>
    </form>
</body>

</html>