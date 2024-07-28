// 국내 여행 - 메인 페이지 JAVASCRIPT

// 1. 지역 선택 - 드롭다운
// 강원도
function dropdown() {
  var v = document.querySelector('.dropdown-content');
  var dropbtn = document.querySelector('.dropbtn')
  v.classList.toggle('show');
  dropbtn.style.borderColor = 'rgb(94, 94, 94)';
}
// 경기도
function dropdown2() {
  var v = document.querySelector('#dropdown-content2');
  var dropbtn = document.querySelector('#dropbtn2')
  v.classList.toggle('show');
  dropbtn.style.borderColor = 'rgb(94, 94, 94)';
}
// 충청남도
function dropdown3() {
  var v = document.querySelector('#dropdown-content3');
  var dropbtn = document.querySelector('#dropbtn3')
  v.classList.toggle('show');
  dropbtn.style.borderColor = 'rgb(94, 94, 94)';
}
// 충청북도
function dropdown4() {
  var v = document.querySelector('#dropdown-content4');
  var dropbtn = document.querySelector('#dropbtn4')
  v.classList.toggle('show');
  dropbtn.style.borderColor = 'rgb(94, 94, 94)';
}
// 전라남도
function dropdown5() {
  var v = document.querySelector('#dropdown-content5');
  var dropbtn = document.querySelector('#dropbtn5')
  v.classList.toggle('show');
  dropbtn.style.borderColor = 'rgb(94, 94, 94)';
}
// 전라북도
function dropdown6() {
  var v = document.querySelector('#dropdown-content6');
  var dropbtn = document.querySelector('#dropbtn6')
  v.classList.toggle('show');
  dropbtn.style.borderColor = 'rgb(94, 94, 94)';
}
// 경상남도
function dropdown7() {
  var v = document.querySelector('#dropdown-content7');
  var dropbtn = document.querySelector('#dropbtn7')
  v.classList.toggle('show');
  dropbtn.style.borderColor = 'rgb(94, 94, 94)';
}
// 경상북도
function dropdown8() {
  var v = document.querySelector('#dropdown-content8');
  var dropbtn = document.querySelector('#dropbtn8')
  v.classList.toggle('show');
  dropbtn.style.borderColor = 'rgb(94, 94, 94)';
}




// 2. 요즘 인기 있는 지역 - 롤링 배너
// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const roller = document.querySelector('.roller');
  const ul = roller.querySelector('ul');
  const lis = ul.querySelectorAll('li');

  // 모든 슬라이드를 두 번 복제하여 무한 루프를 위한 공간을 확보
  const cloneCount = lis.length;
  for (let i = 0; i < cloneCount; i++) {
      const clone = lis[i].cloneNode(true);
      ul.appendChild(clone);
  }

  ul.style.width = `${lis.length * 2 * 100}%`; // 두 배로 늘어난 슬라이드의 너비 설정
});




// 3. 다가오는 행사 및 전시회 - 달력 
var dragging = false;
var days = document.querySelectorAll('.day');

function clearActiveDays() {
  var activeAItem = document.querySelector('.active-a');
  var activeBItem = document.querySelector('.active-b');

  if (activeAItem) activeAItem.classList.remove('active-a');
  if (activeBItem) activeBItem.classList.remove('active-b');
}

function clearRange() {
  days.forEach(item => {
    item.classList.remove('range');
  });
}

function startMove(item) {
  dragging = true;

  clearActiveDays();
  clearRange();

  var activeAItem = document.querySelector('.active-a');
  var activeBItem = document.querySelector('.active-b');

  if (!activeBItem && activeAItem) {
    item.classList.add('active-b');
  } else {
    item.classList.add('active-a');
  }
}

function move(item) {
  if (dragging) {
    var activeA = document.querySelector('.active-a');
    var prevActiveB = document.querySelector('.active-b');

    clearRange();

    if (prevActiveB) prevActiveB.classList.remove('active-b');
    if (!item.classList.contains('active-a')) item.classList.add('active-b');

    var activeB = document.querySelector('.active-b');
  }
}

function endMove(item) {
  dragging = false;
}

days.forEach((item, index) => {
  var dayNumber = item.querySelector('.day-number').innerHTML;

  item.addEventListener('mousedown', e => {
    startMove(item);
    document.querySelector('.slider_wrap').style.display = "block";
    document.querySelector('.daypick').style.display = "none";
  });

  item.addEventListener('mousemove', e => {
    move(item);
  });

  item.addEventListener('mouseup', e => {
    endMove(item);
  });
});

document.addEventListener('mouseup', e => {
  dragging = false;
});




// 4. 다가오는 행사 및 전시회 - 슬라이드
const sliderImg = document.querySelector(".slider_img");        // 보여지는 영역
const sliderInner = document.querySelector(".slider_inner");    // 움직이는 영역
const slider = document.querySelectorAll(".slider");            // 이미지

let currentIndex = 0;                      // 현재 이미지
let sliderCount = 7;                       // 이미지 갯수
let sliderWidth = 600;   // 이미지 가로값

function gotoSlider(num) {
  sliderInner.style.transition = "all 400ms";
  sliderInner.style.transform = "translateX(" + -sliderWidth * num + "px)";
  currentIndex = num;
}

document.querySelectorAll(".slider_btn button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // 이미지 총 갯수에서 하나를 뺀 값을 currentIndex에 더하고 
    // 다시 이미지 총 갯수로 나눠 prevIndex 값을 설정
    let prevIndex = (currentIndex + (sliderCount - 1)) % sliderCount;
    // currentIndex 값에 1을 더한 값을 이미지 갯수로 나누어 
    // nextIndex 값을 설정한 후, 그 값을 움직이는 영역에 대입시켜 넘어가도록 설정
    let nextIndex = (currentIndex + 1) % sliderCount;

    if (btn.classList.contains("prev")) {
      currentIndex = prevIndex;
    } else {
      currentIndex = nextIndex;
    }

    gotoSlider(currentIndex);
  });
});