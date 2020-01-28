// import "es6-promise/auto";
// import "fetch-polyfill";
import 'intersection-observer';

import '@babel/polyfill';
import { JsonBox } from 'jsonbox-node'
import moment from 'moment'
import $ from 'jquery';

import Swiper from 'swiper';
import imagesLoaded from 'imagesLoaded';
imagesLoaded.makeJQueryPlugin($);

import Velocity from 'velocity-animate'

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/brands';

import { escape_html, BOX_ID, changeBlank } from './module/util'

import './style.scss'

import mov from './img/movie-01.mp4';
// const vidtag = document.getElementById('bg-video');
// vidtag.src = mov;

import objectFitImages from 'object-fit-images'
if(!document.currentScript) {
  objectFitImages()//IE only
}

import 'objectFitPolyfill'
const elements = document.querySelectorAll('.fit');
objectFitPolyfill(elements);




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
                }
            });
    }
  })
});


const $header = $('#header'); 
$header.hide();

// const sec = $('.swiper-slide');
// const nvp = sec.outerHeight() + sec.offset().top;
// $(window).scroll(function () {
//   var distanceTop = $(document).scrollTop();
//   if (distanceTop > nvp) {
//     $header.show().addClass("scroll")
//   }
//   if (distanceTop < nvp) {
//     $header.removeClass("scroll").hide()
//   }
// });

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
  // document.querySelector(href).scrollIntoView({
  //   behavior: "smooth",
  //   block: "start"
  // });
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



async function fetch() {
  const jbn = new JsonBox();
  const data = await jbn.read(BOX_ID);
  moment.locale("ja", {
    weekdays: ["日", "月", "火", "水", "木", "金", "土"],//dddd
    // weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"]//ddd
  })
  const startDay = moment(data[0].start, "YYYY.MM.DD")
  const clone = moment(startDay)

  $('#start').text(escape_html(startDay.format('YYYY.MM.D')))
  $('#start_day').text(escape_html(startDay.format('ddd').toUpperCase()))

  const lastDay = startDay.add(data[0].term - 1, 'days')
  if(lastDay.format('YYYY.MM.D') == clone.format('YYYY.MM.D')) {
    $('#end').text("")
    $('#end_day').text("")
  } else {
    $('#end').text(escape_html(lastDay.format('D')))
    $('#end_day').text(lastDay.format('ddd').toUpperCase())
  }
  $('#at').text(escape_html(data[0].at))

  if(lastDay.format('YYYY.MM.D') == clone.format('YYYY.MM.D')) {
    $('.date').text(escape_html(clone.format('YYYY年MM月DD日(dddd)')))
  } else {
    $('.date').text(
      escape_html(clone.format('YYYY年MM月DD日(dddd)')) +
      '～' +
      escape_html(lastDay.format('MM月DD日(dddd)'))
    )
  }
  $('.event_name').text(escape_html(changeBlank(data[0].event_name)))
  
  $('.venue').text(escape_html(changeBlank(data[0].venue)))
  $('.time').text(escape_html(changeBlank(data[0].time)))
  $('.fee').text(escape_html(changeBlank(data[0].fee)))
  $('.hashtag').text(escape_html(changeBlank(data[0].hashtag)))

  if(data[0].fee_item1) {
    $('#price-table').append(`<dt>${escape_html(changeBlank(data[0].fee_item1))}</dt>`);
    $('#price-table').append(`<dd>${escape_html(changeBlank(data[0].fee1))}</dd>`);
  }
  if(data[0].fee_item2) {
    $('#price-table').append(`<dt>${escape_html(changeBlank(data[0].fee_item2))}</dt>`);
    $('#price-table').append(`<dd>${escape_html(changeBlank(data[0].fee2))}</dd>`);
  }
  if(data[0].fee_item3) {
    $('#price-table').append(`<dt>${escape_html(changeBlank(data[0].fee_item3))}</dt>`);
    $('#price-table').append(`<dd>${escape_html(changeBlank(data[0].fee3))}</dd>`);
  }
  if(data[0].fee_item4) {
    $('#price-table').append(`<dt>${escape_html(changeBlank(data[0].fee_item4))}</dt>`);
    $('#price-table').append(`<dd>${escape_html(changeBlank(data[0].fee4))}</dd>`);
  }
  

  setWidth(data[0].width)
  $(window).resize(function() {
    setWidth(data[0].width)
    setFullHeight()
  });
}

$(document).ready(function(){
  setFullHeight()
  fetch()
  $('.nav-button').click(() => {
    document.querySelector('html').classList.toggle('open')
  })
});

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



let element = document.getElementById('hero')
let observer = new IntersectionObserver(callback); // IntersectionObserverのインスタンスを生成
observer.observe(element)
function callback(entries, observer) {
  for (const entry of entries) {
    let element = entry.target;
    if(entry.isIntersecting) {
      // ヒーローイメージが表示されているとき
      // $header.removeClass("scrolled").hide()
      $header.removeClass("scrolled")//.hide()
    } else {
       // ヒーローイメージが表示されていないとき
      $header.show().addClass("scrolled")
    }
  }
}