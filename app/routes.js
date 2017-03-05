const express = require('express');
const path = require('path');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
