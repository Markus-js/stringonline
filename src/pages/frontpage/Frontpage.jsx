import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ProductList from "../../components/productList/ProductList";
import ProductDetails from "../../components/productDetails/ProductDetails";
import ProductNav from "../../components/productNav/ProductNav";
import Style from "./productPage.module.scss";
import brandDetails from "../../components/brandDetails/brandDetails";

export default function ProductPage() {
  let { url } = useRouteMatch();
 
  return (
    <>
      <header className={Style.productHeader}>
        <h2></h2>
        <p>Lorem ipsum</p>
      </header>

      <section className={Style.productContainer}>
        <ProductNav />
      

      <Switch>
          {/* Redirect Route to start on /1 */}
        <Route exact path={url}>
          <Redirect to={`${url}`} />
        </Route>
        {/* Path  colon : listen for exact path :categoryId
                    let { url } = useRouteMatch()  - Saves the current url in {url}
                    url = `https://api/${categoryId}`
                    let { categoryId } = useParams();  - If path = url+params then route
                */}
        

        <Route exact path={`${url}/:category/:subCategory/:productId`} >
            <ProductList />
        </Route>
        <Route exact path={`${url}/:category/:subCategory/:productId/:productId`} >
            <ProductDetails />
        </Route>
        <Route exact path={`${url}/brand/:category/:brandId`} >
            <brandDetails />
        </Route>
      </Switch>
      {/* {`${url}/${category.title}/${sub.title}/${sub.id}`} */}
      </section>
    </>
  );
}
