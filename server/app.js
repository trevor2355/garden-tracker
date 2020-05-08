const express = require('express');
const morgan = require('morgan');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const formData = require('express-form-data')

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(formData.parse())

// serve up the react client
app.use(express.static(`${__dirname}/../client/public`));

//handle the routes here
app.post('/s3test', (req, res) => {
  console.log('request received')
  console.log(req.files.image.path)
  res.status(201).json({message: 'success'})
  // Create unique bucket name
  var bucketName = 'garden-tracker-sugar-peas';
  // // Create name for uploaded object key
  // var keyName = 'hello_world.txt';

  // // Create a promise on S3 service object
  // var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

  // // Handle promise fulfilled/rejected states
  // bucketPromise.then(
  //   function(data) {
  //     // Create params for putObject call
  //     var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
  //     // Create object upload promise
  //     var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
  //     uploadPromise.then(
  //       function(data) {
  //         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  //       });
  // }).catch(
  //   function(err) {
  //     console.error(err, err.stack);
  // });
  // var objectParams = {Bucket: 'garden-tracker-sugar-peas', Key: 'newImage.txt', Body: req.files.image.path};
  // var upload = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
  // upload
  //   .then(data =>{
  //     console.log("Successfully uploaded data to " + bucketName + "/newImage.jpg");
  //   })
  //   .catch(err => {
  //     console.error(err, err.stack);
  //   })
})

module.exports = app;
