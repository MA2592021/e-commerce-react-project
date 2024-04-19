import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState({});
  const [loading, setLoading] = useState(true);
  let {
    getCart,
    deleteProductFromCart,
    updateProductQuantity,
    setNumOfCartItems,
  } = useContext(CartContext);

  async function removeItem(id) {
    let { data } = await deleteProductFromCart(id);
    setNumOfCartItems(data.numOfCartItems);
    setCartDetails(data);
    // console.log(data);
  }

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    {
      data.data.products.map((ele) => {
        if (ele.count == 0) {
          removeItem(ele.product._id);
        }
      });
    }

    setCartDetails(data);
  }

  async function getCartDetails() {
    let { data } = await getCart();
    setLoading(false);
    if (data?.numOfCartItems) {
      setNumOfCartItems(data?.numOfCartItems);
      setCartDetails(data);
    } else {
      console.log(data);
      setNumOfCartItems(0);
    }

    //  console.log(data);
  }

  useEffect(() => {
    getCartDetails();
  }, []);
  return (
    <>
      {cartDetails?.data ? (
        <div className="container my-5">
          <div className="mx-auto bg-main-light p-5">
            <h1 className="mb-4">Cart Shop</h1>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="h5">
                Total Price :{" "}
                <span className="text-main">
                  {cartDetails.data.totalCartPrice} EGP
                </span>
              </h3>

              <h3 className="h5">
                Total Cart Items :{" "}
                <span className="text-main">{cartDetails.numOfCartItems}</span>
              </h3>
            </div>
            {cartDetails.data.products.map((ele) => (
              <div key={ele.product._id} className="row py-2 border-bottom">
                <div className="col-md-1">
                  <img src={ele.product.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-11">
                  <div className="d-flex justify-content-between">
                    <div className="left-side">
                      <h4>{ele.product.title}</h4>
                      <p>{ele.price}EGP</p>
                    </div>
                    <div className="right-side">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          updateCount(ele.product._id, ele.count - 1)
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">{ele.count}</span>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          updateCount(ele.product._id, ele.count + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(ele.product._id)}
                    className="btn text-danger p-0"
                  >
                    <i className="fa fa-trash-can"></i>
                    remove
                  </button>
                </div>
              </div>
            ))}

            <Link
              className="btn bg-main text-white w-100 mt-5"
              to={"/checkout"}
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        !loading && (
          <>
            <div className="container my-5">
              <div className="mx-auto bg-main-light p-5">
                <h1 className="mb-4">Cart Shop</h1>
                <div className="d-flex  justify-content-center align-items-center">
                  <h3>Your Cart Is Empty</h3>
                </div>
              </div>
            </div>{" "}
          </>
        )
      )}

      {loading && (
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
      )}
    </>
  );
}
