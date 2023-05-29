# 飯店機器人
## 分成三階段:  
1.會回應評價所含情緒:positive、negative、netural  
2.會回傳評價所含情緒(中文)+信心指數  
3.會抓出評價主詞  
# 第一部分:回傳positive、negative、netural  
![hw4第一部分]()  
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
