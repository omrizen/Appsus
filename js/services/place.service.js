import utilService from './util.service.js'
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY, UPDATE_PLACE } from './event-bus.service.js'
import mapService from './map.service.js'

const KEY = 'placesAppKey';


var markers = [];
window.markers = markers;
var carouselInterval;
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
                        else return places.filter(place => place.name.includes(filter.byName))
                    })
            } else {
                console.log('Places: ', places);
                console.log('filter', filter)
                if (filter === null || !filter.str) return places;
                else return places.filter(place => {
                    if(filter.byName){
                        let loweredCaseName = place.name.toLowerCase();
                        return loweredCaseName.includes(filter.str.toLowerCase())
                    }
                    else{
            
                       return place.tags.some((tag) => {
                           let loweredCaseTag = tag.toLowerCase();
                        return loweredCaseTag.indexOf(filter.str.toLowerCase())>=0 })
                    
                    }
                })
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
        tags: tags[utilService.getRandomInt(0, tags.length)],
        photos: [],
        temp: false
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
            // console.log('placeid', placeId);
            var placeIdx = places.findIndex(place => place.id === placeId);
            // console.log('placeidx',placeIdx)
            places.splice(placeIdx, 1);
            // console.log('before marker del', markers);

            markers[placeIdx].setMap(null);
            markers.splice(placeIdx, 1);

            // console.log('after remove markers:', markers);
            // console.log('service-delete-place',places)
            return storageService.store(KEY, places)
                .then(() => {

                    return places;
                })
        })
}

function deleteTempPlace() {
    return storageService.load(KEY)
        .then(places => {

            if (places[places.length - 1].temp) {
                places.splice(-1, 1);
                markers[markers.length - 1].setMap(null);
                markers.splice(-1, 1);

                return storageService.store(KEY, places)
                    .then(() => {

                        return places;
                    })
            }

        })
}

function addPlace(place) {
    clearInterval(carouselInterval);
    return storageService.load(KEY)
        .then(places => {
            console.log('before Place Push', place);
            places.push(place);

            console.log('after Place Push', place);

            return storageService.store(KEY, places)
                .then(() => {

                    return places;
                })
        })

}
function addTempPlace(marker) {
    return storageService.load(KEY)
        .then(places => {
            places[places.length - 1].temp = false;

            // mapService.prvSearchMarker = null;
            return storageService.store(KEY, places)
                .then(() => {

                    return places;
                })
        })
}

function UpdatePlace(newPlace) {
    return storageService.load(KEY)
        .then(places => {
            // console.log('placeid', placeId);
            var placeIdx = places.findIndex(place => place.id === newPlace.id);
            // console.log('placeidx',placeIdx)

            // console.log('before marker del', markers);

            places[placeIdx] = newPlace;

            // console.log('after remove markers:', markers);
            // console.log('service-delete-place',places)

            return storageService.store(KEY, places)
                .then(() => {

                    return places;
                })
        })
}

function findTempMarker() {
    return storageService.load(KEY)
        .then(places => {
            places[places.length - 1].temp = true;
            return markers[places.length - 1];
        })
}

function renderMarkers(places) {
    console.log('renderMarker got', places)
    places.forEach(place => {
        var marker = addServiceMarker(place);
        markers.push(marker);

    })
    console.log('markers', markers)
    mapService.setMapCenter(places[0].lat, places[0].lng);

    //    console.log(markers[0].setMap(null))
}

function setPrevICon() {
    if (prevMarker) {
        prevMarker.setIcon(prevMarker.defaultIcon);
    }
}

function addMarkerAndPush(place) {
    var marker = addServiceMarker(place);
    markers.push(marker);
    return marker;
}


function createSliderHtml(photos) {
    let str = '<div class="w3-content w3-section" style="width:300px">'
    photos.forEach(photo => {
        str += `<img class="mySlides" src="${photo}" style="width:100%;height:200px;" />`
    });
    str += '</div>';
    console.log(str);
    return str;
}

