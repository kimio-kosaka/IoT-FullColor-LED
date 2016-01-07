/*
* Setup
*/
var server = 'localhost'; //server hostname or IP-address
var ioport = 5040; // Socket.io port-number

//1.  specify domain and port of your socket.io server
var socket = require('socket.io-client')('http://'+ server + ':' + ioport);

//2.  create instance johnny-five Arduino board.
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  /*
  * Define your application below
  */

  // 1. initialize your hardware
  var led = new five.Led( 13 );
  var rgb_led = new five.Led.RGB({
      pins:{
          red: 6,
          green: 5,
          blue: 3
      }
  });
  
  // 2. Create socket message receiver
  socket.on('rgb', function(data){
      rgb_led.color({red:data.r, green:data.g, blue:data.b });
  });

  // 3. Create socket message emitter
 
  /*
  * Socket connection logger
  * Nice to console log when socket connection is lost/alive
  */
  socket.on('connect', function(){
    console.log('Socket Connected');
  });
  socket.on('disconnect', function(){
    console.log('Socket Disconnected !');
  });

  /*
  * REPL
  * You can specify command to use from node REPL. Nice for debugging.
  */
  this.repl.inject({
    on:     function(){led.on();},     
    off:    function(){led.off();},
    red:    function(){rgb_led.color(255,0,0);},
    green:  function(){rgb_led.color(0,255,0);},
    blue:   function(){rgb_led.color(0,0,255);}
  });
});