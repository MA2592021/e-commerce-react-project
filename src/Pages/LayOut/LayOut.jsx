import React, { useContext, useEffect } from "react";
import "./LayOut.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { UserContext } from "../../Context/UserContext";
import { Toaster } from "react-hot-toast";

export default function LayOut() {
  const { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <div style={{ marginBottom: "80px" }}>
        <Navbar />
      </div>
      <Outlet></Outlet>
      <Toaster />
      <Footer />
    </>
  );
}
