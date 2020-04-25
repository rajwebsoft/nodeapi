const express = require('express');
const router = express.Router();

// test routes
router.get("/ping", (req, res) => res.send('pong'));

const image_manager = require('../modules/image_manager')
router.post('/image_manager/create',image_manager.create)

module.exports = router;