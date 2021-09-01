import React, { useState, useEffect } from "react";
import Style from "./productList.module.scss";
import { useRouteMatch } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { doFetch } from "../../helpers/helper";
import { Markup } from "interweave";

export default function ProductList() {
  let { url } = useRouteMatch();
  let { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    const getProductDetailts = async () => {
      let url = `https://api.mediehuset.net/stringsonline/products/group/${productId}`;
      let res = await doFetch(url);
      setProduct(res);
    };
    getProductDetailts();
  }, [productId]);

  function handleSelectChange(value) {
    setBrand(value);
  }
  /**
   *  Rotate images 270deg if they includes key value of:
   *    Returns an boolean to declared variable rotate
   *        if true set Style to rotate
   */
  let rotate;
  if (product.group) {
    let group = Object.values(product.group);
    let includesValue =
      group.includes("Elguitarer") ||
      group.includes("Westernguitarer") ||
      group.includes("Elbasser") ||
      group.includes("Banjo") ||
      group.includes("Mandolin") ||
      group.includes("Ukulele") ||
      group.includes("Akustiske basser");

    if (!includesValue) {
      rotate = false;
    }
    if (includesValue) {
      rotate = true;
    }
  }

  return product.products ? (
    <section className={Style.product}>
      <select
        onChange={(e) => {
          handleSelectChange(e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="Taylor">Taylor</option>
        <option value="Akai">Akai</option>
        <option value="Cort">Cort</option>
        <option value="Epiphone">Epiphone</option>
        <option value="Everdeen">Everdeen</option>
        <option value="Fender">Fender</option>
        <option value="Furch">Furch</option>
        <option value="Gibson">Gibson</option>
        <option value="Guild">Guild</option>
        <option value="Ibanez">Ibanez</option>
        <option value="Martin">Martin</option>
        <option value="Musicman">Musicman</option>
        <option value="Roland">Roland</option>
        <option value="Roli">Roli</option>
        <option value="Supreme">Supreme</option>
        <option value="Yamaha">Yamaha</option>
      </select>
      {product.products.map((product) => {
        if (product.brand.includes("")) {
          if (!product.brand.includes(brand)) {
            return null;
          }
        }
        return (
          <Link key={product.id} to={`${url}/${product.id}`}>
            <div className={Style.product__card}>
              <div className={Style.product__card__img}>
                <img
                  className={rotate ? Style.rotate : null}
                  src={product.image_fullpath}
                  alt={product.title}
                />
              </div>
              <div className={Style.product__card__decs}>
                <h2>{product.name} </h2>
                <h3>{product.brand} </h3>
                <p>
                  <Markup
                    content={product.description_short}
                    className="convertPureHTML"
                  />
                  <span>Læs mere</span>
                </p>
              </div>
              <div className={Style.product__card__action}>
                <h3>Pris: DKK {product.price}</h3>
                <button className="btn btn__cart">Læg i kurv</button>
                <p>{product.stock}+ på lager</p>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  ) : (
    <p>Siden indlæses...</p>
  );
}
