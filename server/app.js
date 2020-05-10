require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
const db = require('./db/connection.js')

const app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// serve up the react client
app.use(express.static(`${__dirname}/../client/public`));

//handle the routes here
app.post('/s3test', (req, res) => {
  var bucketName = req.body.plantName.replace(' ', '-')

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    } else {
      db.query('SELECT * FROM plants', (err, result) => {
        if (err) {
          console.log('ERROR query')
        } else {
          console.log('RESULT: ', result.rows)
        }
      })
    }
  })

  db.query('SELECT * FROM plants', (err, result) => {
    if (err) {
      console.log('ERROR query')
    } else {
      console.log('RESULT: ', result.rows)
    }
  })

  // var objectParams = {Bucket: 'garden-tracker-sugar-peas', Key: req.files.image.name, Body: req.files.image.data, ContentType: 'image/jpeg', ACL: 'public-read'};
  // var upload = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
  // upload
  //   .then(data =>{
  //     console.log("Successfully uploaded data to " + bucketName + req.files.image.name);
  //     console.log(`https://${bucketName}.s3.amazonaws.com/${req.files.image.name}`)
  //   })
  //   .catch(err => {
  //     console.error(err, err.stack);
  //   })
})

module.exports = app;