var express = require('express');
var router = express();
var db = require('../module/db');
var axios = require('axios');
var _ = require('underscore');

router.route("/:id")
    .get(wrapAsync(async(req, res, next) =>
    { // get item
        var result = await db.Asset.findById(req.params.id);
        if (result == null)
        {
            throw Error("can not find id");
        }
        var url = result.get("api");
        var response = await axios.get(url);
        var data = response.data;
        if (_.isArray(data))
        {
            data = _.first(data);
        }
        
        data._coinId = req.params.id;
        res.send(data);
    }));

function wrapAsync(fn)
{
    return function(req, res, next)
    {
        fn(req, res, next).catch(next);
    };
}
module.exports = router;
