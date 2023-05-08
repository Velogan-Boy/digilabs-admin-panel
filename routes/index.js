const express = require('express');

const { getUsers, updateText, getText, uploadImage, getImage, createUser } = require('../controllers/index');

const router = express.Router();

router
   .get('/', getUsers)
   .post('/text/update', updateText)
   .get('/text', getText)
   .post('/image/upload', uploadImage)
   .get('/image', getImage)
   .post('/user', createUser);

module.exports = router;
