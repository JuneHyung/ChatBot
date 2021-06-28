const scriptName = "Lotto";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
 let helpMessage = '잘못된 숫자 입니다.😕 \n"/로또 숫자(1~6)"을 입력해 주세요.😃';
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  let cmd = msg.split(" ")[0];
  let repeat = msg.split(" ")[1];
  let result;
  
  if(cmd=="/로또" || cmd=="/lotto"){
    if(repeat == "help"){
      helpMessage = '도움말 입니다.😃 \n입력방법 : \n"/로또 숫자(1~6)"\n'
      + '❤️🧡💛💚💙💜';
      result = helpMessage;
    }
    else if(1<= repeat && repeat <= 6){
      result = makeLotto(repeat);
    }
    else {
      result = helpMessage;
    }
    replier.reply(result);
  }
}
let lottoArr=[];
function makeLotto(repeat){
 
  let resultMessage = '😃😄오늘의 행운의 번호는😄😃\n\n';
  let tempMessage = '';
  for(let i=0; i<repeat; i++){
    while(lottoArr.length!=6){
      let num = Math.floor(Math.random()*45) + 1;
      if(lottoArr.indexOf(num)==-1){
        lottoArr.push(num);      
      }
    }
   
  lottoArr.sort(function(a, b) {
    return a - b;
  });
  
  let arr = lottoArr.join(',  ');
  resultMessage += arr + '\n';
  lottoArr.splice(0);
  }
  resultMessage += '\n 😃😄👏👏👏👏👏👏👏😄😃';
  return resultMessage;  
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