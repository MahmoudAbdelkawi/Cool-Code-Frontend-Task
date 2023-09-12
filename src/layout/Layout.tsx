import { Outlet } from "react-router-dom";
import Slidebar from "../components/sidebar/Slidebar";

function Layout() {

  return (
    <>
      <Slidebar />
      <Outlet />
    </>
  );
}

export default Layout;
