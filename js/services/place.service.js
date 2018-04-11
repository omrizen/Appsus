import utilService from './util.service.js'
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'
import mapService from './map.service.js'

const KEY = 'carsAppKey';


function query(filter = null) {
    console.log('get query')
    return storageService.load(KEY)
        .then(places => {
            // console.log(places);
            if (!places) {
                console.log('create places')
                places = generatePlaces();
                storageService.store(KEY, places)
            }
            console.log('Places: ', places);
            if (filter === null) return places;
            else return places.filter(car => car.vendor.includes(filter.byVendor))
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
        name: 'aa',
        desc: 'desc',
        lat: utilService.getRandomInt(30, 40),
        lng: utilService.getRandomInt(30, 40),
        tag: tags[utilService.getRandomInt(0, tags.length)],
    }
}
function renderMap() {
    return mapService.getMap()
        .then(() => {
            // mapService.addMarker();
        });
}
function renderMarkers(places) {
    console.log('renderMarker got',places)
    places.forEach(place => {
        mapService.addMarker({ lat: place.lat, lng: place.lng })
        .addListener('click', () => {
            console.log('clicked marker');
        })
    })
}

export default {
    query,
    renderMarkers,
    renderMap
}