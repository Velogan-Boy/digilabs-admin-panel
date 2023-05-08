const Users = require('../models/Users');

const fs = require('fs');

const { upload } = require('../services/fileUpload');

// get all users
exports.getUsers = async (req, res) => {
   try {
      const users = await Users.find();

      res.render('pages/index', { users });
   } catch (err) {
      console.log(err);

      res.status(500).send('Server error');
   }
};

exports.createUser = async (req, res) => {
   try {
      const { name, email } = req.body;

      const user = await Users.create({ name, email });

      if (req.originalUrl.includes('/api')) return res.status(200).json({ user });

      res.render('pages/filler', { msg: 'User created successfully' });
   } catch (err) {
      console.log(err);
   }
};

exports.getText = async (req, res) => {
   try {
      // read text.
      fs.readFile(`${__dirname}/../public/text.txt`, 'utf8', (err, data) => {
         if (err) throw err;
         console.log(data);

         // if its api request.
         if (req.originalUrl.includes('/api')) {
            return res.status(200).json({
               text: data,
            });
         }

         // if its web request.
         res.render('pages/text', { text: data });
      });
   } catch (err) {
      console.log(err);

      res.status(500).send('Server error');
   }
};

exports.updateText = async (req, res) => {
   try {
      console.log(req.body);

      // update text.
      fs.writeFile(`${__dirname}/../public/text.txt`, req.body.text, (err) => {
         if (err) throw err;
         console.log('The file has been saved!');
      });

      res.render('pages/filler', { msg: 'Text updated successfully' });
   } catch (err) {
      console.log(err);

      res.status(500).send('Server error');

      res.render('pages/filler', { msg: 'Server error' });
   }
};

exports.getImage = async (req, res) => {
   try {
      // read image.
      fs.readFile(`${__dirname}/../public/logo.svg`, (err, data) => {
         if (err) throw err;
         console.log(data);

         // if its api request.
         if (req.originalUrl.includes('/api')) {
            return res.status(200).json({
               image: data,
            });
         }

         // if its web request.
         res.render('pages/image', { image: data });
      });
   } catch (err) {
      console.log(err);

      if (req.originalUrl.includes('/api')) res.status(500).send('Server error');

      res.render('pages/filler', { msg: 'Server error' });
   }
};

exports.uploadImage = async (req, res) => {
   upload(req, res, (err) => {
      if (err) {
         console.log(err);
         return res.status(500).send('Server error');
      }

      console.log(req.file);

      res.render('pages/filler', { msg: 'Image uploaded successfully' });
   });
};
