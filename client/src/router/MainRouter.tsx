import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Signup from "../pages/Signup/Signup";
import { FadeIn } from "../animations/transitions";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import DriverDashboard from "../pages/DriverDashboard/DriverDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard/EmployeeDashboard";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import { useContext } from "react";
import UserDataContext from "../context/UserDataContext";
import UserContextTypes from "../types/UserContextTypes";
import AddPassengers from "../pages/AddPassengers/AddPassengers";
import AllCabDrivers from "../pages/AllCabDrivers/AllCabDrivers";
import ScheduledRoutes from "../pages/ScheduledRoutes/ScheduledRoutes";
import AllTeamMembers from "../pages/AllTeamMembers/AllTeamMembers";
import StartRoute from "../pages/StartRoute/StartRoute";
import DriverLayout from "./../layouts/DriverLayout";
import RouteCompleted from "../pages/RouteCompleted/RouteCompleted";

function MainRouter() {
  const { userData }: UserContextTypes = useContext(UserDataContext);

  return (
    <Routes>
      {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
      <Route path="*" element={<h1>Page Not Found!</h1>} />
      <Route
        index
        element={
          <FadeIn>
            <Landing /> {/* This is also a Login */}
          </FadeIn>
        }
      />

      <Route path="/signup" element={<Signup />} />
      {/* ADMIN ROUTER */}
      {userData?.role === "admin" && (
        <>
          <Route path="/admin" element={<AdminDashboardLayout />}>
            <Route index element={<FadeIn><AdminDashboard /></FadeIn>} />
            <Route path="allCabDrivers" element={<AllCabDrivers />} />
            <Route path="scheduledRoutes" element={<ScheduledRoutes />} />
            <Route path="allTeamMembers" element={<AllTeamMembers />} />
          </Route>
          <Route path="admin/addPassengers" element={<AddPassengers />} />
        </>
      )}
      {/* DRIVER ROUTER */}
      {userData?.role === "driver" && (
        <>
          <Route path="/driver" element={<DriverLayout />}>
            <Route index element={<DriverDashboard />} />
            <Route path="startRoute" element={<StartRoute />} />
            <Route path="routeCompleted" element={<RouteCompleted />} />
          </Route>
        </>
      )}
      {/* EMPLOYEE ROUTER */}
      {userData?.role === "employee" && (
        <Route path="/employee" element={<EmployeeDashboard />} />
      )}
    </Routes>
  );
}

export default MainRouter;
