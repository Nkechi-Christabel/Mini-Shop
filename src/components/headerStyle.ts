import styled, { css } from "styled-components";

export const HeaderNav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 2rem 0;

  background: #fff;
  z-index: 4;
  // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .navMenu__wrapper {
    justify-content: space-between;
    align-content: center;
    height: 100%;
  }

  .hamburger-menu {
    font-size: 2rem;
    padding-right: 0.5rem;
    margin-top: -0.4rem;
    cursor: pointer;
    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  .logo-cart {
    padding-right: 0.7rem;
  }

  .currentCategory {
    padding-bottom: 0.7rem;
    color: #5ece7b;
    border-bottom: 2px solid #5ece7b;
  }
`;

const Nav = css`
  ul {
    list-style: none;
  }
  li a:hover {
    color: #5ece7b;
  }

  li {
    font-size: 1.1rem;
    padding-bottom: 1rem;
  }
`;

export const BigScreenNav = styled.nav`
  ${Nav}
  ul {
    display: none;

    @media screen and (min-width: 768px) {
      display: flex;
      justify-content: space-between;
    }
  }

  li:not(:first-child) {
    padding-left: 2rem;
  }
`;

export const SmallScreenNav = styled.div`
  ${Nav}
  position: relative;

  ul {
    postion: absolute;
    padding-top: 2rem;
  }

  li {
    margin: 1.5rem 0;
  }
`;

export const Logo = styled.div`
  margin-top: -0.5rem;

  @media screen and (max-width: 530px) {
    display: none;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  margin-right: 0.7rem;
  .open {
    display: block !important;
  }
`;
export const SelectedBox = styled.div`
  display: flex;
  font-size: 1.2rem;
  width: 4rem;
  cursor: pointer;
  span {
    display: inline-block;
    margin-right: 0.6rem;
  }

  .icon {
    transition: all 0.2s ease-in-out;
  }

  .icon.open {
    transform: rotate(180deg);
  }
`;

export const SelectBody = styled.div`
  ul {
    font-size: 1.1rem;
    position: absolute;
    top: 2rem;
    left: 0.2rem;
    padding: 0.5rem 0;
    margin-left: -2rem;
    background: #fff;
    cursor: pointer;
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  }

  li {
    padding: 1rem;

    width: 8rem;
    text-align: center;
  }
  li:hover {
    background: #eeeeee;
  }
`;

export const Cart = styled.div`
  cursor: pointer;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 1.1rem;
    left: 0.9rem;
    width: 1rem;
    height: 1rem;
    padding: 1rem;
    color: #fff;
    background: #000;
    border-radius: 50%;
  }
`;
