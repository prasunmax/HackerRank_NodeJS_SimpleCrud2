const Posts = require('../models/posts');
const { Op } = require('sequelize');

module.exports = {
    post_api: post_handler,
    get_api: get_handler
}


function post_handler(req, res) {
    let tmpdata = req.body;
    if (tmpdata.isPublished) {
        tmpdata.publishedDate = new Date().getTime();
    }
    Posts.create(tmpdata)
        .then(data => {
            res.status(201).send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Reminder."
            });
        });
};

function get_handler(req, res) {
    const id = req.params.id;
    if (id) {
        Posts.findByPk(id)
            .then(data => {
                if (data)
                    res.status(200).send(data);
                else
                    res.status(404).send("ID not found");
            })
            .catch(err => {
                res.status(404).send({
                    message: "ID not found"
                });
            });
    } else {
        const author = req.query.author;
        try {
            var hasPublished = req.query.isPublished && (req.query.isPublished === 'true' || req.query.isPublished === 'false') ? true : false;
            var isPublished = (req.query.isPublished && req.query.isPublished === 'true') ? true : false;
        } catch (err) { };
        var hasqry = false;

        var jsonData = {};
        var whereJson = {};

        if (author) {
            jsonData['author'] = author;
            hasqry = true;
        }
        if (hasPublished) {
            jsonData['isPublished'] = isPublished;
            hasqry = true;
        }
        if (hasqry) {
            //qryStr = '{ "where": { ' + qryStr + ' } }';
            whereJson['where'] = jsonData;
        } else {
            qryStr = '{}';
        }
        Posts.findAll(whereJson)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(404).send({
                    message: "No Records Found"
                });
            });
    }
};