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
    this.capitilizeFirstLetter = this.capitilizeFirstLetter.bind(this);
  }

  capitilizeFirstLetter(string) {
    string = string.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return string
  }

  render() {
    var display;
    if (!this.state.selectedPlant.name) {
      display = (
      <div className='iconContainer'>
        <img className='plantIcon' src='plant-icon.png'></img>
      </div>
      )
    } else {
      display = <SelectedPlant plant={this.state.selectedPlant} capitilizeFirstLetter={this.capitilizeFirstLetter}/>
    }
    return (
      <div className='appContainer'>
        <h1>Garden Tracker</h1>
        <div className='buttonContainer'>
          <select className='plantSelectionButton' value={this.state.value} onChange={this.handlePlantChange}>
            <option value='placeholder'>Choose a Plant</option>
            {this.state.plants.map(plant => (
              <option value={plant.name} key={plant.id}>{this.capitilizeFirstLetter(plant.name)}</option>
            ))}
          </select>
        </div>
        <div className='inputContainer'>
          <input id="myFileInput" type="file" accept="image/*;capture=camera"/>
        </div>
        {display}
      </div>
    )
  }
}

export default App;