import React from 'React';

const UpdateImageModal = (props) => {
  if (props.show === true) {
    return (
      <div className='modal'>
        <section className="modal-main">
          <div className='imageTakenOnText-UpdateImageModal'>Image Taken On: </div>
          <input className='imageTakenOnInput-UpdateImageModal' type='text' placeholder={props.image.date_taken}></input>
          <button className='close-UpdateImageModal' onClick={props.close}>close</button>
        </section>
      </div>
    )
  } else {
    return null
  }
}

export default UpdateImageModal;