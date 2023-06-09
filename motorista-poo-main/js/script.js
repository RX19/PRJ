function verificarSesion() {
    axios({
        method: 'get',
        url: `http://localhost:4200/sesiones/${idSession}`,
    })
        .then(res => {
            if (res.data.codigo == 0) {
                window.open(`login.html`, '_self');
            }
        })
}

function clSe() {
    axios({
        method: 'get',
        url: `http://localhost:4200/sesiones/cerrar/${idSession}`
    })
}

function llamarModal(orden) {
    if (orden == 'hide') {
        modalRepartidor.parentNode.classList.add('boGd');
        modalRepartidor.parentNode.classList.remove('boG');
        modalRepartidor.parentNode.classList.remove('boR');
    }
    $('#modal').modal(orden);
}

function chSe(valor) {
    let sectionActual = document.getElementById(`sec-${valor}`);
    switch (valor) {
        case 1:
            sectionActual.innerHTML = '<div class="tiSec boGd px-1">Ordenes disponibles</div>';

            axios({
                method: 'GET',
                url: 'http://localhost:4200/ordenes/disponibles'
            })
                .then(res => {
                    let ordenesDisponibles = res.data;

                    ordenesDisponibles.forEach(orden => {
                        sectionActual.innerHTML +=
                            `<div class="p-1">
                                <div class="boB p-1 radius cntVO">
                                    <h4 class="pl-2 texto-gris mt-2">${orden.nombre}</h4>
                                    <button class="bt btGd" onclick="abrirOrden(1); dibujarContenido(1, '${orden._id}');">ver orden</button>
                                </div>
                            </div>`;
                    });
                })

            break;

        case 2:
            sectionActual.innerHTML = '<div class="tiSec boGd px-1">Ordenes sin entregar</div>';

            axios({
                method: 'GET',
                url: `http://localhost:4200/ordenes/sinEntregar/${idRepartidor}`
            })
                .then(res => {
                    let ordenesSinEntregar = res.data;

                    ordenesSinEntregar.forEach(orden => {
                        sectionActual.innerHTML +=
                            `<div class="p-1">
                    <div class="boB p-1 radius cntVO">
                        <h4 class="pl-2 texto-gris mt-2">${orden.nombre}</h4>
                        <button class="bt btGd" onclick="abrirOrden(2); dibujarContenido(2, '${orden._id}');">Ver orden</button>
                    </div>
                </div>`;
                    });
                })

            break;

        case 3:
            sectionActual.innerHTML = '<div class="tiSec boGd px-1">Ordenes entregadas</div>';

            axios({
                method: 'GET',
                url: `http://localhost:4200/ordenes/entregadas/${idRepartidor}`
            })
                .then(res => {
                    let ordenesEntregadas = res.data

                    ordenesEntregadas.forEach(orden => {
                        sectionActual.innerHTML +=
                            `<div class="p-1">
                                <div class="boB p-1 radius cntVO">
                                    <h4 class="pl-2 texto-gris mt-2">${orden.nombre}</h4>
                                    <button class="bt btGd" onclick="abrirOrden(3); dibujarContenido(3, '${orden._id}');">Ver orden</button>
                                </div>
                            </div>`;
                    });
                })

            break;
    }

    document.getElementById('secFs').style.display = 'none';
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`sec-${i}`).style.display = 'none';
    }
    sectionActual.style.display = 'block';
}

function bck() {
    for (let i = 1; i <= 3; i++) {
        if (document.getElementById(`sec-${i}`).style.display == 'block') {
            document.getElementById(`sec-${i}`).style.display = 'none';
            document.getElementById('secFs').style.display = 'flex';
        }
        if (document.getElementById(`sec-${i}-1`).style.display == 'block') {
            document.getElementById(`sec-${i}-1`).style.display = 'none';
            document.getElementById(`sec-${i}`).style.display = 'block';
        }
    }
}

function abrirOrden(valor) {
    document.getElementById(`sec-${valor}-1`).style.display = 'block';
    document.getElementById(`sec-${valor}`).style.display = 'none';
}

