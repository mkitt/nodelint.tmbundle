/**
 * This overrides the default reporters and user reporter for nodelint.js
 * This is intended for project specific overrides.
 * This file should be saved in the working directory as "nodelint-reporter.js"
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
      
  output += printer.getOutput(results);
  output += len + ' error' + ((len === 1) ? '' : 's');
  sys.puts(output);

  // for some weird reason this had to be added for node 0.1.93
  sys.puts('');
}