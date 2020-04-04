import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './carousel_wrapper.scss'

class CarouselWrapper extends Component {

    static defaultProps = {
        items: []
      }

      constructor(props) {
        super(props)
    
        this.state = {
          slides: null
        }
      }

      componentDidMount() {
        this.setState({ slides:this.props.items });
      }

    render() {

      const slides = this.props.items.map((val,idx)=>{
        return <div>
        <img src={ val.src } />
        {
          val.legend &&
          <p className="legend">{ val.legend }</p>
        }
      </div>
      });


      if (!slides) return <div>Images are not fetched yet!</div>

        return (
          <Carousel
          showStatus={false}
          showThumbs={false}
          >
            {slides}
          </Carousel>
        )

    }

}; 

CarouselWrapper.propTypes = {
    items: PropTypes.array.isRequired
};

export default CarouselWrapper
