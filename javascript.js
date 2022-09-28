const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("#logs");

const numbers = []; 
/*값을 모을 때는 배열[]을 사용, 각각의 값에 이름을 부여하여 구분해야 할 때는 객체 리터럴{}을 사용 */
for(let n = 0; n < 9; n += 1) {
  numbers.push(n + 1); /* numbers안에 n값 넣기 */
}

const answer = []; //정답 숫자4개 생성
for(let n = 0; n <= 3; n += 1) { //4번 반복
  const index = Math.floor(Math.random() * numbers.length); // 0~8 정수 =>index를 셀 때는 0으로 세기 때문
  answer.push(numbers[index]); //numbers의 index값을 answer로 push
  numbers.splice(index, 1); //중복이 없도록 push된 index의 값 1개를 제거해준다
};
console.log(answer);

const tries = [];
function checkInput(input) {
  if(input.length !== 4) { //길이는 4가 아닌가
    return alert('4자리 숫자를 입력해주세요.');
  }
  if(new Set(input).size !== 4) { //중복된 숫자가 있는지 검사 / Set은 중복을 허용하지 않는 특수한 배열
    return alert('중복되지 않게 입력해 주세요.');
  }
  if(tries.includes(input)) { //이미 시도한 값은 아닌가
    return alert('이미 시도한 값입니다.'); //10번 시도 내에 재시도한 값인지 판별
  }
  return true; //위의 검사에서 통과할 경우 ture값을 반환
};//검사하는 코드

function defeated() {
  const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`); //텍스트 생성
  $logs.appendChild(message); //화면에 표시
}

let out = 0;
$form.addEventListener('submit', (event) => {
  event.preventDefault(); //form에서 submit이벤트를 실행되면 브라우저가 새로고침되므로 이를 막기 위해 event.preventDefault를 기입
  const value = $input.value; //input값을 변수에 저장
  $input.value = ''; //다음 값을 쉽게 작성하기 위해 input값을 지워준다
  const valid = checkInput(value); //코드가 길어지는 것을 방지하고자 함수로 분리
  if(!valid) return;
  //입력값 문제없음
  if(answer.join('') === value) { //join은 배열을 빈 문자열로 바꿔주는 메소드이다.
    $logs.textContent = '홈런!';
    return;
  }
  if(tries.length >= 9) { //시도한 횟수가 10회 이상일 경우
    defeated();
    return;
  }
  //몇 스트라이크 몇 볼인지 검사
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]); //일치하는 숫자가 있는지 찾기
    if(index > -1)  { //-1는 false를 의미 / ㅑindex가 ture일 경우 => 일치하는 숫자를 발견할 경우
      if(index === i) { //자릿수가 일치하는지 확인
        strike += 1;
      } else {//숫자만 일치할 경우
        ball += 1;
      }
    }
  }
  if(strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}:아웃`,  document.createElement('br'));
  } else{
    $logs.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement('br')); //정답 : 1스트라이트 1볼
  }
  //append는 appenChild와 달리 여러개를 추가할 수 있다 / append를 더 많이 사용한다 ceateTextNode를 추가할 필요가 없기 떄문
  if(out === 3) {
    defeated();
    return;
  }
  tries.push(value);
});

