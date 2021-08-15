const BLACK_LIST = JSON.parse(process.env.BLACK_LIST);

/**
 * Bans a user right after he joins a group if he is in black list.
 * @see https://docs.wwebjs.dev/GroupNotification.html
 * @see https://docs.wwebjs.dev/Client.html
 * @param {GroupParticipant} notification
 * @param {Client} client
 */
async function callback(notification, client) {
  const contacts = await notification.getRecipients();
  const chat = await client.getChatById(notification.id.remote);

  contacts.forEach(async (c) => {
    if (BLACK_LIST.includes(c.number)) {
      // eslint-disable-next-line no-underscore-dangle
      await chat.removeParticipants([c.id._serialized]);
    }
  });
}

module.exports = {
  trigger: 'group_join',
  callback,
};
