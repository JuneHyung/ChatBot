const scriptName = "Translate";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
 let helpMessage = '번역가능 언어 : 영어🇺🇸, 일본어🇯🇵\n입력방법 \n"/번역 번역할언어 번역내용"\n위의 양식에 맞게 입력해 주세요.'
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  let cmd = msg.split(" ")[0];
  let lang = msg.split(" ")[1];
  let text;
  let result;
  let arrEnglish = ['영어', 'en'];
  let arrJapanese = ['일본어','일어','ja'];
  if(cmd=='/번역'){
    text = msg.replace(("/번역 "+lang+" "),"");
   
    if(arrEnglish.includes(lang)){
      lang = 'en';
      result = translate(lang, text);
    }else if(arrJapanese.includes(lang)){
      lang = 'ja';
      result = translate(lang, text);
    }else{
      result = helpMessage;
    }
    
    replier.reply(result);
  }
}
function translateEnglish(text){
  let tEnglishMessage = Api.papagoTranslate("ko", "en", text);
  return tEnglishMessage;
}

function translateJapanese(text){
  let tJapaneseMessage = Api.papagoTranslate("ko", "ja", text);
  return tJapaneseMessage;
}

function translate(lang, text){
  let translateMessage = Api.papagoTranslate("ko", lang, text);
  return translateMessage;
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