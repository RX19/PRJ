function vrfSe() {
    axios({
        method: 'get',
        url: `http://localhost:4200/sesiones/${idSession}`,
    })
        .then(res => {
            if (res.data.codigo == 0) {
                window.open(`login.html`, '_self');
            } else {
                renArrUs();
                chVal();
            }
        })
}

function renArrUs() {
    axios({
        method: 'GET',
        url: 'http://localhost:4200/usuarios/motoristas'
    })
        .then(res => {
            usuarios = res.data;
            renDlv();
        });
}

function menu(valor) {
    let logo = document.getElementById('logo'); let cl = document.getElementById('cl');
    let op = document.getElementById('op'); let menu = document.getElementById('menu');
    let secHe = document.getElementById('secHe'); let menHe = document.getElementById('menHe');

    if (valor == 0) {
        logo.style.display = 'none'; cl.style.display = 'none'; 
        op.style.display = 'block'; menu.style.width = '63px';
        secHe.style.display = 'none'; menHe.style.justifyContent = 'center';
    } else {
        logo.style.display = 'block'; cl.style.display = 'block';
        op.style.display = 'none'; menu.style.width = '230px';
        secHe.style.display = 'block'; menHe.style.justifyContent = 'space-between';
    }
}


function chSec(elemento, tipo, seccion) {
    let objeto = document.getElementById(`${tipo}${seccion}`);
    secFs.style.display = 'none';
    Array.from(secs).forEach(section => {
        section.style.display = 'none';
    });
    Array.from(ctrls).forEach(ctrl => {
        ctrl.classList.remove('bgDrk');
    });
    elemento.classList.add('bgDrk');
    objeto.style.display = 'block';
}

function chVal() {
    let codigoActualizarCategoria = document.getElementById('selUpdCat');
    let codigoActualizarEmpresa = document.getElementById('selUpdEnt');
    let codigoupdPro = document.getElementById('selUpdPro');

    let categoriaAgregarEmpresa = document.getElementById('selCatAddEnt');
    let empresaAgregarProducto = document.getElementById('selEntAddPro');
    let categoriaActualizarEmpresa = document.getElementById('selCatUpdEnt');
    let empresaupdPro = document.getElementById('selEntUpdPro');

    codigoActualizarCategoria.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    codigoActualizarEmpresa.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    codigoupdPro.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';

    let codigoEliminarCategoria = document.getElementById('selDelCat');
    let codigoEliminarEmpresa = document.getElementById('selDelEnt');
    let codigoEliminarProducto = document.getElementById('selDelPro');

    let categoriaMostrarEmpresa = document.getElementById('selCatVEnt');
    let empresaMostrarProducto = document.getElementById('selEntShPro');

    codigoEliminarCategoria.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    codigoEliminarEmpresa.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    codigoEliminarProducto.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    categoriaAgregarEmpresa.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    empresaAgregarProducto.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    categoriaActualizarEmpresa.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    empresaupdPro.innerHTML = '<option disabled selected value> -- Seleccione una opción -- </option>';
    categoriaMostrarEmpresa.innerHTML = '<option selected value="0"> -- Seleccione una opción -- </option>';
    empresaMostrarProducto.innerHTML = '<option selected value="0"> -- Seleccione una opción -- </option>';

    axios({
        method: 'GET',
        url: 'http://localhost:4200/categorias'
    })
        .then(res => {
            categorias = res.data;
            categorias.forEach(categoria => {
                codigoActualizarCategoria.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
                codigoEliminarCategoria.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
                categoriaAgregarEmpresa.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
                categoriaActualizarEmpresa.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
                categoriaMostrarEmpresa.innerHTML += `<option value="${categoria._id}">${categoria._id} - ${categoria.nombre}</option>`;
            });
        });

    axios({
        method: 'GET',
        url: 'http://localhost:4200/empresas'
    })
        .then(res => {
            empresas = res.data;
            empresas.forEach(empresa => {
                codigoActualizarEmpresa.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
                codigoEliminarEmpresa.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
                empresaupdPro.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
                empresaAgregarProducto.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
                empresaMostrarProducto.innerHTML += `<option value="${empresa._id}">${empresa._id} - ${empresa.nombre}</option>`;
            });
        });

    axios({
        method: 'GET',
        url: 'http://localhost:4200/productos'
    })
        .then(res => {
            productos = res.data;
            productos.forEach(producto => {
                codigoupdPro.innerHTML += `<option value="${producto._id}">${producto._id} - ${producto.nombre}</option>`;
                codigoEliminarProducto.innerHTML += `<option value="${producto._id}">${producto._id} - ${producto.nombre}</option>`;
            });
        });
    let inputs = document.getElementsByTagName('input');
    Array.from(inputs).forEach(input => input.value = null);

    let selects = document.getElementsByTagName('select');
    Array.from(selects).forEach(select => select.value = null);

    let textareas = document.getElementsByTagName('textarea');
    Array.from(textareas).forEach(textarea => textarea.value = null);

    let imgs = document.getElementsByClassName('preV');
    Array.from(imgs).forEach(img => img.src = '');

    imgs = document.getElementsByClassName('preVBan');
    Array.from(imgs).forEach(img => img.src = '');
}


