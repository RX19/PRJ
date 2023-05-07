function cargarMapa() {
    let latitud = 14.069375277315233;
    let longitud = -87.18004673222666;

    coordenadas = {
        lng: longitud,
        lat: latitud
    }

    generarMapa(coordenadas);
}

function generarMapa(coordenadas) {
    let mapa = new google.maps.Map(document.getElementById('mapa'), 
    {
        zoom: 12,
        center: new google.maps.LatLng(coordenadas.lat, coordenadas.lng)
    });

    let marcador = new google.maps.Marker({
        map: mapa,
        draggable: true,
        position: new google.maps.LatLng(coordenadas.lat, coordenadas.lng)
    });

    marcador.addListener('dragend', function(event) {
        document.getElementById('latitud').value = this.getPosition().lat();
        document.getElementById('longitud').value = this.getPosition().lng();
    });
}