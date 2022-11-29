import React, { Component } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { RiDeleteBin3Line } from "react-icons/ri";

import { Products, Price } from "../utils/types";

import {
  ItemName,
  ModalItem,
  ModalDetails,
  ModalImage,
  IncreaseDecreaseModal,
  ModalItemBrand,
  ModalImageQuantityWrapper,
  ModalImageWrapper,
} from "./cartStyle";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../redux/features/cartSlice";
import Attribute from "./Attribute";

interface IProps {
  item: Products;
  currency: string;
  dispatch: Dispatch;
}

interface State {
  counter: number;
}

class CartModalItems extends Component<IProps, State> {
  state: State = {
    counter: 0,
  };
  render() {
    const { dispatch, currency, item } = this.props;
    const { prices, attributes, name, gallery, brand } = item;

    return (
      <>
        <ModalItem>
          <ModalDetails>
            <ModalItemBrand>{brand}</ModalItemBrand>
            <ItemName>{name}</ItemName>
            {prices.map((price: Price, idx) =>
              currency[0] === price.currency.symbol[0] ? (
                <p className="price" key={item.id}>{`${
                  price.currency.symbol
                }${price.amount.toFixed(2)}`}</p>
              ) : (
                ""
              )
            )}
            {attributes.map((attr) => (
              <Attribute attribute={attr} key={attr.id} product={item} />
            ))}
            <RiDeleteBin3Line
              className="deleteIcon"
              onClick={() => dispatch(removeItem(item))}
            />
          </ModalDetails>
          <ModalImageQuantityWrapper>
            <IncreaseDecreaseModal>
              <span
                className="increase"
                onClick={() => dispatch(increaseQuantity(item))}
              >
                +
              </span>
              <span className="quantity">{item.quantity}</span>
              <span
                className="decrease"
                onClick={() => {
                  dispatch(decreaseQuantity(item));
                }}
              >
                -
              </span>
            </IncreaseDecreaseModal>
            <ModalImageWrapper>
              <ModalImage src={gallery[0]} alt={item.name} />
            </ModalImageWrapper>
          </ModalImageQuantityWrapper>
        </ModalItem>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(CartModalItems);
