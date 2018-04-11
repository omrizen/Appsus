import utilService from './util.service.js'
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'


// const KEY = 'appKey';
var emailsDB = [];

const EMAILS_KEY = 'emails'


    function query(filter = null) {
        return storageService.load(EMAILS_KEY)
            .then(emails => {
                // console.log('Cars: ', cars);
                // if (filter === null) return cars;
                // else return cars.filter(car => car.vendor.includes(filter.byVendor))
            })
    }


function generateEmails(length) {
    console.log('gen email');
    for (var i = 0; i < length; i++) {
        emailsDB.push(generateEmail());
    }
}

function generateEmail() {
    var email = {
        to: 'to',
        subject: 'mo',
        content: 'roro'
    }
    return email;
}
// function create {

// } 



export default {
    query,
}