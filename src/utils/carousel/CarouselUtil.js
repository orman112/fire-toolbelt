import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

class CarouselUtil extends Component {
  chunkArray() {
    const chunkSize = this.props.collection.length / this.props.groups;
    let tempArray = [];

    for (let i = 0; i < this.props.collection.length; i += chunkSize) {
      let chunk = this.props.collection.slice(i, i + chunkSize);
      tempArray.push(chunk);
    }

    return tempArray;
  }

  buildCarousel() {
    const chunkedArray = this.chunkArray();

    return chunkedArray.map((item, key) => (
      <Carousel.Item key={key}>
        <div className="row card-deck mb-3">
          {item.map((i, k) => (
            <div
              key={k}
              className={`card text-white ${
                this.props.onClickCallBack ? "clickable" : ""
              }`}
              onClick={() => this.props.onClickCallBack(i)}
            >
              <div className="card-header">{i.header}</div>
              <div className="card-body">
                <div className="card-title">
                  <strong>{i.title}</strong>
                </div>
                <p className="card-text">{i.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Carousel.Item>
    ));
  }

  render() {
    return (
      <Carousel indicators={false} controls={false} pauseOnHover={true}>
        {this.buildCarousel()}
      </Carousel>
    );
  }
}

export default CarouselUtil;
