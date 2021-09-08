import React, { useEffect, useState } from "react";
import { doFetch } from "../../../helpers/helper";

import { Link, NavLink, useRouteMatch } from "react-router-dom";
export default function Brands() {
  // Takes the current url
  let { url } = useRouteMatch();
  const [brand, setBrand] = useState([]);

  const getProdList = async () => {
    let url = "https://api.mediehuset.net/stringsonline/brands";
    let res = await doFetch(url);
    setBrand(res);
  };

  useEffect(() => {
    getProdList();
  }, []);

  console.log(brand);

  return (
    <>
      {brand.items ? (
        brand.items.map((b, index) => {
          return (
              <Link to={`${url}/brands/brand/${b.title}/${b.id}`} key={index}>
              {b.title}
              </Link>
          );
        })
      ) : (
        <p>Siden indlæses...</p>
      )}
      </>
  );
}
