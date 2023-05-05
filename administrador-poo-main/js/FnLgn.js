function vFm() {
    let tUs = document.getElementById('tUsLgn');
    let tPw = document.getElementById('tPwLgn');
    if (tUs.value == '' || tPw.value == '') { alert("Es necesario completar todos los campos");
    } else {
        usuario = { usuario: tUs.value, password: tPw.value, tipo: 'A' }

        axios({ method: 'POST', url: 'http://localhost:4200/usuarios/login/A', data: usuario
        })
            .then(res => {
                if (res.data.codigo == 0) {
                    modalBodySesion.innerHTML =
                        `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                        <div class="error my-3">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <button class="bt btW boR my-4" onclick="cerrarModal();">Aceptar</button>`;
                    abrirModal();
                } else {
                    window.open(`administrador.html?ses=${res.data.idSession}&nom=${res.data.nombre}`, '_self');
                }
                
            })
    }
}
//----------------------VMODAL--------------------------------

function abrirModal() { $('#modal').modal('show'); }

function cerrarModal() {
    $('#modal').modal('hide');
    modalBodySesion.parentNode.classList.remove('boG');
    modalBodySesion.parentNode.classList.add('boR');
}

//-----------------------dgEBI-----------------------------------
secLg = document.getElementById('secLg');
modalBodySesion = document.getElementById('modal-body-sesion');