function dibujarContenido(valor, idOrden) {

    sectionActual = document.getElementById(`sec-${valor}-1`);

    let productos = '';

    axios({
        method: 'GET',
        url: `http://localhost:4200/ordenes/${idOrden}`
    })
        .then(res => {
            ordenActual = res.data;

            ordenActual.envio.productos.forEach(producto => {
                productos += producto.cantidad + ' ' + producto.nombre + '; ';
            });

            switch (valor) {
                case 1:
                    sectionActual.innerHTML =
                        `<div class="tiSec boGd px-1">Detalle de la orden "${ordenActual.nombre}"</div>
                    <div class="boGd row mt-3 subsection pt-3">
                        <div class="tiSec boGd px-1">Informacion del cliente</div>
                        <div class="col-12 col-md-6">
                            <h6>Nombre:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.cliente.nombre}</h6>
                        </div>
                        <div class="col-12 col-md-6">
                            <h6>Celular:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.cliente.celular}</h6>
                        </div>
                        <div class="col-12">
                            <h6>Correo:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.cliente.correo}</h6>
                        </div>
                    </div>
                    <div class="boGd row mt-4 subsection py-3">
                        <div class="tiSec boGd px-1">Detalle del envio</div>
                        <div class="col-12 col-md-6">
                            <h6>Productos:</h6>
                            <h6 class="texto-gris ml-5">${productos}</h6>
                        </div>
                        <div class="col-12 col-md-6">
                            <h6>Empresa:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.empresa}</h6>
                        </div>
                        <div class="col-12 col-md-6">
                            <h6>Total a pagar:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.total.toFixed(2)} L.</h6>
                        </div>
                        <div class="col-12">
                            <h6>Dirección:</h6>
                            <h6 class="texto-gris pl-5">${ordenActual.envio.direccion}</h6>
                            <div id="mapa" style="width: 100%; height: 200px;" class="boG"></div>
                        </div>
                    </div>
                    <button class="bt btGd float-right mt-2 mr-2" onclick="tomarOrden('${idOrden}');">Tomar orden</button>`;

                    cargarMapa(ordenActual.envio.coordenadas.longitud, ordenActual.envio.coordenadas.latitud);

                    break;

                case 2:
                    sectionActual.innerHTML =
                        `<div class="tiSec boGd px-1">Detalle de la orden "${ordenActual.nombre}"</div>
                    <div class="boGd row mt-3 subsection pt-3">
                        <div class="tiSec boGd px-1">Informacion del cliente</div>
                        <div class="col-12 col-md-6">
                            <h6>Nombre:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.cliente.nombre}</h6>
                        </div>
                        <div class="col-12 col-md-6">
                            <h6>Celular:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.cliente.celular}</h6>
                        </div>
                        <div class="col-12">
                            <h6>Correo:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.cliente.correo}</h6>
                        </div>
                    </div>
                    <div class="boGd row mt-4 subsection py-3">
                        <div class="tiSec boGd px-1">Detalle del envio</div>
                        <div class="col-12 col-md-6">
                            <h6>Productos:</h6>
                            <h6 class="texto-gris ml-5">${productos}</h6>
                        </div>
                        <div class="col-12 col-md-6">
                            <h6>Empresa:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.empresa}</h6>
                        </div>
                        <div class="col-12 col-md-6">
                            <h6>Total a pagar:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.total.toFixed(2)} L.</h6>
                        </div>
                        <div class="col-12 mb-3">
                            <h6>Dirección:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.direccion}</h6>
                            <div id="mapa2" style="width: 100%; height: 200px;" class="boG"></div>
                        </div>
                        <div class="col-12 col-md-6">
                            <h6>Estado de la orden:</h6>
                        </div>
                        <div class="col-12 col-md-6 row mb-2 mx-auto">
                            <div class="col-6 p-1 text-center"><button id="boton-tomada" class="bt btR btDlv orden-tomada" onclick="estadoOrden('tomada', '${idOrden}');">Tomada</button></div>
                            <div class="col-6 p-1 text-center"><button id="boton-enCamino" class="bt boGd btDlv orden-enCamino" onclick="estadoOrden('enCamino', '${idOrden}');">En camino</button></div>
                            <div class="col-6 p-1 text-center"><button id="boton-enOrigen" class="bt boGd btDlv orden-enOrigen" onclick="estadoOrden('enOrigen', '${idOrden}');">En origen</button></div>
                            <div class="col-6 p-1 text-center"><button id="boton-enDestino" class="bt boGd btDlv orden-enDestino" onclick="estadoOrden('enDestino', '${idOrden}');">En destino</button></div>
                        </div>
                    </div>
                    <button class="bt btGd float-right mt-2 mr-2" onclick="estadoOrden('entregada', '${idOrden}');">Orden entregada</button>`;

                    cargarMapa2(ordenActual.envio.coordenadas.longitud, ordenActual.envio.coordenadas.latitud);
                    actualizarBotones(idOrden);

                    break;

                case 3:
                    sectionActual.innerHTML =
                        `<div class="tiSec boGd px-1">Detalle de la entrega</div>
                    <div class="row px-3">
                        <div class="col-12 col-md-6 py-1">
                            <h6>Orden:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.nombre}</h6>
                        </div>
                        <div class="col-12 col-md-6 py-1">
                            <h6>Cliente:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.cliente.nombre}</h6>
                        </div>
                        <div class="col-12 col-md-6 py-1">
                            <h6>Empresa:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.empresa}</h6>
                        </div>
                        <div class="col-12 col-md-6 py-1">
                            <h6>Productos:</h6>
                            <h6 class="texto-gris ml-5">${productos}</h6>
                        </div>
                        <div class="col-12 col-md-6 py-1">
                            <h6>Pago total:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.total.toFixed(2)}L. </h6>
                        </div>
                        <div class="col-12 col-md-6 py-1">
                            <h6>Precio base:</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.subtotal.toFixed(2)} L.</h6>
                        </div>
                        <div class="col-12 col-md-6 py-1">
                            <h6>ISV (15%):</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.isv.toFixed(2)} L.</h6>
                        </div>
                        <div class="col-12 col-md-6 py-1">
                            <h6>Comisión motorista (10%):</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.comisionMotorista.toFixed(2)} L.</h6>
                        </div>
                        <div class="col-12 col-md-6 py-1">
                            <h6>Comisión administrador (5%):</h6>
                            <h6 class="texto-gris ml-5">${ordenActual.envio.comisionAdministrador.toFixed(2)} L.</h6>
                        </div>
                        <div class="col-12 py-1">
                            <button class="bt btGd float-right mr-1" onclick="bck();">Aceptar</button>
                        </div>
                    </div>`;
            }
        })

}

