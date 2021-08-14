require('dotenv').config();
const { Alice } = require('./src/Alice');
const commands = require('./src/commands');
const modules = require('./src/modules');

const alice = new Alice({ commands, modules });

alice.init();
