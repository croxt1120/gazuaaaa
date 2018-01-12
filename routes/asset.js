var express = require('express');
var router = express();
var sha256 = require('js-sha256').sha256;
var db = require('../module/db');

var PASSWORD = "0e4bb5c488896e89a375e234730e1f35ba5915b30186936a0c7471b9f58da337";

router.route("/")
    .get(wrapAsync(async(req, res, next) =>
    { // get all
        var result = await db.Asset.findAll();
        res.send(result);
    }))
    .post(wrapAsync(async(req, res, next) =>
    { // create item
        var data = req.body;
        checkPassword(data.password);
        var result = await db.Asset.create(data);
        res.send(result);
    }));

router.route("/:id")
    .get(wrapAsync(async(req, res) =>
    { // get item
        var result = await db.Asset.findById(req.params.id);
        res.send(result);
    }))
    .put(wrapAsync(async(req, res) =>
    { // modify item
        var data = req.body;
        var result = await db.Asset.update(
            data, { where: { id: req.params.id } }
        );
        res.send(result);
    }))
    .delete(wrapAsync(async(req, res, next) =>
    { // delete List
        var data = req.body;
        checkPassword(data.password);
        var result = await db.Asset.destroy({ where: { id: req.params.id } });
        res.send(result);
    }));

function checkPassword(password)
{
    if (sha256(password) != PASSWORD)
    {
        var e = new Error("invalid password");
        e.status = 403;
        throw e;
    }
    else
    {
        return null;
    }
}

function wrapAsync(fn)
{
    return function(req, res, next)
    {
        fn(req, res, next).catch(next);
    };
}

module.exports = router;