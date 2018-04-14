import { GoogleMapsApi } from './gmap.class.js';
import locService from './loc.service.js'
import placeService from './place.service.js'
import utilService from './util.service.js'
import eventBus, { ADD_PLACE } from './event-bus.service.js'

var map;

// locService.getLocs()
//     .then(locs => console.log('locs', locs))


// var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

// var icons = {
//     parking: {
//         icon: iconBase + 'parking_lot_maps.png'
//     },
//     library: {
//         icon: iconBase + 'library_maps.png'
//     },
//     info: {
//         icon: iconBase + 'info-i_maps.png'
//     },
//     political : {
//         icon: iconBase + 'info-i_maps.png'

//     }
// };




// function setPrevMarker(marker) {
//     console.log('setPrevMarker');
//     if (prvSearchMarker) {
//         prvSearchMarker.setMap(null);
//     }
//     prvSearchMarker = marker;
// }

function getMap(lat = 32.0749831, lng = 34.9120554) {

    console.log('InitMap');

    const gmapApi = new GoogleMapsApi();
    return gmapApi.load().then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })

        console.log('Map!', map);
    });


}
function addMarker(loc = { lat: 32.0749831, lng: 34.9120554 }, icon) {
    let remembericon = 'http://www.myiconfinder.com/uploads/iconsets/64-64-f900504cdc9f243b1c6852985c35a7f7.png'
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        icon:  icon ||remembericon,
        title: 'Hello World!'
    });
    return marker;
}

function autoCompleteInput() {
    let res = null;
    var input = document.getElementById('add-address');
    var autocomplete = new google.maps.places.Autocomplete(input);
    window.autocomplete = autocomplete;

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        console.log('changed!');
        // console.log('autpcomplete:',autocomplete);
        choseSearchPlace(autocomplete.getPlace());

        // setTimeout(() => {
        //     document.querySelector(".form-place-add .sub").click();

        // },0)
        // return autocomplete;
        // console.log(autoCompletePlace)

    })
    // console.log(autoCompletePlace);
    return res;

}

function choseSearchPlace(placeAtcp) {
    console.log('map-service-place', placeAtcp);
    var place = {

        id: utilService.makeid(4),
        name: placeAtcp.name,
        desc: placeAtcp.formatted_address,
        lat: placeAtcp.geometry.location.lat(),
        lng: placeAtcp.geometry.location.lng(),
        tags: placeAtcp.types,
        serverphotos: placeAtcp.photos,
        temp: true,
        icon: placeAtcp.icon,
        photos: []
    }

    placeService.findTempMarker()
        .then((marker) => {
            placeService.deleteTempPlace()
                .then(() => {

                    var marker = placeService.addMarkerAndPush(place)
                    triggerMarker(marker);
                    map.setCenter(new google.maps.LatLng(place.lat, place.lng));
                    setMapZoom();
                    eventBus.$emit(ADD_PLACE, place);
                })
        })

}

google.maps.event.addDomListener(window, 'load', autoCompleteInput);

var infowindow = new google.maps.InfoWindow();

function triggerMarker(marker) {
    google.maps.event.trigger(marker, 'click');
}

function setMapCenter(lat, lng) {
    map.setCenter(new google.maps.LatLng(lat, lng));
}

function setMapZoom(zoom = 15) {
    if (map.getZoom() < zoom) map.setZoom(zoom);
    // console.log('map-zoom', map.getZoom())
}



export default {
    // initMap,
    // addMarker,
    map,
    getMap,
    addMarker,
    infowindow,
    triggerMarker,
    setMapCenter,
    autoCompleteInput,
    setMapZoom,
}

