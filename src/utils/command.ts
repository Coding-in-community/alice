interface ICommandInfo {
  description: string;
  usage: string;
  args?: object;
  kwargs?: object;
}

/**
 * Tag to format a string as a message.
 */
function message(strings: TemplateStringsArray, ...values: any[]): string {
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
 * For a given object of information about an command, returns a help message.
 */
function helper(commandInfo: ICommandInfo): string {
  // I'll write it better in the future, ok?
  const { description, usage, args = {}, kwargs = {} } = commandInfo;
  const argsString = Object.entries(args)
    .map(([k, v]) => `\`\`\`--${k}\`\`\` -> _${v}_`)
    .join('\n');
  const kwargsString = Object.entries(kwargs)
    .map(([k, v]) => `\`\`\`--${k}\`\`\` -> _${v}_`)
    .join('\n');
  const helpMessage = message`
    ${description}

    *uso:* \`\`\`${usage}\`\`\`

    ${argsString ? `*args válidos:*\n${argsString}` : ''}

    ${kwargsString ? `*kwargs válidos:*\n${kwargsString}` : ''}
    `;

  return helpMessage;
}

export default { message, helper };
