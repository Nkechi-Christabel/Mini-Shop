import styled, { css } from "styled-components";

export const HeaderNav = styled.header`
  padding: 1.5rem 0 1rem 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .navMenu__wrapper {
    justify-content: space-between;
  }

  .hamburger-menu {
    font-size: 2rem;
    padding-right: 0.5rem;

    cursor: pointer;
    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  .checkbox:checked .smallScreenNav {
    display: block;
  }

  .select-cart {
    justify-content: space-between;
  }

  .currentCategory {
    padding-bottom: 0.7rem;
    color: #5ece7b;
    border-bottom: 2px solid #5ece7b;
  }

  select {
    font-size: 1rem;
    padding: 0 0.3rem;
    margin-right: 1rem;
    border: none;
    outline: none;
    cursor: pointer;
  }

  select option {
    background: #fff;
  }

  option:hover {
    background-color: gray !important;
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
    }
  }

  li:not(:first-child) {
    padding-left: 2rem;
  }
`;

export const SmallScreenNav = styled.nav`
  ${Nav}
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;

  ul {
    postion: absolute;
  }
  li {
    margin: 1.5rem 0;
  }
`;

export const Logo = styled.div`
  margin-top: -0.5rem;

  @media screen and (min-width: 768px) {
    margin-top: -0.7rem;
  }

  @media screen and (max-width: 400px) {
    display: none;
  }
`;

export const Cart = styled.div`
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 1.1rem;
    left: 0.9rem;
    // transform: translate(-30%, -22%);
    width: 1rem;
    height: 1rem;
    padding: 1rem;
    color: #fff;
    background: #000;
    border-radius: 50%;
    cursor: pointer;
  }
`;
