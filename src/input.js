import '@babel/polyfill';
import { JsonBox } from 'jsonbox-node'
import moment from 'moment'

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
  }, BOX_ID, '5e21b50fcd442f0017cd446d');
  alert("更新しました。")
})



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