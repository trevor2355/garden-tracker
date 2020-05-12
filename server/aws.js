const AWS = require('aws-sdk');
const uuid = require('uuid');

const uploadImage = (Bucket, Key, Body) => {
  var objectParams = {Bucket, Key, Body, ContentType: 'image/jpeg', ACL: 'public-read'};
  var upload = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
  return upload
}

const createBucket = () => {

}

module.exports = {
  uploadImage,
  createBucket
}