import React from "react";
import { Currency } from "../utils/types";
import { IoIosArrowUp } from "react-icons/io";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import { selectCurrency } from "../redux/features/currencySlice";
import { SelectBody, SelectedBox, SelectWrapper } from "./headerStyle";

// import "./styles.css";

interface IProps {
  currency: string;
  allCurrencies: Currency[];
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
    const { currency, allCurrencies, dispatch } = this.props;
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
            {allCurrencies?.map((currency: Currency, idx: number) => (
              <li
                onClick={(e) => handleItemClick(`${currency.symbol}`)}
                key={currency.symbol}
              >
                {" "}
                {`${currency.symbol} ${currency.label}`}
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
  allCurrencies: state.currencies.currencyData,
});

export default connect(mapStateToProps)(Select);
