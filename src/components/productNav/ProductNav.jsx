import React, { useState, useEffect } from "react";
import { doFetch } from "../../helpers/helper";
import { Link, NavLink, Switch, useRouteMatch} from 'react-router-dom'
import Style from "./productNav.module.scss"
import Brands from "../navigation/brands/Brands";

export default function ProductNav() {

  // Takes the current url
  let { url } = useRouteMatch()  
  const [prodList, setProdList] = useState([]);

  const getProdList = async () => {
    let url = "https://api.mediehuset.net/stringsonline/productgroups";
    let res = await doFetch(url);
    setProdList(res);
  };

  useEffect(() => {
    getProdList();
  }, []);

  console.log(prodList);
  return (
    
    <nav className={Style.productNav} >
      {prodList.items
        ? prodList.items.map((category, index) => {
            return (
                // URL/ID 
                <NavLink  key={index} to={`${url}/${category.title}`}>{category.title}
                    {category.subgroups.map((sub, index) => {
                      return (
                        <Switch>
                          <Link to={`${url}/${category.title}/${sub.title}/${sub.id}`} key={index} >
                          {sub.title}
                        </Link>
                        </Switch>
                      )
                    })}
                </NavLink>
            );
          })
        : <p>Siden indlæses...</p>}
        <Brands />
    </nav>
  );
}
