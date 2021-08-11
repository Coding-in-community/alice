/**
 * Utils related to commands.
 */
class Command {
  /**
   * Tag to format a string to be sended as a message.
   * @param {string[]} strings
   * @param  {...any} values
   * @returns {string} - formatted string
   */
  static message(strings, ...values) {
    const STR = strings.map((s, i) =>
      i + 1 === strings.length ? s : s + values[i]
    );

    return STR.join('')
      .split('\n')
      .map((s) => s.trim())
      .join('\n')
      .trim();
  }

  /**
   * For a given object of information about a command, returns a help message.
   * @param {object} commandInfo - Information about the command.
   * @param {string} commandInfo.description - The command's description.
   * @param {string} commandInfo.usage - The command's usage.
   * @param {object} [commandInfo.args] - The command's args. Where the key is arg's name and the value arg's description.
   * @param {object} [commandInfo.kwargs] - The command's kwargs. Where the key is kwarg's name and the value kwarg's description.
   * @returns {string} - The help message.
   */
  static helper(commandInfo) {
    // I'll write it better in the future, ok?
    const { description, usage, args = {}, kwargs = {} } = commandInfo;
    const argsString = Object.entries(args)
      .map(([k, v]) => `\`\`\`--${k}\`\`\` -> _${v}_`)
      .join('\n');
    const kwargsString = Object.entries(kwargs)
      .map(([k, v]) => `\`\`\`--${k}\`\`\` -> _${v}_`)
      .join('\n');
    const helpMessage = Command.message`
    ${description}

    *uso:* \`\`\`${usage}\`\`\`

    ${argsString ? `*args válidos:*\n${argsString}` : ''}

    ${kwargsString ? `*kwargs válidos:*\n${kwargsString}` : ''}
    `;

    return helpMessage;
  }
}

module.exports = Command;
