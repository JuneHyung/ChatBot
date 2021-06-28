const scriptName = "Lucky";

importClass(org.jsoup.Jsoup);
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

  let cmd = msg;
  let result;

  if (cmd == '/운세') {
    result = readFile(sender);
    replier.reply(result);
  }

}

let path = 'sdcard/msgbot/database/';
function readFile(sender) {
  let fetchPath = path + sender + '.txt'
  let birth = FileStream.read(fetchPath);
  let resultMessage;
  if (!birth) {
    resultMessage = '등록되지않았습니다.₩n관리자에게 문의해주세요.';
  } else {
    let star = filterStar(birth);
    resultMessage = getLuckyInfo(star);

  }
  return resultMessage;
}

function filterStar(birth) {
  let date = new Date();
  let thisYear = date.getFullYear();

  birth = thisYear + '-' + birth.split(" ")[0] + '-' + birth.split(" ")[1];
  let birthday = new Date(birth).getTime();
  let aquarius = new Date(thisYear + '-02-18').getTime();

  let pices = new Date(thisYear + '-03-20').getTime();

  let aries = new Date(thisYear + '-04-19').getTime();

  let taurus = new Date(thisYear + '-05-20').getTime();

  let gemini = new Date(thisYear + '-06-21').getTime();

  let cancer = new Date(thisYear + '-07-22').getTime();

  let leo = new Date(thisYear + '-08-22').getTime();

  let virgo = new Date(thisYear + '-09-23').getTime();

  let libra = new Date(thisYear + '-10-22').getTime();

  let scorpio = new Date(thisYear + '-11-22').getTime();

  let sagittarius = new Date(thisYear + '-12-24').getTime();

  let capricorn = new Date((thisYear) + '-01-19').getTime();

  let result = '';
  switch (true) {
    case (birthday <= capricorn):
      result = '염소자리';
      break;
    case (birthday <= aquarius):
      result = '물병자리';
      break;
    case (birthday <= pices):
      result = '물고기자리';
      break;
    case (birthday <= aries):
      result = '양자리';
      break;
    case (birthday <= taurus):
      result = '황소자리';
      break;
    case (birthday <= gemini):
      result = '쌍둥이자리';
      break;
    case (birthday <= cancer):
      result = '게자리';
      break;
    case (birthday <= leo):
      result = '사자자리';
      break;
    case (birthday <= virgo):
      result = '처녀자리';
      break;
    case (birthday <= libra):
      result = '천칭자리';
      break;
    case (birthday <= scorpio):
      result = '전갈자리';
      break;
    case (birthday <= sagittarius):
      result = '사수자리';
      break;
    default:
      result = '염소자리';
      break;

  }

  return result;
}
let url = "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&qvt=0&query=";
function getLuckyInfo(star) {
  let fetchUrl = url + star;
  let data = org.jsoup.Jsoup.connect(fetchUrl).get().select('.infors > .detail > .text').text();
  return data;
}