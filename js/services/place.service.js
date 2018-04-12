import utilService from './util.service.js'
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'
import mapService from './map.service.js'

const KEY = 'carsAppKey';

var markers = [];

var prevMarker = null;

function query(filter = null) {
    console.log('get query')

    return storageService.load(KEY)
        .then(places => {
            // console.log(places);
            if (!places || !places.length) {
                console.log('create places')
                places = generatePlaces();
                return storageService.store(KEY, places)
                    .then(() => {
                        if (filter === null) return places;
                        else return places.filter(place => place.id.includes(filter.byVendor))
                    })
            } else {
                console.log('Places: ', places);
                if (filter === null) return places;
                else return places.filter(place => place.id.includes(filter.byVendor))
            }
        })
}


function generatePlaces() {
    var places = []
    for (let index = 0; index < 4; index++) {
        var book = createPlace()
        places.push(book)

    }
    return places;
}

function createPlace() {
    var tags = ['food', 'fun', 'work', 'music', 'guitar']
    return {
        id: utilService.makeid(4),
        name: 'aa' + utilService.getRandomInt(30, 40),
        desc: 'desc' + utilService.getRandomInt(30, 40),
        lat: utilService.getRandomDouble(32, 32.5),
        lng: utilService.getRandomDouble(34.8, 35),
        tag: tags[utilService.getRandomInt(0, tags.length)],
    }
}
function renderMap() {
    return mapService.getMap()
        .then(() => {
            // mapService.addMarker();
        });
}

function deletePlace(placeId) {
    return storageService.load(KEY)
        .then(places => {
            console.log('placeid', placeId);
            var placeIdx = places.findIndex(place => place.id === placeId);
            places.splice(placeIdx, 1);
            console.log('before marker del', markers);

            markers[placeIdx].setMap(null);
            markers.splice(placeIdx, 1);

            console.log('after remove markers:', markers);
            return storageService.store(KEY, places);
        })
}

function renderMarkers(places) {
    console.log('renderMarker got', places)
    places.forEach(place => {
        addServiceMarker(place);
    })
    console.log('markers', markers)
    //    console.log(markers[0].setMap(null))
}

function setPrevICon() {
    if (prevMarker) {
        prevMarker.setIcon(prevMarker.defaultIcon);
    }
}

function addServiceMarker(place) {

    var marker = mapService.addMarker({ lat: place.lat, lng: place.lng })
    markers.push(marker);
    marker.addListener('click', () => {
        console.log('clicked marker', place.id);

        var content = `
            <div id="content">
            <div id="siteNotice">
            </div><h1 id="firstHeading" class="firstHeading">${place.name}</h1>
            <div id="bodyContent">
            <p><b>Place: ${place.name}</b>${place.desc}</p>
            <p>
            <span>lat:${place.lat}</span>
            <span>lng:${place.lng}</span>
            </p>
             </div>
      `;
        mapService.infowindow.setContent(content);
        mapService.infowindow.open(mapService.map, marker);
        setPrevICon();
        marker.defaultIcon = marker.getIcon();
        marker.setIcon('https://lh3.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=s64');

        prevMarker = marker;

    })
}

function chosePlace(placeId) {
    return storageService.load(KEY)
    .then(places => {
        var placeIdx = places.findIndex(place => place.id === placeId);
        // console.log('Place-service idx', placeIdx);
        var place = places[placeIdx];
        mapService.triggerMarker(markers[placeIdx]);
        mapService.setMapCenter(place.lat,place.lng);
        // console.log('map center',mapService.map.getCenter())
        return Promise.resolve();
    })
}

export default {
    query,
    renderMarkers,
    renderMap,
    deletePlace,
    chosePlace
}