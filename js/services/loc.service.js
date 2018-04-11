// ES6 Object shorthand syntax:
// var x = 9;
// var y = 8;

// var obj = {x, y};
// console.log('obj', obj);



var locs = [{lat: 11.22, lng: 22.11}]

function getLocs1() {
    return Promise.resolve(locs);
}

function getLocs() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    console.log('Getting Pos');
    
    return new Promise((resolve, reject)=>{
        // console.log('aa')
        // navigator.geolocation.getCurrentPosition()
        // navigator.geolocation.watchPosition( resolve, reject,{maximumAge:60000, timeout:5000, enableHighAccuracy:true});
        navigator.geolocation.getCurrentPosition(resolve, reject, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    })
}



export default {
    getLocs,
    getPosition
}