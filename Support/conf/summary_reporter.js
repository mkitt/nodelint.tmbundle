/**
 * Runs JSLint on a TextMate save through a source.js file.
 * If there are 1-5 errors it will print out the results through a tooltip.
 * If there are more than 5 errors it will only print out a summary.
 * If there are no errors, nothing will happen.
 * Invoked by "⌘S"
 * @author Matthew Kitt
 */
var sys = require('sys');

function reporter(results) {
  var len = results.length,
      output = '',
      
  printer = {
    getOutput: function () {
      var error_regexp = /^\s*(\S*(\s+\S+)*)\s*$/,
          i,
          len = results.length,
          output = '',
          file,
          error;

      for (i = 0; i < len; i += 1) {
        file = results[i].file;
        file = file.substring(file.lastIndexOf('/') + 1, file.length);
        error = results[i].error;

        output += file  + ': line ' + error.line +
                  ', character ' + error.character + ', ' +
                  error.reason + '\n' +
                  (error.evidence || '').replace(error_regexp, "$1") + '\n\n';
      }
      return output;
    }
  };
      
  if (len > 0 && len < 2) {
    output += printer.getOutput(results);
  }
  output += len + ' error' + ((len === 1) ? '' : 's');

  if (len > 0) {
    sys.puts(output);
  }
  
  sys.puts('');
}