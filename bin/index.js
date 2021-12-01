#!/usr/bin/env node

const program = require('commander');
const axios = require('axios');
const chalk = require('chalk');
const figlet = require('figlet');
const sleep = require('sleep');
const signsMap = require('./signsMap');
const titleColour = chalk.hex('#B937F0');

program
    .description("Horoscopes in your terminal!")
    .option("-h, --help", "Run --sign <your-starsign> to get your horoscope for today.")
    .option("-s, --sign <sign>", "starsign for horoscope");

program.parse(process.argv);

const options = program.opts();
if (options.help) console.log("To get your horoscope for today run: \n -s, --sign <your-starsign> ");
if (options.sign) {
    figlet.text('* HOROCLI *', { font: 'Star Wars'}, 
    function(err, data) { 
        if(err){ console.log('uhoh, error: ' + err)
        return
        }
        console.log(titleColour(data));
        }
    )
    axios.get(`http://horoscope-api.herokuapp.com/horoscope/today/${options.sign}`)
    .then(function (response) {
        sleep.msleep(50);

        const sign = capitalizeFirstLetter(options.sign);
        formatHoroscope(sign, response.data.horoscope, response.data.date);
    })
}

 function formatHoroscope(sign, horoscope, date) {
    const colour = chalk.hex(signsMap[sign].colour1);
    const colour2 = chalk.hex(signsMap[sign].colour2);
    new Date(date).toLocaleDateString('GB-en')
    console.log(colour(`~* You have asked for *~`));
    sleep.msleep(450);
    console.log(` \n ${colour2(`‧͙⁺˚*･༓☾ ${sign} ${signsMap[sign].emoji} ☽༓･*˚⁺‧͙`)}`)
    sleep.msleep(450);
    console.log(colour(`\n Horoscope for ${date} is... \n`));
    sleep.msleep(450);
    console.log(colour2(` ${horoscope}`));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }