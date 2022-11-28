import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  NavigateFunction,
} from "react-router-dom";

export interface Router {
  navigate: NavigateFunction;
}

export const withRouter = <P extends object>(
  Component: React.ComponentType<P>
) => {
  function ComponentWithRouterProp(props: P) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
};
