import { Dispatch } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Params, NavigateFunction } from "react-router-dom";
import { RootState } from "../redux/store";
import * as DOMPurify from "dompurify";

import { withRouter } from "./WithRouter";
import { Data, Price, Products } from "../utils/types";
import {
  Button,
  Details,
  ImageBigWrapper,
  ImageSmallWrapper,
  ImageWrapper,
  ProductDetails,
} from "./productStyle";
import { addToCart } from "../redux/features/cartSlice";
import { ItemBrand, ItemName, Next, Prev, PrevNext } from "./cartStyle";
import Attribute from "./Attribute";

interface Router {
  location: Location;
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
}

interface IProps {
  data: Data;
  currency: string;
  dispatch: Dispatch;
  router?: Router | undefined;
}
interface State {
  index: number;
  counter: number;
  prev: boolean;
  next: boolean;
}

class ProductDescription extends Component<IProps, State> {
  state: State = {
    index: 0,
    counter: 0,
    prev: false,
    next: true,
  };

  render() {
    const { data, dispatch, currency, router } = this.props;

    const product = data?.category?.products.find(
      (item: Products) => item.id === router?.params?.id
    );

    const { inStock, gallery } = product as Products;

    let clean = DOMPurify.sanitize(product?.description as string);

    function createMarkup() {
      return { __html: clean };
    }

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

      if (counter > gallery?.length - 1) {
        this.setState({ counter: gallery?.length - 1 });
      }

      if (counter === gallery?.length - 1) {
        this.setState({ prev: true, next: false });
      }
    };

    const handleAddToCart = () => {
      dispatch(addToCart(product));
    };

    return (
      <ProductDetails className="container ">
        <ImageWrapper>
          <ImageSmallWrapper>
            {gallery.map((link, idx) => (
              <img
                src={link}
                alt={product?.name}
                key={idx}
                onClick={() => this.setState({ index: idx })}
                className={`image-small ${
                  this.state.index === idx ? "activeImage" : ""
                }`}
              />
            ))}
          </ImageSmallWrapper>
          <ImageBigWrapper className="relative">
            <img
              src={product?.gallery[this.state.index]}
              alt={product?.name}
              className="image-big"
            />
            <img
              src={product?.gallery[this.state.counter]}
              alt=""
              className="imageBigMobile"
            />
            <PrevNext className="prevNext">
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
          </ImageBigWrapper>
        </ImageWrapper>
        <Details>
          <ItemBrand>{product?.brand}</ItemBrand>
          <ItemName>{product?.name}</ItemName>

          {product?.attributes.map((attr) => (
            <Attribute attribute={attr} product={product} />
          ))}

          <p className="price">PRICE:</p>
          {product?.prices.map((price: Price, idx) =>
            currency[0] === price.currency.symbol[0] ? (
              <p
                className="amount"
                key={data?.category?.products[idx].name}
              >{`${price.currency.symbol}${price.amount}`}</p>
            ) : (
              ""
            )
          )}
          <Button
            type="submit"
            inStock={inStock}
            onClick={handleAddToCart}
            className="bg-primary"
          >
            Add to Cart
          </Button>
          <div
            className="productDesc"
            dangerouslySetInnerHTML={createMarkup()}
          />
        </Details>
      </ProductDetails>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: state.currencies.selectedCurrency,
  data: state.cart.data,
  cartItems: state.cart.cartItems,
});
export default connect(mapStateToProps)(withRouter(ProductDescription));
