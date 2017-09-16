const express = require('express');
const router = express.Router();

router.use('/users', (req, res) => {
    res.json({ success: true });
});

module.exports = router;
