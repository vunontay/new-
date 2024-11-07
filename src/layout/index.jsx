import { Fragment } from "react";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";
import Header from '../components/header/header'
function MainLayout() {
  return (
    <Fragment>
      <Header />  
      <div className="App">
         <Outlet/>
        <Footer />
      </div>
    </Fragment>
  );
}

export default MainLayout;
