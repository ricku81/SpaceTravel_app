import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { ROUTE_PATHS } from "./paths";

import RootLayout from "../components/RootLayout";
import Home from "../pages/Home";
import Planets from "../pages/Planets";
import Spacecrafts from "../pages/Spacecrafts";
import Spacecraft from "../pages/Spacecraft"
import Construction from "../pages/Construction"

const router = createBrowserRouter( // This creates a router instance for the application using paths definied in ROUTE_PATHS in the paths.js file
  createRoutesFromElements(
    <Route path={ROUTE_PATHS.HOME} element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path={ROUTE_PATHS.PLANETS} element={<Planets />} />
      <Route path={ROUTE_PATHS.SPACECRAFTS} element={<Spacecrafts />} />
      <Route path={ROUTE_PATHS.SPACECRAFT} element={<Spacecraft />} />
      <Route path={ROUTE_PATHS.CONSTRUCTION} element={<Construction />} />
      <Route path="*" element={<Home />} />
    </Route>
  )
);

export default router;