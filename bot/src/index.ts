import { Client, Intents } from 'discord.js';
import * as fs from 'fs';

const {
    bot: { token },
} = JSON.parse(fs.readFileSync('../../config.json').toString());

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log(client.user.tag)
})

client.login(token);
