import { Client, GroupNotification } from 'whatsapp-web.js';

/**
 * Sends a welcome message in private chat to every new contact that joined a group.
 */
async function callback(notification: GroupNotification, client: Client) {
  const contacts = await notification.getRecipients();

  contacts.forEach(async (c) => {
    const contactId = c.id._serialized;
    const welcomeMessage = `Bem vindo(a) a comunidade Coding, ${c.pushname}!`;
    await client.sendMessage(contactId, welcomeMessage);
  });
}

export default {
  trigger: 'group_join',
  callback,
};
