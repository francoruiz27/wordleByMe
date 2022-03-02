const querty = "QWERTYUIOPASDFGHJKLÑ<ZXCVBNM.";
let rta = 'BARCO';
let iLetra = 1;
let iPalabra = 1;
let intento = '';
const idLetras=document.getElementById("letras");
const idDisposicionTeclado=document.getElementById("disposicionTeclado");
const container=document.querySelector(".contenedor");
const titulo=document.getElementById("titulo");
 
// funcion para mostrar las letras del teclado
// tiene que recibir el listado de letras a mostrar
const mostrarLetras = listadoLetras => {
    idLetras.innerHTML="";
    // añadimos las letras
    listadoLetras.split('').map(el => {
        let span=document.createElement("span");
        span.addEventListener("click", teclaPulsada);
        span.innerText=el;
        if (el=="<") {
            span.classList.add("enviar");
            span.innerHTML = 'ENVIAR';
        }
        if (el==".") {
            span.innerHTML = '<|X|';
            span.classList.add("borrar");
        }
        idLetras.appendChild(span);
    });
}

mostrarLetras(querty);
 
function teclaPulsada(e) {
    const tecla=this.classList && this.classList.contains("space") ? " " : this.innerText;
    console.log(tecla);
    if (6>iLetra>0 && 0<iPalabra<7 && tecla != 'ENVIAR' && tecla != '<|X|') {
        clase = '.p'+iPalabra + '.l' + iLetra;
        let letractual = document.querySelector(clase);
        letractual.innerHTML = tecla;
        iLetra += 1;
        intento += tecla;
    }
    if (tecla == 'ENVIAR' && iLetra == 6) {
        if(intento == rta) {
            container.classList.add('ganar');
            titulo.innerHTML = 'GANASTE!';
        } 
        else {
            for (i in rta) {
                aux = 1+parseInt(i);
                clase = '.p'+iPalabra + '.l' + (aux);
                let letractual = document.querySelector(clase);
                if (rta.charAt(i) == intento.charAt(i)) {
                    letractual.classList.add('acierto');
                }
                else if (rta.includes(intento.charAt(i))) {
                    letractual.classList.add('malPos');
                } 
                else {
                    letractual.classList.add('fail'); 
                }
            }
            iPalabra += 1;
            iLetra = 1;    
            intento = '';    
        }
    }
    if (tecla == '<|X|' && iLetra > 0) {
        iLetra -= 1;
        clase = '.p'+iPalabra + '.l' + iLetra;
        let letractual = document.querySelector(clase);
        letractual.innerHTML = '';
        intento = intento.substring(0, intento.length - 1);
    }
    if (iPalabra == 7) {
        container.classList.add('perder');
        titulo.innerHTML = 'PERDISTE!';
    }
}
 
