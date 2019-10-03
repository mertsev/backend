const router = require('express').Router();
const auth = require('../auth');
const geocoder = require('../../yandex-maps-api/geocoder')

router.get('/geocode', auth.optional, (req, res, next) => {
    if (!req) {
        return res.status(422).json({
            errors: {
                point: 'is required'
            }
        })
    }
    var request = req.query.request.replace(/ /g, '+');
    geocoder.geocode(request).then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error)
    })
})

module.exports = router;