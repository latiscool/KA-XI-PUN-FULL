'use strict';
const unameAcceso = document.getElementById('uname');
const pwdAcceso = document.getElementById('pwd');
const juegoOculto = (document.getElementById('k-xi-pun').style.display =
  'none');

// VALIDACION CAMPOS
function Validar() {
  const userData = 'luis';
  const passData = '1234';
  const user = unameAcceso.value;
  const pass = pwdAcceso.value;

  if (user === '' || pass === '') {
    alert('Debe Completar Informacion');
  } else if (user !== userData || pass !== passData) {
    alert('Datos invalidos, vuelva intentar');
  } else {
    // OCULTA SEECION FORMULARIO Y MUESTRA SECCION JUEGO
    document.getElementById('k-xi-pun').style.display = 'block';
    document.getElementById('acceso').style.display = 'none';
  }
}

function setAction(form) {
  form.action = 'BIENVENIDOS...!!!';
  alert(form.action);
  return false;
}
