require('dotenv').config();
const { Alice } = require('./src/Alice');
const build = require('./src/build');

const path = new build.Path(__dirname);

const alice = new Alice([
  path.create('src/commands/bot', 'bot'),
  path.create('src/commands/coin', 'coin'),
  path.create('src/commands/commands', 'commands'),
  path.create('src/commands/cron', 'cron'),
  path.create('src/commands/dice', 'dice'),
  path.create('src/commands/doc', 'doc'),
  path.create('src/commands/links', 'links'),
  path.create('src/commands/lyric', 'lyric'),
  path.create('src/commands/report', 'report'),
  path.create('src/commands/search', 'search'),
  path.create('src/commands/suggest', 'suggest'),
  path.create('src/commands/wiki', 'wiki'),
]);

alice.initialize();
