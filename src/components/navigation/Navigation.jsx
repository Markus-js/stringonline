import { Link } from "react-router-dom";
import Style from "./navigation.module.scss";
import arrow from "../../assets/images/arrow.svg";
import cart from "../../assets/images/cart-icon.svg";
import mail from "../../assets/images/mail-icon.svg";
import phone from "../../assets/images/phone-icon.svg";

export function Navigation() {
  return (
    <header className={Style.container}>
      <div className={Style.header__contact}>
        <div className={Style.header__contact__col}>
          <div className={Style.header__contact__col__imgContainer}>
            <img src={mail} alt="email" />
          </div>
          <a href="mailto:sales@stringonline.com">SALES@STRINGSONLINE.COM</a>
        </div>
        <div className={Style.header__contact__col}>
          <div className={Style.header__contact__col__imgContainerTwo}>
            <img src={phone} alt="phone" />
          </div>
          <a href="phoneto:4598122268">+45 98 12 22 68</a>
        </div>
        <div className={Style.header__contact__col}>
          <Link href="/">
            <img className={Style.cart} src={cart} alt="cart" />
          </Link>
        </div>
      </div>

      <div className={Style.header}>
        <nav className={Style.header__navbar}>
          <ul>
            <li>
              <Link to="/frontpage">Forside</Link>
            </li>
            <li>
              <Link to="/productpage">Salgs- og handelbetingelser</Link>
            </li>
            <li>
              <Link to="/loginpage">Login</Link>
            </li>
          </ul>
        </nav>
        <div className={Style.header__search}>
          <input placeholder="Indtast søgeord" />
          <button className="btn btn__header">
            <img src={arrow} alt="search" />
          </button>
        </div>
      </div>
    </header>
  );
}
