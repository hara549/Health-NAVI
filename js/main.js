$(function () {

    'use strict';

    //google map
    var map;
    var service;
    //�����l�𓌋��s�a�J��Ƃ���
    var pyrmont = new google.maps.LatLng(35.658034, 139.701636);
    createMap(pyrmont)


    // ���ݒn�擾
    document.getElementById('getcurrentlocation').onclick = function () {
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
            zoom: 15
        });
        nearbysearch(pyrmont)
    }

    function createMarker(latlng, icn, place) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });

        var placename = place.name;
        // �����o���Ɏ{�݂̖��O�𖄂ߍ���
        var contentString = `<div class="sample"><p id="place_name">${placename}</p></div>`;

        // �����o��
        var infoWindow = new google.maps.InfoWindow({ // �����o���̒ǉ�
            content: contentString// �����o���ɕ\��������e
        });


        marker.addListener('click', function () { // �}�[�J�[���N���b�N�����Ƃ�
            infoWindow.open(map, marker); // �����o���̕\��
        });

    }

    // ���ݒn�̃A�C�R����\��
    function CurrentPositionMarker(pyrmont) {
        var image = 'http://i.stack.imgur.com/orZ4x.png';
        var marker = new google.maps.Marker({
            position: pyrmont,
            map: map,
            icon: image
        });
        marker.setMap(map);
    }

    // ���ӂ̕a�@������
    function nearbysearch(pyrmont) {
        var request = {
            location: pyrmont,
            radius: '1500',
            type: ['hospital']
            //type: https://developers.google.com/places/supported_types
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                //�擾�����a�@�������ꂼ��createMarker�ɓ���āA�}�[�J�[���쐬
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    //console.log(place)
                    var latlng = place.geometry.location;
                    var icn = place.icon;

                    createMarker(latlng, icn, place);
                }
            }
        }
    }
});
