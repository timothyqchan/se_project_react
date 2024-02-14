import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, component: Component, ...props }) => {
  return (
    <Route {...props}>{isLoggedIn ? <Component /> : <Redirect to="/" />}</Route>
  );
};

export default ProtectedRoute;