//categorias
function addCat() {
    let nombre = document.getElementById('tNamAddCat');
    let descripcion = document.getElementById('tDesAddCat');
    let imagen = document.getElementById('imgAddCat');

    if (nombre.value == '' || descripcion.value == '' || imagen.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Es necesario completar los campos vacios/h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos restantes</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('imagen', imagen.files[0]);

        axios({
            method: 'POST',
            url: 'http://localhost:4200/categorias',
            data: formData
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('boG');
                modalBodyAdministrador2.parentNode.classList.remove('boR');
                modalBodyAdministrador2.parentNode.classList.remove('boY');

                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="bt btW boG my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                chVal();
            });
    }
}

function proCat() {
    let codigo = document.getElementById('selUpdCat');
    let nombre = document.getElementById('tNamUpdCat');
    let descripcion = document.getElementById('tDesUpdCat');
    let imagen = document.getElementById('imgUpdCat2');

    let filtro = categorias.filter(categoria => categoria._id == codigo.value)[0];

    nombre.value = filtro.nombre;
    descripcion.value = filtro.descripcion;
    imagen.src = filtro.imagen;
}

function updCat() {
    let codigo = document.getElementById('selUpdCat');
    let nombre = document.getElementById('tNamUpdCat');
    let descripcion = document.getElementById('tDesUpdCat');
    let imagen = document.getElementById('imgUpdCat');

    if (nombre.value == '' || descripcion.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Es necesario completar los campos vacios/h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos restantes</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else {

        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);

        if (imagen.value != '') {
            formData.append('imagen', imagen.files[0]);
        }
        axios({
            method: 'PUT',
            url: `http://localhost:4200/categorias/${codigo.value}`,
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('boG');
                modalBodyAdministrador2.parentNode.classList.remove('boR');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="bt btW boG my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                chVal();
            });
        chVal();
    }
}

function filCatTab() {
    let cuerpo = document.getElementById('bodTabCat');
    cuerpo.innerHTML = '';

    categorias.forEach(categoria => {
        cuerpo.innerHTML +=
            `<tr>
                <th scope="row">${categoria._id}</th>
                <td>${categoria.nombre}</td>
                <td>${categoria.descripcion}</td>
            </tr>`;
    });
}

function seaCat(elemento) {
    let cuerpo = document.getElementById('bodTabCat');
    cuerpo.innerHTML = '';
    if (elemento.value == '') {
        filCatTab();
    } else {
        filtro = categorias.filter(categoria => (categoria._id.toUpperCase().includes(elemento.value.toUpperCase()) || categoria.nombre.toUpperCase().includes(elemento.value.toUpperCase()) || categoria.descripcion.toUpperCase().includes(elemento.value.toUpperCase())));

        if (filtro.length != 0) {
            filtro.forEach(categoria => {
                cuerpo.innerHTML +=
                    `<tr>
                    <th scope="row">${categoria._id}</th>
                    <td>${categoria.nombre}</td>
                    <td>${categoria.descripcion}</td>
                </tr>`;
            });
            
        }
    }
}

