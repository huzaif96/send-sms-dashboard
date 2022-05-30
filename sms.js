var plivo = require('plivo');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));


app.all('/send-sms/', function(request, response) {

    console.log(request.query.from)
    var from_number = request.query.from;
    var to_number = request.query.to;
    var body = request.query.text;
    
    console.log(from_number,to_number,body)

    var client = new plivo.Client("auth_id", "auth_token");
        client.messages.create({
        src: from_number,
        dst: to_number,
        text: body,
    }).then(function(response) {
        console.log(response);
    });

});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});