import { Dispatch } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  selectedColour,
  selectedSize,
} from "../redux/features/productDescriptionSlice";
import { RootState } from "../redux/store";
import { Attributes } from "../utils/types";

interface IProps {
  attribute: Attributes;
  colour: string;
  size: string;
  dispatch: Dispatch;
}

class Attribute extends Component<IProps> {
  render() {
    const { attribute, colour, size, dispatch } = this.props;

    return (
      <div>
        <p
          key={attribute.id}
          className="attr-name pt"
        >{`${attribute.name.toUpperCase()}:`}</p>
        <div>
          {attribute.type === "swatch" &&
            attribute.items.map((val) => (
              <span
                className="colours"
                style={{
                  backgroundColor: val.value,
                  border:
                    colour === val.id ? "2px solid #5ECE7B" : `1px solid #ccc`,
                }}
                key={val.id}
                onClick={() => dispatch(selectedColour(val.id))}
              ></span>
            ))}
        </div>
        <div>
          {attribute.type === "text" &&
            attribute.items.map((val) => (
              <span
                className={`sizes ${size === val.id ? "selected-size" : ""}`}
                key={val.id}
                onClick={() => dispatch(selectedSize(val.id))}
              >
                {val.value}
              </span>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  size: state.product.size,
  colour: state.product.colour,
  success: state.cart.success,
});

export default connect(mapStateToProps)(Attribute);
