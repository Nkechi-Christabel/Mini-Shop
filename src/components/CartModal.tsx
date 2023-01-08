import { Dispatch } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { closeModal } from "../redux/features/modalSlice";
import { RootState } from "../redux/store";
import { Data, Products } from "../utils/types";
import { withRouter, Router } from "./WithRouter";

import {
  Checkout,
  CheckViewWrapper,
  H5,
  Modal,
  ModalItemsWrapper,
  OverlayTotal,
  ViewBag,
} from "./cartStyle";
import { calculateTotals } from "../redux/features/cartSlice";
import CartModalItems from "./CartModalItems";

interface IProps {
  data: Data;
  cartItems: Products[];
  dispatch: Dispatch;
  isOpen: boolean;
  router?: Router | undefined;
  currentCategoryName: string;
  currency: string;
  total: number;
}

class CartModal extends Component<IProps> {
  componentDidMount() {
    this.props.dispatch(calculateTotals(this.props.currency));
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      this.props.cartItems.map((item) => item) !==
      prevProps.cartItems.map((item) => item)
    ) {
      this.props.dispatch(calculateTotals(this.props.currency));
    }
  }

  render() {
    const {
      cartItems,
      dispatch,
      isOpen,
      currentCategoryName,
      router,
      total,
      currency,
    } = this.props;

    const qtyText = cartItems.length < 2 ? "Item" : "Items";

    const handleCheckout = () => {
      alert("Order Successfully placed");
      dispatch(closeModal());
      router?.navigate(`/${currentCategoryName}`);
    };

    return (
      <Modal isOpen={isOpen} onClick={() => dispatch(closeModal())}>
        <ModalItemsWrapper onClick={(e) => e.stopPropagation()}>
          <H5>
            <span>My bag,</span>
            {` ${cartItems.reduce((a, b) => a + b.quantity, 0)} ${qtyText}`}
          </H5>
          {cartItems.map((item) => (
            <CartModalItems key={item.id} item={item} />
          ))}

          <OverlayTotal className="flex">
            <span>Total:</span>
            <span>{`${currency}${total.toFixed(2)}`} </span>
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
  total: state.cart.total,
  currency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(withRouter(CartModal));
