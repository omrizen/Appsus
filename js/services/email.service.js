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
                     return emails.filter(email =>{
                        return getEmailFilter(email, filter);
                     })
                }
            }
        
        })
}

    function getEmailFilter(email, filter) {
        var resFilterRead
          if (filter.byRead === 'read'){
               resFilterRead = (email.read === true);
          } else if (  filter.byRead === 'unread'){
            resFilterRead = (email.read === false);
          }
          else resFilterRead=true;

          return resFilterRead && email.content.includes(filter.byContent) 
    }


function deleteEmail(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            eventBus.$emit(USR_MSG_DISPLAY, {txt:'email was deleted',type:'success'});
            return storageService.store(KEY, emails);  
        })
}



// function addEmail(id,review) {
//     return storageService.load(KEY)
//         .then(emails => {
//             var emailIdx = emails.findIndex(email => email.id === emailId);
//             emails.splice(emailIdx, 1);
//             return storageService.store(KEY, emails);
//         })
// }
//     var book = booksDB.find(book => id === book.id)
//     book.reviews.unshift(review)
//     storageService.store(BOOKS_KEY, booksDB)
//     eventBus.$emit(USR_MSG_DISPLAY, {txt:'Review added',type:'success'});
//     return Promise.resolve(review)
// }


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

// function makeEmailRead(emailId){
//     var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
// }

function saveEmail(email) {
    return storageService.load(KEY)
        .then(emails => {
            if (email.id) {
                var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id)
                emails.splice(emailIdx, 1, email);
            } else {
                // email.id = Date.now();
                // cars.push(car);
            }
            return storageService.store(KEY, emails);
        });
}


function generateEmail() {
    var email = {
        id: utilService.makeid(10),
        from: utilService.getLoremIpsum(1) + '.gmail.com',
        to: utilService.getLoremIpsum(1) + 'gmail.com',
        subject: utilService.getLoremIpsum(6),
        content: utilService.getLoremIpsum(20),
        sentTime: utilService.getRandomInt (date.now()-10000 , date.now()),
        read: false,
    }
    return email;
}

export default {
    query,
    getById,
    deleteEmail,
    saveEmail,
}