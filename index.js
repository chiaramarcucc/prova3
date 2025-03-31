const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const TOKEN = '7954240237:AAFBUPXjkBiETS6EGGFMI91udegeSgKC8R0'; // Sostituisci con il tuo token
const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

app.use(bodyParser.json());

let players = [
  { name: "Lorenzo Vigani Poli", time: 1091 }, { name: "Marco Rota", time: 953 }, { name: "Matteo Provasi", time: 985 }, { name: "Simone Cantarelli", time: 870 }

, { name: "Daniel Sartori", time: 644 }, { name: "Filippo Brancaleoni", time: 1110 }, { name: "Gabriele Cappelletti", time: 994 }, { name: "Lorenzo Mauro", time: 758 }, { name: "Matteo Dummar", time: 1098 }, { name: "Paolo Marino", time: 814 }, { name: "Sebastiano Tronto", time: 803 }, { name: "Simone Santarsiero", time: 1076 }, { name: "Tommaso Raposio", time: 873 }, { name: "Vincenzo Maria Gammino", time: 1090 }

, { name: "Andrea Lo Sardo", time: 1059 }, { name: "Andrea Marconato", time: 860 }, { name: "Dario Angelo Narbone", time: 878 }, { name: "Lorenzo Gravina", time: 2482 }, { name: "Lorenzo Pillon", time: 989 }, { name: "Marco Manno", time: 1081 }, { name: "Nicola Mazza", time: 907 }, { name: "Pietro Mazza", time: 1100 }, { name: "Riccardo Fiumefreddo", time: 1003 }, { name: "Valerio Maggi", time: 1041 }

, { name: "Alessandro Breda", time: 1155 }, { name: "Alexandros Fokianos", time: 1619 }, { name: "Andrea Egidio Monti", time: 1569 }, { name: "Emanuele Lamon", time: 935 }, { name: "Federica Duò", time: 1487 }, { name: "Francesco Iezzi", time: 2038 }, { name: "Paolo Mazzei", time: 1992 }, { name: "Riccardo Raciti", time: 1773 }, { name: "Samuele Zucca", time: 1869 }, { name: "Sebastiano Leschiutta", time: 924 }

, { name: "Federico Preti", time: 1147 }, { name: "Giovanni Tessari", time: 1294 }, { name: "Leonardo Randacio", time: 1080 }, { name: "Letian Mattia Chang", time: 1393 }, { name: "Mongol Forti", time: 1284 }, { name: "Pietro Furbatto", time: 827 }, { name: "Riccardo Polignano", time: 1182 }, { name: "Roberto Bentivoglio", time: 987 }, { name: "Valerio Martinelli", time: 1020 }, { name: "Yuri Donati", time: 1170 }

, { name: "Alessio Passerini", time: 1218 }, { name: "Andrea Fissi", time: 972 }, { name: "Federico Chiarello", time: 1297 }, { name: "Federico De Paoli", time: 926 }, { name: "Julian Galliano", time: 1098 }, { name: "Leonardo Marchizza", time: 1196 }, { name: "Luca Spagnolo", time: 2230 }, { name: "Nicola Barbaro", time: 840 }, { name: "Stefano Della Valle", time: 1438 }, { name: "Walter Antonio Monti", time: 7838 }

, { name: "Ciro Vignotto", time: 1894 }, { name: "Edoardo Brown", time: 1104 }, { name: "Edoardo Erra", time: 1761 }, { name: "Federico Ortu", time: 1261 }, { name: "Giorgio Zonta", time: 1070 }, { name: "Leonardo Baldo", time: 1285 }, { name: "Matteo Maggiali", time: 1032 }, { name: "Raffaele Bonifazi", time: 1706 }, { name: "Riccardo Fasan", time: 1473 }, { name: "Simone Canova", time: 1404 }

, { name: "Alessandro Magenis", time: 1367 }, { name: "Diego Sartori", time: 4485 }, { name: "Enrico Bedocchi", time: 2007 }, { name: "Federico Rinalduzzi", time: 1686 }, { name: "Francesco Fiore", time: 1249 }, { name: "Lorenzo Calogero Buscemi", time: 1569 }, { name: "Marco Edoardo Cittar", time: 1571 }, { name: "Marco Iamonte", time: 1304 }, { name: "Matteo Emiliani", time: 1037 }, { name: "Valerio Colapinto", time: 1079 }

, { name: "Alessio Mortillaro", time: 1606 }, { name: "Eleonora Giangrandi", time: 1108 }, { name: "Isabella Bosia", time: 1558 }, { name: "Josuè Pangrazzi", time: 1494 }, { name: "Lorenzo Gentili", time: 1325 }, { name: "Luigi Manzo", time: 1268 }, { name: "Mattia Perego", time: 1055 }, { name: "Mattia Zago", time: 1087 }, { name: "Pasquale Lombardozzi", time: 1163 }, { name: "Samuele Cancemi", time: 982 }

, { name: "Alessio Pozzoli", time: 2537 }, { name: "Claudio Moriello", time: 2093 }, { name: "Edoardo Giordano", time: 1432 }, { name: "Federico Baravalle", time: 1388 }, { name: "Filippo Bussoni", time: 1164 }, { name: "Francesco Costa", time: 1610 }, { name: "Giovanni Tramontano", time: 1327 }, { name: "Marco Antinori", time: 2016 }, { name: "Pietro Campagnola", time: 1133 }, { name: "Riccardo Lodi", time: 1687 }

, { name: "Carmela Gravano", time: 3166 }, { name: "Chiara Scalera Caserza", time: 1652 }, { name: "Diego Catà", time: 937 }, { name: "Flavio Cosimi", time: 1671 }, { name: "Francesco Montagna Coronado", time: 1180 }, { name: "Giovanni Italiano", time: 1900 }, { name: "Giovanni Maistrello", time: 1314 }, { name: "Leonardo Cerizzi", time: 2501 }, { name: "Nathan Pintus", time: 1404 }, { name: "Paolo Cosimi", time: 1512 }

, { name: "Andrew Verducci", time: 1022 }, { name: "Davide Merli", time: 1317 }, { name: "Federico Viola", time: 1529 }, { name: "Giuseppe Pappalardo", time: 1687 }, { name: "Leonardo Brandolini", time: 894 }, { name: "Leonardo Carosio", time: 882 }, { name: "Luca D'Urbano", time: 1135 }, { name: "Matteo Bonotto", time: 885 }, { name: "Michele Chiaravalloti", time: 1290 }, { name: "Piernicola Scalzi", time: 1030 }

, { name: "Alessandro Nicolì", time: 784 }, { name: "Chiara Marcucci", time: 1990 }, { name: "Elisa Gasperotti", time: 1357 }, { name: "Fabian Tomasović", time: 835 }, { name: "Fabrizio Cirnigliaro", time: 2446 }, { name: "Gianluca Placenti", time: 1717 }, { name: "Jordan Crippa", time: 1366 }, { name: "Matteo Colombo", time: 1185 }, { name: "Nicolò Simone", time: 1463 }, { name: "Paolo Moriello", time: 842 }

, { name: "Alberto Monterisi", time: 908 }, { name: "Alessandro Sala", time: 978 }, { name: "Damiano Viberti", time: 2530 }, { name: "Gabriel Pooli", time: 1559 }, { name: "Giacomo Schiava", time: 1100 }, { name: "Giovanni Montagna Coronado", time: 987 }, { name: "Lino Nicola Grasso", time: 2464 }, { name: "Luca Terrone", time: 1655 }, { name: "Martin Guadagnini", time: 1015 }, { name: "Vittorio Ribechini", time: 820 }

, { name: "Arcangelo Lobianco", time: 1201 }, { name: "Cesare Paulin", time: 1540 }, { name: "Davide Azzini", time: 1674 }, { name: "Elio Todoverto", time: 1238 }, { name: "Filippo Taddei", time: 1663 }, { name: "Giovanni Marconi Nalim", time: 1460 }, { name: "Liam Edward Slater", time: 1584 }, { name: "Lorenzo Nicotra", time: 1926 }, { name: "Marco Lapadula", time: 3062 }, { name: "Noemi Hueber", time: 1394 }

, { name: "Carolina Sozio", time: 874 }, { name: "Cristiano Alba", time: 2246 }, { name: "Daniele Fusella", time: 1170 }, { name: "Federico Padovani", time: 1786 }, { name: "Filippo Bertolotti", time: 2263 }, { name: "Luigi Francia Comi", time: 1937 }, { name: "Maximilian Pichler", time: 1176 }, { name: "Nicolo David Lodato", time: 929 }, { name: "Pietro Villa", time: 976 }, { name: "Thomas Faleo", time: 2508 }

, { name: "Alessandro Galloppo", time: 932 }, { name: "Antonio Barba", time: 1714 }, { name: "Enrico Saggiorato", time: 1313 }, { name: "Gabriele Gambino", time: 1208 }, { name: "Leonardo Bottazzi", time: 3061 }, { name: "Leonardo Savi", time: 1408 }, { name: "Nicola Giordani", time: 1476 }, { name: "Rafaela Estrada", time: 1633 }, { name: "Sofia Malatesta", time: 2985 }, { name: "Valerio Sannito", time: 1978 }

, { name: "Alessandro Feletto", time: 1003 }, { name: "Alessandro Trapanese", time: 1250 }, { name: "Ellen Guadagnini", time: 1474 }, { name: "Flavia Festa", time: 1230 }, { name: "Giulio Romano Fidora", time: 1254 }, { name: "Lorenzo Signorelli", time: 1164 }, { name: "Mattia Ubbiali", time: 1032 }, { name: "Michel D'Antoni", time: 995 }, { name: "Riccardo Barbiero", time: 1199 }, { name: "Thomas Prisco", time: 1935 }

, { name: "Alessandro Simone", time: 1751 }, { name: "Andrea Natale", time: 1532 }, { name: "Bruno Rosa", time: 2082 }, { name: "Christian Pizzasegola", time: 1151 }, { name: "Davide Macri", time: 1357 }, { name: "Edoardo Pelini", time: 962 }, { name: "Gabriele Longo", time: 1037 }, { name: "Giovanni Bezzetto", time: 1573 }, { name: "Lorenzo Giovanni Cuscani", time: 1500 }, { name: "Paolo Bartolucci", time: 1031 }

, { name: "Damiano Quagliotto", time: 2005 }, { name: "Edoardo Magno", time: 1323 }, { name: "Gianluca Caruso", time: 1052 }, { name: "Leonardo Liu Dell'Era", time: 3107 }, { name: "Lorenza Drusian", time: 1674 }, { name: "Luca Rannisi", time: 4759 }, { name: "Manuel Aversano", time: 918 }, { name: "Nino Monserrato", time: 1581 }, { name: "Paolo Eros Cerizzi", time: 5646 }, { name: "Ugo Numa Tomat", time: 3137 }  

, { name: "Andrea Moscatello", time: 1812 }, { name: "Angelo Piccolella", time: 1147 }, { name: "Daniele Guidoni", time: 7607 }, { name: "Davide Ferraro", time: 1066 }, { name: "Emanuele Marchesi", time: 1344 }, { name: "Luca Bonisoli", time: 2826 }, { name: "Marco Signorini", time: 1085 }, { name: "Matteo Mazzini", time: 1340 }, { name: "Riccardo Fiore", time: 1308 }, { name: "Riccardo Munaro", time: 2176 }

, { name: "Alessandro Pe", time: 1663 }, { name: "Ettore Rolando Accossato", time: 1567 }, { name: "Fabio Asaro", time: 1331 }, { name: "Gabriele Zanni", time: 1366 }, { name: "Israel Springer", time: 1135 }, { name: "Kevin Tomasoni", time: 1954 }, { name: "Mattia Perezzani", time: 1418 }, { name: "Pietro Marchica", time: 1239 }, { name: "Silvia Boscolo Bariga", time: 3674 }, { name: "Valerio Alfano Raddavi", time: 1083 }

, { name: "Enea Fiammenghi", time: 1540 }, { name: "Gabriele Manicardi", time: 1401 }, { name: "Leonardo Ghezzi", time: 2656 }, { name: "Matteo Cibene", time: 1439 }, { name: "Nicola Terrone", time: 5398 }, { name: "Olmo Quarantini", time: 1334 }, { name: "Paolo Rosson", time: 1428 }, { name: "Riccardo Chiarenza", time: 1266 }, { name: "Samuele Grasso", time: 1421 }, { name: "Vincenzo Coppola", time: 1205 }

, { name: "Carolina Guidetti", time: 974 }, { name: "Davide Arnesano", time: 953 }, { name: "Edoardo Annesi", time: 901 }, { name: "Giacomo Daniele Corò", time: 660 }, { name: "Luca Brasini", time: 825 }, { name: "Mattia Rigo", time: 1027 }, { name: "Riccardo Simone", time: 937 }, { name: "Sofia Saletnich", time: 799 }, { name: "Tommaso Zoffoli", time: 984 }, { name: "Valerio Locatelli", time: 568 }

, { name: "Andrea Princic", time: 1067 }, { name: "Claudio Fabrizio Scalia", time: 1033 }, { name: "Davide Pierrat", time: 785 }, { name: "Emanuele Tempra", time: 1405 }, { name: "Giacomo Mambrini", time: 1467 }, { name: "Kevin Montano", time: 1078 }, { name: "Leonardo Oppi", time: 1192 }, { name: "Marco Levrero", time: 1366 }, { name: "Mattia Galentino", time: 777 }, { name: "Nicola Forlai", time: 948 }

, { name: "Alessandro Amato", time: 1112 }, { name: "Daniele Rizzo", time: 2181 }, { name: "Davide Camilleri", time: 781 }, { name: "Falco Marchi", time: 1626 }, { name: "Lorenzo D'Ammassa", time: 1205 }, { name: "Lorenzo Tendola", time: 1194 }, { name: "Nicolò Barbisan", time: 985 }, { name: "Pier Ubbiali", time: 3573 }, { name: "Riccardo Manzoni", time: 2116 }, { name: "Simone Infunti", time: 932 }

, { name: "Giovanni Piscitelli", time: 909 }, { name: "Maicol Padovani", time: 2792 }, { name: "Vincenzo Forchi", time: 1782 }

, { name: "Alessandro Fava", time: 864 }, { name: "Alessandro Zangolini", time: 787 }, { name: "Alessia Novizio", time: 1346 }, { name: "Enrico Tenuti", time: 863 }, { name: "Evan Maccagnan", time: 953 }, { name: "Flavio Rimi", time: 726 }, { name: "Manel Prestieri", time: 1646 }, { name: "Marco Giordano", time: 927 }, { name: "Mariano D'Imperio", time: 982 }, { name: "Tea Raimondi Vallesi", time: 1043 }

, { name: "Alessandro Calzoni", time: 805 }, { name: "Alessandro Manopulo", time: 943 }, { name: "Andrea Santambrogio", time: 1338 }, { name: "Gabriele Bacchieri", time: 1420 }, { name: "Giovanni Centili", time: 792 }, { name: "Giovanni Pische", time: 1052 }, { name: "Marco Guarasci", time: 920 }, { name: "Massimiliano Iovane", time: 794 }, { name: "Miriana Cecchi", time: 2262 }, { name: "Vittorio Maria Perucatti", time: 962 }

, { name: "Alessandro Ricci", time: 805 }, { name: "Alessio Pandin", time: 970 }, { name: "Claudio Bentivoglio", time: 1099 }, { name: "Damiano Di Paola", time: 1115 }, { name: "Francesco Odorizzi", time: 1285 }, { name: "Giovanni Contardi", time: 806 }, { name: "Marco Belotti", time: 1129 }, { name: "Pietro Gasparetto", time: 996 }, { name: "Simone Dalle Fratte", time: 1386 }, { name: "Valentina Trinca Talalin", time: 894 }

, { name: "Alberto Mantovani", time: 886 }, { name: "Anna Battistini", time: 1321 }, { name: "Christian Crea", time: 827 }, { name: "Daniele Gennara", time: 1187 }, { name: "Loris Boldi", time: 1024 }, { name: "Manfredi Italiano", time: 795 }, { name: "Mattia Furlan", time: 795 }, { name: "Michael Volpe Mayerle", time: 1978 }, { name: "Simone Ciancotti", time: 1384 }, { name: "Stefano Bevacqua", time: 1021 }

, { name: "Edoardo Disarò", time: 953 }, { name: "Fabio Rossi", time: 815 }, { name: "Federico Borgogni", time: 1180 }, { name: "Giacomo Amati", time: 1013 }, { name: "Giulia Accorsi", time: 1399 }, { name: "Luca Cerrato", time: 806 }, { name: "Marco Minici", time: 1310 }, { name: "Marianna Bondi", time: 1367 }, { name: "Matteo Parodi", time: 908 }, { name: "Riccardo Ripoldi", time: 1323 }

, { name: "Alessandro Casarin", time: 959 }, { name: "Carlo Galimberti", time: 1285 }, { name: "Christian Ceccaroni", time: 1501 }, { name: "Fabio Piumatti", time: 1110 }, { name: "Federico Basanese", time: 1107 }, { name: "Francesco Palma", time: 1205 }, { name: "Giosuele Chiarella", time: 1164 }, { name: "Ismaele Chiarella", time: 986 }, { name: "Leonardo Corbelli", time: 801 }, { name: "Rocco Rannisi", time: 959 }      // ... il tuo array di giocatori
];

