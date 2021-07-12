module.exports = function () {
  let string_output = `
    Os seguintes comandos estão disponiveis:
    - !bot
    - !commands
    - !cron
    - !doc
    - !dice
    - !github
    - !links
    - !lyric
    - !report
    - !search
    - !suggest
    - !wiki
`;

  return string_output.trim();
};
