const Discord = require("discord.js");
const { token, prefix, voiceChannelID, botChannelID } = require("./config.json");

const client = new Discord.Client(); // Init Client

// Commands
const TOGGLE_MUTE = `${prefix}mute`;
const TOGGLE_GHOST = `${prefix}dead`;
const RESET_MATCH = `${prefix}reset`;
const HELP = `${prefix}help`;
const CLEAR = `${prefix}clear`

// Get the channels after ready()
let voiceChannel;
let botChannel;

// Current State Vars
let muted = false;
let ghosts = [];

// Description variables
const THUMBNAIL_AUTHOR = "https://cdn.discordapp.com/avatars/183267036061892609/072f33e6f8928cb46a901065a8116709.png?size=128"
const THUMBNAIL_LARGE = "https://image.winudf.com/v2/image1/Y29tLmlubmVyc2xvdGguc3BhY2VtYWZpYV9pY29uXzE1NTQ5MzY1NjJfMDEz/icon.png?w=170&fakeurl=1"
const HYPERLINK = "https://github.com/rdg922"
const AUTHOR = "Rohit Dasgupta"

// Embed for help message
const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Commands:')
    .setAuthor(AUTHOR, THUMBNAIL_AUTHOR, HYPERLINK)
    .setDescription('Use these commands in order to mute/unmute Among us Players easily')
    .setThumbnail(THUMBNAIL_LARGE)
    .addFields(
        { name: TOGGLE_MUTE, value: 'Toggle everyone currently not a ghost to muted or unmuted, Use this for entering & exiting the discussion table ' },
        { name: TOGGLE_GHOST + " @_____", value: 'Toggle someone to ghost/alive so they will be able to or not be able talk during meetings. Make sure to @ them for them to be counted. You can @ as many people are dead as long as they are separated by spaces' },
        { name: RESET_MATCH, value: 'Resets the match, unmuting everyone and setting everyone to alive' },
        { name: CLEAR, value: "Clears this chat so it's a little cleaner" },
        { name: HELP, value: "Repeats this message" }
    )
    .setTimestamp()
    .setFooter("Thank you for being so bad at keeping quiet that I was forced to make this cool bot");

// Init Channels and send ready message
client.once("ready", () => {
    voiceChannel = client.channels.cache.get(voiceChannelID);
    botChannel = client.channels.cache.get(botChannelID);

    botChannel.send(`Among Us Bot is ready!\nType in ${HELP} for help`);
})

client.on("message", (message) => {

    if (message.channel !== botChannel) return;

    const message_split = message.content.trim().split(/ +/); // Remove extra white space
    const command = message_split[0]

    // Switch Based on Commands
    switch (command) {
        case HELP:
            botChannel.send(embed);
            if (message.channel !== botChannel) {
                message.reply("Use " + botChannel.name + " for commands next time.");
            }
            break

        case TOGGLE_MUTE:
            muted = !muted;
            for (member of voiceChannel.members) {
                if (ghosts.includes(member[1])) continue;
                member[1].voice.setMute(muted);
            }
            if (muted) {
                message.reply("Everyone is muted!");
            } else {
                message.reply('Everyone currently alive is unmuted!');
            }
            break

        case TOGGLE_GHOST:
            if (message.mentions.members.size == 0) {
                return;
            }

            for (mentioned of message.mentions.members.array()) {
                if (mentioned && !ghosts.includes(mentioned)) {
                    mentioned.voice.setMute(true);
                    ghosts.push(mentioned);
                    message.reply("User has been muted.");
                } else if (mentioned && ghosts.includes(mentioned)) {
                    mentioned.voice.setMute(muted);
                    ghosts.splice(ghosts.indexOf(mentioned), 1);
                    message.reply("Removed from Ghosts");
                }
                else {
                    message.reply("Err: No player mentioned.");
                }
            }
            break;

        case RESET_MATCH:
            muted = false;
            ghosts = [];
            for (member of voiceChannel.members) {
                member[1].voice.setMute(false);
            }
            message.reply("Round is over, everyone is unmuted!");
            break;

        case CLEAR:
            message.delete();
            botChannel.messages.fetch({ limit: 99 }).then((messages) => {
                botChannel.bulkDelete(messages);
            })
            message.channel.send(embed);
            break;
    }

})

// Called when ANYTHING happens to/in a voice channel. Be sure to only change when appropriate
client.on("voiceStateUpdate", (oldMember, newMember) => {
    if (oldMember.channel === newMember.channel) return;
    if (newMember.channel === voiceChannel) {
        newMember.setMute(muted)
    } else {
        newMember.setMute(false);
    }
})

client.login(token);