const TelegrammBot = require("node-telegram-bot-api");
require("dotenv").config();
const options = require("./options");
const bot = new TelegrammBot(process.env.TOKEN,{polling:true})

/*const gameOptions = {
    reply_markup:{
        inline_keyboard:[
[{text:"1",callback_data:"1"},{text:"2",callback_data:"2"},{text:"3",callback_data:"3"}],
[{text:"4",callback_data:"4"},{text:"5",callback_data:"5"},{text:"6",callback_data:"6"}],
[{text:"7",callback_data:"7"},{text:"8",callback_data:"8"},{text:"9",callback_data:"9"}],
[{text:"0",callback_data:"0"}]
        ]
    }
  }*/

  /*const againOptions = {
    reply_markup:{
       inline_keyboard:[
            [{text:"Play again",callback_data:"/again"}]
        ]
    }
   }*/

   const startGame = async (chatId)=>{
    await bot.sendMessage(chatId,"Guess Number 0-9 ")
    const randomNumber = Math.floor(Math.random()*10);
   chats[chatId] = randomNumber;
   await bot.sendMessage(chatId,"Guess!!!",options.gameOptions);
   }//startGame

const chats = {};

const start = ()=>{
    bot.setMyCommands([
        {command:"/start",description:"Begining work"},
        {command:"/info",description:"information user"},
        {command:"/game",description:"Begining game"},
    ])
    bot.on("message",async (msg)=>{
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === "/start"){
       await bot.sendSticker(chatId,"https://data.chpic.su/stickers/v/VProgramm/VProgramm_003.webp?v=1702631226");
     return  bot.sendMessage(chatId,`Welcome to the bot!!! `)
        }
        if(text === "/info"){
     return bot.sendMessage(chatId,`Hello friend ${msg.from.first_name} your nick ${msg.from.username}`)
        }
        if(text === "/game"){
     return  startGame(chatId);
        }//game
    return bot.sendMessage(chatId,"I do not undestand ")
        
    })//on
}//start

start();

bot.on("callback_query",async (query)=>{
    const data = query.data;
    const chatId = query.message.chat.id;
    if(data === "/again"){
   return startGame(chatId);
    }//again
    if(data == chats[chatId]){
 return bot.sendMessage(chatId,`Winner!!! Your number ${data}`,options.againOptions)      
    }else{
   return bot.sendMessage(chatId,`Lol !!! Your number ${data}`,options.againOptions)     
    }//data



})//callback_query