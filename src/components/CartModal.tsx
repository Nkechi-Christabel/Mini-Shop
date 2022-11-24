import { Dispatch } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { closeModal } from "../redux/features/modalSlice";
import { RootState } from "../redux/store";
import { Data, Products } from "../utils/types";
import { withRouter } from "./WithRouter";
import { NavigateFunction } from "react-router-dom";

import CartModalItems from "./CartModalItems";
import {
  Checkout,
  CheckViewWrapper,
  H5,
  Modal,
  ModalItemsWrapper,
  OverlayTotal,
  ViewBag,
} from "./cartStyle";
import { clearCart } from "../redux/features/cartSlice";

interface Router {
  navigate: NavigateFunction;
}

interface IProps {
  data: Data;
  cartItems: Products[];
  dispatch: Dispatch;
  isOpen: boolean;
  size: string;
  colour: string;
  router?: Router | undefined;
  currentCategoryName: string;
}

class CartModal extends Component<IProps> {
  render() {
    const dataDup = this.props.data;
    const { cartItems, dispatch, isOpen, size, colour, currentCategoryName } =
      this.props;
    let subTotal = cartItems
      .map((item) => item.prices.reduce((a, b) => a + b.amount, 0))
      .reduce((a, b) => a + b, 0);

    const tax = (subTotal * 21) / 100;
    const total = subTotal + tax;

    const handleCheckout = () => {
      if (size === "" || colour === "") {
        setTimeout(() => {
          alert("Please select all attributes");
        }, 2000);

        this.props.router?.navigate(`/${currentCategoryName}`);
      } else {
        setTimeout(() => {
          alert("Please select attributes");
        }, 1000);
        this.props.router?.navigate(`${currentCategoryName}`);
      }
      dispatch(closeModal());
      dispatch(clearCart());
    };

    return (
      <Modal isOpen={isOpen}>
        <ModalItemsWrapper>
          <H5>
            <span>My bag,</span>
            {` ${cartItems.reduce((a, b) => a + b.quantity, 0)}`} Items
          </H5>
          {cartItems.map((item) => (
            <CartModalItems key={item.id} item={item} dataDup={dataDup} />
          ))}

          <OverlayTotal className="flex">
            <span>Total:</span>
            <span>{`$${total.toFixed(2)}`} </span>
          </OverlayTotal>
          <CheckViewWrapper className="flex">
            <Link to="/cart">
              <ViewBag onClick={() => dispatch(closeModal())}>VIEW BAG</ViewBag>
            </Link>
            <Checkout className="bg-primary" onClick={() => handleCheckout()}>
              CHECKOUT
            </Checkout>
          </CheckViewWrapper>
        </ModalItemsWrapper>
      </Modal>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  data: state.cart.data,
  cartItems: state.cart.cartItems,
  isOpen: state.modal.isOpen,
  size: state.cart.size,
  colour: state.cart.colour,
  currentCategoryName: state.currencies.currentCategoryName,
});

export default connect(mapStateToProps)(withRouter(CartModal));
