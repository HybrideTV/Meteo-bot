const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client } = require("discord.js");
const weather = require("weather-js")
require('dotenv').config();

module.exports = class meteo extends BaseCommand {

    constructor() {
        super('meteo');
    }
          /**
       * 
       * @param {Client} client 
       * @param {Message} message 
       * @param {Array} args 
       */
          run(client, message, args) {
            let ville = args[0];
            if(!ville){
               
                message.channel.send("**Merci d'entrer une localisation correcte**")
                return;
            }else{
                weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
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
                       .setFooter(`Météo du ${formatDate()}`)
                       .setColor(0x00AE86)
                       .addFields(
                        {name: "Température", value: `${current.temperature}°C`, inline: true },
                        {name: "Taux d'humidité", value: ` ${current.humidity}%`, inline: true  },
                        {name: "Vent", value: ` ${current.windspeed}`, inline: true  },

                        )

                       
                       message.channel.send({ embeds: [embed] });
                    });
        }
    }
}