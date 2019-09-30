const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Maps = mongoose.model('Maps');

router.get('/all', auth.optional, (req, res, next) => {
    Maps.find(req.params, function (err, map) {
        if (err) return(err);
        res.send(map);
    })
});

router.get('/:id', auth.optional, (req, res, next) => {
    console.log(req.method);
    Maps.findById(req.params.id, function (err, map) {
        if (err) return(err);
        res.send(map);
    })
});

router.post('/create', auth.optional, (req, res, next) => {
    
    if(!req.body.point) {
        return res.status(422).json({
          errors: {
            point: 'is required',
          },
        });
      }

    if(!req.body.name) {
        return res.status(422).json({
          errors: {
            name: 'is required',
          },
        });
      }

    if(!req.body.style) {
        return res.status(422).json({
          errors: {
            style: 'is required',
          },
        });
      }
    
    let Map = new Maps ({
        point: req.body.point,
        name: req.body.name,
        style: req.body.style
    });

    Map.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Map Created successfully')
    })
});

router.delete('/create', auth.optional, (req, res, next) => {
    
});

module.exports = router;