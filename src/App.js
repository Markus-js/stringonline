

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Frontpage from './pages/frontpage/Frontpage';
import { Navigation } from './components/navigation/Navigation';
import LoginPage from './pages/loginPage/LoginPage';
import Footer from "./components/footer/Footer";
import BrandPage from "./pages/brandPage/BrandPage";
import Admin from "./pages/admin/Admin"


function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/frontpage">
          <Frontpage />
        </Route>
        <Route path="/brandpage">
          <BrandPage />
        </Route>
        <Route path="/loginpage">
          <LoginPage />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route exact path="/">
          <Redirect to="/frontpage"></Redirect>
        </Route>
        {/* skal være i bunden ellers rammer path den samme / */}
        <Route path="/">
          <h2>404 siden findes ikke</h2>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