function tomarOrden(idOrden) {

    axios({
        method: 'PUT',
        url: `http://localhost:4200/ordenes/${idOrden}`,
        data: { _id: idRepartidor }
    })
        .then(res => {
            modalRepartidor.innerHTML =
                `<h5 class="titulo-modal mt-2 mb-5 text-center">${res.data.mensaje}</h5>
                <div class="check mt-3 mb-4 text-center">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <div class="text-center">
                    <button class="bt btW boG my-4" onclick="llamarModal('hide'); bck(); chSe(1);"><h5 class="p-0 m-0">Aceptar</h5></button>
                </div>`;

            modalRepartidor.parentNode.classList.add('boG');
            modalRepartidor.parentNode.classList.remove('boR');
            modalRepartidor.parentNode.classList.remove('boGd');

            llamarModal('show');
        })
        .catch(error => {
            modalRepartidor.innerHTML =
                `<h4 class="titulo-modal mt-2 mb-5 text-center">${error.data.mensaje}</h4>
                <div class="check mt-3 mb-4 text-center">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <div class="text-center">
                    <button class="bt btW boG my-4" onclick="llamarModal('hide'); bck(); chSe(1);"><h5 class="p-0 m-0">Aceptar</h5></button>
                </div>`;

            modalRepartidor.parentNode.classList.remove('boG');
            modalRepartidor.parentNode.classList.add('boR');
            modalRepartidor.parentNode.classList.remove('boGd');

            llamarModal('show');
        })

}

