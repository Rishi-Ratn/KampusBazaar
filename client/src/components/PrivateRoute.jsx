import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector(state => state.user);
  return currentUser ? < Outlet/> : <Navigate to='/sign-in' />;
}

//Private Route, so that only the authenticated user, can access the profile route
//if there is currentUser, then Outlet i.e show the children (route of profile in app.jsx)