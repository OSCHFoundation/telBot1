var ajax = require('superagent');
const Pageres = require('pageres'); 
const TelegramBot = require('node-telegram-bot-api');
 
// replace the value below with the Telegram token you receive from @BotFather
const token = '584862429:AAEXU8sVxVIimUOv_6khU_d1ijqp2lgxKRY';
//519373406:AAEV0Uva5a0TBdxrHwWRmEaGKx98F_SRD3Q
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

const phArr = [];
for(var i=1; i<10; i++){
  phArr.push("./static/"+i+".jpg")
}
bot.onText(/\/photo/, function onPhotoText(msg) {
  let photo = `${__dirname}/static/photo.gif`;
  let phIndex = parseInt(Math.random()*10);
  let phUrl = phArr[phIndex]; 
  console.log(phUrl);
  bot.sendPhoto(msg.chat.id, phUrl, {
    caption: "I'm OSCH bot!"
  });
});
bot.onText(/\/price/, function onPhotoText(msg) {
console.log(__dirname)
  const pageres = new Pageres({delay: 2,filename: "offer"})
//https://www.digifinex.com/trade/ETH/OSCH
     .src('https://www.digifinex.com/trade/ETH/OSCH', [ '1920x1080'])
     .dest(__dirname)
     .run()
     .then(function(){
        console.log('success')
         bot.sendPhoto(msg.chat.id, './offer.png', {
            caption: "Real-time prices, see below the transaction price."
        });
    });
});
bot.onText(/\/video/, function onVideoText(msg) {
  let video = `${__dirname}/static/video.mp4`;
  bot.sendVideo(msg.chat.id, video, {
    caption: "I'm OSCH bot!"
  });
});
//敏感词检测
//bot.onText(/123/, function onPhotoText(msg) {
//  console.log(msg.chat.id);  
//  console.log(msg);
//
//  bot.sendMessage(msg.chat.id,"你发的是广告，正在执行移出群程序").then((res)=>{
//    bot.kickChatMember(msg.chat.id,msg.from.id).then((res)=>{
//      console.log(res);
//    })
//  })
//})
//
//
bot.onText(/\address/, function onContractText(msg){

  bot.sendMessage(msg.chat.id,"0xf46f98a8f6032914921ae9cfb5aaab5083bd9376"); 
})
bot.onText(/[\s\S]*/, function onAnyText(msg){
  if(msg.from.is_bot){
    bot.kickChatMember(msg.chat.id,msg.from.id).then((res)=>{
      console.log(res);
    })
  }else{
    let ranNum = Math.random();
    let opts = {
      //   reply_to_message_id: msg.message_id,
      parse_mode: 'HTML'
    };
    let html = 'Major news: Open source chain has logged in two major exchanges\n\t'+
               'Japan Exchange：<a href="https://ex.btcbox.com/">BoxEx</a>\n\t'+
               'Singapore Exchange：<a href="https://www.digifinex.com">digifinex</a>\n\t'+
               'Welcome everyone trading at the official address\n\t'+
               'DigiFinex Digital Currency Exchange - Bitcoin, Litecoin, Ethereum and other blockchain asset trading platforms\n\t'+
               'DigiFinex Exchange'
    if(ranNum>0.92){
      bot.sendMessage(msg.chat.id, html, opts)
    }
  }
})

bot.onText(/\introduce/,function onIntroduce(msg){
  let opts = {
 //   reply_to_message_id: msg.message_id,
    parse_mode: 'HTML'
  };
  let html = 'Open Source Chain is the world’s first IP marketplace powered by blockchain technology, and Open Source philosophy.'+
             'Engineers, IC designers, and hardware manufacturers can learn, share, trade and further develop these crystalized wisdom and be rewarded from token appreciation,'+
                    'Using public shared digital ledger, OSCH unites industry participants and streamlines design, sales, and production processes.'+
                    'Participation from stakeholders mint tokens, and communal positive behavior enhance token value.';
  bot.sendMessage(msg.chat.id,html,opts)
})
bot.onText(/\help/,function onHelpText(msg){
  bot.sendMessage(msg.chat.id,"request help")  
})

/*
bot.onText(/^\/.{6}/, function onPhotoText(msg) {
   const chatId = msg.chat.id;
  console.log(msg.text);
  //msg.text
  console.log(msg);
  if(false){
    var textMsg = msg.text.substring(1,msg.text.length);
    var userName = "123";
    if(msg.from.username){
      userName = msg.from.username;
    }else if(msg.from.first_name){
      userName = msg.from.first_name;
    }
    ajax.post('http://127.0.0.1/jfinal_demo/distribution')
     .send({ 
       code: textMsg,
       telid: msg.from.id,
       is_bot: msg.from.is_bot,
       username: userName
    })
    .set('X-API-Key', 'foobar')
    .set('Accept', 'application/json')
    .end(function(err, res) {
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
      }else if(res.body.result == 3){
        var tUrl = "http://g.oschain.io/#/?parentId="+textMsg;
        var tHtml = 'Verification FAIL!.\n\t'+
                    'Each user can only verify once.';
        bot.sendMessage(chatId, tHtml,opts);
      }else{
        return; 
      }
    })
  }
});
*/
bot.on('polling_error', (error) => {
   console.log(error);  // => 'EFATAL'
});

