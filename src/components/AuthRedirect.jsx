import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;
