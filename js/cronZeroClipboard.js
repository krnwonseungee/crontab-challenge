//custom JavaScript for enabling copying of cron expression
client = new ZeroClipboard($("#zeroclipboard"));

client.on( "copy", function (event) {
  var clipboard = event.clipboardData;
  clipboard.setData( "text/plain",  $('input[name="cronstr"]')[0].value );
  clipboard.setData( "text/html", $('input[name="cronstr"]')[0].value );
  // clipboard.setData( "application/rtf", "{\\rtf1\\ansi\n{\\b Copy me!}}" );
});

client.on( "aftercopy", function( event ) {
    $('#show-copied').css("display", "block").delay(1500).fadeOut(500)
} );
