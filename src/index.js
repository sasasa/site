// import 'intersection-observer';

// import '@babel/polyfill';
import $ from 'jquery';

import Swiper from 'swiper';
import imagesLoaded from 'imagesLoaded';
imagesLoaded.makeJQueryPlugin($);

import Velocity from 'velocity-animate'

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/brands';

import './style.scss'

import mov from './img/movie-01.mp4';
// const vidtag = document.getElementById('bg-video');
// import objectFitImages from 'object-fit-images'

// import 'objectFitPolyfill'

(function() {
  const requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
(function() {
  const cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozcancelAnimationFrame ||
    window.webkitcancelAnimationFrame ||
    window.mscancelAnimationFrame;
  window.cancelAnimationFrame = cancelAnimationFrame;
})();


let loading = [];
loading.startLoader = function() {
  const dotsList = document.querySelectorAll('.box-loader .dot');
  const loaderLength = dotsList.length;
  let index = 0,
      // マイクロ秒までの精度を持った浮動小数点の値
      // https://developer.mozilla.org/ja/docs/Web/API/Performance/now
      lastTime = performance.now(),
      currentTime,
      elapsedTime;

  function moveDots() {
    // 一回前のカラーを外す
    if(index !== 0){
      dotsList[index - 1].classList.remove('is-colored');
    } else {
      dotsList[loaderLength - 1].classList.remove('is-colored');
    }
    // カラーをつける
    dotsList[index].classList.add('is-colored');

    if(index >= loaderLength - 1){
      index = 0;
    } else {
      index++;
    }
  }
  moveDots();

  function dotsLoop() {
    // ブラウザの描画更新単位と同じ単位で呼び出される
    // 次の再描画が行われる前に次のアニメーションをする関数を呼び出す
    // タブが非アクティブの時はFPSを落とす
    // https://liginc.co.jp/web/js/130758
    loading.requestID = window.requestAnimationFrame(dotsLoop);

    currentTime = performance.now();
    elapsedTime = currentTime - lastTime;

    if(elapsedTime > 600){
      moveDots();
      lastTime = currentTime;
    }
  }
  dotsLoop();
}
loading.startLoader();

$('.swiper-wrapper').imagesLoaded({ background: true }, () => {
  $('.loading .box-loader').delay(200).velocity({
    opacity: 0
  },{
    duration: 2800,
    easing: 'easeInOutQuad',
    begin() {
              $('.loading').delay(400).velocity('fadeOut', {
                duration: 2400,
                easing: 'easeInOutQuad',
                begin() {
                  $('body, html').scrollTop(0);
                  initSwiper()
                },
                complete() {
                  window.cancelAnimationFrame(loading.requestID);
                  $('.loading').remove()
                  slideAnime()
                  GlowAnimeControl()
                }
            });
    }
  })
});

const $header = $('#header');
$header.hide();

$('.js-anchor').click(function(e) {
  e.preventDefault();
  let href = $(this).attr("href")

  $(href).delay(100).velocity("scroll", {
    duration: 500,
    easing: "easeInOutQuart",
    complete() {
      document.querySelector('html').classList.remove('open')
    }
  });

  return false;
});


function initSwiper(){
  let mySwiper = new Swiper('.hero-slider', {
    loop: true,
    speed: 1600,
    simulateTouch: false,
    effect: 'fade',
    autoplay:{
      delay:2800,
      disableOnInteraction: false
    }
  })

  let facilitySwiper = new Swiper('.facility-slider', {
    loop: true,
    slidesPerView: 5,

    speed: 600,
    spaceBetween: 36,
    centeredSlides: true,
    breakpoints: {
      // when window width is <= 800px
      800: {
        spaceBetween: 20
      },
    },
    autoplay:{
      delay:2000,
      reverseDirection: true,
      disableOnInteraction: false
    }
  })
}



function fetch() {
  let isRunning = false
  $(window).resize((e) => {
    // 呼び出されるまで何もしない
    if (!isRunning) {
      isRunning = true

      // 描画する前のタイミングで呼び出してもらう
      window.requestAnimationFrame(() => {
        // setWidth(data[0].width)
        setFullHeight()
        isRunning = false
      })
    }
  });
}

function fadeAnime(){
  $('.fadeLeftTrigger').each(function(){
    var elemPos = $(this).offset().top-50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
      $(this).addClass('fadeLeft');
    }else{
      $(this).removeClass('fadeLeft');
    }
  });
  $('.zoomOutTrigger').each(function(){
    var elemPos = $(this).offset().top-50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
      $(this).addClass('zoomOut');
    }else{
      $(this).removeClass('zoomOut');
    }
  });
}