function estadoOrden(estado, idOrden) {
    axios({
        method: 'GET',
        url: `http://localhost:4200/ordenes/${idOrden}`
    })
        .then(res => {
            let o = res.data;

            if (estado != 'entregada') {
                let botones = document.getElementsByClassName('btDlv');
                Array.from(botones).forEach(boton => {
                    boton.classList.add('boGd');
                    boton.classList.remove('btR');
                });
                document.getElementById(`boton-${estado}`).classList.add('btR');
                document.getElementById(`boton-${estado}`).classList.remove('boGd');

                o.envio.estado = estado;

            } else {

                o.estado = estado;

                let productos = '';
                o.envio.productos.forEach(producto => {
                    productos += producto.cantidad + ' ' + producto.nombre + '; ';
                });

                modalRepartidor.innerHTML =
                    `<div class="boGd pt-4 subsectionn-2 mx-auto my-2 row">
                    <div class="tiSec boGd px-1">Factura</div>
                    <div class="col-12 py-1">
                        <h6>Cliente:</h6>
                        <h6 class="texto-gris ml-5">${o.cliente.nombre}</h6>
                    </div>
                    <div class="col-12 py-1">
                        <h6>Empresa:</h6>
                        <h6 class="texto-gris ml-5">${o.envio.empresa}</h6>
                    </div>
                    <div class="col-12 py-1">
                        <h6>Productos:</h6>
                        <h6 class="texto-gris ml-5">${productos}</h6>
                    </div>
                    <div class="col-12 py-1">
                        <h6>Motorista:</h6>
                        <h6 class="texto-gris ml-5">${nombreMotorista}</h6>
                    </div>
                    <div class="col-12 py-1">
                        <h6>Dirección de entrega:</h6>
                        <h6 class="texto-gris ml-5">${o.envio.direccion}</h6>
                    </div>
                    <div class="col-12 py-1">
                        <h6>Pago del cliente:</h6>
                        <h6 class="texto-gris ml-5">${o.envio.total.toFixed(2)} L.</h6>
                    </div>
                    <div class="col-12 py-1">
                        <h6>Precio base:</h6>
                        <h6 class="texto-gris ml-5">${o.envio.subtotal.toFixed(2)} L.</h6>
                    </div>
                    <div class="col-12 py-1">
                        <h6>ISV (15%):</h6>
                        <h6 class="texto-gris ml-5">${o.envio.isv.toFixed(2)} L.</h6>
                    </div>
                    <div class="col-12 py-1">
                        <h6>Comisión motorista (10%):</h6>
                        <h6 class="texto-gris ml-5">${o.envio.comisionMotorista.toFixed(2)} L.</h6>
                    </div>
                    <div class="col-12 py-1">
                        <h6>Comisión administrador (5%):</h6>
                        <h6 class="texto-gris ml-5">${o.envio.comisionAdministrador.toFixed(2)} L.</h6>
                    </div>
                    <div class="col-12 py-1 text-center">
                        <button class="bt btGd text-center"><h5 class="b-0 m-0" onclick="llamarModal('hide'); bck(); chSe(2);">Finalizado</h5></button>
                    </div>
                </div>`;

                modalRepartidor.parentNode.classList.remove('boG');
                modalRepartidor.parentNode.classList.remove('boR');
                modalRepartidor.parentNode.classList.add('boGd');

                llamarModal('show');

            }

            axios({
                method: 'PUT',
                url: `http://localhost:4200/ordenes/tomada/${idOrden}`,
                data: o
            })

        })
}

function actualizarBotones(idOrden) {

    axios({
        method: 'GET',
        url: `http://localhost:4200/ordenes/${idOrden}`
    })
        .then(res => {
            let estado = res.data.envio.estado;
            let botones = document.getElementsByClassName('btDlv');
            Array.from(botones).forEach(boton => {
                boton.classList.add('boGd');
                boton.classList.remove('btR');
            });
            document.getElementById(`boton-${estado}`).classList.add('btR');
            document.getElementById(`boton-${estado}`).classList.remove('boGd');
        })
}

function obtenerParametro(valor){
    valor = valor.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    let expresionRegular = "[\\?&]" + valor + "=([^&#]*)";
    let regex = new RegExp(expresionRegular);
    let r = regex.exec( window.location.href );
    if( r == null )
        return "";
    else
        return decodeURIComponent(r[1].replace(/\ + /g, " "));
}

