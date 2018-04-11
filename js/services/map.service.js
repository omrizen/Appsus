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



export default {
    // initMap,
    // addMarker,
    getMap,
    addMarker
}

