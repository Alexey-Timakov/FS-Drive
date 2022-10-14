import React, { useState } from 'react'
import "./CarGallery.scss";
import { ICarGallery } from "../../Interfaces/ICarGallery";
import { API_URL } from '../../http';

export default function CarGallery({ images }: ICarGallery) {
  const totalImages = images.length;
  const [currentImageNumber, setImageNumber] = useState<number>(1);
  const [isGalleryModalOpen, toggleGalleryModal] = useState<boolean>(false);

  const slideLeft = () => {
    const nextImageNumber = currentImageNumber === 0
      ? totalImages
      : currentImageNumber - 1;
    setImageNumber(nextImageNumber);
  }

  const slideRight = () => {
    const nextImageNumber = currentImageNumber === totalImages
      ? 0
      : currentImageNumber + 1;
    setImageNumber(nextImageNumber);
  }

  const showModalGallery = () => {
    toggleGalleryModal(true);
  }

  return (
    <div className='gallery__wrapper'>
      <div className='gallery__images' onClick={showModalGallery}>
        <div className='gallery__main-image'>
          <img src={`${API_URL}/${images[0]}`} />
        </div>
        <div className='gallery__small-images'>
          <div className='gallery__smail-image'><img src={`${API_URL}/${images[1]}`} />
          </div>
          <div className='gallery__small-image'><img src={`${API_URL}/${images[2]}`} />
          </div>
        </div>
      </div>
      {isGalleryModalOpen &&
        <div className='gallery__modal-window'>
          <div className='modal-window__fade'>
            <div className='modal-window__info'>
              <div className='modal-window__title'>{currentImageNumber + 1} из {totalImages} фото</div>
              <div className='modal-window__close-button'>&#x2715;</div>
            </div>
            <div className='modal-window__image-wrapper'>
              <div className='button-left' onClick={slideLeft}><i className='icon-arrow-left'></i></div>
              <div className='modal-window__image'><img src={`${API_URL}/${images[currentImageNumber]}`} /></div>
              <div className='button-right' onClick={slideRight}><i className='icon-arrow-right'></i></div>
            </div>
          </div>
        </div>

      }
    </div>
  )
}
