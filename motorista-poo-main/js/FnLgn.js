function vFm1() {
    let tUs = document.getElementById('tUsLgn'); let tPw = document.getElementById('tPwLgn');
    if (tUs.value == '' || tPw.value == '') { alert("Es necesario completar todos los campos");
    } else {
        usuario = {
            usuario: tUs.value, password: tPw.value, tipo: 'B',
        }

        axios({
            method: 'POST',
            url: 'http://localhost:4200/usuarios/login/B',
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
                    window.open(`repartidor.html?ses=${res.data.idSession}&id=${res.data.id}&nom=${res.data.nombre}`, '_self')
                }
                
            })
    }
}
//----------------------Show-Reg-Lgn--------------------------------
function aReg() { sectionLogin.style.display = 'none'; sectionRegistration.style.display = 'block'; }

function aLgn() { sectionLogin.style.display = 'block'; sectionRegistration.style.display = 'none'; }

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
            tipo: 'B',
            aprobado: null
        }

        axios({
            method: 'POST',
            url: 'http://localhost:4200/usuarios/registro/B',
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
                    modalBodySesion.parentNode.classList.add('boG');
                    modalBodySesion.parentNode.classList.remove('boR');
                    modalBodySesion.innerHTML =
                        `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                        <div class="check my-3">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <button class="bt btW boG my-4" onclick="cerrarModal();">Aceptar</button>`;
                }
                
            })
        abrirModal();
    }
}

//----------------------VMODAL--------------------------------
function abrirModal() { $('#modal').modal('show'); }

function cerrarModal() { $('#modal').modal('hide'); 
    modalBodySesion.parentNode.classList.remove('boG');
    modalBodySesion.parentNode.classList.add('boR');
}

//-----------------------dgEBI-----------------------------------
sectionLogin = document.getElementById('secLg');
sectionRegistration = document.getElementById('secReg');
modalBodySesion = document.getElementById('modal-body-sesion');