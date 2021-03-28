const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');


router.get('/', postsController.get_api);
router.get('/:id', postsController.get_api);
router.post('/', postsController.post_api);
router.patch('/:id', function (req, res, next) {
    res.status(405).send('<p>API does not allow deleting or modifying reminders for any id value</p>');
});
router.put('/:id', function (req, res, next) {
    res.status(405).send('<p>API does not allow deleting or modifying reminders for any id value</p>');
});
router.delete('/:id', function (req, res, next) {
    res.status(405).send('<p>API does not allow deleting or modifying reminders for any id value</p>');
});

module.exports = router;
