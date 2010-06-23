/**
 * Outputs to a TextMate HTML window printing JSLint results.
 * Invoked by "⌃⇧V"
 * @author Matthew Kitt
 */
var sys = require('sys');

function reporter(results) {
  var error_regexp = /^\s*(\S*(\s+\S+)*)\s*$/,
      i,
      len = results.length,
      output = '',
      html = '',
      file,
      error,
      reason,
      line,
      character;

  for (i = 0; i < len; i += 1) {
    file = results[i].file;
    error = results[i].error;
    reason = error.reason;
    line = error.line;
    character = error.character;
    output += '<li>' + 
                '<a href="txmt://open?url=file://' + file + '&line=' + 
                                line + '&column=' + character + '">' +
                  '<strong>' + reason + '</strong>' +
                  ' <em>line ' + line + 
                  ', character ' + character + '</em>' +
                '</a>' +
                '<pre><code>' + 
                  (error.evidence || '').replace(error_regexp, "$1") +
                '</pre></code>' +
              '</li>';
  }
  
  html += '<html>' +
            '<head>' +
              '<style type="text/css">' +
                'body {font-size: 14px;}' +
                'pre { background-color: #eee; color: #400; margin: 3px 0;}' +
                'h1, h2 { font-family:"Arial, Helvetica"; margin: 0 0 5px; }' +
                'h1 { font-size: 20px; }' +
                'h2 { font-size: 16px;}' +
                'a { font-family:"Arial, Helvetica";}' +
                'ul { margin: 10px 0 0 20px; padding: 0; list-style: none;}' +
                'li { margin: 0 0 10px; }' +
              '</style>' +
            '</head>' +
            '<body>' +
              '<h1>' + len + ' Error' + ((len === 1) ? '' : 's') + '</h1>' +
              '<hr/>' +
              '<ul>' +
                output +
              '</ul>' +
            '</body>' +
          '</html>';

  sys.puts(html);
  
  // for some weird reason this had to be added for node 0.1.93..
  sys.puts('');
}