/*
 * Jordan Mohler
 * COMP 3705-2
 * 16 January 2018
 * Lab 4- Node.js
 */

var fs = require("fs");
var zlib = require('zlib');

export class lab4 {
  syncFileRead = function(filename){
    var data = fs.readFileSync(filename);
    return data.toString();
  }

  asyncFileRead = function(filename, callback) {
    fs.readFile(filename, function (err, data) {
      if (err) {
        return console.error(err);
      }
      callback(data.toString());
    });
  }

  compressFileStream = function(input, output) {
    return fs.createReadStream(input)
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream(output));
  }

  decompressFileStream = function(input, output) {
    return fs.createReadStream(input)
      .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream(output));
  }

  listDirectoryContents = function(name, callback) {
    return fs.readdir(name, function (err, files) {
      if (err) {
        return console.error(err);
      }
      callback(files);
    });
  }
}
