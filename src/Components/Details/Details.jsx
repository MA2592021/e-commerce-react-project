import React, { useContext, useEffect, useState } from "react";
import "./Details.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Details() {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { addToCart ,setNumOfCartItems } = useContext(CartContext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let params = useParams();

  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    setDetails(data.data);
    setIsLoading(false);
  }

  async function addCart(id) {
    let res = await addToCart(id);
    // console.log("hello from add to cart");
    if (res.data.status == "success") {
      toast.success("Product Added Successfully");
      setNumOfCartItems(res.data.numOfCartItems);
    } else {
      toast.error("Product Can Not Added To The Cart");
    }
  }

  useEffect(() => {
    getProductDetails(params.id);
  }, []);

  // let { data, isLoading } = useQuery("details", () =>
  //   getProductDetails(params.id)
  // );
  // console.log(data);
  return (
    <>
      <div className="container">
        {isLoading ? (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass={"justify-content-center"}
            visible={true}
          />
        ) : (
          <div className="row align-items-center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{details.title}</title>
               
            </Helmet>
            <div className="col-md-4">
              <Slider {...settings}>
                {details.images.map((ele, index) => (
                  <img key={index} src={ele} alt="" />
                ))}
              </Slider>
            </div>

            <div className="col-md-8">
              <h2>{details.title}</h2>
              <p>{details.description}</p>
              <p>{details.category.name}</p>
              <div className="d-flex justify-content-between">
                <h5>{details.price} EGP</h5>
                <h5>
                  <i className="fa fa-star rating-color"></i>{" "}
                  {details.ratingsAverage}
                </h5>
              </div>
              <button
                onClick={() => addCart(details.id)}
                className="btn bg-main w-100 text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