function namCat(elemento) {
    let filtro = categorias.filter(categoria => categoria._id == elemento.value)[0];
    document.getElementById('tDelCat').value = filtro.nombre;
}

function delCat() {
    let codigo = document.getElementById('selDelCat');
    modalBodyAdministrador2.parentNode.classList.add('boY');
    modalBodyAdministrador2.parentNode.classList.remove('boR');
    modalBodyAdministrador2.innerHTML =
        `<h5 class="titulo-modal my-4">Confirme que desea eliminar la categoria?</h5>
        <div class="advertencia my-3">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h6 class="subtitulo-modal">Se eliminaran todas las empresas asociadas</h6>
        <div class="btes-modal mt-4 mb-3">
            <button class="bt btW boR" onclick="cerrarModal2();">Cerrar</button>
            <button class="bt btW boG" onclick="delCate('${codigo.value}');">Aceptar</button>
        </div>`;
    if (codigo.value != '') {
        abrirModal2(); 
    }
}

function delCate(codigo) {
    axios({
        method: 'DELETE',
        url: `http://localhost:4200/categorias/${codigo}`
    })
        .then(res => {
            modalBodyAdministrador2.parentNode.classList.add('boG');
            modalBodyAdministrador2.parentNode.classList.remove('boR');
            modalBodyAdministrador2.parentNode.classList.remove('boY');
            modalBodyAdministrador2.innerHTML =
                `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                <div class="check my-3">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <button class="bt btW boG my-4" onclick="cerrarModal2()">Aceptar</button>`;
            chVal();
        });
}

