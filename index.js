const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const TOKEN = 'TUO_TOKEN_API'; // Sostituisci con il tuo token
const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

app.use(bodyParser.json());

let players = [
    // ... il tuo array di giocatori
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
