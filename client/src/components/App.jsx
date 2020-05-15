import React from 'react';
import SelectedPlant from './SelectedPlant.jsx';
import imageCompression from 'browser-image-compression';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      plants: [],
      selectedPlant: '',
      selectedImage: undefined,
      uploading: false
    }
    this.handlePlantChange = this.handlePlantChange.bind(this);
    this.capitilizeFirstLetter = this.capitilizeFirstLetter.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handlePhotoSelect = this.handlePhotoSelect.bind(this)
  }

  componentDidMount() {
    this.getPlants()
  }

  getPlants() {
    fetch('/api/plants')
      .then(response => {
        return response.json()
      })
      .then(plants => {
        this.setState({
          plants: plants.plants
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handlePlantChange(event) {
    if (event.target.value === 'placeholder') {
      this.setState({
        selectedPlant: ''
      })
      return
    }
    var value = event.target.value;
    for (var i = 0; i < this.state.plants.length; i++) {
      if (this.state.plants[i].name === value) {
        var selectedPlant = this.state.plants[i];
      }
    }
    this.setState({
      selectedPlant
    })
  }

  capitilizeFirstLetter(string) {
    string = string.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return string
  }

  handlePhotoSelect(event) {
    let file = event.target.files[0];
    const dateTaken = file.lastModified
    const formData = new FormData()
    formData.append('rawImage', file)
    formData.append('plantName', this.state.selectedPlant.name)
    formData.append('dateTaken', dateTaken)
    formData.append('plant_id', this.state.selectedPlant.id)
    this.setState({
      selectedImage: formData,
      file: file
    })
  }

  handleUpload() {
    this.setState({
      uploading: true
    })

    var imageFile = this.state.file
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
   
    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    
    var that = this
    var name = imageFile.name

    imageCompression(imageFile, options)
      .then(function (compressedFile) {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        
        let formData = that.state.selectedImage
        formData.append('image', compressedFile)
        console.log(name);
        formData.append('name', name)


        that.setState({
          selectedImage: formData
        }, () => {
          fetch('/api/images', {
            method: 'POST',
            body: that.state.selectedImage
          })
          .then(response => {
            return response.json()
          })
          .then(result => {
            console.log(result)
            that.setState({
              selectedImage: undefined,
              uploading: false
            })
          })
          .catch(err => {
            console.log(err)
          })
        })
      })
      .catch(function (error) {
        console.log(error.message);
      });

  }  

  render() {
    var display;
    var upload;
    if (!this.state.selectedPlant.name) {
      display = (
      <div className='iconContainer'>
        <img className='plantIcon' src='plant-icon.png'></img>
      </div>
      )
      upload = null;
    } else {
      display = <SelectedPlant selectedImage={this.state.selectedImage} plant={this.state.selectedPlant} capitilizeFirstLetter={this.capitilizeFirstLetter}/>
      upload = (
        <div className='inputContainer'>
        <input id="myFileInput" type="file" accept="image/*;capture=camera" onChange={this.handlePhotoSelect}/>
        </div>
      )
    }

    var uploadButton;
    if (this.state.selectedImage) {
      if (this.state.uploading === true) {
        uploadButton = (
          <div className='submitButtonContainer'>
            <button onClick={this.handleUpload}>Uploading...</button>
        </div>
        )
      } else {
      uploadButton = (
        <div className='submitButtonContainer'>
          <button onClick={this.handleUpload}>Submit</button>
        </div>
        )
      }
    } else {
      uploadButton = null
    }

    return (
      <div className='appContainer'>
        <h1>Garden Tracker</h1>
        <div className='buttonContainer'>
          <select value={this.state.value} onChange={this.handlePlantChange}>
            <option value='placeholder'>Choose a Plant</option>
            {this.state.plants.map(plant => (
              <option value={plant.name} key={plant.id}>{this.capitilizeFirstLetter(plant.name)}</option>
            ))}
          </select>
        </div>
        {upload}
        {uploadButton}
        {display}
      </div>
    )
  }
}

export default App;