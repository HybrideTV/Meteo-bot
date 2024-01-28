const Discord = require("discord.js");
const loadSlashCommands = require("../loader/loadSlashCommands");
const config = require("../config")
var cron = require("cron");
const weather = require("weather-js")

module.exports = async bot => {

    await loadSlashCommands(bot)
    console.log(`${bot.user.tag} a démarré !`)

    let autoMeteo = new cron.CronJob('00 00 08 * * *', () => {
        console.log("test")
        weather.find({search: "Paris", degreeType: "C"}, function(err, result) {
            if(err) message.channel.send(`Erreur : ${err}`)
        
            let current = result[0].current;
            let location = result[0].location;

            let embed = new Discord.EmbedBuilder()
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

               var channel = bot.guilds.cache.get("1199627851448721439").channels.cache.get("1201106901321125978")
               channel.send({ embeds: [embed] });
            });
      });
    autoMeteo.start();


}