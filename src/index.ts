import 'dotenv/config';
import { Commands, Session } from './core';
import commands from './commands';
import modules from './modules';

const session = new Session();
const commandsWrapper = new Commands(commands);

session.on('message_create', (msg) => {
  commandsWrapper.observe(msg, session);
});

modules.forEach((m) => {
  session.on(m.trigger, (..._) => m.callback(..._, session));
});

session.start();
