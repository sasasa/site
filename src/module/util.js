
export　function changeBlank(string) {
  if(string == "") {
    return '-'
  } else {
    return string
  }
}

export　function escape_html(string) {
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
export const BOX_ID = 'box_efaacfeddbbd64bb47f3';
export const JBN_ID = '5e21b50fcd442f0017cd446d';