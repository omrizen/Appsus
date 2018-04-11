

function store(key, any) {
    localStorage[key] = JSON.stringify(any);
}

function load(key) {
    var str = localStorage[key] || 'null';
    // console.log('json parse str',JSON.parse(str));
    return Promise.resolve(JSON.parse(str)) ;
}

export default {
    store,
    load
}