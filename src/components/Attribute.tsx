import { Dispatch } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  selectedColour,
  selectedSize,
} from "../redux/features/productDescriptionSlice";
import { RootState } from "../redux/store";
import { Attributes, Products } from "../utils/types";

interface IProps {
  attribute: Attributes;
  dispatch: Dispatch;
  product: Products;
  selectedItem: Products[];
}

class Attribute extends Component<IProps> {
  render() {
    const { attribute, dispatch, product, selectedItem } = this.props;
    const matchProductToState = selectedItem?.find(
      (el) => el?.id === product?.id
    )?.selectedAttrSwatch;

    const matchProductToStateText = selectedItem?.find(
      (el) => el?.id === product?.id
    )?.selectedAttrText;

    return (
      <div>
        <p
          key={attribute.id}
          className="attr-name pt"
        >{`${attribute.name.toUpperCase()}:`}</p>
        <div>
          {attribute.type === "swatch" &&
            attribute.items.map((val, idx) => (
              <span
                onClick={() =>
                  dispatch(selectedColour({ val: val.id, product }))
                }
                className="colours"
                style={{
                  backgroundColor: val.value,
                  border:
                    matchProductToState === val.id
                      ? "2px solid #5ECE7B"
                      : `1px solid #ccc`,
                }}
                key={product?.name}
              ></span>
            ))}
        </div>
        <div>
          {attribute.type === "text" &&
            attribute.items.map((val, idx) => (
              <span
                className={`sizes ${
                  matchProductToStateText === val.id ? "selected-size" : ""
                } `}
                key={product?.id}
                onClick={() => dispatch(selectedSize({ val: val.id, product }))}
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
  selectedItem: state.product.item,
});

export default connect(mapStateToProps)(Attribute);
