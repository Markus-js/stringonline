import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import LoginInformation from "../../components/LoginInformation/LoginInformation";
import { doFetch } from "../../helpers/helper";

import Style from "./Admin.module.scss";

const Admin = () => {
    const [productId, setProductId] = useState("");
    const [amount, setAmount] = useState("");
    // const [cart, setCart] = useState([]);

  // const fetchingData = async () => {
  //     const userData = JSON.parse(sessionStorage.getItem('token'))
  //     const url = `https://api.mediehuset.net/stringsonline/cart/28`;
  //     const fetchedData = await doFetch(url, 'GET', null, userData.access_token);
  //     setCart(fetchedData);
  // }

  // console.log(cart)
  const userData = JSON.parse(sessionStorage.getItem("token"));
  const fetchingData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        authorization: `Bearer ${userData.access_token}`,
      },
    };

    fetch("https://api.mediehuset.net/stringsonline/cart", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchingData();
  }, []);


  const sendData = async (e) => {
    e.preventDefault();
    console.log(productId)
    var urlencoded = new URLSearchParams();
    urlencoded.append("product_id", 221);
    urlencoded.append("quantity", 1);

    var requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
      headers: {
        authorization: `Bearer ${userData.access_token}`,
      },
    };

    fetch("https://api.mediehuset.net/stringsonline/cart/28", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <main className="main_divided">
        <form onSubmit={e => {sendData(e.target.value)}}>
        <input
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
              }}
              placeholder="product id"
            ></input>
            <button onClick={() => {sendData()}}>Send</button>
        </form>
      <aside className="aside">
        <LoginInformation />
      </aside>
    </main>
  );
};

export default Admin;
