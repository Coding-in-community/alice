import { Contact, Message, GroupChat, GroupParticipant } from 'whatsapp-web.js';

/**
 * Get serialized phone number from a given array of users.
 */
function getSerials(users: Contact[] | GroupParticipant[]): string[] {
  const serials = users.map((u) => u.id._serialized);

  return serials;
}

/**
 * Get serialized phone number of all members from a given group.
 */
function getMembers(chat: GroupChat): string[] {
  if (!chat.isGroup) {
    throw new Error(`This chat isn't a group.`);
  }

  const members = chat.participants;
  const membersSerials = getSerials(members);

  return membersSerials;
}

/**
 * Get serialized phone number of all administrators from a given group.
 */
function getAdms(chat: GroupChat): string[] {
  if (!chat.isGroup) {
    throw new Error(`This chat isn't a group.`);
  }

  const { participants } = chat;
  const admsIds = participants.filter((id) => id.isAdmin);
  const admsSerials = getSerials(admsIds);

  return admsSerials;
}

/**
 * Checks if an message is from an ADM.
 */
async function isFromAdm(message: Message): Promise<boolean> {
  const chat = (await message.getChat()) as GroupChat;
  const adms = getAdms(chat);
  const { author } = message;

  return adms.includes(author || '');
}

/**
 * Get a whatsapp user id for a given phone number.
 */
function userID(phoneNumber: string): string {
  if (typeof phoneNumber !== 'string') {
    throw new Error('you must pass the number as a string');
  }

  const target = phoneNumber.replace(/\D/g, '');
  const regexp = /\d+/;
  const matches = target.match(regexp) || [];
  const pattern = matches[0];

  return `${pattern}@c.us`;
}

export default {
  getAdms,
  getMembers,
  getSerials,
  isFromAdm,
  userID,
};
