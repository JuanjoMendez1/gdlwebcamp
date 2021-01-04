(function() {
    "use strict";



    var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded', function() {

        var map = L.map('mapa').setView([19.043744, -98.791863], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([19.043744, -98.791863]).addTo(map)
            .bindPopup('GDLWebcamp 2020 <br> Boletos disponibles.')
            .openPopup()
        console.log('Listo');

        // Campos Datos usuarios
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        // Campos pases

        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        // Botones y divs
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var listaProductos = document.getElementById('lista_productos');
        var suma = document.getElementById('suma_total');

        // Extras
        var camisas = document.getElementById('camisa_evento');
        var etiquetas = document.getElementById('etiquetas');

        calcular.addEventListener('click', calcularMontos);

        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarEmail);

        function validarCampos() {
            if (this.value === '') {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'Este campo es obligatorio';
                this.style.border = '1px solid Red';
                errorDiv.style.border = '1px solid red'
            } else {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc'
            }
        }

        function validarEmail() {
            if (this.value.indexOf("@") > -1) {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #cccccc'
            } else if (this.value === '') {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'Este campo es obligatorio';
                this.style.border = '1px solid Red';
                errorDiv.style.border = '1px solid red'
            } else {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'Debe tener un @';
                this.style.border = '1px solid Red';
                errorDiv.style.border = '1px solid red'
            }
        }

        function calcularMontos(event) {
            event.preventDefault();
            if (regalo.value === '') {
                alert("Se te olvido escoger tu regalo");
                regalo.focus();
            } else {
                var boletoDia = parseInt(pase_dia.value, 10) || 0,
                    boleto2Dias = parseInt(pase_dosdias.value, 10) || 0,
                    boletoCompleto = parseInt(pase_completo.value, 10) || 0,
                    cantCamisas = parseInt(camisas.value, 10) || 0,
                    cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

                var totalPagar = (boletoDia * 30) + (boleto2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                console.log(totalPagar);

                var listadoProductos = [];
                if (boletoDia == 1) {
                    listadoProductos.push(boletoDia + ' Pase por dia');
                } else if (boletoDia >= 2) {
                    listadoProductos.push(boletoDia + ' Pases por dia');
                }
                if (boleto2Dias == 1) {
                    listadoProductos.push(boleto2Dias + ' Pase por 2 dias');
                } else if (boleto2Dias >= 2) {
                    listadoProductos.push(boleto2Dias + ' Pases por 2 dias');
                }
                if (boletoCompleto == 1) {
                    listadoProductos.push(boletoCompleto + ' Pase completo');
                } else if (boletoCompleto >= 2) {
                    listadoProductos.push(boletoCompleto + ' Pases completos');
                }
                if (cantCamisas == 1) {
                    listadoProductos.push(cantCamisas + ' Camisa');
                } else if (cantCamisas >= 2) {
                    listadoProductos.push(cantCamisas + ' Camisas');
                }
                if (cantEtiquetas == 1) {
                    listadoProductos.push(cantEtiquetas + ' Etiqueta');
                } else if (cantEtiquetas >= 2) {
                    listadoProductos.push(cantEtiquetas + ' Etiquetas');
                }

                listaProductos.style.display = "block";
                listaProductos.innerHTML = '';
                for (var i = 0; i < listadoProductos.length; i++) {
                    listaProductos.innerHTML += listadoProductos[i] + '<br/>'
                }
                suma.innerHTML = "$ " + totalPagar.toFixed(2);
            }
        }

        function mostrarDias() {
            var boletoDia = parseInt(pase_dia.value, 10) || 0,
                boleto2Dias = parseInt(pase_dosdias.value, 10) || 0,
                boletoCompleto = parseInt(pase_completo.value, 10) || 0;

            var diasElegidos = [];
            if (boletoDia >= 1) {
                diasElegidos.push('viernes');
                console.log(diasElegidos);
            }
            if (boleto2Dias >= 1) {
                diasElegidos.push('viernes', 'sabado');
                console.log(diasElegidos);
            }
            if (boletoCompleto >= 1) {
                diasElegidos.push('viernes', 'sabado', 'domingo');
                console.log(diasElegidos);
            }
            for (var i = 0; i < diasElegidos.length; i++) {
                document.getElementById(diasElegidos[i]).style.display = 'block'
            }
        }

    });
    // DOM CONTENT LOADED

})();