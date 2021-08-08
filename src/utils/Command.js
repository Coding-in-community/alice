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
}

module.exports = Command;
