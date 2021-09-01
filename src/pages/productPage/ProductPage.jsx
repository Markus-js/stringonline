import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ProductDetails from "../../components/productDetails/ProductDetails";
import ProductList from "../../components/productList/ProductList";
import ProductNav from "../../components/productNav/ProductNav";
import Style from "./productPage.module.scss";

export default function ProductPage() {
  let { url } = useRouteMatch();

  return (
    <>
      <header className={Style.productHeader}>
        <h2>Vores elskede bagværk</h2>
        <p>Lorem ipsum</p>
      </header>

      <section className={Style.productContainer}>
        <ProductNav />
      

      <Switch>
          {/* Redirect Route to start on /1 */}
        <Route exact path={url}>
          <Redirect to={`${url}/morgenbrød/1`} />
        </Route>
        {/* Path  colon : listen for exact path :categoryId
                    let { url } = useRouteMatch()  - Saves the current url in {url}
                    url = `https://api/${categoryId}`
                    let { categoryId } = useParams();  - If path = url+params then route
                */}
        <Route exact path={`${url}/:name/:categoryId`}>
          <ProductList />
        </Route>

        <Route exact path={`${url}/:name/:categoryId/:productId`} >
            <ProductDetails />
        </Route>
      </Switch>
      </section>
    </>
  );
}
