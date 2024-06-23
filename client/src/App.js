import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/log-in";
import SignUp from "./components/sign-up";
import { Logout } from "./components/LogOut";
import Home from "./components/home";
import Review from "./components/review";
import Nav from "./components/Nav";
import { useAuth } from "./store/auth";
import Reviews from "./components/reviews";

function App() {
  const {isLogIn}= useAuth();
  return (
    <>
      <BrowserRouter>
        {isLogIn?<Nav /> :<></>}
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
