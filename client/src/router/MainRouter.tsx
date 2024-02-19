import { Route, Routes } from "react-router-dom";

function MainRouter() {
  return (
    <Routes>
      <Route index element={<h1>Base Page</h1>} />
    </Routes>
  );
}

export default MainRouter;
