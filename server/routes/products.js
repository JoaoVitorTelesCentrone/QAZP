const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Post'
    });
});

module.exports = router;