function edUs() {
    modalRepartidor.innerHTML = 
        `<div class="row my-4 mx-2">
            <h4 class="col-12 text-center titulo-modal mb-4">¿Qué quieres cambiar?</h4>
            <button class="bt btG col-12" style="height: 50px;" onclick="modUs();">Cambiar usuario</button>
            <button class="bt btGd col-12" style="height: 50px;" onclick="modPw();">Cambiar contrasena</button>
        </div>`;
    abrirModal();
}

function modUs() {
    modalRepartidor.innerHTML = 
        `<h4 class="text-center titulo-modal mt-4">Editar usuario</h4>
        <div>
            <h5 class="mt-3 text-left">Usuario actual:</h5>
            <input type="text" class="form-control boGd" id="tUsCu" required>
        </div>
        <div>
            <h5 class="mt-3 text-left">Nuevo usuario:</h5>
            <input type="text" class="form-control boGd" id="tUsNw" required>
        </div>
        <div>
            <h5 class="mt-3 text-left">Escribe tu contrasena:</h5>
            <input type="password" class="form-control boGd" id="tPw" required>
        </div>
        <div class="text-center mb-4">
            <button class="bt btG mt-3" onclick="vChUs();">Aceptar</button>
            <button class="bt btW mt-3" onclick="llamarModal('hide');">Cancelar</button>
        </div>`;
}

function modPw() {
    modalRepartidor.innerHTML = 
        `<h4 class="text-center titulo-modal mt-4">Editar contrasena</h4>
        <div>
            <h5 class="mt-3 text-left">Usuario:</h5>
            <input type="text" class="form-control boGd" id="tUsCu" required>
        </div>
        <div>
            <h5 class="mt-3 text-left">Contraseña actual:</h5>
            <input type="password" class="form-control boGd" id="tPwCu" required>
        </div>
        <div>
            <h5 class="mt-3 text-left">Nueva contrasena:</h5>
            <input type="password" class="form-control boGd" id="tPwNw" required>
        </div>
        <div>
            <h5 class="mt-3 text-left">Confirmar Nueva contrasena:</h5>
            <input type="password" class="form-control boGd" id="tPwNw1" required>
        </div>
        <div class="text-center mb-4">
            <button class="bt btG mt-2" onclick="vChPw();">Aceptar</button>
            <button class="bt btW mt-2" onclick="llamarModal('hide');">Cancelar</button>
        </div>`;
}

function vChUs() {
    let usuarioActual = document.getElementById('tUsCu').value;
    let nuevoUsuario = document.getElementById('tUsNw').value;
    let password = document.getElementById('tPw').value;

    if (usuarioActual != '' && nuevoUsuario != '' && password != '') {
        usuario = {
            usuario: usuarioActual,
            password: password,
            tipo: 'B'
        }
    
        axios({
            method: 'POST',
            url: 'http://localhost:4200/usuarios/login/B',
            data: usuario
        })
            .then(res => {
                if (res.data.codigo == 0) {
                    modalRepartidor2.parentNode.classList.remove('boGd');
                    modalRepartidor2.parentNode.classList.remove('boG');
                    modalRepartidor2.parentNode.classList.add('boR');
                    modalRepartidor2.innerHTML =
                        `<h5 class="titulo-modal my-4 text-center">Usuario actual o contrasena incorrectas</h5>
                        <div class="error my-3 text-center">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div class="text-center">
                        <button class="bt btW boR my-4" onclick="cerrarModal2(); llamarModal('show')">Aceptar</button>
                        </div>`;
                    llamarModal('hide');
                    abrirModal2();
                } else {
                    axios({
                        method: 'PUT',
                        url: `http://localhost:4200/usuarios/usuario/${idRepartidor}`,
                        data: {usuario: nuevoUsuario}
                    })
                        .then(() => {
                            modalRepartidor2.parentNode.classList.remove('boGd');
                            modalRepartidor2.parentNode.classList.add('boG');
                            modalRepartidor2.parentNode.classList.remove('boR');
                            modalRepartidor2.innerHTML =
                                `<h5 class="titulo-modal my-4 text-center">¡Usuario actualizado!</h5>
                                <div class="check my-3 text-center">
                                    <i class="fa-solid fa-circle-check"></i>
                                </div>
                                <div class="text-center">
                                    <button class="bt btW boG my-4" onclick="cerrarModal2();">Aceptar</button>
                                </div>`;
                            llamarModal('hide');
                            abrirModal2();
                        })
                }
                
            })
    }
}

