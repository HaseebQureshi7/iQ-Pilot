import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "../pages/Landing";
import Signup from "../pages/Signup/Signup";
import { FadeIn, SlideInOut } from "../animations/transitions";
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
import { AnimatePresence } from "framer-motion";

function MainRouter() {
  const { userData }: UserContextTypes = useContext(UserDataContext);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location.pathname}>
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
              <Route
                index
                element={
                  <SlideInOut>
                    <AdminDashboard />
                  </SlideInOut>
                }
              />
              <Route
                path="allCabDrivers"
                element={
                  <SlideInOut>
                    <AllCabDrivers />
                  </SlideInOut>
                }
              />
              <Route
                path="scheduledRoutes"
                element={
                  <SlideInOut>
                    <ScheduledRoutes />
                  </SlideInOut>
                }
              />
              <Route
                path="allTeamMembers"
                element={
                  <SlideInOut>
                    <AllTeamMembers />
                  </SlideInOut>
                }
              />
            </Route>
            <Route
              path="admin/addPassengers"
              element={
                <SlideInOut>
                  <AddPassengers />
                </SlideInOut>
              }
            />
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
    </AnimatePresence>
  );
}

export default MainRouter;
