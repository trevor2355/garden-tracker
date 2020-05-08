import React from 'react';

class SelectedPlant extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  getAbrevDate() {
    var datePlanted = this.props.plant.datePlanted.toString();
    var index = datePlanted.indexOf('2020')
    return datePlanted.slice(0, index - 1)
  }

  render() {
    return (
      <div>
        <div className='plantInfo'>
          <h2>{this.props.capitilizeFirstLetter(this.props.plant.name)}</h2>
          <img src={this.props.plant.images[0].imageurl} className='mostRecentPlant'/>
          <div>Date Planted: {this.getAbrevDate()}</div>
          <div>Total Days Growing: {Math.floor((new Date() - this.props.plant.datePlanted) / (1000 * 60 * 60 * 24))}</div>
          <div>Planted From: {this.props.capitilizeFirstLetter(this.props.plant.plantedFrom)}</div>
          <div>Expected To Be Done: 60</div>
        </div>
        {this.props.plant.images.map(image => (
          <div className='growthPeriod' key={image.imageurl}>
            <h4>Day {Math.ceil((image.dateTaken - this.props.plant.datePlanted) / (1000 * 60 * 60 * 24) + 1)}</h4>
            <img src={image.imageurl} className='plantGrowthImages'/>
          </div>
        ))}
      </div>
    )
  }
}

export default SelectedPlant;