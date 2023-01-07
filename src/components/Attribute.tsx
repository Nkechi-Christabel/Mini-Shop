import React, { Component } from "react";

import { Attributes } from "../utils/types";
import { State } from "./ProductDescription";

interface IProps {
  attribute: Attributes;
  selectedProduct?: State["selectAttrProduct"];
  // size?: string;
  // color?: string;
  setAttribute?: (
    color: string | undefined,
    size: string | undefined,
    attrName: string
  ) => void;
}

class Attribute extends Component<IProps> {
  render() {
    const { attribute, selectedProduct, setAttribute } = this.props;

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
                onClick={(e) =>
                  setAttribute &&
                  setAttribute(val.id, selectedProduct?.size, attribute.name)
                }
                className="colours"
                style={{
                  backgroundColor: val.value,
                  border:
                    attribute.selectedColor === val.id
                      ? "2px solid #5ECE7B"
                      : `1px solid #ccc`,
                }}
                key={val.id}
              ></span>
            ))}
        </div>
        <div>
          {attribute.type === "text" &&
            attribute.items.map((val) => (
              <span
                className={`sizes 
                ${attribute.selectedSize === val.id ? "selected-size" : ""}
                `}
                key={val.id}
                onClick={(e) =>
                  setAttribute &&
                  setAttribute(selectedProduct?.color, val.id, attribute.name)
                }
              >
                {val.value}
              </span>
            ))}
        </div>
      </div>
    );
  }
}

export default Attribute;
