import { Dispatch } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { closeModal } from "../redux/features/modalSlice";
import { RootState } from "../redux/store";
import { Data, Products } from "../utils/types";
import { withRouter, Router } from "./WithRouter";
import { resetSelectedItems } from "../redux/features/productDescriptionSlice";
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

interface IProps {
  data: Data;
  cartItems: Products[];
  dispatch: Dispatch;
  isOpen: boolean;
  router?: Router | undefined;
  currentCategoryName: string;
  selectedAttrItems: Products[];
}

class CartModal extends Component<IProps> {
  render() {
    const dataDup = this.props.data;
    const {
      cartItems,
      dispatch,
      isOpen,
      currentCategoryName,
      router,
      selectedAttrItems,
    } = this.props;

    const matchSelectedItemsToCartItems = selectedAttrItems.filter((item) =>
      cartItems.some((cartItem) => item.id === cartItem.id)
    );

    const qtyText = cartItems.length < 2 ? "Item" : "Items";

    let subTotal = cartItems
      .map((item) => item.prices.reduce((a, b) => a + b.amount, 0))
      .reduce((a, b) => a + b, 0);

    const tax = (subTotal * 21) / 100;
    const total = subTotal + tax;

    const handleCheckout = () => {
      if (matchSelectedItemsToCartItems.length === cartItems.length) {
        alert("Order Successfully placed");
        dispatch(clearCart());
        dispatch(closeModal());
        dispatch(resetSelectedItems());
        router?.navigate(`/${currentCategoryName}`);
      } else {
        alert("Please select attributes");
        dispatch(closeModal());
        router?.navigate(`/${currentCategoryName}`);
      }
    };

    return (
      <Modal isOpen={isOpen}>
        <ModalItemsWrapper>
          <H5>
            <span>My bag,</span>
            {` ${cartItems.reduce((a, b) => a + b.quantity, 0)} ${qtyText}`}
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
  currentCategoryName: state.currencies.currentCategoryName,
  selectedAttrItems: state.product.item,
});

export default connect(mapStateToProps)(withRouter(CartModal));
