const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();
/* 
You can create event listeners here.
EX:
  eventEmitter.on('sendReminderEmail', async ({ email, name }) => {
    const EmailService = require('../services/EmailService');
    await EmailService.send(email);
  })
*/

module.exports = eventEmitter;
