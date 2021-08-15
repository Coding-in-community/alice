/**
 * Sends a welcome message in private chat to every new contact that joined a group.
 * @see https://docs.wwebjs.dev/GroupNotification.html
 * @see https://docs.wwebjs.dev/Client.html
 * @param {Client} client
 * @param {GroupNotification} notification
 */
async function callback(client, notification) {
  const contacts = await notification.getRecipients();

  contacts.forEach(async (c) => {
    await client.sendMessage(
      // eslint-disable-next-line no-underscore-dangle
      c.id._serialized,
      `Bem vindo(a) a comunidade Coding, ${c.pushname}!`
    );
  });
}

module.exports = {
  trigger: 'group_join',
  callback,
};
