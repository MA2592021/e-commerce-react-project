import React from "react";
import "./CategoriesSlider.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("allCategories", getCategories);

  return (
    <>
      <Slider {...settings}>
        {data?.data?.data.map((ele) => (
          <div key={ele._id}>
            <img height={300} className="w-100" src={ele.image} alt="" />
            <h4>{ele.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
