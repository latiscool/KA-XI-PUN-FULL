'use strict';
let partida = [];
let puntajeTotal;
let sesionJuegos;
const resultadoSesion = document.getElementById('resultado-sesion');
const registroPuntos = document.getElementById('registro-puntaje');

// LOCALSTORAGE DEL RESULTADO DE LA SESION (PERSISTENTE)
window.addEventListener('DOMContentLoaded', () => {
  sesionJuegos = localStorage.getItem('kxupin-log');
  let puntajeJuego = (puntajeTotal = []);
  let strSplit = sesionJuegos.split(',');
  sesionJuegos ? (puntajeTotal = strSplit) : puntajeJuego;
  puntajeTotal = puntajeTotal.map(function (kachi) {
    return parseInt(kachi);
  });
  formatoAnotacion(puntajeTotal);
  return puntajeTotal;
});

// SELECCION DEL ROBOT
let robotSeleccion = () => {
  const robotOpcion = document.getElementById('robot');
  const listaOpciones = ['fa-fist-raised', 'fa-hand-paper', 'fa-hand-scissors'];
  const robotRandom = Math.floor(Math.random() * 3);
  robotOpcion.innerHTML = ` <i class="fas ${listaOpciones[robotRandom]} fa-10x" value=<"${listaOpciones[robotRandom]}"></i>`;
  return listaOpciones[robotRandom];
};

// SELECCION HUMANO
let seleccionHumano = (jugadaHumano) => {
  const humanOpcion = document.getElementById('humano');
  let vencedor;
  //IMPRIME EN  EL HTML EL FONTAWESOME SELECCIONADO POR HUMANO
  humanOpcion.innerHTML = ` <i class="fas ${jugadaHumano} fa-10x" value=<"${jugadaHumano}"></i>`;
  // ELIGIENDO EL GANADOR
  //TENIENDO LAS DOS SELECCIONES (ARGUMENTOS) SALTO A LINEA 95 - vencedorSesion
  robotSeleccion();
  vencedor = vencedorSesion(jugadaHumano, robotSeleccion());
  resultadoSesion.innerText = vencedor;
  anotacion(vencedor);
  anotacionFinal();
};

// CAPTURANDO EVENTO DE LA SELECCION HUMANO (ARGUMENTOS)
document.getElementById('fa-fist-raised').addEventListener('click', () => {
  seleccionHumano('fa-fist-raised');
});
document.getElementById('fa-hand-paper').addEventListener('click', () => {
  seleccionHumano('fa-hand-paper');
});
document.getElementById('fa-hand-scissors').addEventListener('click', () => {
  seleccionHumano('fa-hand-scissors');
});

// CONFIGURACION DE LA ANOTACION EN PANTALLA DEL RESULTADO DE LA SESION
let formatoAnotacion = (resultado) => {
  registroPuntos.innerText = '';
  resultado.forEach((z) => {
    let h5 = document.createElement('h5');
    let content = document.createTextNode(z);
    registroPuntos.appendChild(h5);
    h5.appendChild(content);
  });
};

//OTORGANDO PUNTAJE
let anotacion = (resultado) => {
  if (resultado === 'Humano Gana') {
    partida.push(100);
    if (resultado === 'Robot Gana') {
      partida.push(-30);
    }
  } else {
    partida.push(0);
  }
};

let anotacionFinal = () => {
  if (partida.length >= 10) {
    puntajeTotal.push(
      partida.reduce((a, b) => {
        return a + b;
      }, 0)
    );
    partida = [];
    formatoAnotacion(puntajeTotal);
    localStorage.setItem('kxupin-log', puntajeTotal);
  }
  if (puntajeTotal.length >= 5) {
    puntajeTotal.shift();
  }
};

//DETERMINANDO EL VENCEDOR DE LA SESION
let vencedorSesion = (jugadaHumano, robotSeleccion) => {
  let resultado = '';
  if (jugadaHumano === robotSeleccion) {
    resultado = 'Empate';
  } else if (
    (jugadaHumano === 'fa-hand-scissors' &&
      robotSeleccion === 'fa-hand-paper') ||
    (jugadaHumano === 'fa-hand-paper' && robotSeleccion === 'fa-fist-raised') ||
    (jugadaHumano === 'fa-fist-raised' && robotSeleccion === 'fa-hand-scissors')
  ) {
    resultado = `Humano Gana`;
  } else {
    resultado = `Robot Gana  `;
  }
  return resultado;
};
