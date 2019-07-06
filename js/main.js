$(function () {

    'use strict';

    //診療科検索から遷移時、セレクトボックスの初期値を設定する
    var query = location.search;
    var value = query.split('=');
    var department = decodeURIComponent(value[1]);
    $('#selectbox').val(department);

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
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
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
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
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




    // //google map
    // var map;
    // var service;
    // //初期位置を東京都渋谷駅とする
    // var pyrmont = new google.maps.LatLng(35.658034, 139.701636);
    // createMap(pyrmont)
    //
    //
    // // 現在地検索ボタン押下時
    // document.getElementById('getcurrentlocation').onclick = function () {
    //     geoLocationInit();
    // }
    //
    // function geoLocationInit() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(success, fail);
    //
    //     } else {
    //         createMap(pyrmont);
    //     }
    // }
    //
    // // success
    // function success(position) {
    //     var currentLat = position.coords.latitude;
    //     var currentLng = position.coords.longitude;
    //
    //     var pyrmont = new google.maps.LatLng(currentLat, currentLng);
    //
    //     createMap(pyrmont)
    //
    //     CurrentPositionMarker(pyrmont);
    // }
    //
    // // fail
    // function fail(pyrmont) {
    //     createMap(pyrmont);
    // }
    //
    // function createMap(pyrmont) {
    //
    //     map = new google.maps.Map(document.getElementById('map'), {
    //         center: pyrmont,
    //         zoom: 15
    //     });
    //     nearbysearch(pyrmont)
    // }
    //
    // function createMarker(latlng, icn, place) {
    //     var marker = new google.maps.Marker({
    //         position: latlng,
    //         map: map
    //     });
    //
    //     var placename = place.name;
    //     var contentString = `<div class="sample"><p id="place_name">${placename}</p></div>`;
    //
    //     var infoWindow = new google.maps.InfoWindow({
    //         content: contentString
    //     });
    //
    //
    //     marker.addListener('click', function () {
    //         infoWindow.open(map, marker);
    //     });
    //
    // }
    //
    // // 現在地のマーカーを設定する
    // function CurrentPositionMarker(pyrmont) {
    //     var image = 'http://i.stack.imgur.com/orZ4x.png';
    //     var marker = new google.maps.Marker({
    //         position: pyrmont,
    //         map: map,
    //         icon: image
    //     });
    //     marker.setMap(map);
    // }
    //
    // // 周辺の病院を検索する
    // function nearbysearch(pyrmont) {
    //     var request = {
    //         location: pyrmont,
    //         radius: '1500',
    //         type: ['hospital']
    //         //type: https://developers.google.com/places/supported_types
    //     };
    //
    //     service = new google.maps.places.PlacesService(map);
    //     service.nearbySearch(request, callback);
    //
    //     function callback(results, status) {
    //         if (status == google.maps.places.PlacesServiceStatus.OK) {
    //             for (var i = 0; i < results.length; i++) {
    //                 var place = results[i];
    //                 var latlng = place.geometry.location;
    //                 var icn = place.icon;
    //
    //                 createMarker(latlng, icn, place);
    //             }
    //         }
    //     }
    // }
});