function addServiceMarker(place) {

    var marker = mapService.addMarker({ lat: place.lat, lng: place.lng }, place.icon)
    marker.addListener('click', () => {
        console.log('clicked marker', place.id);
        let photosSliderHtml = '';
        if (place.photos.length) {
            photosSliderHtml = createSliderHtml(place.photos);
        }
        var content = `
        <div class="info-windows-content">
            
            <h3 class="firstHeading" class="firstHeading">${place.name}</h3>

            <div class="bodyContent">
            <p>${place.desc}</p>
            <p>Tags: ${place.tags}</p>
            <p>
            <span>lat:${place.lat}</span>
            <span>lng:${place.lng}</span>
            </p>
            <p>
            
            </p>
            ${photosSliderHtml}
            </div>
            <button title="Edit Place" class="btn-clear map-controller-buttons edit-marker" data-method="marker-edit" value="${place.id}"><i class="fas fa-pencil-alt"></i></button>
            
            <button title="Add Photo"  class="btn-clear map-controller-buttons edit-marker" data-method="marker-add-photo" value="${place.id}"><i class="fas fa-camera"></i></button>
           
        </div>
      `;
        mapService.infowindow.setContent(content);
        mapService.infowindow.open(mapService.map, marker);
        // setPrevICon();
        // marker.defaultIcon = marker.getIcon();
        // marker.setIcon('https://lh3.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=s64');

        prevMarker = marker;
        addEditButtonListener();
        if (place.photos.length){ 
            carousel();
            carouselInterval = setInterval(carousel, 5000);
        }


    })

    // mapService.infowindow.open(mapService.map, marker);
    return marker;
}

var myIndex = 0;
function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
     // Change image every 2 seconds

}

function addEditButtonListener() {


    let editMarketEls = document.querySelectorAll('.edit-marker');

    editMarketEls.forEach(el => {
        el.addEventListener('click', (ev) => {

            console.log(carouselInterval)
            clearInterval(carouselInterval);
            console.log(carouselInterval)

            console.log('clicked', ev.currentTarget.value)
            var placeId = ev.currentTarget.value;
            console.log('placeId', placeId);
            let action = el.getAttribute('data-method')
            console.log('method', action);

            return storageService.load(KEY)
                .then(places => {
                    var placeIdx = places.findIndex(place => place.id === placeId);
                    console.log('Place-service idx', placeIdx);
                    var place = places[placeIdx];
                    var marker = markers[placeIdx];

                    mapService.infowindow.close(mapService.map, marker);

                    console.log('place=', place)
                    // console.log('marker=',marker.getPosition().lat())
                    if (action === 'marker-edit') {
                        var content = `
                     <div class="edit-place-info-window">

                        <h3 class="edit-place-title">Edit</h3>
                        <label>Name:
                        <input id="edit-place-name" value="${place.name}" </input>
                        </label>
                        <label>Description:
                        <input id="edit-place-desc" value="${place.desc}" </input>
                        </label>
                        <label>Tags:
                        <input id="edit-place-tags" value="${place.tags}" </input>
                        </label>
                        <label>lat:
                        <input id="edit-place-lat" value="${place.lat}" </input>
                        </label>
                        <label>lng:
                        <input id="edit-place-lng" value="${place.lng}" </input>
                        </label>
                        
                        <button class="btn-clear edit-marker-save" data-method="marker-edit" value="${place.id}">Save</button>
                        <button class="btn-clear edit-marker-cancel" data-method="marker-edit" value="${place.id}">Cancel</button>
                        
                     </div>
                    
                `;
                    }
                    else if (action === 'marker-add-photo') {
                        var content = `
                <div class="edit-place-info-window">
                        <div class="flex flex-column space-between align-center">
                            <h3 class="add-place-photo-title">Add Picture</h3>
                            <label>Url: 
                            <input id="img-url-upload" type='text' placeholder="Enter Url" style="padding:7px;" />
                            </label>
                            <img id="myImg" src="" />
                            <div class="edit-buttons">
                                <button class="btn-clear edit-marker-save" data-method="marker-add-photo" value="${place.id}">Save</button>
                                <button class="btn-clear edit-marker-cancel" data-method="marker-add-photo" value="${place.id}">Cancel</button>
                            </div>
                        </div>
                </div>
              `;
                    }
                    mapService.infowindow.setContent(content);
                    mapService.infowindow.open(mapService.map, marker);
                    
                    addSaveButtonListener();
                    addCancelButtonListener();
                    if (action === 'marker-add-photo') {
                    document.querySelector('#img-url-upload').addEventListener('input', function () {
                        console.log('load Image')
                        var img = document.querySelector('#myImg');  // $('img')[0]
                        img.style.width = '400px';
                        img.style.height = 'auto';
                        img.src = document.querySelector('#img-url-upload').value; // set src to file url


                    });
                }

                    return Promise.resolve();
                })
        })
    });


}



