const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCreate, Client } = require("discord.js");
const weather = require("weather-js")
const moment = require('moment');
require('dotenv').config();

module.exports = class previsions extends BaseCommand {

    constructor() {
        super('previsions');
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
                
                    let forecast = result[0].forecast;
                    let location = result[0].location;

                    function formatDate(d){
                        var now = new Date(d);
                        var annee = now.getFullYear();
                        var mois = now.getMonth() + 1;
                        var jour = now.getDate();
                        return `${jour}/${mois}/${annee}`
                    }
                    
                    let embed = new MessageEmbed()
                       .setTitle(`${location.name}`)
                       .setDescription(`Prévision météo des prochains jours`) 
                       .setColor(0x00AE86)
                       .addFields(
                        {name: `🗓 Météo du ${formatDate(forecast[1].date)}`, value: `${forecast[1].low} °C / ${forecast[1].high} °C  \n${forecast[1].skytextday}` },
                        {name: `🗓 Météo du ${formatDate(forecast[2].date)}`, value: `${forecast[2].low} °C / ${forecast[2].high} °C  \n${forecast[2].skytextday}`},
                        {name: `🗓 Météo du ${formatDate(forecast[3].date)}`, value: `${forecast[3].low} °C / ${forecast[3].high} °C  \n${forecast[3].skytextday}`},
                        {name: `🗓 Météo du ${formatDate(forecast[4].date)}`, value: `${forecast[4].low} °C / ${forecast[4].high} °C  \n${forecast[4].skytextday}`},

                        )
                        message.channel.send({ embeds: [embed] });
                    });
        }
    }
}