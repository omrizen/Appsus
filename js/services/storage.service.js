

function store(key, any) {
    localStorage[key] = JSON.stringify(any);
    console.log ('store');    
    return Promise.resolve();
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