function addSaveButtonListener() {

    document.querySelector('.edit-marker-save').addEventListener('click', (ev) => {
        // console.log('clicked',ev.target.value)
        var placeId = ev.target.value;
        let action = ev.target.getAttribute('data-method');
        console.log('method', action);
        return storageService.load(KEY)
            .then(places => {
                var placeIdx = places.findIndex(place => place.id === placeId);
                // console.log('Place-service idx', placeIdx);
                var place = places[placeIdx];
                var marker = markers[placeIdx];
                // console.log('place=',place)
                // console.log('marker=',marker.getPosition().lat())
                if (action === 'marker-edit') {
                    place.name = document.getElementById('edit-place-name').value;
                    place.desc = document.getElementById('edit-place-desc').value;
                    place.lat = +(document.getElementById('edit-place-lat').value);
                    place.lng = +(document.getElementById('edit-place-lng').value);
                    place.tags = document.getElementById('edit-place-tags').value;
                }
                else if (action === 'marker-add-photo') {
                    var imgSrc = document.querySelector('#myImg').src;
                    place.photos.push(imgSrc);
                }
                // console.log('place-name-save', place)
                marker.setMap(null);
                let newMarker = addServiceMarker(place);
                markers[placeIdx] = newMarker;
                mapService.triggerMarker(markers[placeIdx]);
                eventBus.$emit(UPDATE_PLACE, place);

                return Promise.resolve();
            })
    })
}

function addCancelButtonListener() {
    document.querySelector('.edit-marker-cancel').addEventListener('click', (ev) => {
        var placeId = ev.target.value;
        return storageService.load(KEY)
            .then(places => {
                var placeIdx = places.findIndex(place => place.id === placeId);
                // console.log('Place-service idx', placeIdx);
                var marker = markers[placeIdx];
                // console.log('place=',place)
                // console.log('marker=',marker.getPosition().lat())
                mapService.triggerMarker(markers[placeIdx]);
                return Promise.resolve();
            })
    })

}
function chosePlace(placeId) {
    clearInterval(carouselInterval);
    return storageService.load(KEY)
        .then(places => {
            var placeIdx = places.findIndex(place => place.id === placeId);
            // console.log('Place-service idx', placeIdx);
            var place = places[placeIdx];
            mapService.triggerMarker(markers[placeIdx]);
            mapService.setMapCenter(place.lat, place.lng);
            mapService.setMapZoom();
            // console.log('map-zoom',mapService.map.getZoom())
            // console.log('map center',mapService.map.getCenter())
            return Promise.resolve();
        })
}


// function choseSearchPlace (autoCompletePlace) {
//     console.log('place-service-autocomplete',autoCompletePlace);
// }

export default {
    query,
    renderMarkers,
    renderMap,
    deletePlace,
    chosePlace,
    addServiceMarker,
    addPlace,
    deleteTempPlace,
    addTempPlace,
    findTempMarker,
    addMarkerAndPush,
    UpdatePlace

}