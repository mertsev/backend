const api_key = 'cadbf2df-fb6e-4540-9db1-6ea2342dab49';

var https = require('https');

var methods = {};
methods.geocode = function (requestString) {
    const numberOfResults = 1
    var options = {
        host: 'geocode-maps.yandex.ru',
        path: composeRequestPath(api_key, requestString, numberOfResults)
    }
    return new Promise((resolve) => {
        https.get(options, function (res, err) {
            if (!err && res.statusCode == 200) {
                res.setEncoding('utf8');
                res.on('data', function (geoResponse) {
                    var parsedResponse = JSON.parse(geoResponse),
                        name = getNameFromJson(parsedResponse),
                        coordinates = getCoordinatesFromJson(parsedResponse);
                    console.log(JSON.stringify(composeGeojson(coordinates, name)));
                    resolve(composeGeojson(coordinates, name));
                });
            } else {
                console.log('STATUS CODE: ' + res.statusCode);
                console.log('ERROR:' + err);
            }
        })
    })
}

function composeGeojson(coordinates, name) {
    var geoJson = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": coordinates
        },
        "properties": {
            name: name
        }
    };
    return geoJson;
}

function getCoordinatesFromJson(parsedJson) {
    var reversedPosition = parsedJson.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
    var reversedCoordinates = reversedPosition.split(' ');
    return [reversedCoordinates[1], reversedCoordinates[0]];
}

function getNameFromJson(parsedJson) {
    var name = parsedJson.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
    return name;
}

function composeRequestPath(api_key, request, numberOfResults) {
    return '/1.x/?apikey=' + api_key + '&format=json' + '&geocode=' + request + '&results=' + numberOfResults;
}

module.exports = methods;