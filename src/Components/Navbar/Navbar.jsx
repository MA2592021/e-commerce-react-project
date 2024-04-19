import React, { useContext } from "react";
import "./Navbar.module.css";
import logo from "./../../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);
  let { numOfCartItems } = useContext(CartContext);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
    window.location.reload();
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid px-5">
        <Link to={""} className="navbar-brand">
          <img src={logo} className="w-100" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userToken && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link to={""} className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/products"} className="nav-link">
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/categories"} className="nav-link">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/brands"} className="nav-link">
                  Brands
                </Link>
              </li>
            </ul>
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <div className="socialMedia">
              <i className="mx-2 fab fa-facebook"></i>
              <i className="mx-2 fab fa-youtube"></i>
              <i className="mx-2 fab fa-twitter"></i>

              <i className="mx-2 fab fa-tiktok"></i>
            </div>

            {userToken ? (
              <>
                {" "}
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    LogOut
                  </span>
                </li>
                <li className="nav-item position-relative">
                  <Link to={"/cart"} className="nav-link">
                    <i className="fa fa-shopping-cart"></i>
                    {numOfCartItems > 0 && (
                      <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-success">
                        {numOfCartItems}
                      </span>
                    )}
                  </Link>
                </li>{" "}
              </>
            ) : (
              <>
                {" "}
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"register"}
                    className="nav-link"
                    aria-disabled="true"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
