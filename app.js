var ajax = require('superagent');
const TelegramBot = require('node-telegram-bot-api');
 
// replace the value below with the Telegram token you receive from @BotFather
const token = '555911521:AAE3x_oR2czCGxV4aVs6XV-hBuP6daqT5NU';
 
// Create a bot that uses 'polling' to fetch new updates
var option = {
  polling:{
    interval: 150
  }
}
const bot = new TelegramBot(token, option);
// Matches "/echo [whatever]"
// Matches /audio
/*bot.onText(/\/audio/, function onAudioText(msg) {
  // From HTTP request
  const url = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg';
  const audio = request(url);
  bot.sendAudio(msg.chat.id, audio);
});*/
/*bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
 
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
 
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});*/
// Matches /love
/*bot.onText(/\/love/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['Yes, you are the bot of my life ❤'],
        ['No, sorry there is another one...']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
}); */

// Listen for any kind of message. There are different kinds of
// messages.
bot.onText(/^\/.{6}/, function onPhotoText(msg) {
   const chatId = msg.chat.id;
  console.log(msg.text);
  if(msg.text){
  var textMsg = msg.text.substring(1,msg.text.length);
  console.log(msg.from.id);
  console.log(msg.from.is_bot);
  console.log(msg.from.username);
  
  ajax.post('http://127.0.0.1/jfinal_demo/distribution')
  .send({ 
    code: textMsg,
    telid: msg.from.id,
    is_bot: msg.from.is_bot,
    username: msg.from.username
  })
  .set('X-API-Key', 'foobar')
  .set('Accept', 'application/json')
  .end(function(err, res) {
  console.log('success');
    const opts = {
      reply_to_message_id: msg.message_id,
      parse_mode: 'HTML'
    };
    if(res.body.result == 0){
      var tUrl = "http://g.oschain.io/#/?parentId="+textMsg;
      var tHtml = 'Verification SUCCESS! You have got 1000  OSCH.\n\t'+
                  'For every friend you invite, you will earn 400 OSCH. For every person your friends invite, you will also earn 80 OSCH.\n\t'+
                  'Your share link：\n\t'+
                  '<a href="'+tUrl+'">'+tUrl+'</a>\n\t'+
                  'open source chain, demonstrates how blockchain create values'
      bot.sendMessage(chatId, tHtml,opts);
    }else if(res.body.result == 2){
      var tUrl = "http://g.oschain.io/#/?parentId="+textMsg;
      var tHtml = 'You have verified in the past.\n\t'+
                  'For every friend you invite, you will earn 400 OSCH. For every person your friends invite, you will also earn 80 OSCH.\n\t'+
                  'Your share link：\n\t'+
                  '<a href="'+tUrl+'">'+tUrl+'</a>\n\t'+
                  'open source chain, demonstrates how blockchain create values'
      bot.sendMessage(chatId, tHtml,opts);
    }else{
      return;
    }
})
  }
});


bot.on('polling_error', (error) => {
   console.log(error);  // => 'EFATAL'
});

