const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = "R-"
var bot = new Discord.Client();

function play (Connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = Connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function(){
        if (server.queue[0]) play(Connection, message);
        else Connection.disconnect();
    });
}

var fortunes = [
    "Yes !",
    "NO",
    "Maybe",
    "FUCK OFF",
    "Do you think I am bitch ?",
    "I dont have idea ^^'",
    "hmmm no answer",
    "Sometime I dont understand You :( ",
    "I am busy now ask me later"
];

var fsing = [
    "I am faaaaaaded",
    "laaaaa laaaa leeeee",
    "I have bad voice",
    "not now",
    "Despacito Quiero respirar tu cuello despacito  Deja que te diga cosas al oído Para que te acuerdes si no estás conmigo",
    "Don't give up, I won't give up"
    
];

var servers = {};


bot.on("ready", function(){
    console.log("Ready");
    bot.user..setGame("read to die with Rum");
});

bot.on("guildMemberAdd", function(member){
    member.guild.channels.find("name", "general").sendMessage("yoo guys " + member.toString() + " is here !");

    member.addRole(member.guild.roles.find("name", "Golden Cheese Member"));

    member.guild.createRole
});

bot.on("message", function(message){
     if (message.author.equals(bot.user)) return;
                                                                                                                                          
    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()){
       
       case "red":
       message.channel.sendMessage("yea pu**y what u want _-");
       break;

       case "info":
       message.channel.sendMessage("I am busy call me later");
       break;
          
       case "askme":
        if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
        else message.channel.sendMessage("sorry I didnt understand u");

       break;

       case "sing":
       if (args[1]) message.channel.sendMessage(fsing[Math.floor(Math.random() * fsing.length)]);
       else message.channel.sendMessage(fsing[Math.floor(Math.random() * fsing.length)]);
       break;

       case "embed":
       var embed = new Discord.RichEmbed()
            .addField("Hello, This is RED BOT ", "use R-help for more info")
            .setColor(0x00FFFF)
            .setFooter("created by ☲尺௱_♡_Ӈƙ☲®")
            .setThumbnail(message.author.avatarURL)
            message.channel.sendMessage(embed);
       
       break;

       case "play":
       if (!args[1])  {
           message.channel.sendMessage("Please provide a link");
           returnl
       }

       if (!message.member.voiceChannel) {
           message.channel.sendMessage("You must be in a voice channel !");
           return;
       }

       if (!servers[message.guild.id]) servers[message.guild.id] = {
           queue: []
       };

       var server = servers[message.guild.id];

       server.queue.push(args[1]);

       if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(Connection){
        play(Connection, message);
       });

       break;

       case "skip":
       var server = servers[message.guild.id];

       if (server.dispatcher) server.dispatcher.end();
       break;

       case "stop":

       var server = servers[message.guild.id];

       if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();

       break;

       default:
       message.channel.sendMessage("invalid command")
    }
});

bot.login(process.evn.BOT_TOKEN);

