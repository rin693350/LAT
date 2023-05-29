'use strict';
const line = require('@line/bot-sdk'),
      express = require('express'),
      configGet = require('config');
const {TextAnalyticsClient, AzureKeyCredential} = require("@azure/ai-text-analytics");

//Line config
const configLine = {
  channelAccessToken:configGet.get("CHANNEL_ACCESS_TOKEN"),
  channelSecret:configGet.get("CHANNEL_SECRET")
};

//Azure Text Sentiment
const endpoint = configGet.get("ENDPOINT");
const apiKey = configGet.get("TEXT_ANALYTICS_API_KEY");

const client = new line.Client(configLine);
const app = express();

const port = process.env.PORT || process.env.port || 3002;

app.listen(port, ()=>{
  console.log(`listening on ${port}`);
   
});

async function MS_TextSentimentAnalysis(thisEvent){
  console.log("[MS_TextSentimentAnalysis] in");
  const analyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));
  let documents = [];
  documents.push(thisEvent.message.text);
  const results = await analyticsClient.analyzeSentiment(documents, "zh-Hant", { includeOpinionMining: true });
  console.log("[results]", JSON.stringify(results));
  const point = results[0].confidenceScores;
  const sentiment = results[0].sentiment;
  const pointText = `（正面：${point.positive.toFixed(2)}、負面：${point.negative.toFixed(2)}、中立：${point.neutral.toFixed(2)}）`;
  let replyText = '';
  if (sentiment === 'positive') {
      if (results[0].sentences[0].opinions && results[0].sentences[0].opinions.length > 0) {
          replyText = `非常高興您對於本店的${results[0].sentences[0].opinions[0].target.text}有好評價，歡迎下次再來喔!。`;
      } else {
          replyText = '收到回饋非常高興，本店期待您下次再度光臨。';
      }
  } else if (sentiment === 'negative') {
      if (results[0].sentences[0].opinions && results[0].sentences[0].opinions.length > 0) {
          replyText = `非常抱歉本店的${results[0].sentences[0].opinions[0].target.text}讓您有了不愉快的回憶，我們會繼續改進，也感謝您的建議。`;
      } else {
          replyText = '非常抱歉讓您有不好的體驗，您的意見我們已收到，會持續改進。';
      }
  } else {
      replyText = '收到您的回饋我們非常開心，也請持續關注本店!';
  }
  
  console.log("[opinions]", results[0].sentences[0].opinions);

  const echo ={
      type: 'text',
      text: "信心指數="+pointText+replyText
  };
  
  return client.replyMessage(thisEvent.replyToken, echo);   
}

app.post('/callback', line.middleware(configLine),(req, res)=>{
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result)=>res.json(result))
    .catch((err)=>{
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event){
  if(event.type !== 'message' || event.message.type !== 'text'){
    return Promise.resolve(null);
  }

  MS_TextSentimentAnalysis(event)
    .catch((err) => {
      console.error("Error:", err);
    }); 
}