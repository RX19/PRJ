function vFmF() {
    let txtusuario = document.getElementById('usLgn');
    let txtpassword = document.getElementById('pwLgn');
    if (usLgn.value == '' || pwLgn.value == '') {
        alert("Por favor, llene todos los campos.");
    } else {
        usuario = {
            usuario: usLgn.value, password: pwLgn.value, tipo: 'B', }
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
                    <button class="btn bW bO my-4" onclick="cerrarModal();">Aceptar</button>`;
                    abrirModal();
                } else {
                    window.open(`repartidor.html?ses=${res.data.idSession}&id=${res.data.id}&nom=${res.data.nombre}`, '_self')
                }
                
            })
    }
}

function aReg() { secLgn.style.display = 'none'; secReg.style.display = 'block'; }

function vFmS() {
    let tNam = document.getElementById('tNam-registration');
    let tUs = document.getElementById('tUs-registration');
    let tPw = document.getElementById('tPw-registration');
    if (tNam.value == '' || tUs.value == '' || tPw.value == '') {
        alert("Por favor, llene todos los campos.");
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
                    <button class="btn bW bR my-4" onclick="cerrarModal();">Aceptar</button>`;
                    abrirModal();
                } else {
                    modalBodySesion.parentNode.classList.add('boG');
                    modalBodySesion.parentNode.classList.remove('boR');
                    modalBodySesion.innerHTML =
                        `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                        <div class="check my-3">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <button class="btn bW boG my-4" onclick="cerrarModal();">Aceptar</button>`;
                }
                
            })
        abrirModal();
    }
}

function oLgn() { secLgn.style.display = 'block'; secReg.style.display = 'none'; }

function abrirModal() { $('#modal').modal('show'); }

function cerrarModal() {
    $('#modal').modal('hide');
    modalBodySesion.parentNode.classList.remove('boG');
    modalBodySesion.parentNode.classList.add('boR');
}

//######################
sectionLogin = document.getElementById('section-login');
sectionRegistration = document.getElementById('section-registration');
modalBodySesion = document.getElementById('modal-body-sesion');