const TelegramBot = require('node-telegram-bot-api');
var ajax = require('superagent');

// replace the value below with the Telegram token you receive from @BotFather
const token = '468162909:AAEwDuyiOInIE-0A8Zptqr-jhy7Box4kPIY';

// Create a bot that uses 'polling' to fetch new updates
var fs = require('fs');
const options = {
  webHook: {
    port: 443,
    key: fs.readFileSync('./key.pem', 'utf8'), // Path to file with PEM private key
    cert: fs.readFileSync('./crt.pem', 'utf8')
  }
};
const bot = new TelegramBot(token, options);


// Listen for any kind of message. There are different kinds of
// messages.
const url = 'https://t.me/OSChain5bot/bot468162909:AAEwDuyiOInIE-0A8Zptqr-jhy7Box4kPIY';

bot.setWebHook(url, {
  certificate: options.webHook.cert
});


bot.on('message', (msg) => {
console.log('mess');
  const chatId = msg.chat.id;
  var textMsg = msg.text.substring(1,msg.text.length);
  ajax.post('http://127.0.0.1/jfinal_demo/distribution')
    .send({ code: textMsg})
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
})
bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});
