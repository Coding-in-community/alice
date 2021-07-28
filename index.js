require('dotenv').config();
const { Alice } = require('./src/Alice');
const {
  Bot,
  Coin,
  Commands,
  Cron,
  Doc,
  Links,
  Lyric,
  Report,
  Search,
  Suggest,
  Wiki,
} = require('./src/commands');

const alice = new Alice([
  new Bot(),
  new Coin(),
  new Commands(),
  new Cron(),
  new Doc(),
  new Links(),
  new Lyric(),
  new Report(),
  new Search(),
  new Suggest(),
  new Wiki(),
]);

alice.initialize();
