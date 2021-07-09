import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./page1/home";
import Places from "./page2/places";
// import Places from "./page2/places";
import Details from "./page3/details";
import Header from "./header";
// import secondRouter from "./secondRouter"

const Router = function () {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/places" component={Places} />
      <Route path="/details" component={Details} />
    </BrowserRouter>
  );
};
export default Router;
