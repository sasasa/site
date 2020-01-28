import $ from 'jquery';
import Velocity from 'velocity-animate'
import '@babel/polyfill';
import { JsonBox } from 'jsonbox-node'
import moment from 'moment'
import "bootstrap";
import xxhash from "xxhash-wasm";

import { escape_html, BOX_ID, JBN_ID } from './module/util'

import "./lib/bootstrap-datetimepicker.min.js"
import './input.scss'


let pass = ""
async function fetch() {
  const jbn = new JsonBox();
  // const get = await jbn.create({
  //   start: "2019.12.7", term: "1", at:"いつもの場所"
  // }, BOX_ID, 'date');
  // console.log(get);

  // await jbn.update({ start: "2019.12.7", term: "8", at:"いつもの場所" }, BOX_ID, JBN_ID);
  // await jbn.delete(BOX_ID, JBN_ID)


  const data = await jbn.read(BOX_ID);
  $('#start').val(escape_html(data[0].start))
  $('#term').val(escape_html(data[0].term))
  $('#at').val(escape_html(data[0].at))
  $('#width').val(escape_html(data[0].width))
  $('#event_name').val(escape_html(data[0].event_name))
  $('#venue').val(escape_html(data[0].venue))
  $('#time').val(escape_html(data[0].time))
  $('#fee').val(escape_html(data[0].fee))
  $('#hashtag').val(escape_html(data[0].hashtag))
  $('#fee_item1').val(escape_html(data[0].fee_item1))
  $('#fee1').val(escape_html(data[0].fee1))
  $('#fee_item2').val(escape_html(data[0].fee_item2))
  $('#fee2').val(escape_html(data[0].fee2))
  $('#fee_item3').val(escape_html(data[0].fee_item3))
  $('#fee3').val(escape_html(data[0].fee3))
  $('#fee_item4').val(escape_html(data[0].fee_item4))
  $('#fee4').val(escape_html(data[0].fee4))

  pass = data[0].password

  const startDay = moment(data[0].start, "YYYY.MM.DD")
  console.log(startDay.format('YYYY.MM.D'));
  console.log(startDay.format('ddd').toUpperCase());
  const lastDay = startDay.add(data[0].term - 1, 'days')
  console.log(lastDay.format('D'));
  console.log(lastDay.format('ddd').toUpperCase());
  console.log(data[0].at);
  console.log(data[0].width);
}

$('.alert').hide()
fetch();

function validate() {
  $('.alert').hide()

  const startMessage = /^\d{4}\.\d{1,2}\.\d{1,2}$/.test($('#start').val());
  if(!startMessage) {
    $('#error-date .errorMes').text("開始日はxxxx.x.xの形式で入力してください")
    $('#error-date').show(600)
    $('#error-date').velocity("scroll", {
      duration: 100, easing: "easeInOutQuart"
    });
  }
  const termMessage = $('#term').val() > 0
  if(!termMessage) {
    $('#error-date .errorMes').text("期間は1以上にしてください。")
    $('#error-date').show(600)
    $('#error-date').velocity("scroll", {
      duration: 100, easing: "easeInOutQuart"
    });
  }

  const termfeeItem1 = $('#fee_item1').val().length > 16
  if(!termfeeItem1) {
    $('#error-fee .errorMes').text("料金項目1は16文字以下にしてください")
    $('#error-fee').show(600)
    $('#error-fee').velocity("scroll", {
      duration: 100, easing: "easeInOutQuart"
    });
  }
  const termfeeItem2 = $('#fee_item2').val().length > 16
  if(!termfeeItem2) {
    $('#error-fee .errorMes').text("料金項目2は16文字以下にしてください")
    $('#error-fee').show(600)
    $('#error-fee').velocity("scroll", {
      duration: 100, easing: "easeInOutQuart"
    });
  }
  const termfeeItem3 = $('#fee_item3').val().length > 16
  if(!termfeeItem3) {
    $('#error-fee .errorMes').text("料金項目3は16文字以下にしてください")
    $('#error-fee').show(600)
    $('#error-fee').velocity("scroll", {
      duration: 100, easing: "easeInOutQuart"
    });
  }
  const termfeeItem4 = $('#fee_item4').val().length > 16
  if(!termfeeItem4) {
    $('#error-fee .errorMes').text("料金項目4は16文字以下にしてください")
    $('#error-fee').show(600)
    $('#error-fee').velocity("scroll", {
      duration: 100, easing: "easeInOutQuart"
    });
  }
  return startMessage && termMessage && termfeeItem1 && termfeeItem2 && termfeeItem3 && termfeeItem4
}



async function patch() {
  const { h64 } = await xxhash();

  const jbn = new JsonBox();
  const update = await jbn.update({ 
    start: $('#start').val(), 
    term: $('#term').val(), 
    at: $('#at').val(),
    width: $('#width').val(),
    event_name: $('#event_name').val(),
    venue: $('#venue').val(),
    time: $('#time').val(),
    fee: $('#fee').val(),
    hashtag: $('#hashtag').val(),
    fee_item1: $('#fee_item1').val(),
    fee1: $('#fee1').val(),
    fee_item2: $('#fee_item2').val(),
    fee2: $('#fee2').val(),
    fee_item3: $('#fee_item3').val(),
    fee3: $('#fee3').val(),
    fee_item4: $('#fee_item4').val(),
    fee4: $('#fee4').val(),
    password: pass,
  }, BOX_ID, JBN_ID);
}

const execute = async (id, mess, btn) => {
  $(btn).prop("disabled", true)
  if(validate()) {
    await patch()
    $('.alert-danger').hide()
    $(`${id} .successMes`).text(mess)
    $(id).show(600)
    $(id).velocity("scroll", {
      duration: 100, easing: "easeInOutQuart"
    });
  }
  $(btn).prop("disabled", false)
}

$('#update_btn').click(async function() {
  await execute('#alert-date', "日付入力更新しました。", this)
})
$('#event_btn').click(async function() {
  await execute('#alert-event', "イベント入力更新しました。", this)
})
$('#fee_btn').click(async function() {
  await execute('#alert-fee', "料金表入力更新しました。", this)
})


$('#password_btn').click(async () => {
  const { h64 } = await xxhash()
  if(h64($('#pass').val()) == pass) {
    $('#password_panel').slideUp(600)
  }
})



$('.datetimepicker').datetimepicker({
  dayViewHeaderFormat: 'YYYY年 MMMM',
  tooltips: {
      close: '閉じる',
      selectMonth: '月を選択',
      prevMonth: '前月',
      nextMonth: '次月',
      selectYear: '年を選択',
      prevYear: '前年',
      nextYear: '次年',
      selectTime: '時間を選択',
      selectDate: '日付を選択',
      prevDecade: '前期間',
      nextDecade: '次期間',
      selectDecade: '期間を選択',
      prevCentury: '前世紀',
      nextCentury: '次世紀'
  },
  format: 'YYYY.MM.DD',
  locale: 'ja',
  showClose: true
});