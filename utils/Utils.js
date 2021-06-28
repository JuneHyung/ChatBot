const scriptName = "Utils";

let helpMessage = "Bot 사용법입니다.\n\n"
  +"0. /today, /오늘, /날짜 \n"
  +'오늘의 날짜 확인.\n\n'
  +'1. /로또 숫자(1~6) \n'
  +'로또 번호를 숫자만큼 생성.\n\n'
  +'2. /날씨 도시이름 \n'
  +'해당 도시의 날씨 확인.\n\n'
  +'3. /번역 번역할언어 내용.\n'
  +'내용을 지정한 언어로 번역.\n\n'
  +'4. /코인 코인이름\n'
  +'입력한 코인이름의 코인정보를 조회합니다.\n\n'
  +'5. /주식 주식이름\n'
  +'입력한 주식 이름의 주식정보를 조회합니다.\n\n'
  +'추가 도움말은 해당 기능뒤에 help를 붙여 확인하세요..\n'
  +'ex) /날씨 help';

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  
  
  let result;
  let cmd = msg.split(" ")[0];
  switch(cmd){
    case "/today":case "/오늘": case "/날짜":case "/지금":case"/now":
    result = getToday();
    replier.reply(result);
    break;
    case "/사용법":case "/도움":case "/use":case "/help":
    result = helpMessage;
    replier.reply(result);
    break;
  }
  
    
  
}
function getToday(){
  let current = new Date().getTime();
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
   + hour + '시 ' + min + '분 ' + sec + '초를 지나고 있습니다.'
  return resultToday;
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