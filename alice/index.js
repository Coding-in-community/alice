// imports
const src = require('./src');
const build = require('./src/build');

// instance
const path = new build.Path(__dirname);

const alice = new src.Alice([
  path.create('scripts/bot', 'bot'),
  path.create('scripts/coin', 'coin'),
  path.create('scripts/commands', 'commands'),
  path.create('scripts/cron', 'cron'),
  path.create('scripts/dice', 'dice'),
  path.create('scripts/doc', 'doc'),
  path.create('scripts/doc', 'help'),
  path.create('scripts/github', 'github'),
  path.create('scripts/links', 'links'),
  path.create('scripts/lyric', 'lyric'),
  path.create('scripts/report', 'report'),
  path.create('scripts/search', 'search'),
  path.create('scripts/suggest', 'suggest'),
  path.create('scripts/wiki', 'wiki'),
]);

alice.initialize();
