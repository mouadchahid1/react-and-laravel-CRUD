<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
   <link rel="stylesheet" href="{{asset("js/bootstrap.min.css")}}"> 
   <link rel="stylesheet" href="{{asset('js/code.jquery.com_jquery-3.7.0.min.js')}}">
    <title>Laravel React Crud</title>
</head>
<body>
    <div class="container-xl bg-light" id="app"> 

    </div>
   
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    <!-- les scripts --> 
    <script src="{{asset('js/bootstrap.min.js')}}"></script>
</body>
</html>