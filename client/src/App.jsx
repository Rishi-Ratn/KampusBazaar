import {BrowserRouter,Routes,Route} from "react-router-dom";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import MyAds from "./pages/MyAds";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/listing/:listingId" element={<Listing />} />
    <Route path="/search" element={<Search />} />
    <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-ad" element={<CreateListing />} />
      <Route path="/my-ads" element={<MyAds />} />
      <Route path="/update-ad/:listingId" element={<UpdateListing />} />
    </Route>
  </Routes>
  </BrowserRouter>
}
