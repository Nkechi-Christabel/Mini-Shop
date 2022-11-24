import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Params,
  NavigateFunction,
} from "react-router-dom";

export interface RouterProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}

// export type WithRouterProps<T> = T & RouterProps;

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
