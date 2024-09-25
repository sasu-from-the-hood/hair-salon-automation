import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PageNotExist from "./PageNotExist";
import Admin from "./Admin/Admin";
import LandingPage from "./Landing page/LandingPage";
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin/*" element={<Admin />} />

          <Route path="*" element={<PageNotExist />} />
        </Routes>
      </Router>
    </div>
  );
}
