import "es6-promise/auto";
import "fetch-polyfill";
// import $ from 'jquery';
import Swiper from 'swiper';
import './reset.scss';
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
window.cancelAnimationFrame(loading.requestID);












let mySwiper = new Swiper('.swiper-container', {
  loop: true,
  speed: 1600,
  simulateTouch: false,
  effect: 'fade',
  autoplay:{
    delay:2800,
    disableOnInteraction: false
  }
})
// $('h1').text("Jquery")