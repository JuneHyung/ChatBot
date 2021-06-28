const scriptName = "Weather";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

var url = 'http://api.openweathermap.org/data/2.5/';
var API_KEY ='ENTER YOUR API KEY';
var helpMessage = '검색가능 도시 : \n서울, 부산, 대구, 인천, 광주, 대전, 울산, 제주, 구미, 포항, 마산 \n'
  +'\n"/날씨 도시이름"으로 검색해 주세요!😉\n'
  +'\n 기본값은 서울입니다. \n';


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  var cmd = msg.split(" ")[0];
  var city = msg.split(" ")[1];
  var result;
  
    if(city=='help'){
      result = helpMessage;
    }else{
      city = filteringCity(city);
      result = getWeather(city);
    }
  
  if(cmd=='/날씨'){
    replier.reply(result);
  }
  
}

function getWeather(city){
  let fetchUrl = url+'weather?q='+city+'&units=metric&APPID='+API_KEY+'&lang=kr';
  var data = Utils.getWebText(fetchUrl).replace(/(<([^>]+)>)/g, "").trim(" ","");

  var result = JSON.parse(data);
  let weather = result.weather[0].main;
  let resultMessage = helpMessage + '\n'
    + changeMessage(weather) +'\n날씨 : '
    + result.weather[0].description + '\n온도 : '
    + result.main.temp+' \n체감온도 : ' 
    + result.main.feels_like+' \n풍속 : '
    + result.wind.speed+' \n풍향 : '
    + result.wind.deg+' \n'
  return resultMessage;
}

function changeMessage(weather){
  let changing ;
  switch(weather){
    case 'Clear':
    changing = '☀️☀️☀️';
    break;
    case 'Clouds':
    changing = '🌥️🌥️🌥️';
    break;
    case 'Rain':case 'Drizzle':
    changing = '🌧️🌧️🌧️';
    break;
    case 'Thunderstorm':
    changing = '🌩️🌩️🌩️';
    break;
    case 'Snow':
    changing = '🌨️🌨️🌨️';
    break;
    case 'Mist':
    changing = '🌫️🌫️🌫️';
    break;
    case 'Atmosphere':
    changing = '☁️☁️☁️';
    break;
    default:
    changing = weather;
    break;
  }
  return changing;
}

function filteringCity(city){
  let filtering;
  switch(city){
    case '서울':
      filtering = 'seoul';
      break;
    case '부산':
      filtering = 'busan';
      break;
    case '대구':
      filtering = 'daegu';
      break;
    case '인천':
      filtering = 'incheon';
      break;
    case '광주':
      filtering = 'gwangju';
      break;
    case '대전':
      filtering = 'daejeon';
      break;
    case '울산':
      filtering = 'ulsan';
      break;
    case '제주':
      filtering = 'jeju city';
      break;
    case '구미':
      filtering = 'gumi';
      break;
    case '포항':
      filtering = 'pohang';
      break;
    case '마산':
      filtering = 'masan';
      break;
    default:
    filtering = 'seoul';
    break;
  }
  return filtering;
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