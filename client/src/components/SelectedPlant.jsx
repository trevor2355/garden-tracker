import React from 'react';

class SelectedPlant extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.plant.name}</h2>
        <img src={this.props.plant.images[0].imageurl} className='mostRecentPlant'/>
        <div>Date Planted: {this.props.plant.datePlanted.toString()}</div>
        <div>Total Days Growing: {Math.floor((new Date() - this.props.plant.datePlanted) / (1000 * 60 * 60 * 24))}</div>
        <div>Planted From: {this.props.plant.plantedFrom}</div>
        <div>Expected To Be Done: 60</div>
      </div>
    )
  }
}

export default SelectedPlant;