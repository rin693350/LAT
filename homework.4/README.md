# 飯店機器人
## 分成三階段:  
1.會回應評價所含情緒:positive、negative、netural  
2.會回傳評價所含情緒(中文)+信心指數  
3.會抓出評價主詞  
# 第一部分:回傳positive、negative、netural  
![hw4第一部分](https://github.com/rin693350/LAT/blob/a2db68ab1be0b4dbda31a88e1b5d8cfb53e8b897/%E4%BD%9C%E6%A5%AD%E5%9B%9B%E7%AC%AC%E4%B8%80%E9%83%A8%E5%88%86.png)  
  async function MS_TextSentimentAnalysis(thisEvent){  
  console.log("[MS_TextSentimentAnalysis] in");  
  const analyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));  
    let documents = [];  
    documents.push(thisEvent.message.text);  
    const results = await analyticsClient.analyzeSentiment(documents);  
    console.log("[results] ", JSON.stringify(results));  
    const resultMessage = {  
      type: 'text',  
      text: results[0].sentiment  
      };  
      client.replyMessage(thisEvent.replyToken, {type:"text",text:results[0].sentiment})  
     }  
### *輸入評價會出現微軟的分析(positive、negative、netural)*  
# 第二部分:回傳中文分析結果+信心指數   
![hw4第二部分](https://github.com/rin693350/LAT/blob/045897929741686cb39dc7566334867324060d40/%E4%BD%9C%E6%A5%AD%E5%9B%9B%E7%AC%AC%E4%BA%8C%E9%83%A8%E5%88%86.png)  
    async function MS_TextSentimentAnalysis(thisEvent){  
    console.log("[MS_TextSentimentAnalysis] in");  
    const analyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));  
    let documents = [];  
    documents.push(thisEvent.message.text);  
    const results = await analyticsClient.analyzeSentiment(documents, "zh-Hant",{ includeOpinionMining: true });  
    console.log("[results]", JSON.stringify(results));  
    //下面為抓取信心指數(confidenceScores)的程式碼
    const point = results[0].confidenceScores;  
    //設定顯示出來的信心指數格式:正面:xx、負面:xx、中立:xx)
    const pointText = `（正面：${point.positive.toFixed(2)}、負面：${point.negative.toFixed(2)}、中立：${point.neutral.toFixed(2)}）`;  
    //將回傳的英文結果改為中文
    const sentimentText = results[0].sentiment === 'positive' ? '正向的' : results[0].sentiment === 'negative' ? '負向的' : '中立';  
    //將前面設定好的回覆參數寫入
    const echo ={  
      type: 'text',  
      text: `${sentimentText} ${pointText}`  
    };  
    return client.replyMessage(thisEvent.replyToken, echo);  


  }  
  ### *輸入評價會出現微軟的分析的中文結果(正向的、負向的、中立)+信心指數*
  #### *此部分有參考乃云助教的程式碼*
 # 第三部分:回傳評價主詞  
 ![hw4第三部分](https://github.com/rin693350/LAT/blob/e61bbb9612397f8c5b759c73d31ef458125c2596/%E4%BD%9C%E6%A5%AD%E5%9B%9B%E7%AC%AC%E4%B8%89%E9%83%A8%E5%88%86.png)  
 async function MS_TextSentimentAnalysis(thisEvent){  
 console.log("[MS_TextSentimentAnalysis] in");  
 const analyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));  
 let documents = [];  
 documents.push(thisEvent.message.text);  
 const results = await analyticsClient.analyzeSentiment(documents, "zh-Hant", { includeOpinionMining: true });  
 console.log("[results]", JSON.stringify(results));  
 const point = results[0].confidenceScores;  
 //和第二部分一樣抓信心指數
 const sentiment = results[0].sentiment;  
 const pointText = `（正面：${point.positive.toFixed(2)}、負面：${point.negative.toFixed(2)}、中立：${point.neutral.toFixed(2)}）`;  
 let replyText = '';  
 if (sentiment === 'positive') {
    //抓主詞位置(一長串的那個東東)
    //設定if迴圈，根據評價情緒不同給予不同回饋
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
### *輸入評價會出現信心指數+回饋文字*
#### *此部分有參考乃云助教的程式碼*


  
