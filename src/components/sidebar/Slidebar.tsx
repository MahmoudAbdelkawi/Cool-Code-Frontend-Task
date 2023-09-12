import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
export type Position =
  | "center"
  | "bottom-left"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-right"
  | undefined;
function Slidebar() {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState<Position>("center");
  const navigate = useNavigate();
  const goLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setModalVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="bg-red-600 hover:bg-red-950"
        onClick={goLogin}
        autoFocus
      />
    </div>
  );
  const show = (position: Position) => {
    setPosition(position);
    setModalVisible(true);
  };

  const logout = () => {
    show("bottom-left");
  };

  return (
    <div className="">
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <NavLink to={"/"} onClick={() => setVisible(false)}>
            <Menubar model={[{ label: "Product" }]} />
          </NavLink>
          <NavLink to={"/category"} onClick={() => setVisible(false)}>
            <Menubar className="mt-5" model={[{ label: "Category" }]} />
          </NavLink>
          <NavLink to={"/profile"} onClick={() => setVisible(false)}>
            <Menubar className="mt-5" model={[{ label: "Profile" }]} />
          </NavLink>

          <Menubar
            className="relative top-96"
            model={[{ label: "Logout" }]}
            onClick={logout}
          />
        </Sidebar>
        <Button
          label="+"
          className="px-3 py-1 m-2"
          onClick={() => setVisible(true)}
        />
      </div>

      <Dialog
        header="Logout"
        visible={modalVisible}
        position={position}
        style={{ width: "50vw" }}
        onHide={() => setModalVisible(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <p className="m-0">Are You Sure You Want To Logout ?</p>
      </Dialog>
    </div>
  );
}

export default Slidebar;
