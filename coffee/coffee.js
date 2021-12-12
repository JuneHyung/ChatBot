const scriptName = "Coffee";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
let personList = [];
let personCnt = 0;
let helpMessage = '';
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  const cmd = msg.split(" ")[0];
  const repeat = msg.split(" ")[1];
  const pName = msg.split(" ")[2]!=undefined ? msg.split(" ")[2] : "";
  let result;
  
  if (cmd == "/커피" || cmd == "/coffee") {
    switch (repeat) { 
      case '목록': case 'list':
        helpMessage = personCnt == 0 ? '현재 등록된 인원이 없습니다.' : '현재 등록된 인원은 \n' + personList.join(', ') + '입니다.';
        result = helpMessage;
        break;
      case 'help':
        helpMessage = '본 기능은 커피뽑기에 당첨될 사람을 뽑는 기능입니다.\n';
        helpMessage += '1. "/커피 추가 이름" 으로 인원을 추가하시고,\n';
        helpMessage += '2. "/커피 셔플"로 순서를 섞어주세요. \n';
        helpMessage += '3. "/커피 뽑기"를 통해 당첨된 행운아를 뽑아주세요.';
        result = helpMessage;
        break;
      case '추가': case 'add':
        result = pName.length != 0 ? addCoffeeList(pName) : '입력한 이름값이 없습니다.';
        break;
      case '삭제': case 'remove':
        result = pName.length != 0 ? removeCoffeeList(pName) : '입력한 이름 값이 없습니다.';
        break;
      case '초기화': case 'reset':
        result = resetCoffeeList();
        break;
      case '셔플': case 'shuffle':
        result = personList.length>0 ? shuffleCoffeList() :'등록된 인원이 없습니다.';
        break;
      case '뽑기': case 'draw':
        result = personList.length>0 ? getLuckyPerson() : '등록된 인원이 없습니다.';
      break;
    }
    
    replier.reply(result);
  } // if(커피)
}

function addCoffeeList(pName) { 
  personList.push(pName);
  let resultMessage = pName + '님이 등록되었습니다. \n현재 등록된 인원 \n' + personList.join(', ') + '입니다.'
  personCnt++;
  return resultMessage;
}

function removeCoffeeList(pName) {
  let resultMessage = ``;
  if (personList.indexOf(pName) < 0) { 
    resultMessage = pName+'으로 등록된 인원이 없습니다.';
  } else {
    personList.splice(personList.indexOf(pName), 1);
    resultMessage = pName+'님이 삭제되었습니다. \n 현재 등록된 인원 = '+ personList.join(', ')+ '입니다.';
    personCnt--;
  }
  return resultMessage;
 }

function resetCoffeeList() { 
  personList = [];
  personCnt = 0;
  const resultMessage = '초기화 되었습니다. \n 현재 등록된 인원이 없습니다.';
  return resultMessage;
}

function shuffleCoffeList() {
  let idxList = [];  
  for (let i = 0; i < personList.length; i++) { 
    while (idxList.length != personCnt) { 
      let idx = Math.floor(Math.random() * personCnt);
      if (idxList.indexOf(idx) == -1) { 
        idxList.push(idx);
      }
    }
  }

  makeShuffleList(idxList);

  let resultMessage = idxList + '\n';
  resultMessage += '변경된 순서는 \n' + personList + '\n입니다.';
  return resultMessage;
}

function makeShuffleList(idxList) { 
  let tmpArr = [];
  for (let i = 0; i < personCnt; i++) { 
    let idx = idxList.indexOf(i);
    tmpArr.push(personList[idx]);
  }
  
  personList = [];
  for(let i=0;i<personCnt;i++){
    personList.push(tmpArr[i]);
  }
}
function getLuckyPerson() { 
  let luckyIdx = Math.floor(Math.random() * personCnt);
  const resultMessage = '오늘 커피를 살 행운의 당첨자는 ' + personList[luckyIdx] + ' 입니다.';
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
