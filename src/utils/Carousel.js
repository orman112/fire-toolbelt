import React, { Component } from 'react';

class Carousel extends Component {
    createCarousel() {
        return this.props.collection.map((item, key) =>
            <div key={item.header} className="carousel-item active">
                <div className='d-block col-4 img-fluid'>
                    <div className="card-header">{item.header}</div>
                    <div className="card-body">
                        <strong className="card-title">{item.title}</strong>
                        <p className="card-text">{item.text}</p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                    {
                        this.createCarousel()
                    }
                </div>
            </div>
        )
    }
}

export default Carousel;