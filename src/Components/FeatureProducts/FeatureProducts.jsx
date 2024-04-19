import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function FeatureProducts() {
  let { addToCart, setNumOfCartItems } = useContext(CartContext);

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading } = useQuery("featuredProducts", getProducts);
  //  console.log(data?.data?.data);

  //   const [allProducts, setAllProducts] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);
  //   async function getAllProducts() {
  //     let { data } = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/products"
  //     );

  //     setAllProducts(data.data);
  //     setIsLoading(false);
  //   }

  //   useEffect(() => {
  //     getAllProducts();
  //   }, []);

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

  return (
    <>
      <div className="container py-5">
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
          <div className="row">
            {data?.data?.data.map((ele) => (
              <div key={ele.id} className="col-md-2">
                <div className="product px-2 py-3">
                  <Link
                    className="text-decoration-none text-black"
                    to={"details/" + ele.id}
                  >
                    <img
                      src={ele.imageCover}
                      className="w-100"
                      alt={ele.title}
                    />
                    <p className="text-main">{ele.category.name}</p>
                    <h3 className="h6">
                      {ele.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <p>{ele.price}EGP</p>
                      <p>
                        <i className="fa fa-star rating-color"></i>
                        {ele.ratingsAverage}
                      </p>
                    </div>
                  </Link>

                  <button
                    onClick={() => addCart(ele.id)}
                    className="btn bg-main text-white w-100"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
