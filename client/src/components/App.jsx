import React from 'react';
import SelectedPlant from './SelectedPlant.jsx';
import plants from '../plants.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      plants: [],
      selectedPlant: ''
    }
    this.handlePlantChange = this.handlePlantChange.bind(this);
    this.capitilizeFirstLetter = this.capitilizeFirstLetter.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    this.setState({
      plants
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
    for (var i = 0; i < plants.length; i++) {
      if (plants[i].name === value) {
        var selectedPlant = plants[i];
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

  handleUpload(event) {
    const file = event.target.files[0];
    const formData = new FormData()
    formData.append('image', file)
    formData.append('plantName', this.state.selectedPlant.name)
    fetch('/s3test', {
      method: 'POST',
      body: formData
    })
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
      display = <SelectedPlant plant={this.state.selectedPlant} capitilizeFirstLetter={this.capitilizeFirstLetter}/>
      upload = (
        <div className='inputContainer'>
        <input id="myFileInput" type="file" accept="image/*;capture=camera" onChange={this.handleUpload}/>
        </div>
      )
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
        {display}
      </div>
    )
  }
}

export default App;