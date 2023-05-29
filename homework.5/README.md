# 作業五:圖片辨識
## 主題:地標照片辨識
### 目的:使學生能簡單把網址或圖片丟入分析網站，而後顯示地標名稱和信心指數，信心指數能幫助學生判讀結果是否值得相信。  
#### 使用範例:  
![hw5-1](https://github.com/rin693350/LAT/blob/7e30710d813d626f2e0975f318748fccbdc0a44c/hw5_1.jpg)  
##### *放入艾菲爾鐵塔的圖片，圖說顯示出艾菲爾鐵塔和信心值* 
#### 使用範例二:  
![hw5-2](https://github.com/rin693350/LAT/blob/8afcece95c0e89405d6ab0d631cee3cd96752f2a/hw5_2.jpg)  
##### *放入倫敦大笨鐘的圖片，但圖說並沒有顯示出大笨鐘*
### 困難:原以為信心值會和結果準不準確有關，但以上面兩個例子來看兩者之間似乎並無關聯  
### 有修改的程式碼  
.done(function (data) {  
            //顯示JSON內容  
            $("#responseTextArea").val(JSON.stringify(data, null, 2));  
            $("#picDescription").empty();    
            $("#picDescription").append(data.description.captions[0].text +"<br>");  
            //抓出信心指數並顯示  
            $("#picDescription").append("信心指數為" + data.description.captions[0].confidence);  
            // $("#picDescription").append("這裡有"+data.faces.length+"個人");  
            })  
            
var params = {  
         "visualFeatures": "Objects,Categories,Description",  
         //將地標添加到細節裡  
         "details": "Landmarks",  
         "maxCandidates": "1",  
        "language": "zh",  
    };  
    


