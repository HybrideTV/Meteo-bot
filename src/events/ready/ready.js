const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageCreate, Client, MessageEmbed } = require("discord.js");
var cron = require("cron");
const weather = require("weather-js")

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     */
    async run(client, message, user) {

        let autoMeteo = new cron.CronJob('00 00 08 * * *', () => {
            weather.find({search: "Paris", degreeType: "C"}, function(err, result) {
                if(err) message.channel.send(`Erreur : ${err}`)
            
                let current = result[0].current;
                let location = result[0].location;
    
                function formatDate(){
                    var now = new Date(current.date);
                    var annee = now.getFullYear();
                    var mois = now.getMonth() + 1;
                    var jour = now.getDate();
                    return `${jour}/${mois}/${annee}`
                }
    
    
                let embed = new MessageEmbed()
                   .setTitle(`${location.name}`)
                   .setDescription(`**${current.skytext}**`) 
                   .setThumbnail(current.imageUrl)
                   .setTimestamp()
                   .setColor(0x00AE86)
                   .addFields(
                    {name: "Température", value: `${current.temperature}°C`, inline: true },
                    {name: "Taux d'humidité", value: ` ${current.humidity}%`, inline: true  },
                    {name: "Vent", value: ` ${current.windspeed}`, inline: true  },
    
                    )
    
                   var channel = client.guilds.cache.get("1199627851448721439").channels.cache.get("1201106901321125978")
                   channel.send({ embeds: [embed] });
                });
          });
        autoMeteo.start();
    }
}