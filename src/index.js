// import "es6-promise/auto";
// import "fetch-polyfill";

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

import './style.scss';


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

// var sec = $('.swiper-container');
const sec = $('.swiper-slide');
const nvp = sec.outerHeight() + sec.offset().top;

$(window).scroll(function () {
  console.log(`----scroll--------------------`);
  var distanceTop = $(document).scrollTop();
  if (distanceTop > nvp) {
    console.log(`----distanceTop > nvp--------------------`);
    
    $header.show().addClass("scroll")
  }
  if (distanceTop < nvp) {
    console.log(`----distanceTop < nvp--------------------`);

    $header.removeClass("scroll").hide()
  }
});

$('.js-anchor').click(function(e) {
  e.preventDefault();
  let href = $(this).attr("href")
  console.log(`----clicked: ${href}--------------------`);
  
  $(href).delay(200).velocity("scroll", {
    duration: 600, easing: "easeInOutQuart"
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


const BOX_ID = 'box_efaacfeddbbd64bb47f3';
async function fetch() {
  const jbn = new JsonBox();
  // const get = await jbn.create({
  //   start: "2019.12.7", term: "1", at:"いつもの場所"
  // }, BOX_ID, 'date');
  // console.log(get);

  // await jbn.update({ start: "2019.12.7", term: "8", at:"いつもの場所" }, BOX_ID, '5e21b50fcd442f0017cd446d');
  // await jbn.delete(BOX_ID, '5e21b50fcd442f0017cd446d')
  const data = await jbn.read(BOX_ID);
  const startDay = moment(data[0].start, "YYYY.MM.DD")
  const clone = moment(startDay)

  $('#start').text(escape_html(startDay.format('YYYY.MM.D')))
  $('#start_day').text(escape_html(startDay.format('ddd').toUpperCase()))

  const lastDay = startDay.add(data[0].term, 'days')
  if(lastDay.format('YYYY.MM.D') == clone.format('YYYY.MM.D')) {
    $('#end').text("")
    $('#end_day').text("")
  } else {
    $('#end').text(escape_html(lastDay.format('D')))
    $('#end_day').text(lastDay.format('ddd').toUpperCase())
  }
  $('#at').text(escape_html(data[0].at))
  setWidth(data[0].width)
  $(window).resize(function() {
    setWidth(data[0].width)
  });
}

$(document).ready(function(){
  fetch()
});
function setWidth(width) {
  if(window.innerWidth < 800) {
    $('.hero-date').css('width', width + 'rem')
  } else {
    $('.hero-date').css('width', 'auto')
  }
}

function escape_html(string) {
  if(typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, (match) => {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}