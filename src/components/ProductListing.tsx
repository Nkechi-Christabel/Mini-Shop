import React, { Component } from "react";
import { gql, OperationVariables, QueryResult } from "@apollo/client";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Query } from "@apollo/client/react/components";
import { Data, Products } from "../utils/types";
import ProductItem from "./ProductItem";
import { H1, H4, ProductGrid, ProductListingWrapper } from "./productStyle";
import { getData } from "../redux/features/cartSlice";
import { RootState } from "../redux/store";

const GET_CATEGORY = gql`
  query CategoryAndCurrencies {
    category {
      products {
        category
        id
        name
        brand
        inStock
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

interface IProps {
  dispatch: Dispatch;
  currentCategoryName: string;
}

class Category extends Component<IProps> {
  render() {
    const { dispatch, currentCategoryName } = this.props;
    const handleProductsDisplay = (data: Data) => {
      if (currentCategoryName === "all") {
        return data?.category.products.map((item: Products) => (
          <ProductItem item={item} key={item.id} />
        ));
      }
      return data?.category.products
        .filter((item: Products) => item.category === currentCategoryName)
        .map((item: Products) => <ProductItem item={item} key={item.id} />);
    };

    const handleData = (data: any) => {
      dispatch(getData(data));
    };

    return (
      <Query
        query={GET_CATEGORY}
        fetchPolicy="no-cache"
        onCompleted={(data: Data) => handleData(data)}
      >
        {(result: QueryResult<any, OperationVariables>) => {
          const { data, loading, error } = result;

          if (loading) return <H4>Loading...</H4>;
          if (error)
            return (
              <H4>
                <span className="oops">Oops...</span>
                An error occurred.
              </H4>
            );

          return (
            <ProductListingWrapper className="container padding">
              {" "}
              <H1>{`${
                currentCategoryName && currentCategoryName[0].toUpperCase()
              }${currentCategoryName.slice(1)}`}</H1>
              <ProductGrid>
                {handleProductsDisplay(data) ||
                  data?.category.products.map((item: Products) => (
                    <ProductItem item={item} key={item.id} />
                  ))}
              </ProductGrid>
            </ProductListingWrapper>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currentCategoryName: state.currencies.currentCategoryName,
});

export default connect(mapStateToProps)(Category);
