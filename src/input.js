import '@babel/polyfill';
import { JsonBox } from 'jsonbox-node'
import moment from 'moment'
import "bootstrap";
import { escape_html } from './util'

import './input.scss'

// window.onload = function() {
//   alert('hogehoge')
// }

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
  const lastDay = startDay.add(data[0].term, 'days')
  console.log(lastDay.format('D'));
  console.log(lastDay.format('ddd').toUpperCase());
  console.log(data[0].at);
  console.log(data[0].width);
}
fetch();

$('#update_btn').click(async () => {
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
  }, BOX_ID, '5e21b50fcd442f0017cd446d');
  alert("日付入力更新しました。")
})
$('#event_btn').click(async () => {
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
  }, BOX_ID, '5e21b50fcd442f0017cd446d');
  alert("イベント入力更新しました。")
})



