let numeroSecreto = 0;
let intentos = 1;
let juegos = 0;
let numeroMaximo = parseInt(prompt("Digite el número secreto maximo"));
let juegosMaximo = parseInt(prompt("Digite el numero maximo de jugadas"));
let intentosMaximo = parseInt(prompt("Digite el numero maximo de intentos"));
let listaNumerosSorteados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroUsuario == numeroSecreto) {
        // El usuario acertó.
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos == 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#botonIntentar').setAttribute('disabled', 'true');
    } else if (intentos == intentosMaximo) {
        // El usuario alcanzo el numero maximo de intentos.
        asignarTextoElemento('p', 'Alcanzaste el número maximo de intentos');
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#botonIntentar').setAttribute('disabled', 'true');
    } else {
        // El usuario no acertó.
        if (numeroUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.ceil(Math.random() * numeroMaximo);
    
    // Verficamos si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        document.querySelector('#botonIntentar').setAttribute('disabled', 'true');
    } else if (juegos == juegosMaximo) {
        asignarTextoElemento('p', 'Alcanzaste el numero maximo de jugadas');
        document.querySelector('#botonIntentar').setAttribute('disabled', 'true');
    } else {
        // Verificamos si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            juegos++;
            document.querySelector('#botonIntentar').removeAttribute('disabled');
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    // Indicar mensaje de intervalo de números
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}:`);
    // Generar el número aleatorio
    numeroSecreto = generarNumeroSecreto();
    // Inicializar el número de intentos
    intentos = 1;
}

function reiniciarJuego() { 
    // Limpiar la caja
    limpiarCaja();
    // Inicializar valores y indicar mensaje de intervalos de números
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();