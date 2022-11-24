import styled, { css } from "styled-components";

export const H2 = styled.h2`
  padding: 2rem 0 2rem 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const CartItem = styled.div`
  display: grid;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e5e5;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Delete = css`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 1.2rem;
  color: red;
  cursor: pointer;
`;

export const CartEmpty = styled.div`
    display: flex;
    justify-content: center
    align-items: content;
`;

export const CartDetails = styled.div`
  .price {
    padding: 0.5rem 0 0.6rem 0;
    font-weight: 600;
  }
  .attr-name {
    font-size: small;
    font-weight: 600;
    padding: 0.4rem 0;
  }

  .sizes,
  .colours {
    display: inline-block;
    padding: 0.7rem 1rem;
    margin-right: 0.5rem;
    border: 1px solid #000;
    pointer-events: none;
  }

  .selected-size {
    color: #fff;
    background: #000;
  }

  .pt {
    margin-top: 0.9rem;
  }
  .deleteIcon {
    ${Delete}
  }

  @media screen and (max-width: 768px) {
    order: 2;
  }
`;

const CommonStyle = css`
  font-size: 1.2rem;
  padding-bottom: 0.7rem;
`;

export const ItemBrand = styled.p`
  font-weight: 600;
  ${CommonStyle}
`;

export const ItemName = styled.p`
  font-weight: 300;
  ${CommonStyle}
`;

export const ImageQuantityWrapper = styled.div`
  display: grid;
  @media screen and (max-width: 768px) {
    order: 1;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const IncreaseDecreaseWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 2rem;

  .increase,
  .decrease {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #000;
    cursor: pointer;
  }

  .increase,
  .decrease,
  .quantity {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (min-width: 768px) {
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    order: 2;
    padding: 2rem 0;
  }
`;

export const CartImageWrapper = styled.div`
  position: relative;
`;

export const Image = styled.img`
width 100%;
height: auto;
  @media screen and (min-width: 768px) {
    width: 12rem;
    height: 12rem;
    object-fit: contain;
  }
`;

export const PrevNext = styled.div`
  display: flex;
  justify-content: space-between !important;
  position: absolute;
  bottom: 1rem;
  right: 3rem;

  .disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  .active {
    pointer-events: auto;
    opacity: 1;
  }
`;

const TaxQtyOrder = css`
  font-weight: lighter;
  font-size: 1.1rem;
  padding: 0.6rem 0;

  span {
    font-weight: 600;
    padding-left: 0.3rem;
  }
`;
export const Prev = styled.div`
  margin-right: 0.5rem;
`;
export const Next = styled.div``;

const button = css`
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.6rem 5rem;
  color: #fff;
  margin: 0.4rem 0;
  cursor: pointer;
`;

export const Order = styled.button`
  ${button}
  :hover {
    background: #0f6550;
  }
`;

export const Tax = styled.p`
  ${TaxQtyOrder}
`;
export const Quantity = styled.p`
  ${TaxQtyOrder}
`;
export const Total = styled.p`
  ${TaxQtyOrder}
`;

// Modal
export const Modal = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen === true ? "block" : "none")};
  position: absolute;
  top: 4.5rem;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.3);
  z-index: 20;
`;

export const ModalItemsWrapper = styled.div`
  position: absolute;
  right: 3rem;
  top: 0;
  padding: 1rem;
  background: #fff;
`;

export const H5 = styled.h5`
  font-weight: 300;
  span {
    font-weight: 600;
  }
`;

export const ModalItem = styled(CartItem)`
  display: flex;
  border-bottom: 0;
`;

export const ModalItemBrand = styled(ItemBrand)`
  font-weight: 300;
`;

export const ModalDetails = styled(CartDetails)`
  font-size: 0.9rem;

  .price {
    font-weight: 600;
  }
  .attr-name {
    font-weight: 300;
    font-size: 0.9rem;
  }

  .sizes {
    padding: 0.4rem 0.5rem;
  }

  .colours {
    padding: 0.6rem 0.7rem;
  }
  .sizes,
  clours {
    pointer-events: none;
  }

  .delete {
    ${Delete}
    dispaly: flex;
    justify-content: flex-end;
  }
`;

export const ModalImage = styled.img`
  width: 9rem;
  height: 11rem;
  object-fit: contain;
`;
export const ModalImageQuantityWrapper = styled(ImageQuantityWrapper)`
 display: flex;
 justify-content: space-between;
  order 2;
`;

export const IncreaseDecreaseModal = styled(IncreaseDecreaseWrapper)`
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  margin-right: 1rem;
  height: 70%;
`;

export const ModalImageWrapper = styled(CartImageWrapper)`
  order 2;
`;

export const OverlayTotal = styled.div`
  justify-content: space-between;
  margin: 1rem 0;
`;

export const CheckViewWrapper = styled.div`
  justify-content: space-between;
`;

export const ViewBag = styled.button`
  ${button}
  padding: .8rem 2rem;
  border: 1px solid #000;
  color: #000;
`;

export const Checkout = styled.button`
  ${button}
  padding: .8rem 2rem;
`;