let classifica = {}; // Oggetto per memorizzare i punteggi dei giocatori

// Funzioni del gioco (adattate per Telegram)
function shufflePlayers() {
    players.sort(() => Math.random() - 0.5);
}

function nextRound(chatId) {
    shufflePlayers();
    bot.sendMessage(chatId, `Chi ha la miglior media nel 3x3?\n\nGiocatore 1: ${players[0].name}\nGiocatore 2: ${players[1].name}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Giocatore 1', callback_data: '1' }, { text: 'Giocatore 2', callback_data: '2' }]
            ]
        }
    });
}

function checkAnswer(chatId, msgId, clickedIndex) {
    let correctIndex = players[0].time <= players[1].time ? 0 : 1;
    if (clickedIndex - 1 === correctIndex) {
        classifica[chatId] = (classifica[chatId] || 0) + 1;
        bot.editMessageText(`✔ Corretto! \nPunteggio: ${classifica[chatId]}`, {
            chat_id: chatId,
            message_id: msgId,
        });
    } else {
        bot.editMessageText(`✖ Sbagliato! ❌\nPunteggio: ${classifica[chatId]}`, {
            chat_id: chatId,
            message_id: msgId,
        });
    }
    setTimeout(() => nextRound(chatId), 1000);
    saveClassifica();
}

function getClassifica(chatId) {
    let sortedClassifica = Object.entries(classifica).sort(([, a], [, b]) => b - a);
    let classificaText = " Classifica \n";
    sortedClassifica.forEach(([id, score], index) => {
        bot.getChat(id).then(chat => {
            classificaText += `${index + 1}. ${chat.first_name || chat.title}: ${score}\n`;
            if (index === sortedClassifica.length -1 ){
                bot.sendMessage(chatId, classificaText);
            }
        });
    });
}

function saveClassifica() {
    fs.writeFileSync('classifica.json', JSON.stringify(classifica));
}

function loadClassifica() {
    try {
        const data = fs.readFileSync('classifica.json');
        classifica = JSON.parse(data);
    } catch (e) {
        classifica = {};
    }
}

// Gestione dei comandi del bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    loadClassifica();
    bot.sendMessage(chatId, 'Benvenuto al gioco! Usa /gioca per iniziare.');
});

bot.onText(/\/gioca/, (msg) => {
    const chatId = msg.chat.id;
    loadClassifica();
    nextRound(chatId);
});

bot.onText(/\/classifica/, (msg) => {
    const chatId = msg.chat.id;
    loadClassifica();
    getClassifica(chatId);
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const msgId = query.message.message_id;
    const clickedIndex = parseInt(query.data);
    checkAnswer(chatId, msgId, clickedIndex);
});

// Avvia il server Express
app.listen(process.env.PORT || 3000, () => {
    console.log('Bot in esecuzione!');
});