function vChPw() {
    let usuarioActual = document.getElementById('tUsCu').value;
    let password = document.getElementById('tPwCu').value;
    let passwordNuevo = document.getElementById('tPwNw').value;
    let passwordNuevo1 = document.getElementById('tPwNw1').value;

    if(usuarioActual != '' && password != '' && passwordNuevo != '' && passwordNuevo1 != '') {
        if (passwordNuevo != passwordNuevo1) {
            modalRepartidor2.parentNode.classList.remove('boGd');
            modalRepartidor2.parentNode.classList.remove('boG');
            modalRepartidor2.parentNode.classList.add('boR');
            modalRepartidor2.innerHTML =
                `<h5 class="titulo-modal my-4 text-center">Las contrasena ingresadas no coinciden</h5>
                <div class="error my-3 text-center">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <div class="text-center">
                    <button class="bt btW boR my-4" onclick="cerrarModal2(); llamarModal('show')">Aceptar</button>
                </div>`;
            llamarModal('hide');
            abrirModal2();
        } else {
            usuario = {
                usuario: usuarioActual,
                password: password,
                tipo: 'B'
            }
        
            axios({
                method: 'POST',
                url: 'http://localhost:4200/usuarios/login/B',
                data: usuario
            })
                .then(res => {
                    if (res.data.codigo == 0) {
                        modalRepartidor2.parentNode.classList.remove('boGd');
                        modalRepartidor2.parentNode.classList.remove('boG');
                        modalRepartidor2.parentNode.classList.add('boR');
                        modalRepartidor2.innerHTML =
                            `<h5 class="titulo-modal my-4 text-center">Usuario actual o contrasena incorrecta</h5>
                            <div class="error my-3 text-center">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </div>
                            <div class="text-center">
                                <button class="bt btW boR my-4" onclick="cerrarModal2(); llamarModal('show')">Aceptar</button>
                            </div>`;
                        llamarModal('hide');
                        abrirModal2();
                    } else {
                        axios({
                            method: 'PUT',
                            url: `http://localhost:4200/usuarios/password/${idRepartidor}`,
                            data: {password: passwordNuevo}
                        })
                        .then(() => {
                            modalRepartidor2.parentNode.classList.remove('boGd');
                            modalRepartidor2.parentNode.classList.add('boG');
                            modalRepartidor2.parentNode.classList.remove('boR');
                            modalRepartidor2.innerHTML =
                                `<h5 class="titulo-modal my-4 text-center">¡Contraseña actualizada!</h5>
                                <div class="check my-3 text-center">
                                    <i class="fa-solid fa-circle-check"></i>
                                </div>
                                <div class="text-center">
                                    <button class="bt btW boG my-4" onclick="cerrarModal2();">Aceptar</button>
                                </div>`;
                            llamarModal('hide');
                            abrirModal2();
                        })
                    }
                    
                })
        }
    }
}

function cerrarModal2() {
    $('#modal2').modal('hide');
    modalRepartidor2.parentNode.classList.add('boGd');
    modalRepartidor2.parentNode.classList.remove('boG');
    modalRepartidor2.parentNode.classList.remove('boR');
}

function abrirModal2() {
    $('#modal2').modal('show');
}

//---------------------------definingVars--------------------------------------------
var ordenActual;

var idRepartidor = obtenerParametro('id');
var idSession = obtenerParametro('ses');
var nombreMotorista = obtenerParametro('nom');

var modalRepartidor = document.getElementById('modal-body-repartidor');
var modalRepartidor2 = document.getElementById('modal-body-repartidor2');

if (idSession.length == 0) {
    idSession = '1';
}

verificarSesion();