require('dotenv').config();
const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if(msg.attachments.array().length != 0){
        for (let i = 0; i < msg.attachments.array().length; i++) {
            fetch(msg.attachments.array()[i].url)
            .then(res => {
                const dest = fs.createWriteStream('./images_temp/'+msg.attachments.array()[i].url.split("/")[6]);
                res.body.pipe(dest);
            });
        }
    }
});

client.login(process.env.token);