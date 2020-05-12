import React from 'react';

class SelectedPlant extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  componentDidMount() {
    this.getImages(this.props.plant.id)
  }

  componentDidUpdate() {
    this.getImages(this.props.plant.id)
  }

  getImages(id) {
    fetch(`/api/images?plant_id=${id}`)
    .then(response => {
      return response.json()
    })
    .then(images => {
      if (this.state.images.length !== images.images.length) {
        this.setState({
          images: images.images
        })
      }
    })
  }

  getAbrevDate() {
    var datePlanted = this.props.plant.date_planted.toString();
    var index = datePlanted.indexOf('2020')
    return datePlanted.slice(0, index - 1)
  }

  render() {
    var image;
    if (this.state.images.length === 0) {
      image = (<h2>No Images Available</h2>)
    } else {
      image = (<img src={this.state.images[0].imageurl} className='mostRecentPlant'/>)
    }
    console.log(this.props.plant)
    return (
      <div>
        <div className='plantInfo'>
          <h2>{this.props.capitilizeFirstLetter(this.props.plant.name)}</h2>
          {image}
          <div>Date Planted: {this.getAbrevDate()}</div>
          <div>Total Days Growing: {Math.floor((new Date() - new Date(this.props.plant.date_planted.replace(' ', 'T'))) / (1000 * 60 * 60 * 24))}</div>
          <div>Planted From: {this.props.capitilizeFirstLetter(this.props.plant.planted_from)}</div>
          <div>Expected To Be Done: 60</div>
        </div>
        {this.state.images.map(image => (
          <div className='growthPeriod' key={image.imageurl}>
            <h4>Day {Math.ceil((  new Date(image.date_taken.replace(' ', 'T')) - new Date(this.props.plant.date_planted.replace(' ', 'T'))  ) / (1000 * 60 * 60 * 24) + 1)}</h4>
            <img src={image.imageurl} className='plantGrowthImages'/>
          </div>
        ))}
      </div>
    )
  }
}

export default SelectedPlant;