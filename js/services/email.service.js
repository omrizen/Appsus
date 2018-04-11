import utilService from './util.service.js'
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'


// const KEY = 'appKey';
var emailsDB = [];

const KEY = 'emailsAppKey'
const EMAILS_NUM = 20;

function query(filter=null) {
    return storageService.load(KEY)
        .then(emails => {
            if (!emails) {
                console.log ('generate emails')
                emails = generateEmails(EMAILS_NUM);
                console.log ('emails' , emails);
                return storageService.store('moshe',emails)
                .then (()=>{
                    console.log ('bla bla');
                    if (filter === null) return emails;
                    else return emails;       
                })
            }
            else{ 
                console.log ('got emails from load')
                return emails;
            }
            // console.log('Cars: ', cars);
            // if (filter === null) return cars;
            // else return cars.filter(car => car.vendor.includes(filter.byVendor))
        })
}


function generateEmails(length) {
    var emails =[];
    console.log('gen email');
    for (var i = 0; i < length; i++) {
        emails.push(generateEmail());
    }
    return emails;
}

function generateEmail() {
    var email = {
        from: utilService.getLoremIpsum(1)+'.gmail.com',
        to: utilService.getLoremIpsum(1)+'gmail.com',
        subject: utilService.getLoremIpsum(6),
        content: utilService.getLoremIpsum(20),
        time: null,
        read:false,
    }
    return email;
}
// function create {

// } 



export default {
    query,
}