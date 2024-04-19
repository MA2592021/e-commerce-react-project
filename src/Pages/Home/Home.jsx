import React from "react";
import "./Home.module.css";
import FeatureProducts from "../../Components/FeatureProducts/FeatureProducts";
import CategoriesSlider from "../../Components/CategoriesSlider/CategoriesSlider";
import MainSlider from "../../Components/MainSlider/MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <FeatureProducts />
    </div>
  );
}
