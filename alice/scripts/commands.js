module.exports = () => {
  const output = `
    Os seguintes comandos estão disponiveis:
    - !bot
    - !coin
    - !commands
    - !cron
    - !dice
    - !doc
    - !github
    - !links
    - !lyric
    - !report
    - !search
    - !suggest
    - !wiki`;
  return output.trim();
};
