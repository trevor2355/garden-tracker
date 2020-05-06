import React from 'react';
import SelectedPlant from './SelectedPlant.jsx';
import plants from '../plants.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      plants: [],
      selectedPlant: {}
    }
  }

  componentDidMount() {
    this.setState({
      plants
    })
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
      display = <SelectedPlant/>
    }
    return (
      <div className='appContainer'>
        <h1>Garden Tracker</h1>
        <div className='buttonContainer'>
          <select className='plantSelectionButton'>
            <option value='placeholder'>Choose a Plant</option>
            {this.state.plants.map(plant => (
              <option value={plant.name}>{plant.name}</option>
            ))}
          </select>
        </div>
        {display}
      </div>
    )
  }
}

export default App;