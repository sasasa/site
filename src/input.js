import $ from 'jquery';
import '@babel/polyfill';
import { JsonBox } from 'jsonbox-node'
import moment from 'moment'
import "bootstrap";
import { escape_html, BOX_ID, JBN_ID } from './module/util'

import "./lib/bootstrap-datetimepicker.min.js"
import './input.scss'


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
    $('.errorMes').text("開始日はxxxx.x.xの形式で入力してください")
    $('.alert-danger').show(600)
  }
  const termMessage = $('#term').val() > 0
  if(!termMessage) {
    $('.errorMes').text("期間は1以上にしてください。")
    $('.alert-danger').show(600)
  }
  return startMessage && termMessage
}
async function patch() {
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
  }, BOX_ID, JBN_ID);
}

$('#update_btn').click(async () => {
  if(validate()) {
    await patch()
    $('.alert-danger').hide()
    $('.successMes').text("日付入力更新しました。")
    $('.alert-success').show()
  }
})
$('#event_btn').click(async () => {
  if(validate()) {
    await patch()
    $('.alert-danger').hide()
    $('.successMes').text("イベント入力更新しました。")
    $('.alert-success').show()
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