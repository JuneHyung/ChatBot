const scriptName = "Finance";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
 const Jsoup = org.jsoup.Jsoup;
 let helpMessage = "도움말 \n '/주식 주식이름'으로 검색을 할 수 있습니다.";
 let url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=';
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
     let cmd = msg.split(" ")[0];
     let financeName = msg.split(" ")[1];  
     let result;
     if(cmd=='/주식'){
       switch(financeName){
         case 'help':case '':case undefined:
         result = helpMessage;
         break;
         default:
         result = getFinanceInfo(financeName);
         break;
       }
       replier.reply(result);
       
     }                     
}
function getFinanceInfo(fname){
  let resultMessage;
  let fetchUrl = url + fname;
  let data = Jsoup.connect(fetchUrl).get();
  let name = data.select(".stk_nm").text();
  let spt_con = data.select(".spt_tlt > h3 > a > span.spt_con > strong").text();
  if(spt_con){
  let change = data.select(".spt_tlt > h3 > a > span.spt_con > span.n_ch > .blind").text();
  let ch_price = data.select(".spt_tlt > h3 > a > span.spt_con > span.n_ch > em").text();
  
  let pcp = data.select('.ar_cont > .cont_dtcon > .dtcon_lst > .lst > .pcp > dl > dd').text();
  let hp = data.select('.ar_cont > .cont_dtcon > .dtcon_lst > .lst > .hp > dl > dd').text();
  let lp = data.select('.ar_cont > .cont_dtcon > .dtcon_lst > .lst > .lp > dl > dd').text();
  let vl = data.select('.ar_cont > .cont_dtcon > .dtcon_lst > .lst > .vl > dl > dd').text();
  let mc = data.select('.ar_cont > .cont_dtcon > .dtcon_lst > .lst > .mc > dl > dd').text();
  let cp_spt_con = data.select('.ar_cont > .cont_dtcon > .dtcon_lst > .lst > .cp > a > dl > dd > .spt_con > strong').text();
  let cp_change = data.select('.ar_cont > .cont_dtcon > .dtcon_lst > .lst > .cp > a > dl > dd > .spt_con > .n_ch > .ico').text();
  if(cp_change=='상승'){
    cp_change = '+';
  }else {
    cp_change = '-';
  }
  let cp_ch_price = data.select('.ar_cont > .cont_dtcon > .dtcon_lst > .lst >.cp > a > dl > dd > .spt_con > .n_ch > em').text();
  
  resultMessage = name + ' 주식\n'
           + '\n지수 : ' + spt_con
           + '\n상승/하강 : ' + change
           + '\n변동 : ' + ch_price
           + '\n전일종가 : ' + pcp
           + '\n고가 : ' + hp
           + '\n저가 : ' + lp
           + '\n거래량 : ' + vl
           + '\n시가 총액 : ' + mc
           + '\n코스피 : ' + cp_spt_con + " " +cp_change + cp_ch_price;
  }else{
    resultMessage = '해당 이름의 주식이 없습니다.\n정확한 이름으로 검색 해주세요.';
  }
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