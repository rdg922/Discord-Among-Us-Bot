# Among Us Bot

## Usage
Once the bot is up and running, in the designated text channel, run the help command. (include your prefix first!) This will bring up all the commands and what they do

## Setup 
Setting up Discord Bot Application:

* Make sure you have [developer mode](https://discordia.me/en/developer-mode) enabled within Discord. You'll need this to setup the config.json
* Create a [discord bot application](https://discord.com/developers/applications), and make a discord bot.
* Copy your client ID, and create an [invite link](https://discordapi.com/permissions.html#4197376) in order to add your bot to your server.

Settting up Config file:

```
{
    "token": "insert your client token in quotes here",
    "voiceChannelID": "paste the id of a voice channel where people will get muted and unmuted",
    "botChannelID": "paste the id of the channel where the bot will read inputs from",
    "prefix": "just a single character, I use ','"
}
```

an example of what it should look like:

```
{ 
    "token": "NzUwMTM4NjUxODAyOTkyNjQx.X02LDw.TLaBZURvdh7e2IiV2hb1cwT_kFQ",
    "voiceChannelID": "123456789101213141",
    "botChannelID": "123456789101213141",
    "prefix": ","
}
```

Then to run, open this directory in a terminal and run 
```
npm i
npm start
```
And your bot should start!