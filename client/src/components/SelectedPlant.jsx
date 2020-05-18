import React from 'react';
import UpdateImageModal from './UpdateImageModal.jsx'

class SelectedPlant extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      showUpdateImageModal: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleUpdateImageModal = this.toggleUpdateImageModal.bind(this);
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

  handleDelete(event) {
    var id = event.target.id;
    var options = {
      method: 'DELETE',
    }
    fetch(`/api/images?id=${id}`, options)
      .then(response => {
        this.forceUpdate()
      })
      .catch(err => {
        console.log(err)
      })

  }

  getAbrevDate() {
    var datePlanted = this.props.plant.date_planted.toString();
    var index = datePlanted.indexOf('2020')
    return datePlanted.slice(0, index - 1)
  }

  toggleUpdateImageModal() {
    var toggle = !this.state.showUpdateImageModal
    this.setState({
      showUpdateImageModal: toggle
    })
  }

  render() {
    var image;
    if (this.state.images.length === 0) {
      image = (<h2>No Images Available</h2>)
    } else {
      image = (<img src={this.state.images[0].imageurl} className='mostRecentPlant'/>)
    }
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
            <img src='./delete-icon.jpeg' onClick={this.handleDelete} id={image.id}/>
            <img src='./edit-icon.png' onClick={this.toggleUpdateImageModal} id={image.id}/>
            <UpdateImageModal show={this.state.showUpdateImageModal} close={this.toggleUpdateImageModal} image={image} />
          </div>
        ))}
      </div>
    )
  }
}

export default SelectedPlant;