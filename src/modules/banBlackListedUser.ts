import { Client, GroupChat, GroupNotification } from 'whatsapp-web.js';

const BLACK_LIST = JSON.parse(process.env.BLACK_LIST as string | '[]');

/**
 * Bans a user right after he joins a group if he is in black list.
 */
async function callback(notification: GroupNotification, client: Client) {
  const contacts = await notification.getRecipients();
  // @ts-ignore
  const chat = (await client.getChatById(notification.id.remote)) as GroupChat;

  contacts.forEach(async (c) => {
    if (BLACK_LIST.includes(c.number)) {
      await chat.removeParticipants([c.id._serialized]);
    }
  });
}

export default {
  trigger: 'group_join',
  callback,
};
