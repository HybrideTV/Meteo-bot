const { MessageCreate, Client, MessageEmbed } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('messageCreate');
    }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */

    async run(client, message) {


    if (message.author.bot) return;
        if (message.content.startsWith(client.prefix)) {
            const [cmdName, ...cmdArgs] = message.content
            .slice(client.prefix.length)
            .trim()
            .split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
              command.run(client, message, cmdArgs);
            }
          }
        }
    
}