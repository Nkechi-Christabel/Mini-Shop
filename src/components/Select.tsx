import React from "react";
import { Price, Products } from "../utils/types";
import { IoIosArrowUp } from "react-icons/io";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { selectCurrency } from "../redux/features/currencySlice";
import { SelectBody, SelectedBox, SelectWrapper } from "./headerStyle";

// import "./styles.css";

interface IProps {
  products: Products[];
  currency: string;
  dispatch: Dispatch;
}

interface State {
  isOpen: boolean;
}

class Select extends React.Component<IProps, State> {
  state: State = {
    isOpen: false,
  };

  render() {
    const { products, currency, dispatch } = this.props;
    const { isOpen } = this.state;
    const toggleDropdown = () => this.setState({ isOpen: !isOpen });

    const handleItemClick = (value: string) => {
      dispatch(selectCurrency(value));
      this.setState({ isOpen: false });
    };

    return (
      <SelectWrapper>
        <SelectedBox onClick={toggleDropdown}>
          <span>{currency}</span>
          <IoIosArrowUp className={`icon ${isOpen && "open"}`} />
        </SelectedBox>
        <SelectBody className={`${isOpen ? "block" : "hidden"}`}>
          <ul>
            {products
              ?.map((item) => item.prices)[0]
              ?.map((price: Price, idx: number) => (
                <li
                  onClick={(e) => handleItemClick(`${price.currency.symbol}`)}
                  key={idx}
                >
                  {" "}
                  {`${price.currency.symbol} ${price.currency.label}`}
                </li>
              ))}
          </ul>
        </SelectBody>
      </SelectWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(Select);
