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
                <div className='title'>Third party liability - {index}</div>
                <div className='subtitle'>
                  Deductible is AED 0 Premium is exclusive of 5% VAT
                </div>
                <div className='price-tag'>AED 600.00</div>
              </div>
              <div className='carousel-body'>
                <div className='body-title'>Policy features summary</div>
                <div className='body-table'>
                  <div className='c1'>15% No Claim Discount</div>
                  <div className='c2'>Covered</div>
                  <div className='c3'>
                    <img src={tick} />
                  </div>
                </div>
                <div className='body-table'>
                  <div className='c1'>15% No Claim Discount</div>
                  <div className='c2'>Covered</div>
                  <div className='c3'>
                    <img src={tick} />
                  </div>
                </div>
                <div className='body-table'>
                  <div className='c1'>15% No Claim Discount</div>
                  <div className='c2'>Covered</div>
                  <div className='c3'>
                    <img src={tick} />
                  </div>
                </div>
                <div className='body-table'>
                  <div className='c1'>15% No Claim Discount</div>
                  <div className='c2'>Covered</div>
                  <div className='c3'>
                    <img src={tick} />
                  </div>
                </div>
                <div className='body-table'>
                  <div className='c1'>15% No Claim Discount</div>
                  <div className='c2'>Covered</div>
                  <div className='c3'>
                    <img src={tick} />
                  </div>
                </div>
                <div className='body-table'>
                  <div className='c1'>15% No Claim Discount</div>
                  <div className='c2'>Covered</div>
                  <div className='c3'>
                    <img src={tick} />
                  </div>
                </div>
                <div className='body-table'>
                  <div className='c1'>15% No Claim Discount</div>
                  <div className='c2'>Covered</div>
                  <div className='c3'>
                    <img src={tick} />
                  </div>
                </div>
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
