const db = require('./connection.js')

const addImage = (plant_id, imageurl, dateTaken) => {
  return new Promise ((resolve, reject) => {
    db.connect((err, client, release) => {
      if (err) {
        console.log('YOU HAVE AN ERROR:', err)
        reject(err)
      }
      client.query(`INSERT INTO images (plant_id, imageurl, date_taken) VALUES (${plant_id}, '${imageurl}', '${dateTaken}')`, (err, result) => {
        release()
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  })
}

const getPlants = () => {
  return new Promise ((resolve, reject) => {
    db.connect((err, client, release) => {
      if (err) {
        reject(err)
      }
      console.log(client);
      console.log('connected with database through pool')
      client.query('SELECT * FROM plants', (err, result) => {
        release()
        if (err) {
          reject(err)
        } else {
          resolve(result.rows)
        }
      })
    })
  })
}

const getImages = id => {
  return new Promise ((resolve, reject) => {
    db.connect((err, client, release) => {
      if (err) {
        reject(err)
      }
      client.query(`SELECT * FROM images WHERE plant_id=${id}`, (err, result) => {
        release()
        if (err) {
          reject(err)
        } else {
          resolve(result.rows)
        }
      })
    })
  })
}

module.exports = {
  addImage,
  getPlants,
  getImages
}