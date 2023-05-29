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
![hw4第二部分]()
