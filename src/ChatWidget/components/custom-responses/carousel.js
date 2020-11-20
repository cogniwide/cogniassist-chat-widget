import React, { Fragment, useState } from 'react';
import tick from '../../../../public/assets/modal/right.svg';
import righticon from '../../../../public/assets/modal/arrow-right.png';

function Carousel(props) {
  const [showIndex, setShowIndex] = useState(0);
  return (
    <Fragment>
      {props.elements &&
        props.elements.map((element, index) => {
          return (
            <div
              className={`carousel-wrapper ${
                index === showIndex ? 'show' : ''
              }`}
            >
              <div
                className={`left-icon ${index === 0 ? 'inactive' : 'active'}`}
                onClick={() => {
                  setShowIndex(showIndex - 1);
                }}
              >
                <img src={righticon} className='swipe-left' />
              </div>
              <div
                className={`right-icon ${
                  index === props.elements.length - 1 ? 'inactive' : 'active'
                }`}
                onClick={() => {
                  setShowIndex(showIndex + 1);
                }}
              >
                <img src={righticon} className='swipe-right' />
              </div>
              <div className='carousel-header'>
                <div className='title'>{element.title}</div>
                <div className='subtitle'>{element.subtitle}</div>
                <div className='price-tag'>{element.data.amount}</div>
              </div>
              <div className='carousel-body'>
                <div className='body-title'>Policy features summary</div>
                {element.data.coverage &&
                  element.data.coverage.map((coverage) => {
                    return (
                      <div className='body-table'>
                        <div className='c1'>{coverage.title}</div>
                        <div className='c2'>{coverage.type}</div>
                        <div className='c3'>
                          {coverage.type === 'covered' ? (
                            <img src={tick} />
                          ) : (
                            <input type='checkbox' />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className='carousel-footer'>
                <div
                  className='button1'
                  onClick={() => {
                    props.handleClick(element);
                  }}
                >
                  View Details
                </div>
                <div
                  className='button2'
                  onClick={() => {
                    props.handleClick(element);
                  }}
                >
                  Buy Now
                </div>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
}
export default Carousel;
