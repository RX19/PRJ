function vFm1() {
    let tUs = document.getElementById('tUsLgn'); let tPw = document.getElementById('tPwLgn');
    if (tUs.value == '' || tPw.value == '') { alert("Es necesario completar todos los campos");
    } else {
        usuario = { usuario: tUs.value, password: tPw.value, tipo: 'C', }

        axios({
            method: 'POST',
            url: 'http://localhost:4200/usuarios/login/C',
            data: usuario
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
                    window.open(`cliente.html?id=${res.data.id}&ses=${res.data.idSession}&nom=${res.data.nombre}`, '_self');
                }
                
            })
    }
}
//----------------------Show-Reg-Lgn--------------------------------
function aReg() { secLg.style.display = 'none'; secReg.style.display = 'block'; }

function aLgn() { secLg.style.display = 'block'; secReg.style.display = 'none'; }

//----------------------Create-Account--------------------------------
function vFm2() {
    let tNam = document.getElementById('tNamReg'); let tUs = document.getElementById('tUsReg'); let tPw = document.getElementById('tPwReg');
    if (tNam.value == '' || tUs.value == '' || tPw.value == '') {
        alert("Es necesario completar todos los campos");
    } else {
        usuario = {
            nombre: tNam.value,
            usuario: tUs.value,
            password: tPw.value,
            tipo: 'C',
            carrito: []
        }

        axios({
            method: 'POST',
            url: 'http://localhost:4200/usuarios/registro/C',
            data: usuario
        })
            .then(res => {
                if (res.data.codigo == 0) {
                    modalBodySesion.parentNode.classList.remove('boG');
                    modalBodySesion.parentNode.classList.add('boR');
                    modalBodySesion.innerHTML =
                        `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                        <div class="error my-3">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <button class="bt btW boR my-4" onclick="cerrarModal();">Aceptar</button>`;
                } else {
                    modalBodySesion.parentNode.classList.add('boG');
                    modalBodySesion.parentNode.classList.remove('boR');
                    modalBodySesion.innerHTML =
                        `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                        <div class="check my-3">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <button class="bt btW boG my-4" onclick="cerrarModal();">Aceptar</button>`;
                }
                abrirModal();
            })
    }
}

//----------------------VMODAL--------------------------------

function abrirModal() { $('#modal').modal('show'); }

function cerrarModal() { $('#modal').modal('hide'); }

//-----------------------dgEBI-----------------------------------
secLg = document.getElementById('secLg');
secReg = document.getElementById('secReg');
modalBodySesion = document.getElementById('modal-body-sesion');