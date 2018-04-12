

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function getRandomDouble(min, max) {
    return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeid(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

function getCurrency(currencyCode) {
    switch(currencyCode){
        case 'ILS' : 
            return '₪';
        case 'EUR' : 
            return '€';
        case 'USD' :
            return '$';
        default:
            return '';
    }
}
function getLoremIpsum(wordsCount) {
    var wordsCount = getRandomInt(1,wordsCount+1);  
    var str = '';
    for (var i=0; i<wordsCount; i++){
        str += getRandomWord (getRandomInt(3,6));
        if (i<wordsCount-1) str += ' ';
    }
    return str;
}

function getRandomWord(count) {
    var str ='';
    for (var i=0; i<count; i++){
        var randNumber = getRandomInt(65,91);
        var letter = String.fromCharCode(randNumber);
        str += letter;
    }
    return str;
}

export default {
    getRandomInt,
    getRandomString : makeid,
    getCurrency,
    getLoremIpsum,
    makeid,
    getRandomDouble
}

