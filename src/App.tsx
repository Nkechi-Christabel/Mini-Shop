import React from "react";
import { GlobalStyle } from "./components/globalStyle";

import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductListing from "./components/ProductListing";
import Cart from "./components/Cart";
import ProductDescription from "./components/ProductDescription";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import CartModal from "./components/CartModal";

const App = () => {
  const { currentCategoryName } = useSelector(
    (state: RootState) => state.currencies
  );

  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Header />
        <CartModal />
        <Routes>
          <Route
            path={`/${currentCategoryName}`}
            element={<ProductListing />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path={`/${currentCategoryName}/product-description/:id`}
            element={<ProductDescription />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
