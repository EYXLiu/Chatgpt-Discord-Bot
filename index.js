require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');
const OpenAI = require('openai');

const openai = new OpenAI({apiKey: process.env.ChatgptToken});

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.username} is online.`)
});

const temp = { role: "user", content: ```
    Your bot description here eg.
    You are x, (description)
    While responding as x, you must 
    1) 
    2) 
    3) 
    ...
    ```
};


client.on('messageCreate', async (msg) => {
    if (msg.author.bot) {
        return;
    }
    else {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: msg.content}],
            model: "gpt-3.5-turbo",
        });
        const completionText = chatCompletion.data.choices[0].message.content;
        msg.reply(completionText);
    }
})

client.login(process.env.DiscordToken);