/**
 * Created with JetBrains WebStorm.
 * User: javarouka
 * Date: 13. 10. 9
 * Time: 오후 9:11
 * To change this template use File | Settings | File Templates.
 */
'use strict';
var _ = require('lodash'),
  user = require("./user.js");

var MESSAGE_SET = {
  0: "노력이 필요할 것 같아요",
  10: "노력이 필요할 것 같아요",
  20: "노력이 필요할 것 같아요",
  30: "조금만 더 공부하면 좋을것 같아요",
  40: "조금만 더 공부하면 좋을것 같아요",
  50: "반타작은 했네요",
  60: "오 훌륭합니다",
  70: "오 훌륭합니다",
  80: "오 훌륭합니다",
  90: "거의 완벽했어요!",
  100: "당신은 이미 스타 개발자"
};

var quiz = [
  {
    id: 1,
    title: '이 중 다른 셋과 성격이 다른 언어 하나는?',
    answers: [
      "Groovy",
      "JavaScript",
      "Java",
      "PHP"
    ],
    solution: 2
  },
  {
    id: 2,
    title: '자바스크립트의 특성이 아닌 것은?',
    answers: [
      "일급 객체는 함수",
      "영향을 준 언어는 Self 언어와 Scheme 언어",
      "new 와 클래스 조합으로 객체를 생성",
      "객체 타입과 기본 타입이 함께 사용"
    ],
    solution: 2
  },
  {
    id: 3,
    title: 'HTML의 약자는?',
    answers: [
      "High Text Module Language",
      "Hiper Text Markup Language",
      "Higher Tool Major Language",
      "How To Make Love"
    ],
    solution: 1
  },
  {
    id: 4,
    title: 'C++의 개발자는?',
    answers: [
      "귀도 반 로섬 (Guido van Rossum)",
      "제임스 고슬링 (James A. Gosling)",
      "데니스 리치 (Dennis MacAlistair Ritchie)",
      "비야네 스트로스트럽 (Bjarne Stroustrup)"
    ],
    solution: 3
  },
  {
    id: 5,
    title: 'Java언어에서 다음 중 런타임 오류가 발생하는 코드는?',
    answers: [
      "<pre class='code'><code class='java'>List&lt;Number&gt; n = new ArrayList&lt;Number&gt;();\n" +
        "n.add(20);" +
        "</code></pre>",
      "<pre class='code'><code>Throwable aa = new Error();\n" +
        "Exception av = (Exception)aa;" +
        "</code></pre>",
      "<pre class='code'><code>int Integer = 3;\n" +
        "(Integer) - (Integer)3" +
        "</code></pre>",
      "<pre class='code'><code>new OutputStreamReader(System.out, 'UTF-8').write(''.getBytes())</code></pre>"
    ],
    solution: 1
  },
  {
    id: 6,
    title: 'Java Framework 가 아닌것은?',
    answers: [
      "Spring",
      "Play!",
      "Backcbone",
      "Hibernate"
    ],
    solution: 2
  },
  {
    id: 7,
    title: 'Java 컴파일러가 코드를 바이트코드로 변환한 다음, 실제 바이트코드를 실행하는 시점에서 가상 머신이 바이트코드를 기계어로 변환하여 성능을 향상시키는 컴파일 기법은?',
    answers: [
      "High-Risk High-Return",
      "Magic the Gathering",
      "League of Leagends",
      "Just-In-Time"
    ],
    solution: 3
  },
  {
    id: 8,
    title: 'HTML5에서 제외된 요소는?',
    answers: [
      "frame",
      "iframe",
      "article",
      "aside"
    ],
    solution: 0
  },
  {
    id: 9,
    title: '다음 중 Client-Side JavaScript Framework 나 Library가 아닌 것은?',
    answers: [
      "jQuery",
      "MooTools",
      "Express",
      "AngularJS"
    ],
    solution: 2
  },
  {
    id: 10,
    title: '구글의 분산 파일 시스템 논문이 공개된 뒤 더그 커팅과 마이크 캐퍼렐라가 그 구조에 대응하여 개발한 대량 분산 자료 처리 프레임워크는?',
    answers: [
      "Big Table",
      "Hadoop",
      "Casandra",
      "DynamoDB"
    ],
    solution: 1
  }
];

module.exports = {
  list: function() {
    return quiz.map(function(val) {
      var c = _.clone(val);
      delete c.solution;
      return c;
    });
  },
  check: function(answers, callback) {

    /*
     "nickname": "dsadas",
     "gender": "male",
     "quiz_1": "0",
     "quiz_2": "3",
     ...
     "quiz_n": "n"
     */

    var score = 0, solution = 0;

    for(var i= 0, len = quiz.length; i < len; i++) {
      solution = quiz[i].solution;
      console.log(solution, answers["quiz_" + (i + 1)]);
      if(solution == answers["quiz_" + (i + 1)]) {
        score++;
      }
    }

    // @FIXME 메세지 로직 수정 필요
    var r = score * (100/quiz.length),
      message = MESSAGE_SET[100];

    for(var k in MESSAGE_SET) {
      if(MESSAGE_SET.hasOwnProperty(k)) {
        if(k == score) {
          message = MESSAGE_SET[k];
        }
        else {
          break;
        }
      }
    }

    user.addUser({
      email: answers.email,
      gender: answers.gender,
      cdt: +new Date(),
      score: r,
      clear: answers.elapseTime || 0
    }, function(err){
      callback(err, {
        score: r,
        message: message,
        rank: 1
      });
    });
  },
  findById: function(id) {
    return _.clone(_.find(quiz, function(q) {
      return q.id === id
    }));
  }
};
