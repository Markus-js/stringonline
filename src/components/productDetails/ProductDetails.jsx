import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doFetch } from "../../helpers/helper";
import Style from "./productDetails.module.scss";
import { Markup } from "interweave";

export default function ProductDetails() {
  let { productId } = useParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    const getProductDetails = async () => {
      let url = `https://api.mediehuset.net/stringsonline/products/${productId}`;
      let res = await doFetch(url);
      setProduct(res.item);
    };
    getProductDetails();
  }, [productId]);

  return product ? (
    <section className={Style.product}>
      <div className={Style.product__card}>
        <div className={Style.product__card__imgContainer}>
          {/* FIX  map dur ikke  */}

          {product.gallery.lenght ? (
            product.gallery.map((p) => {
              return (
                <div className={Style.product__card__imgContainer__box}>
                  <img src={p.fullpath} alt={p.filename} />;
                </div>
              );
            })
          ) : (
            <div className={Style.product__card__imgContainer__img}>
              <img src={product.image.fullpath} alt={product.image.fullname} />
            </div>
          )}
        </div>
        <div className={Style.product__card__decs}>
          <h2>{product.name} </h2>
          <h3>{product.brand} </h3>
          <p>
            <Markup
              content={product.description_long}
              className="convertPureHTML"
            />
          </p>
        </div>
        <div className={Style.product__card__action}>
          <div className={Style.product__card__action__img}>
            <img src={product.brand_image} alt={product.brand} />
          </div>
          <h3>Pris: DKK {product.price}</h3>
          <button className="btn btn__cart">Læg i kurv</button>
          <p>{product.stock}+ på lager</p>
          <p>{product.rating} </p>
        </div>
      </div>
    </section>
  ) : (
    <p>Siden indlæses...</p>
  );
}
