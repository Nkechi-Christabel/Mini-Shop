import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { withRouter, Router } from "./WithRouter";
import { Data, Products } from "../utils/types";
import { closeModal } from "../redux/features/modalSlice";
import { calculateTotals, clearCart } from "../redux/features/cartSlice";

import { EmptyCartText, H2, Order, Quantity, Tax, Total } from "./cartStyle";
import { Button } from "./cartStyle";
import CartItems from "./CartItems";

interface IProps {
  data: Data;
  cartItems: Products[];
  dispatch: Dispatch;
  router?: Router | undefined;
  currentCategoryName: string;
  tax: number;
  total: number;
  currency: string;
}

class Cart extends Component<IProps> {
  componentDidMount() {
    this.props.dispatch(calculateTotals(this.props.currency));
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      this.props.cartItems.reduce((a, b) => a + b.quantity, 0) !==
      prevProps.cartItems.reduce((a: number, b: Products) => a + b.quantity, 0)
    ) {
      this.props.dispatch(calculateTotals(this.props.currency));
    }
  }
  render() {
    const dataDup = this.props.data;
    const {
      cartItems,
      currentCategoryName,
      router,
      dispatch,
      tax,
      total,
      currency,
    } = this.props;

    // const matchSelectedItemsToCartItems = selectedAttrItems.filter((item) =>
    //   cartItems.some((cartItem) => item.id === cartItem.id)
    // );

    const handleOrder = () => {
      alert("Order Successfully placed");
      dispatch(clearCart());
      dispatch(closeModal());
      router?.navigate(`/${currentCategoryName}`);
    };

    return (
      <div className="container padding">
        <H2>CART</H2>
        {cartItems.length === 0 ? (
          <EmptyCartText>
            <p>Your cart is currently empty.</p>
            <Link to="/all">
              <Button className="bg-primary">Go to shop</Button>
            </Link>
          </EmptyCartText>
        ) : (
          <>
            <div className="border-top">
              {cartItems.map((item) => (
                <CartItems key={item.id} item={item} dataDup={dataDup} />
              ))}
            </div>
            <Tax>
              Tax 21%: <span>{`${currency}${tax.toFixed(2)}`}</span>
            </Tax>
            <Quantity>
              Quantity:{" "}
              <span>{cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
            </Quantity>
            <Total>
              Total:
              <span>{`${currency}${total.toFixed(2)}`} </span>
            </Total>
            <Order className="bg-primary" onClick={() => handleOrder()}>
              ORDER
            </Order>
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  data: state.cart.data,
  cartItems: state.cart.cartItems,
  currentCategoryName: state.currencies.currentCategoryName,
  tax: state.cart.tax,
  total: state.cart.total,
  currency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(withRouter(Cart));
