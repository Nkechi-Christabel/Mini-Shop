import React, { Component } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { RiDeleteBin3Line } from "react-icons/ri";
import { Products, Price, Data } from "../utils/types";
import { v4 as uuid } from "uuid";
import {
  CartDetails,
  ImageQuantityWrapper,
  CartImageWrapper,
  CartItem,
  Image,
  IncreaseDecreaseWrapper,
  Next,
  Prev,
  PrevNext,
  ItemBrand,
  ItemName,
} from "./cartStyle";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../redux/features/cartSlice";
import Attribute from "./Attribute";

interface IProps {
  item: Products;
  dataDup: Data;
  currency: string;
  dispatch: Dispatch;
}

export interface SlideState {
  counter: number;
  prev: boolean;
  next: boolean;
}

class CartItems extends Component<IProps, SlideState> {
  state: SlideState = {
    counter: 0,
    prev: true,
    next: true,
  };
  render() {
    const { dispatch, currency, item } = this.props;
    const { prices, attributes, name, gallery, brand } = item;
    let { counter, prev, next } = this.state;

    const handlePrev = () => {
      this.setState({ counter: (counter -= 1) });
      if (counter < 0) {
        this.setState({ counter: 0 });
      }
      if (counter === 0) {
        this.setState({ prev: false, next: true });
      }
    };

    const handleNext = () => {
      this.setState({ counter: (counter += 1) });

      if (counter > gallery.length - 1) {
        this.setState({ counter: gallery.length - 1 });
      }

      if (counter === gallery.length - 1) {
        this.setState({ prev: true, next: false });
      }
    };

    return (
      <CartItem>
        <CartDetails>
          <ItemBrand>{brand}</ItemBrand>
          <ItemName>{name}</ItemName>
          {prices.map((price: Price) =>
            currency[0] === price.currency.symbol[0] ? (
              <p className="price" key={uuid()}>{`${
                price.currency.symbol
              }${price.amount.toFixed(2)}`}</p>
            ) : (
              ""
            )
          )}
          {attributes.map((attr) => (
            <Attribute attribute={attr} key={attr.id} />
          ))}

          <RiDeleteBin3Line
            className="deleteIcon"
            onClick={() => dispatch(removeItem(item))}
          />
        </CartDetails>
        <ImageQuantityWrapper>
          <IncreaseDecreaseWrapper>
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
          </IncreaseDecreaseWrapper>
          <CartImageWrapper>
            <Image src={gallery[counter]} alt={item.name} />
            <PrevNext>
              <Prev
                onClick={handlePrev}
                className={`${prev ? "active" : "disabled"}`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="24"
                    height="24"
                    fill="black"
                    fillOpacity="0.73"
                  />
                  <path
                    d="M14.25 6.06857L8.625 11.6876L14.25 17.3066"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Prev>
              <Next
                onClick={handleNext}
                className={`${next ? "active" : "disabled"}`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="24"
                    height="24"
                    transform="matrix(-1 0 0 1 24 0)"
                    fill="black"
                    fillOpacity="0.73"
                  />
                  <path
                    d="M9.75 6.06857L15.375 11.6876L9.75 17.3066"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Next>
            </PrevNext>
          </CartImageWrapper>
        </ImageQuantityWrapper>
      </CartItem>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(CartItems);
