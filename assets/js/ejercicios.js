$(document).ready(function(){

    $('#opeBtn').click(function(){
        var num1 = parseInt( $('#num1').val().trim());
        var num2 = parseInt( $('#num2').val().trim());
        if(isNaN(num1) || isNaN (num2) ){
            $('#resul').text("Ingrese solo números validos");
            return;
        }
        var tipoOpe = $('#tipoOpe').val();

        switch(tipoOpe){
            case 'suma': 
                $('#resul').text(num1 + num2);
                break;
            case 'resta': 
                $('#resul').text(num1 - num2);
                break;
            case 'multi': 
                $('#resul').text(num1 * num2);
                break;
            case 'divi': 
                if(num2 == 0){
                    $('#resul').text("No se puede dividir entre 0");
                }else{
                    $('#resul').text(num1 / num2);
                }
                break;
            default: 
                $('#resul').text("No especificado");
            break;
        }

    });

    $('#convBtn').click(function(){
        var conv1 = $('#conv1').val();
        var conv2 = $('#conv2').val();
        var num = $('#convBase').val().trim();

        if(num === ""){
            $('#convResul').text("Por favor, ingrese un valor");
            return;
        }

        var bases = {
            'dec': 10,
            'bin': 2,
            'oct': 8,
            'hex': 16
        };

        var baseOrigen = bases[conv1];
        var baseDestino = bases[conv2];

        var numeroDecimal = parseInt(num, baseOrigen);

        if(isNaN(numeroDecimal)){
            $('#convResul').text("El número no pertenece a la base seleccionada");
            return;
        }

        var resultado = numeroDecimal.toString(baseDestino);

        if(conv2 === 'hex') {
            resultado = resultado.toUpperCase();
        }

        $('#convResul').text(resultado);
    });

    $('#fiboBtn').click(function(){
        var fibo = [0,1];
        var n = parseInt($("#fibo").val().trim());
        if(isNaN(n) || n <0){
            $('#fiboResul').text("Ingrese un número entero no negativo");
            return;
        }

        for(var i = 2; i <= n-1; i++){
            fibo[i] = fibo[i -1] + fibo[i-2];
        }

        $('#fiboResul').text(fibo);
    });

    $('#piraBtn').click(function(){
        $('#piraResul').empty();
        var n = parseInt($("#pira").val().trim());
        if(isNaN(n)){
            $('#piraResul').text("Ingrese un número entero o negativo");
            return;
        }

        if(n > 0){
            for(var i = 1; i <= n; i++){

                for(var j = i; j < n; j++){
                    $('#piraResul').append("&nbsp;");
                }

                for(var k = 1; k <= (2 * i -1); k++){
                    $('#piraResul').append("*");
                }
                $('#piraResul').append("<br>");
            }
            return;
        }

        if(n < 0){
            n = n * -1;
            for(var i = n; i >= 1; i--){

                for(var j = i; j < n; j++){
                    $('#piraResul').append("&nbsp;");
                }

                for(var k = 1; k <= (2 * i -1); k++){
                    $('#piraResul').append("*");
                }
                $('#piraResul').append("<br>");
            }
            return;
        }
    });

    $('#agregarBtn').click(function(){
        var num = parseFloat($('#cant').val().trim());

        $('#alerta').text("");
        if(isNaN(num)){
            $('#alerta').text("Ingrese un número valido");
            return;
        }

        $('#lblCantidad').append(num + " ");
        $('#cant').val("");
    });

    $('#ordenarBtn').click(function(){
        var numeros = $('#lblCantidad').text().trim().split(" ").filter(function(n){ return n !== ""; }).map(Number);
        var orden = $('#orden').val();

        if(orden === "asc"){
            var numAsc = numeros.sort(function(a,b){return a-b;});
            $('#lblCantidad').text(numAsc.join(" "));
        }

        if(orden === "desc"){
            var numDesc = numeros.sort(function(a,b){return b-a;});
            $('#lblCantidad').text(numDesc.join(" "));
        }
    });

    $('#limpiarBtn').click(function(){
        $('#lblCantidad').text(""); 
        $('#cant').val("");
        $('#alerta').text("");
    });


});
