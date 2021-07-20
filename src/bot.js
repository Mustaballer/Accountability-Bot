require('dotenv').config();

const { Client } = require('discord.js');
const Discord = require('discord.js');
const client = new Client();
const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} has changed .`);
});


client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX) && message.content !== "$resolve") {
        // const [CMD_NAME, ...args] = message.content
        // .trim()
        // .substring(PREFIX.length)
        // .split(/\s+/);
        // console.log(CMD_NAME);
        // console.log(args);

        // testing for message in specific channel
        const channel = client.channels.cache.get('866784261217320991');
        const qEmbed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Pending Question...')
	        .setURL(message.url)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(message.content.slice(1, message.content.length))
            .addFields(
                { name: 'Discord Url', value: message.url},
            )
            .setTimestamp();
        channel.send("@here", qEmbed);
    }
    else if (message.content === "$resolve") {
        message.channel.send("<@" + message.author.id + ">"+"The Question has been resolved!");
    }
    //console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content === "hello") {
        message.channel.send(message.url);
    }

    if (message.content === 'clear') {
        message.channel.bulkDelete(100, true)
        .then((_message) => {
          message.channel
            // do you want to include the current message here?
            // if not it should be ${_message.size - 1}
            .send(`Bot cleared \`${_message.size}\` messages :broom:`)
            .then((sent) => {
              setTimeout(() => {
                sent.delete();
              }, 2500);
            });
        });
      }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
