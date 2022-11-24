import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { Data, Products } from "../utils/types";
import CartItems from "./CartItems";

import { H2, Order, Quantity, Tax, Total } from "./cartStyle";

interface IProps {
  data: Data;
  cartItems: Products[];
}

class Cart extends Component<IProps> {
  render() {
    const dataDup = this.props.data;
    const { cartItems } = this.props;
    let subTotal = cartItems
      .map((item) => item.prices.reduce((a, b) => a + b.amount, 0))
      .reduce((a, b) => a + b, 0);

    const tax = (subTotal * 21) / 100;
    const total = subTotal + tax;

    const handleOrder = () => {};

    return (
      <div className="container">
        <H2>CART</H2>
        <div className="border-top">
          {cartItems.map((item) => (
            <CartItems key={item.id} item={item} dataDup={dataDup} />
          ))}
        </div>
        <Tax>
          Tax 21%: <span>{`$${tax.toFixed(2)}`}</span>
        </Tax>
        <Quantity>
          Quantity: <span>{cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
        </Quantity>
        <Total>
          Total:
          <span>{`$${total.toFixed(2)}`} </span>
        </Total>
        <Order className="bg-primary">ORDER</Order>
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  data: state.cart.data,
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(Cart);
