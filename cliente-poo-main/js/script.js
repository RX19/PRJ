function renCat() {

    axios({
        method: 'GET',
        url: 'http://localhost:4200/categorias'
    })
        .then(res => {
            categorias = res.data;
            secCat.innerHTML = '<div class="tiSec boB">Categorias</div>';
            categorias.forEach((categoria, indice) => {
                secCat.innerHTML +=
                    `<div class="col-12 col-sm-6 col-md-4">
                    <div class="card flex-row color${indice % 4 + 1} divCat sha" onclick="renEnt('${categoria._id}');">
                        <img class="card-img-left example-card-img-responsive" src="${categoria.imagen}" />
                        <h5 class="h5Cat">${categoria.nombre}</h5>
                    </div>
                </div>`;
            });
        })
}

function renEnt(codigoCategoria) {

    axios({
        method: 'GET',
        url: 'http://localhost:4200/empresas'
    })
        .then(res => {
            empresas = res.data;
            let filtro = empresas.filter(empresa => empresa.codigoCategoria == codigoCategoria);
            categoriaActual = categorias.filter(categoria => categoria._id == codigoCategoria)[0];
            secCat.style.display = 'none';
            secEnt.innerHTML = `<div class="tiSec boB">${categoriaActual.nombre}</div>`;
            filtro.forEach((empresa) => {

                estrellas = '';
                for (let i = 0; i < empresa.calificacion; i++) {
                    estrellas += '<i class="fa-solid fa-star"></i>';
                }
                for (let i = 0; i < 5 - empresa.calificacion; i++) {
                    estrellas += '<i class="fa-regular fa-star"></i>';
                }

                secEnt.innerHTML +=
                    `<div class="col-12 col-sm-6">
                        <div class="card boG divEnt sha" onclick="renPro('${empresa._id}');">
                            <div class="card-img banner" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${empresa.banner}); background-repeat: no-repeat; background-size: 100% 100%">
                            </div>
                            <div class="card-img-overlay">
                                <h5 class="card-title text-white h5Ent">${empresa.nombre}</h5>
                            </div>
                            <div class="card flex-row conEnt">
                                <img class="card-img-left example-card-img-responsive" src="${empresa.logo}" />
                                <div class="cntEnt">
                                    <h6>Descripcion:</h6>
                                    <p>${empresa.descripcion}</p>
                                    <div class="calificacion">
                                        <h6>Calificacion:</h6>
                                        <div class="estrellas">
                                            ${estrellas}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });

            secEnt.style.display = 'flex';
        })
}

function renPro(codigoEmpresa) {

    emp = empresas.filter(empresa => empresa._id == codigoEmpresa)[0].nombre;

    axios({
        method: 'GET',
        url: 'http://localhost:4200/productos'
    })
        .then(res => {
            productos = res.data;
            let filtro = productos.filter(producto => producto.codigoEmpresa == codigoEmpresa);
            empresaActual = empresas.filter(empresa => empresa._id == codigoEmpresa)[0];
            secEnt.style.display = 'none';
            secPro.innerHTML = `<div class="tiSec boB">${empresaActual.nombre}</div>`;
            filtro.forEach((producto) => {
                secPro.innerHTML +=
                    `<div class="col-12 col-md-6 col-lg-4">
                        <div class="card flex-row boG divPro sha" onclick="selPro('${producto._id}');">
                            <img class="card-img-left example-card-img-responsive" src="${producto.imagen}" />
                            <div class="cntPro">
                                <h6 class="mb-2">${producto.nombre}</h6>
                                <div class="cntDes">
                                    <p>${producto.descripcion}</p>
                                </div>
                                <h6 class="prePro">L. ${producto.precio}</h6>
                            </div>
                        </div>
                    </div>`;
            });

            secPro.style.display = 'flex';
        })
}

function selPro(codigoProducto) {
    productoActual = productos.filter(producto => producto._id == codigoProducto)[0];
    modalBodyCliente.innerHTML =
        `<h5 class="titulo-modal mb-5 mt-3">Cantidad de productos:</h5>
        <input id="canPro" class="boGd mb-5" type="number" min="1" max="${productoActual.cantidad}" value="1">
        <div class="botones-modal mb-3">
            <button class="bt btW boR" onclick="cerrarModal();">Cerrar</button>
            <button class="bt btW boG" onclick="addCar();">Aceptar</button>
        </div>`;
    abrirModal();
}

function abrirModal() { $('#modal').modal('show'); }

function abrirModal2() { $('#modal2').modal('show'); }

function cerrarModal() { $('#modal').modal('hide'); modalBodyCliente.parentNode.classList.add('boGd'); modalBodyCliente.parentNode.classList.remove('boG'); }

function cerrarModal2() { $('#modal2').modal('hide'); modalBodyCliente2.parentNode.classList.add('boGd'); modalBodyCliente2.parentNode.classList.remove('boG'); }

function addCar() {
    let spinCantidad = document.getElementById('canPro'); let n = Number(spinCantidad.value);

    if ((n % 1 != 0) || n < 1) {
        modalBodyCliente2.parentNode.classList.add('boR');
        modalBodyCliente2.parentNode.classList.remove('boGd');
        modalBodyCliente2.innerHTML =
            `<h5 class="titulo-modal my-4">Cantidad no valida</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingrese un numero mayor que 0</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2(); abrirModal();">Aceptar</button>`;
        cerrarModal();
        abrirModal2();
    } else {

        axios({
            method: 'get',
            url: `http://localhost:4200/sesiones/${idSession}`,
        })
            .then(res => {
                if (res.data.codigo == 0) {
                    modalBodyCliente.parentNode.classList.add('boR');
                    modalBodyCliente.parentNode.classList.remove('boGd');
                    modalBodyCliente.innerHTML =
                    `<h5 class="titulo-modal my-4">Aun no te registras</h5>
                    <div class="error my-3">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </div>
                    <h6 class="subtitulo-modal">Registrate para realizar la compra.</h6>
                    <button class="bt btW boR my-4" onclick="cerrarModal();">Aceptar</button>`;
                } else {
                    carrito.push(
                        {
                            codigo: productoActual._id,
                            imagen: productoActual.imagen,
                            nombre: productoActual.nombre,
                            cantidad: Number(spinCantidad.value),
                            descripcion: productoActual.descripcion,
                            precio: Number(productoActual.precio),
                            empresa: emp
                        }
                    );
                
                    contador = carrito.length; divContador.innerHTML = contador;

                    updCar();

                    axios({
                        method: 'PUT',
                        url: `http://localhost:4200/productos/cantidad/${productoActual._id}`,
                        data: {cantidad: Number(spinCantidad.value)}
                    })
                
                    cerrarModal();
                }
            })

    }
}

function updCar() {
    contador = carrito.length;
    divContador.innerHTML = contador;
    axios({
        method: 'PUT',
        url: `http://localhost:4200/usuarios/carrito/${idUsuario}`,
        data: carrito
    })
}

function getCar() {
    axios({
        method: 'GET',
        url: `http://localhost:4200/usuarios/carrito/${idUsuario}`
    })
        .then((res) => {
            carrito = res.data
            contador = carrito.length;
            divContador.innerHTML = contador;
        })
}

function aCar() { renCar(); abrirModal(); }

function renCar() {
    subtotal = 0;
    if (carrito.length == 0) {
        modalBodyCliente.innerHTML =
            `<h5 class="titulo-modal my-3">Carrito de compras</h5>
        <i class="fa-solid fa-cart-shopping carrito-modal my-4"></i>
        <h6 class="subtitulo-modal mb-2">Carrito vacio</h6>
        <p class="parrafo-modal mb-3">Agrega productos para comenzar</p>
        <button class="bt btW boR mb-3" onclick="cerrarModal();">Cerrar</button>`;
    } else {
        let productosCarrito = '';
        carrito.forEach((producto, indice) => {
            subtotal += producto.precio * producto.cantidad;
            productosCarrito +=
                `<div class="card flex-row boG divPro mb-1">
                    <img class="card-img-left example-card-img-responsive" src="${producto.imagen}" />
                    <div class="cntPro">
                        <div class="float-right delPro" onclick="delCar(${indice})"><i class="fa-solid fa-trash-can"></i></div>
                        <br>
                        <h6>${producto.nombre}</h6>
                        <div class="cntDes">
                            <p>${producto.descripcion}</p>
                        </div>
                        <h6 class="prePro">L. ${producto.precio} x ${producto.cantidad}</h6>
                    </div>
                </div>`;
        });
        isv = subtotal * 0.15;
        comisiones = subtotal * 0.15;
        total = subtotal + isv + comisiones;
        modalBodyCliente.innerHTML =
            `<h5 class="titulo-modal my-3">Carrito de compras</h5>
        ${productosCarrito}
        <div class="total mt-3">
            <div class="cart">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <div class="detTot mb-4">
                <h6 class="negro">Subtotal:</h6>
                <h6 class="gris mb-3">L. ${subtotal.toFixed(2)}</h6>
                <h6 class="negro">ISV (15%):</h6>
                <h6 class="gris mb-3">L. ${isv.toFixed(2)}</h6>
                <h6 class="negro">Comisiones (15%):</h6>
                <h6 class="gris mb-3">L. ${comisiones.toFixed(2)}</h6>
                <h6 class="negro">TOTAL:</h6>
                <h6 class="gris mb-3">L. ${total.toFixed(2)}</h6>
            </div>
        </div>
        <div class="botones-modal mb-3">
            <button class="bt btW boR" onclick="cerrarModal();">Cerrar</button>
            <button class="bt btG" onclick="shp(); cargarMapa();">Comprar</button>
        </div>`;
    }
}

function delCar(indice) {
    axios({
        method: 'PUT',
        url: `http://localhost:4200/productos/cantidad/${carrito[indice].codigo}`,
        data: {cantidad: -carrito[indice].cantidad}
    })
        .then(() => {
            carrito.splice(indice, 1); updCar(); contador = carrito.length; divContador.innerHTML = contador; renCar();
        })
}

function shp() {
    modalBodyCliente.innerHTML =
        `<h5 class="titulo-modal my-3">Finalizar compra</h5>
        <label class="form-control mt-2 border-0">Celular:</label>
        <input class="form-control boGd" type="text" id="tCel" placeholder="xxxx-xxxx" required>
        <label class="form-control mt-2 border-0">Correo:</label>
        <input class="form-control boGd" type="text" id="tEma" placeholder="xxxx@xxxx.com" required>
        <label class="form-control mt-2 border-0">Escribe tu dirección:</label>
        <textarea id="tDir" class="textarea-dirección form-control boGd" rows="4" cols="50" required></textarea>
        <label class="form-control mt-2 border-0">Selecciona tu ubicación:</label>
        <div id="mapa" class="boGd" style="width: 100%; height: 200px;"></div>
        <input type="hidden" id="longitud" value="-87.18004673222666">
        <input type="hidden" id="latitud" value= "14.069375277315233">
        <label class="form-control mt-2 border-0">Información de tarjeta:</label>
        <div class="informacion-tarjeta boGd row pb-3">
            <div class="col-12">
                <label>Número:</label>
                <input class="form-control boGd" type="text" id="text-numero" placeholder="xxxx-xxxx-xxxx-xxxx" required>
            </div>
            <div class="col-12">
                <label>Nombre:</label>
                <input class="form-control boGd" type="text" id="text-nombre" placeholder="Nombre exacto" required>
            </div>
            <div class="col-6">
                <label>Expiración:</label>
                <input class="form-control boGd" type="text" id="text-expiracion" placeholder="MM/AA" required>
            </div>
            <div class="col-6">
                <label>CVC:</label>
                <input class="form-control boGd" type="text" id="text-cvc" placeholder="xxx" required>
            </div>
        </div>
        <div class="botones-modal my-3">
            <button class="bt btW boR" onclick="cerrarModal();">Cerrar</button>
            <button class="bt btG" onclick="vFm();">Finalizar</button>
        </div>`;
}

function vFm() {
    let txtcelular = document.getElementById('tCel').value;
    let txtcorreo = document.getElementById('tEma').value;
    let txtdireccion = document.getElementById('tDir').value;
    let txtnumero = document.getElementById('text-numero').value;
    let txtnombre = document.getElementById('text-nombre').value;
    let txtexpiracion = document.getElementById('text-expiracion').value;
    let txtcvc = document.getElementById('text-cvc').value;

    let expTelefono = /^\d{4}-\d{4}$/
    let expSeguridad = /^\d{3}$/
    let expFecha = /^(?:0?[1-9]|1[0-2])\/\d{2}$/
    let expTarjeta = /^\d{4}-\d{4}-\d{4}-\d{4}$/

    if (txtcelular == '' || txtcorreo == '' || txtdireccion == '' || txtnumero == '' || txtnombre == '' || txtexpiracion == '' || txtcvc == '') {
        modalBodyCliente2.parentNode.classList.add('boR');
        modalBodyCliente2.parentNode.classList.remove('boGd');
        modalBodyCliente2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Algunos campos están vacíos!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, rellene todos los campos.</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2(); abrirModal();">Aceptar</button>`;
        
    } else if (!expCorreo.test(txtcorreo)) {
        modalBodyCliente2.parentNode.classList.add('boR');
        modalBodyCliente2.parentNode.classList.remove('boGd');
        modalBodyCliente2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Correo inválido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, escribe un correo válido.</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2(); abrirModal();">Aceptar</button>`;
        
    } else if (!expTelefono.test(txtcelular)) {
        modalBodyCliente2.parentNode.classList.add('boR');
        modalBodyCliente2.parentNode.classList.remove('boGd');
        modalBodyCliente2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Teléfono inválido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, escribe un número válido.</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2(); abrirModal();">Aceptar</button>`;
        
    } else if (!expTarjeta.test(txtnumero) || !expFecha.test(txtexpiracion) || !expSeguridad.test(txtcvc)) {
        modalBodyCliente2.parentNode.classList.add('boR');
        modalBodyCliente2.parentNode.classList.remove('boGd');
        modalBodyCliente2.innerHTML =
            `<h5 class="titulo-modal my-4">¡Datos de la tarjeta inválidos!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, Revise sus datos.</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2(); abrirModal();">Aceptar</button>`;
        
    } else {
        modalBodyCliente2.parentNode.classList.add('borde-amarillo');
        modalBodyCliente2.parentNode.classList.remove('boR');
        modalBodyCliente2.innerHTML =
            `<h5 class="titulo-modal my-4">¿Está seguro que desea ya ordenar?</h5>
                <div class="advertencia my-3">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <h6 class="subtitulo-modal">Esta acción no se puede revertir.</h6>
                <div class="botones-modal mt-4 mb-3">
                    <button class="bt btW boR" onclick="cerrarModal2(); abrirModal();">Cerrar</button>
                    <button class="bt btW boG" onclick="fnsShp();">Aceptar</button>
                </div>`;
    }
    cerrarModal();
    abrirModal2();
}

//----------------------Finish Shop Use Normal Var---------------------------
function fnsShp() {
    let txtcelular = document.getElementById('tCel').value;
    let txtcorreo = document.getElementById('tEma').value;
    let txtdireccion = document.getElementById('tDir').value;
    let longitud = document.getElementById('longitud').value;
    let latitud = document.getElementById('latitud').value;

    let o = {
        idCliente: idUsuario,
        nombre: carrito[0].empresa,
        estado: 'disponible',
        cliente: {
            nombre: nombreCliente,
            correo: txtcorreo,
            celular: txtcelular
        },
        envio: {
            productos: carrito,
            direccion: txtdireccion,
            empresa: carrito[0].empresa,
            subtotal: subtotal,
            total: total,
            coordenadas: {
                longitud: longitud,
                latitud: latitud
            },
            estado: null,
            isv: isv,
            comisionMotorista: subtotal * 0.1,
            comisionAdministrador: subtotal * 0.05
        },
        motorista: null
    }

    axios({
        method: 'POST',
        url: 'http://localhost:4200/ordenes',
        data: o
    })
        .then(res => {

            modalBodyCliente.parentNode.classList.remove('boGd');
            modalBodyCliente.parentNode.classList.add('boG');

            modalBodyCliente.innerHTML =
                `<h5 class="titulo-modal my-4">Orden pendiente</h5>
                <div class="check my-3">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <h6 class="subtitulo-modal">${res.data.mensaje}</h6>
                <button class="bt btW boG my-4" onclick="cerrarModal();">Aceptar</button>`;

            carrito.length = 0;
            updCar();

            cerrarModal2();
            abrirModal();
        })
}

function bck() {
    if (secEnt.style.display == 'flex') {
        secEnt.style.display = 'none';
        sectionCategorias.style.display = 'flex';
    }
    if (secPro.style.display == 'flex') {
        secPro.style.display = 'none';
        secEnt.style.display = 'flex';
    }
}

function getPar(valor){
    valor = valor.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    let expresionRegular = "[\\?&]" + valor + "=([^&#]*)";
    let regex = new RegExp(expresionRegular);
    let r = regex.exec( window.location.href );
    if( r == null )
        return "";
    else
        return decodeURIComponent(r[1].replace(/\ + /g, " "));
}

function clSe() {
    axios({
        method: 'get',
        url: `http://localhost:4200/sesiones/cerrar/${idSession}`
    })
}

function ordPen() {
    axios({
        method: 'get',
        url: `http://localhost:4200/ordenes/pendientes/${idUsuario}`
    })
        .then(res => {
            if (res.data.length == 0) {
                modalBodyCliente.innerHTML =
                    `<h5 class="titulo-modal my-3">Ordenes pendientes</h5>
                    <i class="fa-solid fa-list carrito-modal my-4"></i>
                    <h6 class="subtitulo-modal mb-2">No tienes ordenes pendientes.</h6>
                    <p class="parrafo-modal mb-3">Realiza una orden para comenzar</p>
                    <button class="bt btW boR mb-3" onclick="cerrarModal();">Cerrar</button>`;
            } else {
                let ordenes = '';
                res.data.forEach(orden => {
                    let productos = '';
                    orden.envio.productos.forEach(producto => {
                        productos += producto.cantidad + ' ' + producto.nombre + '; ';
                    });
                    if (orden.estado == 'disponible') {
                        ordenes +=
                            `<div class="boG my-1 py-1 ordPen">
                                <h6 class="text-left pl-2">Orden: <span class="text-secondary">${productos}</span></h6>
                                <h6 class="text-right pr-2">Estado: <span class="text-danger">pendiente</span></h6>
                            </div>`;
                    } else {
                        ordenes +=
                            `<div class="boG my-1 py-1 ordPen">
                                <h6 class="text-left pl-2">Orden: <span class="text-secondary">${productos}</span></h6>
                                <h6 class="text-right pr-2">Estado: <span class="text-success">tomada</span></h6>
                            </div>`;
                    }
                    
                });
                modalBodyCliente.innerHTML =
                    `<h5 class="titulo-modal my-3">Ordenes pendientes</h5>
                    <div class="mt-3">
                        ${ordenes}
                    </div>
                    <div class="botones-modal mt-2 mb-3">
                        <button class="bt btW boR" onclick="cerrarModal();">Cerrar</button>
                    </div>`;
            }
            abrirModal();
        })
}

function edUs() {
    modalBodyCliente.innerHTML = 
    `<div class="row my-4 mx-2">
        <h4 class="col-12 text-center titulo-modal mb-4">¿Qué quieres cambiar?</h4>
        <button class="bt btG col-12" style="height: 50px;" onclick="modUs();">Cambiar usuario</button>
        <button class="bt btGd col-12" style="height: 50px;" onclick="modPw();">Cambiar contrasena</button>
    </div>`;
    abrirModal();
}

function modUs() {
    modalBodyCliente.innerHTML = 
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
            <button class="bt btW mt-3" onclick="cerrarModal();">Cancelar</button>
        </div>`;
}

function modPw() {
    modalBodyCliente.innerHTML = 
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
            <button class="bt btW mt-2" onclick="cerrarModal();">Cancelar</button>
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
            tipo: 'C'
        }
    
        axios({
            method: 'POST',
            url: 'http://localhost:4200/usuarios/login/C',
            data: usuario
        })
            .then(res => {
                if (res.data.codigo == 0) {
                    modalBodyCliente2.innerHTML =
                        `<h5 class="titulo-modal my-4">Usuario actual o contraseña incorrectas</h5>
                        <div class="error my-3">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <button class="bt btW boR my-4" onclick="cerrarModal2(); abrirModal()">Aceptar</button>`;
                    cerrarModal();
                    abrirModal2();
                } else {
                    axios({
                        method: 'PUT',
                        url: `http://localhost:4200/usuarios/usuario/${idUsuario}`,
                        data: {usuario: nuevoUsuario}
                    })
                        .then(() => {
                            modalBodyCliente2.innerHTML =
                                `<h5 class="titulo-modal my-4">Usuario ya registrado</h5>
                                <div class="check my-3">
                                    <i class="fa-solid fa-circle-check"></i>
                                </div>
                                <button class="bt btW boG my-4" onclick="cerrarModal2();">Aceptar</button>`;
                            cerrarModal();
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

    if(usuarioActual != '' && password != '' && passwordNuevo != '' && passwordNuevo2 != '') {
        if (passwordNuevo != passwordNuevo1) {
            modalBodyCliente2.innerHTML =
                `<h5 class="titulo-modal my-4">Las contraseñas no coinciden</h5>
                <div class="error my-3">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <button class="bt btW boR my-4" onclick="cerrarModal2(); abrirModal()">Aceptar</button>`;
            cerrarModal();
            abrirModal2();
        } else {
            usuario = {
                usuario: usuarioActual,
                password: password,
                tipo: 'C'
            }
        
            axios({
                method: 'POST',
                url: 'http://localhost:4200/usuarios/login/C',
                data: usuario
            })
                .then(res => {
                    if (res.data.codigo == 0) {
                        modalBodyCliente2.innerHTML =
                            `<h5 class="titulo-modal my-4">Usuario actual o contraseña incorrectas</h5>
                            <div class="error my-3">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </div>
                            <button class="bt btW boR my-4" onclick="cerrarModal2(); abrirModal()">Aceptar</button>`;
                        cerrarModal();
                        abrirModal2();
                    } else {
                        axios({
                            method: 'PUT',
                            url: `http://localhost:4200/usuarios/password/${idUsuario}`,
                            data: {password: passwordNuevo}
                        })
                            .then(() => {
                                modalBodyCliente2.innerHTML =
                                    `<h5 class="titulo-modal my-4">¡Contraseña actualizada!</h5>
                                    <div class="check my-3">
                                        <i class="fa-solid fa-circle-check"></i>
                                    </div>
                                    <button class="bt btW boG my-4" onclick="cerrarModal2();">Aceptar</button>`;
                                cerrarModal();
                                abrirModal2();
                            })
                    }
                    
                })
        }
    }
}


//---------------------------definingVars--------------------------------------------
var secCat = document.getElementById('secCat');
var secEnt = document.getElementById('secEnt');
var secPro = document.getElementById('secPro');
var modalBodyCliente = document.getElementById('modal-body-cliente');
var modalBodyCliente2 = document.getElementById('modal-body-cliente2');
var divContador = document.getElementById('coun');
var categoriaActual; var empresaActual; var productoActual; var subtotal = 0;
var isv = 0; var comisiones = 0; var total = 0; var carrito = []; var contador = 0; var emp;
var expCorreo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
var nombreCliente = getPar('nom'); var idSession = getPar('ses'); var idUsuario = getPar('id');
if (idSession.length == 0) { idSession = '1'; idUsuario = '1'; } else { getCar(); }
var categorias = []; var empresas = []; var productos = [];

renCat();