//-------------------------------Enterprise----------------------------------------
function addEnt() {
    let nombre = document.getElementById('tNamAddEnt');
    let descripcion = document.getElementById('tDesAddEnt');
    let direccion = document.getElementById('tDirAddEnt');
    let telefono = document.getElementById('tTelAddEnt');
    let correo = document.getElementById('tEmaAddEnt');
    let categoria = document.getElementById('selCatAddEnt');
    let calificacion = document.getElementById('selCalAddEnt');
    let imagen = document.getElementById('imgAddEnt');
    let banner = document.getElementById('banAddEnt');

    if (nombre.value == '' || descripcion.value == '' || direccion.value == '' || telefono.value == '' || correo.value == '' || categoria.value == '' || calificacion.value == '' || imagen.value == '' || banner.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Es necesario completar los campos vacios</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos restantes</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if (!expCorreo.test(correo.value)){
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Correo invalido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingresa un correo valido, por favor</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if (!expTelefono.test(telefono.value)){
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Telefono invalido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingresa un telefono valido, por favor</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('direccion', direccion.value);
        formData.append('telefono', telefono.value);
        formData.append('correo', correo.value);
        formData.append('codigoCategoria', categoria.value);
        formData.append('calificacion', calificacion.value);
        formData.append('banner', banner.files[0]);
        formData.append('logo', imagen.files[0]);
        axios({
            method: 'POST',
            url: 'http://localhost:4200/empresas',
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('boG');
                modalBodyAdministrador2.parentNode.classList.remove('boR');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="bt btW boG my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                chVal();
            });
    }
}

function proEnt() {
    let codigo = document.getElementById('selUpdEnt');
    let nombre = document.getElementById('tNamUpdEnt');
    let descripcion = document.getElementById('tDesUpdEnt');
    let direccion = document.getElementById('tDirUpdEnt');
    let telefono = document.getElementById('tTelUpdEnt');
    let correo = document.getElementById('tEmaUpdEnt');
    let categoria = document.getElementById('selCatUpdEnt');
    let calificacion = document.getElementById('selCalUpdEnt');
    let imagen = document.getElementById('imgUpdEnt2');
    let banner = document.getElementById('banUpdEnt2');

    let filtro = empresas.filter(empresa => empresa._id == codigo.value)[0];

    nombre.value = filtro.nombre;
    descripcion.value = filtro.descripcion;
    direccion.value = filtro.direccion;
    telefono.value = filtro.telefono;
    correo.value = filtro.correo;
    categoria.value = filtro.codigoCategoria;
    calificacion.value = filtro.calificacion;
    imagen.src = filtro.logo;
    banner.src = filtro.banner;
}

function updEnt() {
    let codigo = document.getElementById('selUpdEnt');
    let nombre = document.getElementById('tNamUpdEnt');
    let descripcion = document.getElementById('tDesUpdEnt');
    let direccion = document.getElementById('tDirUpdEnt');
    let telefono = document.getElementById('tTelUpdEnt');
    let correo = document.getElementById('tEmaUpdEnt');
    let categoria = document.getElementById('selCatUpdEnt');
    let calificacion = document.getElementById('selCalUpdEnt');
    let imagen = document.getElementById('imgUpdEnt');
    let banner = document.getElementById('banUpdEnt');

    if (nombre.value == '' || descripcion.value == '' || direccion.value == '' || telefono.value == '' || correo.value == '' || categoria.value == '' || calificacion.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Es necesario completar los campos vacios</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos restantes</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if (!expCorreo.test(correo.value)){
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Correo invalido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingresa un correo valido, por favor</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if (!expTelefono.test(telefono.value)){
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Telefono invalido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingresa un telefono valido, por favor</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('direccion', direccion.value);
        formData.append('telefono', telefono.value);
        formData.append('correo', correo.value);
        formData.append('codigoCategoria', categoria.value);
        formData.append('calificacion', calificacion.value);

        if (imagen.value != '') {
            formData.append('logo', imagen.files[0]);
        }

        if (banner.value != '') {
            formData.append('banner', banner.files[0]);
        }
        
        axios({
            method: 'PUT',
            url: `http://localhost:4200/empresas/${codigo.value}`,
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('boG');
                modalBodyAdministrador2.parentNode.classList.remove('boR');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="bt btW boG my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                chVal();
            });
    }
}

function filEntTab() {
    let cuerpo = document.getElementById('bodTabEnt');
    cuerpo.innerHTML = '';

    empresas.forEach(empresa => {
        cuerpo.innerHTML +=
            `<tr>
                <th scope="row">${empresa._id}</th>
                <td>${empresa.nombre}</td>
                <td>${empresa.descripcion}</td>
                <td>${empresa.direccion}</td>
                <td>${empresa.telefono}</td>
                <td>${empresa.correo}</td>
            </tr>`;
    });
}

function seaEnt(elemento) {
    document.getElementById('selCatVEnt').value = 0;
    let cuerpo = document.getElementById('bodTabEnt');
    cuerpo.innerHTML = '';

    filtro = empresas.filter(empresa => (empresa._id.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.nombre.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.descripcion.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.telefono.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.correo.toUpperCase().includes(elemento.value.toUpperCase()) || empresa.direccion.toUpperCase().includes(elemento.value.toUpperCase())));

    if (filtro.length != 0) {
        filtro.forEach(empresa => {
            cuerpo.innerHTML +=
                `<tr>
                <th scope="row">${empresa._id}</th>
                <td>${empresa.nombre}</td>
                <td>${empresa.descripcion}</td>
                <td>${empresa.direccion}</td>
                <td>${empresa.telefono}</td>
                <td>${empresa.correo}</td>
            </tr>`;
        });
    }
}

function namEnt(elemento) {
    let filtro = empresas.filter(empresa => empresa._id == elemento.value)[0];
    document.getElementById('tDelEnt').value = filtro.nombre;
}

function delEnt() {
    let codigo = document.getElementById('selDelEnt');
    modalBodyAdministrador2.parentNode.classList.add('boY');
    modalBodyAdministrador2.parentNode.classList.remove('boR');
    modalBodyAdministrador2.innerHTML =
        `<h5 class="titulo-modal my-4">Confirme que desea eliminar la empresa?</h5>
        <div class="advertencia my-3">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h6 class="subtitulo-modal">Se eliminaran todos los productos asociados</h6>
        <div class="btes-modal mt-4 mb-3">
            <button class="bt btW boR" onclick="cerrarModal2();">Cerrar</button>
            <button class="bt btW boG" onclick="delEnte('${codigo.value}');">Aceptar</button>
        </div>`;
    if (codigo.value != '') {
        abrirModal2(); 
    }
}

function delEnte(codigo) {
    axios({
        method: 'DELETE',
        url: `http://localhost:4200/empresas/${codigo}`
    })
        .then(res => {
            modalBodyAdministrador2.parentNode.classList.add('boG');
            modalBodyAdministrador2.parentNode.classList.remove('boR');
            modalBodyAdministrador2.parentNode.classList.remove('boY');
            modalBodyAdministrador2.innerHTML =
                `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                <div class="check my-3">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <button class="bt btW boG my-4" onclick="cerrarModal2()">Aceptar</button>`;
            chVal();
        });
}

//-------------------------------Products----------------------------------------
function addPro() {
    let nombre = document.getElementById('tNamAddPro');
    let descripcion = document.getElementById('tDesAddPro');
    let cantidad = document.getElementById('tCanAddPro');
    let precio = document.getElementById('tPriAddPro');
    let empresa = document.getElementById('selEntAddPro');
    let imagen = document.getElementById('imgAddPro');

    let n = Number(cantidad.value)
    let m = Number(precio.value)

    if (nombre.value == '' || descripcion.value == '' || cantidad.value == '' || precio.value == '' || empresa.value == '' || imagen.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Es necesario completar los campos vacios</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if ((n % 1 != 0) || n < 1) {
            modalBodyAdministrador2.parentNode.classList.add('boR');
            modalBodyAdministrador2.parentNode.classList.remove('boGd');
            modalBodyAdministrador2.innerHTML =
                `<h5 class="titulo-modal my-4">Cantidad invalida!</h5>
                <div class="error my-3">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <h6 class="subtitulo-modal">Ingrese un numero mayor que 0</h6>
                <button class="bt btW boR my-4" onclick="cerrarModal2();">Aceptar</button>`;
            abrirModal2();
    } else if (m <= 0) {
        modalBodyAdministrador2.parentNode.classList.add('boR');
        modalBodyAdministrador2.parentNode.classList.remove('boGd');
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Precio invalido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingrese un numero mayor que 0</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2();">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('cantidad', cantidad.value);
        formData.append('precio', precio.value);
        formData.append('imagen', imagen.files[0]);
        formData.append('codigoEmpresa', empresa.value);
        axios({
            method: 'POST',
            url: 'http://localhost:4200/productos',
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('boG');
                modalBodyAdministrador2.parentNode.classList.remove('boR');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="bt btW boG my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                chVal();
            });
    }
}

function proPro() {
    let codigo = document.getElementById('selUpdPro');
    let nombre = document.getElementById('tNamUpdPro');
    let descripcion = document.getElementById('tDesUpdPro');
    let cantidad = document.getElementById('tCanUpdPro');
    let precio = document.getElementById('tPreUpdPro');
    let empresa = document.getElementById('selEntUpdPro');
    let imagen = document.getElementById('imgUpdPro2');

    let filtro = productos.filter(producto => producto._id == codigo.value)[0];

    nombre.value = filtro.nombre;
    descripcion.value = filtro.descripcion;
    cantidad.value = filtro.cantidad;
    precio.value = filtro.precio;
    empresa.value = filtro.codigoEmpresa;
    imagen.src = filtro.imagen
}

function updPro() {
    let codigo = document.getElementById('selUpdPro');
    let nombre = document.getElementById('tNamUpdPro');
    let descripcion = document.getElementById('tDesUpdPro');
    let cantidad = document.getElementById('tCanUpdPro');
    let precio = document.getElementById('tPreUpdPro');
    let empresa = document.getElementById('selEntUpdPro');
    let imagen = document.getElementById('imgUpdPro');

    let n = Number(cantidad.value)
    let m = Number(precio.value)

    if (nombre.value == '' || descripcion.value == '' || cantidad.value == '' || precio.value == '' || empresa.value == '') {
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Es necesario completar los campos vacios</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Por favor, llene todos los campos restantes</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2()">Aceptar</button>`;
        abrirModal2();
    } else if ((n % 1 != 0) || n < 1) {
        modalBodyAdministrador2.parentNode.classList.add('boR');
        modalBodyAdministrador2.parentNode.classList.remove('boGd');
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Cantidad invalida!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingrese un entero mayor que 0</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2();">Aceptar</button>`;
        abrirModal2();
    } else if (m <= 0) {
        modalBodyAdministrador2.parentNode.classList.add('boR');
        modalBodyAdministrador2.parentNode.classList.remove('boGd');
        modalBodyAdministrador2.innerHTML =
            `<h5 class="titulo-modal my-4">Precio invalido!</h5>
            <div class="error my-3">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <h6 class="subtitulo-modal">Ingrese un numero mayor que 0</h6>
            <button class="bt btW boR my-4" onclick="cerrarModal2();">Aceptar</button>`;
        abrirModal2();
    } else {
        let formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('cantidad', cantidad.value);
        formData.append('precio', precio.value);
        formData.append('codigoEmpresa', empresa.value);

        if (imagen.value != '') {
            formData.append('imagen', imagen.files[0]);
        }

        axios({
            method: 'PUT',
            url: `http://localhost:4200/productos/${codigo.value}`,
            data: formData,
        })
            .then(res => {
                modalBodyAdministrador2.parentNode.classList.add('boG');
                modalBodyAdministrador2.parentNode.classList.remove('boR');
                
                modalBodyAdministrador2.innerHTML =
                    `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                    <div class="check my-3">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <button class="bt btW boG my-4" onclick="cerrarModal2()">Aceptar</button>`;
                abrirModal2();
                chVal();
            })
    }
}

function filProTab() {
    let cuerpo = document.getElementById('bodTabPro');
    cuerpo.innerHTML = '';

    productos.forEach(producto => {
        cuerpo.innerHTML +=
            `<tr>
                <th scope="row">${producto._id}</th>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio} L. </td>
            </tr>`;
    });
}

function shPro(elemento) {
    document.getElementById('selEntShPro').value = 0;
    let cuerpo = document.getElementById('bodTabPro');
    cuerpo.innerHTML = '';

    filtro = productos.filter(producto => (producto._id.toUpperCase().includes(elemento.value.toUpperCase()) || producto.nombre.toUpperCase().includes(elemento.value.toUpperCase()) || producto.descripcion.toUpperCase().includes(elemento.value.toUpperCase()) || producto.cantidad.toString().includes(elemento.value) || producto.precio.toString().includes(elemento.value)));

    if (filtro.length != 0) {
        filtro.forEach(producto => {
            cuerpo.innerHTML +=
                `<tr>
                <th scope="row">${producto._id}</th>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio} L. </td>
            </tr>`;
        });
    }
}

function namPro(elemento) {
    let filtro = productos.filter(producto => producto._id == elemento.value)[0];
    document.getElementById('tDelPro').value = filtro.nombre;
}

function delPro() {
    let codigo = document.getElementById('selDelPro');
    modalBodyAdministrador2.parentNode.classList.add('boY');
    modalBodyAdministrador2.parentNode.classList.remove('boR');
    modalBodyAdministrador2.innerHTML =
        `<h5 class="titulo-modal my-4">Confirme que desea eliminar el producto?</h5>
        <div class="advertencia my-3">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h6 class="subtitulo-modal">Esta acción no se puede revertir</h6>
        <div class="btes-modal mt-4 mb-3">
            <button class="bt btW boR" onclick="cerrarModal2();">Cerrar</button>
            <button class="bt btW boG" onclick="delProd('${codigo.value}');">Aceptar</button>
        </div>`;
    if (codigo.value != '') {
        abrirModal2(); 
    }
}

function delProd(codigo) {
    axios({
        method: 'DELETE',
        url: `http://localhost:4200/productos/${codigo}`
    })
        .then(res => {
            modalBodyAdministrador2.parentNode.classList.add('boG');
            modalBodyAdministrador2.parentNode.classList.remove('boR');
            modalBodyAdministrador2.parentNode.classList.remove('boY')
            modalBodyAdministrador2.innerHTML =
                `<h5 class="titulo-modal my-4">${res.data.mensaje}</h5>
                <div class="check my-3">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <button class="bt btW boG my-4" onclick="cerrarModal2()">Aceptar</button>`;
            chVal();
        })
}

function renOrd() {
    let contenidoOrdenes = document.getElementById('cntords');
    contenidoOrdenes.classList.remove('boGd');
    contenidoOrdenes.innerHTML = '';

    axios({
        method: 'GET',
        url: 'http://localhost:4200/ordenes/disponibles'
    })
        .then(res => {
            ordenes = res.data;
            ordenes.forEach(elem => {
                contenidoOrdenes.innerHTML +=
                    `<div class="col-12 py-1">
                    <div class="contenedorOrden row boB p-1 radius">
                        <h4 class="col-12 col-sm-4 text-left pt-2">${elem.nombre}</h4>
                        <button class="bt btG col-sm-4 col-12" onclick="abrirModal('${elem._id}');">Asignar</button>
                        <button class="bt btGd col-sm-4 col-12" onclick="vOrd('${elem._id}'); cargarMapa(${elem.envio.coordenadas.longitud}, ${elem.envio.coordenadas.latitud});">Ver orden</button>
                    </div>
                </div>`;
            });
        });
}

function abrirModal(codigo) {
    let selectMotoristas = document.getElementById('selDlv');
    selectMotoristas.innerHTML = '';
    usuarios.forEach(usuario => {
        if (usuario.aprobado == true) {
            selectMotoristas.innerHTML +=
                `<option value="${usuario._id}">${usuario.nombre}</option>`;
        }
    });
    orden = ordenes.filter(elem => elem._id == codigo)[0];
    $('#modal').modal('show');
}

function abrirModal2() {
    $('#modal2').modal('show');
}

function cerrarModal() {
    $('#modal').modal('hide');
}

function cerrarModal2() {
    $('#modal2').modal('hide');
    modalBodyAdministrador2.parentNode.classList.remove('boG');
    modalBodyAdministrador2.parentNode.classList.remove('boY');
    modalBodyAdministrador2.parentNode.classList.add('boR');
}

function asgDlv() {
    let codigo = document.getElementById('selDlv');
    axios({
        method: 'PUT',
        url: `http://localhost:4200/ordenes/${orden._id}`,
        data: {_id: codigo.value}
    })
        .then(res => {
            renOrd();
        });
    $('#modal').modal('hide');
}

function vOrd(codigo) {
    let contenidoOrdenes = document.getElementById('cntords');
    orden = ordenes.filter(o => o._id == codigo)[0];
    let entrega = '';
    orden.envio.productos.forEach(producto => {
        entrega += producto.cantidad + ' ' + producto.nombre + '; ';
    });
    contenidoOrdenes.classList.add('boGd');
    contenidoOrdenes.innerHTML =
        `<div class="tiDetOrd boGd radius px-1">
        Detalle de la orden: "${orden.nombre}"
    </div>
    <div class="infCli boGd radius p-2">
        <div class="tiInfCli boGd radius px-1">
            Información del cliente
        </div>
        <div class="row mt-2">
            <div class="col-12 col-md-6">
                <h6>Nombre:</h6>
                <h6 class="gris pl-5 pb-2">${orden.cliente.nombre}</h6>
            </div>
            <div class="col-12 col-md-6">
                <h6>Correo:</h6>
                <h6 class="gris pl-5 pb-2">${orden.cliente.correo}</h5>
            </div>
            <div class="col-12">
                <h6>Celular:</h6>
                <h6 class="gris pl-5 pb-2">${orden.cliente.celular}</h6>
            </div>
        </div>
    </div>
    <div class="infSen boGd radius p-2">
        <div class="tiInfSen boGd radius px-1">
            Información del envio
        </div>
        <div class="row mt-2">
            <div class="col-12 col-md-6 row">
                <div class="col-12">
                    <h6>Productos:</h6>
                    <h6 class="gris pl-5 pb-2">${entrega}</h6>
                </div>
                <div class="col-12">
                    <h6>Empresa:</h6>
                    <h6 class="gris pl-5 pb-2">${orden.envio.empresa}</h6>
                </div>
                <div class="col-12">
                    <h6>Total a pagar:</h6>
                    <h6 class="gris pl-5 pb-2">${orden.envio.total.toFixed(2)} L. </h6>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <h6>Dirección:</h6>
                <h6 class="gris pl-5 pb-2">${orden.envio.direccion}</h6>
                <div id="mapa" style="width: 100%; height: 200px;" class="boG"></div>
            </div>
        </div>
    </div>
    <div class="p-2">
        <button class="bt btGd float-left boton-asignar" onclick="renOrd();">Atras</button>
        <button class="bt btG float-right boton-asignar" onclick="abrirModal('${codigo}');">Asignar</button>
    </div>`;
}

function renDlv() {
    let contenedorMotoristas = document.getElementById('cntDvl');
    contenedorMotoristas.innerHTML = '';
    usuarios.forEach(motorista => {
        if (motorista.aprobado == null) {
            contenedorMotoristas.innerHTML +=
                `<div class="col-12 py-1">
                <div class="row boB p-1 radius">
                    <h4 class="col-lg-10 col-md-9 col-sm-8 col-xs-6 text-left pt-2">${motorista.nombre}</h4>
                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 fit">
                        <div class="text-left mx-2">
                            <i class="fa-solid fa-circle-check check btDlv" onclick="apDlv('${motorista._id}', true);"></i>
                        </div>
                        <div class="text-right mx-2">
                            <i class="fa-solid fa-circle-xmark error btDlv" onclick="apDlv('${motorista._id}', false);"></i>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    });
}

function apDlv(codigo, val) {
    let dato = {aprobado: val};
    axios({
        method: 'PUT',
        url: `http://localhost:4200/usuarios/motoristas/${codigo}`,
        data: dato,
    })
        .then(res => {
            renArrUs();
            chVal();
        });
}

function lsCatEnt(elemento) {
    let cuerpo = document.getElementById('bodTabEnt');
    cuerpo.innerHTML = '';
    if (elemento.value == 0) {
        filEntTab();
    } else {
        filtro = empresas.filter(empresa => (empresa.codigoCategoria == elemento.value));

        if (filtro.length != 0) {
            

            filtro.forEach(empresa => {
                cuerpo.innerHTML +=
                    `<tr>
                    <th scope="row">${empresa._id}</th>
                    <td>${empresa.nombre}</td>
                    <td>${empresa.descripcion}</td>
                    <td>${empresa.direccion}</td>
                    <td>${empresa.telefono}</td>
                    <td>${empresa.correo}</td>
                </tr>`;
            });
        }
    }
}

function lsProEnt(elemento) {
    let cuerpo = document.getElementById('bodTabPro');
    cuerpo.innerHTML = '';
    if (elemento.value == 0) {
        filProTab();
    } else {
        filtro = productos.filter(producto => (producto.codigoEmpresa == elemento.value));

        if (filtro.length != 0) {
            

            filtro.forEach(producto => {
                cuerpo.innerHTML +=
                    `<tr>
                    <th scope="row">${producto._id}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.precio} L. </td>
                </tr>`;
            });
        }
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

function renImg(elemento) {
    let imagen = document.getElementById(`${elemento.id}2`);
    imagen.setAttribute('src', URL.createObjectURL(elemento.files[0]));
}


//-------------------------------dgEB----------------------------------------
var categorias = [];
var empresas = [];
var productos = [];
var ordenes = [];
var usuarios = [];

var nombreAdmin = getPar('nom');
var idSession = getPar('ses');

var orden;

var expCorreo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
var expTelefono = /^\d{4}-\d{4}$/

var secs = document.getElementsByClassName('secs');
var secFs = document.getElementById('secFs');
var ctrls = document.getElementsByClassName('ctrl');
var modalBodyAdministrador2 = document.getElementById('modal-body-administrador2');

if (idSession.length == 0) {
    idSession = '1';
}

vrfSe();