import { GoogleMapsApi } from './gmap.class.js';
import locService from './loc.service.js'
import mapService from './map.service.js'

var map;
// locService.getLocs()
//     .then(locs => console.log('locs', locs))

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
function addMarker(loc = { lat: 32.0749831, lng: 34.9120554 }) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        icon: 'http://www.myiconfinder.com/uploads/iconsets/64-64-f900504cdc9f243b1c6852985c35a7f7.png',
        title: 'Hello World!'
    });
    return marker;
}

function autoCompleteInput() {
    let res = null;
    var input = document.getElementById('add-address');
    var autocomplete = new google.maps.places.Autocomplete(input);
    
   google.maps.event.addListener(autocomplete, 'place_changed', () => {
        console.log('changed!');
        console.log('autpcomplete:',autocomplete);
        res = autocomplete;
        setTimeout(() => {
            document.querySelector(".form-place-add .sub").click();
          
        },0)
        // return autocomplete;
        

    })
    return res;
    
}

google.maps.event.addDomListener(window, 'load', autoCompleteInput);

var infowindow = new google.maps.InfoWindow();

function triggerMarker (marker) {
    google.maps.event.trigger(marker, 'click');
}

function setMapCenter (lat,lng) {
    map.setCenter(new google.maps.LatLng(lat, lng));
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
    autoCompleteInput
}

