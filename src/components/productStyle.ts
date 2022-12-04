import styled, { css } from "styled-components";

export const ProductListingWrapper = styled.div`
  padding-top: 0.4rem;
  padding-bottom: 1rem;
`;

export const H1 = styled.h1`
  padding: 3rem 0 1rem;
  font-size: 1.6rem;
  font-weight: 400;
`;

export const H4 = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
`;

export const Image = styled.img`
  max-width: 100%;
  height: 22rem;
  object-fit: contain;

  @media screen and (max-width: 567px) {
    height: auto;
    object-fit: cover;
  }
`;

export const ProductName = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  padding: 0.5rem 0;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  justify-content: space-between;
  justify-items: center;
  gap: 2rem;
  padding-top: 2.5rem;

  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Product = styled.div<{ inStock: boolean }>`
  position: relative;
  padding: 0.8rem;

  :hover {
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  .hidden {
    display block;
   }
  }

  ${(props) =>
    props.inStock !== true &&
    `
    opacity: 0.4;
     ::after {
     content: "OUT OF STOCK";
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     font-size: 1.3rem;
     font-weight: lighter;
    }

  `};
  .price{
    font-weight: 600;
  }
`;

const CommonStyle = css`
  font-size: 1.2rem;
  padding-bottom: 0.3rem;
`;

export const ItemBrand = styled.p`
  font-weight: 500;
  ${CommonStyle}
`;

export const ItemName = styled.p`
  font-weight: 300;
  ${CommonStyle}
`;

export const AddToCart = styled.div<{ inStock: boolean }>`
  position: absolute;
  right: 3rem;
  bottom: 4rem;
  cursor: pointer;
  pointer-events: ${(props) => (props.inStock === true ? "auto" : "none")};
`;

export const ProductDetails = styled.div`
  padding-top: 8rem;
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const ImageWrapper = styled.div`
  flex: 2;
  @media screen and (min-width: 768px) {
    display: flex;
    // justify-content: space-between;
  }
`;

export const ImageSmallWrapper = styled.div`
  display: none;

  .activeImage {
    border: 1px solid #ccc;
  }
  @media screen and (min-width: 768px) {
    display: grid;
    gap: 1.5rem;
    padding: 0.4rem;

    .image-small {
      width: 10rem;
      height: 10rem;
      object-fit: contain;
      cursor: pointer;
    }
  }
`;

export const ImageBigWrapper = styled.div`
  flex: 2;
  .image-big,
  .imageBigMobile {
    width: 100%;
    height: auto;
  }
  @media screen and (min-width: 768px) {
    padding-right: 1rem;
    .image-big {
      height: 30rem;
      object-fit: contain;
    }
    .prevNext,
    .imageBigMobile {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    .image-big {
      display: none;
    }
  }
`;

export const Details = styled.div`
  flex: 1;
  .attr-name,
  .price {
    font-size: 0.9rem;
    font-weight: 600;
    padding: 1rem 0 0.3rem 0;
  }

  .price {
    padding: 1.5rem 0 0.5rem 0;
  }

  .amount {
    padding: 0.4rem 0 0.6rem 0;
    font-weight: 600;
  }

  .sizes,
  .colours {
    display: inline-block;
    padding: 0.7rem 1rem;
    margin: 0.3rem 0.5rem 0 0;
    border: 1px solid #000;
    cursor: pointer;
  }

  .selected-size {
    color: #fff;
    background: #000;
  }

  h1,
  h2,
  h3,
  h4 {
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.7rem 0;
  }

  p,
  li {
    line-height: 1.2;
    padding: 0.4rem 0;
  }

  .productDesc {
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
    overflow: hidden;
    cursor: pointer;
  }

  .productDesc:hover {
    display: block;
    overflow: visible;
  }
`;

export const ProductDetailsName = styled.p<{ fontWeight: string }>`
  font-size: 1.2rem;
  font-weight: ${(props) => (props.fontWeight === "bold" ? 500 : 300)};
  padding-bottom: ${(props) =>
    props.fontWeight === "bold" ? ".3rem" : ".7rem"};
`;

export const Button = styled.button<{ inStock: boolean }>`
  font-size: 1.2rem;
  width: 100%;
  padding: 0.9rem 1rem;
  margin: 1rem 0;
  color: #fff;
  border-radius: 1px;
  cursor: pointer;

  ${(props) =>
    props.inStock !== true &&
    `
    pointer-events: none;
    opacity: 0.4;
  `};
  :hover {
    background: #32cd32;
  }
`;
