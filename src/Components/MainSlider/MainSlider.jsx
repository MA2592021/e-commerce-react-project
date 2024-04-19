import React from "react";
import "./MainSlider.module.css";
import mainImg1 from "../../assets/images/slider/cute-beauty-composition.jpg";
import mainImg2 from "../../assets/images/slider/full-shot-woman-online-shopping.jpg";
import mainImg3 from "../../assets/images/slider/online-fashion-shopping-with-tablet.jpg";
import mainImg4 from "../../assets/images/slider/top-view-pink-bath-products.jpg";
import mainImg5 from "../../assets/images/slider/grocery-cart-with-colourful-gift-boxes.jpg";

import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return (
    <>
      <div className="container my-5">
        <div className="row gx-0">
          <div className="col-md-9">
            <Slider {...settings}>
              <img height={400} src={mainImg3} className="w-100" alt="" />

              <img height={400} src={mainImg2} className="w-100" alt="" />

              <img height={400} src={mainImg5} className="w-100" alt="" />
            </Slider>
          </div>

          <div className="col-md-3">
            <img height={200} src={mainImg1} className="w-100" alt="" />
            <img height={200} src={mainImg4} className="w-100" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
