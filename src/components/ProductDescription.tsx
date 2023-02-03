import React, { Component } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { Params, NavigateFunction } from "react-router-dom";
import { RootState } from "../redux/store";
import * as DOMPurify from "dompurify";
import { withRouter } from "./WithRouter";
import { Data, Price, Products, Attributes, Items } from "../utils/types";
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
  cartItems: Products[];
  dispatch: Dispatch;
  router?: Router | undefined;
}
export interface State {
  index: number;
  counter: number;
  prev: boolean;
  next: boolean;
  selectAttrProduct: {
    product?: Products;
    size?: string;
    color?: string;
  };
  attributeName: string;
}

class ProductDescription extends Component<IProps, State> {
  state: State = {
    index: 0,
    counter: 0,
    prev: false,
    next: true,
    selectAttrProduct: {},
    attributeName: "",
  };

  render() {
    const { data, dispatch, currency, router } = this.props;

    let { counter, prev, next, selectAttrProduct, attributeName } = this.state;

    let product = data?.category?.products.find(
      (item: Products) => item?.id === router?.params?.id
    ) as Products;

    const newProduct = {
      ...product,
      attributes: product?.attributes.map((attr: Attributes, i) => {
        return {
          ...attr,
          selectedSize:
            attributeName === attr.name && attr.type === "text"
              ? selectAttrProduct.size
              : selectAttrProduct.product?.attributes[i].selectedSize,
          selectedColor:
            attributeName === attr.name && attr.type === "swatch"
              ? selectAttrProduct.color
              : selectAttrProduct.product?.attributes[i].selectedColor,
          items: attr.items.map((item: Items) => {
            return {
              ...item,
              id: `${attr.name}${item.id}`,
            };
          }),
        };
      }),
    };

    const handleSelectedProduct = (
      color: string | undefined,
      size: string | undefined,
      attrName: string
    ) => {
      this.setState({
        selectAttrProduct: {
          product: { ...newProduct },
          size,
          color,
        },
        attributeName: attrName,
      });
    };

    const { inStock, gallery } = newProduct;

    let clean = DOMPurify.sanitize(newProduct?.description as string);

    function createMarkup() {
      return { __html: clean };
    }

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
      if (
        newProduct.attributes.some(
          (attr) =>
            attr.selectedSize === undefined && attr.selectedColor === undefined
        )
      ) {
        alert("Please select attributes");
      } else {
        dispatch(addToCart(newProduct));
      }
    };

    return (
      <ProductDetails className="container ">
        <ImageWrapper>
          <ImageSmallWrapper>
            {gallery?.map((link, idx) => (
              <img
                src={link}
                alt={newProduct?.name}
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
              src={newProduct?.gallery[this.state.index]}
              alt={newProduct?.name}
              className="image-big"
            />
            <img
              src={newProduct?.gallery[this.state.counter]}
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
          <ItemBrand>{newProduct?.brand}</ItemBrand>
          <ItemName>{newProduct?.name}</ItemName>

          {newProduct?.attributes.map((attr) => (
            <Attribute
              key={attr.id}
              attribute={attr}
              setAttribute={handleSelectedProduct}
              selectedProduct={selectAttrProduct}
            />
          ))}

          <p className="price">PRICE:</p>
          {newProduct?.prices.map((price: Price, idx) =>
            currency[0] === price.currency.symbol[0] ? (
              <p
                className="amount"
                key={idx}
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
