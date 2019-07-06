$(function () {

    'use strict';

    //診療科検索から遷移時、セレクトボックスと検索ボックスの初期値を設定する
    var query = location.search;
    var value = query.split('=');
    var department = decodeURIComponent(value[1]);
    $('#selectbox').val(department);
    var selectbox = String($('#selectbox option:selected').text());
    if (selectbox) {
      $('#pac-input').val(selectbox + "　");
    }


    //セレクトボックス変更時、検索ボックスのテキストに追記する
    $('#selectbox').on('change', function(){
      var selectbox = String($('#selectbox option:selected').text());
      $('#pac-input').val(selectbox + "　");
    });

    initAutocomplete();

    function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 35.658034, lng: 139.701636},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var department = $('#selectbox option:selected').text();
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          } else {
            //検索結果一覧を表示
            var result = "";
            var name;
            var address;
            var rating;

            var result_title = '<div id="result_title">検索結果　　' + places.length + '　件</div>';
            for (var i = 0; i < places.length; i++) {
              name = places[i].name;
              address = places[i].formatted_address;
              rating = places[i].rating;
              result += '<div id="result"><p>' + name + '</p><p>' + address + '</p><p><i class="far fa-star"></i>評価　' + rating + '</p></div>';
            }
            document.getElementById('results').innerHTML = result_title + result;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            // var icon = {
            //   url: place.icon,
            //   size: new google.maps.Size(71, 71),
            //   origin: new google.maps.Point(0, 0),
            //   anchor: new google.maps.Point(17, 34),
            //   scaledSize: new google.maps.Size(25, 25)
            // };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: './img/byoin_1.png',
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }




    // 現在地検索ボタン押下時
    var map;
    var service;

    document.getElementById('getcurrentlocation').onclick = function () {
      //初期位置を東京都渋谷駅とする
      var pyrmont = new google.maps.LatLng(35.658034, 139.701636);

      geoLocationInit();
    }

    function geoLocationInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, fail);

        } else {
            createMap(pyrmont);
        }
    }

    // success
    function success(position) {
        var currentLat = position.coords.latitude;
        var currentLng = position.coords.longitude;

        var pyrmont = new google.maps.LatLng(currentLat, currentLng);

        createMap(pyrmont)

        CurrentPositionMarker(pyrmont);
    }

    // fail
    function fail(pyrmont) {
        createMap(pyrmont);
    }

    function createMap(pyrmont) {

        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 13
        });
        nearbysearch(pyrmont)
    }

    function createMarker(latlng, icn, place) {
        var marker = new google.maps.Marker({
            icon: './img/byoin_1.png',
            position: latlng,
            map: map
        });

        var placename = place.name;
        var contentString = `<div class="sample"><p id="place_name">${placename}</p></div>`;

        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });


        marker.addListener('mouseover', function () {
            infoWindow.open(map, marker);
        });
        marker.addListener('mouseout', function () {
            infoWindow.close(map, marker);
        });

    }

    // 現在地のマーカーを設定する
    function CurrentPositionMarker(pyrmont) {
        var image = './img/m1.png';
        var marker = new google.maps.Marker({
            position: pyrmont,
            map: map,
            icon: image
        });
        marker.setMap(map);
    }

    // 周辺の病院を検索する
    // 選択した診療科をキーワードに検索する
    function nearbysearch(pyrmont) {
        var keyword = String($('#selectbox option:selected').text());
        var request = {
            location: pyrmont,
            radius: '1500',
            keyword: keyword
            // type: ['hospital']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    var latlng = place.geometry.location;
                    var icn = place.icon;

                    createMarker(latlng, icn, place);
                }
                //検索結果一覧を表示
                var result = "";
                var name;
                var address;
                var rating;

                var result_title = '<div id="result_title">検索結果　　' + results.length + '　件</div>';
                for (var i = 0; i < results.length; i++) {
                  name = results[i].name;
                  address = results[i].vicinity;
                  rating = results[i].rating;
                  result += '<div id="result"><p>' + name + '</p><p>' + address + '</p><p><i class="far fa-star"></i>評価　' + rating + '</p></div>';
                }
                document.getElementById('results').innerHTML = result_title + result;

            }
        }
    }
});
