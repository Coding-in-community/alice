require('dotenv').config();
const { Commands, Session } = require('./core');
const commands = require('./commands');
const modules = require('./modules');

const session = new Session();
const commandsWrapper = new Commands(commands);

session.on('message_create', (msg) => {
  commandsWrapper.observe(msg, session);
});

modules.forEach((m) => {
  session.on(m.trigger, (..._) => m.callback(session, ..._));
});

session.start();
