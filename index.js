let map, infoWindow;

let markers = [];

let ids = [];

  // ABRIR O MAPA

    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
      center:  {lat: -34.397, lng: 150.644 },
      zoom: 2,
    });
      infoWindow = new google.maps.InfoWindow();
      navigator.geolocation.getCurrentPosition(
      (position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent("You are here!");
      infoWindow.open(map);
      map.setCenter(pos);

      // POSIÇÃO ATUAL DE ONDE VOCÊ ESTÁ
      const markeActual = new google.maps.Marker({
        position: pos,
        map: map,
        title: "You are here!"
      })
    })  
      // BOTÂO DE INSIRI MARCADOR NO MAPA
      const locationButton = document.getElementById("btMark");
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);

      funcionSelectUpdateDelete();
  
  }

    function funcionSelectUpdateDelete(){
        $.ajax({
        url: 'selecionar.php',
        method: 'GET',
        dataType: 'json',
    success: function(data){
      for (let i = 0; i < data.length; i++) {
        const idSelect = data[i].id;
        const nameSelect = data[i].nome;
        const latitudeSelect = parseFloat(data[i].latitude);
        const longitudeSelect = parseFloat(data[i].longitude);
        const pos = new google.maps.LatLng(latitudeSelect, longitudeSelect);
        const mark = new google.maps.Marker({
           position: pos,
           map:map,
           title: nameSelect
        });
        ids.push(idSelect);
        markers.push(mark);

        mark.addListener("click", () => {
          for (let index = 0; index < markers.length; index++) {
            markers[index].id = ids[index];
          }
          $('#ex2').modal('show');

          $(document).ready(function(e) {
            $("#btDelete").click(function(e) {
            e.preventDefault();
            const deleteMarker = mark.id;
              $.ajax({
                type: "POST",
                url: 'excluir.php',
                data: {id: deleteMarker},
              }).done(function(result){
               console.log(result);
            })
            $('#ex2').modal('hide');
          })
         })
        })
       }
      }
    })
   }
 
      // ABRIR O MODAL DE INSERIR NOME DO MARCADOR 
      function apertarBt(){
        map.addListener("click", (mapsMouseEvent) => {
        localizacao = mapsMouseEvent.latLng;
        $('#ex1').modal('show');
        })
      }
    
    //DADOS ENVIADOS AO BACK-END
    $(document).ready(function(e) {
      $("#formModal").submit(function(e) {
        e.preventDefault();
        const nameMark = ($("#nome").val());
        const lugar = localizacao.toString();
        const variavel = lugar.split(",");
        const latitude = variavel[0];
        const latitudeFinal = latitude.substr(1);
        const longitude = variavel[1];
        const longitudeFinal = longitude.substr(0, longitude.length - 1);
  
        const valores = {
          'nome': nameMark,
          'latitude': latitudeFinal,
          'longitude': longitudeFinal
        }
    
        const dados = JSON.stringify(valores);
    
        $.ajax({
            type: "POST",
            url: 'inserir.php',
            data: {
            name: nameMark,
            latitude: latitudeFinal,
            longitude: longitudeFinal},
        }).done(function(result){
        console.log(result);
        }).fail(function(err){
        console.log(err);
        })
    
        $('#nome').val('');
        $('#ex1').modal('hide');

        funcionSelectUpdateDelete();
      })
    })

      $(document).ready(function() {
        $("#btUpdate").click(function(e) {
        e.preventDefault();
        $('#ex2').modal('hide');
        $('#ex3').modal('show');
        })
      })

      $(document).ready(function(e) {
        $("#formModalUpdate").submit(function(e) {
        e.preventDefault();
        const nameMarkUpdate = ($("#nomeUpdate").val());
          $.ajax({
            type: "POST",
            url: 'update.php',
            data: {
            nameUp: nameMarkUpdate,
            }
          }).done(function(result){
             console.log(result);
          }).fail(function(err){
             console.log(err);
          })
        })
      })


