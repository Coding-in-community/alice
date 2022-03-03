import { Client, Message } from 'whatsapp-web.js';

export interface InhibitorOptions {
  excludes: string[];
  isAdmOnly: boolean;
  includesOnly: string[];
  scope: string[];
}

export interface ICommand {
  execute: (message?: Message, client?: Client) => void | Promise<void>;
  name: string;
  options?: InhibitorOptions;
}
