import { useMutation, useQuery } from "react-query";
import Loading from "./Loading";
import {
  deleteProduct,
  editProduct,
  getAllCategories,
  getMe,
  registerRequest,
} from "../api/features/SendRequest";
import "./profilePage.css";
import { useState } from "react";
import { CategoryType, ProductType, UserType } from "../types";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
function ProfilePage() {
  const [user, setUser] = useState<UserType>();
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [editProductState , setEditProductState] = useState<{id:number , title : string}>()
  const [value, setValue] = useState({
    title: "",
    category: { id: "", name: "" },
  });
  const [visible, setVisible] = useState(false);
  const { isLoading, refetch } = useQuery("User", getMe, {
    cacheTime: 5000, // 5000 >> 5 seconds (cache is the time that the data will store at the cache and not fetch again)
    staleTime: 5000, // this is the time after it the data will be fetch again
    onSuccess: (data) => {
      setUser(data?.user);
      setProducts(data?.user.products);
    },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState<Position>("center");
  const { isLoading: categoryLoading } = useQuery(
    ["Category"],
    getAllCategories,
    {
      cacheTime: 5000,
      staleTime: 5000,
      onSuccess: (data) => {
        setCategory(data?.data?.categories);
      },
    }
  );
  const { mutate } = useMutation(
    registerRequest<{ title: string; categoryId: string }>,
    {
      onSuccess: (data) => {
        console.log(data.data.product);
        setProducts([...products, data.data.product]);
      },
    }
  );
  const { mutate: deleteProductMutation } = useMutation(deleteProduct, {
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: editProductMutation } = useMutation(editProduct, {
    onSuccess: () => {
      refetch();
    },
  });
  const editMethod = () => {
    editProductMutation(editProductState)
    setModalVisible(false)
  }
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
        className="bg-green-600 hover:bg-red-950"
        onClick={editMethod}
        autoFocus
      />
    </div>
  );
    

  const handleAddProduct = async () => {
    const data = {
      data: {
        title: value.title,
        categoryId: value.category.id,
      },
      url: "/products/addProduct",
    };
    await mutate(data);

    setVisible(false);
  };
  const show = (id:number) => {
    // setNewTitle(newTitle)
    // editProductMutation({id, title : newTitle })
    setEditProductState({id , title : ""})
    setPosition(position);
    setModalVisible(true);
  };

  if (isLoading || categoryLoading) {
    return <Loading />;
  }
  return (
    <div className="dark:text-white">
      <div className="main">
        <h2 className="text-white">My Account</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit"></i>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{user?.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>:</td>
                  <td>{user?.role}</td>
                </tr>
                <tr>
                  <td>Created At</td>
                  <td>:</td>
                  <td>{`${user?.createdAt}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Dialog
          header="Add Product"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-col gap-3">
            <InputText
              value={value.title}
              placeholder="Title"
              onChange={(e) =>
                setValue((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            {!categoryLoading && (
              <Dropdown
                value={value.category}
                onChange={(e) =>
                  setValue((prev) => ({ ...prev, category: e.value }))
                }
                options={category}
                optionLabel="name"
                placeholder="Select a Category"
                className="w-full md:w-14rem"
              />
            )}
            <Button onClick={handleAddProduct}>Add Product</Button>
          </div>
        </Dialog>
        {user?.role === "VENDOR" ? (
          <>
            <div className="flex justify-between items-center py-4">
              <h2>My Products</h2>
              <Button onClick={() => setVisible(true)}>Add Product</Button>
            </div>
            <div className="card">
              <div className="card-body">
                <i className="fa fa-pen fa-xs edit"></i>
                <div className="social-media">
                  <table>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>Name</td>
                          <td>:</td>
                          <td>{product?.title}</td>
                          <td>
                            <Button
                              label="Edit"
                              icon="pi pi-check"
                              className=" p-button-text cursor-pointer"
                              onClick={()=>show(product.id)}/* editProductMutation({id: product.id, title : newTitle }) */
                            />
                          </td>
                          <td>
                            <Button
                              onClick={() => deleteProductMutation(product.id)}
                              label="Delete"
                              icon="pi pi-times"
                              className="p-button-text p-button-text"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Dialog
              header="Edit Product"
              visible={modalVisible}
              position={position}
              style={{ width: "50vw" }}
              onHide={() => setModalVisible(false)}
              footer={footerContent}
              draggable={false}
              resizable={false}
            >
              <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Edit Product
            </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="product name"
                onChange={(e) => setEditProductState({...editProductState , title : e.target.value})}
                value={editProductState?.title}
              />
            </Dialog>
          </>
          
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
