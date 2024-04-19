import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data } = useQuery("allCategories", getCategories);
  console.log(data?.data?.data);
  return (
    <div className="row">
      {data?.data?.data.map((category) => (
        <div className="col-md-4 gy-3">
          <div className="card ">
            <img
              height={450}
              src={category.image}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-text text-center">{category.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
