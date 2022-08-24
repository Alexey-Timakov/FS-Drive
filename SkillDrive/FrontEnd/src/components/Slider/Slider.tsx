import React, { useState } from 'react';
import classnames from 'classnames';
import { FeedbackItem } from '../../interfaces/FeedbackItem';
import SliderElement from './SliderElement';
import chevronLeft from './chevron-left.svg';
import chevronRight from './chevron-right.svg';

import './slider.scss';
import { sliderElementsList } from './slider_elements_list';


export default function Slider(props: { sliderElements: FeedbackItem[] }) {

  const getSliderWidth = (): number => {
    const breakpointMobilePX: number = 768;
    let sliderWidth: number = 678;

    if (document.body.clientWidth < breakpointMobilePX) sliderWidth = 375;
    return sliderWidth;
  }

  const SLIDER_WIDTH: number = getSliderWidth();
  const slidesTotalAmount: number = sliderElementsList.length;
  const maxOffest: number = SLIDER_WIDTH * (slidesTotalAmount - 1);

  const [sliderOffset, setOffset] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);


  const moveSliderLeft = () => {
    setOffset(currentOffset => {
      const newOffset: number = currentOffset + SLIDER_WIDTH;
      return Math.min(newOffset, 0);
    });

    setActiveSlide(item => {
      const newSlide = item - 1;
      return Math.max(newSlide, 0);
    })
  };

  const moveSliderRight = () => {
    setOffset(currentOffset => {
      const newOffset: number = currentOffset - SLIDER_WIDTH;
      return Math.max(newOffset, -maxOffest);
    });

    setActiveSlide(item => {
      const newSlide = item + 1;
      return Math.min(newSlide, slidesTotalAmount - 1);
    })
  };

  return (
    <>
      <div className='slider__wrapper'>
        <div className='slider__button-wrapper slider__button-wrapper-left'><img src={chevronLeft} onClick={moveSliderLeft} className="slider__buttons" /></div>
        <div className='slider__active_window'>
          <div className='slider__elements'
            style={{
              transform: `translateX(${sliderOffset}px)`
            }}>
            {props.sliderElements.map(item => {
              return <SliderElement element={item} key={item.image} />
            })}
            o
          </div>
        </div>
        <div className='slider__button-wrapper slider__button-wrapper-right'><img src={chevronRight} onClick={moveSliderRight} className="slider__buttons" /></div>
      </div>
      <div className='slider__dots'>
        {props.sliderElements.map((item, index) => {
          const dotsClasses = classnames({
            'slider__dot': true,
            'slider__dot_active': activeSlide === index,
          });
          return <div className={dotsClasses} key={item.image}></div>
        })}
      </div>
    </>
  )
}
