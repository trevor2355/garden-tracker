require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
const models = require('./db/models.js')
const aws = require('./aws.js')

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

app.get('/api/plants', (req, res) => {
  models.getPlants()
    .then(plants => {
      res.status(200).json( {plants} )
    })
    .catch(err => {
      console.log(err)
      res.status(400).json( { err })
    })
})

app.get('/api/images', (req, res) => {
  plant_id = req.query.plant_id
  models.getImages(plant_id)
    .then(images => {
      res.status(200).json( {images} )
    })
    .catch(err => {
      console.log(err)
      res.status(400).json( {err} )
    })
})

app.post('/api/plants', (req, res) => {

})

app.post('/api/images', (req, res) => {
  console.log(req.body.plantName)
  var plantName = req.body.plantName.replace(' ', '-').replace(' ', '-').replace('(', '').replace(')', '')
  
  var bucketName = 'garden-tracker-' + plantName;
  console.log('bucketName: ', bucketName);
  var imageName = req.body.name;
  console.log(imageName);
  var imageData = req.files.image.data;

  aws.uploadImage(bucketName, imageName, imageData)
    .then(data => {
      console.log("Successfully uploaded data to " + bucketName + '-' + imageName);
      var imageurl = `https://${bucketName}.s3.amazonaws.com/${imageName}`;
      var date = new Date(parseInt(req.body.dateTaken));
      var dateTaken = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      var plant_id = req.body.plant_id;
      return models.addImage(plant_id, imageurl, dateTaken)
    })
    .then(results => {
      res.status(201).json({ message: 'Successfully uploaded ' + imageName})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })

})

app.delete('/api/images', (req, res) => {
  console.log("ATTEMPT DELETE")
  var id = req.query.id;
  models.deleteImage(id)
    .then(response => {
      console.log(response)
      res.status(204).json({ message: 'Successfully deleted image id: ' + id})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
})

app.delete('/api/plants', (req, res) => {
  
})

module.exports = app;