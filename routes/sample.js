var express = require('express');
var router = express();

router.route("/")
    .get((req, res) => { // get all

    })
    .post((req,res) => { // create item
        
    });
    
router.route("/:id")
    .get((req, res) => { // get item

    })
    .put((req,res) => { // modify item
        
    })
    .del((req, res) => { // delete List

    });

module.exports =  router;