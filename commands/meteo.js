const Discord = require("discord.js")
const weather = require("weather-js")

module.exports = {

    name: "meteo",
    description: "Voir la météo d'une ville",
    permission: "Aucune",
    dm: false,
    options : [{
        type: "string",
        name: "ville",
        description: "Une ville",
        required : true
    }],

    async run(bot, message, args) {
        weather.find({search: args.getString("ville"), degreeType: "C"}, function(err, result) {
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


            let embed = new Discord.EmbedBuilder()
               .setTitle(`${location.name}`)
               .setDescription(`**${current.skytext}**`) 
               .setThumbnail(current.imageUrl)
               .setFooter({ text: `Météo du ${formatDate()}`})
               .setColor(0x00AE86)
               .addFields(
                {name: "Température", value: `${current.temperature}°C`, inline: true },
                {name: "Taux d'humidité", value: ` ${current.humidity}%`, inline: true  },
                {name: "Vent", value: ` ${current.windspeed}`, inline: true  },

                )

               
               message.reply({ embeds: [embed] });
            });
    
  

    }
}