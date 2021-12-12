# ChatBot
카톡봇 만들어보기(이것저것)<br/>
카페주소 : https://cafe.naver.com/nameyee



## 만들어볼 목록

* 날씨 조회 (완료)
* 로또 번호 생성 (완료)
* 번역 (완료)
* 코인 조회 (완료)
* 주식 조회 (완료)
* 운세 조회 (90%)



## 기능

* **/오늘 :** 현재 시간 출력.
* **/날씨 지역 :** 해당 지역의 날씨 조회
* **/로또 숫자(1 ~ 6) :** 로또번호 생성
* **/번역 번역할언어(영어, 일어) 번역내용 :** 내용을 해당 언어로 번역
* **/코인 코인이름 :**  해당 코인정보 조회
* **/주식 주식이름 :**  해당 주식 정보 조회
* **/운세 :** 해당 메세지를 친 사람의 별자리 운세를 출력.



### 이용 API 

* 날씨 - OpenWeather

* 번역 - Papago

* 코인 - Upbit

* 주식, 운세 - 네이버 검색 결과를 토대로 긁어와 출력.



## 후기

운세봇까지 하고 카봇작업은 종료.<br/>
운세봇은 기기에 카톡방사람들의 생일(월 일)이 저장된 txt파일을 불러와 해당 월 일을 가지고, 별자리를 구분해 
네이버 별자리 운세를 보는 기능까지 구현.<br/>
txt 파일에 내용을 방별 폴더안에 따로 멤버들을 저장하는 부분을 구현하면서, 운세봇을 허용할 방과 하지않을 방을 제한을 걸다가 톡방에 도배사고가 일어나 중지.<br/>

~~원인은 메신저봇이 카톡알림을 가지고 메세지를 답변하는데 이게 듀얼메신저로 부계정을 **한 기기에서 같이 돌리다보니 발생**한거 같음~~

원인이

```javascript
if (cmd == '/운세') {
    result = readFile(sender);
}
replier.reply(result);
```

이부분이였던거같음.

/운세 안쳐도 알림이 온 톡방에 그냥 다 답장해버린거 같음.



무튼 처음 카톡봇을 만들면 해봐야지 했던건 다 해봤고, 저장하는 부분을 구현할 방법도 write를 사용해서 해당 경로로 쓰면된다는 건 알게 되서 카톡봇 봉인.

필요시(해보고싶은 기능이나 등등) 공기계 구해서 다시 실행하고, 봉인해제하면 될 거 같음.

평소에 오픈톡방 봇이 어떻게 만들어지는지 궁금했는데, 개발 당시에는 시간가는 줄 모르고 재밋게 했음.