$(window).scroll(function (){
  fadeAnime()

  var elemPos = $('#instructor .photo').offset().top+200;
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height()
  var pos = scroll - elemPos + windowHeight
  // console.log(pos)
  if (pos > 0 && $(window).width() > 800) {
    $('#instructor .photo').css({
      backgroundSize: 'auto ' + (100 + pos/10)+'%',
      backgroundPosition: '50% ' + pos/40  + "%",
    })
  }
})

$(document).ready(function() {
  var element = $(".glowAnime");
  element.each(function () {
    var text = $(this).text()
    var textbox = ""
    text.split('').forEach(function (t, i) {
      if (t !== " ") {
        if (i < 10) {
          textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>'
        } else {
          var n = i / 10
          textbox += '<span style="animation-delay:' + n + 's;">' + t + '</span>'
        }
      } else {
        textbox += t
      }
    })
    $(this).html(textbox)
  })


  setFullHeight()
  fetch()
  fadeAnime()

  $('.nav-button').click(() => {
    document.querySelector('html').classList.toggle('open')
  })

  const elements = document.querySelectorAll('.fit');
  objectFitPolyfill(elements);

  $('.imgbox .mask').click(function() {
    var imgSrc = $(this).children().attr('src');
    $('.bigimg').children().attr('src', imgSrc);
    $('.modal').fadeIn();

    var ua = navigator.userAgent;
    if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) {
      // スマートフォン用処理
      $('body,html').css('overflow-y', 'hidden');
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
      // タブレット用処理
      $('body,html').css('overflow-y', 'hidden');
    } else {
      // PC用処理
      $('body,html').css('overflow-y', 'scroll');
    }
    return false
  });

  $('.close-btn, .modal').click(function() {
    $('.modal').fadeOut();
    $('body,html').css('overflow-y', 'visible');
    return false
  });
});

function GlowAnimeControl() {
  $('.glowAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("glow");
    } else {
      $(this).removeClass("glow");
    }
  });
}


function setFullHeight() {
  var hSize = $(window).height();
  $('.hero-slider').height(hSize);
}
function setWidth(width) {
  if(window.innerWidth < 800) {
    $('.hero-date').css('width', width + 'rem')
  } else {
    $('.hero-date').css('width', 'auto')
  }
}
function slideAnime() {
  $('.leftAnime').each(function(){
    var elemPos = $(this).offset().top-50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("slideAnimeLeftRight")
      $(this).children(".leftAnimeInner").addClass("slideAnimeRightLeft")
    } else {
      $(this).removeClass("slideAnimeLeftRight");
      $(this).children(".leftAnimeInner").removeClass("slideAnimeRightLeft")
    }
  });
}


let element = document.getElementById('hero')
let observer = new IntersectionObserver(callback); // IntersectionObserverのインスタンスを生成
observer.observe(element)
function callback(entries, observer) {
  for (const entry of entries) {
    let element = entry.target;
    if(entry.isIntersecting) {
      // ヒーローイメージが表示されているとき
      $header.removeClass("scrolled")
    } else {
       // ヒーローイメージが表示されていないとき
      $header.show().addClass("scrolled")
    }
  }
}