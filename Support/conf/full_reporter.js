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
                '</code></pre>' +
              '</li>';
  }
  
  html += '<h1>' + len + ' Error' + ((len === 1) ? '' : 's') + '</h1>' +
          '<hr/>' +
          '<ol>' +
            output +
          '</ol>';

  sys.puts(html);
  sys.puts('');
}