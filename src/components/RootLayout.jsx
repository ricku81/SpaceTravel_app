import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";

import styles from "./RootLayout.module.css";

export default function RootLayout() { // This is the root layout component that wraps around all pages and includes the navigation bar as well as Outlet for rendering the child routes.
  return (
    <div className={styles.rootLayout}>
      <NavBar />
      <Outlet />
    </div>
  );
}
