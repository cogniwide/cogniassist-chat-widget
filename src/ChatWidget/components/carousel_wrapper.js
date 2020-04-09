import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/carousel_wrapper.scss'

class CarouselWrapper extends Component {

    static defaultProps = {
        items: []
      }

      constructor(props) {
        super(props)
    
        this.state = {
          slides: null
        }
        this.handleClick = this.handleClick.bind(this)
      }

      componentDidMount() {
        this.setState({ slides:this.props.items });
      }

    
      handleClick(idx) {
        const item = this.props.items[idx]
        if (item.payload){
          const payload = item.payload;
          const title = item.title || "Loading";
          this.props.parent.chooseReply(title, payload);
        }
    }

    render() {

      const slides = this.props.items.map((val,idx)=>{
        return <div key={ val.src }>
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
          onClickItem={this.handleClick}
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
