import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import {
  BigScreenNav,
  Cart,
  HeaderNav,
  Logo,
  SmallScreenNav,
} from "./headerStyle";

import { selectedCategory } from "../redux/features/currencySlice";
import { RootState } from "../redux/store";
import { Products, Data } from "../utils/types";
import { openModal } from "../redux/features/modalSlice";
import Select from "./Select";
import Brand from "../assets/Brand.png";

interface IProps {
  dispatch: Dispatch;
  cart: Products[];
  data: Data;
  currentCategoryName: string;
}

interface State {
  checked: boolean;
}

class Header extends Component<IProps, State> {
  state: State = {
    checked: false,
  };
  render() {
    const { cart, data, dispatch, currentCategoryName } = this.props;
    const { products } = data.category;
    const { checked } = this.state;

    const categoryNames = [...new Set(products.map((item) => item.category))];

    categoryNames.unshift(data.category.name);

    const handleCategoryName = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      if (e.target) {
        let categoryName = (e.target as HTMLInputElement).getAttribute(
          "data-name"
        ) as string;
        dispatch(selectedCategory(categoryName));
      }
    };

    return (
      <HeaderNav>
        <div className="container flex navMenu__wrapper">
          <div>
            <label
              htmlFor="hamburger"
              className="hamburger-menu block"
              onClick={() => this.setState({ checked: !checked })}
            >
              &#9776;
            </label>
            <input
              type="checkbox"
              id="hamburger"
              className="checkbox hidden "
            />
            {/* Menu links for big screen */}
            <BigScreenNav>
              <ul>
                {categoryNames?.map((el, idx) => (
                  <li>
                    <Link
                      to={`/${el}`}
                      key={idx}
                      data-name={el}
                      onClick={(e) => handleCategoryName(e)}
                      className={`${
                        currentCategoryName === el ? "currentCategory" : ""
                      }`}
                    >
                      {el.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </BigScreenNav>
          </div>
          <Logo>
            <img src={Brand} alt="Brand Logo" />
          </Logo>
          <div className="logo-cart flex">
            <div>
              <Select products={products} />
            </div>

            <Cart className="relative" onClick={() => dispatch(openModal())}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5613 4.87359C19.1822 4.41031 18.5924 4.12873 17.9821 4.12873H5.15889L4.75914 2.63901C4.52718 1.77302 3.72769 1.16895 2.80069 1.16895H0.653099C0.295301 1.16895 0 1.45052 0 1.79347C0 2.13562 0.294459 2.418 0.653099 2.418H2.80069C3.11654 2.418 3.39045 2.61936 3.47434 2.92139L6.04306 12.7077C6.27502 13.5737 7.07451 14.1778 8.00152 14.1778H16.4028C17.3289 14.1778 18.1507 13.5737 18.3612 12.7077L19.9405 6.50575C20.0877 5.941 19.9619 5.33687 19.5613 4.87359ZM18.6566 6.22252L17.0773 12.4245C16.9934 12.7265 16.7195 12.9279 16.4036 12.9279H8.00154C7.68569 12.9279 7.41178 12.7265 7.32789 12.4245L5.49611 5.39756H17.983C18.1936 5.39756 18.4042 5.49824 18.5308 5.65948C18.6567 5.81994 18.7191 6.02116 18.6566 6.22252Z"
                  fill="#43464E"
                />
                <path
                  d="M8.44437 14.9814C7.2443 14.9814 6.25488 15.9276 6.25488 17.0751C6.25488 18.2226 7.24439 19.1688 8.44437 19.1688C9.64445 19.1696 10.6339 18.2234 10.6339 17.0757C10.6339 15.928 9.64436 14.9812 8.44437 14.9812V14.9814ZM8.44437 17.9011C7.9599 17.9011 7.58071 17.5385 7.58071 17.0752C7.58071 16.6119 7.9599 16.2493 8.44437 16.2493C8.92885 16.2493 9.30804 16.6119 9.30804 17.0752C9.30722 17.5188 8.90748 17.9011 8.44437 17.9011Z"
                  fill="#43464E"
                />
                <path
                  d="M15.6875 14.9814C14.4875 14.9814 13.498 15.9277 13.498 17.0752C13.498 18.2226 14.4876 19.1689 15.6875 19.1689C16.8875 19.1689 17.877 18.2226 17.877 17.0752C17.8565 15.9284 16.8875 14.9814 15.6875 14.9814ZM15.6875 17.9011C15.2031 17.9011 14.8239 17.5385 14.8239 17.0752C14.8239 16.612 15.2031 16.2493 15.6875 16.2493C16.172 16.2493 16.5512 16.612 16.5512 17.0752C16.5512 17.5188 16.1506 17.9011 15.6875 17.9011Z"
                  fill="#43464E"
                />
              </svg>
              {cart.length > 0 && (
                <span>{cart.reduce((a, b) => a + b.quantity, 0)}</span>
              )}
            </Cart>
          </div>
        </div>
        <SmallScreenNav
          className={`smallScreenNav container ${
            checked ? "block" : "hidden"
          } `}
        >
          <ul>
            {categoryNames?.map((el, idx) => (
              <li>
                <Link
                  to={`/${el}`}
                  key={idx}
                  data-name={el}
                  onClick={(e) => handleCategoryName(e)}
                  className={`${
                    currentCategoryName === el ? "currentCategory" : ""
                  }`}
                >
                  {el.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </SmallScreenNav>
      </HeaderNav>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  cart: state.cart.cartItems,
  data: state.cart.data,
  currentCategoryName: state.currencies.currentCategoryName,
  modal: state.modal.isOpen,
});

export default connect(mapStateToProps)(Header);
