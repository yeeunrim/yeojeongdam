/* header의 메뉴 클릭 시, bottomMenu(회색배경, 하위카테고리) 나옴 */
$(document).ready(function() {
  // 메인 메뉴 항목에 마우스 오버 이벤트 추가
  $('#mainMenu ul li').mouseenter(function() {
      // 하위 메뉴 및 bottomMenu 보이기
      $(this).find('.test').css('display', 'block');
      $('#bottomMenu').css('display', 'block');

      // 배경색 변경
      $('#mainMenu, #sideMenu, #bottomMenu, #sideMenuIcon').css('background-color', 'rgba(255, 255, 255, 1)');
  }).mouseleave(function() {
      // 마우스가 벗어나면 하위 메뉴 및 bottomMenu 숨기기
      $(this).find('.test').css('display', 'none');
      $('#bottomMenu').css('display', 'none');

      // 배경색을 원래 상태로 복원 (원래 배경색에 맞게 조정 필요)
      $('#mainMenu, #sideMenu, #bottomMenu, #sideMenuIcon').css('background-color', ''); // 기본값 또는 원래 색상으로 변경
  });
});

/* 스크롤 40px기준으로, 상단문구 숨김 및 상단 메뉴 위치 조정  */
let lastScrollTop = 0;
const scrollThreshold = 40; // 스크롤이 이 값 이상으로 변화했을 때 동작을 변경하는 기준점

$(window).on('scroll', function() {
  let currentScroll = $(this).scrollTop();
  let welcomeHeight = $('#welcome').outerHeight();
  let topMenuHeight = $('#welcome').outerHeight()+$('#topMenu').outerHeight();

  if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) { /* 현재스크롤 > 0 && 현재 스크롤 > 40*/
      // 아래로 40px 이상 스크롤
      $('#welcome').css('transform', 'translateY(-' + welcomeHeight + 'px)'); /* 상단 문구 height만큼 올라가면서 올라가는 모션을 주면서 숨겨짐 */
      $('#topMenu').css('top', '0');
      $('#bottomMenu').css('top', $('#topMenu').outerHeight() + 'px'); // topMenu 바로 아래에 bottomMenu 위치
  } else if (currentScroll < lastScrollTop && currentScroll < scrollThreshold) {
      // 위로 40px 이상 스크롤
      $('#welcome').css('transform', '');
      $('#topMenu').css('top', welcomeHeight + 'px');
      $('#bottomMenu').css('top', topMenuHeight + 'px'); // 원래 위치로 되돌리기
  }
  lastScrollTop = currentScroll; // 스크롤 위치 업데이트
});

/* 780px이하 모바일 기준 header 메뉴 */
document.addEventListener("DOMContentLoaded", function() {
  var sideMenuIcon = document.getElementById('sideMenuIcon');
  var mainMenu = document.getElementById('mainMenu');
  var sideMenu = document.getElementById('sideMenu');
  var topMenu = document.getElementById('topMenu'); // topMenu 요소 추가

  function adjustMenuDisplay() {
      if (window.innerWidth > 780) {
          // 781px 이상일 경우
          mainMenu.style.display = 'block'; 
          sideMenu.style.display = 'block';
          sideMenuIcon.style.display = 'none';
          topMenu.style.flexDirection = 'row';  /* row-reverse에서 원상복구 */
      } else {
          // 780px 이하일 경우
          sideMenuIcon.style.display = 'flex';
          sideMenu.style.display = 'none';
      }
  }
  sideMenuIcon.onclick = function() {
      if (mainMenu.style.display === 'none') {
          mainMenu.style.display = 'block';
          sideMenu.style.display = 'none';
          topMenu.style.flexDirection = 'row';
      } else {
          mainMenu.style.display = 'none';
          sideMenu.style.display = 'block';
          topMenu.style.flexDirection = 'row-reverse'; /* 'sideMenu -> 메뉴아이콘' 순서로 정렬되도록 반대정렬시켜줌 (원래 순서는 '메뉴아이콘 -> sideMenu') */
      }
  };

  window.addEventListener('resize', adjustMenuDisplay); // 창 크기 변경 감지

  adjustMenuDisplay(); // 초기 로드 시 메뉴 조정
});

/* 메인이미지 슬라이드 */
$(document).ready(function() {
  var images = ['/images/main_image01.png', '/images/main_image02.png', '/images/main_image03.png'];
  var currentIndex = 0;
  var imageInterval;

   function changeImage(index) {
   // Dot 업데이트
    updateDots(index);
   
      var $currentImg = $('#main_img .img_current');
      var $nextImg = $('#main_img .img_next');

      // 다음 이미지 설정 및 투명도 초기화
      $nextImg.attr('src', images[index]).css('opacity', 0.02).show();

      // 현재 이미지 투명도 감소 및 다음 이미지 투명도 증가
      $currentImg.animate({ opacity: 0.2 }, 500);
      $nextImg.animate({ opacity: 1 }, 500, function() {
          // 현재 이미지 소스 변경 및 투명도 재설정
          $currentImg.attr('src', images[index]).css('opacity', 1);
          
          // 인덱스 업데이트
          currentIndex = index;
      });
  }

  function updateDots(index) {
      // 모든 dots에서 dot_active 클래스 제거
      $('#dots div').removeClass('dot_active').addClass('dot');

      // 현재 인덱스의 dot에 dot_active 클래스 추가
      $('#dots div').eq(index).removeClass('dot').addClass('dot_active');
  }

  // Dot 클릭 이벤트 핸들러
  $('#dots div').click(function() {
      var index = $(this).index(); // 클릭된 dot의 인덱스
      currentIndex = index;
      changeImage(index);
      restartInterval();
  });

  // 이미지 자동 변경 함수
  function startInterval() {
      imageInterval = setInterval(function() {
          currentIndex = (currentIndex + 1) % images.length;
          changeImage(currentIndex);
      }, 5000); // 5초 간격
  }

  // 인터벌 재시작 함수
  function restartInterval() {
      clearInterval(imageInterval);
      startInterval();
  }

  // 이미지 자동 변경 시작
  startInterval();
});

/* 여행지사진 슬라이드 : 사진 1장씩 슬라이드 */
$(document).ready(function() {
  var $mainPictures = $('#main_pictures');
  var $divs = $mainPictures.children('div');
  var divWidth = $divs.first().outerWidth(true);
  var totalWidth = divWidth * $divs.length;

  // 무한 루프를 위해 div 요소들을 복제하고 main_pictures에 추가
  $divs.clone().appendTo($mainPictures);

  // div들을 슬라이드하는 함수
  function slideDivs() {
      $mainPictures.animate({
          scrollLeft: '+=' + divWidth
      }, 1000, function() {
          // 첫 번째 세트의 div들의 끝에 도달했는지 확인
          if ($mainPictures.scrollLeft() >= totalWidth) {
              $mainPictures.scrollLeft(0);
          }
      });
  }

  // 슬라이드를 위한 인터벌 설정
  var slideInterval = setInterval(slideDivs, 3000);

});