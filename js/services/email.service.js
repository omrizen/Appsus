import utilService from './util.service.js'
import storageService from './storage.service.js'
import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'

// const KEY = 'appKey';
var emailsDB = [];

const KEY = 'emailsAppKey'
const EMAILS_NUM = 3;

function query(filter = null, isSortByDate = true) {
    var unRead=0;
    return storageService.load(KEY)
        .then(emails => {
            if (!emails) {
                emails = generateEmails(EMAILS_NUM);
                return storageService.store(KEY, emails)
                    .then(() => {
                        return storageService.load(KEY)
                            .then(emails => {
                                console.log('mmmmmmmmmmm');
                                return emails;
                            })

                        // }
                    })
            }
            else {
                if (filter === null) {
                    emails = getSorted(isSortByDate, emails);
                    console.log('emails', emails);
                    return emails;
                }
                else {
                    // filter.byContent = filter.byContent.toLowerCase();
                    emails = emails.filter(email => {
                        return getEmailFilter(email, filter);
                    })
                    return getSorted(isSortByDate, emails )
                }

            }

        })
}
function getSorted(isSortByDate, emails) {
    if (isSortByDate) {
        emails.sort((email1, email2) => {
            if (email1.sentTime < email2.sentTime) return 1;
            else if (email1.sentTime > email2.sentTime) return -1
            else return 0;
        })
    }else{
        emails.sort((email1, email2) => {
            console.log ('emailsubject' ,email1.subject );
            if (email1.subject > email2.subject) return 1;
            else if (email1.subject < email2.subject) return -1
            else return 0;
        })
    }
    console.log ('emails', emails);
    return emails;
}



function getEmailFilter(email, filter) {
    var unRead=0;
    var resFilterRead
    if (filter.byRead === 'read') {
        console.log('read');
        resFilterRead = (email.read === true);
    } else if (filter.byRead === 'unread') {
        resFilterRead = (email.read === false);
    }
    else resFilterRead = true;
    

    return resFilterRead && email.content.includes(filter.byContent)
}


function deleteEmail(emailId) {
    return storageService.load(KEY)
        .then(emails => {
            var emailIdx = emails.findIndex(email => email.id === emailId);
            emails.splice(emailIdx, 1);
            eventBus.$emit(USR_MSG_DISPLAY, { txt: 'email was deleted', type: 'success' });
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
            console.log('getbyId', items);
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
                email.id = utilService.makeid(10);
                email.sentTime = Date.now();
                email.from = 'omrize.gmail.com'
                email.read=false;
                emails.push(email);
                eventBus.$emit(USR_MSG_DISPLAY, { txt: 'email was sent', type: 'success' });
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
        content: utilService.getLoremIpsum(60,20),
        sentTime: utilService.getRandomInt(Date.now() - 10000000, Date.now()),
        read: false,
    }
    console.log('email.sentTime', email.sentTime);
    return email;
}

export default {
    query,
    getById,
    deleteEmail,
    saveEmail,
}