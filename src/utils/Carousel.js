import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

class CarouselUtil extends Component {
    chunkArray() {
        const chunkSize = this.props.collection.length / this.props.groups;
        let tempArray = [];
        console.log('chunk size: ', chunkSize);

        for (let i = 0; i < this.props.collection.length; i += chunkSize) {
            let chunk = this.props.collection.slice(i, i + chunkSize);
            tempArray.push(chunk);
        }

        console.log('chunks: ', tempArray);
        return tempArray;
    }

    buildCarousel() {
        const chunkedArray = this.chunkArray();

        return chunkedArray.map((item, key) =>
            <Carousel.Item>
                <div className='row'>
                    {item.map((i, k) =>
                        <div key={k} className='d-block col'>
                            <div className="card-header">{i.header}</div>
                            <div className="card-body">
                                <Carousel.Caption>
                                    <strong className="card-title">{i.title}</strong>
                                    <p className="card-text">{i.text}</p>
                                </Carousel.Caption>
                            </div>
                        </div>
                    )}
                </div>
            </Carousel.Item>
            /* <div key={key} className={`carousel-item ${key <= 0 ? "active" : ""}`}> */
        )
    }

    render() {
        return (
            <Carousel>
                {
                    this.buildCarousel()
                }
            </Carousel>

            // <div id="carousel" className="carousel slide" data-ride="carousel">
            //     <div className="carousel-inner" role="listbox">
            //         {
            //             this.buildCarousel()
            //         }
            //     </div>

            //     <div className="controls-top">
            //         <a className="btn-floating" href="#carousel" data-slide="prev">
            //             <FontAwesomeIcon icon={ faChevronCircleLeft } />
            //         </a>
            //         <a className="btn-floating" href="#carousel" data-slide="next">
            //             <FontAwesomeIcon icon={ faChevronCircleRight } />
            //         </a>
            //     </div>
            // </div>
        )
    }
}

export default CarouselUtil;