import { Dispatch } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Params, NavigateFunction } from "react-router-dom";
import { RootState } from "../redux/store";
import * as DOMPurify from "dompurify";
import { withRouter } from "./WithRouter";
import { Data, Items, Price, Products } from "../utils/types";
import {
  Button,
  Details,
  // DisplaySuccess,
  ImageBigWrapper,
  ImageSmallWrapper,
  ImageWrapper,
  ProductDetails,
  // ProductDetailsName,
} from "./productStyle";
import // selectedColour,
// selectedSize,
"../redux/features/productDescriptionSlice";
import { addToCart } from "../redux/features/cartSlice";
import { ItemBrand, ItemName } from "./cartStyle";
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
  // size: string;
  // colour: string;
  success?: boolean;
  router?: Router | undefined;
}
interface State {
  index: number;
  clicked: boolean;
}

class ProductDescription extends Component<IProps, State> {
  state: State = {
    index: 0,
    clicked: false,
  };

  render() {
    const { data, dispatch, currency, success, router } = this.props;

    const product = data?.category?.products.find(
      (item: Products) => item.id === router?.params?.id
    );

    const inStock = product?.inStock as boolean;

    let clean = DOMPurify.sanitize(product?.description as string);

    function createMarkup() {
      return { __html: clean };
    }

    // const handleTypeText = () =>
    //   product?.attributes.map(
    //     (attr) =>
    //       attr.type === "text" &&
    //       attr.items.map((val: Items) => (
    //         <span
    //           className={`sizes ${size === val.id ? "selectedSizeColour" : ""}`}
    //           key={val.id}
    //           onClick={() => dispatch(selectedSize(val.id))}
    //         >
    //           {val.value}
    //         </span>
    //       ))
    //   );

    // const handleTypeColours = () =>
    //   product?.attributes.map(
    //     (attr) =>
    //       attr.type === "swatch" &&
    //       attr.items.map((val: Items) => (
    //         <span
    //           key={val.id}
    //           style={{
    //             backgroundColor: val.value,
    //             border:
    //               colour === val.id ? "2px solid #5ECE7B" : `1px solid #ccc`,
    //           }}
    //           className="colours"
    //           onClick={() => dispatch(selectedColour(val.id))}
    //         ></span>
    //       ))
    //   );

    const handleAddToCart = () => {
      dispatch(addToCart(product));
    };

    return (
      <ProductDetails className="container">
        {/* <DisplaySuccess>{handleSuccessText()}</DisplaySuccess> */}
        <ImageWrapper>
          <ImageSmallWrapper>
            {product?.gallery.map((link, idx) => (
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
          <ImageBigWrapper>
            <img
              src={product?.gallery[this.state.index]}
              alt=""
              className="image-big"
            />
          </ImageBigWrapper>
        </ImageWrapper>
        <Details>
          <ItemBrand>{product?.brand}</ItemBrand>
          <ItemName>{product?.name}</ItemName>

          {product?.attributes.map((attr) => (
            <Attribute attribute={attr} />
          ))}

          <p className="price">PRICE:</p>
          {product?.prices.map((price: Price, idx) =>
            currency.toUpperCase().includes(price.currency.label) ? (
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
            onClick={() => handleAddToCart()}
            className="bg-primary"
          >
            Add to Cart
          </Button>

          <div dangerouslySetInnerHTML={createMarkup()} />
        </Details>
      </ProductDetails>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: state.currencies.selectedCurrency,
  // size: state.product.size,
  // colour: state.product.colour,
  data: state.cart.data,
  success: state.cart.success,
  cartItems: state.cart.cartItems,
});
export default connect(mapStateToProps)(withRouter(ProductDescription));
