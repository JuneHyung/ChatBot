const scriptName = "Coin";


let allUrl = "https://api.upbit.com/v1/market/all"
let url = "https://api.upbit.com/v1/ticker?markets=KRW-";
let coinName = "";
let coinList = [];
let coinListResult = [];
let helpMessage = '"/코인 코인이름"을 치시면 코인이름의 정보가 나옵니다. \n\n "/코인 목록"을 치시면 검색가능한 코인이름 목록이 나옵니다.\n\n Ctrl+F로 찾아서 보세요. '
function  response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

    var cmd = msg.split(" ")[0];
    coinName = msg.split(" ")[1];
    let result;
    let temp;
    if (cmd == "/코인" || cmd.toLowerCase() == "/coin") {
      switch(coinName){
        case "목록":case "list":
         getAllCoinList(coinName);
         result = coinListResult; 
        break;
        case "help":
         result = helpMessage;
        break;
        default:
          temp = getAllCoinList(coinName);
          if(temp == null || temp == ""){
            result = "잘못된 이름 입니다.";
          }
          else{
            result = getCoinInfo(temp);
         } 
        break;
      }
      replier.reply(result);
    }
    

}
function getAllCoinList(coinName) { 
    let datas = Utils.getWebText(allUrl).replace(/(<([^>]+)>)/g, "").trim(" ","");
    let allDatas = JSON.parse(datas);
    let findBit;
    for(var i in allDatas){
      let all = allDatas[i];
      let coinKorName = all.korean_name;
      if(coinName=="목록" || coinName=="list"){
          coinList.push(all.korean_name);
      }else if(coinName == coinKorName){
        findBit = all.market.split("-")[1];
      }
    }
    removeDuplicate();
    return findBit;
}

function getCoinInfo(temp){
  let datas = Utils.getWebText(url+temp).replace(/(<([^>]+)>)/g, "").trim(" ","");
  let tempDatas = JSON.parse(datas);
  let d1 = JSON.stringify(datas);
  
  let trade_date = tempDatas[0].trade_date;
  let trade_time = tempDatas[0].trade_time;
  let opening_price = tempDatas[0].opening_price;
  let high_price = tempDatas[0].high_price;
  let low_price = tempDatas[0].low_price;
  let trade_price = tempDatas[0].trade_price;
  let prev_closing_price = tempDatas[0].prev_closing_price;
  let signed_change_price = tempDatas[0].signed_change_price;
  let signed_change_rate = tempDatas[0].signed_change_rate;
  let acc_trade_volume = tempDatas[0].acc_trade_volume;
  let acc_trade_volume_24h = tempDatas[0].acc_trade_volume_24h;
  let acc_trade_price_24h = tempDatas[0].acc_trade_price_24h;
  
  trade_date = trade_date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
  trade_time = trade_time.replace(/(\d{2})(\d{2})(\d{2})/g, '$1 : $2 : $3');
  opening_price = filterNumber(opening_price);
  high_price = filterNumber(high_price);
  low_price = filterNumber(low_price);
  trade_price = filterNumber(trade_price);
  prev_closing_price = filterNumber(prev_closing_price);
  signed_change_price = filterNumber(signed_change_price);
  signed_change_rate = (signed_change_rate * 100).toFixed(2);
  acc_trade_volume = filterNumber(acc_trade_volume.toFixed(2));
  acc_trade_volume_24h = filterNumber(acc_trade_volume_24h.toFixed(3));
  acc_trade_price_24h = filterNumber(acc_trade_price_24h);
  
  let change;
  switch(tempDatas[0].change){
    case "RISE":
     change = "📈📈📈 "+signed_change_price+"("+signed_change_rate+"%) 상승 📈📈📈";
    break;
    case "FALL":
    change = "📉📉📉 "+signed_change_price+"("+signed_change_rate+"%)하락 📉📉📉";
    break;
    case "EVEN":
    change = "📊📊📊보합📊📊📊";
    break;
  }
  let now = getCurrent();
  let coinInfo = coinName + "(" + temp + ") " + "정보\n\n"
  + "⏰검색 시간⏰\n" + now + "\n\n"
  + change
  + "\n\n최근 거래 일자 : " + trade_date 
  + "\n최근 거래 시각 : " + trade_time
  + "\n시가 : " + opening_price
  + "\n고가 : " + high_price
  + "\n저가 : " + low_price
  + "\n종가 : " + trade_price
  + "\n전일 종가 : " + prev_closing_price
  + "\n누적 거래량 : " + acc_trade_volume
  + "\n누적 거래량(24h) : " + acc_trade_volume_24h
  + "\n누적 거래대금(24h) : " + acc_trade_price_24h;
  
  return coinInfo;
}

 function filterNumber(price){
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getCurrent(){
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth()+1;
  let date = today.getDate();
  let dayArr = ['일','월','화','수','목','금','토'];
  let day = today.getDay();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  
  let resultToday = year+'년 '+month+'월 '+date+'일 '+dayArr[day]+'요일 \n'
   + hour + '시 ' + min + '분 ' + sec + '초';
  return resultToday;
}
              
function removeDuplicate(){
   const set = new Set(coinList);
   
   coinListResult = Array.from(set);
}
                
                


//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}