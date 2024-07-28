// 도메인 직접 입력 or domain option 선택 및 전체이메일 input #full-email에 값 넣기
$(document).ready(function() {
  // 도메인 목록 드롭다운의 변경사항을 감지하는 리스너 설정
  $('#domain-list').change(function() {
      var selectedValue = $(this).val();
      
      // '직접 입력' 옵션이 선택되었는지 확인
      if (selectedValue === 'type') {
          // 직접 입력을 위해 텍스트 입력 필드를 활성화
          $('#domain-txt').prop('readonly', false).val('').focus();
      } else {
          // 텍스트 입력 필드를 읽기 전용으로 설정하고 선택된 도메인으로 값 설정
          $('#domain-txt').prop('readonly', true).val(selectedValue);
      }
  });

  // 폼 제출 이벤트를 처리하는 부분
  $('form').on('submit', function(e) {
      // 이메일 로컬 부분과 도메인을 결합
      var emailLocalPart = $('#email').val();
      var emailDomainPart = $('#domain-txt').val();
      var fullEmail = emailLocalPart + '@' + emailDomainPart;
      
      // 전체 이메일 주소를 hidden input에 설정
      $('#full-email').val(fullEmail);
  });
});


// '출생 연도' 셀렉트 박스 option 목록 동적 생성
$(document).ready(function() {
  // 출생 연도 설정 (1940년부터 2023년까지)
  for (var year = 1940; year <= 2023; year++) {
      $('#birth-year').append($('<option>', {
          value: year,
          text: year
      }));
  }
  // 월 설정 (1월부터 12월까지)
  for (var month = 1; month <= 12; month++) {
      $('#birth-month').append($('<option>', {
          value: month,
          text: month
      }));
  }
  // 일 설정 (1일부터 31일까지)
  for (var day = 1; day <= 31; day++) {
      $('#birth-day').append($('<option>', {
          value: day,
          text: day
      }));
  }
});

/* 회원가입 */
function checkUser() {
 let id = document.getElementById('id').value;
 let pw1 = document.getElementById('pw').value;
 let pw2 = document.getElementById('pw2').value;
 let email = document.getElementById('email').value;
 let email2 = document.getElementById('domain-txt').value;
 let birth1 = document.getElementById('birth-year').value;
 let birth2 = document.getElementById('birth-month').value;
 let birth3 = document.getElementById('birth-day').value;
 let tel = document.getElementById('tel').value;
 
 // 모든 값 입력된 상태인지 확인
 if(id.length == 0 || pw1.length == 0 || pw2.length == 0 ||
       email.length == 0 || email2.length == 0 || birth1 === "null" || birth1 === "" ||
       birth2 === "null" || birth2 === "" || birth3 === "null" || birth3 === "" || tel.length == 0){
  alert('모든 필드를 입력해야 합니다.');
  return false;	
// 오류 메세지 뜨지 않은 상태인지 확인
  } else if ($('.message').filter(function() {
      return $(this).css('display') == 'block';
  }).length > 0) {
      alert('모든 필드를 올바르게 입력해야 합니다.');
      return false;  
 }
  document.users.submit();
}


/* 닉네임 유효성 검사 (input 값 입력하면 자동 실행) */
function validateId() {
/*alert('test');*/
  let id = document.getElementById('id').value;
  let regexId = /^[0-9a-zA-Z가-힣ㄱ-ㅎ]+$/;
  
  if(id.length !== 0){
  // ID 길이 검사
    if (id.length < 4 || id.length > 15) {
        $('#message_id3').css('display', 'block');
        $('#message_id2').css('display', 'none');
    } else if (!regexId.test(id)) {
        // ID 문자 유형 검사
        $('#message_id2').css('display', 'block');
        $('#message_id3').css('display', 'none');
    } else {
        // 조건을 만족하면 오류 메시지 숨기기
        $('#message_id2').css('display', 'none');
        $('#message_id3').css('display', 'none');
    }
    //값이 없으면 메세지 숨기기
}else{
  $('#message_id2').css('display', 'none');
    $('#message_id3').css('display', 'none');
}
}

/* 비밀번호 유효성 검사 (input 값 입력하면 자동 실행) */
function validatePw() {
/* alert('test');*/ 
  let pw1 = document.getElementById('pw').value;
  let regexPw1 = /[0-9]+/;      //숫자
let regexPw2 = /[a-zA-Z]+/;   //영문자
let regexPw3 = /[~!@#$%^&*()_+|]+/; //특수문자
  
  if(pw1.length !== 0){
  // ID 길이 검사
    if(pw1.length < 8 || pw1.length > 15 || !regexPw1.test(pw1) ||
      !regexPw2.test(pw1) || !regexPw3.test(pw1)){
    $('#message_pw1').css('display', 'block');
    return false;
    } else {
        // 조건을 만족하면 오류 메시지 숨기기
        $('#message_pw1').css('display', 'none');
    }
    //값이 없으면 메세지 숨기기
}else{
  $('#message_pw1').css('display', 'none');
}
}

/* 비밀번호 확인 (input 값 입력하면 자동 실행) */
function checkPw() {
 /*alert('test');*/
let pw1 = document.getElementById('pw').value;
let pw2 = document.getElementById('pw2').value;
  
  if(pw2.length !== 0){
  // ID 길이 검사
    if(pw1 != pw2){
    $('#message_pw2').css('display', 'block');
    } else {
        // 조건을 만족하면 오류 메시지 숨기기
        $('#message_pw2').css('display', 'none');
    }
    //값이 없으면 메세지 숨기기
}else{
  $('#message_pw2').css('display', 'none');
}
}

/* 전화번호 유효성 검사 (input 값 입력하면 자동 실행) */
function validateTel() {
/* alert('test'); */
let tel = document.getElementById('tel').value;

let regexTel = /^[0-9]+$/; //숫자
  
  if(tel.length !== 0){
  // ID 길이 검사
    if(!regexTel.test(tel)){
    $('#message_tel').css('display', 'block');
    } else {
        // 조건을 만족하면 오류 메시지 숨기기
        $('#message_tel').css('display', 'none');
    }
    //값이 없으면 메세지 숨기기
}else{
  $('#message_tel').css('display', 'none');
}
}