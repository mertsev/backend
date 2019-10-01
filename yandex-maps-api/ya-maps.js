const token = 'cadbf2df-fb6e-4540-9db1-6ea2342dab49';

var https = require('https');

request = 'Plotkina+3';
var options = {
    host : 'geocode-maps.yandex.ru',
    path : '/1.x/?apikey=' + token + '&format=json&geocode=' + request
}

https.get(options, function(res, err) {
    if (!err) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    }
})