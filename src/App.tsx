import React, { Component } from "react";
import { GlobalStyle } from "./components/globalStyle";

import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductListing from "./components/ProductListing";
import Cart from "./components/Cart";
import ProductDescription from "./components/ProductDescription";
import { RootState } from "./redux/store";
import { connect } from "react-redux";
import CartModal from "./components/CartModal";

interface IProps {
  currentCategoryName: string;
}

class App extends Component<IProps> {
  render() {
    const { currentCategoryName } = this.props;
    return (
      <div className="App">
        <GlobalStyle />
        <Router>
          <Header />
          <CartModal />
          <Routes>
            <Route path={"/"} element={<ProductListing />} />
            <Route
              path={`/${currentCategoryName}`}
              element={<ProductListing />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path={`/${currentCategoryName}/product-description/:id`}
              element={<ProductDescription />}
            />
            <Route
              path={"/product-description/:id"}
              element={<ProductDescription />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currentCategoryName: state.currencies.currentCategoryName,
});

export default connect(mapStateToProps)(App);
