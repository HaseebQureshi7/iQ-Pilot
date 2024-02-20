import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Signup from "../pages/Signup/Signup";

function MainRouter() {
  return (
    <Routes>
      <Route index element={<Landing />} /> {/* This is also a Login */}
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}

export default MainRouter;
