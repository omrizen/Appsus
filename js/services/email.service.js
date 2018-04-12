import utilService from './util.service.js'
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'


// const KEY = 'appKey';
var emailsDB = [];

const KEY = 'emailsAppKey'
const EMAILS_NUM = 20;

function query(filter = null) {
    return storageService.load(KEY)
        .then(emails => {
            if (!emails) {
                console.log('generate emails')
                emails = generateEmails(EMAILS_NUM);
                console.log('emails', emails);
                storageService.store(KEY, emails)
                    .then(() => {
                        storageService.load(KEY)
                        .then (emails =>{
                            return emails;
                        })
                        
                        // }
                    })
            }
            else {
                console.log('got emails from load')
                if (filter === null) return emails;
                else {
                     console.log ('filter' , filter);   
                     return emails.filter(email => email.content.includes(filter.byContent))
                }
            }
            // console.log('Cars: ', cars);
            // if (filter === null) return cars;
            // else return cars.filter(car => car.vendor.includes(filter.byVendor))
        })
}

function deleteEmail(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            return storageService.store(KEY, emails);
        })
}


function generateEmails(length) {
    var emails = [];
    console.log('gen email');
    for (var i = 0; i < length; i++) {
        emails.push(generateEmail());
    }
    return emails;
}


function getById(id) {
    return storageService.load(KEY)
        .then(items => {
            console.log ('getbyId' , items);
            return items.find(item => item.id === id);
        })
}


function generateEmail() {
    var email = {
        id: utilService.makeid(10),
        from: utilService.getLoremIpsum(1) + '.gmail.com',
        to: utilService.getLoremIpsum(1) + 'gmail.com',
        subject: utilService.getLoremIpsum(6),
        content: utilService.getLoremIpsum(20),
        sentTime: null,
        read: false,
        statusRead: 'unRead'
    }
    return email;
}
// function create {

// } 



export default {
    query,
    getById,
    deleteEmail 
}